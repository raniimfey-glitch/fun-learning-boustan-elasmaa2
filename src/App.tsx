/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Mascot } from './components/Mascot';
import { HomeView } from './components/HomeView';
import { LessonsView } from './components/LessonsView';
import { SortingGame } from './components/SortingGame';
import { SignsGame } from './components/SignsGame';
import { NounHunterGame } from './components/NounHunterGame';
import { StoryExplorer } from './components/StoryExplorer';
import { QuizView } from './components/QuizView';
import { RewardsModal } from './components/RewardsModal';
import { CertificateView } from './components/CertificateView';
import { ActiveTab, Badge, StickerGift } from './types';
import { INITIAL_BADGES, STICKER_GIFTS } from './data/nounsData';
import { soundManager } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Local persistence for stars & rewards so kids keep progress offline
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('noun_app_stars');
      return saved ? parseInt(saved, 10) : 10; // Start with 10 stars to motivate
    } catch {
      return 10;
    }
  });

  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [stickers, setStickers] = useState<StickerGift[]>(STICKER_GIFTS);

  useEffect(() => {
    try {
      localStorage.setItem('noun_app_stars', stars.toString());
    } catch {
      // Storage unavailable
    }
  }, [stars]);

  const handleEarnStars = (count: number = 1) => {
    setStars(prev => {
      const next = prev + count;
      // Check if newly unlocked any badges
      badges.forEach(b => {
        if (!b.unlocked && next >= b.requiredStars) {
          b.unlocked = true;
          setTimeout(() => {
            soundManager.playStar();
          }, 300);
        }
      });
      return next;
    });
  };

  // Dynamic mascot contextual message based on current screen
  const getMascotMessage = (): { text: string; voice: string } => {
    switch (activeTab) {
      case 'home':
        return {
          text: 'أَهْلاً بِكَ فِي بُسْتَانِ الْأَسْمَاءِ! اخْتَرْ دَرْساً أَوْ لُعْبَةً لِنَبْدَأَ مَغَامَرَةَ التَّعَلُّمِ!',
          voice: 'أَهْلاً بِكَ فِي بُسْتَانِ الْأَسْمَاءِ! اخْتَرْ دَرْساً أَوْ لُعْبَةً لِنَبْدَأَ مَغَامَرَةَ التَّعَلُّمِ!'
        };
      case 'lessons':
        return {
          text: 'الِاسْمُ كَلِمَةٌ لَطِيفَةٌ نُسَمِّي بِهَا: إِنْسَاناً، أَوْ حَيَوَاناً، أَوْ نَبَاتاً، أَوْ جَمَاداً، أَوْ مَكَاناً. اضْغَطْ عَلَى الْبِطَاقَاتِ لِتَسْتَمِعَ لَهَا!',
          voice: 'الِاسْمُ كَلِمَةٌ نُسَمِّي بِهَا: إِنْسَاناً، أَوْ حَيَوَاناً، أَوْ نَبَاتاً، أَوْ جَمَاداً، أَوْ مَكَاناً.'
        };
      case 'sorting':
        return {
          text: 'سَاعِدْنِي فِي فَرْزِ الْأَسْمَاءِ فِي سِلَالِهَا الْمُنَاسِبَةِ! ضَعْ كُلَّ كَلِمَةٍ فِي سَلَّتِهَا الصَّحِيحَةِ.',
          voice: 'سَاعِدْنِي فِي فَرْزِ الْأَسْمَاءِ فِي سِلَالِهَا الْمُنَاسِبَةِ!'
        };
      case 'signs':
        return {
          text: 'لِلِاسْمِ عَلَامَاتٌ سِحْرِيَّةٌ مِثْلَ: (الْـ) التَّعْرِيفِ، وَالتَّنْوِينِ، وَالتَّاءِ الْمَرْبُوطَةِ. جَرِّبِ الْمُخْتَبَرَ السِّحْرِيَّ!',
          voice: 'لِلِاسْمِ عَلَامَاتٌ سِحْرِيَّةٌ مِثْلَ: الْـ التَّعْرِيفِ، وَالتَّنْوِينِ، وَالتَّاءِ الْمَرْبُوطَةِ.'
        };
      case 'hunter':
        return {
          text: 'انْتَبِهْ جَيِّداً! اصْطَدِ الْأَسْمَاءَ فَقَطْ وَابْتَعِدْ عَنِ الْأَفْعَالِ وَالْحُرُوفِ لِتَكُونَ الصَّيَّادَ الْأَوَّلَ!',
          voice: 'اصْطَدِ الْأَسْمَاءَ فَقَطْ وَابْتَعِدْ عَنِ الْأَفْعَالِ وَالْحُرُوفِ!'
        };
      case 'story':
        return {
          text: 'اقْرَأِ الْقِصَّةَ الْجَمِيلَةَ وَاضْغَطْ عَلَى الْكَلِمَاتِ لِاسْتِخْرَاجِ الْأَسْمَاءِ الْمُخْتَبِئَةِ فِيهَا!',
          voice: 'اقْرَأِ الْقِصَّةَ الْجَمِيلَةَ وَاضْغَطْ عَلَى الْكَلِمَاتِ لِاسْتِخْرَاجِ الْأَسْمَاءِ مِنْهَا!'
        };
      case 'quiz':
        return {
          text: 'هَيَّا يَا بَطَل! أَجِبْ عَنِ الْأَسْئِلَةِ الذَّكِيَّةِ وَاِجْمَعِ النُّجُومَ لِتَحْصُلَ عَلَى شَهَادَةِ التَّفَوُّقِ!',
          voice: 'أَجِبْ عَنِ الْأَسْئِلَةِ الذَّكِيَّةِ وَاِجْمَعِ النُّجُومَ لِتَحْصُلَ عَلَى شَهَادَةِ التَّفَوُّقِ!'
        };
      case 'rewards':
        return {
          text: 'هَذِهِ خِزَانَةُ إِنْجَازَاتِكَ الرَّائِعَةِ! انْظُرْ كَمْ نَجْمَةً جَمَعْتَ وَكَمْ وَسَاماً فَتَحْتَ!',
          voice: 'هَذِهِ خِزَانَةُ إِنْجَازَاتِكَ الرَّائِعَةِ!'
        };
    }
  };

  const mascotMsg = getMascotMessage();

  return (
    <div className="min-h-screen bg-amber-50/40 text-slate-800 flex flex-col font-readex" id="app-root">
      
      {/* Top Navbar with score, sound control, and navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stars={stars}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenCertificate={() => setShowCertificate(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6">
        
        {/* Animated Kid-Friendly Mascot Guide */}
        <Mascot
          message={mascotMsg.text}
          onSpeakText={mascotMsg.voice}
        />

        {/* Tab Views */}
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            stars={stars}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        )}

        {activeTab === 'lessons' && (
          <LessonsView onEarnStar={handleEarnStars} />
        )}

        {activeTab === 'sorting' && (
          <SortingGame onEarnStars={handleEarnStars} />
        )}

        {activeTab === 'signs' && (
          <SignsGame onEarnStars={handleEarnStars} />
        )}

        {activeTab === 'hunter' && (
          <NounHunterGame onEarnStars={handleEarnStars} />
        )}

        {activeTab === 'story' && (
          <StoryExplorer onEarnStars={handleEarnStars} />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            onEarnStars={handleEarnStars}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        )}

        {activeTab === 'rewards' && (
          <RewardsModal
            stars={stars}
            badges={badges}
            stickers={stickers}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        )}

      </main>

      {/* Printable Certificate Modal */}
      {showCertificate && (
        <CertificateView
          stars={stars}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-amber-200 py-4 px-4 text-center text-sm text-amber-900 font-bold print:hidden" id="app-footer">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
          <p className="text-amber-950 font-bold tracking-wide text-xs sm:text-sm">
            بستان الاسماء . التعلم الممتع . سميرة عبد الصدوق . جميع الحقوق محفوظة &copy; 2026
          </p>
        </div>
      </footer>

    </div>
  );
}
