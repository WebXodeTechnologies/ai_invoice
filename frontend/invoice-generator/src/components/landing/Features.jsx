import { ArrowRight } from "lucide-react";
import { FEATURES } from "../../utils/data";

const Features = () => {
    return (
        <section id="features" className="py-16 sm:py-20 lg:py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Powerful Features to Run Your Business
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg">
                        Everything you need to manage invoices, track payments, and grow
                        your business.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="group bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-900 mb-5 group-hover:scale-110 transition">
                                    <Icon className="w-6 h-6" />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* CTA */}
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-blue-900 font-medium text-sm hover:gap-3 transition-all"
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
