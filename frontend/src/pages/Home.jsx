import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Globe, Users, TrendingUp, Building2 } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-white opacity-20 transform skew-x-12 translate-x-20" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-purple-50 to-white opacity-20 rounded-tr-full" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-fadeInLeft">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Connecting Top Talent with Global Leaders
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                Build Your Future with <span className="text-gradient">Innovators.</span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                We bridge the gap between ambitious professionals and world-class organizations. Your next career breakthrough starts here.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/careers"
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 flex items-center gap-2"
                                >
                                    Explore Careers
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/about"
                                    className="px-8 py-4 bg-white border-2 border-gray-100 hover:border-blue-100 text-gray-700 hover:text-blue-700 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center gap-2"
                                >
                                    Learn More
                                </Link>
                            </div>

                            <div className="pt-8 grid grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 border-t border-gray-100">
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">20+</p>
                                    <p className="text-sm text-gray-500">States in India</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">500+</p>
                                    <p className="text-sm text-gray-500">Partner Companies</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">25k+</p>
                                    <p className="text-sm text-gray-500">Apps Received</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">20k+</p>
                                    <p className="text-sm text-gray-500">Apps Processed</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">3k+</p>
                                    <p className="text-sm text-gray-500">Shortlisted</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">1.8k+</p>
                                    <p className="text-sm text-gray-500">Succesfully Placed</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative animate-fadeInRight hidden lg:block">
                            <div className="relative z-10 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-3xl p-1 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                                <div className="bg-white rounded-2xl overflow-hidden h-[600px] relative">
                                    {/* Abstract UI Representation */}
                                    <div className="absolute top-0 left-0 w-full h-full bg-gray-50 opacity-50 patterned-bg" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center space-y-6">
                                            <div className="w-24 h-24 bg-blue-100 rounded-2xl mx-auto flex items-center justify-center text-blue-600 mb-6 animate-float">
                                                <Building2 className="w-12 h-12" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900">Enterprise Solutions</h3>
                                            <div className="flex justify-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-green-500 animate-bounce delay-100">
                                                    <Users className="w-6 h-6" />
                                                </div>
                                                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-purple-500 animate-bounce delay-200">
                                                    <Globe className="w-6 h-6" />
                                                </div>
                                                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-orange-500 animate-bounce delay-300">
                                                    <TrendingUp className="w-6 h-6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-blue-100 rounded-3xl transform -rotate-3" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Top Professionals Choose Us</h2>
                        <p className="text-lg text-gray-600">We don't just find jobs; we build careers. Our platform is designed to connect you with opportunities that align with your goals.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Globe,
                                title: "Global Opportunities",
                                description: "Access a worldwide network of top-tier companies and startups actively hiring."
                            },
                            {
                                icon: Users,
                                title: "Expert Network",
                                description: "Join a community of thousands of professionals and gain insights from industry leaders."
                            },
                            {
                                icon: TrendingUp,
                                title: "Accelerated Growth",
                                description: "Find roles that challenge you and provide clear paths for career advancement."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl">
                        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of professionals who have found their dream jobs through our platform. applying takes less than 5 minutes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/careers"
                                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                            >
                                Browse Open Positions
                            </Link>
                            <Link
                                to="/contact"
                                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-colors"
                            >
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
