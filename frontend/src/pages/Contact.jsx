import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
    };

    return (
        <div className="flex flex-col">
            {/* Header */}
            <section className="bg-gray-50 py-20 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
                    <p className="text-xl text-gray-600">
                        We'd love to hear from you. Whether you have a question about our services, pricing, or just want to say hi, our team is ready to answer all your questions.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                            <p className="text-gray-600 mb-8 max-w-lg">
                                Fill out the form and our team will get back to you within 24 hours. Or consult us via phone or email for immediate support.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Email</h3>
                                    <p className="text-gray-600 mb-1">Our support team is here to help.</p>
                                    <a href="mailto:contact@jobportal.com" className="text-blue-600 font-semibold hover:underline">contact@jobportal.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Office</h3>
                                    <p className="text-gray-600 mb-1">Come say hello at our office HQ.</p>
                                    <p className="text-blue-600 font-semibold">123 Business Avenue, Tech District<br />Hyderabad, Telangana 500081</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Phone</h3>
                                    <p className="text-gray-600 mb-1">Mon-Fri from 9am to 6pm.</p>
                                    <a href="tel:+914012345678" className="text-blue-600 font-semibold hover:underline">+91 40 1234 5678</a>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Connect on Social</h3>
                            <div className="flex gap-4">
                                {/* Social icons would go here */}
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                                    <span className="font-bold">in</span>
                                </div>
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-400 hover:text-white transition-all cursor-pointer">
                                    <span className="font-bold">tw</span>
                                </div>
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-700 hover:text-white transition-all cursor-pointer">
                                    <span className="font-bold">fb</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <MessageSquare className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                                <p className="text-gray-600 text-lg mb-8">
                                    Thank you for contacting us. We will get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">My name is</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">My email is</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">I want to discuss</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-0 outline-none transition-all bg-white"
                                        value={form.subject}
                                        onChange={e => setForm({ ...form, subject: e.target.value })}
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="services">Custom Software Services</option>
                                        <option value="careers">Careers & Jobs</option>
                                        <option value="support">Technical Support</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                    <textarea
                                        required
                                        rows="4"
                                        placeholder="Tell us about your project or inquiry..."
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-0 outline-none transition-all resize-none"
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    <button type="submit" className="w-full btn btn-primary bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg shadow-lg flex items-center justify-center gap-2 group">
                                        Send Message
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <p className="text-xs text-gray-400 text-center mt-4">
                                        By submitting this form, you agree to our privacy policy and terms of service.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
