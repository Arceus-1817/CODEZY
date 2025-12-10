import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";

const AuthPage = () => {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [creds, setCreds] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    try {
      setLoading(true);

      if (mode === "register") {
       
        await LoginService.Test_Reg(creds);
        setMessage("Registration successful ");
        navigate("/", { replace: true });
      } else {
         const res = await LoginService.Test_login(creds.email, creds.password);
          localStorage.setItem("token", res.data.token);
        setMessage("Login successful ");
        navigate("/profile", { replace: true });
      }
    } catch (error) {
      console.error("error", error);
      const fallback =
        mode === "register" ? "Registration failed" : "Login failed";
      setError(error?.response?.data?.message || fallback);
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    setMode("login");
    setError(null);
    setMessage("");
  };

  const switchToRegister = () => {
    setMode("register");
    setError(null);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl shadow-slate-900/50 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            {mode === "login" ? "Welcome back 👋" : "Create an account ✨"}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {mode === "login"
              ? "Sign in to continue to your dashboard."
              : "Sign up to get started with CodEzy."}
          </p>
        </div>

        {/* Mode tabs */}
        <div className="flex mb-6 rounded-xl bg-slate-800/80 p-1">
          <button
            type="button"
            onClick={switchToLogin}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all
              ${
                mode === "login"
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={switchToRegister}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all
              ${
                mode === "register"
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
          >
            Register
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 text-sm rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 px-3 py-2">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 text-sm rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 px-3 py-2">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="text-sm font-medium text-slate-200"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={creds.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                autoComplete="off"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={creds.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-200"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={creds.password}
              onChange={handleChange}
              placeholder={
                mode === "login" ? "Enter your password" : "Create a password"
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-900/50 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
                {mode === "login" ? "Signing you in..." : "Creating account..."}
              </>
            ) : (
              <span>{mode === "login" ? "Login" : "Create account"}</span>
            )}
          </button>
        </form>

        {/* Switch text */}
        <div className="mt-6 text-center text-sm text-slate-400">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={switchToRegister}
                className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={switchToLogin}
                className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
