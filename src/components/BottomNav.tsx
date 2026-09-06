import React from 'react';
import { Sparkles, Award, BookOpen, Shapes, KeyRound, Target, BookText } from 'lucide-react';
import { ActiveTab } from '../types';
import { soundManager } from '../utils/audio';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab: ActiveTab, speakText: string) => {
    soundManager.playPop();
    setActiveTab(tab);
    soundManager.speakArabic(speakText);
  };

  const tabs = [
    {
      id: 'home' as ActiveTab,
      label: 'الرَّئِيسِيَّةُ',
      icon: '🏠',
      speak: 'الرَّئِيسِيَّةُ',
      activeColor: 'bg-amber-500 text-white shadow-sm ring-1 ring-amber-300',
      textColor: 'text-amber-900',
    },
    {
      id: 'lessons' as ActiveTab,
      label: 'دُرُوسُ الِاسْمِ',
      icon: <BookOpen className="w-3.5 h-3.5" />,
      speak: 'دُرُوسُ الِاسْمِ',
      activeColor: 'bg-amber-500 text-white shadow-sm ring-1 ring-amber-300',
      textColor: 'text-amber-900',
    },
    {
      id: 'sorting' as ActiveTab,
      label: 'سِلَالُ الْأَسْمَاءِ',
      icon: <Shapes className="w-3.5 h-3.5" />,
      speak: 'لُعْبَةُ سِلَالِ الْأَسْمَاءِ',
      activeColor: 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-300',
      textColor: 'text-emerald-900',
    },
    {
      id: 'signs' as ActiveTab,
      label: 'الْعَلَامَاتُ',
      icon: <KeyRound className="w-3.5 h-3.5" />,
      speak: 'مُخْتَبَرُ الْعَلَامَاتِ السِّحْرِيَّةِ',
      activeColor: 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-300',
      textColor: 'text-purple-900',
    },
    {
      id: 'hunter' as ActiveTab,
      label: 'صَيَّادُ الْأَسْمَاءِ',
      icon: <Target className="w-3.5 h-3.5" />,
      speak: 'صَيَّادُ الْأَسْمَاءِ',
      activeColor: 'bg-sky-600 text-white shadow-sm ring-1 ring-sky-300',
      textColor: 'text-sky-900',
    },
    {
      id: 'story' as ActiveTab,
      label: 'قِصَّةُ الْأَسْمَاءِ',
      icon: <BookText className="w-3.5 h-3.5" />,
      speak: 'مُسْتَكْشِفُ الْقِصَّةِ',
      activeColor: 'bg-rose-500 text-white shadow-sm ring-1 ring-rose-300',
      textColor: 'text-rose-900',
    },
    {
      id: 'quiz' as ActiveTab,
      label: 'الِاخْتِبَارُ',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      speak: 'الِاخْتِبَارُ الذَّكِيُّ',
      activeColor: 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-300',
      textColor: 'text-indigo-900',
    },
    {
      id: 'rewards' as ActiveTab,
      label: 'الْأَوْسِمَةُ',
      icon: <Award className="w-3.5 h-3.5" />,
      speak: 'الْجَوَائِزُ وَالْأَوْسِمَةُ',
      activeColor: 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-300',
      textColor: 'text-amber-900',
    },
  ];

  return (
    <nav
      className="app-bottom-nav bg-white/95 backdrop-blur-md border-t-2 border-amber-200 shadow-lg py-1.5 px-2 flex-shrink-0 z-40"
      id="bottom-nav-bar"
    >
      <div className="max-w-[900px] w-full mx-auto flex flex-col items-center gap-1">
        {/* Horizontal Navigation Pills (Fits 900px perfectly, scrollable on very narrow screens) */}
        <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-1.5 w-full overflow-x-auto no-scrollbar py-0.5 px-1">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id, tab.speak)}
                className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl text-[11px] sm:text-xs font-black whitespace-nowrap transition-all select-none ${
                  isActive
                    ? `${tab.activeColor} scale-105`
                    : `bg-amber-50/70 hover:bg-amber-100 ${tab.textColor}`
                }`}
                id={`tab-btn-${tab.id}`}
              >
                <span className="shrink-0 flex items-center justify-center">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Minimal Copyright line */}
        <p className="text-[10px] text-amber-900/80 font-bold tracking-tight text-center leading-none hidden sm:block">
          بستان الاسماء . التعلم الممتع . سميرة عبد الصدوق . جميع الحقوق محفوظة &copy; 2026
        </p>
      </div>
    </nav>
  );
};
