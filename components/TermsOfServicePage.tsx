
import React from 'react';
import { ArrowLeft, Gavel, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';

export const TermsOfServicePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
                        <FileText size={24} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Legal Document</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-canale uppercase tracking-tight leading-none mb-4">
                        Terms of Service
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
                            Welcome to Raval Remodeling LLC. By accessing our website, requesting a quote, or engaging our services, you agree to comply with and be bound by the following Terms of Service ("Terms"). Please read them carefully.
                        </p>

                        <section className="mb-10">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">1. Acceptance of Terms</h2>
                            <p className="text-wood-600 mb-4 text-sm leading-relaxed">
                                These Terms constitute a legally binding agreement between you ("Client") and Raval Remodeling LLC ("Company," "we," "us"). If you do not agree to these Terms, you may not use our services.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">2. Services & Quotes</h2>
                            <ul className="list-disc pl-5 space-y-2 text-wood-600 text-sm">
                                <li><strong>Estimates:</strong> All initial quotes provided via phone or email are estimates based on the information provided. Final pricing is confirmed after an in-home measurement or formal design consultation.</li>
                                <li><strong>Scope of Work:</strong> The specific services to be performed will be detailed in your invoice or contract. Any changes to the scope (Change Orders) may result in additional charges and timeline adjustments.</li>
                                <li><strong>Right to Refuse:</strong> We reserve the right to refuse service to anyone for any reason at any time, particularly if the project scope is outside our expertise or safety standards.</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">3. Payments, Deposits & Cancellations</h2>
                            <p className="text-wood-600 mb-4 text-sm leading-relaxed">
                                Our payment structure ensures commitment and covers material costs:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-wood-600 text-sm">
                                <li><strong>Deposits:</strong> A non-refundable deposit (typically 35-50% depending on project size) is required to schedule your installation and purchase materials.</li>
                                <li><strong>Final Payment:</strong> The remaining balance is due immediately upon substantial completion of the project.</li>
                                <li><strong>Cancellations:</strong> If you cancel after materials have been purchased or custom work has begun, the deposit will be forfeited to cover these costs.</li>
                                <li><strong>Late Payments:</strong> Payments not received within 7 days of completion may be subject to a late fee of 1.5% per month or the maximum allowed by Texas law.</li>
                            </ul>
                        </section>

                        <section className="bg-wood-50 p-6 rounded-sm border border-wood-200 mb-10">
                            <h2 className="text-xl font-canale uppercase text-wood-900 mb-4 tracking-tight flex items-center gap-2">
                                <span className="w-2 h-2 bg-wood-900 rounded-full"></span>
                                4. SMS Mobile Message Management Program
                            </h2>
                            <p className="text-wood-600 mb-4 text-sm leading-relaxed">
                                By providing your mobile phone number, you consent to receive text messages from Raval Remodeling LLC regarding your project, quotes, and occasional promotions.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <h4 className="font-bold text-wood-900 uppercase text-[10px] tracking-widest mb-2">Program Details</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-wood-600">
                                        <li><strong>Frequency:</strong> Messages vary by user interaction.</li>
                                        <li><strong>Cost:</strong> Msg & Data rates may apply.</li>
                                        <li><strong>Carriers:</strong> Carriers are not liable for delayed or undelivered messages.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-wood-900 uppercase text-[10px] tracking-widest mb-2">User Controls</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-wood-600">
                                        <li><strong>Opt-Out:</strong> Reply <strong>STOP</strong> to cancel at any time.</li>
                                        <li><strong>Support:</strong> Reply <strong>HELP</strong> for assistance.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">5. Warranties & Workmanship</h2>
                            <p className="text-wood-600 mb-4 text-sm leading-relaxed">
                                We take pride in our craft.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-wood-600 text-sm">
                                <li><strong>1-Year Warranty:</strong> We provide a one-year warranty on workmanship for all custom cabinetry and built-ins. This covers structural integrity and installation defects.</li>
                                <li><strong>Exclusions:</strong> This warranty does not cover normal wear and tear, water damage, misuse, or changes in wood due to humidity/temperature fluctuations (which are natural properties of wood).</li>
                                <li><strong>Third-Party Products:</strong> Warranties for fireplaces, hardware, or lighting fixtures purchased through us are provided by the original manufacturer, though we will facilitate the claim process.</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">6. Limitation of Liability</h2>
                            <p className="text-wood-600 mb-4 text-sm leading-relaxed">
                                To the fullest extent permitted by Texas law:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-wood-600 text-sm">
                                <li>Raval Remodeling LLC shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</li>
                                <li>Our total liability for any claim shall not exceed the total amount paid by the Client for the specific project giving rise to the claim.</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">7. Texas Law & Consumer Rights</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 bg-wood-50 border border-wood-200">
                                    <ShieldCheck className="shrink-0 text-wood-900 mt-0.5" size={20} />
                                    <div>
                                        <h4 className="font-bold text-wood-900 text-sm mb-1">Texas Deceptive Trade Practices Act (DTPA)</h4>
                                        <p className="text-wood-600 text-xs leading-relaxed">
                                            We operate in full compliance with the Texas DTPA. We are committed to honest, transparent business practices and will never engage in false, misleading, or deceptive acts.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-wood-50 border border-wood-200">
                                    <Gavel className="shrink-0 text-wood-900 mt-0.5" size={20} />
                                    <div>
                                        <h4 className="font-bold text-wood-900 text-sm mb-1">Governing Law & Jurisdiction</h4>
                                        <p className="text-wood-600 text-xs leading-relaxed">
                                            These Terms shall be governed by and construed in accordance with the laws of the State of Texas. Any legal suit, action, or proceeding arising out of these Terms shall be instituted exclusively in the federal courts of the United States or the courts of the State of Texas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-canale uppercase text-wood-900 mb-4 tracking-tight">8. Contact Information</h2>
                            <p className="text-wood-600 text-sm mb-4">
                                Questions about the Terms of Service should be sent to us at:
                            </p>
                            <p className="text-wood-900 font-bold text-sm">
                                Raval Remodeling LLC <br />
                                8074 Shoal Creek Blvd, Suite 204 <br />
                                Austin, TX 78757 <br />
                                <a href="mailto:hello@raval-design.com" className="underline hover:text-wood-600">hello@raval-design.com</a>
                            </p>
                        </section>

                        <p className="text-xs text-wood-400 border-t border-wood-200 pt-8 mt-8">
                            © {new Date().getFullYear()} Raval Remodeling LLC. All rights reserved.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};
