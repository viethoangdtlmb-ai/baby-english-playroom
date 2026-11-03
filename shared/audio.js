/**
 * Universal Toddler Web Audio & Motherese Speech Engine
 * Zero external dependencies, pure browser synthesizer + Speech API
 * Single Source of Truth for all 16 mini-games
 */
var ToddlerAudio = window.ToddlerAudio || {
  ctx: null,
  bgmGain: null,
  bgmTimer: null,
  bgmStep: 0,
  bgmEnabled: true,
  bgmTargetVolume: 0.48, // Joyful, audible preschool toy band volume
  bestVoice: null,
  voicesInitialized: false,

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    try {
      const savedVol = localStorage.getItem('baby_playroom_bgm_vol');
      if (savedVol !== null) {
        this.bgmTargetVolume = Math.max(0, Math.min(1, parseFloat(savedVol)));
      }
    } catch (e) {}
    this.initVoices();
    return this.ctx;
  },

  bgmAudioEl: null,
  currentTrackName: 'hub',
  _duckTimer: null,

  TRACKS: ['hub', 'sunshine', 'action', 'caring', 'puzzle', 'nap'],
  TRACK_NAMES: {
    hub: "March Theme",
    sunshine: "Happy Tune",
    action: "Happy Adventure",
    caring: "Wintery Loop",
    puzzle: "Crystal Cave",
    nap: "Gentle Nap"
  },

  setBgmVolume(val) {
    let num = parseFloat(val);
    if (isNaN(num)) num = 0.45;
    num = Math.max(0, Math.min(1, num));
    this.bgmTargetVolume = num;
    try {
      localStorage.setItem('baby_playroom_bgm_vol', num.toString());
    } catch (e) {}
    if (this.bgmAudioEl) {
      this.bgmAudioEl.volume = this.bgmEnabled ? num : 0;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('toddler-bgm-volume-change', {
        detail: { volume: num }
      }));
    }
    return num;
  },

  getBgmVolume() {
    return this.bgmTargetVolume;
  },

  nextTrack() {
    const list = this.TRACKS;
    const curIdx = list.indexOf(this.currentTrackName);
    const nextIdx = (curIdx + 1) % list.length;
    const nextName = list[nextIdx];
    this.playTrack(nextName);
    return nextName;
  },

  getTrackUrl(trackName) {
    // Dynamic path resolution: mini-game folders (e.g. /01_balloon_pop/, /18_bubble_bath/) require '../'
    let prefix = '';
    if (typeof window !== 'undefined' && window.location && window.location.pathname) {
      const p = window.location.pathname.replace(/\\/g, '/');
      if (/\/(0[1-9]|1[0-8])_[a-z0-9_]+\//i.test(p) || p.includes('/13_weekend_test/')) {
        prefix = '../';
      }
    }
    const map = {
      hub: prefix + 'assets/audio/bgm/bgm_playroom_hub.mp3',
      action: prefix + 'assets/audio/bgm/bgm_game_action.mp3',
      caring: prefix + 'assets/audio/bgm/bgm_game_caring.mp3',
      sunshine: prefix + 'assets/audio/bgm/bgm_happy_sunshine.mp3',
      puzzle: prefix + 'assets/audio/bgm/bgm_puzzle_play.mp3',
      nap: prefix + 'assets/audio/bgm/bgm_gentle_nap.mp3'
    };
    return map[trackName] || map.hub;
  },

  playTrack(trackName = 'hub') {
    this.currentTrackName = trackName;
    if (!this.bgmEnabled) return;
    this.init();

    const url = this.getTrackUrl(trackName);

    if (!this.bgmAudioEl && typeof Audio !== 'undefined') {
      try {
        this.bgmAudioEl = new Audio();
        this.bgmAudioEl.loop = true;
        this.bgmAudioEl.volume = this.bgmTargetVolume;
      } catch (err) {
        console.log('🌸 [ToddlerAudio] Audio element init:', err);
      }
    }

    if (this.bgmAudioEl) {
      if (!this.bgmAudioEl.src || !this.bgmAudioEl.src.includes(url.replace('../', ''))) {
        this.bgmAudioEl.src = url;
      }
      this.bgmAudioEl.volume = this.bgmTargetVolume;
      const p = this.bgmAudioEl.play();
      if (p !== undefined) {
        p.catch(() => {
          // Trình duyệt chặn autoplay khi chưa có tương tác -> chờ tương tác đầu tiên, không phát bất kỳ tiếng bíp nào
          console.log('🌸 [ToddlerAudio] Chờ tương tác chạm màn hình để phát nhạc MP3...');
        });
      }
    }

    this.notifyBgmChange();
  },

  startBGM(trackName = 'hub') {
    this.bgmEnabled = true;
    try {
      localStorage.setItem('baby_playroom_bgm', 'true');
    } catch (e) {}
    this.playTrack(trackName || this.currentTrackName || 'hub');
    this.notifyBgmChange();
  },

  stopBGM() {
    if (this.bgmAudioEl) {
      try { this.bgmAudioEl.pause(); } catch (e) {}
    }
    this.notifyBgmChange();
  },

  toggleBGM() {
    this.bgmEnabled = !this.bgmEnabled;
    try {
      localStorage.setItem('baby_playroom_bgm', this.bgmEnabled ? 'true' : 'false');
    } catch (e) {}
    if (this.bgmEnabled) {
      this.startBGM(this.currentTrackName || 'hub');
    } else {
      this.stopBGM();
    }
    return this.bgmEnabled;
  },

  duckBGM(isDucked) {
    const target = isDucked ? 0.08 : (this.bgmEnabled ? this.bgmTargetVolume : 0.0001);
    if (this._duckTimer) {
      clearInterval(this._duckTimer);
      this._duckTimer = null;
    }
    if (this.bgmAudioEl) {
      try {
        const start = this.bgmAudioEl.volume;
        const diff = target - start;
        let step = 0;
        const steps = 8;
        this._duckTimer = setInterval(() => {
          step++;
          this.bgmAudioEl.volume = Math.max(0, Math.min(1, start + (diff * (step / steps))));
          if (step >= steps) {
            clearInterval(this._duckTimer);
            this._duckTimer = null;
          }
        }, 15);
      } catch (e) {
        try { this.bgmAudioEl.volume = target; } catch (err) {}
      }
    }
  },

  notifyBgmChange() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('toddler-bgm-change', {
        detail: { enabled: this.bgmEnabled }
      }));
    }
  },

  // -----------------------------------------------------------------
  // SFX ENGINE (Chimes, Crunches, Pops, Horns)
  // -----------------------------------------------------------------
  playTone(freq, type = 'sine', duration = 0.2, gainVal = 0.3) {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration + 0.01);
  },

  playChime() {
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const st = this.ctx.currentTime + idx * 0.07;
      gain.gain.setValueAtTime(0.3, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.36);
    });
  },

  playXylophone(freq) {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 3, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    gain2.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(this.ctx.destination);
    gain2.connect(this.ctx.destination);

    osc.start();
    osc2.start();
    osc.stop(this.ctx.currentTime + 0.65);
    osc2.stop(this.ctx.currentTime + 0.22);
  },

  playPop(freq = 450) {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(freq, st);
    osc.frequency.exponentialRampToValueAtTime(80, st + 0.08);

    gain.gain.setValueAtTime(0.5, st);
    gain.gain.exponentialRampToValueAtTime(0.01, st + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 0.09);
  },

  playFanfare() {
    this.init();
    if (!this.ctx) return;
    const freqs = [392, 523.25, 659.25, 783.99, 1046.50, 1318.51];
    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = f;
      const st = this.ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0.35, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.47);
    });
  },

  playWin() {
    this.playFanfare();
  },

  playThud(pitch = 180) {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(pitch, st);
    osc.frequency.exponentialRampToValueAtTime(45, st + 0.12);

    gain.gain.setValueAtTime(0.55, st);
    gain.gain.exponentialRampToValueAtTime(0.01, st + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 0.13);
  },

  playCrash() {
    this.init();
    if (!this.ctx) return;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        const st = this.ctx.currentTime;
        osc.frequency.setValueAtTime(160 - i * 20, st);
        osc.frequency.exponentialRampToValueAtTime(30, st + 0.3);

        gain.gain.setValueAtTime(0.4, st);
        gain.gain.exponentialRampToValueAtTime(0.01, st + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(st);
        osc.stop(st + 0.32);
      }, i * 50);
    }
  },

  playVroom() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(65, st);
    osc.frequency.linearRampToValueAtTime(110, st + 0.08);

    gain.gain.setValueAtTime(0.2, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 0.11);
  },

  playHorn() {
    this.init();
    if (!this.ctx) return;
    [440, 554.37].forEach(f => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = f;
      const st = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.3, st);
      gain.gain.exponentialRampToValueAtTime(0.01, st + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.26);
    });
  },

  playSqueak() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(850, st);
    osc.frequency.exponentialRampToValueAtTime(1400, st + 0.12);
    gain.gain.setValueAtTime(0.35, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 0.13);
  },

  playSplash() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(300 + Math.random() * 200, st);
    osc.frequency.exponentialRampToValueAtTime(600, st + 0.15);
    gain.gain.setValueAtTime(0.25, st);
    gain.gain.exponentialRampToValueAtTime(0.001, st + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 0.16);
  },

  playSplat() {
    this.playPop(340);
  },

  playEat() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(350, st);
    osc.frequency.linearRampToValueAtTime(150, st + 0.12);
    gain.gain.setValueAtTime(0.4, st);
    gain.gain.exponentialRampToValueAtTime(0.01, st + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 0.13);
  },

  playCrunch() {
    this.playEat();
  },

  playChomp() {
    this.playEat();
  },

  playPlop() {
    this.playPop(480);
  },

  playGulp() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(150, st);
    osc.frequency.exponentialRampToValueAtTime(320, st + 0.12);
    gain.gain.setValueAtTime(0.4, st);
    gain.gain.exponentialRampToValueAtTime(0.01, st + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 0.13);
  },

  playKnock() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(140, st);
    osc.frequency.exponentialRampToValueAtTime(40, st + 0.08);
    gain.gain.setValueAtTime(0.45, st);
    gain.gain.exponentialRampToValueAtTime(0.01, st + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 0.09);
  },

  playBoing() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const st = this.ctx.currentTime;
    osc.frequency.setValueAtTime(180, st);
    osc.frequency.exponentialRampToValueAtTime(620, st + 0.28);
    gain.gain.setValueAtTime(0.35, st);
    gain.gain.exponentialRampToValueAtTime(0.01, st + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(st);
    osc.stop(st + 0.31);
  },

  playCheer() {
    this.playChime();
  },

  playSuccess() {
    this.playWin();
  },

  // -----------------------------------------------------------------
  // MOTHERESE FEMALE TEACHER SPEECH ENGINE (Strict Zira Lock & Async Guard)
  // -----------------------------------------------------------------
  maleKeywords: [
    'male', 'david', 'guy', 'christopher', 'eric', 'davis', 'mark', 'george',
    'richard', 'james', 'john', 'brian', 'ryan', 'oliver', 'steffan', 'andrew',
    'paul', 'charles', 'dan', 'jack', 'tom', 'jason', 'jacob', 'benjamin',
    'william', 'henry', 'steven', 'stefan', 'connor', 'mitchell'
  ],

  femaleKeywords: [
    'zira', 'jenny', 'aria', 'google us english', 'samantha', 'victoria',
    'karen', 'serena', 'ava', 'michelle', 'ana', 'susan', 'allison', 'emma',
    'stephanie', 'catherine', 'heather', 'clara', 'sophia', 'female'
  ],

  isMaleVoice(voice) {
    if (!voice) return false;
    const name = (voice.name || '').toLowerCase();
    return this.maleKeywords.some(k => name.includes(k));
  },

  isFemaleVoice(voice) {
    if (!voice) return false;
    const name = (voice.name || '').toLowerCase();
    if (this.isMaleVoice(voice)) return false;
    return this.femaleKeywords.some(k => name.includes(k));
  },

  initVoices(force = false) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    if (!force && this.voicesInitialized && this.bestVoice) return this.bestVoice;

    const findVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return null;

      // Priority 1: Microsoft Zira (guaranteed built-in female voice on Windows 10/11)
      let chosen = voices.find(v => {
        const name = (v.name || '').toLowerCase();
        return name.includes('zira') && !ToddlerAudio.isMaleVoice(v);
      });

      // Priority 2: Edge / Windows Natural Online Female voices (Jenny, Aria, Michelle)
      if (!chosen) {
        chosen = voices.find(v => {
          const name = (v.name || '').toLowerCase();
          return (name.includes('jenny') || name.includes('aria') || name.includes('michelle') || name.includes('ava')) && !ToddlerAudio.isMaleVoice(v);
        });
      }

      // Priority 3: Google US English (Standard Chrome female voice) or Samantha / Victoria (Mac)
      if (!chosen) {
        chosen = voices.find(v => {
          const name = (v.name || '').toLowerCase();
          return (name.includes('google us english') || name.includes('samantha') || name.includes('victoria') || name.includes('karen')) && !ToddlerAudio.isMaleVoice(v);
        });
      }

      // Priority 4: Any en-US voice that passes isFemaleVoice
      if (!chosen) {
        chosen = voices.find(v => {
          const lang = (v.lang || '').toLowerCase();
          return (lang === 'en-us' || lang === 'en_us') && ToddlerAudio.isFemaleVoice(v);
        });
      }

      // Priority 5: Any voice matching femaleKeywords
      if (!chosen) {
        chosen = voices.find(v => ToddlerAudio.isFemaleVoice(v));
      }

      if (chosen) {
        ToddlerAudio.bestVoice = chosen;
        ToddlerAudio.voicesInitialized = true;
        console.log('🌸 [ToddlerAudio] Đã chọn thành công giọng Cô giáo:', chosen.name, `(${chosen.lang})`);
      }
      return chosen;
    };

    const immediate = findVoice();
    if (immediate) return immediate;

    // Use addEventListener so we never overwrite other handlers
    if (window.speechSynthesis.addEventListener) {
      window.speechSynthesis.addEventListener('voiceschanged', () => findVoice());
    } else if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      const prev = window.speechSynthesis.onvoiceschanged;
      window.speechSynthesis.onvoiceschanged = (e) => {
        findVoice();
        if (typeof prev === 'function') prev(e);
      };
    }
    return null;
  },

  ensureVoiceReady(callback) {
    if (this.bestVoice) {
      return callback(this.bestVoice);
    }
    const immediate = this.initVoices(true);
    if (immediate) {
      return callback(immediate);
    }

    // Fast polling every 40ms up to 2400ms to guarantee voices load in Chrome / Edge
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += 40;
      const v = this.initVoices(true);
      if (v || elapsed >= 2400) {
        clearInterval(interval);
        callback(v || this.bestVoice);
      }
    }, 40);
  },

  speakWord(word) {
    if (!word || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    this.ensureVoiceReady((voice) => {
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-US';
      if (voice) {
        u.voice = voice;
      }
      u.rate = 0.88; // Gentle, clear rhythm for toddler listening
      
      // Sweet, warm feminine pitch:
      // If voice is male (rare fallback), push pitch to 1.55 to make it sound like a cute high-pitched cartoon mascot!
      u.pitch = (voice && this.isMaleVoice(voice)) ? 1.55 : 1.15;

      // Duck BGM so speech is crystal clear
      this.duckBGM(true);
      u.onend = () => {
        this.duckBGM(false);
      };
      u.onerror = () => {
        this.duckBGM(false);
      };

      window.speechSynthesis.speak(u);
    });
  },

  speak(text) {
    this.speakWord(text);
  },

  speakSequence(wordsArray) {
    if (!wordsArray || !wordsArray.length || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    this.speakWord(wordsArray.join(', '));
  }
};

// Global backward-compatible aliases
window.ToddlerAudio = ToddlerAudio;
window.AudioEngine = ToddlerAudio;

// Global unlock on first user gesture (Safari, Chrome & Web Audio autoplay policies)
if (typeof window !== 'undefined') {
  try {
    const savedBgm = localStorage.getItem('baby_playroom_bgm');
    if (savedBgm === 'false') {
      ToddlerAudio.bgmEnabled = false;
    }
  } catch (e) {}

  const unlockAudio = () => {
    ToddlerAudio.init();
    ToddlerAudio.initVoices();
    if (ToddlerAudio.bgmEnabled) {
      ToddlerAudio.startBGM();
    }
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('click', unlockAudio);
  };
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
  window.addEventListener('click', unlockAudio, { passive: true });

  // Mobile Lifecycle Guard: Auto-pause BGM & TTS when phone locks or app goes to background
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (ToddlerAudio.bgmAudioEl && !ToddlerAudio.bgmAudioEl.paused) {
        try { ToddlerAudio.bgmAudioEl.pause(); } catch (e) {}
      }
      if (window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
    } else {
      if (ToddlerAudio.ctx && ToddlerAudio.ctx.state === 'suspended') {
        ToddlerAudio.ctx.resume().catch(() => {});
      }
      if (ToddlerAudio.bgmEnabled && ToddlerAudio.bgmAudioEl && ToddlerAudio.bgmAudioEl.paused) {
        ToddlerAudio.bgmAudioEl.play().catch(() => {});
      }
    }
  });

  window.addEventListener('pagehide', () => {
    if (ToddlerAudio.bgmAudioEl) {
      try { ToddlerAudio.bgmAudioEl.pause(); } catch (e) {}
    }
    if (window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  });
}

