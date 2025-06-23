import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";

const Signup = () => {
  return (
    <section className="min-h-screen relative flex bg-white overflow-hidden">
      {/* Left Panel */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-500 to-blue-400 text-white p-10 relative z-10 flex flex-col justify-center">
        {/* Background Blob */}
        <img
          src={assets.blob}
          alt="blob background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Heading */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-bold leading-snug">
            Stay on top of <br />
            time tracking
          </h2>
        </div>
      </div>

      <img
        src={assets.illustration}
        alt="illustration"
        className="absolute top-50 left-80 w-[400px] z-30"
      />

      <div className="w-[60%] absolute right-0 top-0 h-full bg-white rounded-bl-[100px] rounded-tl-[100px] shadow-2xl z-20 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>

          <form className="space-y-4 mt-6">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-medium hover:opacity-90 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
