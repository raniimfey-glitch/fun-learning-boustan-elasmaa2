import React, { useState } from 'react';
import { Award, Printer, X, Sparkles, CheckCircle2, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface CertificateViewProps {
  stars: number;
  onClose: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ stars, onClose }) => {
  const [studentName, setStudentName] = useState<string>('بَطَلُ الْعَرَبِيَّةِ');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handlePrint = () => {
    soundManager.playPop();
    confetti({ particleCount: 60, spread: 70 });
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto" id="certificate-modal-overlay">
      <div className="bg-white rounded-3xl max-w-3xl w-full border-4 border-amber-300 shadow-2xl overflow-hidden my-auto" id="certificate-modal-card">
        
        {/* Action Header (Hidden during print) */}
        <div className="bg-amber-100/90 px-5 py-3 border-b border-amber-300 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-600" />
            <h3 className="font-extrabold text-sm sm:text-base text-amber-950 font-readex">
              شَهَادَةُ التَّفَوُّقِ وَالتَّقْدِيرِ لِلصَّفِّ الثَّانِي
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
              id="btn-print-certificate"
            >
              <Printer className="w-4 h-4" />
              <span>طِبَاعَةُ الشَّهَادَةِ</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
              title="إِغْلَاقٌ"
              id="btn-close-certificate"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Optimized for Screen & Print) */}
        <div className="p-6 sm:p-10 bg-gradient-to-br from-amber-50/70 via-white to-yellow-50/70 relative text-center text-slate-800 space-y-6">
          
          {/* Certificate Ornate Frame Border */}
          <div className="border-4 border-double border-amber-400 p-6 sm:p-8 rounded-3xl relative space-y-5 bg-white/60">
            
            {/* Top Emblem */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl sm:text-4xl">🌟</span>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-3xl sm:text-4xl shadow-md border-2 border-white mx-auto">
                👑
              </div>
              <span className="text-3xl sm:text-4xl">🌟</span>
            </div>

            {/* Certificate Title */}
            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-extrabold text-amber-700 tracking-wider">
                بُسْتَانُ اللُّغَةِ الْعَرَبِيَّةِ - مَرْحَلَةُ التَّعْلِيمِ الِابْتِدَائِيِّ
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-amber-950 font-readex">
                شَهَادَةُ تَفَوُّقٍ وَإِبْدَاعٍ
              </h1>
              <p className="text-xs sm:text-sm font-bold text-amber-800">
                فِي مَادَّةِ اللُّغَةِ الْعَرَبِيَّةِ (دَرْسُ الِاسْمِ وَعَلَامَاتِهِ)
              </p>
            </div>

            {/* Awarded Text */}
            <div className="space-y-3 max-w-xl mx-auto">
              <p className="text-xs sm:text-sm text-slate-600 font-bold">
                تُهْدَى هَذِهِ الشَّهَادَةُ بِكُلِّ فَخْرٍ وَاعْتِزَازٍ إِلَى التِّلْمِيذِ الْمُتَفَوِّقِ:
              </p>

              {/* Editable Student Name */}
              <div className="relative inline-block my-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                    className="text-xl sm:text-3xl font-black text-amber-900 border-b-2 border-amber-500 px-4 py-1 text-center bg-amber-50 rounded-xl focus:outline-none font-readex"
                    id="input-student-name"
                  />
                ) : (
                  <div
                    onClick={() => setIsEditing(true)}
                    className="text-xl sm:text-3xl font-black text-amber-900 border-b-2 border-amber-400 border-dashed px-6 py-1 cursor-pointer hover:bg-amber-100/50 rounded-xl transition-colors font-readex tashkeel-text"
                    title="اضْغَطْ لِتَعْدِيلِ اسْمِكَ"
                  >
                    « {studentName} »
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed tashkeel-text">
                لِاجْتِيَازِهِ جَمِيعَ مَرَاحِلِ التَّعَلُّمِ، وَتَمْيِيزِهِ بَيْنَ أَنْوَاعِ الِاسْمِ وَعَلَامَاتِهِ السِّحْرِيَّةِ بِجَدَارَةٍ وَتَفَوُّقٍ، وَجَمْعِهِ (<span className="text-amber-700 font-black">{stars} نَجْمَةً</span>) فِي بُسْتَانِ الْأَسْمَاءِ.
              </p>
            </div>

            {/* Golden Seal & Signatures */}
            <div className="pt-4 border-t border-amber-200 flex flex-row items-center justify-between text-xs sm:text-sm font-bold text-slate-600 px-4 sm:px-8">
              <div className="text-right">
                <span className="block text-[11px] text-slate-400">التَّارِيخُ:</span>
                <span className="text-slate-800 font-extrabold">{currentDate}</span>
              </div>

              {/* Official Seal Emblem */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-400 bg-amber-100 flex flex-col items-center justify-center text-[10px] font-black text-amber-900 shadow-inner">
                <span>⭐</span>
                <span>خَتْمُ التَّفَوُّقِ</span>
                <span>الصَّفُّ الثَّانِي</span>
              </div>

              <div className="text-left">
                <span className="block text-[11px] text-slate-400">مُعَلِّمُ اللُّغَةِ:</span>
                <span className="text-amber-900 font-extrabold">بُسْتَانُ الْأَسْمَاءِ 🌟</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
