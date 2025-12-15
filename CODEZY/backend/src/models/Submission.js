import mongoose from 'mongoose';
const submissionSchema = new mongoose.Schema({
  // User & Content Reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  
  // Submission Type
  submissionType: {
    type: String,
    enum: ['challenge', 'quiz', 'duel'],
    required: true
  },
  
  // Code Submission (for challenges)
  codeSubmission: {
    language: String,
    sourceCode: String,
    executionTime: Number, // milliseconds
    memoryUsed: Number, // MB
  },
  
  // Quiz Submission (for quizzes)
  quizAnswers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    selectedAnswer: Number,
    isCorrect: Boolean,
    pointsEarned: Number
  }],
  
  // Execution Results
  status: {
    type: String,
    enum: ['pending', 'running', 'accepted', 'wrong-answer', 'time-limit-exceeded', 
           'memory-limit-exceeded', 'runtime-error', 'compilation-error'],
    default: 'pending'
  },
  testResults: [{
    testCaseId: mongoose.Schema.Types.ObjectId,
    passed: Boolean,
    input: String,
    expectedOutput: String,
    actualOutput: String,
    executionTime: Number,
    errorMessage: String
  }],
  
  // Scoring
  score: {
    type: Number,
    default: 0
  },
  maxScore: {
    type: Number,
    required: true
  },
  
  // AI Feedback
  aiFeedback: {
    correctness: {
      score: Number,
      comments: String
    },
    efficiency: {
      timeComplexity: String,
      spaceComplexity: String,
      score: Number,
      comments: String
    },
    codeQuality: {
      readability: Number,
      maintainability: Number,
      bestPractices: Number,
      comments: String
    },
    suggestions: [String],
    overallRating: {
      type: Number,
      min: 0,
      max: 10
    },
    generatedAt: Date
  },
  
  // Metadata
  attemptNumber: {
    type: Number,
    default: 1
  },
  isFirstSuccessfulSubmission: {
    type: Boolean,
    default: false
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
submissionSchema.index({ user: 1, content: 1, createdAt: -1 });

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;