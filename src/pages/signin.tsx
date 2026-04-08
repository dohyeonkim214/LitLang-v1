import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const getAuthErrorMessage = (code?: string) => {
  switch (code) {
    case "auth/unauthorized-domain":
      return "Google login is blocked for this domain. In Firebase Console > Authentication > Settings > Authorized domains, add this host (for local dev use localhost:5173).";
    case "auth/popup-blocked":
      return "Popup was blocked by the browser. Switching to redirect login.";
    case "auth/popup-closed-by-user":
      return "The Google login popup was closed before completing sign in.";
    case "auth/network-request-failed":
      return "Network error while contacting Google/Firebase. Check your connection and retry.";
    default:
      return "Google login failed. Please try again.";
  }
};

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleEmailLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/activity"); // 로그인 성공 시 이동할 경로
    } catch (error: any) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
      navigate("/activity"); // Google 로그인 성공 시 이동할 경로
    } catch (error: any) {
      console.error("Google login error:", error);
      const message = getAuthErrorMessage(error?.code);
      alert(message);

      if (error?.code === "auth/popup-blocked") {
        await signInWithRedirect(auth, googleProvider);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">Sign In</h1>

        {/* Email/Password Login */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleEmailLogin}
          disabled={loading}
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Sign In"}
        </button>

        {/* Google Login */}
        <div className="my-6 text-center text-gray-500">or</div>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
        >
          {loading ? "Signing in with Google..." : "Sign In with Google"}
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;