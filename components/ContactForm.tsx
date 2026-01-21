
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, ArrowRight, ChevronLeft, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const TIME_SLOTS = ['10:00 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

export const ContactForm: React.FC<{ onNavigatePrivacy?: () => void }> = ({ onNavigatePrivacy }) => {
  const [mode, setMode] = useState<'message' | 'booking'>('message');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'date' | 'details' | 'success'>('date');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const handleModeChange = (e: any) => {
      if (e.detail) {
        setMode(e.detail);
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('setContactMode', handleModeChange);
    return () => window.removeEventListener('setContactMode', handleModeChange);
  }, []);

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    const todayMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    if (newDate < todayMonthStart) return;
    setCurrentDate(newDate);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="animate-fade-in-up font-manrope">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-canale text-xl text-wood-900 uppercase tracking-tight">
            {MONTHS[month]} {year}
          </h4>
          <div className="flex gap-2">
            <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-wood-200 rounded-sm text-wood-600">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => changeMonth(1)} className="p-1 hover:bg-wood-200 rounded-sm text-wood-900">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[10px] uppercase font-bold text-wood-400 py-1 font-manrope">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {blanks.map((_, i) => <div key={`blank-${i}`} className="h-10" />)}
          {days.map(day => {
            const date = new Date(year, month, day);
            const isSelected = selectedDate?.getTime() === date.getTime();
            const isPast = date < today;
            return (
              <button key={day} disabled={isPast} onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                className={`h-10 w-full flex items-center justify-center rounded-sm text-sm font-bold transition-all ${isSelected ? 'bg-wood-900 text-wood-50' : 'text-wood-900 hover:bg-wood-200'} ${isPast ? 'text-wood-300 opacity-50 cursor-not-allowed' : ''}`}>
                {day}
              </button>
            );
          })}
        </div>
        <div className={`mt-6 transition-all ${selectedDate ? 'opacity-100' : 'opacity-0'}`}>
          <h5 className="text-[10px] font-manrope font-black uppercase tracking-widest text-wood-500 mb-3 flex items-center gap-2">
            <Clock size={12} /> Available Times
          </h5>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map(time => (
              <button key={time} onClick={() => setSelectedTime(time)}
                className={`py-2 px-1 text-xs font-manrope font-black border rounded-sm transition-all ${selectedTime === time ? 'bg-wood-900 text-wood-50' : 'border-wood-300 text-wood-700 hover:border-wood-900'}`}>
                {time}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setBookingStep('details')} disabled={!selectedDate || !selectedTime}
          className={`w-full py-3.5 mt-8 text-xs font-manrope font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${selectedDate && selectedTime ? 'bg-wood-900 text-wood-50' : 'bg-wood-200 text-wood-400 cursor-not-allowed'}`}>
          Continue <ArrowRight size={14} />
        </button>
      </div>
    );
  };

  return (
    <section id="contact" className="bg-wood-900 text-wood-50 pt-16 md:pt-24 pb-16 md:pb-32 scroll-mt-32 border-none">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">

        {/* 1. TEXTO INTRODUCTORIO - REDUCIDO 30% */}
        <div className="max-w-4xl mb-12 md:mb-20">
          <h2 className="text-5xl md:text-7xl font-canale leading-[0.85] mb-6 text-wood-100 uppercase tracking-tighter">
            Ready to <br /> <span className="font-canale text-wood-400 opacity-60">start?</span>
          </h2>
          <p className="text-wood-400 text-lg md:text-xl leading-relaxed font-manrope font-medium opacity-80 max-w-2xl">
            Visit the showroom, send us your project details, or book an in-home visit. We can provide pricing remotely or schedule a visit to measure your space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* 2. FORMULARIO - POSICIÓN PRINCIPAL */}
          <div className="lg:col-span-7 relative bg-wood-100 p-8 md:p-12 shadow-2xl overflow-hidden rounded-sm min-h-[620px] flex flex-col font-manrope order-1">
            <div className="relative z-10 flex border-b border-wood-300 mb-8 overflow-x-auto scrollbar-hide">
              {['message', 'booking'].map(m => (
                <button key={m} onClick={() => setMode(m as any)}
                  className={`pb-4 text-[10px] font-manrope font-black uppercase tracking-widest px-4 transition-all relative whitespace-nowrap ${mode === m ? 'text-wood-900' : 'text-wood-400'}`}>
                  {m === 'message' ? 'Write Message' : 'Book Appointment'}
                  {mode === m && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-wood-900"></div>}
                </button>
              ))}
            </div>

            {mode === 'message' ? (
              <div className="animate-fade-in-up">
                <h3 className="text-4xl font-canale text-wood-900 mb-6 uppercase tracking-tight">Send inquiry</h3>
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['Name', 'Phone'].map(l => (
                      <div key={l} className="space-y-2">
                        <label className="text-[10px] font-manrope font-black uppercase tracking-widest text-wood-500">{l}</label>
                        <input className="w-full bg-white border border-wood-300 p-4 font-manrope font-bold text-wood-900 focus:border-wood-500 outline-none" placeholder={l === 'Name' ? 'John Doe' : '+1 ...'} />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-manrope font-black uppercase tracking-widest text-wood-500">Email</label>
                    <input className="w-full bg-white border border-wood-300 p-4 font-manrope font-bold text-wood-900 focus:border-wood-500 outline-none" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-manrope font-black uppercase tracking-widest text-wood-500">Your Vision</label>
                    <textarea rows={4} className="w-full bg-white border border-wood-300 p-4 font-manrope font-bold text-wood-900 focus:border-wood-500 outline-none resize-none" placeholder="Describe your project..."></textarea>
                  </div>
                  <div className="space-y-4 mb-6">
                    <p className="text-[11px] leading-relaxed text-wood-600 font-medium">
                      Do you agree to receive text messages from Raval Remodeling LLC sent from +1 (737) 530-9265? Message frequency varies and may include appointment reminders, service updates, quotes, and promotional messages. Message and data rates may apply.
                    </p>
                    <p className="text-[11px] leading-relaxed text-wood-600 font-medium">
                      <strong>Reply STOP at any time to unsubscribe. For assistance, reply HELP or contact support.</strong>
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="sms-agreement-yes"
                          required
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-wood-300 text-wood-900 focus:ring-wood-500"
                        />
                        <label htmlFor="sms-agreement-yes" className="text-[11px] leading-relaxed text-wood-600 font-medium pt-0.5">
                          Yes, I agree to receive text messages from Raval Remodeling LLC sent from +1 (737) 530-9265. (required)
                        </label>
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="sms-agreement-no"
                          checked={!agreed}
                          onChange={(e) => setAgreed(!e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-wood-300 text-wood-900 focus:ring-wood-500"
                        />
                        <label htmlFor="sms-agreement-no" className="text-[11px] leading-relaxed text-wood-600 font-medium pt-0.5">
                          No, I do not want to receive text messages from Raval Remodeling LLC.
                        </label>
                      </div>
                    </div>

                    <p className="text-[11px] text-wood-500 italic">
                      See our <button type="button" onClick={onNavigatePrivacy} className="underline hover:text-wood-800 transition-colors">Privacy Policy</button> for details on how we handle your information.
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={!agreed}
                    className={`w-full py-4 text-wood-50 text-[10px] font-manrope font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 ${agreed ? 'bg-wood-900 hover:bg-wood-800' : 'bg-wood-300 cursor-not-allowed'}`}
                  >
                    Send Request <ArrowRight size={16} className="text-wood-400" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col relative z-10">
                {bookingStep === 'date' && (<><h3 className="text-4xl font-canale text-wood-900 mb-6 uppercase tracking-tight">Select date</h3>{renderCalendar()}</>)}
                {bookingStep === 'details' && (
                  <div className="animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-6">
                      <button onClick={() => setBookingStep('date')} className="text-wood-500 hover:text-wood-900"><ChevronLeft size={24} /></button>
                      <h3 className="text-2xl font-canale text-wood-900 uppercase">Confirm</h3>
                    </div>
                    <form onSubmit={e => { e.preventDefault(); setBookingStep('success'); }} className="space-y-4 font-manrope">
                      {['Full Name', 'Email', 'Phone'].map(l => (
                        <div key={l}>
                          <label className="text-[10px] font-manrope font-black uppercase tracking-widest text-wood-500 block mb-2">{l}</label>
                          <input required className="w-full bg-white border border-wood-300 p-3 font-manrope font-bold text-wood-900" />
                        </div>
                      ))}
                      <div className="flex items-start gap-3 pt-2">
                        <input
                          type="checkbox"
                          id="sms-agreement-book"
                          required
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-wood-300 text-wood-900 focus:ring-wood-500"
                        />
                        <label htmlFor="sms-agreement-book" className="text-[11px] leading-relaxed text-wood-600 font-medium">
                          By submitting this form, you agree to receive text messages from Raval Remodeling LLC regarding quotes, appointments, and services. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe.
                        </label>
                      </div>
                      <button
                        type="submit"
                        disabled={!agreed}
                        className={`w-full py-4 text-wood-50 text-[10px] font-manrope font-black uppercase tracking-widest mt-6 transition-all ${agreed ? 'bg-wood-900 hover:bg-wood-800' : 'bg-wood-300 cursor-not-allowed'}`}
                      >
                        Confirm Appointment
                      </button>
                    </form>
                  </div>
                )}
                {bookingStep === 'success' && (
                  <div className="animate-fade-in-up flex-1 flex flex-col items-center justify-center text-center">
                    <CheckCircle2 size={60} className="text-wood-900 mb-6" />
                    <h3 className="text-4xl font-canale text-wood-900 mb-4 uppercase">Confirmed!</h3>
                    <p className="text-wood-600 font-manrope font-bold mb-8">We've sent a confirmation email.</p>
                    <button onClick={() => { setMode('message'); setBookingStep('date'); }} className="text-[10px] font-manrope font-black uppercase tracking-widest border-b-2 border-wood-900 pb-1">Close</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. INFORMACIÓN DE CONTACTO - REFERENCIA AL FINAL */}
          <div className="lg:col-span-5 flex flex-col gap-12 order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-12 gap-x-8">
              {[
                { icon: MapPin, title: 'Workshop Address', desc: '8074 Shoal Creek Blvd, Suite 204\nAustin, TX 78757' },
                { icon: Phone, title: 'Phone', desc: '+1 (737) 530-9265\nMon-Fri: 8:00 - 17:00' },
                { icon: Mail, title: 'Email', desc: 'hello@raval-design.com\ndesign@raval-design.com' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 flex items-center justify-center border border-wood-700 bg-wood-800/50 text-wood-300 rounded-sm group-hover:border-wood-500 group-hover:text-wood-100 transition-colors shrink-0">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-canale text-wood-100 mb-2 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-wood-400 font-manrope text-sm font-medium leading-relaxed whitespace-pre-line opacity-80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
