import React from "react";
import { ArrowLeft, Lock, Mail, User } from "lucide-react";

const AuthForm = ({
  view,
  formData,
  errors,
  handleChange,
  handleSubmit,
  switchView,
}) => {
  const renderLoginForm = () => (
    <>
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center text-white tracking-tight">
        Welcome Back
      </h2>
      <p className="text-gray-400 text-center mb-8 text-sm sm:text-base">
        Sign in to your account
      </p>
      {/* Email */}
      <div className="mb-5">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Mail size={20} />
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3.5 bg-zinc-900/70 text-white border rounded-xl 
focus:outline-none focus:ring-2 focus:ring-indigo-500 
transition-all duration-200 placeholder:text-gray-500 
${errors.email ? "border-red-500" : "border-zinc-700 hover:border-zinc-600"}`}
          />
        </div>
        <p className="text-red-400 text-xs mt-1 ml-1 min-h-[1rem]">
          {errors.email || ""}
        </p>
      </div>

      {/* Password */}
      <div className="mb-5">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock size={20} />
          </span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3.5 bg-zinc-900/70 text-white border rounded-xl 
focus:outline-none focus:ring-2 focus:ring-indigo-500 
transition-all duration-200 placeholder:text-gray-500 
${errors.password ? "border-red-500" : "border-zinc-700 hover:border-zinc-600"}`}
          />
        </div>
        <p className="text-red-400 text-xs mt-1 ml-1 min-h-[1rem]">
          {errors.password || ""}
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          type="button"
          className="text-xs sm:text-sm font-medium text-indigo-400 hover:text-indigo-300 transition"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
font-semibold py-3.5 rounded-xl shadow-lg 
hover:brightness-110 transition-all duration-300 
active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login
      </button>

      <p className="text-gray-400 text-center mb-8 text-sm sm:text-base">
        Don't have an account?
        <button
          type="button"
          onClick={() => switchView("register")}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          Register now
        </button>
      </p>
    </>
  );

  const renderRegisterForm = () => (
    <>
      <button
        onClick={() => switchView("login")}
        className="ml-1 text-indigo-400 hover:text-indigo-300 font-semibold transition"
      >
        <ArrowLeft size={20} />
      </button>
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center text-white tracking-tight">
        Create an account
      </h2>
      <p className="text-gray-400 text-center mb-8 text-sm sm:text-base">
        Connect with people
      </p>

      {/* Username */}
      <div className="mb-5">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <User size={20} />
          </span>
          <input
            type="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3.5 bg-zinc-900/70 text-white border rounded-xl 
focus:outline-none focus:ring-2 focus:ring-indigo-500 
transition-all duration-200 placeholder:text-gray-500 
${errors.username ? "border-red-500" : "border-zinc-700 hover:border-zinc-600"}`}
          />
        </div>
        <p className="text-red-400 text-xs mt-1 ml-1 min-h-[1rem]">
          {errors.username || ""}
        </p>
      </div>

      {/* Email */}
      <div className="mb-5">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Mail size={20} />
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3.5 bg-zinc-900/70 text-white border rounded-xl 
focus:outline-none focus:ring-2 focus:ring-indigo-500 
transition-all duration-200 placeholder:text-gray-500 
${errors.email ? "border-red-500" : "border-zinc-700 hover:border-zinc-600"}`}
          />
        </div>
        <p className="text-red-400 text-xs mt-1 ml-1 min-h-[1rem]">
          {errors.email || ""}
        </p>
      </div>

      {/* Password */}
      <div className="mb-5">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock size={20} />
          </span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3.5 bg-zinc-900/70 text-white border rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 
            transition-all duration-200 placeholder:text-gray-500 
        ${errors.password ? "border-red-500" : "border-zinc-700 hover:border-zinc-600"}`}
          />
        </div>
        <p className="text-red-400 text-xs mt-1 ml-1 min-h-[1rem]">
          {errors.password || ""}
        </p>
      </div>

      <button
        type="submit"
        className="w-full text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
font-semibold py-3.5 rounded-xl shadow-lg 
hover:brightness-110 transition-all duration-300 
active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login
      </button>

      <p className="text-gray-400 text-center mb-8 text-sm sm:text-base">
        Already have an account?
        <button
          type="button"
          onClick={() => switchView("login")}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          Log in
        </button>
      </p>
    </>
  );

  const renderForm = () => {
    switch (view) {
      case "login":
        return renderLoginForm();
      case "register":
        return renderRegisterForm();
      default:
        return renderLoginForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      {renderForm()}
    </form>
  );
};

export default AuthForm;
