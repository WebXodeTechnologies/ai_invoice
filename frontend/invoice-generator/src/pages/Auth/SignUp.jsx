import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  FileText,
  ArrowRight,
  User,
  CheckCircle2,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { login } = useAuth(); // Note: matching lowercase 'login' from your context
  const navigate = useNavigate();

  // State Logic
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation Logic
  const validate = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length >= 3 ? "" : "Full name is required (min 3 chars)";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email address";
      case "password":
        return value.length >= 6 ? "" : "Password must be at least 6 characters";
      case "confirmPassword":
        return value === formData.password ? "" : "Passwords do not match";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const isFormValid = () => {
    const errors = {
      name: validate("name", formData.name),
      email: validate("email", formData.email),
      password: validate("password", formData.password),
      confirmPassword: validate("confirmPassword", formData.confirmPassword),
    };
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsLoading(true);
    setError("");

    try {
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      // Using the verified nested path: API_PATHS.AUTH.REGISTER
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, submissionData);
      
      const { user, token } = response.data;

      if (token) {
        login(user, token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Side: Branding (Shared with Login for consistency) */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[120px] rounded-full" />

        <div className="relative z-10 flex items-center gap-2 text-white font-bold text-xl">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileText size={24} />
          </div>
          <span>AI Invoice App</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-semibold text-white leading-tight mb-6">
            Join the future of <br />
            <span className="text-blue-500">automated billing.</span>
          </h2>
          <div className="space-y-4">
            {["AI-powered extraction", "Customizable templates", "One-click reminders"].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-400">
                <CheckCircle2 size={18} className="text-blue-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-500 text-sm">© 2026 AI Invoice app Inc.</p>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500">Get started with your 14-day free trial.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter Your Full name"
                  className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:ring-4 ${
                    fieldErrors.name && touched.name ? "border-red-300 focus:ring-red-50" : "border-slate-200 focus:border-blue-600 focus:ring-blue-50"
                  }`}
                />
              </div>
              {fieldErrors.name && touched.name && <p className="text-xs text-red-500 ml-1">{fieldErrors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="name@company.com"
                  className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:ring-4 ${
                    fieldErrors.email && touched.email ? "border-red-300 focus:ring-red-500" : "border-slate-200 focus:border-blue-600 focus:ring-blue-50"
                  }`}
                />
              </div>
              {fieldErrors.email && touched.email && <p className="text-xs text-red-500 ml-1">{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:ring-4 ${
                    fieldErrors.password && touched.password ? "border-red-300 focus:ring-red-50" : "border-slate-200 focus:border-blue-600 focus:ring-blue-50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.password && touched.password && <p className="text-xs text-red-500 ml-1">{fieldErrors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:ring-4 ${
                    fieldErrors.confirmPassword && touched.confirmPassword ? "border-red-300 focus:ring-red-50" : "border-slate-200 focus:border-blue-600 focus:ring-blue-50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.confirmPassword && touched.confirmPassword && <p className="text-xs text-red-500 ml-1">{fieldErrors.confirmPassword}</p>}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !formData.name || !formData.email || !formData.password}
              className="w-full bg-slate-950 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl shadow-slate-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Creating Account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-blue-600 font-bold hover:underline">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;