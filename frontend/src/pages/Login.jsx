import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const [view, setView] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const switchView = (newView) => {
    setView(newView);
    setErrors({});
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-4 sm:px-6 text-white">
      <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-white/5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row">
        {/* LEFT SECTION */}
        <div className="hidden md:flex md:w-1/2 relative items-center justify-center p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>

          <div className="relative z-10 text-center space-y-4 max-w-sm">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-extrabold">
              ⚡
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight">
              Welcome Back
            </h1>

            <p className="text-gray-100 text-base leading-relaxed">
              Connect with friends, share moments, and build meaningful
              conversations in one place.
            </p>

            <div className="pt-6 flex justify-center gap-3">
              <span className="px-4 py-1 text-sm rounded-full bg-white/20">
                Fast
              </span>
              <span className="px-4 py-1 text-sm rounded-full bg-white/20">
                Secure
              </span>
              <span className="px-4 py-1 text-sm rounded-full bg-white/20">
                Social
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <AuthForm
              view={view}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              switchView={switchView}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
