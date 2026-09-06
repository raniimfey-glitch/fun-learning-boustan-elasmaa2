import React from 'react';
import { Volume2, VolumeX, Trophy } from 'lucide-react';
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
  setActiveTab,
  stars,
  soundEnabled,
  setSoundEnabled,
  onOpenCertificate
}) => {
  const handleHomeClick = () => {
    soundManager.playPop();
    setActiveTab('home');
    soundManager.speakArabic('الرَّئِيسِيَّةُ، بُسْتَانُ الْأَسْمَاءِ');
  };

  const toggleSound = () => {
    const next = soundManager.toggleSound();
    setSoundEnabled(next);
    if (next) {
      soundManager.playPop();
    }
  };

  return (
    <header className="app-header bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-xs py-1.5 px-3 flex-shrink-0 z-40" id="main-header">
      <div className="max-w-[900px] w-full mx-auto flex items-center justify-between gap-2">
        
        {/* App Logo & Title */}
        <button
          onClick={handleHomeClick}
          className="flex items-center gap-2 text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl p-0.5 select-none"
          id="btn-logo-home"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center text-white text-lg shadow-sm group-hover:scale-105 transition-transform">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg text-amber-950 font-readex tracking-tight leading-none">
                بُسْتَانُ الْأَسْمَاءِ
              </span>
              <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-amber-300 leading-none">
                الصَّفُّ الثَّانِي
              </span>
            </div>
          </div>
        </button>

        {/* Center Actions / Stats Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Stars Counter Badge */}
          <button
            onClick={() => {
              soundManager.playPop();
              setActiveTab('rewards');
              soundManager.speakArabic('صُنْدُوقُ الْجَوَائِزِ وَالْأَوْسِمَةِ');
            }}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 hover:border-amber-400 px-2.5 py-1 rounded-xl shadow-xs text-amber-900 font-extrabold text-xs sm:text-sm hover:scale-105 transition-transform"
            title="رَصِيدُ النُّجُومِ وَالْأَوْسِمَةِ"
            id="btn-stars-counter"
          >
            <span className="text-base animate-bounce-slow">⭐</span>
            <span className="font-black text-amber-800 font-readex">{stars}</span>
            <span className="text-[10px] text-amber-700 font-bold hidden sm:inline">نَجْمَةً</span>
          </button>

          {/* Certificate Quick Button */}
          <button
            onClick={onOpenCertificate}
            className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs px-2.5 py-1 rounded-xl hover:from-purple-600 hover:to-indigo-700 shadow-xs transition-all hover:scale-105"
            id="btn-certificate-nav"
            title="شَهَادَةُ التَّفَوُّقِ"
          >
            <Trophy className="w-3.5 h-3.5 text-yellow-300" />
            <span className="hidden sm:inline">شَهَادَتِي</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                : 'bg-rose-50 border-rose-300 text-rose-600 hover:bg-rose-100'
            }`}
            title={soundEnabled ? 'كَتْمُ الصَّوْتِ' : 'تَشْغِيلُ الصَّوْتِ'}
            id="btn-sound-toggle"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

