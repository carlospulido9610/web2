
import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Shield } from 'lucide-react';

export const PrivacyPolicyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const effectiveDate = "January 21, 2026";

    return (
        <div className="bg-wood-50 min-h-screen animate-fade-in-up font-manrope text-wood-900">
            {/* Header */}
            <div className="bg-wood-900 text-wood-50 pt-24 md:pt-32 pb-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-wood-400 hover:text-wood-100 transition-colors mb-8 text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        <ArrowLeft size={16} /> Back to Home
                    </button>
                    <div className="flex items-center gap-4 mb-4 text-wood-400">
                        <Shield size={24} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Legal Document</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-canale uppercase tracking-tight leading-none mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-wood-400 opacity-80 font-medium">
                        Effective Date: {effectiveDate}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-wood-100">

                    <div className="prose prose-wood max-w-none">
                        <p className="text-lg leading-relaxed text-wood-600 mb-8">
                            Raval Carpentry ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or engage our carpentry services in Texas, USA.
                        </p>

                        <section className="mb-10">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">1. Information We Collect</h2>
                            <p className="text-wood-600 mb-4 text-sm leading-relaxed">
                                We collect information that identifies, relates to, describes, or could reasonably be linked to you ("Personal Data"). This includes:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-wood-600 text-sm">
                                <li><strong>Identity Data:</strong> Name, phone number, email address, physical address.</li>
                                <li><strong>Project Data:</strong> Photos of your home, measurements, design preferences, and project budget.</li>
                                <li><strong>Technical Data:</strong> IP address, browser type, and usage data when interacting with our website.</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">2. How We Use Your Information</h2>
                            <p className="text-wood-600 mb-4 text-sm leading-relaxed">
                                We use your data for legitimate business purposes, including:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-wood-600 text-sm">
                                <li>Providing quotes, scheduling appointments, and completing carpentry projects.</li>
                                <li>Communicating with you regarding your project status.</li>
                                <li>Processing payments and invoicing.</li>
                                <li>Sending SMS updates and promotional offers (only with your explicit consent).</li>
                                <li>Improving our website and customer service.</li>
                            </ul>
                        </section>

                        <section className="bg-wood-50 p-6 rounded-sm border border-wood-200 mb-10">
                            <h2 className="text-xl font-canale uppercase text-wood-900 mb-4 tracking-tight flex items-center gap-2">
                                <span className="w-2 h-2 bg-wood-900 rounded-full"></span>
                                3. SMS & Text Message Policy
                            </h2>
                            <p className="text-wood-600 mb-4 text-sm leading-relaxed">
                                We comply with the Telephone Consumer Protection Act (TCPA). By providing your phone number and checking the consent box, you agree to receive messages from Raval Carpentry.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <h4 className="font-bold text-wood-900 uppercase text-[10px] tracking-widest mb-2">Consent & Frequency</h4>
                                    <p className="text-wood-600 mb-2">
                                        Message frequency varies based on project needs and promotional campaigns. Standard message and data rates may apply.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-wood-900 uppercase text-[10px] tracking-widest mb-2">Opt-Out & Help</h4>
                                    <p className="text-wood-600 mb-2">
                                        You can cancel the SMS service at any time. Just text <strong>STOP</strong> to unsubscribe. For assistance, text <strong>HELP</strong>.
                                    </p>
                                </div>
                            </div>
                            <p className="text-wood-600 text-xs mt-4 italic border-t border-wood-200 pt-4">
                                <strong>No Mobile Information Sharing:</strong> No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">4. Sharing Your Information</h2>
                            <p className="text-wood-600 mb-4 text-sm leading-relaxed">
                                We do NOT sell, rent, or trade your personal information. We only share data with:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-wood-600 text-sm">
                                <li><strong>Service Providers:</strong> IT support, payment processors, and delivery teams necessary to fulfill your contract.</li>
                                <li><strong>Legal Obligations:</strong> Compliance with applicable laws, regulations, or court orders.</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">5. Your Privacy Rights</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-wood-900 text-base mb-2">Texas Residents (Texas Data Privacy and Security Act)</h3>
                                    <p className="text-wood-600 text-sm">
                                        Texas residents have the right to confirm if we are processing their data, correct inaccuracies, delete personal data, and obtain a copy of their data.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-wood-900 text-base mb-2">California Residents (CCPA/CPRA)</h3>
                                    <p className="text-wood-600 text-sm">
                                        If you are a California resident, you have the right to know what personal information we collect, request deletion, and opt-out of the "sale" or "sharing" of personal information (though we do not sell your data).
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-wood-900 text-base mb-2">International Users (GDPR)</h3>
                                    <p className="text-wood-600 text-sm">
                                        While we operate in Texas, if you are accessing our site from the EU or UK, you have rights to access, rectification, erasure, restriction of processing, and data portability.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">6. Data Security & Retention</h2>
                            <p className="text-wood-600 text-sm leading-relaxed mb-4">
                                We implement industry-standard security measures to protect your data. We retain your personal information only as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">7. Contact Us</h2>
                            <p className="text-wood-600 text-sm mb-6">
                                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 bg-wood-50 p-6 rounded-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white border border-wood-200 flex items-center justify-center rounded-sm text-wood-700">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-wood-900 text-xs uppercase tracking-widest mb-1">Email</h5>
                                        <p className="text-wood-600 text-sm">hello@raval-design.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white border border-wood-200 flex items-center justify-center rounded-sm text-wood-700">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-wood-900 text-xs uppercase tracking-widest mb-1">Phone</h5>
                                        <p className="text-wood-600 text-sm">+1 (512) 555-0198</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 md:col-span-2">
                                    <div className="w-10 h-10 bg-white border border-wood-200 flex items-center justify-center rounded-sm text-wood-700">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-wood-900 text-xs uppercase tracking-widest mb-1">Address</h5>
                                        <p className="text-wood-600 text-sm">8074 Shoal Creek Blvd, Suite 204 <br /> Austin, TX 78757</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <p className="text-xs text-wood-400 border-t border-wood-200 pt-8 mt-8">
                            © {new Date().getFullYear()} Raval Carpentry. All rights reserved.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};
