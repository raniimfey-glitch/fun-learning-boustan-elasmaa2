import { NounItem, LessonTopic, QuizQuestion, Badge, StickerGift } from '../types';

export const NOUN_ITEMS: NounItem[] = [
  // إنسان
  {
    id: 'h1',
    word: 'طَالِبٌ',
    category: 'human',
    categoryNameAr: 'إِنْسَانٌ',
    meaning: 'مَنْ يَتَعَلَّمُ فِي الْمَدْرَسَةِ',
    icon: '👦',
    exampleSentence: 'يَقْرَأُ الطَّالِبُ الدَّرْسَ بِنَشَاطٍ.',
    signs: ['tanween', 'al'],
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'h2',
    word: 'مُعَلِّمَةٌ',
    category: 'human',
    categoryNameAr: 'إِنْسَانٌ',
    meaning: 'تُعَلِّمُ الْأَطْفَالَ وَتُرْشِدُهُمْ',
    icon: '👩‍🏫',
    exampleSentence: 'تَشْرَحُ الْمُعَلِّمَةُ الْقِصَّةَ بِابْتِسَامَةٍ.',
    signs: ['ta_marbuta', 'tanween', 'al'],
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'h3',
    word: 'طَبِيبٌ',
    category: 'human',
    categoryNameAr: 'إِنْسَانٌ',
    meaning: 'يُعَالِجُ الْمَرْضَى وَيَهْتَمُّ بِصِحَّتِهِمْ',
    icon: '👨‍⚕️',
    exampleSentence: 'فَحَصَ الطَّبِيبُ الطِّفْلَ بِلُطْفٍ.',
    signs: ['tanween', 'al'],
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'h4',
    word: 'أَحْمَدُ',
    category: 'human',
    categoryNameAr: 'إِنْسَانٌ',
    meaning: 'اسْمُ وَلَدٍ لَطِيفٍ وَمُجْتَهِدٍ',
    icon: '🧒',
    exampleSentence: 'رَسَمَ أَحْمَدُ لَوْحَةً جَمِيلَةً.',
    signs: ['al'],
    color: 'from-emerald-400 to-teal-500'
  },

  // حيوان
  {
    id: 'a1',
    word: 'أَسَدٌ',
    category: 'animal',
    categoryNameAr: 'حَيَوَانٌ',
    meaning: 'مَلِكُ الْغَابَةِ الشُّجَاعُ',
    icon: '🦁',
    exampleSentence: 'يَعِيشُ الْأَسَدُ فِي الْغَابَةِ الْوَاسِعَةِ.',
    signs: ['tanween', 'al'],
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'a2',
    word: 'زَرَافَةٌ',
    category: 'animal',
    categoryNameAr: 'حَيَوَانٌ',
    meaning: 'حَيَوَانٌ طَوِيلُ الرَّقَبَةِ يَأْكُلُ أَوْرَاقَ الشَّجَرِ',
    icon: '🦒',
    exampleSentence: 'الزَّرَافَةُ لَدَيْهَا عُنُقٌ طَوِيلٌ.',
    signs: ['ta_marbuta', 'tanween', 'al'],
    color: 'from-yellow-400 to-amber-500'
  },
  {
    id: 'a3',
    word: 'عُصْفُورٌ',
    category: 'animal',
    categoryNameAr: 'حَيَوَانٌ',
    meaning: 'طَائِرٌ صَغِيرٌ يُغَرِّدُ بِصَوْتٍ عَذْبٍ',
    icon: '🐦',
    exampleSentence: 'يُغَرِّدُ الْعُصْفُورُ فَوْقَ الْغُصْنِ.',
    signs: ['tanween', 'al'],
    color: 'from-sky-400 to-blue-500'
  },
  {
    id: 'a4',
    word: 'أَرْنَبٌ',
    category: 'animal',
    categoryNameAr: 'حَيَوَانٌ',
    meaning: 'حَيَوَانٌ سَرِيعٌ يُحِبُّ أَكْلَ الْجَزَرِ',
    icon: '🐇',
    exampleSentence: 'يَقْفِزُ الْأَرْنَبُ فِي الْحَقْلِ مَسْرُوراً.',
    signs: ['tanween', 'al'],
    color: 'from-slate-400 to-stone-500'
  },

  // نبات
  {
    id: 'p1',
    word: 'شَجَرَةٌ',
    category: 'plant',
    categoryNameAr: 'نَبَاتٌ',
    meaning: 'نَبَاتٌ كَبِيرٌ لَهُ جِذْعٌ وَأَغْصَانٌ وَأَوْرَاقٌ',
    icon: '🌳',
    exampleSentence: 'تُعْطِينَا الشَّجَرَةُ ظِلاًّ بَارِداً.',
    signs: ['ta_marbuta', 'tanween', 'al'],
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'p2',
    word: 'زَهْرَةٌ',
    category: 'plant',
    categoryNameAr: 'نَبَاتٌ',
    meaning: 'نَبَاتٌ جَمِيلٌ ذُو رَائِحَةٍ عَطِرَةٍ وَأَلْوَانٍ زَاهِيَةٍ',
    icon: '🌸',
    exampleSentence: 'تَفُوحُ الزَّهْرَةُ بِعِطْرٍ زَكِيٍّ.',
    signs: ['ta_marbuta', 'tanween', 'al'],
    color: 'from-pink-400 to-fuchsia-500'
  },
  {
    id: 'p3',
    word: 'تُفَّاحَةٌ',
    category: 'plant',
    categoryNameAr: 'نَبَاتٌ',
    meaning: 'ثَمَرَةٌ لَذِيذَةٌ وَمُفِيدَةٌ لِلصِّحَّةِ',
    icon: '🍎',
    exampleSentence: 'أَكَلْتُ تُفَّاحَةً حَمْرَاءَ حُلْوَةَ الْمَذَاقِ.',
    signs: ['ta_marbuta', 'tanween', 'al'],
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 'p4',
    word: 'نَخْلَةٌ',
    category: 'plant',
    categoryNameAr: 'نَبَاتٌ',
    meaning: 'شَجَرَةٌ مُبَارَكَةٌ تُثْمِرُ التَّمْرَ اللَّذِيذَ',
    icon: '🌴',
    exampleSentence: 'تَرْتَفِعُ النَّخْلَةُ عَالِياً فِي السَّمَاءِ.',
    signs: ['ta_marbuta', 'tanween', 'al'],
    color: 'from-emerald-500 to-green-700'
  },

  // جماد
  {
    id: 'o1',
    word: 'قَلَمٌ',
    category: 'object',
    categoryNameAr: 'جَمَادٌ',
    meaning: 'أَدَاةٌ نَكْتُبُ وَنَرْسُمُ بِهَا فِي الدَّفْتَرِ',
    icon: '✏️',
    exampleSentence: 'كَتَبْتُ الْوَاجِبَ بِقَلَمٍ أَزْرَقَ.',
    signs: ['tanween', 'al'],
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'o2',
    word: 'كِتَابٌ',
    category: 'object',
    categoryNameAr: 'جَمَادٌ',
    meaning: 'أَوْرَاقٌ مَجْمُوعَةٌ فِيهَا عُلُومٌ وَقِصَصٌ نَافِعَةٌ',
    icon: '📖',
    exampleSentence: 'الْكِتَابُ صَدِيقٌ وَفِيٌّ لِكُلِّ طِفْلٍ.',
    signs: ['tanween', 'al'],
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'o3',
    word: 'سَيَّارَةٌ',
    category: 'object',
    categoryNameAr: 'جَمَادٌ',
    meaning: 'مَرْكَبَةٌ لَهَا أَرْبَعُ عَجَلَاتٍ تَنْقُلُنَا',
    icon: '🚗',
    exampleSentence: 'تَسِيرُ السَّيَّارَةُ فِي الشَّارِعِ بِهُدُوءٍ.',
    signs: ['ta_marbuta', 'tanween', 'al'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'o4',
    word: 'حَقِيبَةٌ',
    category: 'object',
    categoryNameAr: 'جَمَادٌ',
    meaning: 'وِعَاءٌ نَضَعُ فِيهِ الْكُتُبَ وَالْأَدَوَاتِ الْمَدْرَسِيَّةَ',
    icon: '🎒',
    exampleSentence: 'رَتَّبْتُ أَدَوَاتِي دَاخِلَ الْحَقِيبَةِ.',
    signs: ['ta_marbuta', 'tanween', 'al'],
    color: 'from-violet-500 to-purple-600'
  },

  // مكان
  {
    id: 'l1',
    word: 'مَدْرَسَةٌ',
    category: 'place',
    categoryNameAr: 'مَكَانٌ',
    meaning: 'الْمَكَانُ الَّذِي نَتَعَلَّمُ فِيهِ الْعُلُومَ وَالْأَخْلَاقَ',
    icon: '🏫',
    exampleSentence: 'أَذْهَبُ إِلَى الْمَدْرَسَةِ كُلَّ صَبَاحٍ.',
    signs: ['ta_marbuta', 'tanween', 'al', 'harf_jarr'],
    color: 'from-teal-500 to-emerald-600'
  },
  {
    id: 'l2',
    word: 'حَدِيقَةٌ',
    category: 'place',
    categoryNameAr: 'مَكَانٌ',
    meaning: 'مَكَانٌ فِيهِ أَشْجَارٌ وَأَلْعَابٌ وَأَزْهَارٌ جَمِيلَةٌ',
    icon: '🏞️',
    exampleSentence: 'لَعِبْنَا فِي الْحَدِيقَةِ مَعَ الْأَصْدِقَاءِ.',
    signs: ['ta_marbuta', 'tanween', 'al', 'harf_jarr'],
    color: 'from-emerald-500 to-green-600'
  },
  {
    id: 'l3',
    word: 'مَسْجِدٌ',
    category: 'place',
    categoryNameAr: 'مَكَانٌ',
    meaning: 'بَيْتُ اللَّهِ الَّذِي نُصَلِّي فِيهِ مَعَ الْجَمَاعَةِ',
    icon: '🕌',
    exampleSentence: 'دَخَلَ الْمُصَلُّونَ إِلَى الْمَسْجِدِ بِخُشُوعٍ.',
    signs: ['tanween', 'al', 'harf_jarr'],
    color: 'from-amber-600 to-yellow-600'
  },
  {
    id: 'l4',
    word: 'بَيْتٌ',
    category: 'place',
    categoryNameAr: 'مَكَانٌ',
    meaning: 'الْمَكَانُ الدَّافِئُ الَّذِي نَعِيشُ فِيهِ مَعَ عَائِلَتِنَا',
    icon: '🏡',
    exampleSentence: 'أَعُودُ إِلَى الْبَيْتِ فَرِحاً بَعْدَ الدَّوَامِ.',
    signs: ['tanween', 'al', 'harf_jarr'],
    color: 'from-orange-500 to-amber-600'
  }
];

export const LESSON_TOPICS: LessonTopic[] = [
  {
    id: 'concept',
    title: 'مَا هُوَ الِاسْمُ؟',
    subtitle: 'تَعَرَّفْ عَلَى مَفْهُومِ الِاسْمِ بِبَسَاطَةٍ',
    description: 'الِاسْمُ هُوَ كَلِمَةٌ نُسَمِّي بِهَا كُلَّ شَيْءٍ حَوْلَنَا: إِنْسَاناً، أَوْ حَيَوَاناً، أَوْ نَبَاتاً، أَوْ جَمَاداً، أَوْ مَكَاناً. وَهُوَ لَا يَرْتَبِطُ بِزَمَنٍ مُعَيَّنٍ!',
    iconName: 'Sparkles',
    examples: [
      NOUT_BY_ID('h1'),
      NOUT_BY_ID('a1'),
      NOUT_BY_ID('p1'),
      NOUT_BY_ID('o1'),
      NOUT_BY_ID('l1')
    ],
    color: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
    audioPrompt: 'مَرْحَباً بِكَ يَا بَطَل! الِاسْمُ هُوَ كَلِمَةٌ نُسَمِّي بِهَا كُلَّ شَيْءٍ حَوْلَنَا: إِنْسَاناً، أَوْ حَيَوَاناً، أَوْ نَبَاتاً، أَوْ جَمَاداً، أَوْ مَكَاناً.'
  },
  {
    id: 'types',
    title: 'أَنْوَاعُ الِاسْمِ الْخَمْسَةُ',
    subtitle: 'إِنْسَانٌ، حَيَوَانٌ، نَبَاتٌ، جَمَادٌ، مَكَانٌ',
    description: 'كُلُّ اسْمٍ فِي لُغَتِنَا الْعَرَبِيَّةِ الْجَمِيلَةِ يَنْتَمِي إِلَى عَائِلَةٍ لَطِيفَةٍ، هَيَّا نَتَعَرَّفْ عَلَى هَذِهِ الْعَائِلَاتِ الْخَمْسِ!',
    iconName: 'Shapes',
    examples: NOUN_ITEMS.slice(0, 10),
    color: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
    audioPrompt: 'أَنْوَاعُ الِاسْمِ هِيَ: اسْمُ إِنْسَانٍ، وَاسْمُ حَيَوَانٍ، وَاسْمُ نَبَاتٍ، وَاسْمُ جَمَادٍ، وَاسْمُ مَكَانٍ.'
  },
  {
    id: 'signs',
    title: 'عَلَامَاتُ الِاسْمِ السِّحْرِيَّةُ',
    subtitle: 'كَيْفَ أَعْرِفُ أَنَّ هَذِهِ الْكَلِمَةَ اسْمٌ؟',
    description: 'لِلِاسْمِ عَلَامَاتٌ سِحْرِيَّةٌ تُمَيِّزُهُ عَنْ بَاقِي الْكَلِمَاتِ! إِذَا قَبِلَتِ الْكَلِمَةُ إِحْدَى هَذِهِ الْعَلَامَاتِ فَهِيَ اسْمٌ بِكُلِّ تَأْكِيدٍ.',
    iconName: 'KeyRound',
    examples: [
      NOUT_BY_ID('o1'),
      NOUT_BY_ID('p1'),
      NOUT_BY_ID('l1'),
      NOUT_BY_ID('a2')
    ],
    color: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white',
    audioPrompt: 'عَلَامَاتُ الِاسْمِ السِّحْرِيَّةُ هِيَ: قَبُولُ الْـ التَّعْرِيفِ، وَالتَّنْوِينِ، وَالتَّاءِ الْمَرْبُوطَةِ، وَدُخُولُ حُرُوفِ الْجَرِّ قَبْلَهُ!'
  }
];

function NOUT_BY_ID(id: string): NounItem {
  const item = NOUN_ITEMS.find(n => n.id === id);
  return item || NOUN_ITEMS[0];
}

export const SIGNS_DATA = [
  {
    id: 'al',
    name: 'دُخُولُ (الْـ) التَّعْرِيفِ',
    icon: '✨',
    badge: 'الْـ',
    explanation: 'الِاسْمُ يَقْبَلُ دُخُولَ (الْـ) فِي أَوَّلِهِ.',
    exampleBefore: 'قَلَمٌ',
    exampleAfter: 'الْقَلَمُ',
    audioText: 'عَلَامَةُ الْـ التَّعْرِيف: مِثْلُ: قَلَمٌ تُصْبِحُ: الْقَلَمُ.',
    tip: 'جَرِّبْ وَضْعَ (الْـ) قَبْلَ الْكَلِمَةِ، إِذَا كَانَتْ صَحِيحَةً فَهِيَ اسْمٌ!'
  },
  {
    id: 'tanween',
    name: 'التَّنْوِينُ ( ٌ ، ً ، ٍ )',
    icon: '🔔',
    badge: 'ـٌ ـً ـٍ',
    explanation: 'التَّنْوِينُ نُونٌ سَاكِنَةٌ تَلْحَقُ آخِرَ الِاسْمِ نُطْقاً لَا كِتَابَةً.',
    exampleBefore: 'كِتَابٌ',
    exampleAfter: 'كِتَاباً - كِتَابٍ',
    audioText: 'عَلَامَةُ التَّنْوِينِ: مِثْلُ: كِتَابٌ، كِتَاباً، كِتَابٍ. التَّنْوِينُ لَا يَدْخُلُ إِلَّا عَلَى الْأَسْمَاءِ!',
    tip: 'التَّنْوِينُ لَا يَدْخُلُ أَبَداً عَلَى الْأَفْعَالِ، بَلْ هُوَ خَاصٌّ بِالْأَسْمَاءِ فَقَطْ!'
  },
  {
    id: 'ta_marbuta',
    name: 'التَّاءُ الْمَرْبُوطَةُ ( ـة / ة )',
    icon: '🎀',
    badge: 'ـة / ة',
    explanation: 'التَّاءُ الْمَرْبُوطَةُ لَا تَأْتِي إِلَّا فِي نِهَايَةِ الْأَسْمَاءِ فَقَطْ!',
    exampleBefore: 'شَجَرَةٌ',
    exampleAfter: 'مَدْرَسَةٌ - قِطَّةٌ',
    audioText: 'عَلَامَةُ التَّاءِ الْمَرْبُوطَةِ: تَأْتِي فَقَطْ فِي نِهَايَةِ الْأَسْمَاءِ مِثْلُ: شَجَرَةٌ، مَدْرَسَةٌ، قِطَّةٌ.',
    tip: 'كُلُّ كَلِمَةٍ تَنْتَهِي بِتَاءٍ مَرْبُوطَةٍ هِيَ اسْمٌ دَائِماً!'
  },
  {
    id: 'harf_jarr',
    name: 'دُخُولُ حُرُوفِ الْجَرِّ',
    icon: '🚪',
    badge: 'فِي - إِلَى - عَلَى',
    explanation: 'الِاسْمُ يَقْبَلُ أَنْ يَسْبِقَهُ حَرْفُ جَرٍّ مِثْلَ: (فِي، إِلَى، عَلَى، مِنْ).',
    exampleBefore: 'فِي الْمَدْرَسَةِ',
    exampleAfter: 'عَلَى الطَّاوِلَةِ',
    audioText: 'حُرُوفُ الْجَرِّ لَا تَدْخُلُ إِلَّا عَلَى الْأَسْمَاءِ مِثْلُ: فِي الْمَدْرَسَةِ، عَلَى الطَّاوِلَةِ.',
    tip: 'إِذَا رَأَيْتَ كَلِمَةً بَعْدَ (فِي) أَوْ (عَلَى) أَوْ (إِلَى) فَهِيَ اسْمٌ مَجْرُورٌ!'
  }
];

export interface HunterWord {
  id: string;
  word: string;
  isNoun: boolean;
  typeDesc: string; // 'اسْمُ حَيَوَان' أو 'فِعْلٌ' أو 'حَرْفٌ'
  reason: string;
  emoji: string;
}

export const HUNTER_WORDS: HunterWord[] = [
  { id: 'w1', word: 'عُصْفُورٌ', isNoun: true, typeDesc: 'اسْمُ طَائِرٍ', reason: 'يَقْبَلُ التَّنْوِينَ وَالْـ التَّعْرِيفِ', emoji: '🐦' },
  { id: 'w2', word: 'يَكْتُبُ', isNoun: false, typeDesc: 'فِعْلٌ مُضَارِعٌ', reason: 'يَدُلُّ عَلَى عَمَلٍ فِي الزَّمَنِ الْحَاضِرِ', emoji: '✍️' },
  { id: 'w3', word: 'مَدْرَسَةٌ', isNoun: true, typeDesc: 'اسْمُ مَكَانٍ', reason: 'يَنْتَهِي بِتَاءِ مَرْبُوطَةٍ وَيَقْبَلُ الْـ', emoji: '🏫' },
  { id: 'w4', word: 'فِي', isNoun: false, typeDesc: 'حَرْفُ جَرٍّ', reason: 'حَرْفٌ لَيْسَ لَهُ مَعْنًى بِمُفْرَدِهِ', emoji: '➡️' },
  { id: 'w5', word: 'تُفَّاحَةٌ', isNoun: true, typeDesc: 'اسْمُ نَبَاتٍ', reason: 'يَدُلُّ عَلَى ثَمَرَةٍ وَيَنْتَهِي بِتَاءٍ مَرْبُوطَةٍ', emoji: '🍎' },
  { id: 'w6', word: 'لَعِبَ', isNoun: false, typeDesc: 'فِعْلٌ مَاضٍ', reason: 'يَدُلُّ عَلَى حَرَكَةٍ وَعَمَلٍ فِي الْمَاضِي', emoji: '⚽' },
  { id: 'w7', word: 'طَبِيبٌ', isNoun: true, typeDesc: 'اسْمُ إِنْسَانٍ', reason: 'يَدُلُّ عَلَى مِهْنَةِ إِنْسَانٍ وَيَقْبَلُ التَّنْوِينَ', emoji: '👨‍⚕️' },
  { id: 'w8', word: 'عَلَى', isNoun: false, typeDesc: 'حَرْفُ جَرٍّ', reason: 'حَرْفٌ يَجُرُّ الْأَسْمَاءَ', emoji: '⬆️' },
  { id: 'w9', word: 'سَيَّارَةٌ', isNoun: true, typeDesc: 'اسْمُ جَمَادٍ', reason: 'يَدُلُّ عَلَى شَيْءٍ غَيْرِ حَيٍّ وَيَنْتَهِي بِتَاءٍ مَرْبُوطَةٍ', emoji: '🚗' },
  { id: 'w10', word: 'يَقْفِزُ', isNoun: false, typeDesc: 'فِعْلٌ مُضَارِعٌ', reason: 'حَرَكَةٌ وَنَشَاطٌ لَيْسَ اسْماً', emoji: '🦘' },
  { id: 'w11', word: 'أَسَدٌ', isNoun: true, typeDesc: 'اسْمُ حَيَوَانٍ', reason: 'اسْمٌ يَدُلُّ عَلَى كَائِنٍ حَيٍّ مَعْرُوفٍ', emoji: '🦁' },
  { id: 'w12', word: 'مِنْ', isNoun: false, typeDesc: 'حَرْفُ جَرٍّ', reason: 'حَرْفٌ لَا يَقْبَلُ التَّنْوِينَ وَلَا الْـ', emoji: '📍' },
  { id: 'w13', word: 'كِتَابٌ', isNoun: true, typeDesc: 'اسْمُ جَمَادٍ', reason: 'يَقْبَلُ الْـ التَّعْرِيفِ (الْكِتَابُ)', emoji: '📖' },
  { id: 'w14', word: 'يَرْسُمُ', isNoun: false, typeDesc: 'فِعْلٌ مُضَارِعٌ', reason: 'عَمَلٌ وَحَرَكَةٌ مُرْتَبِطَةٌ بِالْوَقْتِ', emoji: '🎨' },
  { id: 'w15', word: 'حَدِيقَةٌ', isNoun: true, typeDesc: 'اسْمُ مَكَانٍ', reason: 'يَدُلُّ عَلَى مَوْقِعٍ وَيَنْتَهِي بِتَاءٍ مَرْبُوطَةٍ', emoji: '🌳' },
  { id: 'w16', word: 'إِلَى', isNoun: false, typeDesc: 'حَرْفُ جَرٍّ', reason: 'حَرْفٌ يُرْشِدُنَا نَحْوَ الْمَكَانِ', emoji: '🎯' }
];

export interface StoryWordItem {
  word: string;
  isNoun: boolean;
  category?: string;
}

export interface StoryParagraph {
  id: string;
  title: string;
  themeColor: string;
  sceneImage: string;
  words: StoryWordItem[];
  fullSentence: string;
}

export const STORIES_DATA: StoryParagraph[] = [
  {
    id: 's1',
    title: 'نُزْهَةُ أَمِيرٍ فِي الْحَدِيقَةِ',
    themeColor: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    sceneImage: '🏞️👦🌸',
    fullSentence: 'ذَهَبَ أَمِيرٌ مَعَ أُخْتِهِ إِلَى الْحَدِيقَةِ الْجَمِيلَةِ، فَشَاهَدَ عُصْفُوراً يُغَرِّدُ فَوْقَ الشَّجَرَةِ.',
    words: [
      { word: 'ذَهَبَ', isNoun: false },
      { word: 'أَمِيرٌ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'مَعَ', isNoun: false },
      { word: 'أُخْتِهِ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'إِلَى', isNoun: false },
      { word: 'الْحَدِيقَةِ', isNoun: true, category: 'اسْمُ مَكَانٍ' },
      { word: 'الْجَمِيلَةِ', isNoun: true, category: 'اسْمُ صِفَةٍ' },
      { word: 'فَشَاهَدَ', isNoun: false },
      { word: 'عُصْفُوراً', isNoun: true, category: 'اسْمُ حَيَوَانٍ' },
      { word: 'يُغَرِّدُ', isNoun: false },
      { word: 'فَوْقَ', isNoun: false },
      { word: 'الشَّجَرَةِ', isNoun: true, category: 'اسْمُ نَبَاتٍ' }
    ]
  },
  {
    id: 's2',
    title: 'يَوْمٌ نَشِيطٌ فِي الْمَدْرَسَةِ',
    themeColor: 'bg-amber-50 border-amber-300 text-amber-900',
    sceneImage: '🏫👩‍🏫🎒',
    fullSentence: 'فَتَحَتِ الْمُعَلِّمَةُ الْكِتَابَ، وَوَضَعَتِ الْقَلَمَ فِي الْحَقِيبَةِ، وَشَكَرَتِ الطَّالِبَ الْمُجِدَّ.',
    words: [
      { word: 'فَتَحَتِ', isNoun: false },
      { word: 'الْمُعَلِّمَةُ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'الْكِتَابَ', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'وَوَضَعَتِ', isNoun: false },
      { word: 'الْقَلَمَ', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'فِي', isNoun: false },
      { word: 'الْحَقِيبَةِ', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'وَشَكَرَتِ', isNoun: false },
      { word: 'الطَّالِبَ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'الْمُجِدَّ', isNoun: true, category: 'اسْمُ صِفَةٍ' }
    ]
  },
  {
    id: 's3',
    title: 'مَزْرَعَةُ الْجَدِّ سَعِيدٍ',
    themeColor: 'bg-green-50 border-green-300 text-green-900',
    sceneImage: '🚜👨‍🌾🐄',
    fullSentence: 'زَارَ كَرِيمٌ مَزْرَعَةَ جَدِّهِ، فَرَأَى بَقَرَةً تَأْكُلُ الْعُشْبَ وَتُعْطِي الْحَلِيبَ اللَّذِيذَ.',
    words: [
      { word: 'زَارَ', isNoun: false },
      { word: 'كَرِيمٌ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'مَزْرَعَةَ', isNoun: true, category: 'اسْمُ مَكَانٍ' },
      { word: 'جَدِّهِ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'فَرَأَى', isNoun: false },
      { word: 'بَقَرَةً', isNoun: true, category: 'اسْمُ حَيَوَانٍ' },
      { word: 'تَأْكُلُ', isNoun: false },
      { word: 'الْعُشْبَ', isNoun: true, category: 'اسْمُ نَبَاتٍ' },
      { word: 'وَتُعْطِي', isNoun: false },
      { word: 'الْحَلِيبَ', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'اللَّذِيذَ', isNoun: true, category: 'اسْمُ صِفَةٍ' }
    ]
  },
  {
    id: 's4',
    title: 'فِي مَكْتَبَةِ الْأَطْفَالِ',
    themeColor: 'bg-indigo-50 border-indigo-300 text-indigo-900',
    sceneImage: '📚👧🦁',
    fullSentence: 'قَرَأَتْ سَلْمَى قِصَّةً مُمْتِعَةً عَنِ الْأَسَدِ الشُّجَاعِ فِي مَكْتَبَةِ الْمَدْرَسَةِ.',
    words: [
      { word: 'قَرَأَتْ', isNoun: false },
      { word: 'سَلْمَى', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'قِصَّةً', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'مُمْتِعَةً', isNoun: true, category: 'اسْمُ صِفَةٍ' },
      { word: 'عَنِ', isNoun: false },
      { word: 'الْأَسَدِ', isNoun: true, category: 'اسْمُ حَيَوَانٍ' },
      { word: 'الشُّجَاعِ', isNoun: true, category: 'اسْمُ صِفَةٍ' },
      { word: 'فِي', isNoun: false },
      { word: 'مَكْتَبَةِ', isNoun: true, category: 'اسْمُ مَكَانٍ' },
      { word: 'الْمَدْرَسَةِ', isNoun: true, category: 'اسْمُ مَكَانٍ' }
    ]
  },
  {
    id: 's5',
    title: 'رِحْلَةٌ إِلَى شَاطِئِ الْبَحْرِ',
    themeColor: 'bg-cyan-50 border-cyan-300 text-cyan-900',
    sceneImage: '🏖️👨‍👧🐚',
    fullSentence: 'سَافَرَتِ الْأُسْرَةُ إِلَى شَاطِئِ الْبَحْرِ، فَبَنَى طَارِقٌ قَلْعَةً كَبِيرَةً مِنَ الرِّمَالِ.',
    words: [
      { word: 'سَافَرَتِ', isNoun: false },
      { word: 'الْأُسْرَةُ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'إِلَى', isNoun: false },
      { word: 'شَاطِئِ', isNoun: true, category: 'اسْمُ مَكَانٍ' },
      { word: 'الْبَحْرِ', isNoun: true, category: 'اسْمُ مَكَانٍ' },
      { word: 'فَبَنَى', isNoun: false },
      { word: 'طَارِقٌ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'قَلْعَةً', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'كَبِيرَةً', isNoun: true, category: 'اسْمُ صِفَةٍ' },
      { word: 'مِنَ', isNoun: false },
      { word: 'الرِّمَالِ', isNoun: true, category: 'اسْمُ جَمَادٍ' }
    ]
  },
  {
    id: 's6',
    title: 'عَصِيرُ الْفَوَاكِهِ فِي الْمَطْبَخِ',
    themeColor: 'bg-orange-50 border-orange-300 text-orange-900',
    sceneImage: '🍊🍌🥤',
    fullSentence: 'قَطَّعَتِ الْأُمُّ الْبُرْتُقَالَ وَالْمَوْزَ فِي الْمَطْبَخِ، وَسَكَبَتِ الْعَصِيرَ فِي كُوبٍ نَظِيفٍ.',
    words: [
      { word: 'قَطَّعَتِ', isNoun: false },
      { word: 'الْأُمُّ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'الْبُرْتُقَالَ', isNoun: true, category: 'اسْمُ نَبَاتٍ' },
      { word: 'وَالْمَوْزَ', isNoun: true, category: 'اسْمُ نَبَاتٍ' },
      { word: 'فِي', isNoun: false },
      { word: 'الْمَطْبَخِ', isNoun: true, category: 'اسْمُ مَكَانٍ' },
      { word: 'وَسَكَبَتِ', isNoun: false },
      { word: 'الْعَصِيرَ', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'فِي', isNoun: false },
      { word: 'كُوبٍ', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'نَظِيفٍ', isNoun: true, category: 'اسْمُ صِفَةٍ' }
    ]
  },
  {
    id: 's7',
    title: 'عِيَادَةُ طَبِيبِ الْأَسْنَانِ',
    themeColor: 'bg-teal-50 border-teal-300 text-teal-900',
    sceneImage: '🦷👨‍⚕️🪥',
    fullSentence: 'فَحَصَ الطَّبِيبُ أَسْنَانَ أَحْمَدَ فِي الْعِيَادَةِ، وَأَعْطَاهُ فُرْشَاةً وَمَعْجُوناً هَدِيَّةً.',
    words: [
      { word: 'فَحَصَ', isNoun: false },
      { word: 'الطَّبِيبُ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'أَسْنَانَ', isNoun: true, category: 'اسْمُ إِنْسَانٍ (جِسْمٌ)' },
      { word: 'أَحْمَدَ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'فِي', isNoun: false },
      { word: 'الْعِيَادَةِ', isNoun: true, category: 'اسْمُ مَكَانٍ' },
      { word: 'وَأَعْطَاهُ', isNoun: false },
      { word: 'فُرْشَاةً', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'وَمَعْجُوناً', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'هَدِيَّةً', isNoun: true, category: 'اسْمُ جَمَادٍ' }
    ]
  },
  {
    id: 's8',
    title: 'صَبَاحُ يَوْمِ الْعِيدِ',
    themeColor: 'bg-purple-50 border-purple-300 text-purple-900',
    sceneImage: '🎈🕌🍬',
    fullSentence: 'ارْتَدَى زَيْدٌ ثَوْباً جَدِيداً، وَذَهَبَ مَعَ وَالِدِهِ إِلَى الْمَسْجِدِ الْكَبِيرِ.',
    words: [
      { word: 'ارْتَدَى', isNoun: false },
      { word: 'زَيْدٌ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'ثَوْباً', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'جَدِيداً', isNoun: true, category: 'اسْمُ صِفَةٍ' },
      { word: 'وَذَهَبَ', isNoun: false },
      { word: 'مَعَ', isNoun: false },
      { word: 'وَالِدِهِ', isNoun: true, category: 'اسْمُ إِنْسَانٍ' },
      { word: 'إِلَى', isNoun: false },
      { word: 'الْمَسْجِدِ', isNoun: true, category: 'اسْمُ مَكَانٍ' },
      { word: 'الْكَبِيرِ', isNoun: true, category: 'اسْمُ صِفَةٍ' }
    ]
  },
  {
    id: 's9',
    title: 'الْقِطُّ الصَّغِيرُ مِشْمِش',
    themeColor: 'bg-yellow-50 border-yellow-300 text-yellow-900',
    sceneImage: '🐱🥛🧶',
    fullSentence: 'شَرِبَ الْقِطُّ الصَّغِيرُ حَلِيباً فِي الصَّحْنِ، ثُمَّ نَامَ فَوْقَ السَّرِيرِ الدَّافِئِ.',
    words: [
      { word: 'شَرِبَ', isNoun: false },
      { word: 'الْقِطُّ', isNoun: true, category: 'اسْمُ حَيَوَانٍ' },
      { word: 'الصَّغِيرُ', isNoun: true, category: 'اسْمُ صِفَةٍ' },
      { word: 'حَلِيباً', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'فِي', isNoun: false },
      { word: 'الصَّحْنِ', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'ثُمَّ', isNoun: false },
      { word: 'نَامَ', isNoun: false },
      { word: 'فَوْقَ', isNoun: false },
      { word: 'السَّرِيرِ', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'الدَّافِئِ', isNoun: true, category: 'اسْمُ صِفَةٍ' }
    ]
  },
  {
    id: 's10',
    title: 'بُسْتَانُ الْأَزْهَارِ وَالنَّحْلَةِ',
    themeColor: 'bg-rose-50 border-rose-300 text-rose-900',
    sceneImage: '🦋🌺🐝',
    fullSentence: 'طَارَتِ النَّحْلَةُ فَوْقَ الزَّهْرَةِ الْحَمْرَاءِ، وَجَمَعَتِ الْعَسَلَ فِي الْخَلِيَّةِ.',
    words: [
      { word: 'طَارَتِ', isNoun: false },
      { word: 'النَّحْلَةُ', isNoun: true, category: 'اسْمُ حَيَوَانٍ' },
      { word: 'فَوْقَ', isNoun: false },
      { word: 'الزَّهْرَةِ', isNoun: true, category: 'اسْمُ نَبَاتٍ' },
      { word: 'الْحَمْرَاءِ', isNoun: true, category: 'اسْمُ صِفَةٍ' },
      { word: 'وَجَمَعَتِ', isNoun: false },
      { word: 'الْعَسَلَ', isNoun: true, category: 'اسْمُ جَمَادٍ' },
      { word: 'فِي', isNoun: false },
      { word: 'الْخَلِيَّةِ', isNoun: true, category: 'اسْمُ مَكَانٍ' }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'كَلِمَةُ (أَسَدٌ) تَدُلُّ عَلَى اسْمِ:',
    hint: 'فَكِّرْ فِي مَلِكِ الْغَابَةِ الشُّجَاعِ!',
    options: [
      { id: '1', text: 'حَيَوَانٍ', isCorrect: true, explanation: 'صَحِيحٌ! الْأَسَدُ حَيَوَانٌ قَوِيٌّ.' },
      { id: '2', text: 'نَبَاتٍ', isCorrect: false, explanation: 'لَا، الْأَسَدُ لَيْسَ نَبَاتاً يَنْبُتُ فِي الْأَرْضِ!' },
      { id: '3', text: 'جَمَادٍ', isCorrect: false, explanation: 'الْأَسَدُ كَائِنٌ حَيٌّ يَتَحَرَّكُ وَيَتَنَفَّسُ.' }
    ]
  },
  {
    id: 'q2',
    question: 'أَيٌّ مِنَ الْكَلِمَاتِ التَّالِيَةِ اسْمُ جَمَادٍ؟',
    hint: 'شَيْءٌ لَا يَتَحَرَّكُ وَلَا يَتَنَفَّسُ نَسْتَخْدِمُهُ فِي الدِّرَاسَةِ.',
    options: [
      { id: '1', text: 'قَلَمٌ', isCorrect: true, explanation: 'أَحْسَنْتَ! الْقَلَمُ جَمَادٌ نَكْتُبُ بِهِ.' },
      { id: '2', text: 'أَرْنَبٌ', isCorrect: false, explanation: 'الْأَرْنَبُ اسْمُ حَيَوَانٍ لَطِيفٍ.' },
      { id: '3', text: 'مُعَلِّمٌ', isCorrect: false, explanation: 'الْمُعَلِّمُ اسْمُ إِنْسَانٍ يُرْشِدُنَا.' }
    ]
  },
  {
    id: 'q3',
    question: 'مَا هِيَ عَلَامَةُ الِاسْمِ فِي كَلِمَةِ (شَجَرَةٌ)؟',
    hint: 'انْظُرْ إِلَى الْحَرْفِ الْأَخِيرِ وَالْحَرَكَةِ فَوْقَهُ!',
    options: [
      { id: '1', text: 'التَّاءُ الْمَرْبُوطَةُ وَالتَّنْوِينُ', isCorrect: true, explanation: 'مُمْتَازٌ! فِيهَا تَاءٌ مَرْبُوطَةٌ (ـة) وَتَنْوِينُ ضَمٍّ (ـٌ).' },
      { id: '2', text: 'الْـ التَّعْرِيفِ فَقَطْ', isCorrect: false, explanation: 'لَيْسَ فِيهَا (الْـ) فِي الْبِدَايَةِ.' },
      { id: '3', text: 'حَرْفُ الْجَرِّ', isCorrect: false, explanation: 'لَمْ يَسْبِقْهَا حَرْفُ جَرٍّ.' }
    ]
  },
  {
    id: 'q4',
    question: 'كَلِمَةُ (مَسْجِدٌ) تَدُلُّ عَلَى اسْمِ:',
    hint: 'الْمَكَانُ الَّذِي نُؤَدِّي فِيهِ الصَّلَاةَ.',
    options: [
      { id: '1', text: 'مَكَانٍ', isCorrect: true, explanation: 'بَارَكَ اللَّهُ فِيكَ! الْمَسْجِدُ بَيْتُ اللَّهِ وَهُوَ اسْمُ مَكَانٍ.' },
      { id: '2', text: 'إِنْسَانٍ', isCorrect: false, explanation: 'الْمَسْجِدُ مَكَانٌ وَلَيْسَ شَخْصاً.' },
      { id: '3', text: 'نَبَاتٍ', isCorrect: false, explanation: 'الْمَسْجِدُ بِنَاءٌ كَبِيرٌ وَلَيْسَ زَهْرَةً أَوْ نَبْتَةً.' }
    ]
  },
  {
    id: 'q5',
    question: 'كَيْفَ نُدْخِلُ (الْـ) التَّعْرِيفَ عَلَى كَلِمَةِ (وَرْدَةٌ)؟',
    hint: 'عِنْدَ دُخُولِ (الْـ) يَهْرُبُ التَّنْوِينُ وَتَبْقَى ضَمَّةٌ وَاحِدَةٌ!',
    options: [
      { id: '1', text: 'الْوَرْدَةُ', isCorrect: true, explanation: 'عَبْقَرِيٌّ! عِنْدَ دُخُولِ (الْـ) نَسْتَبْدِلُ التَّنْوِينَ بِالضَّمَّةِ.' },
      { id: '2', text: 'الْوَرْدَةٌ (بِالتَّنْوِينِ)', isCorrect: false, explanation: 'انْتَبِهْ: (الْـ) وَالتَّنْوِينُ لَا يَجْتَمِعَانِ أَبَداً فِي كَلِمَةٍ وَاحِدَةٍ!' },
      { id: '3', text: 'وَرْدَةُ', isCorrect: false, explanation: 'هَذِهِ لَمْ يَدْخُلْ عَلَيْهَا (الْـ).' }
    ]
  },
  {
    id: 'q6',
    question: 'أَيُّ الْكَلِمَاتِ التَّالِيَةِ لَيْسَتِ اسْماً؟',
    hint: 'ابْحَثْ عَنِ الْفِعْلِ الَّذِي يَدُلُّ عَلَى حَرَكَةٍ وَعَمَلٍ!',
    options: [
      { id: '1', text: 'يَلْعَبُ', isCorrect: true, explanation: 'صَحِيحٌ! (يَلْعَبُ) فِعْلٌ مُضَارِعٌ يَدُلُّ عَلَى عَمَلٍ فِي الْوَقْتِ الْحَاضِرِ.' },
      { id: '2', text: 'كُرَةٌ', isCorrect: false, explanation: 'الْكُرَةُ اسْمُ جَمَادٍ يَنْتَهِي بِتَاءٍ مَرْبُوطَةٍ.' },
      { id: '3', text: 'مَلْعَبٌ', isCorrect: false, explanation: 'الْمَلْعَبُ اسْمُ مَكَانٍ.' }
    ]
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b1',
    title: 'مُسْتَكْشِفُ الْأَسْمَاءِ',
    description: 'تَعَرَّفْتَ عَلَى مَفْهُومِ الِاسْمِ وَأَنْوَاعِهِ الْأُولَى.',
    icon: '🌱',
    unlocked: true,
    requiredStars: 1
  },
  {
    id: 'b2',
    title: 'بَطَلُ التَّصْنِيفِ',
    description: 'صَنَّفْتَ الْأَسْمَاءَ فِي سِلَالِهَا الصَّحِيحَةِ بِإِتْقَانٍ.',
    icon: '🧺',
    unlocked: false,
    requiredStars: 15
  },
  {
    id: 'b3',
    title: 'كَاشِفُ الْعَلَامَاتِ السِّحْرِيَّةِ',
    description: 'عَرَفْتَ الْـ التَّعْرِيفِ، وَالتَّنْوِينَ، وَالتَّاءَ الْمَرْبُوطَةَ.',
    icon: '✨',
    unlocked: false,
    requiredStars: 30
  },
  {
    id: 'b4',
    title: 'صَيَّادُ الْأَسْمَاءِ الْمَاهِرُ',
    description: 'مَيَّزْتَ بَيْنَ الِاسْمِ وَالْفِعْلِ وَالْحَرْفِ بِلَا خَطَأٍ.',
    icon: '🎯',
    unlocked: false,
    requiredStars: 50
  },
  {
    id: 'b5',
    title: 'فَارِسُ اللُّغَةِ الْعَرَبِيَّةِ',
    description: 'أَتْمَمْتَ الِاخْتِبَارَاتِ وَجَمَعْتَ كُلَّ النُّجُومِ وَاسْتَحْقَقْتَ الشَّهَادَةَ!',
    icon: '👑',
    unlocked: false,
    requiredStars: 80
  }
];

export const STICKER_GIFTS: StickerGift[] = [
  { id: 'g1', name: 'قِطَّةٌ ذَكِيَّةٌ', emoji: '🐱', unlocked: true, costStars: 0, unlockedMessage: 'مَرْحَباً! أَنَا قِطَّةٌ تُحِبُّ الْأَسْمَاءَ!' },
  { id: 'g2', name: 'شَجَرَةٌ ذَهَبِيَّةٌ', emoji: '🌳', unlocked: false, costStars: 10, unlockedMessage: 'شَجَرَةُ الْمَعْرِفَةِ أَزْهَرَتْ لَكَ!' },
  { id: 'g3', name: 'تَاجُ التَّفَوُّقِ', emoji: '👑', unlocked: false, costStars: 25, unlockedMessage: 'أَنْتَ مَلِكُ قَوَاعِدِ الْإِعْرَابِ وَالْأَسْمَاءِ!' },
  { id: 'g4', name: 'صَارُوخُ الذَّكَاءِ', emoji: '🚀', unlocked: false, costStars: 45, unlockedMessage: 'انْطَلَقْتَ نَحْوَ قِمَّةِ النَّجَاحِ!' },
  { id: 'g5', name: 'أَسَدُ الْفَصَاحَةِ', emoji: '🦁', unlocked: false, costStars: 70, unlockedMessage: 'شُجَاعٌ كَالْأَسَدِ فِي لُغَةِ الضَّادِ!' },
  { id: 'g6', name: 'مَارِدُ الْعَلَامَاتِ', emoji: '🧞‍♂️', unlocked: false, costStars: 90, unlockedMessage: 'تَحَقَّقَتْ أُمْنِيَتُكَ وَأَصْبَحْتَ الْأَوَّلَ!' }
];
