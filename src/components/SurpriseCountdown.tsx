import React, { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbzmDFr27DcPCa6m2wx793coxsOeQtenL6nKAHAfFHUBnb4WW6AJx7udP7huO313vaCD/exec';

const SurpriseCountdown: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [showSurprise, setShowSurprise] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const createFloatingHearts = () => {
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'floatUp 3s ease-out forwards';

        document.body.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 3000);
      }, i * 200);
    }
  };

  const handleSurpriseClick = () => {
    setShowSurprise(!showSurprise);
    if (!showSurprise) {
      setSubmitted(false);
      setError(false);
      createFloatingHearts();
    }
  };

  const handleSendDate = async () => {
    if (!selectedDate) return;

    setSubmitted(false);
    setError(false);

    // تحويل التاريخ بصيغة محلية بدون استخدام toISOString()
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // شهور تبدأ من 0
    const day = selectedDate.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;

    const formData = new FormData();
    formData.append('Message', formattedDate); // تبعت التاريخ في حقل Message

    try {
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        setSelectedDate(null);
      } else {
        throw new Error('Failed to send date');
      }
    } catch {
      setError(true);
    }
  };

  return (
    <section id="surprise" className="py-20">
      <div
        className={`transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        ref={ref}
      >
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          A Little Surprise
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>

        <div className="max-w-2xl mx-auto text-center">
          <button
            onClick={handleSurpriseClick}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl mb-8 inline-flex items-center gap-3"
          >
            <Gift size={24} />
            {showSurprise ? 'Hide Surprise' : 'Click for a Surprise!'}
            <Sparkles size={20} className="animate-pulse" />
          </button>

          {showSurprise && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl animate-fadeIn">
              <h3 className="text-2xl text-pink-400 mb-6">Pick Our Special Day</h3>
              <p className="text-white/80 mb-1 text-lg">Choose the perfect day to meet ❤️</p>
              <p className="text-white/80 mb-6 text-lg">I want to give U something Special for U</p>


              <div className="flex justify-center mb-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => setSelectedDate(date)}
                  className="text-black px-4 py-2 rounded-lg"
                  minDate={new Date()}
                  placeholderText="Select a date"
                />
              </div>

              {selectedDate && (
                <>
                  <p className="text-white/70 mt-4 text-lg">
                    🗓 You selected: <strong>{selectedDate.toDateString()}</strong>
                  </p>
                  <button
                    onClick={handleSendDate}
                    className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full transition-all duration-300"
                  >
                    Send Date
                  </button>
                </>
              )}

              {submitted && (
                <p className="text-green-400 mt-4 font-semibold">✅ Date sent successfully!</p>
              )}
              {error && (
                <p className="text-red-400 mt-4 font-semibold">❌ Failed to send date.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* انيميشن للقلب */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default SurpriseCountdown;
