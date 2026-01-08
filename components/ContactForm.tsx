import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight, Calendar, ChevronLeft, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

// --- CALENDAR LOGIC HELPERS ---
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM'
];

export const ContactForm: React.FC = () => {
  const [mode, setMode] = useState<'message' | 'booking'>('message');
  
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<'date' | 'details' | 'success'>('date');

  // Navigation
  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    // Don't go to past months
    if (newDate < new Date(new Date().getFullYear(), new Date().getMonth(), 1)) return;
    setCurrentDate(newDate);
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep('success');
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
      <div className="animate-fade-in-up">
        {/* Month Nav */}
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-serif text-xl text-wood-900">
            {MONTHS[month]} {year}
          </h4>
          <div className="flex gap-2">
            <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-wood-200 rounded-sm transition-colors text-wood-600">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => changeMonth(1)} className="p-1 hover:bg-wood-200 rounded-sm transition-colors text-wood-900">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Days Grid */}
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
            const isToday = date.getTime() === today.getTime();
            const isSelected = selectedDate?.getTime() === date.getTime();
            const isPast = date < today;

            return (
              <button
                key={day}
                disabled={isPast}
                onClick={() => handleDateClick(day)}
                className={`h-10 w-full flex items-center justify-center rounded-sm text-sm font-medium transition-all duration-200
                  ${isSelected ? 'bg-wood-900 text-wood-50 shadow-md scale-105' : ''}
                  ${!isSelected && !isPast ? 'hover:bg-wood-200 text-wood-900' : ''}
                  ${isPast ? 'text-wood-300 cursor-not-allowed' : ''}
                  ${isToday && !isSelected ? 'border border-wood-400' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Time Slots */}
        <div className={`mt-6 overflow-hidden transition-all duration-500 ${selectedDate ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
          <h5 className="text-[10px] font-bold uppercase tracking-widest text-wood-500 mb-3 flex items-center gap-2">
            <Clock size={12} /> Available Times
          </h5>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-1 text-xs border rounded-sm transition-all
                  ${selectedTime === time 
                    ? 'bg-wood-900 text-wood-50 border-wood-900' 
                    : 'border-wood-300 text-wood-700 hover:border-wood-900'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button 
          onClick={() => setBookingStep('details')}
          disabled={!selectedDate || !selectedTime}
          className={`w-full py-3.5 mt-8 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2
            ${selectedDate && selectedTime 
              ? 'bg-wood-900 text-wood-50 hover:bg-wood-800' 
              : 'bg-wood-200 text-wood-400 cursor-not-allowed'}
          `}
        >
          Continue
          <ArrowRight size={14} />
        </button>
      </div>
    );
  };

  return (
    <section id="contact" className="bg-wood-900 text-wood-50 py-32 border-t border-wood-800 scroll-mt-32">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Contact Info */}
          <div className="flex flex-col justify-center pr-0 lg:pr-12">
            <span className="block text-xs font-bold tracking-[0.2em] uppercase mb-6 text-wood-400">
              Contact
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] mb-8 text-wood-100">
              Let's create <br /> 
              <span className="italic text-wood-300">together.</span>
            </h2>
            
            <p className="text-wood-400 mb-16 max-w-md text-lg leading-relaxed font-light">
              Have a vision for your new space? Book a showroom visit or write to us directly. We'd love to meet, measure your space, and prepare a non-binding proposal.
            </p>
            
            <div className="space-y-10">
              {/* Address */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 flex items-center justify-center border border-wood-700 bg-wood-800/50 text-wood-300 rounded-sm transition-colors group-hover:border-wood-500 group-hover:text-wood-100">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-medium text-wood-100 mb-1">Workshop Address</h4>
                  <p className="text-wood-400 font-light text-sm leading-relaxed">
                    8074 Shoal Creek Blvd, Suite 204<br />Austin, TX 78757
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-6 group">
                 <div className="w-12 h-12 flex items-center justify-center border border-wood-700 bg-wood-800/50 text-wood-300 rounded-sm transition-colors group-hover:border-wood-500 group-hover:text-wood-100">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-medium text-wood-100 mb-1">Phone</h4>
                  <p className="text-wood-400 font-light text-sm">
                    +1 (512) 555-0198<br />
                    <span className="text-xs opacity-60">Mon-Fri: 8:00 - 17:00</span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-6 group">
                 <div className="w-12 h-12 flex items-center justify-center border border-wood-700 bg-wood-800/50 text-wood-300 rounded-sm transition-colors group-hover:border-wood-500 group-hover:text-wood-100">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-medium text-wood-100 mb-1">Email</h4>
                  <p className="text-wood-400 font-light text-sm">
                    hello@raval-design.com<br />
                    design@raval-design.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Card */}
          <div className="relative bg-wood-100 p-8 md:p-12 shadow-2xl overflow-hidden rounded-sm min-h-[600px] flex flex-col">
            
            {/* Decorative Circle */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-wood-200/50 rounded-full blur-3xl pointer-events-none"></div>

            {/* Mode Switcher */}
            <div className="relative z-10 flex border-b border-wood-300 mb-8">
              <button 
                onClick={() => setMode('message')}
                className={`pb-4 text-xs font-bold uppercase tracking-widest px-4 transition-colors relative ${
                  mode === 'message' ? 'text-wood-900' : 'text-wood-400 hover:text-wood-600'
                }`}
              >
                Write Message
                {mode === 'message' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-wood-900"></div>}
              </button>
              <button 
                onClick={() => setMode('booking')}
                className={`pb-4 text-xs font-bold uppercase tracking-widest px-4 transition-colors relative ${
                  mode === 'booking' ? 'text-wood-900' : 'text-wood-400 hover:text-wood-600'
                }`}
              >
                Book Appointment
                {mode === 'booking' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-wood-900"></div>}
              </button>
            </div>

            {/* --- MODE: MESSAGE FORM --- */}
            {mode === 'message' && (
              <div className="animate-fade-in-up">
                <h3 className="text-3xl font-serif text-wood-900 mb-6">Send an inquiry</h3>
                <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-wood-500">Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-white border border-wood-300 p-4 text-wood-900 focus:outline-none focus:border-wood-500 focus:ring-1 focus:ring-wood-500 transition-all placeholder:text-wood-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-wood-500">Phone</label>
                      <input 
                        type="tel" 
                        placeholder="+1 ..."
                        className="w-full bg-white border border-wood-300 p-4 text-wood-900 focus:outline-none focus:border-wood-500 focus:ring-1 focus:ring-wood-500 transition-all placeholder:text-wood-300"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-wood-500">Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white border border-wood-300 p-4 text-wood-900 focus:outline-none focus:border-wood-500 focus:ring-1 focus:ring-wood-500 transition-all placeholder:text-wood-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-wood-500">What do you have in mind?</label>
                    <textarea 
                      rows={4} 
                      placeholder="Describe your vision... (kitchen, media wall, wardrobe)" 
                      className="w-full bg-white border border-wood-300 p-4 text-wood-900 focus:outline-none focus:border-wood-500 focus:ring-1 focus:ring-wood-500 transition-all resize-none placeholder:text-wood-300"
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full py-3.5 bg-wood-900 text-wood-50 text-xs font-bold uppercase tracking-widest hover:bg-wood-800 transition-colors mt-2 flex items-center justify-center gap-4 group">
                    Send Request
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-wood-300" />
                  </button>
                </form>
              </div>
            )}

            {/* --- MODE: BOOKING CALENDAR --- */}
            {mode === 'booking' && (
              <div className="flex-1 flex flex-col relative z-10">
                
                {bookingStep === 'date' && (
                  <>
                     <h3 className="text-3xl font-serif text-wood-900 mb-6">Select a date</h3>
                     {renderCalendar()}
                  </>
                )}

                {bookingStep === 'details' && (
                   <div className="animate-fade-in-up flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-6">
                        <button onClick={() => setBookingStep('date')} className="text-wood-500 hover:text-wood-900">
                          <ChevronLeft size={20} />
                        </button>
                        <h3 className="text-2xl font-serif text-wood-900">Confirm Booking</h3>
                      </div>
                      
                      <div className="bg-wood-50 p-4 mb-6 border-l-2 border-wood-900">
                        <p className="text-xs font-bold uppercase tracking-widest text-wood-500 mb-1">You are booking</p>
                        <p className="text-wood-900 font-serif text-lg">
                          Showroom Consultation
                        </p>
                        <p className="text-wood-600 text-sm mt-1 flex items-center gap-2">
                          <Calendar size={14} /> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'})}
                          <span className="mx-1">•</span>
                          <Clock size={14} /> {selectedTime}
                        </p>
                      </div>

                      <form onSubmit={handleBookingSubmit} className="space-y-4 flex-1">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-wood-500 block mb-2">Full Name</label>
                            <input required type="text" className="w-full bg-white border border-wood-300 p-3 text-wood-900 focus:outline-none focus:border-wood-900" />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-wood-500 block mb-2">Email Address</label>
                            <input required type="email" className="w-full bg-white border border-wood-300 p-3 text-wood-900 focus:outline-none focus:border-wood-900" />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-wood-500 block mb-2">Phone Number</label>
                            <input required type="tel" className="w-full bg-white border border-wood-300 p-3 text-wood-900 focus:outline-none focus:border-wood-900" />
                          </div>
                          
                          <button type="submit" className="w-full py-3.5 bg-wood-900 text-wood-50 text-xs font-bold uppercase tracking-widest hover:bg-wood-800 transition-colors mt-auto flex items-center justify-center gap-2">
                            Confirm Appointment
                          </button>
                      </form>
                   </div>
                )}

                {bookingStep === 'success' && (
                  <div className="animate-fade-in-up flex-1 flex flex-col items-center justify-center text-center py-12">
                     <div className="w-20 h-20 bg-wood-900 rounded-full flex items-center justify-center text-wood-50 mb-6">
                        <CheckCircle2 size={40} />
                     </div>
                     <h3 className="text-3xl font-serif text-wood-900 mb-2">Booking Confirmed!</h3>
                     <p className="text-wood-600 max-w-xs mx-auto mb-8">
                       We have sent a confirmation email to you. We look forward to seeing you on {selectedDate?.toLocaleDateString()} at {selectedTime}.
                     </p>
                     <button 
                       onClick={() => {
                         setMode('message');
                         setBookingStep('date');
                         setSelectedDate(null);
                         setSelectedTime(null);
                       }}
                       className="text-xs font-bold uppercase tracking-widest border-b border-wood-900 pb-1"
                     >
                       Close
                     </button>
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