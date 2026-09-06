import React from 'react';
import { BookOpen, Shapes, KeyRound, Target, BookText, Sparkles, Award, PlayCircle, Trophy } from 'lucide-react';
import { ActiveTab } from '../types';
import { soundManager } from '../utils/audio';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  stars: number;
  onOpenCertificate: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, stars, onOpenCertificate }) => {
  const handleNav = (tab: ActiveTab, voicePrompt: string) => {
    soundManager.playPop();
    setActiveTab(tab);
    soundManager.speakArabic(voicePrompt);
  };

  const featureCards = [
    {
      id: 'lessons' as ActiveTab,
      title: 'دُرُوسُ الِاسْمِ الْمُمْتِعَةُ',
      desc: 'تَعَرَّفْ عَلَى مَفْهُومِ الِاسْمِ وَأَنْوَاعِهِ وَعَلَامَاتِهِ بِالصَّوْتِ وَالصُّورَةِ.',
      icon: '📖',
      voiceText: 'دُرُوسُ الِاسْمِ الْمُمْتِعَةُ',
      badge: 'دَرْسٌ تَفَاعُلِيٌّ',
      bg: 'from-amber-400 to-orange-500',
      border: 'border-amber-300'
    },
    {
      id: 'sorting' as ActiveTab,
      title: 'سِلَالُ الْأَسْمَاءِ الْعَجِيبَةُ',
      desc: 'صَنِّفِ الْكَلِمَاتِ فِي سِلَالِ: الْإِنْسَانِ، وَالْحَيَوَانِ، وَالنَّبَاتِ، وَالْجَمَادِ، وَالْمَكَانِ.',
      icon: '🧺',
      voiceText: 'لُعْبَةُ سِلَالِ الْأَسْمَاءِ',
      badge: 'لُعْبَةُ التَّصْنِيفِ',
      bg: 'from-emerald-400 to-teal-600',
      border: 'border-emerald-300'
    },
    {
      id: 'signs' as ActiveTab,
      title: 'مُخْتَبَرُ الْعَلَامَاتِ السِّحْرِيَّةِ',
      desc: 'اكْتَشِفْ سِحْرَ: (الْـ) التَّعْرِيفِ، وَالتَّنْوِينِ، وَالتَّاءِ الْمَرْبُوطَةِ.',
      icon: '✨',
      voiceText: 'مُخْتَبَرُ الْعَلَامَاتِ السِّحْرِيَّةِ',
      badge: 'تَجَارِبُ سِحْرِيَّةٌ',
      bg: 'from-purple-500 to-indigo-600',
      border: 'border-purple-300'
    },
    {
      id: 'hunter' as ActiveTab,
      title: 'صَيَّادُ الْأَسْمَاءِ الْمَاهِرُ',
      desc: 'مَيِّزْ بَيْنَ الِاسْمِ وَالْفِعْلِ وَالْحَرْفِ بِسُرْعَةٍ وَذَكَاءٍ!',
      icon: '🎯',
      voiceText: 'صَيَّادُ الْأَسْمَاءِ الْمَاهِرُ',
      badge: 'تَحَدِّي السُّرْعَةِ',
      bg: 'from-sky-400 to-blue-600',
      border: 'border-sky-300'
    },
    {
      id: 'story' as ActiveTab,
      title: 'مُسْتَكْشِفُ الْقِصَّةِ الْمُصَوَّرَةِ',
      desc: 'اقْرَأِ الْقِصَّةَ وَاضْغَطْ عَلَى الْكَلِمَاتِ لِاسْتِخْرَاجِ الْأَسْمَاءِ مِنْهَا.',
      icon: '📚',
      voiceText: 'مُسْتَكْشِفُ الْقِصَّةِ الْمُصَوَّرَةِ',
      badge: 'قِصَصٌ نَاطِقَةٌ',
      bg: 'from-rose-400 to-pink-600',
      border: 'border-rose-300'
    },
    {
      id: 'quiz' as ActiveTab,
      title: 'الِاخْتِبَارُ الذَّكِيُّ لِلْأَبْطَالِ',
      desc: 'اخْتَبِرْ مَعْلُومَاتِكَ وَاِجْمَعِ النُّجُومَ لِتَفْتَحَ شَهَادَةَ التَّفَوُّقِ!',
      icon: '⭐',
      voiceText: 'الِاخْتِبَارُ الذَّكِيُّ لِلْأَبْطَالِ',
      badge: 'اخْتِبَارٌ مَرِحٌ',
      bg: 'from-indigo-500 to-violet-600',
      border: 'border-indigo-300'
    }
  ];

  return (
    <div className="flex-1 flex flex-col justify-between gap-2.5 py-1 min-h-0" id="home-view-container">
      
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 rounded-2xl p-3.5 sm:p-4 text-amber-950 shadow-xs relative overflow-hidden text-right border-2 border-amber-300 flex-shrink-0">
        
        {/* Playful Floating Decors */}
        <div className="absolute top-1 left-2 text-2xl opacity-40 animate-float select-none">🎈</div>
        <div className="absolute bottom-1 right-3 text-2xl opacity-40 animate-bounce-slow select-none">🌟</div>

        <div className="relative z-10 max-w-2xl space-y-1.5">
          <span className="bg-white/80 text-amber-900 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-black inline-flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-600" />
            مُخَصَّصٌ لِتَلَامِيذِ السَّنَةِ الثَّانِيَةِ ابْتِدَائِيّ
          </span>

          <h1 className="text-lg sm:text-xl font-black text-amber-950 font-readex leading-tight">
            أَهْلاً بِكَ فِي بُسْتَانِ الْأَسْمَاءِ! 🌳
          </h1>

          <p className="text-xs sm:text-sm font-bold text-amber-900 leading-normal tashkeel-text">
            هَيَّا يَا بَطَلِي نَكْتَشِفْ مَعاً عَالَمَ <span className="underline decoration-amber-600 font-black">الِاسْمِ</span> فِي لُغَتِنَا الْعَرَبِيَّةِ الْفَصِيحَةِ: كَيْفَ نَعْرِفُهُ، وَمَا هِيَ أَنْوَاعُهُ وَعَلَامَاتُهُ السِّحْرِيَّةُ!
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => handleNav('lessons', 'هَيَّا نَبْدَأُ الدُّرُوسَ')}
              className="bg-amber-900 hover:bg-black text-white font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
              id="btn-hero-start-lessons"
            >
              <PlayCircle className="w-4 h-4 text-amber-300" />
              <span>ابْدَأِ التَّعَلُّمَ الْآنَ</span>
            </button>

            <button
              onClick={onOpenCertificate}
              className="bg-white/90 hover:bg-white text-amber-950 font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-amber-300 shadow-xs hover:scale-105 transition-all"
              id="btn-hero-cert"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>شَهَادَةُ التَّفَوُّقِ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Interactive Modules */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <div className="flex items-center justify-between mb-1.5 text-right flex-shrink-0">
          <h2 className="text-sm sm:text-base font-black text-slate-800 font-readex">
            🚀 اخْتَرْ مَغَامَرَتَكَ التَّعْلِيمِيَّةَ:
          </h2>
          <span className="text-[11px] font-bold text-slate-500">
            اضْغَطْ عَلَى أَيِّ لُعْبَةٍ لِلْبَدْءِ
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 flex-1 min-h-0">
          {featureCards.map(card => (
            <div
              key={card.id}
              onClick={() => handleNav(card.id, card.voiceText)}
              className="bg-white rounded-2xl p-2.5 sm:p-3 border-2 border-slate-200 hover:border-amber-400 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between text-right"
              id={`card-feature-${card.id}`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${card.bg} flex items-center justify-center text-xl sm:text-2xl shadow-xs group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-black bg-amber-50 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-200">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-amber-700 transition-colors font-readex">
                  {card.title}
                </h3>

                <p className="text-[11px] sm:text-xs text-slate-600 font-bold leading-tight line-clamp-2">
                  {card.desc}
                </p>
              </div>

              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-amber-600">
                <span>انْطَلِقْ لِلْعِبِ ⬅️</span>
                <span className="text-slate-400 text-[9px]">الصَّفُّ الثَّانِي</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
