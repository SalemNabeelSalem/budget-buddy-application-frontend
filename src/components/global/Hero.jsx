import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-gray-50">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-150 h-150 bg-blue-200/30 blur-3xl rounded-full -mt-25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-10 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
          🚀 Smart Finance Made Simple
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Manage Your Money <br className="hidden md:block" />
          <span className="text-blue-600">Smarter & Faster</span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 leading-relaxed">
          Track your income, control your expenses, and gain powerful insights
          into your financial life — all in one simple and intuitive platform.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">

          <Link
            to="/signup"
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Get Started for Free
          </Link>

          <Link
            to="/signup"
            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-800 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            See How It Works
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-sm text-gray-400">
          No credit card required • Free forever plan
        </div>
      </div>
    </section>
  );
};

export default HeroSection;