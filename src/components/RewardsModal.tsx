import React from 'react';
import { Award, Gift, Trophy, Lock, CheckCircle2, Sparkles, Volume2 } from 'lucide-react';
import { Badge, StickerGift } from '../types';
import { soundManager } from '../utils/audio';

interface RewardsModalProps {
  stars: number;
  badges: Badge[];
  stickers: StickerGift[];
  onOpenCertificate: () => void;
  onUnlockSticker?: (id: string) => void;
}

export const RewardsModal: React.FC<RewardsModalProps> = ({
  stars,
  badges,
  stickers,
  onOpenCertificate
}) => {
  const unlockedBadgesCount = badges.filter(b => stars >= b.requiredStars).length;
  const unlockedStickersCount = stickers.filter(s => stars >= s.costStars).length;

  const handleSpeakReward = (text: string) => {
    soundManager.playPop();
    soundManager.speakArabic(text);
  };

  return (
    <div className="space-y-6" id="rewards-showroom-container">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-6 sm:p-7 rounded-3xl text-amber-950 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
        <div>
          <span className="bg-white/70 text-amber-900 text-xs px-3 py-1 rounded-full font-black mb-2 inline-block">
            🏆 لَوْحَةُ الشَّرَفِ وَالْإِنْجَازَاتِ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-readex">
            أَوْسِمَتُكَ وَجَوَائِزُكَ يَا بَطَل!
          </h2>
          <p className="text-amber-900 font-bold text-xs sm:text-sm mt-1">
            كُلَّمَا تَعَلَّمْتَ أَكْثَرَ، فَتَحْتَ أَوْسِمَةً وَمُلْصَقَاتٍ جَدِيدَةً!
          </p>
        </div>

        {/* Certificate Callout Button */}
        <button
          onClick={onOpenCertificate}
          className="bg-purple-900 hover:bg-purple-950 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg hover:scale-105 transition-all shrink-0"
          id="btn-open-cert-modal"
        >
          <Trophy className="w-5 h-5 text-yellow-300" />
          <span>شَهَادَةُ التَّفَوُّقِ الرَّسْمِيَّةُ</span>
        </button>
      </div>

      {/* 1. Badges Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-200 shadow-sm space-y-4 text-right">
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-black text-amber-950 font-readex">
              خِزَانَةُ الْأَوْسِمَةِ ({unlockedBadgesCount} / {badges.length})
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            ⭐ رَصِيدُكَ: {stars} نَجْمَةً
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map(badge => {
            const isUnlocked = stars >= badge.requiredStars;
            return (
              <div
                key={badge.id}
                onClick={() => handleSpeakReward(badge.title + ': ' + badge.description)}
                className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                  isUnlocked
                    ? 'bg-amber-50/80 border-amber-300 hover:border-amber-400 hover:shadow-md'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
                id={`badge-card-${badge.id}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs shrink-0 ${
                  isUnlocked ? 'bg-amber-400 text-white animate-bounce-slow' : 'bg-slate-200 text-slate-400'
                }`}>
                  {isUnlocked ? badge.icon : <Lock className="w-6 h-6 text-slate-500" />}
                </div>

                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm text-slate-900 font-readex tashkeel-text">
                      {badge.title}
                    </h4>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                        {badge.requiredStars} ⭐
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Stickers / Gifts Showcase */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-emerald-200 shadow-sm space-y-4 text-right">
        <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
          <div className="flex items-center gap-2">
            <Gift className="w-6 h-6 text-emerald-500" />
            <h3 className="text-xl font-black text-emerald-950 font-readex">
              صُنْدُوقُ الْمُلْصَقَاتِ الْمَفْتُوحَةِ ({unlockedStickersCount} / {stickers.length})
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stickers.map(sticker => {
            const isUnlocked = stars >= sticker.costStars;
            return (
              <div
                key={sticker.id}
                onClick={() => isUnlocked && handleSpeakReward(sticker.unlockedMessage)}
                className={`p-3 rounded-2xl border-2 text-center transition-all ${
                  isUnlocked
                    ? 'bg-emerald-50/70 border-emerald-300 hover:scale-105 cursor-pointer shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-50'
                }`}
                id={`sticker-gift-${sticker.id}`}
              >
                <div className="text-4xl mb-1 select-none">
                  {isUnlocked ? sticker.emoji : '🔒'}
                </div>
                <span className="font-extrabold text-xs text-slate-800 block tashkeel-text mb-0.5">
                  {sticker.name}
                </span>
                <span className="text-[10px] text-slate-500 font-bold block">
                  {isUnlocked ? 'مَفْتُوحٌ ✨' : `${sticker.costStars} ⭐`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
