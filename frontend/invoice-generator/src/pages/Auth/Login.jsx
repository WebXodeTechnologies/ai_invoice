import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  FileText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State Logic
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });

  // Validation Logic
  const validate = (name, value) => {
    if (name === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Invalid email address";
    }
    if (name === "password") {
      return value.length >= 6 ? "" : "Password must be at least 6 characters";
    }
    return "";
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
    return (
      formData.email &&
      formData.password &&
      !fieldErrors.email &&
      !fieldErrors.password
    );
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isFormValid()) return;

  setIsLoading(true);
  setError("");

  console.log("🚀 Attempting Login with:", formData.email);

  try {
    const submissionData = {
      email: formData.email.trim(),
      password: formData.password,
    };

    // Corrected the path to match your nested API_PATHS object
    console.log("🔗 Hitting API Path:", API_PATHS.AUTH.LOGIN);

    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, submissionData);
    
    console.log("📥 Full Backend Response:", response.data);

    /**
     * FIX: Rest Operator Mapping
     * Since your backend returns { _id, name, email, token, ... } 
     * we extract 'token' and group everything else into 'userData'
     */
    const { token, ...userData } = response.data;
    
    if (token) {
        console.log("✅ Token found! User data mapped:", userData);
        
        // Pass the correctly shaped data to your AuthContext
        login(userData, token); 
        
        navigate("/dashboard");
    } else {
        console.warn("⚠️ Response success, but NO TOKEN found. Check backend response structure.");
        setError("Authentication failed: No token received.");
    }
  } catch (err) {
    console.error("❌ Login Error Object:", err);
    
    if (err.response) {
      console.error("❌ Backend Error Data:", err.response.data);
    } else if (err.request) {
      console.error("❌ No response received. Server might be down.");
    }

    const message = err.response?.data?.message || "Invalid email or password.";
    setError(message);
    
    // Clear password for security on failed attempt
    setFormData(prev => ({ ...prev, password: "" }));
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Side: Branding/Marketing (Hidden on Mobile) */}
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
            The easiest way to <br />
            <span className="text-blue-500">manage your billing.</span>
          </h2>
          <div className="space-y-4">
            {[
              "Real-time tracking",
              "Automated reminders",
              "Secure payments",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-400">
                <CheckCircle2 size={18} className="text-blue-500" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-500 text-sm">
          © 2026 AI Invoice app Inc. All rights reserved.
        </p>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 lg:p-24">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-500 font-medium">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="name@company.com"
                  className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:ring-4
                                    ${
                                      fieldErrors.email && touched.email
                                        ? "border-red-300 focus:ring-red-50"
                                        : "border-slate-200 focus:border-blue-600 focus:ring-blue-50"
                                    }`}
                />
              </div>
              {fieldErrors.email && touched.email && (
                <p className="text-xs text-red-500 font-medium ml-1">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:ring-4
                                    ${
                                      fieldErrors.password && touched.password
                                        ? "border-red-300 focus:ring-red-50"
                                        : "border-slate-200 focus:border-blue-600 focus:ring-blue-50"
                                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.password && touched.password && (
                <p className="text-xs text-red-500 font-medium ml-1">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-shake">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="w-full bg-slate-950 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-xl shadow-slate-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Signing in...
                </>
              ) : (
                <>
                  <span className="mt-0.5">Sign In</span>{" "}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 font-bold hover:underline underline-offset-4"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
