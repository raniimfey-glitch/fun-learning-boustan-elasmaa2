import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, BookOpen, Star, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORIES_DATA, StoryParagraph, StoryWordItem } from '../data/nounsData';
import { soundManager } from '../utils/audio';

interface StoryExplorerProps {
  onEarnStars: (count: number) => void;
}

export const StoryExplorer: React.FC<StoryExplorerProps> = ({ onEarnStars }) => {
  const [selectedStoryIdx, setSelectedStoryIdx] = useState<number>(0);
  const [discoveredNouns, setDiscoveredNouns] = useState<{ [storyId: string]: Set<string> }>({});
  const [activeWordInfo, setActiveWordInfo] = useState<{ word: string; isNoun: boolean; category?: string } | null>(null);

  const story: StoryParagraph = STORIES_DATA[selectedStoryIdx] || STORIES_DATA[0];
  const currentDiscovered = discoveredNouns[story.id] || new Set();
  const totalNounsInStory = story.words.filter(w => w.isNoun).length;
  const isStoryCompleted = currentDiscovered.size >= totalNounsInStory && totalNounsInStory > 0;

  const handleWordClick = (item: StoryWordItem, index: number) => {
    soundManager.playPop();
    const wordKey = `${item.word}-${index}`;
    setActiveWordInfo(item);

    if (item.isNoun) {
      if (!currentDiscovered.has(wordKey)) {
        soundManager.playStar();
        const nextSet = new Set(currentDiscovered);
        nextSet.add(wordKey);
        setDiscoveredNouns(prev => ({ ...prev, [story.id]: nextSet }));
        onEarnStars(2);

        soundManager.speakArabic(`${item.word}: ${item.category}`);

        // Check if all nouns in story are found
        if (nextSet.size >= totalNounsInStory) {
          setTimeout(() => {
            soundManager.playCelebration();
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            soundManager.speakArabic('مَا شَاءَ اللَّهُ! لَقَدِ اسْتَخْرَجْتَ جَمِيعَ الْأَسْمَاءِ فِي الْقِصَّةِ!');
          }, 1000);
        }
      } else {
        soundManager.speakArabic(`${item.word}: ${item.category}`);
      }
    } else {
      soundManager.speakArabic(`${item.word}: لَيْسَتِ اسْماً`);
    }
  };

  const handleReadFullStory = () => {
    soundManager.playPop();
    soundManager.speakArabic(story.fullSentence);
  };

  const handleResetStory = () => {
    soundManager.playPop();
    setDiscoveredNouns(prev => ({ ...prev, [story.id]: new Set() }));
    setActiveWordInfo(null);
  };

  const handleNextStory = () => {
    if (selectedStoryIdx < STORIES_DATA.length - 1) {
      soundManager.playPop();
      setSelectedStoryIdx(prev => prev + 1);
      setActiveWordInfo(null);
      soundManager.speakArabic(STORIES_DATA[selectedStoryIdx + 1].title);
    }
  };

  const handlePrevStory = () => {
    if (selectedStoryIdx > 0) {
      soundManager.playPop();
      setSelectedStoryIdx(prev => prev - 1);
      setActiveWordInfo(null);
      soundManager.speakArabic(STORIES_DATA[selectedStoryIdx - 1].title);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-rose-200 shadow-sm space-y-6" id="story-explorer-container">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
        <div>
          <span className="bg-rose-100 text-rose-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold border border-rose-300 inline-block mb-1">
            مُسْتَكْشِفُ الْقِصَّةِ الْمُصَوَّرَةِ (10 قِصَصٍ مُمْتِعَةٍ)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-rose-950 font-readex">
            حِكَايَاتُ بُسْتَانِ الْأَسْمَاءِ 📖
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-semibold">
            اسْتَمِعْ لِلْقِصَّةِ، ثُمَّ اضْغَطْ عَلَى الْكَلِمَاتِ لِتَسْتَخْرِجَ الْأَسْمَاءَ مِنْهَا:
          </p>
        </div>

        {/* Counter badge */}
        <div className="bg-amber-100 border border-amber-300 text-amber-950 px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 shrink-0">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>الْقِصَّةُ {selectedStoryIdx + 1} مِنْ {STORIES_DATA.length}</span>
        </div>
      </div>

      {/* Story Selector Pills (10 Stories Grid) */}
      <div className="bg-rose-50/60 p-3 rounded-2xl border border-rose-200 flex flex-wrap gap-2 items-center justify-center">
        {STORIES_DATA.map((s, idx) => {
          const isDone = (discoveredNouns[s.id]?.size || 0) >= s.words.filter(w => w.isNoun).length && s.words.filter(w => w.isNoun).length > 0;
          const isCurrent = selectedStoryIdx === idx;
          return (
            <button
              key={s.id}
              onClick={() => {
                soundManager.playPop();
                setSelectedStoryIdx(idx);
                setActiveWordInfo(null);
                soundManager.speakArabic(s.title);
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-rose-500 text-white shadow-md scale-105 ring-2 ring-rose-300'
                  : isDone
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-emerald-200'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-rose-100'
              }`}
              id={`btn-story-select-${s.id}`}
            >
              <span>{s.sceneImage.slice(0, 2)}</span>
              <span>قِصَّةُ {idx + 1}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Story Board Area */}
      <div className="bg-gradient-to-br from-rose-50/70 via-amber-50/50 to-orange-50/60 border-3 border-rose-200 rounded-3xl p-6 sm:p-8 space-y-5 text-right">
        
        {/* Story Title & Audio Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-200/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{story.sceneImage}</span>
            <h3 className="text-lg sm:text-xl font-black text-rose-950 font-readex">
              {story.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReadFullStory}
              className="bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
              id="btn-read-full-story"
            >
              <Volume2 className="w-4 h-4" />
              <span>اقْرَأِ الْقِصَّةَ كَامِلَةً</span>
            </button>

            <button
              onClick={handleResetStory}
              className="p-2 rounded-xl bg-white hover:bg-rose-100 text-rose-800 border border-rose-200 transition-colors"
              title="إِعَادَةُ اسْتِكْشَافِ الْقِصَّةِ"
              id="btn-reset-story"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Discovery Progress Meter */}
        <div className="flex items-center justify-between gap-3 bg-white/80 p-3 rounded-2xl border border-rose-200 text-xs sm:text-sm font-extrabold text-rose-900">
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>الْأَسْمَاءُ الْمُكْتَشَفَةُ:</span>
          </span>
          <span className="bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300">
            {currentDiscovered.size} مِنْ {totalNounsInStory}
          </span>
        </div>

        {/* Interactive Clickable Sentence Words */}
        <div className="bg-white p-5 sm:p-7 rounded-3xl border-2 border-rose-200 shadow-inner flex flex-wrap gap-2.5 sm:gap-3.5 items-center justify-center leading-loose font-readex">
          {story.words.map((item, idx) => {
            const wordKey = `${item.word}-${idx}`;
            const isFound = currentDiscovered.has(wordKey);

            return (
              <button
                key={idx}
                onClick={() => handleWordClick(item, idx)}
                className={`text-xl sm:text-2xl font-black px-3 py-1.5 rounded-2xl transition-all duration-200 tashkeel-text select-none ${
                  isFound
                    ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300 shadow-md scale-105'
                    : 'bg-rose-50/80 hover:bg-rose-100 text-slate-800 hover:scale-105 border border-rose-100'
                }`}
                id={`story-word-${idx}`}
              >
                {item.word}
                {isFound && <span className="text-xs mr-1 text-amber-900">⭐</span>}
              </button>
            );
          })}
        </div>

        {/* Active Word Discovery Info Banner */}
        {activeWordInfo && (
          <div
            className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-3 animate-bounce-slow text-right ${
              activeWordInfo.isNoun
                ? 'bg-amber-100 border-amber-400 text-amber-950 font-black'
                : 'bg-slate-100 border-slate-300 text-slate-700 font-bold'
            }`}
          >
            <div className="space-y-0.5">
              <span className="text-xs text-slate-500 block">تَفَاصِيلُ الْكَلِمَةِ:</span>
              <p className="text-sm sm:text-base tashkeel-text">
                {activeWordInfo.isNoun
                  ? `🌟 كَلِمَةُ (${activeWordInfo.word}) هِيَ ${activeWordInfo.category || 'اسْمٌ'}!`
                  : `🔹 كَلِمَةُ (${activeWordInfo.word}) لَيْسَتِ اسْماً (هِيَ فِعْلٌ أَوْ حَرْفٌ).`}
              </p>
            </div>
            <button
              onClick={() => soundManager.speakArabic(activeWordInfo.word)}
              className="p-2 bg-white rounded-xl shadow-xs shrink-0"
              title="نُطْقٌ"
            >
              <Volume2 className="w-4 h-4 text-slate-800" />
            </button>
          </div>
        )}

        {/* Story Navigation Footer */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-rose-200/80">
          <button
            onClick={handlePrevStory}
            disabled={selectedStoryIdx === 0}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
              selectedStoryIdx === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white hover:bg-rose-100 text-rose-900 border border-rose-300 shadow-xs hover:scale-105'
            }`}
            id="btn-prev-story"
          >
            <span>➡️ الْقِصَّةُ السَّابِقَةُ</span>
          </button>

          {isStoryCompleted && (
            <div className="text-center font-black text-xs text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1 animate-pulse">
              <span>🎉 رَائِعٌ! أَكْمَلْتَ هَذِهِ الْقِصَّةَ</span>
            </div>
          )}

          <button
            onClick={handleNextStory}
            disabled={selectedStoryIdx === STORIES_DATA.length - 1}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
              selectedStoryIdx === STORIES_DATA.length - 1
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:scale-105'
            }`}
            id="btn-next-story"
          >
            <span>الْقِصَّةُ التَّالِيَةُ ⬅️</span>
          </button>
        </div>

      </div>

    </div>
  );
};
