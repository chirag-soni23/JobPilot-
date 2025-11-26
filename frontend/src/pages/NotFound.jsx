import { Link } from "react-router-dom";
import { ArrowLeftCircle, Home } from "lucide-react";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-160px)] px-6 bg-[#f8f9fb] dark:bg-gray-900">
      <h1 className="text-[8rem] font-extrabold text-[#0A65CC] dark:text-blue-400 leading-none">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800 dark:text-white">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-md mt-3">
        The page you're looking for might have been moved, deleted, or possibly
        never existed. Don’t worry, let’s get you back on track!
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Link
          to="/"
          className="bg-[#0A65CC] hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
        >
          <Home className="w-5 h-5" /> Go Home
        </Link>

        <Link
          to="/findjobs"
          className="border border-[#0A65CC] text-[#0A65CC] dark:text-blue-400 dark:border-blue-400 hover:bg-[#0A65CC] hover:text-white dark:hover:bg-blue-600 font-medium px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
        >
          <ArrowLeftCircle className="w-5 h-5" /> Browse Jobs
        </Link>
      </div>

     
    </section>
  );
};

export default NotFound;
