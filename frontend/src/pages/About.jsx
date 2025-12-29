import { Building, Target, Award, Users, CheckCircle } from 'lucide-react';

export default function About() {
    return (
        <div className="flex flex-col">
            {/* Header */}
            <section className="bg-blue-600 py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 patterned-bg"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Company</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        We are on a mission to revolutionize, by connecting exceptional talent with world-changing organizations through technology and human insight.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Team Meeting"
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                                Since 2020
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900">Pioneering the Future of Work</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Founded with a vision to simplify the complex world of recruitment, JobPortal has grown from a small startup to a global leader in talent acquisition solutions. We believe that the right job can change a person's life, and the right person can transform a business.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our technology-driven approach, combined with deep industry expertise, allows us to make matches that last. We are more than just a job board; we are career partners for candidates and growth partners for businesses.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-6">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-3xl font-bold text-blue-600 mb-1">50+</p>
                                    <p className="text-gray-600">Countries Served</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-3xl font-bold text-blue-600 mb-1">200M+</p>
                                    <p className="text-gray-600">Applications Processed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-10 rounded-2xl shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Target className="w-32 h-32 text-blue-600" />
                            </div>
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To empower professionals to reach their full potential and enable organizations to build high-performing, diverse teams that drive innovation and success in the global economy.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Building className="w-32 h-32 text-purple-600" />
                            </div>
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                                <Building className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To be the world's most trusted and effective talent platform, creating a future where every individual has access to meaningful work and every company can find the talent they need to thrive.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">These principles guide every decision we make and every interaction we have.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Integrity First", desc: "We operate with transparency, honesty, and ethical standards in all aspects of our business." },
                            { title: "People Centric", desc: "We prioritize the needs and well-being of our candidates, clients, and employees above all else." },
                            { title: "Innovation", desc: "We constantly push boundaries and seek new ways to solve complex recruitment challenges." },
                            { title: "Excellence", desc: "We strive for the highest quality in our services, technology, and support." },
                            { title: "Inclusion", desc: "We champion diversity and work to create equitable opportunities for everyone." },
                            { title: "Collaboration", desc: "We believe we are stronger together and foster a culture of teamwork and shared success." }
                        ].map((value, idx) => (
                            <div key={idx} className="flex gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                                    <p className="text-gray-600 text-sm">{value.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
