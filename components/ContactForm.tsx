
import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight, Calendar, ChevronLeft, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const TIME_SLOTS = ['10:00 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

export const ContactForm: React.FC = () => {
  const [mode, setMode] = useState<'message' | 'booking'>('message');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'date' | 'details' | 'success'>('date');

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
    today.setHours(0,0,0,0);
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="animate-fade-in-up font-manrope">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-black text-xl text-wood-900 uppercase tracking-tight">
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
            <div key={d} className="text-center text-[10px] uppercase font-bold text-wood-400 py-1">
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
          className={`w-full py-3.5 mt-8 text-xs font-manrope font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${selectedDate && selectedTime ? 'bg-wood-900 text-wood-50 hover:bg-wood-800' : 'bg-wood-200 text-wood-400 cursor-not-allowed'}`}>
          Continue <ArrowRight size={14} />
        </button>
      </div>
    );
  };

  return (
    <section id="contact" className="bg-wood-900 text-wood-50 pt-12 pb-32 border-t border-wood-800 scroll-mt-32">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col justify-center pr-0 lg:pr-12">
            <span className="block text-xs font-manrope font-black tracking-[0.2em] uppercase mb-6 text-wood-400">Contact</span>
            <h2 className="text-5xl md:text-7xl font-canela leading-[0.9] mb-8 text-wood-100 uppercase tracking-tighter">
              Let's create <br /> <span className="editorial-serif lowercase normal-case font-normal text-wood-300">together.</span>
            </h2>
            <p className="text-wood-400 mb-16 max-w-md text-lg leading-relaxed font-manrope font-medium opacity-80">
              Have a vision for your new space? Book a showroom visit or write to us directly. We'd love to meet and measure your space.
            </p>
            <div className="space-y-10">
              {[ {icon: MapPin, title: 'Workshop Address', desc: '8074 Shoal Creek Blvd, Suite 204\nAustin, TX 78757'},
                 {icon: Phone, title: 'Phone', desc: '+1 (512) 555-0198\nMon-Fri: 8:00 - 17:00'},
                 {icon: Mail, title: 'Email', desc: 'hello@raval-design.com\ndesign@raval-design.com'} ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 flex items-center justify-center border border-wood-700 bg-wood-800/50 text-wood-300 rounded-sm group-hover:border-wood-500 group-hover:text-wood-100">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-lg font-manrope font-black text-wood-100 mb-1 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-wood-400 font-manrope text-sm font-medium leading-relaxed whitespace-pre-line opacity-80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative bg-wood-100 p-8 md:p-12 shadow-2xl overflow-hidden rounded-sm min-h-[600px] flex flex-col font-manrope">
            <div className="relative z-10 flex border-b border-wood-300 mb-8">
              {['message', 'booking'].map(m => (
                <button key={m} onClick={() => setMode(m as any)}
                  className={`pb-4 text-[10px] font-manrope font-black uppercase tracking-widest px-4 transition-all relative ${mode === m ? 'text-wood-900' : 'text-wood-400'}`}>
                  {m === 'message' ? 'Write Message' : 'Book Appointment'}
                  {mode === m && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-wood-900"></div>}
                </button>
              ))}
            </div>
            {mode === 'message' ? (
              <div className="animate-fade-in-up">
                <h3 className="text-3xl font-manrope font-black text-wood-900 mb-6 uppercase tracking-tight">Send inquiry</h3>
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
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
                  <button type="submit" className="w-full py-4 bg-wood-900 text-wood-50 text-[10px] font-manrope font-black uppercase tracking-[0.2em] hover:bg-wood-800 transition-all flex items-center justify-center gap-4">
                    Send Request <ArrowRight size={16} className="text-wood-400" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col relative z-10">
                {bookingStep === 'date' && (<><h3 className="text-3xl font-manrope font-black text-wood-900 mb-6 uppercase tracking-tight">Select date</h3>{renderCalendar()}</>)}
                {bookingStep === 'details' && (
                  <div className="animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-6">
                      <button onClick={() => setBookingStep('date')} className="text-wood-500 hover:text-wood-900"><ChevronLeft size={24} /></button>
                      <h3 className="text-2xl font-manrope font-black text-wood-900 uppercase">Confirm</h3>
                    </div>
                    <form onSubmit={e => { e.preventDefault(); setBookingStep('success'); }} className="space-y-4">
                      {['Full Name', 'Email', 'Phone'].map(l => (
                        <div key={l}>
                          <label className="text-[10px] font-manrope font-black uppercase tracking-widest text-wood-500 block mb-2">{l}</label>
                          <input required className="w-full bg-white border border-wood-300 p-3 font-manrope font-bold text-wood-900" />
                        </div>
                      ))}
                      <button type="submit" className="w-full py-4 bg-wood-900 text-wood-50 text-[10px] font-manrope font-black uppercase tracking-widest mt-6">Confirm Appointment</button>
                    </form>
                  </div>
                )}
                {bookingStep === 'success' && (
                  <div className="animate-fade-in-up flex-1 flex flex-col items-center justify-center text-center">
                    <CheckCircle2 size={60} className="text-wood-900 mb-6" />
                    <h3 className="text-3xl font-manrope font-black text-wood-900 mb-4 uppercase">Confirmed!</h3>
                    <p className="text-wood-600 font-manrope font-bold mb-8">We've sent a confirmation email.</p>
                    <button onClick={() => {setMode('message'); setBookingStep('date');}} className="text-[10px] font-manrope font-black uppercase tracking-widest border-b-2 border-wood-900 pb-1">Close</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
