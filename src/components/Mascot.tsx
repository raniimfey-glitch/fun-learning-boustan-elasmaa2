import React, { useState } from 'react';
import { Volume2, Sparkles, MessageCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MascotProps {
  message?: string;
  onSpeakText?: string;
  mascotName?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  message = 'مَرْحَباً بِكَ يَا بَطَلِي الصَّغِير! أَنَا صَدِيقُكَ (سِنْجُوب). هَيَّا نَتَعَلَّمِ الِاسْمَ مَعاً بِالْفَرَحِ وَالْمَرَحِ!',
  onSpeakText,
  mascotName = 'سِنْجُوب الذَّكِيُّ'
}) => {
  const [isWaving, setIsWaving] = useState(false);

  const handleSpeak = () => {
    soundManager.playPop();
    setIsWaving(true);
    const textToRead = onSpeakText || message;
    soundManager.speakArabic(textToRead, () => {
      setIsWaving(false);
    });
  };

  const educationalTips = [
    'تَذَكَّرْ يَا بَطَل: التَّنْوِينُ يَدْخُلُ عَلَى الْأَسْمَاءِ فَقَطْ وَلَا يَدْخُلُ عَلَى الْأَفْعَالِ!',
    'هَلْ تَعْلَمُ؟ كُلُّ كَلِمَةٍ تَبْدَأُ بِـ (الْـ) التَّعْرِيفِ هِيَ اسْمٌ دَائِماً!',
    'التَّاءُ الْمَرْبُوطَةُ (ـة / ة) لَا تَأْتِي إِلَّا فِي الْأَسْمَاءِ!',
    'الِاسْمُ يَدُلُّ عَلَى: إِنْسَانٍ، أَوْ حَيَوَانٍ، أَوْ نَبَاتٍ، أَوْ جَمَادٍ، أَوْ مَكَانٍ!'
  ];

  const handleRandomTip = () => {
    const randomTip = educationalTips[Math.floor(Math.random() * educationalTips.length)];
    soundManager.playPop();
    soundManager.speakArabic(randomTip);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 bg-gradient-to-r from-amber-100/90 via-orange-50 to-yellow-100/90 p-3.5 sm:p-4 rounded-3xl border-2 border-amber-300 shadow-sm relative overflow-hidden" id="mascot-container">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />

      {/* Mascot Avatar Character */}
      <div
        onClick={handleRandomTip}
        className={`relative cursor-pointer transition-transform duration-300 select-none ${
          isWaving ? 'scale-110 rotate-3' : 'hover:scale-105'
        }`}
        title="اضْغَطْ عَلَى سِنْجُوب لِسَمَاعِ نَصِيحَةٍ ذَكِيَّةٍ!"
        id="mascot-avatar"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl p-1 shadow-md flex items-center justify-center border-2 border-white">
          <span className="text-3xl sm:text-4xl animate-bounce-slow">🐿️</span>
        </div>
        <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border border-white flex items-center gap-0.5">
          <Sparkles className="w-2.5 h-2.5" />
          <span>مُرْشِدُكَ</span>
        </span>
      </div>

      {/* Speech Bubble Content */}
      <div className="flex-1 text-right">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-extrabold text-amber-950 text-sm flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-amber-600" />
            {mascotName}
          </span>
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1 text-xs font-bold bg-amber-200 hover:bg-amber-300 text-amber-900 px-2.5 py-1 rounded-xl transition-colors border border-amber-300 shadow-xs"
            title="اسْتَمِعْ لِصَوْتِ سِنْجُوب"
            id="btn-speak-mascot"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>اسْتَمِعْ</span>
          </button>
        </div>
        <p className="text-amber-950 text-sm sm:text-base font-bold leading-relaxed tashkeel-text font-readex">
          {message}
        </p>
      </div>
    </div>
  );
};
