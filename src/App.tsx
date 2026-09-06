/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
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

  return (
    <div
      className="app-viewport-wrapper bg-amber-50/40 text-slate-800 flex flex-col justify-between font-readex h-[100dvh] max-h-[100dvh] w-full overflow-hidden"
      id="app-root"
    >
      {/* 1. Header stays at the top (flex-shrink: 0) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stars={stars}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenCertificate={() => setShowCertificate(true)}
      />

      {/* 2. Main content card/area occupies remaining space (flex: 1; min-height: 0; max-width: 900px;) */}
      <main
        className="app-main-content w-full max-w-[900px] mx-auto px-2.5 sm:px-4 py-1.5 sm:py-2 flex-1 flex flex-col min-h-0 overflow-y-auto"
        id="main-content"
      >
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

      {/* 3. Bottom navigation bar sticks to the absolute bottom (flex-shrink: 0) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Printable Certificate Modal */}
      {showCertificate && (
        <CertificateView
          stars={stars}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}

