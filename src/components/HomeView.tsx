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
    <div className="space-y-6" id="home-view-container">
      
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-md relative overflow-hidden text-right border-3 border-amber-300">
        
        {/* Playful Floating Decors */}
        <div className="absolute top-2 left-3 text-4xl opacity-40 animate-float select-none">🎈</div>
        <div className="absolute bottom-2 right-4 text-3xl opacity-40 animate-bounce-slow select-none">🌟</div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-white/80 text-amber-900 text-xs px-3 py-1 rounded-full font-black inline-flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            مُخَصَّصٌ لِتَلَامِيذِ السَّنَةِ الثَّانِيَةِ ابْتِدَائِيّ
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-amber-950 font-readex leading-tight">
            أَهْلاً بِكَ فِي بُسْتَانِ الْأَسْمَاءِ! 🌳
          </h1>

          <p className="text-sm sm:text-base font-bold text-amber-900 leading-relaxed tashkeel-text">
            هَيَّا يَا بَطَلِي نَكْتَشِفْ مَعاً عَالَمَ <span className="underline decoration-amber-600 font-black">الِاسْمِ</span> فِي لُغَتِنَا الْعَرَبِيَّةِ الْفَصِيحَةِ: كَيْفَ نَعْرِفُهُ، وَمَا هِيَ أَنْوَاعُهُ وَعَلَامَاتُهُ السِّحْرِيَّةُ، مَعَ أَلْعَابٍ وَأَوْسِمَةٍ كَثِيرَةٍ!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleNav('lessons', 'هَيَّا نَبْدَأُ الدُّرُوسَ')}
              className="bg-amber-900 hover:bg-black text-white font-extrabold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
              id="btn-hero-start-lessons"
            >
              <PlayCircle className="w-5 h-5 text-amber-300" />
              <span>ابْدَأِ التَّعَلُّمَ الْآنَ</span>
            </button>

            <button
              onClick={onOpenCertificate}
              className="bg-white/90 hover:bg-white text-amber-950 font-black text-xs sm:text-sm px-4 py-3 rounded-2xl flex items-center gap-2 border border-amber-300 shadow-sm hover:scale-105 transition-all"
              id="btn-hero-cert"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>شَهَادَةُ التَّفَوُّقِ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Interactive Modules */}
      <div>
        <div className="flex items-center justify-between mb-4 text-right">
          <h2 className="text-lg sm:text-xl font-black text-slate-800 font-readex">
            🚀 اخْتَرْ مَغَامَرَتَكَ التَّعْلِيمِيَّةَ:
          </h2>
          <span className="text-xs font-bold text-slate-500">
            اضْغَطْ عَلَى أَيِّ لُعْبَةٍ لِلْبَدْءِ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureCards.map(card => (
            <div
              key={card.id}
              onClick={() => handleNav(card.id, card.voiceText)}
              className="bg-white rounded-3xl p-5 border-2 border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between text-right space-y-3"
              id={`card-feature-${card.id}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.bg} flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-black bg-amber-50 text-amber-900 px-2.5 py-1 rounded-xl border border-amber-200">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-amber-700 transition-colors font-readex">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-700 font-bold leading-relaxed tashkeel-text">
                  {card.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-amber-600">
                <span>انْطَلِقْ لِلْعِبِ ⬅️</span>
                <span className="text-slate-400 text-[10px]">الصَّفُّ الثَّانِي</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
