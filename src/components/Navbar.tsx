import React from 'react';
import { Sparkles, Volume2, VolumeX, Award, BookOpen, Shapes, KeyRound, Target, BookText, HelpCircle, Trophy } from 'lucide-react';
import { ActiveTab } from '../types';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  stars: number;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenCertificate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  stars,
  soundEnabled,
  setSoundEnabled,
  onOpenCertificate
}) => {
  const handleTabClick = (tab: ActiveTab, speakText: string) => {
    soundManager.playPop();
    setActiveTab(tab);
    soundManager.speakArabic(speakText);
  };

  const toggleSound = () => {
    const next = soundManager.toggleSound();
    setSoundEnabled(next);
    if (next) {
      soundManager.playPop();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm" id="main-header">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* App Logo & Title */}
          <button
            onClick={() => handleTabClick('home', 'الرَّئِيسِيَّةُ، بُسْتَانُ الْأَسْمَاءِ')}
            className="flex items-center gap-2.5 text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl p-1"
            id="btn-logo-home"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform duration-200">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-amber-950 font-readex tracking-tight">
                  بُسْتَانُ الْأَسْمَاءِ
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold border border-amber-300">
                  الصَّفُّ الثَّانِي
                </span>
              </div>
              <p className="text-xs text-amber-700 hidden sm:block font-medium">
                تَعَلَّمِ الِاسْمَ بِالْفَرَحِ وَاللَّعِبِ
              </p>
            </div>
          </button>

          {/* Center Actions / Stats Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Stars Counter Badge */}
            <button
              onClick={() => handleTabClick('rewards', 'صُنْدُوقُ الْجَوَائِزِ وَالْأَوْسِمَةِ')}
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 hover:border-amber-400 px-3 py-1.5 rounded-2xl shadow-inner text-amber-900 font-extrabold text-sm sm:text-base hover:scale-105 transition-transform"
              title="رَصِيدُ النُّجُومِ وَالْأَوْسِمَةِ"
              id="btn-stars-counter"
            >
              <span className="text-lg sm:text-xl animate-bounce-slow">⭐</span>
              <span className="font-black text-amber-800 font-readex">{stars}</span>
              <span className="text-xs text-amber-700 font-bold hidden md:inline">نَجْمَةً</span>
            </button>

            {/* Certificate Quick Button */}
            <button
              onClick={onOpenCertificate}
              className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs sm:text-sm px-3 py-2 rounded-2xl hover:from-purple-600 hover:to-indigo-700 shadow-sm transition-all hover:scale-105"
              id="btn-certificate-nav"
            >
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span>شَهَادَتِي</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-2xl border-2 transition-all ${
                soundEnabled
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-rose-50 border-rose-300 text-rose-600 hover:bg-rose-100'
              }`}
              title={soundEnabled ? 'كَتْمُ الصَّوْتِ' : 'تَشْغِيلُ الصَّوْتِ'}
              id="btn-sound-toggle"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs for 2nd Grade Kids */}
        <nav className="mt-2.5 pt-2 border-t border-amber-100 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar text-xs sm:text-sm" id="main-nav-bar">
          
          <button
            onClick={() => handleTabClick('home', 'الرَّئِيسِيَّةُ')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'home'
                ? 'bg-amber-500 text-white shadow-md scale-105'
                : 'bg-amber-50/80 text-amber-900 hover:bg-amber-100'
            }`}
            id="tab-home"
          >
            <span>🏠</span>
            <span>الرَّئِيسِيَّةُ</span>
          </button>

          <button
            onClick={() => handleTabClick('lessons', 'دُرُوسُ الِاسْمِ')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'lessons'
                ? 'bg-amber-500 text-white shadow-md scale-105'
                : 'bg-amber-50/80 text-amber-900 hover:bg-amber-100'
            }`}
            id="tab-lessons"
          >
            <BookOpen className="w-4 h-4 text-amber-700 inline" />
            <span>دُرُوسُ الِاسْمِ</span>
          </button>

          <button
            onClick={() => handleTabClick('sorting', 'لُعْبَةُ سِلَالِ الْأَسْمَاءِ')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'sorting'
                ? 'bg-emerald-600 text-white shadow-md scale-105'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
            }`}
            id="tab-sorting"
          >
            <Shapes className="w-4 h-4 text-emerald-600 inline" />
            <span>سِلَالُ الْأَسْمَاءِ</span>
          </button>

          <button
            onClick={() => handleTabClick('signs', 'مُخْتَبَرُ الْعَلَامَاتِ السِّحْرِيَّةِ')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'signs'
                ? 'bg-purple-600 text-white shadow-md scale-105'
                : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
            }`}
            id="tab-signs"
          >
            <KeyRound className="w-4 h-4 text-purple-600 inline" />
            <span>الْعَلَامَاتُ السِّحْرِيَّةُ</span>
          </button>

          <button
            onClick={() => handleTabClick('hunter', 'صَيَّادُ الْأَسْمَاءِ')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'hunter'
                ? 'bg-sky-600 text-white shadow-md scale-105'
                : 'bg-sky-50 text-sky-900 hover:bg-sky-100'
            }`}
            id="tab-hunter"
          >
            <Target className="w-4 h-4 text-sky-600 inline" />
            <span>صَيَّادُ الْأَسْمَاءِ</span>
          </button>

          <button
            onClick={() => handleTabClick('story', 'مُسْتَكْشِفُ الْقِصَّةِ')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'story'
                ? 'bg-rose-500 text-white shadow-md scale-105'
                : 'bg-rose-50 text-rose-900 hover:bg-rose-100'
            }`}
            id="tab-story"
          >
            <BookText className="w-4 h-4 text-rose-600 inline" />
            <span>قِصَّةُ الْأَسْمَاءِ</span>
          </button>

          <button
            onClick={() => handleTabClick('quiz', 'الِاخْتِبَارُ الذَّكِيُّ')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100'
            }`}
            id="tab-quiz"
          >
            <Sparkles className="w-4 h-4 text-indigo-600 inline" />
            <span>الِاخْتِبَارُ الذَّكِيُّ</span>
          </button>

          <button
            onClick={() => handleTabClick('rewards', 'الْجَوَائِزُ وَالْأَوْسِمَةُ')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              activeTab === 'rewards'
                ? 'bg-amber-600 text-white shadow-md scale-105'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
            id="tab-rewards"
          >
            <Award className="w-4 h-4 text-amber-600 inline" />
            <span>الْأَوْسِمَةُ وَالْهَدَايَا</span>
          </button>

        </nav>
      </div>
    </header>
  );
};
