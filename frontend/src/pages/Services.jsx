import { Code2, PenTool, Database, Shield, Smartphone, LineChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
    const services = [
        {
            icon: Code2,
            color: "blue",
            title: "Software Development",
            description: "Custom software solutions tailored to your unique business needs, from enterprise applications to scalable web platforms."
        },
        {
            icon: Smartphone,
            color: "purple",
            title: "Mobile App Development",
            description: "Native and cross-platform mobile applications that provide seamless user experiences on iOS and Android devices."
        },
        {
            icon: Database,
            color: "green",
            title: "Data Engineering",
            description: "Robust data infrastructure, ETL pipelines, and analytics platforms to help you turn raw data into actionable insights."
        },
        {
            icon: Shield,
            color: "indigo",
            title: "Cybersecurity",
            description: "Comprehensive security assessments, penetration testing, and compliance solutions to protect your digital assets."
        },
        {
            icon: PenTool,
            color: "pink",
            title: "UI/UX Design",
            description: "User-centered design services that create intuitive, engaging, and beautiful digital products."
        },
        {
            icon: LineChart,
            color: "orange",
            title: "Digital Consulting",
            description: "Strategic technology consulting to help navigate digital transformation and optimize business processes."
        }
    ];

    return (
        <div className="flex flex-col">
            {/* Header */}
            <section className="bg-gray-900 text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 opacity-10 rounded-l-full transform translate-x-1/3"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        We deliver cutting-edge technology solutions that drive business growth and operational excellence.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, idx) => (
                            <div
                                key={idx}
                                className="group p-8 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 bg-white"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 bg-${service.color}-50 group-hover:bg-${service.color}-500 text-${service.color}-600 group-hover:text-white`}>
                                    <service.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                                <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                    Learn More <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Methodology</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">A proven approach to delivering excellence</p>
                    </div>

                    <div className="relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 hidden md:block"></div>
                        <div className="grid md:grid-cols-4 gap-8 relative z-10">
                            {[
                                { number: "01", title: "Discovery", desc: "Understanding your needs and goals" },
                                { number: "02", title: "Strategy", desc: "Developing a tailored roadmap" },
                                { number: "03", title: "Execution", desc: "Agile implementation and delivery" },
                                { number: "04", title: "Optimize", desc: "Continuous improvement and support" }
                            ].map((step, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-blue-500 transition-colors text-center">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 border-4 border-white shadow-sm">
                                        {step.number}
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                                    <p className="text-sm text-gray-600">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-600 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center text-white">
                    <h2 className="text-4xl font-bold mb-6">Need a custom solution?</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Our team of experts is ready to tackle your most complex challenges. Let's discuss how we can help your business thrive.
                    </p>
                    <Link
                        to="/contact"
                        className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center gap-2"
                    >
                        Get a Quote
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
