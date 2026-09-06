import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { NOUN_ITEMS, SIGNS_DATA } from '../data/nounsData';
import { NounCategory, NounItem } from '../types';
import { soundManager } from '../utils/audio';

interface LessonsViewProps {
  onEarnStar: (count?: number) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({ onEarnStar }) => {
  const [selectedSubTab, setSelectedSubTab] = useState<'concept' | 'categories' | 'signs'>('concept');
  const [selectedCategory, setSelectedCategory] = useState<NounCategory>('human');
  const [activeWord, setActiveWord] = useState<NounItem>(NOUN_ITEMS[0]);
  const [exploredItems, setExploredItems] = useState<Set<string>>(new Set(['h1']));
  const [appliedSign, setAppliedSign] = useState<string | null>(null);

  // Alternating representative examples across all 5 noun categories
  const conceptExamples = [
    NOUN_ITEMS[0],  // طَالِبٌ - إنسان
    NOUN_ITEMS[4],  // أَسَدٌ - حيوان
    NOUN_ITEMS[8],  // شَجَرَةٌ - نبات
    NOUN_ITEMS[12], // قَلَمٌ - جماد
    NOUN_ITEMS[17], // مَدْرَسَةٌ - مكان
    NOUN_ITEMS[1],  // مُعَلِّمَةٌ - إنسان
    NOUN_ITEMS[5],  // زَرَافَةٌ - حيوان
    NOUN_ITEMS[9],  // زَهْرَةٌ - نبات
    NOUN_ITEMS[13], // كِتَابٌ - جماد
    NOUN_ITEMS[16], // حَدِيقَةٌ - مكان
    NOUN_ITEMS[2],  // طَبِيبٌ - إنسان
    NOUN_ITEMS[6],  // عُصْفُورٌ - حيوان
    NOUN_ITEMS[10], // نَخْلَةٌ - نبات
    NOUN_ITEMS[14], // كُرَةٌ - جماد
    NOUN_ITEMS[18], // مَسْجِدٌ - مكان
    NOUN_ITEMS[3],  // أَحْمَدُ - إنسان
    NOUN_ITEMS[7],  // أَرْنَبٌ - حيوان
    NOUN_ITEMS[11], // تُفَّاحَةٌ - نبات
    NOUN_ITEMS[15], // حَقِيبَةٌ - جماد
    NOUN_ITEMS[19], // بَيْتٌ - مكان
  ].filter(Boolean);

  const [conceptExampleIdx, setConceptExampleIdx] = useState<number>(0);

  const handleNextConceptExample = () => {
    soundManager.playPop();
    const nextIdx = (conceptExampleIdx + 1) % conceptExamples.length;
    setConceptExampleIdx(nextIdx);
    const nextWord = conceptExamples[nextIdx];
    setActiveWord(nextWord);
    soundManager.speakArabic(`${nextWord.word}: ${nextWord.categoryNameAr}`);

    if (!exploredItems.has(nextWord.id)) {
      const next = new Set(exploredItems);
      next.add(nextWord.id);
      setExploredItems(next);
      onEarnStar(1);
    }
  };

  const handlePrevConceptExample = () => {
    soundManager.playPop();
    const prevIdx = (conceptExampleIdx - 1 + conceptExamples.length) % conceptExamples.length;
    setConceptExampleIdx(prevIdx);
    const prevWord = conceptExamples[prevIdx];
    setActiveWord(prevWord);
    soundManager.speakArabic(`${prevWord.word}: ${prevWord.categoryNameAr}`);
  };

  const categories: { id: NounCategory; label: string; icon: string; color: string }[] = [
    { id: 'human', label: 'اسْمُ إِنْسَانٍ', icon: '👦', color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: 'animal', label: 'اسْمُ حَيَوَانٍ', icon: '🦁', color: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
    { id: 'plant', label: 'اسْمُ نَبَاتٍ', icon: '🌳', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    { id: 'object', label: 'اسْمُ جَمَادٍ', icon: '🎒', color: 'bg-blue-100 text-blue-900 border-blue-300' },
    { id: 'place', label: 'اسْمُ مَكَانٍ', icon: '🏫', color: 'bg-teal-100 text-teal-900 border-teal-300' },
  ];

  const handleSelectWord = (item: NounItem) => {
    soundManager.playPop();
    setActiveWord(item);
    soundManager.speakArabic(`${item.word}: ${item.categoryNameAr}`);

    if (!exploredItems.has(item.id)) {
      const next = new Set(exploredItems);
      next.add(item.id);
      setExploredItems(next);
      onEarnStar(1);
    }
  };

  const handleSpeakSentence = (sentence: string) => {
    soundManager.playPop();
    soundManager.speakArabic(sentence);
  };

  const filteredWords = NOUN_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6" id="lessons-view-container">
      
      {/* Sub-Tab Navigation for Lessons */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-amber-100/70 rounded-2xl border border-amber-300 max-w-2xl mx-auto shadow-inner" id="lesson-subtabs">
        <button
          onClick={() => {
            soundManager.playPop();
            setSelectedSubTab('concept');
            soundManager.speakArabic('مَا هُوَ الِاسْمُ؟');
          }}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all ${
            selectedSubTab === 'concept'
              ? 'bg-amber-500 text-white shadow-md scale-102'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
          id="tab-lesson-concept"
        >
          🌱 ١. مَا هُوَ الِاسْمُ؟
        </button>

        <button
          onClick={() => {
            soundManager.playPop();
            setSelectedSubTab('categories');
            soundManager.speakArabic('أَنْوَاعُ الِاسْمِ الْخَمْسَةُ');
          }}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all ${
            selectedSubTab === 'categories'
              ? 'bg-emerald-600 text-white shadow-md scale-102'
              : 'text-emerald-900 hover:bg-emerald-200/60'
          }`}
          id="tab-lesson-categories"
        >
          🎨 ٢. أَنْوَاعُ الِاسْمِ
        </button>

        <button
          onClick={() => {
            soundManager.playPop();
            setSelectedSubTab('signs');
            soundManager.speakArabic('عَلَامَاتُ الِاسْمِ السِّحْرِيَّةُ');
          }}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all ${
            selectedSubTab === 'signs'
              ? 'bg-purple-600 text-white shadow-md scale-102'
              : 'text-purple-900 hover:bg-purple-200/60'
          }`}
          id="tab-lesson-signs"
        >
          ✨ ٣. عَلَامَاتُ الِاسْمِ
        </button>
      </div>

      {/* SECTION 1: WHAT IS A NOUN? (مفهوم الاسم) */}
      {selectedSubTab === 'concept' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-200 shadow-sm space-y-6" id="concept-section">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-l from-amber-50 to-orange-50 p-4 sm:p-5 rounded-2xl border border-amber-200">
            <div className="space-y-1.5 text-right flex-1">
              <span className="bg-amber-200 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-extrabold border border-amber-300 inline-block mb-1">
                الدَّرْسُ الْأَوَّلُ
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-readex">
                مَا هُوَ الِاسْمُ يَا صَغِيرِي؟
              </h2>
              <p className="text-amber-900 text-sm sm:text-base font-semibold tashkeel-text leading-relaxed">
                الِاسْمُ هُوَ كَلِمَةٌ نُسَمِّي بِهَا كُلَّ شَيْءٍ حَوْلَنَا: <span className="font-extrabold text-amber-700">إِنْسَاناً</span>، أَوْ <span className="font-extrabold text-yellow-700">حَيَوَاناً</span>، أَوْ <span className="font-extrabold text-emerald-700">نَبَاتاً</span>، أَوْ <span className="font-extrabold text-blue-700">جَمَاداً</span>، أَوْ <span className="font-extrabold text-teal-700">مَكَاناً</span>.
              </p>
            </div>
            <button
              onClick={() => {
                soundManager.playPop();
                soundManager.speakArabic('الِاسْمُ هُوَ كَلِمَةٌ نُسَمِّي بِهَا كُلَّ شَيْءٍ حَوْلَنَا: إِنْسَاناً، أَوْ حَيَوَاناً، أَوْ نَبَاتاً، أَوْ جَمَاداً، أَوْ مَكَاناً.');
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-md hover:scale-105 transition-all shrink-0"
              id="btn-speak-concept"
            >
              <Volume2 className="w-5 h-5" />
              <span>اسْتَمِعْ لِلشَّرْحِ</span>
            </button>
          </div>

          {/* Interactive Example Showcase with Next Button Navigation */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border-3 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">

            {/* Central Word Presentation */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-right">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-5xl sm:text-6xl shadow-md border-4 border-white shrink-0">
                {activeWord.icon}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <h4 className="text-3xl sm:text-4xl font-black text-amber-950 tashkeel-text">
                    {activeWord.word}
                  </h4>
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      soundManager.speakArabic(`${activeWord.word}: ${activeWord.categoryNameAr}`);
                    }}
                    className="p-2.5 rounded-2xl bg-amber-200 hover:bg-amber-300 text-amber-950 transition-all hover:scale-105 shadow-xs"
                    title="اسْتَمِعْ لِنُطْقِ الْكَلِمَةِ"
                    id="btn-speak-active-word"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-amber-200 flex items-center justify-between gap-3 shadow-xs">
                  <p className="text-sm sm:text-base font-bold text-slate-800 tashkeel-text flex-1">
                    جُمْلَةٌ: «{activeWord.exampleSentence}»
                  </p>
                  <button
                    onClick={() => handleSpeakSentence(activeWord.exampleSentence)}
                    className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors shrink-0"
                    title="نُطْقُ الْجُمْلَةِ"
                    id="btn-speak-active-sentence"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Buttons: السابق and التالي */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-amber-200/80">
              <button
                onClick={handlePrevConceptExample}
                className="px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-xs hover:scale-105 transition-all flex items-center gap-2"
                id="btn-prev-example"
              >
                <span>➡️ الْمِثَالُ السَّابِقُ</span>
              </button>

              <button
                onClick={handleNextConceptExample}
                className="px-6 py-2.5 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:scale-105 transition-all flex items-center gap-2 ring-2 ring-amber-300/60"
                id="btn-next-example"
              >
                <span>الْمِثَالُ التَّالِي ⬅️</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 2: NOUN CATEGORIES (أنواع الاسم الخمسة) */}
      {selectedSubTab === 'categories' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-emerald-200 shadow-sm space-y-6" id="categories-section">
          
          <div className="text-right space-y-1">
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold border border-emerald-300 inline-block mb-1">
              الدَّرْسُ الثَّانِي
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950 font-readex">
              عَائِلَاتُ الْأَسْمَاءِ الْخَمْسُ
            </h2>
            <p className="text-slate-600 text-sm font-semibold">
              اخْتَرْ نَوْعَ الِاسْمِ لِتَكْتَشِفَ أَمْثِلَتَهُ النَّاطِقَةَ:
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start" id="category-selector-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playPop();
                  setSelectedCategory(cat.id);
                  soundManager.speakArabic(cat.label);
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-105'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                }`}
                id={`cat-btn-${cat.id}`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Cards for this Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredWords.map(item => {
              const isExplored = exploredItems.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectWord(item)}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative group flex flex-col justify-between ${
                    activeWord.id === item.id
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-lg scale-102 ring-2 ring-emerald-300'
                      : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
                  }`}
                  id={`card-word-${item.id}`}
                >
                  {isExplored && (
                    <span className="absolute top-2.5 left-2.5 text-amber-500 text-xs font-bold flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                      ⭐ مُكْتَشَفٌ
                    </span>
                  )}
                  
                  <div className="text-center py-2">
                    <span className="text-5xl block mb-3 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <h4 className="text-2xl font-black text-slate-900 tashkeel-text mb-1">
                      {item.word}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.meaning}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-lg">
                      {item.categoryNameAr}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.playPop();
                        soundManager.speakArabic(`${item.word}: ${item.categoryNameAr}`);
                      }}
                      className="p-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-colors"
                      title="نُطْقُ الْكَلِمَةِ"
                      id={`btn-pronounce-${item.id}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Word Sentence Viewer */}
          <div className="bg-emerald-50/60 border-2 border-emerald-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-right flex-1">
              <span className="text-xs font-black text-emerald-800 block mb-1">
                جُمْلَةٌ تَوْضِيحِيَّةٌ لِكَلِمَةِ ({activeWord.word}):
              </span>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 tashkeel-text">
                «{activeWord.exampleSentence}»
              </p>
            </div>
            <button
              onClick={() => handleSpeakSentence(activeWord.exampleSentence)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-sm shrink-0"
              id="btn-speak-sentence-cat"
            >
              <Volume2 className="w-4 h-4" />
              <span>اسْتَمِعْ لِلْجُمْلَةِ</span>
            </button>
          </div>

        </div>
      )}

      {/* SECTION 3: SIGNS OF NOUNS (علامات الاسم السحرية) */}
      {selectedSubTab === 'signs' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-purple-200 shadow-sm space-y-6" id="signs-section">
          
          <div className="text-right space-y-1">
            <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold border border-purple-300 inline-block mb-1">
              الدَّرْسُ الثَّالِثُ
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-purple-950 font-readex">
              عَلَامَاتُ الِاسْمِ السِّحْرِيَّةُ (مَفَاتِيحُ الِاسْمِ)
            </h2>
            <p className="text-slate-600 text-sm font-semibold">
              كَيْفَ نَتَأَكَّدُ أَنَّ الْكَلِمَةَ اسْمٌ؟ لِلِاسْمِ عَلَامَاتٌ خَاصَّةٌ لَا تَدْخُلُ عَلَى غَيْرِهِ:
            </p>
          </div>

          {/* 4 Interactive Signs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SIGNS_DATA.map(sign => (
              <div
                key={sign.id}
                className="p-5 rounded-3xl bg-gradient-to-br from-purple-50/60 to-indigo-50/60 border-2 border-purple-200 hover:border-purple-300 transition-all space-y-3"
                id={`sign-card-${sign.id}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{sign.icon}</span>
                  <span className="bg-purple-600 text-white font-extrabold text-xs px-3 py-1 rounded-xl shadow-xs">
                    {sign.badge}
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <h4 className="text-lg font-black text-purple-950 font-readex">
                    {sign.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-700 tashkeel-text leading-relaxed">
                    {sign.explanation}
                  </p>
                </div>

                {/* Example transformation */}
                <div className="p-3 bg-white rounded-2xl border border-purple-200 flex items-center justify-between gap-2">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 block">مِثَالٌ:</span>
                    <span className="font-extrabold text-sm sm:text-base text-purple-900 tashkeel-text">
                      {sign.exampleBefore} ⬅️ {sign.exampleAfter}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      soundManager.speakArabic(sign.audioText);
                    }}
                    className="p-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 transition-colors shrink-0"
                    title="اسْتَمِعْ لِلْمِثَالِ"
                    id={`btn-sign-speak-${sign.id}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[11px] font-bold text-purple-800 bg-purple-100/70 p-2 rounded-xl text-right">
                  💡 نَصِيحَةٌ ذَكِيَّةٌ: {sign.tip}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Live Testing Tool for Kids */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-5 sm:p-6 rounded-3xl shadow-lg text-right space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-yellow-400 text-yellow-950 font-black text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                تَجْرِبَةٌ تَفَاعُلِيَّةٌ
              </span>
              <h3 className="text-lg font-black font-readex">
                مُخْتَبَرُ تَحْوِيلِ الْكَلِمَةِ السِّحْرِيِّ
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-purple-100 font-semibold">
              اخْتَرْ عَلَامَةً سِحْرِيَّةً لِنُطَبِّقَهَا عَلَى كَلِمَةِ (<span className="font-black text-yellow-300 text-base">كِتَابٌ</span>):
            </p>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                onClick={() => {
                  soundManager.playStar();
                  setAppliedSign('al');
                  soundManager.speakArabic('الْكِتَابُ');
                }}
                className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  appliedSign === 'al'
                    ? 'bg-yellow-400 text-yellow-950 scale-105 shadow-md'
                    : 'bg-purple-800 text-white hover:bg-purple-700'
                }`}
                id="btn-test-al"
              >
                ✨ إِدْخَالُ (الْـ) التَّعْرِيفِ
              </button>

              <button
                onClick={() => {
                  soundManager.playStar();
                  setAppliedSign('tanween');
                  soundManager.speakArabic('كِتَابٌ، كِتَاباً، كِتَابٍ');
                }}
                className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  appliedSign === 'tanween'
                    ? 'bg-yellow-400 text-yellow-950 scale-105 shadow-md'
                    : 'bg-purple-800 text-white hover:bg-purple-700'
                }`}
                id="btn-test-tanween"
              >
                🔔 إِدْخَالُ التَّنْوِينِ
              </button>

              <button
                onClick={() => {
                  soundManager.playStar();
                  setAppliedSign('harf');
                  soundManager.speakArabic('فِي الْكِتَابِ');
                }}
                className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  appliedSign === 'harf'
                    ? 'bg-yellow-400 text-yellow-950 scale-105 shadow-md'
                    : 'bg-purple-800 text-white hover:bg-purple-700'
                }`}
                id="btn-test-harf"
              >
                🚪 حَرْفُ جَرٍّ قَبْلَهُ (فِي...)
              </button>
            </div>

            {appliedSign && (
              <div className="p-4 bg-white/15 rounded-2xl border border-white/20 text-center animate-bounce-slow">
                <span className="text-xs text-purple-200 block mb-1 font-bold">النَّتِيجَةُ السِّحْرِيَّةُ:</span>
                <span className="text-2xl sm:text-3xl font-black text-yellow-300 tashkeel-text block">
                  {appliedSign === 'al' && 'الْكِتَابُ (اسْتَبْدَلْنَا التَّنْوِينَ بِالضَّمَّةِ)'}
                  {appliedSign === 'tanween' && 'كِتَابٌ ⬅️ كِتَاباً ⬅️ كِتَابٍ'}
                  {appliedSign === 'harf' && 'فِي الْكِتَابِ (اسْمٌ مَجْرُورٌ)'}
                </span>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
