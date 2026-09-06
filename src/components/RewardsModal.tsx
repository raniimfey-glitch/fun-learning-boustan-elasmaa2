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
    <div className="flex-1 flex flex-col justify-between gap-2.5 min-h-0 py-1" id="rewards-showroom-container">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-3.5 sm:p-4 rounded-2xl text-amber-950 shadow-xs flex items-center justify-between gap-3 text-right flex-shrink-0">
        <div>
          <span className="bg-white/70 text-amber-900 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-black mb-1 inline-block">
            🏆 لَوْحَةُ الشَّرَفِ وَالْإِنْجَازَاتِ
          </span>
          <h2 className="text-base sm:text-xl font-black font-readex">
            أَوْسِمَتُكَ وَجَوَائِزُكَ يَا بَطَل!
          </h2>
          <p className="text-amber-900 font-bold text-[11px] sm:text-xs mt-0.5">
            كُلَّمَا تَعَلَّمْتَ أَكْثَرَ، فَتَحْتَ أَوْسِمَةً وَمُلْصَقَاتٍ جَدِيدَةً!
          </p>
        </div>

        {/* Certificate Callout Button */}
        <button
          onClick={onOpenCertificate}
          className="bg-purple-900 hover:bg-purple-950 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all shrink-0"
          id="btn-open-cert-modal"
        >
          <Trophy className="w-4 h-4 text-yellow-300" />
          <span>شَهَادَةُ التَّفَوُّقِ</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 min-h-0 pr-1">
        {/* 1. Badges Section */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-amber-200 shadow-xs space-y-2 text-right">
          <div className="flex items-center justify-between border-b border-amber-100 pb-2">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs sm:text-sm font-black text-amber-950 font-readex">
                خِزَانَةُ الْأَوْسِمَةِ ({unlockedBadgesCount} / {badges.length})
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              ⭐ رَصِيدُكَ: {stars} نَجْمَةً
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {badges.map(badge => {
              const isUnlocked = stars >= badge.requiredStars;
              return (
                <div
                  key={badge.id}
                  onClick={() => handleSpeakReward(badge.title + ': ' + badge.description)}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                    isUnlocked
                      ? 'bg-amber-50/80 border-amber-300 hover:border-amber-400 hover:shadow-xs'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                  id={`badge-card-${badge.id}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0 ${
                    isUnlocked ? 'bg-amber-400 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {isUnlocked ? badge.icon : <Lock className="w-4 h-4 text-slate-500" />}
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-slate-900 font-readex tashkeel-text">
                        {badge.title}
                      </h4>
                      {isUnlocked ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                          {badge.requiredStars} ⭐
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Stickers / Gifts Showcase */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-emerald-200 shadow-xs space-y-2 text-right">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
            <div className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs sm:text-sm font-black text-emerald-950 font-readex">
                صُنْدُوقُ الْمُلْصَقَاتِ الْمَفْتُوحَةِ ({unlockedStickersCount} / {stickers.length})
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {stickers.map(sticker => {
              const isUnlocked = stars >= sticker.costStars;
              return (
                <div
                  key={sticker.id}
                  onClick={() => isUnlocked && handleSpeakReward(sticker.unlockedMessage)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    isUnlocked
                      ? 'bg-emerald-50/70 border-emerald-300 hover:scale-105 cursor-pointer shadow-xs'
                      : 'bg-slate-50 border-slate-200 opacity-50'
                  }`}
                  id={`sticker-gift-${sticker.id}`}
                >
                  <div className="text-2xl mb-0.5 select-none">
                    {isUnlocked ? sticker.emoji : '🔒'}
                  </div>
                  <span className="font-extrabold text-[11px] text-slate-800 block tashkeel-text mb-0.5">
                    {sticker.name}
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold block">
                    {isUnlocked ? 'مَفْتُوحٌ ✨' : `${sticker.costStars} ⭐`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
