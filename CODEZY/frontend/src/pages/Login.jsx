import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Github, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

/* -----------------------------
   API helper (Node / Express)
------------------------------*/
async function loginRequest(email, password, remember) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, remember }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Invalid credentials");
  }

  return res.json();
}

export default function AuthPage() {
  const navigate = useNavigate();

  /* -----------------------------
     State
  ------------------------------*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("dark");

  /* -----------------------------
     Fix: Fullscreen layout issue
     (root divs in Vite often
      limit width by default)
  ------------------------------*/
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
  }, [theme]);

  /* -----------------------------
     Theme toggle
  ------------------------------*/
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  /* -----------------------------
     Login handler
  ------------------------------*/
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const data = await loginRequest(email, password, remember);
      localStorage.setItem("token", data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex">
      {/* -----------------------------
          LEFT BRAND SECTION
      ------------------------------*/}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 relative items-center justify-center"
      >
        <div className="px-20">
          <h1 className="text-6xl font-semibold tracking-tight text-white">CodEzy</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mt-4" />
          <p className="mt-8 text-xl text-slate-300 max-w-md">
            AI-powered coding platform for developers who ship faster.
          </p>
        </div>

        {/* Floating glass cards */}
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute bottom-28 left-32 w-52 h-52 rounded-3xl bg-gradient-to-br from-cyan-500/30 to-indigo-500/20 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 35, 0] }}
          transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
          className="absolute bottom-48 left-72 w-64 h-64 rounded-3xl bg-gradient-to-br from-indigo-500/30 to-purple-500/20 blur-xl"
        />
      </motion.div>

      {/* -----------------------------
          RIGHT AUTH CARD
      ------------------------------*/}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-xl rounded-3xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-xl p-10 shadow-2xl"
        >
          {/* Theme toggle */}
          {/* <button
            onClick={toggleTheme}
            className="absolute right-5 top-5 rounded-full p-2 text-slate-300 hover:bg-slate-800"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button> */}

          <h2 className="text-3xl font-semibold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-400">Log in to continue to CodEzy</p>

          {/* OAuth */}
          <div className="mt-8 space-y-3">
            <button className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900 py-3 text-sm text-white hover:bg-slate-800 transition">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-4" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900 py-3 text-sm text-white hover:bg-slate-800 transition">
              <Github className="h-4 w-4" />
              Continue with GitHub
            </button>
          </div>

          <div className="my-8 flex items-center gap-3 text-slate-500 text-xs">
            <div className="flex-1 h-px bg-slate-700" />
            or continue with email
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm text-slate-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="relative">
              <label className="text-sm text-slate-300">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between text-sm text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-indigo-500"
                />
                Remember me
              </label>
              <button type="button" className="hover:text-indigo-400">Forgot password?</button>
            </div>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60 transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            Don&apos;t have an account? <button className="text-indigo-400 hover:underline">Sign up</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
