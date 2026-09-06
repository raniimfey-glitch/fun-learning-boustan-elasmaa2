/**
 * Audio synthesis & Web Speech API helper for 2nd Grade Arabic Educational App
 * Works 100% offline using standard Web Audio API and Web Speech API
 */

class SoundSystem {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private speechVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.initVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoices();
      };
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize high-quality Arabic voices
    const arVoice = voices.find(v => v.lang.startsWith('ar') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Maged') || v.name.includes('Tarik') || v.name.includes('Laila') || v.name.includes('Salma') || v.name.includes('Zayd'))) 
      || voices.find(v => v.lang.startsWith('ar'));
    if (arVoice) {
      this.speechVoice = arVoice;
    }
  }

  private getAudioContext(): AudioContext | null {
    if (!this.soundEnabled) return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public toggleSound(enabled?: boolean) {
    this.soundEnabled = enabled !== undefined ? enabled : !this.soundEnabled;
    return this.soundEnabled;
  }

  public isSoundEnabled() {
    return this.soundEnabled;
  }

  /**
   * Cheerful success chime for correct answers
   */
  public playCorrect() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major arpeggio)
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      
      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, now + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.4);
    });
  }

  /**
   * Fanfare sound for badge unlock or quiz completion
   */
  public playCelebration() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const melody = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.5, d: 0.35 }, // C6
      { f: 880.00, d: 0.15 }, // A5
      { f: 1046.5, d: 0.50 }  // C6
    ];

    let offset = 0;
    melody.forEach(({ f, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + offset);

      gain.gain.setValueAtTime(0, now + offset);
      gain.gain.linearRampToValueAtTime(0.3, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + d);
      offset += d * 0.85;
    });
  }

  /**
   * Gentle pop sound for clicking tabs and items
   */
  public playPop() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  /**
   * Star earned sparkle sound
   */
  public playStar() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [880, 1174.66, 1318.51, 1760]; // A5, D6, E6, A6

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.2, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.28);
    });
  }

  /**
   * Gentle friendly bounce for try again (non-harsh, encouraging)
   */
  public playTryAgain() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(329.63, now); // E4
    osc.frequency.linearRampToValueAtTime(261.63, now + 0.2); // C4

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  /**
   * Enhanced Arabic phonetic preprocessor specially crafted for 2nd Grade Tanween & Grammar pronunciation.
   * Transforms written Tanween and isolated grammar symbols into explicit, phonetically clear utterances
   * that TTS engines pronounce with 100% audible Nunation (نُونُ التَّنْوِينِ السَّاكِنَةِ) without dropping it at pauses.
   */
  public prepareArabicForSpeech(rawText: string): string {
    if (!rawText) return '';

    let text = rawText;

    // 1. Convert isolated grammar notation & symbols to friendly spoken words
    text = text
      .replace(/أَسَدٌ?\s*[:،,-]?\s*(?:حَيَوَانٌ?|حَيَوَانٍ?)/g, 'أَسَدٌ: اسْمُ حَيَوَانٍ')
      .replace(/اسد\s*[:،,-]?\s*حيوان/g, 'أَسَدٌ: اسْمُ حَيَوَانٍ')
      .replace(/\(\s*الْـ\s*\)/g, 'أَلْ التَّعْرِيفِ')
      .replace(/الْـ\s*التَّعْرِيف/g, 'أَلْ التَّعْرِيفِ')
      .replace(/الْـ/g, 'أَلْ ')
      .replace(/\(\s*ـة\s*\/\s*ة\s*\)/g, 'التَّاءُ الْمَرْبُوطَةُ')
      .replace(/\(\s*ـة\s*\)/g, 'التَّاءُ الْمَرْبُوطَةُ')
      .replace(/\(\s*[\u064C\u064B\u064D\s،,]+\)/g, 'تَنْوِينُ الضَّمِّ وَالْفَتْحِ وَالْكَسْرِ')
      .replace(/\(\s*[\u0640ـ]*\u064C\s*\)/g, 'تَنْوِينُ الضَّمِّ، أُنْ')
      .replace(/\(\s*[\u0640ـ]*\u064B\s*\)/g, 'تَنْوِينُ الْفَتْحِ، أَنْ')
      .replace(/\(\s*[\u0640ـ]*\u064D\s*\)/g, 'تَنْوِينُ الْكَسْرِ، إِنْ')
      .replace(/ـٌ\s*ـً\s*ـٍ/g, 'تَنْوِينُ الضَّمِّ، وَتَنْوِينُ الْفَتْحِ، وَتَنْوِينُ الْكَسْرِ')
      .replace(/⬅️|->|←/g, '، يُصْبِحُ: ');

    // 2. Ta Marbuta with Tanween Damm (ـَةٌ / ةٌ / ـَّةٌ -> ـتُنْ)
    text = text.replace(/([^\s\u064B-\u0652])\u0651[\u0629ـ]*\u0629\u064C/g, '$1َّتُّنْ');
    text = text.replace(/[\u0640]*\u0629\u064C/g, 'تُنْ');

    // 3. Ta Marbuta with Tanween Fath (ـَةً / ةً / ـَّةً -> ـتَنْ)
    text = text.replace(/([^\s\u064B-\u0652])\u0651[\u0629ـ]*\u0629\u064B/g, '$1َّتَّنْ');
    text = text.replace(/[\u0640]*\u0629\u064B/g, 'تَنْ');

    // 4. Ta Marbuta with Tanween Kasr (ـَةٍ / ةٍ / ـَّةٍ -> ـتِنْ)
    text = text.replace(/([^\s\u064B-\u0652])\u0651[\u0629ـ]*\u0629\u064D/g, '$1َّتِّنْ');
    text = text.replace(/[\u0640]*\u0629\u064D/g, 'تِنْ');

    // 5. Ta Marbuta with single Harakah at end of words in educational sentences (ةُ -> تُ, ةَ -> تَ, ةِ -> تِ)
    text = text.replace(/[\u0640]*\u0629\u064F/g, 'تُ');
    text = text.replace(/[\u0640]*\u0629\u064E/g, 'تَ');
    text = text.replace(/[\u0640]*\u0629\u0650/g, 'تِ');

    // 6. Regular Letters with Shaddah + Tanween Damm (ـٌّ -> ـُّـنْ)
    text = text.replace(/([^\s\u064B-\u0652\u0629])\u0651\u064C/g, '$1ُّـنْ');

    // 7. Regular Letters with Tanween Damm (ـٌ -> ـُنْ)
    text = text.replace(/([^\s\u064B-\u0652\u0629])\u064C/g, '$1ُنْ');

    // 8. Regular Letters with Shaddah + Tanween Fath (ـّاً / ـًّا -> ـَّـنْ)
    text = text.replace(/([^\s\u064B-\u0652\u0629])\u0651\u064B\u0627/g, '$1َّـنْ');
    text = text.replace(/([^\s\u064B-\u0652\u0629])\u0651\u0627\u064B/g, '$1َّـنْ');

    // 9. Regular Letters with Tanween Fath and Alif (ـَـنْ)
    text = text.replace(/([^\s\u064B-\u0652\u0629])\u064B\u0627/g, '$1َنْ');
    text = text.replace(/([^\s\u064B-\u0652\u0629])\u0627\u064B/g, '$1َنْ');

    // 10. Hamza with Tanween Fath (ماءً / سماءً -> ماءَنْ)
    text = text.replace(/([ءأإؤئ])\u064B/g, '$1َنْ');

    // 11. Any remaining Tanween Fath on regular letter without Alif
    text = text.replace(/([^\s\u064B-\u0652\u0629])\u064B/g, '$1َنْ');

    // 12. Regular Letters with Shaddah + Tanween Kasr (ـٍّ -> ـِّـنْ)
    text = text.replace(/([^\s\u064B-\u0652\u0629])\u0651\u064D/g, '$1ِّـنْ');

    // 13. Regular Letters with Tanween Kasr (ـٍ -> ـِنْ)
    text = text.replace(/([^\s\u064B-\u0652\u0629])\u064D/g, '$1ِنْ');

    // Remove any leftover non-pronounceable markdown artifacts or emoji blocks
    text = text.replace(/[*#_~`«»]/g, ' ');

    return text.trim();
  }

  /**
   * Pronounce Arabic text clearly with correct speed & crystal clear Tanween for 2nd graders
   */
  public speakArabic(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel any previous speech to avoid overlapping
    window.speechSynthesis.cancel();

    const cleanText = text.trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    // Apply Tanween and grammar phonetic enhancement
    const speechText = this.prepareArabicForSpeech(cleanText);

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.84; // Measured, crystal clear educational tempo for kids
    utterance.pitch = 1.08; // Friendly, upbeat teacher tone

    // Re-verify voice selection in case voices became available
    if (!this.speechVoice) {
      this.initVoices();
    }
    if (this.speechVoice) {
      utterance.voice = this.speechVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Speak a random encouraging sentence when a kid succeeds
   */
  public cheerKid() {
    const cheers = [
      'أَحْسَنْتَ يَا بَطَل!',
      'مُمْتَازٌ جِدّاً! إِجَابَةٌ رَائِعَةٌ!',
      'بَارَكَ اللَّهُ فِيكَ يَا ذَكِيّ!',
      'عَاشَ بَطَلُ اللُّغَةِ الْعَرَبِيَّةِ!',
      'أَنْتَ عَبْقَرِيٌّ يَا صَغِيرِي!',
      'إِجَابَةٌ صَحِيحَةٌ وَمُبْهِرَةٌ!'
    ];
    const cheer = cheers[Math.floor(Math.random() * cheers.length)];
    this.playCorrect();
    setTimeout(() => {
      this.speakArabic(cheer);
    }, 400);
  }
}

export const soundManager = new SoundSystem();
