import mongoose from 'mongoose';
const contentSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  
  // Content Type
  contentType: {
    type: String,
    enum: ['tutorial', 'quiz', 'challenge'],
    required: true
  },
  
  // Classification
  topic: {
    type: String,
    required: true,
    enum: [
      'arrays', 'strings', 'linked-lists', 'stacks', 'queues',
      'trees', 'graphs', 'sorting', 'searching', 'dynamic-programming',
      'recursion', 'greedy', 'backtracking', 'bit-manipulation',
      'math', 'basics', 'oop', 'database', 'other'
    ]
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  
  // Tutorial Specific Fields
  tutorialContent: {
    markdown: String,
    videoUrl: String,
    exampleCode: [{
      language: String,
      code: String
    }],
    keyPoints: [String]
  },
  
  // Quiz Specific Fields
  quizQuestions: [{
    question: {
      type: String,
      required: function() { return this.contentType === 'quiz'; }
    },
    options: [String],
    correctAnswer: Number,
    explanation: String,
    points: {
      type: Number,
      default: 10
    }
  }],
  
  // Challenge Specific Fields
  challengeDetails: {
    problemStatement: String,
    inputFormat: String,
    outputFormat: String,
    constraints: [String],
    examples: [{
      input: String,
      output: String,
      explanation: String
    }],
    testCases: [{
      input: String,
      expectedOutput: String,
      isHidden: {
        type: Boolean,
        default: false
      },
      points: {
        type: Number,
        default: 10
      }
    }],
    starterCode: [{
      language: String,
      code: String
    }],
    timeLimit: {
      type: Number,
      default: 2000 // milliseconds
    },
    memoryLimit: {
      type: Number,
      default: 256 // MB
    }
  },
  
  // Scoring & Metrics
  points: {
    type: Number,
    default: 100
  },
  estimatedTime: {
    type: Number, // in minutes
    default: 30
  },
  
  // Statistics
  statistics: {
    totalAttempts: {
      type: Number,
      default: 0
    },
    successfulSolves: {
      type: Number,
      default: 0
    },
    averageAttempts: {
      type: Number,
      default: 0
    },
    averageTime: {
      type: Number,
      default: 0
    }
  },
  
  // Meta
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  
  // Prerequisites
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  }]
}, {
  timestamps: true
});

// Create slug from title
contentSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});

const Content = mongoose.model('Content', contentSchema);
export default Content;
