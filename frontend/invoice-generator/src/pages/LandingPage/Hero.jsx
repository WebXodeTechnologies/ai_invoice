import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Hero = () => {
  const {isAuthenticated} = useAuth();

  return (
    <section className="relative bg-[#fbfbfb] overflow-hidden">
      {/* Background Grid */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 leading-tight sm:leading-snug tracking-tight mb-5 sm:mb-6">
            AI Powered Invoicing, Made Effortless
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto">
            Let our AI create invoices from simple text, generate payment
            reminders, and provide smart insights to help you manage your
            finances.
            <br className="hidden sm:block" />
            <span className="block mt-2">
              Get started for free. Learn more.
            </span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto text-center bg-linear-to-r from-blue-950 to-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold sm:font-bold text-base sm:text-lg hover:bg-blue-900 transition-all duration-200 hover:scale-105 hover:shadow-xl"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/signup"
                className="w-full sm:w-auto text-center bg-linear-to-r from-blue-950 to-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold sm:font-bold text-base sm:text-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105 hover:shadow-xl"
              >
                Get Started Free
              </Link>
            )}

            <a
              href="#features"
              className="w-full sm:w-auto text-center border-2 border-black text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold sm:font-bold text-base sm:text-lg hover:bg-black hover:text-white transition-all duration-200 hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 relative max-w-5xl mx-auto px-2 sm:px-0">
          {/* Uncomment when needed */}
          {/*
          <img
            src={heroImg}
            alt="Invoice App Screenshot"
            className="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-gray-200"
          />
          */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
