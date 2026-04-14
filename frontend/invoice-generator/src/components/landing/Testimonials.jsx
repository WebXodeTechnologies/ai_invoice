import { Quote } from "lucide-react";
import { TESTIMONIALS } from "../../utils/data";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 lg:py-28 bg-linear-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Trusted by freelancers and businesses worldwide
          </p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden group">

          {/* Gradient edges */}
          <div className="absolute left-0 top-0 h-full w-20 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-20 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-8 animate-scroll group-hover:[animation-play-state:paused]">

            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div
                key={i}
                className="
                  relative
                  min-w-75 sm:min-w-85 lg:min-w-95
                  bg-white/70 backdrop-blur-md
                  border border-gray-200/60
                  rounded-xl
                  p-6 sm:p-8
                  shadow-md
                  hover:shadow-2xl
                  transition-all duration-300
                  hover:-translate-y-2
                  group/card
                "
              >
                {/* Top Gradient Glow */}
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-blue-100/20 to-transparent opacity-0 group-hover/card:opacity-100 transition"></div>

                {/* Quote Icon */}
                <Quote className="w-7 h-7 text-blue-900 mb-4 opacity-60" />

                {/* Quote Text */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                  "{t.quote}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                  />

                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {t.author}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {t.title}
                    </p>
                  </div>
                </div>

                {/* Bottom subtle line */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-blue-900 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition"></div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-scroll {
            animation: scroll 25s linear infinite;
            width: max-content;
          }
        `}
      </style>
    </section>
  );
};

export default Testimonials;