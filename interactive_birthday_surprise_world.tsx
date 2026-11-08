import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Heart,
  Sparkles,
  Music,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Mail,
  Camera,
  Film,
  Gamepad2,
  Star,
  Gift,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  Upload,
  Settings,
  RotateCcw,
  Award,
  Flame,
  Coffee,
  Sun,
  Flower2,
  Eye,
  Lock,
  Unlock,
} from 'lucide-react';

// ============================================================================
// 1. TYPES & INTERFACES (PHASE 2 ARCHITECTURE)
// ============================================================================

export type ChapterId = 1 | 2 | 3 | 4 | 5 | 6;

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  caption: string;
  story: string;
  mediaType: 'image' | 'video';
  src: string;
  illustrationType: 'starlight' | 'foodie' | 'smile' | 'cinema' | 'sunset' | 'coffee';
  rotation: number;
  tapeColor: 'pink' | 'lavender' | 'butter' | 'mint';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    reactionMessage: string;
  }[];
}

export interface SpecialNote {
  id: string;
  category: string;
  frontTitle: string;
  backMessage: string;
  color: 'pink' | 'lavender' | 'butter' | 'mint';
  icon: 'heart' | 'star' | 'sparkles' | 'flower' | 'sun' | 'coffee';
}

export interface BirthdayConfig {
  herName: string;
  senderName: string;
  birthdayDate: string;
  music: {
    title: string;
    artist: string;
    src: string;
  };
  welcome: {
    badgeText: string;
    headline: string;
    subheadline: string;
    buttonText: string;
  };
  letter: {
    envelopeTitle: string;
    stampText: string;
    greeting: string;
    paragraphs: string[];
    signOff: string;
  };
  memories: MemoryItem[];
  miniGame: {
    quizTitle: string;
    questions: QuizQuestion[];
    heartTargetCount: number;
    rewardCouponTitle: string;
    rewardCouponCode: string;
    rewardCouponDesc: string;
  };
  specialThings: SpecialNote[];
  finalSurprise: {
    preOpenHint: string;
    mainHeadline: string;
    featuredMedia: {
      type: 'image' | 'video';
      src: string;
      caption: string;
    };
    emotionalMessage: string[];
    closingWish: string;
  };
}

// ============================================================================
// 2. CENTRALIZED CONFIGURATION (SINGLE SOURCE OF TRUTH - EASY TO EDIT)
// ============================================================================

export const initialBirthdayConfig: BirthdayConfig = {
  herName: 'Sayangku',
  senderName: 'Seseorang yang Selalu Bangga Padamu',
  birthdayDate: 'Hari Spesialmu ✨',

  music: {
    title: 'Happy Birthday Melody 🎵',
    artist: 'Our Special Song',
    src: '/assets/music/birthday-song.mp3',
  },

  welcome: {
    badgeText: 'Sebuah Dunia Kecil Untukmu 💌',
    headline: 'Hai, Ada Kejutan Kecil yang Menunggumu di Sini...',
    subheadline:
      'Sebelum dibuka, pastikan senyum manis kamu sudah siap dan nyalakan suaranya ya. Setiap halaman menyimpan cerita dan rahasia kecil tentang kita.',
    buttonText: 'Open Your Surprise ✨',
  },

  letter: {
    envelopeTitle: 'Ketuk segel hati untuk membuka suratmu',
    stampText: 'SPECIAL DELIVERY • 100% LOVE',
    greeting: 'Selamat Ulang Tahun, Perempuan Favoritku 🌷',
    paragraphs: [
      'Di hari spesialmu ini, aku tidak ingin sekadar mengirim pesan singkat yang lewat begitu saja di layar HP-mu. Aku ingin merangkai sebuah dunia kecil yang bisa kamu kunjungi kapan pun kamu ingin tahu betapa berharganya dirimu.',
      'Terima kasih sudah hadir dengan segala tawa, cerita random, perhatian-perhatian kecil, dan cara kamu membuat hari-hari biasa terasa jauh lebih hangat dan berwarna.',
      'Semoga di usia yang baru ini, setiap langkahmu selalu dimudahkan, setiap mimpi yang kamu simpan diam-diam satu per satu menemukan jalannya, dan semoga aku selalu bisa menjadi tempat ternyaman untukmu pulang.',
    ],
    signOff: 'Dengan penuh sayang,',
  },

  memories: [
    {
      id: 'mem-1',
      title: 'Awal Cerita Kita',
      date: 'Chapter Pertama',
      caption: 'Waktu kita masih malu-malu tapi nggak mau cepat pulang ✨',
      story:
        'Kalau diingat lagi, dari momen sederhana inilah semuanya dimulai. Rasanya waktu jalan cepat banget setiap kali ngobrol sama kamu, sampai lupa jam!',
      mediaType: 'image',
      src: '/assets/images/memories/awal-cerita.jpg',
      illustrationType: 'starlight',
      rotation: -2.5,
      tapeColor: 'pink',
    },
    {
      id: 'mem-2',
      title: 'Misi Kulineran & Jalan Sore',
      date: 'Hari Penuh Tawa',
      caption: 'Mencari makanan enak yang berakhir dengan obrolan panjang 🍜',
      story:
        'Bukan cuma makanannya yang bikin bahagia, tapi ekspresi senangmu waktu mencicipi menu favoritmu itu yang selalu jadi pemandangan favoritku.',
      mediaType: 'image',
      src: '/assets/images/memories/kulineran.jpg',
      illustrationType: 'foodie',
      rotation: 2,
      tapeColor: 'butter',
    },
    {
      id: 'mem-3',
      title: 'Senyum Terbaikmu',
      date: 'My Favorite View',
      caption: 'Satu dari sekian banyak momen kamu yang paling aku suka 🌸',
      story:
        'Setiap kali hari terasa melelahkan, mengingat senyummu di momen ini selalu berhasil mengembalikan energiku seratus persen.',
      mediaType: 'image',
      src: '/assets/images/memories/senyum-terbaik.jpg',
      illustrationType: 'smile',
      rotation: -1.8,
      tapeColor: 'lavender',
    },
    {
      id: 'mem-4',
      title: 'Ngopi & Cerita Random',
      date: 'Cozy Afternoon',
      caption: 'Dua cangkir manis dan seribu topik obrolan seru kita 🍦✨',
      story:
        'Hal paling sederhana seperti duduk berdua sambil mendengarkan kamu bercerita tentang harimu adalah definisi bahagia versiku.',
      mediaType: 'image',
      src: '/assets/images/memories/ngopi-cerita.png',
      illustrationType: 'coffee',
      rotation: 2.4,
      tapeColor: 'mint',
    },
    {
      id: 'mem-5',
      title: 'Langit Senja Bersama',
      date: 'Golden Hour',
      caption: 'Berharap waktu berhenti sebentar waktu langit berubah warna 🌅',
      story:
        'Katanya senja itu indah karena sebentar, tapi bersama kamu, aku ingin semua hal indah bertahan selamanya.',
      mediaType: 'image',
      src: '/assets/images/memories/pantai-senja.png',
      illustrationType: 'sunset',
      rotation: -2.2,
      tapeColor: 'pink',
    },
    {
      id: 'mem-6',
      title: 'Rekaman Momen Kecil Kita',
      date: 'Little Clip of Us',
      caption: 'Potongan video singkat yang selalu bikin senyum-senyum sendiri 🎥',
      story:
        'Video singkat ini menyimpan tawa dan suasana hangat yang ingin terus aku putar ulang sampai kapan pun.',
      mediaType: 'video',
      src: '/assets/videos/memory-clip.mp4',
      illustrationType: 'cinema',
      rotation: 1.8,
      tapeColor: 'lavender',
    },
  ],

  miniGame: {
    quizTitle: 'Mini Quiz Tentang Kita 🎲',
    questions: [
      {
        id: 'q1',
        question: 'Apa hal pertama yang paling bikin aku jatuh hati sama kamu?',
        options: [
          {
            text: 'Senyummu yang tulus dan cara matamu berbinar saat bercerita ✨',
            isCorrect: true,
            reactionMessage:
              '100% Benar! Sampai detik ini pun tatapan dan antusiasmemu waktu bercerita masih jadi hal favoritku 💖',
          },
          {
            text: 'Karena kamu suka ngambek lucu kalau lagi lapar 🤭',
            isCorrect: false,
            reactionMessage:
              'Hahaha itu sih bonus menggemaskan! Tapi ada alasan utama yang bikin aku langsung luluh, coba pilih lagi~',
          },
          {
            text: 'Karena kebetulan lewat aja waktu itu 👀',
            isCorrect: false,
            reactionMessage:
              'Eits, enak aja kebetulan! Takdir sebaik ini masa dibilang kebetulan, coba tebak jawaban yang paling manis 😄',
          },
        ],
      },
      {
        id: 'q2',
        question: 'Kalau kita lagi jalan berdua, momen apa yang paling aku syukuri?',
        options: [
          {
            text: 'Saat bingung mau makan di mana lalu jawabannya "Terserah" selama 1 jam 🍜',
            isCorrect: false,
            reactionMessage:
              'Wahaha itu ritual wajib setiap pasangan sih! Tapi ada momen lain yang jauh lebih menyentuh hati, coba klik yang satunya~',
          },
          {
            text: 'Bisa mengobrol tentang hal apa saja dengan nyaman & tertawa lepas bersamamu 🌷',
            isCorrect: true,
            reactionMessage:
              'Tepat sekali! Bersama kamu rasanya seperti pulang ke tempat yang paling tenang dan nyaman 🏡💞',
          },
          {
            text: 'Waktu kita lomba tahan tawa di tempat umum 😂',
            isCorrect: false,
            reactionMessage:
              'Itu seru banget sih! Tapi ada satu jawaban yang paling menggambarkan betapa berartinya kehadiranmu~',
          },
        ],
      },
      {
        id: 'q3',
        question: 'Siapa perempuan paling menggemaskan, kuat, dan spesial yang sedang ulang tahun hari ini?',
        options: [
          {
            text: 'Aku dong tentunya! 👑💖',
            isCorrect: true,
            reactionMessage:
              'YESS! Tidak ada kandidat lain di dunia ini selain kamu! Selamat ulang tahun, kesayanganku! 🎉🌷',
          },
          {
            text: 'Hmm siapa ya? Coba tanya bintang di langit 🌟',
            isCorrect: false,
            reactionMessage:
              'Bintang di langit aja langsung nunjuk ke orang yang lagi pegang layar HP/laptop ini sekarang! Klik jawaban di atas ya~ 😘',
          },
        ],
      },
    ],
    heartTargetCount: 6,
    rewardCouponTitle: 'VIP Birthday Love Pass 🎟️',
    rewardCouponCode: 'FOREVER-YOURS-365',
    rewardCouponDesc:
      'Kupon Spesial Tanpa Kedaluwarsa: Bebas klaim 1x Traktiran Makanan & Dessert Favoritmu + Jalan-Jalan Seharian + Pelukan Hangat Tanpa Batas!',
  },

  specialThings: [
    {
      id: 'note-1',
      category: 'Little Habit #1',
      frontTitle: 'Cara Kamu Bercerita ✨',
      backMessage:
        'Mata kamu selalu berbinar setiap kali menceritakan hal yang kamu sukai. Aku selalu betah mendengarkan suaramu berjam-jam.',
      color: 'pink',
      icon: 'sparkles',
    },
    {
      id: 'note-2',
      category: 'Warm Heart #2',
      frontTitle: 'Perhatian Kecilmu 🌷',
      backMessage:
        'Kamu selalu ingat detail-detail kecil dan peduli dengan caramu yang lembut, bahkan di saat kamu sendiri sedang banyak pikiran.',
      color: 'butter',
      icon: 'flower',
    },
    {
      id: 'note-3',
      category: 'My Favorite Sound #3',
      frontTitle: 'Suara Tawamu 🎶',
      backMessage:
        'Tawa lepasmu adalah obat paling ampuh untuk hari yang lelah. Jangan pernah kehilangan sisi ceria dan hangatmu itu ya.',
      color: 'lavender',
      icon: 'heart',
    },
    {
      id: 'note-4',
      category: 'Quiet Strength #4',
      frontTitle: 'Ketangguhanmu 🌟',
      backMessage:
        'Meski kadang merasa lelah, kamu tidak pernah berhenti berusaha memberikan yang terbaik. Aku selalu bangga melihat prosesmu.',
      color: 'mint',
      icon: 'star',
    },
    {
      id: 'note-5',
      category: 'Pure Comfort #5',
      frontTitle: 'Ketenangan Saat Bersamamu ☕',
      backMessage:
        'Hanya dengan duduk di sebelahmu saja, semua hiruk-pikuk di kepala rasanya langsung reda. Kamu adalah definisi nyamanku.',
      color: 'pink',
      icon: 'coffee',
    },
    {
      id: 'note-6',
      category: 'Everyday Magic #6',
      frontTitle: 'Kebaikan Hatimu ☀️',
      backMessage:
        'Cara kamu memperlakukan orang-orang di sekitarmu dengan tulus selalu membuatku jatuh cinta lagi dan lagi setiap harinya.',
      color: 'butter',
      icon: 'sun',
    },
  ],

  finalSurprise: {
    preOpenHint: 'Ketuk kotak kado di bawah ini 3 kali untuk membuka kejutan terakhir! 🎁',
    mainHeadline: 'Happy Birthday, My Favorite Person! 🎂💖',
    featuredMedia: {
      type: 'image',
      src: '/assets/images/gallery/final-special.jpg',
      caption: 'Terima kasih telah menjadi bagian paling indah dalam hidupku ✨',
    },
    emotionalMessage: [
      'Selamat bertambah usia, sayang. Terima kasih sudah lahir ke dunia ini dan tumbuh menjadi perempuan yang begitu hangat, tulus, dan mengagumkan.',
      'Ke mana pun langkah kita berjalan nanti, ingatlah bahwa kamu tidak pernah sendirian. Aku akan selalu ada di barisan paling depan untuk mendukung mimpimu, mendengarkan keluh kesahmu, dan merayakan setiap kebahagiaan kecil maupun besar bersamamu.',
    ],
    closingWish: 'I Love You, Today and Every Day Coming After 🤍',
  },
};

// ============================================================================
// 3. WEB AUDIO API SYNTHESIZER (MUSIC BOX LULLABY + CUTE SFX)
// ============================================================================
// Memastikan musik & efek suara tetap berjalan jernih meskipun file MP3 belum diunggah

class RomanticSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlayingMelody = false;
  private melodyTimer: number | null = null;
  private noteIndex = 0;
  private volume = 0.45;
  private isMuted = false;

  // Melodi kotak musik romantis (nada-nada lembut pentatonik / lullaby C major)
  private melodyNotes = [
    { freq: 523.25, dur: 0.45 }, // C5
    { freq: 659.25, dur: 0.45 }, // E5
    { freq: 783.99, dur: 0.6 },  // G5
    { freq: 659.25, dur: 0.45 }, // E5
    { freq: 880.00, dur: 0.65 }, // A5
    { freq: 783.99, dur: 0.7 },  // G5
    { freq: 698.46, dur: 0.45 }, // F5
    { freq: 659.25, dur: 0.45 }, // E5
    { freq: 587.33, dur: 0.6 },  // D5
    { freq: 783.99, dur: 0.65 }, // G5
    { freq: 523.25, dur: 0.9 },  // C5
    { freq: 0, dur: 0.35 },      // Rest
    { freq: 392.00, dur: 0.4 },  // G4
    { freq: 392.00, dur: 0.35 }, // G4
    { freq: 440.00, dur: 0.6 },  // A4
    { freq: 392.00, dur: 0.6 },  // G4
    { freq: 523.25, dur: 0.65 }, // C5
    { freq: 493.88, dur: 0.9 },  // B4
    { freq: 392.00, dur: 0.4 },  // G4
    { freq: 392.00, dur: 0.35 }, // G4
    { freq: 440.00, dur: 0.6 },  // A4
    { freq: 392.00, dur: 0.6 },  // G4
    { freq: 587.33, dur: 0.65 }, // D5
    { freq: 523.25, dur: 1.0 },  // C5
  ];

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public playSfx(type: 'chime' | 'pop' | 'paper' | 'fanfare' | 'heart') {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      if (type === 'pop' || type === 'heart') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const baseFreq = type === 'heart' ? 587.33 : 440;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.14);

        gain.gain.setValueAtTime(0.18 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.17);
      } else if (type === 'paper') {
        const freqs = [330, 440, 554.37];
        freqs.forEach((f, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + idx * 0.055);
          gain.gain.setValueAtTime(0.12 * this.volume, now + idx * 0.055);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.055 + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.055);
          osc.stop(now + idx * 0.055 + 0.26);
        });
      } else if (type === 'chime') {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.07);
          gain.gain.setValueAtTime(0.15 * this.volume, now + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.5);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.07);
          osc.stop(now + i * 0.07 + 0.52);
        });
      } else if (type === 'fanfare') {
        const chord = [523.25, 659.25, 783.99, 1046.5, 1318.5];
        chord.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.09);
          gain.gain.setValueAtTime(0.2 * this.volume, now + i * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.9);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.09);
          osc.stop(now + i * 0.09 + 0.95);
        });
      }
    } catch {
      // Ignore audio errors on restricted devices
    }
  }

  private playSingleMusicBoxNote(freq: number, duration: number) {
    if (!this.ctx || this.isMuted || freq === 0) return;
    const now = this.ctx.currentTime;

    // Main bell tone
    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const overtoneGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle music-box chime harmonic
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, now);

    const effVol = Math.max(0.01, this.volume * 0.16);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(effVol, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + duration * 1.4);

    overtoneGain.gain.setValueAtTime(0.001, now);
    overtoneGain.gain.linearRampToValueAtTime(effVol * 0.25, now + 0.015);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0005, now + duration * 0.6);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    gain.connect(this.ctx.destination);
    overtoneGain.connect(this.ctx.destination);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + duration * 1.45);
    overtone.stop(now + duration * 0.65);
  }

  public startMelodyLoop() {
    this.initContext();
    if (this.isPlayingMelody) return;
    this.isPlayingMelody = true;

    const scheduleNext = () => {
      if (!this.isPlayingMelody) return;
      const current = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
      this.playSingleMusicBoxNote(current.freq, current.dur);
      this.noteIndex++;
      this.melodyTimer = window.setTimeout(scheduleNext, current.dur * 920);
    };

    scheduleNext();
  }

  public stopMelodyLoop() {
    this.isPlayingMelody = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }
}

const soundEngine = new RomanticSoundEngine();

// ============================================================================
// 4. REUSABLE UI & SCRAPBOOK COMPONENTS
// ============================================================================

const WashiTape: React.FC<{ color?: 'pink' | 'lavender' | 'butter' | 'mint'; className?: string }> = ({
  color = 'pink',
  className = '',
}) => {
  const colorMap = {
    pink: 'bg-[#F8BBD0]/70 border-[#F48FB1]/50',
    lavender: 'bg-[#D1C4E9]/70 border-[#B39DDB]/50',
    butter: 'bg-[#FFF59D]/75 border-[#FFE082]/60',
    mint: 'bg-[#B2DFDB]/70 border-[#80CBC4]/50',
  };

  return (
    <div
      className={`w-24 h-6 backdrop-blur-[1.5px] shadow-sm border-l-2 border-r-2 border-dashed select-none pointer-events-none ${colorMap[color]} ${className}`}
    />
  );
};

interface ScrapbookButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
}

const ScrapbookButton: React.FC<ScrapbookButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const styles = {
    primary:
      'bg-gradient-to-r from-[#F4A6B8] to-[#E5849C] text-white shadow-[0_5px_0_#C96980,0_10px_20px_rgba(244,166,184,0.45)] hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#C96980]',
    secondary:
      'bg-[#FFF3C4] text-[#4A353B] border-2 border-[#E6CE7A] shadow-[0_4px_0_#DEC262] hover:bg-[#FFF7D6] active:translate-y-1 active:shadow-[0_1px_0_#DEC262]',
    outline:
      'bg-white/90 text-[#4A353B] border-2 border-[#F4A6B8] shadow-[0_4px_0_#F4A6B8] hover:bg-[#FFF0F3] active:translate-y-1 active:shadow-[0_1px_0_#F4A6B8]',
    ghost:
      'bg-white/60 hover:bg-white/90 text-[#4A353B] border border-[#F4A6B8]/40 shadow-sm',
  };

  const handleClick = () => {
    if (disabled) return;
    soundEngine.playSfx('pop');
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      style={{ fontFamily: "'Fredoka', sans-serif" }}
      className={`px-6 py-3.5 rounded-full font-semibold tracking-wide transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Custom Hand-Drawn Scrapbook Illustrations for Placeholder Media (No Random Stranger Photos!)
const ScrapbookIllustration: React.FC<{
  type: MemoryItem['illustrationType'];
  title: string;
  isVideo?: boolean;
}> = ({ type, title, isVideo }) => {
  const bgThemes = {
    starlight: 'from-[#2C224E] via-[#4B3869] to-[#7D5A78] text-white',
    foodie: 'from-[#FFF0F3] via-[#FFF8E7] to-[#FFE4E8] text-[#4A353B]',
    smile: 'from-[#FCE4EC] via-[#F3E5F5] to-[#FFF9C4] text-[#4A353B]',
    coffee: 'from-[#EFEBE9] via-[#FFF3E0] to-[#FCE4EC] text-[#4A353B]',
    sunset: 'from-[#FFCCBC] via-[#F8BBD0] to-[#D1C4E9] text-[#4A353B]',
    cinema: 'from-[#E8DFF5] via-[#FCE4EC] to-[#E2F4EC] text-[#4A353B]',
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br ${bgThemes[type]} overflow-hidden select-none`}
    >
      {/* Decorative soft sparkles */}
      <div className="absolute top-3 left-3 opacity-50">
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>
      <div className="absolute bottom-3 right-3 opacity-50">
        <Heart className="w-4 h-4 fill-current animate-bounce" style={{ animationDuration: '3s' }} />
      </div>

      {/* Custom SVG Scrapbook Doodle Art per Memory Type */}
      {type === 'starlight' && (
        <svg viewBox="0 0 120 100" className="w-28 h-24 mb-2 drop-shadow">
          <circle cx="88" cy="26" r="14" fill="#FFF3C4" />
          <circle cx="94" cy="22" r="12" fill="#3B2C5A" />
          <circle cx="25" cy="25" r="2" fill="#FFF3C4" />
          <circle cx="52" cy="16" r="2.5" fill="#FFF3C4" />
          <circle cx="20" cy="50" r="1.5" fill="#FFF3C4" />
          {/* Two cute silhouettes on a hill */}
          <path d="M10 95 Q60 65 110 95 Z" fill="#1F1638" />
          <circle cx="52" cy="64" r="7" fill="#F4A6B8" />
          <path d="M44 82 Q52 68 60 82 Z" fill="#F4A6B8" />
          <circle cx="68" cy="66" r="6.5" fill="#E8DFF5" />
          <path d="M61 82 Q68 70 75 82 Z" fill="#E8DFF5" />
          <path d="M60 48 C58 44 53 45 55 50 C57 53 60 55 60 55 C60 55 63 53 65 50 C67 45 62 44 60 48 Z" fill="#FF80AB" />
        </svg>
      )}

      {type === 'foodie' && (
        <svg viewBox="0 0 120 100" className="w-28 h-24 mb-2">
          <ellipse cx="60" cy="72" rx="36" ry="12" fill="#F8BBD0" />
          <path d="M28 58 Q60 90 92 58 Z" fill="#E07A96" />
          <ellipse cx="60" cy="58" rx="32" ry="10" fill="#FFFDF9" stroke="#E07A96" strokeWidth="2" />
          <path d="M42 56 Q52 48 62 57 T80 55" fill="none" stroke="#FFB74D" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="50" cy="54" r="5" fill="#FF8A65" />
          <circle cx="70" cy="55" r="4" fill="#81C784" />
          <path d="M48 38 Q52 30 48 24" fill="none" stroke="#F4A6B8" strokeWidth="2" strokeLinecap="round" />
          <path d="M62 36 Q66 28 62 22" fill="none" stroke="#F4A6B8" strokeWidth="2" strokeLinecap="round" />
          <path d="M74 38 Q78 30 74 24" fill="none" stroke="#F4A6B8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {type === 'smile' && (
        <svg viewBox="0 0 120 100" className="w-28 h-24 mb-2">
          <circle cx="60" cy="52" r="28" fill="#FFFDF9" stroke="#F4A6B8" strokeWidth="3" />
          <ellipse cx="47" cy="54" rx="4.5" ry="2.5" fill="#F8BBD0" />
          <ellipse cx="73" cy="54" rx="4.5" ry="2.5" fill="#F8BBD0" />
          <path d="M46 46 Q50 41 54 46" fill="none" stroke="#4A353B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M66 46 Q70 41 74 46" fill="none" stroke="#4A353B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M52 57 Q60 65 68 57" fill="none" stroke="#4A353B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Flower crown */}
          <circle cx="42" cy="28" r="6" fill="#F4A6B8" />
          <circle cx="60" cy="24" r="7" fill="#CE93D8" />
          <circle cx="78" cy="28" r="6" fill="#FFE082" />
          <circle cx="60" cy="24" r="2.5" fill="#FFFDF9" />
        </svg>
      )}

      {type === 'coffee' && (
        <svg viewBox="0 0 120 100" className="w-28 h-24 mb-2">
          {/* Two cute cups clinking */}
          <rect x="28" y="46" width="26" height="30" rx="6" fill="#F4A6B8" />
          <path d="M24 52 C18 52 18 66 24 66" fill="none" stroke="#F4A6B8" strokeWidth="3.5" />
          <rect x="64" y="46" width="26" height="30" rx="6" fill="#B39DDB" />
          <path d="M90 52 C96 52 96 66 90 66" fill="none" stroke="#B39DDB" strokeWidth="3.5" />
          <path d="M59 26 C57 22 51 23 53 29 C55 33 59 36 59 36 C59 36 63 33 65 29 C67 23 61 22 59 26 Z" fill="#E07A96" />
        </svg>
      )}

      {type === 'sunset' && (
        <svg viewBox="0 0 120 100" className="w-28 h-24 mb-2">
          <circle cx="60" cy="58" r="22" fill="#FFF3C4" />
          <path d="M15 70 Q40 60 65 70 T105 68 L105 88 L15 88 Z" fill="#E07A96" opacity="0.65" />
          <path d="M22 36 Q38 28 50 36" fill="none" stroke="#FFFDF9" strokeWidth="4" strokeLinecap="round" />
          <path d="M75 30 Q88 22 98 30" fill="none" stroke="#FFFDF9" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}

      {type === 'cinema' && (
        <svg viewBox="0 0 120 100" className="w-28 h-24 mb-2">
          <rect x="24" y="26" width="72" height="50" rx="8" fill="#4A353B" />
          <rect x="30" y="32" width="60" height="38" rx="4" fill="#FFF0F3" />
          <polygon points="54,42 54,60 70,51" fill="#E07A96" />
          <circle cx="36" cy="20" r="5" fill="#F4A6B8" />
          <circle cx="84" cy="20" r="5" fill="#F4A6B8" />
        </svg>
      )}

      <span className="text-xs font-semibold tracking-wide px-2.5 py-0.5 rounded-full bg-white/80 text-[#4A353B] shadow-sm">
        {isVideo ? '🎥 Video Kenangan' : '📸 Ilustrasi Scrapbook'}
      </span>
      <span className="text-[10px] mt-1 opacity-75 text-center line-clamp-1">{title}</span>
    </div>
  );
};

// Smart Media Component: Displays real image/video if available, or falls back cleanly to custom illustration
const SmartMediaView: React.FC<{
  src: string;
  title: string;
  mediaType: 'image' | 'video';
  illustrationType?: MemoryItem['illustrationType'];
  className?: string;
  fit?: 'cover' | 'contain';
}> = ({ src, title, mediaType, illustrationType = 'smile', className = '', fit = 'cover' }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div className={`w-full h-full overflow-hidden ${className}`}>
        <ScrapbookIllustration
          type={illustrationType}
          title={title}
          isVideo={mediaType === 'video'}
        />
      </div>
    );
  }

  if (mediaType === 'video') {
    return (
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
        className={`w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={title}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
    />
  );
};

// ============================================================================
// 5. PERSISTENT FLOATING MUSIC PLAYER
// ============================================================================

const FloatingMusicPlayer: React.FC<{
  musicConfig: BirthdayConfig['music'];
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  onVolumeChange: (val: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}> = ({
  musicConfig,
  isPlaying,
  onTogglePlay,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 flex items-end gap-2">
      <div
        className={`bg-white/95 backdrop-blur-md border-2 border-[#F4A6B8]/60 rounded-2xl shadow-[0_8px_25px_rgba(244,166,184,0.35)] transition-all duration-300 overflow-hidden ${
          expanded ? 'p-3.5 w-72 max-w-[calc(100vw-1.5rem)]' : 'p-2 w-auto'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {/* Spinning Vinyl Record Icon */}
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            title="Buka/Tutup Kontrol Musik"
            className={`relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#4A353B] via-[#6D4C56] to-[#4A353B] flex items-center justify-center text-white shadow-md shrink-0 cursor-pointer ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#F4A6B8] border-2 border-white flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#4A353B]" />
            </div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E07A96] flex items-center justify-center">
                <Music className="w-2 h-2 text-white" />
              </span>
            )}
          </button>

          {/* Compact Play/Pause when collapsed */}
          {!expanded && (
            <div className="flex items-center gap-1.5 pr-1">
              <button
                type="button"
                onClick={onTogglePlay}
                className="px-2.5 py-1.5 rounded-xl bg-[#FFF0F3] hover:bg-[#FADADD] text-[#E07A96] font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Playing' : 'Play'}</span>
              </button>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="text-[11px] text-[#8A6F77] hover:text-[#4A353B] px-1 cursor-pointer"
                title="Pengaturan Suara"
              >
                •••
              </button>
            </div>
          )}

          {/* Expanded Info */}
          {expanded && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#4A353B] truncate">{musicConfig.title}</p>
              <p className="text-[11px] text-[#8A6F77] truncate">{musicConfig.artist}</p>
            </div>
          )}

          {expanded && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="p-1 text-[#8A6F77] hover:text-[#4A353B] rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Expanded Controls */}
        {expanded && (
          <div className="mt-3 pt-2.5 border-t border-[#F4A6B8]/30 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onTogglePlay}
              className="px-3 py-1.5 rounded-xl bg-[#F4A6B8] hover:bg-[#E07A96] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? 'Jeda' : 'Putar'}
            </button>

            <div className="flex items-center gap-2 flex-1">
              <button
                type="button"
                onClick={onToggleMute}
                className="text-[#8A6F77] hover:text-[#E07A96] cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-[#E07A96] h-1.5 bg-[#FFF0F3] rounded-lg cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 6. CHAPTER 1 — THE WELCOME
// ============================================================================

const Chapter1Welcome: React.FC<{
  config: BirthdayConfig;
  onStartJourney: () => void;
}> = ({ config, onStartJourney }) => {
  const [isUntying, setIsUntying] = useState(false);

  const handleOpenClick = () => {
    setIsUntying(true);
    soundEngine.playSfx('chime');
    setTimeout(() => {
      onStartJourney();
    }, 650);
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-10">
      {/* Dreamy Floating Clouds & Stars */}
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <div className="absolute top-8 left-[8%] animate-bounce" style={{ animationDuration: '5s' }}>
          <div className="px-4 py-2 rounded-full bg-white/80 shadow-sm border border-[#F4A6B8]/25 text-xs text-[#8A6F77] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E07A96]" />
            <span>Special Edition</span>
          </div>
        </div>
        <div className="absolute top-14 right-[10%] text-[#E07A96]/60 animate-pulse">
          <Star className="w-6 h-6 fill-[#FFF3C4]" />
        </div>
        <div className="absolute bottom-16 left-[12%] text-[#F4A6B8]/70 animate-pulse">
          <Heart className="w-6 h-6 fill-[#F4A6B8]/40" />
        </div>
      </div>

      {/* Main Tactile Scrapbook Invitation Card */}
      <div
        className={`relative max-w-lg w-full bg-[#FFFDF9] rounded-[28px] sm:rounded-[32px] p-5 sm:p-10 border-2 border-[#F4A6B8]/50 shadow-[0_18px_45px_-10px_rgba(244,166,184,0.4)] text-center transition-all duration-500 break-words ${
          isUntying ? 'scale-105 opacity-0 -translate-y-4' : 'scale-100 opacity-100'
        }`}
      >
        {/* Top Washi Tape */}
        <WashiTape color="pink" className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-2" />

        {/* Decorative Ribbon Bow Header */}
        <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-gradient-to-br from-[#FFF0F3] to-[#E8DFF5] border-2 border-[#F4A6B8]/40 flex items-center justify-center shadow-inner relative">
          <svg viewBox="0 0 80 60" className="w-14 h-14 drop-shadow-sm">
            {/* Cute Ribbon Bow SVG */}
            <path
              d="M40 30 C22 10 8 18 14 34 C18 44 32 36 40 30 Z"
              fill="#F4A6B8"
              stroke="#E07A96"
              strokeWidth="2"
            />
            <path
              d="M40 30 C58 10 72 18 66 34 C62 44 48 36 40 30 Z"
              fill="#F4A6B8"
              stroke="#E07A96"
              strokeWidth="2"
            />
            <path
              d="M35 33 L24 54 L33 50 L38 56 L40 35"
              fill="#E07A96"
            />
            <path
              d="M45 33 L56 54 L47 50 L42 56 L40 35"
              fill="#E07A96"
            />
            <circle cx="40" cy="30" r="6" fill="#FFF3C4" stroke="#E07A96" strokeWidth="2" />
          </svg>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF0F3] border border-[#F4A6B8]/50 text-[#E07A96] text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{config.welcome.badgeText}</span>
        </div>

        {/* Recipient Tag */}
        <p
          style={{ fontFamily: "'Caveat', cursive" }}
          className="text-2xl sm:text-3xl text-[#E07A96] font-bold mb-1"
        >
          Untuk: {config.herName} ({config.birthdayDate})
        </p>

        {/* Headline */}
        <h1
          style={{ fontFamily: "'Fredoka', sans-serif" }}
          className="text-2xl sm:text-4xl font-bold text-[#4A353B] leading-tight mb-4 break-words"
        >
          {config.welcome.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base text-[#8A6F77] leading-relaxed mb-8 max-w-md mx-auto">
          {config.welcome.subheadline}
        </p>

        {/* Primary Action Button */}
        <ScrapbookButton onClick={handleOpenClick} className="w-full sm:w-auto text-base px-8 py-4">
          <span>{config.welcome.buttonText}</span>
          <ChevronRight className="w-5 h-5" />
        </ScrapbookButton>

        {/* Audio Hint */}
        <p className="mt-5 text-[11px] text-[#8A6F77] flex items-center justify-center gap-1.5">
          <Music className="w-3.5 h-3.5 text-[#F4A6B8]" />
          <span>Musik lembut akan otomatis berputar saat kamu membuka kejutan ini</span>
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// 7. CHAPTER 2 — OPEN YOUR LETTER (INTERACTIVE ENVELOPE)
// ============================================================================

const Chapter2Letter: React.FC<{
  config: BirthdayConfig;
  onNextChapter: () => void;
}> = ({ config, onNextChapter }) => {
  const [step, setStep] = useState<'sealed' | 'flap-open' | 'reading'>('sealed');

  const handleOpenEnvelope = () => {
    if (step === 'sealed') {
      soundEngine.playSfx('paper');
      setStep('flap-open');
      setTimeout(() => {
        soundEngine.playSfx('chime');
        setStep('reading');
      }, 700);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8">
      {/* Chapter Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E07A96] bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#F4A6B8]/40">
          Chapter 2 • Sepucuk Surat
        </span>
        <h2
          style={{ fontFamily: "'Fredoka', sans-serif" }}
          className="text-2xl sm:text-3xl font-bold text-[#4A353B] mt-2"
        >
          {step === 'reading' ? 'Surat Kecil Untukmu 💌' : config.letter.envelopeTitle}
        </h2>
      </div>

      {/* STEP 1 & 2: Interactive Envelope View */}
      {step !== 'reading' && (
        <div className="w-full max-w-md flex flex-col items-center my-6">
          <div
            onClick={handleOpenEnvelope}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleOpenEnvelope()}
            className="relative w-full aspect-[4/3] max-w-[380px] bg-[#FCE4EC] rounded-2xl border-2 border-[#F4A6B8] shadow-[0_20px_40px_rgba(224,122,150,0.28)] cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center overflow-hidden"
          >
            {/* Inside Envelope Back */}
            <div className="absolute inset-2 bg-[#FFF9F5] rounded-xl border border-dashed border-[#F4A6B8]/50 flex flex-col items-center justify-center p-4">
              <p
                style={{ fontFamily: "'Caveat', cursive" }}
                className={`text-xl text-[#E07A96] font-bold transition-all duration-500 ${
                  step === 'flap-open' ? '-translate-y-6 scale-105' : ''
                }`}
              >
                {config.letter.greeting}
              </p>
            </div>

            {/* Bottom & Side Envelope Folds */}
            <svg
              viewBox="0 0 400 300"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              <polygon points="0,300 200,155 400,300" fill="#F8BBD0" stroke="#F4A6B8" strokeWidth="2" />
              <polygon points="0,0 190,160 0,300" fill="#FADADD" stroke="#F4A6B8" strokeWidth="1.5" />
              <polygon points="400,0 210,160 400,300" fill="#FADADD" stroke="#F4A6B8" strokeWidth="1.5" />
            </svg>

            {/* Top Envelope Flap */}
            <svg
              viewBox="0 0 400 300"
              className={`absolute inset-0 w-full h-full pointer-events-none transition-transform duration-500 origin-top ${
                step === 'flap-open' ? 'scale-y-0 opacity-30' : 'scale-y-100'
              }`}
              preserveAspectRatio="none"
            >
              <polygon
                points="0,0 200,165 400,0"
                fill="#F4A6B8"
                stroke="#E07A96"
                strokeWidth="2"
              />
            </svg>

            {/* Stamp in Top Right */}
            <div className="absolute top-3 right-3 bg-[#FFFDF9] px-2.5 py-1 rounded border-2 border-dashed border-[#E07A96] text-[10px] font-bold text-[#E07A96] rotate-3 shadow-sm">
              {config.letter.stampText}
            </div>

            {/* Interactive Heart Wax Seal */}
            <div
              className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#E07A96] to-[#C25975] border-4 border-[#FADADD] shadow-lg flex items-center justify-center transition-all duration-500 ${
                step === 'flap-open' ? 'scale-125 opacity-0' : 'animate-pulse hover:scale-110'
              }`}
            >
              <Heart className="w-7 h-7 text-white fill-white" />
            </div>
          </div>

          <p className="mt-5 text-xs sm:text-sm text-[#8A6F77] animate-bounce">
            👆 Ketuk amplop atau segel hati untuk membuka surat
          </p>
        </div>
      )}

      {/* STEP 3: Expanded Letter Reading View */}
      {step === 'reading' && (
        <div className="relative max-w-xl w-full bg-[#FFFDF9] rounded-2xl sm:rounded-3xl p-5 sm:p-10 border-2 border-[#F4A6B8]/50 shadow-[0_20px_50px_rgba(244,166,184,0.32)] animate-fadeIn break-words">
          <WashiTape color="butter" className="absolute -top-3 left-8 -rotate-3" />
          <WashiTape color="lavender" className="absolute -top-3 right-8 rotate-3" />

          {/* Stamp header */}
          <div className="flex items-center justify-between border-b border-dashed border-[#F4A6B8]/50 pb-4 mb-6">
            <div>
              <span className="text-[11px] font-semibold text-[#8A6F77] uppercase tracking-wider">
                Dari Hati yang Paling Dalam
              </span>
              <h3
                style={{ fontFamily: "'Caveat', cursive" }}
                className="text-2xl sm:text-3xl font-bold text-[#E07A96] mt-0.5"
              >
                {config.letter.greeting}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#FFF0F3] border border-[#F4A6B8]/40 flex items-center justify-center text-[#E07A96] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-[#4A353B] leading-relaxed">
            {config.letter.paragraphs.map((para, index) => (
              <p key={index} className="bg-[#FFF0F3]/40 p-3.5 rounded-2xl border border-[#F4A6B8]/20">
                {para}
              </p>
            ))}
          </div>

          {/* Handwritten Sign-Off */}
          <div className="mt-7 pt-4 border-t border-dashed border-[#F4A6B8]/40 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs text-[#8A6F77]">{config.letter.signOff}</p>
              <p
                style={{ fontFamily: "'Caveat', cursive" }}
                className="text-2xl sm:text-3xl font-bold text-[#E07A96]"
              >
                {config.senderName} 💖
              </p>
            </div>

            <ScrapbookButton onClick={onNextChapter}>
              <span>Lihat Kenangan Kita</span>
              <ChevronRight className="w-4 h-4" />
            </ScrapbookButton>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 8. CHAPTER 3 — OUR LITTLE MEMORIES (POLAROID SCRAPBOOK + LIGHTBOX)
// ============================================================================

const Chapter3Memories: React.FC<{
  config: BirthdayConfig;
  onUpdateMemoryPhoto: (id: string, newUrl: string) => void;
  onNextChapter: () => void;
}> = ({ config, onUpdateMemoryPhoto, onNextChapter }) => {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredMemories = config.memories.filter((item) =>
    filter === 'all' ? true : item.mediaType === filter
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeMemory) return;
    const objectUrl = URL.createObjectURL(file);
    onUpdateMemoryPhoto(activeMemory.id, objectUrl);
    setActiveMemory({ ...activeMemory, src: objectUrl });
    soundEngine.playSfx('chime');
  };

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E07A96] bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#F4A6B8]/40">
          Chapter 3 • Digital Scrapbook
        </span>
        <h2
          style={{ fontFamily: "'Fredoka', sans-serif" }}
          className="text-2xl sm:text-4xl font-bold text-[#4A353B] mt-2"
        >
          Our Little Memories 📸
        </h2>
        <p className="text-xs sm:text-sm text-[#8A6F77] mt-1 max-w-md mx-auto">
          Ketuk setiap foto Polaroid untuk membaca cerita di baliknya (atau mengganti dengan foto asli kalian!)
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {[
          { key: 'all', label: 'Semua Momen ✨' },
          { key: 'image', label: 'Foto Polaroid 📸' },
          { key: 'video', label: 'Video Klip 🎥' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              soundEngine.playSfx('pop');
              setFilter(tab.key as 'all' | 'image' | 'video');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === tab.key
                ? 'bg-[#F4A6B8] text-white shadow-md scale-105'
                : 'bg-white/80 text-[#8A6F77] hover:bg-white border border-[#F4A6B8]/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Polaroid Scrapbook Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 my-4">
        {filteredMemories.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              soundEngine.playSfx('paper');
              setActiveMemory(item);
            }}
            style={{ transform: `rotate(${item.rotation}deg)` }}
            className="group relative bg-[#FFFDF9] p-3.5 pb-6 rounded-2xl border-2 border-[#F4A6B8]/40 shadow-[0_12px_28px_rgba(74,53,59,0.1)] hover:shadow-[0_18px_36px_rgba(244,166,184,0.4)] hover:rotate-0 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
          >
            {/* Washi Tape on Top */}
            <WashiTape
              color={item.tapeColor}
              className="absolute -top-3 left-1/2 -translate-x-1/2"
            />

            {/* Polaroid Image Frame */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#FFF0F3] border border-[#F4A6B8]/30 mb-3">
              <SmartMediaView
                src={item.src}
                title={item.title}
                mediaType={item.mediaType}
                illustrationType={item.illustrationType}
              />

              {/* Date Pill */}
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#E07A96] shadow-sm">
                {item.date}
              </span>

              {/* Zoom Hint */}
              <div className="absolute inset-0 bg-[#4A353B]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-full bg-white/95 text-[#4A353B] text-xs font-bold flex items-center gap-1 shadow">
                  <Eye className="w-3.5 h-3.5 text-[#E07A96]" /> Buka Cerita
                </span>
              </div>
            </div>

            {/* Handwritten Caption */}
            <h3
              style={{ fontFamily: "'Fredoka', sans-serif" }}
              className="text-base font-bold text-[#4A353B] text-center"
            >
              {item.title}
            </h3>
            <p
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-lg text-[#8A6F77] text-center mt-0.5 leading-snug"
            >
              &ldquo;{item.caption}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <ScrapbookButton onClick={onNextChapter}>
          <span>Main Game Kecil Yuk! 🎲</span>
          <ChevronRight className="w-5 h-5" />
        </ScrapbookButton>
      </div>

      {/* Lightbox Modal */}
      {activeMemory && (
        <div
          className="fixed inset-0 z-50 bg-[#4A353B]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onClick={() => setActiveMemory(null)}
        >
          <div
            className="relative max-w-lg w-full max-h-[92vh] overflow-y-auto bg-[#FFFDF9] rounded-3xl p-4 sm:p-7 border-2 border-[#F4A6B8] shadow-2xl animate-fadeIn custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveMemory(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFF0F3] text-[#E07A96] flex items-center justify-center hover:bg-[#FADADD] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="inline-block text-xs font-bold text-[#E07A96] bg-[#FFF0F3] px-3 py-1 rounded-full mb-2">
              {activeMemory.date}
            </span>
            <h3
              style={{ fontFamily: "'Fredoka', sans-serif" }}
              className="text-xl sm:text-2xl font-bold text-[#4A353B] mb-3"
            >
              {activeMemory.title}
            </h3>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#FFF0F3] border border-[#F4A6B8]/40 mb-4">
              <SmartMediaView
                src={activeMemory.src}
                title={activeMemory.title}
                mediaType={activeMemory.mediaType}
                illustrationType={activeMemory.illustrationType}
              />
            </div>

            <p
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-xl text-[#E07A96] font-bold mb-2"
            >
              &ldquo;{activeMemory.caption}&rdquo;
            </p>
            <p className="text-sm text-[#4A353B] leading-relaxed bg-[#FFF0F3]/60 p-3.5 rounded-2xl border border-[#F4A6B8]/30">
              {activeMemory.story}
            </p>

            {/* Quick Local Photo/Video Preview Uploader */}
            <div className="mt-4 pt-3 border-t border-dashed border-[#F4A6B8]/40 flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] text-[#8A6F77]">
                Ingin coba pasang foto/video asli kamu di Polaroid ini?
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept={activeMemory.mediaType === 'video' ? 'video/*' : 'image/*'}
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-[#FFF3C4] hover:bg-[#FFE082] text-[#4A353B] text-xs font-bold flex items-center gap-1.5 border border-[#E6CE7A] cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Pilih File {activeMemory.mediaType === 'video' ? 'Video' : 'Foto'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 9. CHAPTER 4 — LET'S PLAY TOGETHER (COUPLE QUIZ + CATCH THE HEARTS)
// ============================================================================

interface FloatingHeartTarget {
  id: number;
  x: number;
  y: number;
  label: string;
  caught: boolean;
}

const Chapter4MiniGame: React.FC<{
  config: BirthdayConfig;
  onNextChapter: () => void;
}> = ({ config, onNextChapter }) => {
  const [mode, setMode] = useState<'quiz' | 'hearts' | 'reward'>('quiz');
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<{
    text: string;
    isCorrect: boolean;
    reactionMessage: string;
  } | null>(null);

  // Heart catcher state
  const [caughtCount, setCaughtCount] = useState(0);
  const [hearts, setHearts] = useState<FloatingHeartTarget[]>([
    { id: 1, x: 14, y: 22, label: 'Peluk Hangat 🤗', caught: false },
    { id: 2, x: 68, y: 18, label: 'Senyum Manis 😊', caught: false },
    { id: 3, x: 42, y: 46, label: 'Jalan Bareng 🛵', caught: false },
    { id: 4, x: 18, y: 66, label: 'Jajan Favorit 🍦', caught: false },
    { id: 5, x: 74, y: 62, label: 'Sayang Selalu 💖', caught: false },
    { id: 6, x: 46, y: 76, label: 'Doa Terbaik ✨', caught: false },
  ]);
  const [lastCaughtLabel, setLastCaughtLabel] = useState<string>('');
  const [couponClaimed, setCouponClaimed] = useState(false);

  const currentQuestion = config.miniGame.questions[qIndex];

  const handleSelectOption = (opt: QuizQuestion['options'][0]) => {
    setSelectedOption(opt);
    if (opt.isCorrect) {
      soundEngine.playSfx('chime');
    } else {
      soundEngine.playSfx('pop');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (qIndex + 1 < config.miniGame.questions.length) {
      setQIndex((prev) => prev + 1);
    } else {
      setMode('hearts');
    }
  };

  const handleCatchHeart = (id: number, label: string) => {
    soundEngine.playSfx('heart');
    setLastCaughtLabel(label);
    setHearts((prev) => prev.map((h) => (h.id === id ? { ...h, caught: true } : h)));
    const nextCount = caughtCount + 1;
    setCaughtCount(nextCount);
    if (nextCount >= config.miniGame.heartTargetCount) {
      setTimeout(() => {
        soundEngine.playSfx('fanfare');
        setMode('reward');
      }, 500);
    }
  };

  return (
    <div className="py-8 px-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E07A96] bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#F4A6B8]/40">
          Chapter 4 • Let&apos;s Play Together
        </span>
        <h2
          style={{ fontFamily: "'Fredoka', sans-serif" }}
          className="text-2xl sm:text-3xl font-bold text-[#4A353B] mt-2"
        >
          {mode === 'quiz' && config.miniGame.quizTitle}
          {mode === 'hearts' && 'Tangkap 6 Hati Keberuntungan! 💖'}
          {mode === 'reward' && 'Yay! Kamu Membuka Hadiah Rahasia! 🎉'}
        </h2>
      </div>

      {/* STAGE A: COUPLE QUIZ */}
      {mode === 'quiz' && currentQuestion && (
        <div className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-[#F4A6B8]/50 shadow-[0_15px_35px_rgba(244,166,184,0.28)]">
          <WashiTape color="lavender" className="absolute -top-3 left-1/2 -translate-x-1/2" />

          <div className="flex items-center justify-between text-xs font-bold text-[#8A6F77] mb-3">
            <span>
              Pertanyaan {qIndex + 1} dari {config.miniGame.questions.length}
            </span>
            <span className="text-[#E07A96] flex items-center gap-1">
              <Gamepad2 className="w-4 h-4" /> Couple Edition
            </span>
          </div>

          <h3
            style={{ fontFamily: "'Fredoka', sans-serif" }}
            className="text-lg sm:text-xl font-bold text-[#4A353B] mb-5"
          >
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption?.text === opt.text;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-[#E2F4EC] border-[#66BB6A] text-[#2E5A36]'
                        : 'bg-[#FFF3C4] border-[#FFA726] text-[#4A353B]'
                      : 'bg-[#FFF0F3]/50 hover:bg-[#FFF0F3] border-[#F4A6B8]/40 text-[#4A353B]'
                  }`}
                >
                  <span className="text-sm font-medium">{opt.text}</span>
                  {isSelected && (
                    <span className="shrink-0 mt-0.5">
                      {opt.isCorrect ? (
                        <Check className="w-5 h-5 text-[#43A047]" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-[#FB8C00]" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Cute Reaction Feedback Bubble */}
          {selectedOption && (
            <div
              className={`mt-5 p-4 rounded-2xl border-2 animate-fadeIn ${
                selectedOption.isCorrect
                  ? 'bg-[#E2F4EC]/80 border-[#81C784] text-[#2E5A36]'
                  : 'bg-[#FFF3C4]/80 border-[#FFD54F] text-[#4A353B]'
              }`}
            >
              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                {selectedOption.reactionMessage}
              </p>

              {selectedOption.isCorrect && (
                <div className="mt-4 flex justify-end">
                  <ScrapbookButton onClick={handleNextQuestion} className="text-xs py-2.5 px-5">
                    <span>
                      {qIndex + 1 < config.miniGame.questions.length
                        ? 'Pertanyaan Selanjutnya'
                        : 'Lanjut Tangkap Hati 💖'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </ScrapbookButton>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* STAGE B: CATCH THE HEARTS MINI-GAME */}
      {mode === 'hearts' && (
        <div className="bg-[#FFFDF9] rounded-3xl p-6 border-2 border-[#F4A6B8]/50 shadow-[0_15px_35px_rgba(244,166,184,0.28)] text-center">
          <p className="text-xs sm:text-sm text-[#8A6F77] mb-3">
            Ketuk semua hati yang melayang di bawah ini untuk membuka <strong>Mystery Box</strong>!
          </p>

          {/* Progress Bar */}
          <div className="w-full max-w-xs mx-auto bg-[#FFF0F3] h-4 rounded-full overflow-hidden border border-[#F4A6B8]/50 mb-4">
            <div
              className="bg-gradient-to-r from-[#F4A6B8] to-[#E07A96] h-full transition-all duration-300"
              style={{ width: `${(caughtCount / config.miniGame.heartTargetCount) * 100}%` }}
            />
          </div>
          <p className="text-xs font-bold text-[#E07A96] mb-4">
            Terkumpul: {caughtCount} / {config.miniGame.heartTargetCount} Hati 💖
            {lastCaughtLabel && ` • (${lastCaughtLabel})`}
          </p>

          {/* Interactive Playfield */}
          <div className="relative w-full h-72 rounded-2xl bg-gradient-to-b from-[#FFF0F3] via-[#FFFDF9] to-[#E8DFF5]/50 border-2 border-dashed border-[#F4A6B8]/50 overflow-hidden">
            {hearts.map((h) =>
              !h.caught ? (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => handleCatchHeart(h.id, h.label)}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform hover:scale-125 active:scale-90 animate-bounce"
                >
                  <div className="w-14 h-14 rounded-full bg-white/90 shadow-md border-2 border-[#F4A6B8] flex flex-col items-center justify-center text-[#E07A96]">
                    <Heart className="w-6 h-6 fill-[#F4A6B8] text-[#E07A96]" />
                  </div>
                </button>
              ) : (
                <div
                  key={h.id}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-[#E07A96] bg-white/80 px-2.5 py-1 rounded-full shadow-sm"
                >
                  ✓ {h.label}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* STAGE C: MYSTERY BOX COUPON REWARD */}
      {mode === 'reward' && (
        <div className="relative bg-gradient-to-br from-[#FFFDF9] via-[#FFF0F3] to-[#FFF3C4]/50 rounded-3xl p-7 sm:p-9 border-2 border-[#F4A6B8] shadow-[0_18px_40px_rgba(244,166,184,0.35)] text-center animate-fadeIn">
          <WashiTape color="mint" className="absolute -top-3 left-1/2 -translate-x-1/2" />

          <div className="w-16 h-16 rounded-2xl bg-[#FFF3C4] border-2 border-[#E6CE7A] mx-auto mb-4 flex items-center justify-center text-[#E07A96] shadow-sm">
            <Award className="w-9 h-9" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white text-[#E07A96] border border-[#F4A6B8]/40">
            Mystery Reward Unlocked
          </span>

          <h3
            style={{ fontFamily: "'Fredoka', sans-serif" }}
            className="text-2xl font-bold text-[#4A353B] mt-3"
          >
            {config.miniGame.rewardCouponTitle}
          </h3>

          {/* Ticket Stub Card */}
          <div className="my-5 bg-white p-5 rounded-2xl border-2 border-dashed border-[#E07A96] shadow-inner">
            <p className="text-xs font-mono uppercase tracking-widest text-[#8A6F77] mb-2">
              KODE KUPON: {config.miniGame.rewardCouponCode}
            </p>
            <p className="text-sm sm:text-base font-semibold text-[#4A353B] leading-relaxed">
              {config.miniGame.rewardCouponDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <ScrapbookButton
              variant="secondary"
              onClick={() => {
                soundEngine.playSfx('chime');
                setCouponClaimed(true);
              }}
            >
              <Check className="w-4 h-4" />
              <span>{couponClaimed ? 'Kupon Sudah Disimpan! 💖' : 'Klaim & Simpan Kupon'}</span>
            </ScrapbookButton>

            <ScrapbookButton onClick={onNextChapter}>
              <span>Lanjut ke Chapter 5</span>
              <ChevronRight className="w-4 h-4" />
            </ScrapbookButton>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 10. CHAPTER 5 — SPECIAL THINGS ABOUT YOU (3D FLIP STICKY NOTES)
// ============================================================================

const Chapter5SpecialYou: React.FC<{
  config: BirthdayConfig;
  onNextChapter: () => void;
}> = ({ config, onNextChapter }) => {
  const [flippedIds, setFlippedIds] = useState<string[]>([]);

  const toggleFlip = (id: string) => {
    soundEngine.playSfx('paper');
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderNoteIcon = (icon: SpecialNote['icon']) => {
    switch (icon) {
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-[#E07A96]" />;
      case 'flower':
        return <Flower2 className="w-6 h-6 text-[#E07A96]" />;
      case 'star':
        return <Star className="w-6 h-6 text-[#E07A96]" />;
      case 'coffee':
        return <Coffee className="w-6 h-6 text-[#E07A96]" />;
      case 'sun':
        return <Sun className="w-6 h-6 text-[#E07A96]" />;
      default:
        return <Heart className="w-6 h-6 text-[#E07A96]" />;
    }
  };

  const cardBgColors = {
    pink: 'bg-[#FFF0F3] border-[#F4A6B8]',
    lavender: 'bg-[#F3E5F5] border-[#CE93D8]',
    butter: 'bg-[#FFFDE7] border-[#FFE082]',
    mint: 'bg-[#E8F5E9] border-[#A5D6A7]',
  };

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E07A96] bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#F4A6B8]/40">
          Chapter 5 • Little Things I Adore
        </span>
        <h2
          style={{ fontFamily: "'Fredoka', sans-serif" }}
          className="text-2xl sm:text-4xl font-bold text-[#4A353B] mt-2"
        >
          Special Things About You 🌷
        </h2>
        <p className="text-xs sm:text-sm text-[#8A6F77] mt-1">
          Ketuk setiap kartu catatan untuk membalik dan membaca hal-hal kecil yang membuatmu begitu istimewa
        </p>
        <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#F4A6B8]/40 text-xs font-bold text-[#E07A96]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            Catatan Terbuka: {flippedIds.length} / {config.specialThings.length}
          </span>
        </div>
      </div>

      {/* Sticky Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {config.specialThings.map((note, idx) => {
          const isFlipped = flippedIds.includes(note.id);
          return (
            <div
              key={note.id}
              onClick={() => toggleFlip(note.id)}
              className={`relative min-h-[210px] rounded-3xl p-6 border-2 shadow-[0_10px_25px_rgba(74,53,59,0.07)] transition-all duration-300 cursor-pointer select-none flex flex-col justify-between hover:-translate-y-1 ${
                isFlipped ? 'bg-[#FFFDF9] border-[#E07A96]' : cardBgColors[note.color]
              }`}
              style={{
                transform: `rotate(${idx % 2 === 0 ? '-1deg' : '1deg'})`,
              }}
            >
              <WashiTape
                color={note.color}
                className="absolute -top-3 left-1/2 -translate-x-1/2"
              />

              {!isFlipped ? (
                /* Front of Sticky Note */
                <div className="flex flex-col items-center justify-center text-center my-auto py-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center mb-3">
                    {renderNoteIcon(note.icon)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A6F77] mb-1">
                    {note.category}
                  </span>
                  <h3
                    style={{ fontFamily: "'Fredoka', sans-serif" }}
                    className="text-lg font-bold text-[#4A353B]"
                  >
                    {note.frontTitle}
                  </h3>
                  <span className="mt-4 text-[11px] font-semibold text-[#E07A96] bg-white/80 px-3 py-1 rounded-full">
                    Ketuk untuk membalik ↻
                  </span>
                </div>
              ) : (
                /* Back of Sticky Note (Revealed Secret) */
                <div className="flex flex-col justify-between h-full animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-dashed border-[#F4A6B8]/50 pb-2 mb-3">
                    <span
                      style={{ fontFamily: "'Caveat', cursive" }}
                      className="text-xl font-bold text-[#E07A96]"
                    >
                      {note.frontTitle}
                    </span>
                    <Heart className="w-4 h-4 fill-[#F4A6B8] text-[#E07A96]" />
                  </div>
                  <p className="text-sm text-[#4A353B] leading-relaxed my-auto">
                    {note.backMessage}
                  </p>
                  <span className="text-[10px] text-[#8A6F77] text-right mt-3">
                    ✓ Sudah dibaca
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Next Chapter CTA */}
      <div className="mt-10 text-center">
        <ScrapbookButton onClick={onNextChapter} className="px-8 py-4 text-base">
          <Gift className="w-5 h-5" />
          <span>Menuju Kejutan Puncak (Chapter 6) ✨</span>
        </ScrapbookButton>
      </div>
    </div>
  );
};

// ============================================================================
// 11. CHAPTER 6 — THE FINAL SURPRISE (GIFT BOX + CAKE CANDLE BLOW + FINALE)
// ============================================================================

const Chapter6FinalSurprise: React.FC<{
  config: BirthdayConfig;
  onUpdateFinalPhoto: (newUrl: string) => void;
  onRestart: () => void;
}> = ({ config, onUpdateFinalPhoto, onRestart }) => {
  const [tapCount, setTapCount] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleGiftTap = () => {
    if (isOpened) return;
    const next = tapCount + 1;
    setTapCount(next);

    if (next < 3) {
      soundEngine.playSfx('pop');
    } else {
      soundEngine.playSfx('fanfare');
      setIsOpened(true);
    }
  };

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    soundEngine.playSfx('chime');
    setCandlesLit(false);
  };

  const handleFinalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpdateFinalPhoto(url);
    soundEngine.playSfx('chime');
  };

  return (
    <div className="py-8 px-4 max-w-3xl mx-auto">
      {/* Unopened Gift Box Stage */}
      {!isOpened ? (
        <div className="min-h-[72vh] flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E07A96] bg-[#FFF0F3] px-3.5 py-1 rounded-full border border-[#F4A6B8]/40 mb-3">
            Chapter 6 • The Final Surprise
          </span>
          <h2
            style={{ fontFamily: "'Fredoka', sans-serif" }}
            className="text-2xl sm:text-4xl font-bold text-[#4A353B] max-w-md mb-2"
          >
            Ada Satu Kotak Hadiah Terakhir Untukmu...
          </h2>
          <p className="text-xs sm:text-sm text-[#8A6F77] mb-8">
            {config.finalSurprise?.preOpenHint}
          </p>

          {/* Interactive 3D-style Gift Box SVG */}
          <button
            type="button"
            onClick={handleGiftTap}
            className={`group relative p-6 rounded-3xl cursor-pointer select-none transition-transform duration-200 ${
              tapCount === 1
                ? 'scale-105 rotate-2'
                : tapCount === 2
                ? 'scale-110 -rotate-3'
                : 'hover:scale-105'
            }`}
          >
            <svg viewBox="0 0 180 180" className="w-48 h-48 sm:w-56 sm:h-56 drop-shadow-xl">
              {/* Glow behind box */}
              <circle cx="90" cy="95" r="70" fill="#FADADD" opacity="0.5" />
              {/* Box Body */}
              <rect
                x="35"
                y="75"
                width="110"
                height="85"
                rx="10"
                fill="#F4A6B8"
                stroke="#E07A96"
                strokeWidth="3"
              />
              {/* Vertical Ribbon */}
              <rect x="80" y="75" width="20" height="85" fill="#FFF3C4" />
              {/* Horizontal Ribbon */}
              <rect x="35" y="108" width="110" height="18" fill="#FFF3C4" />
              {/* Box Lid */}
              <g
                className="transition-transform duration-300"
                style={{
                  transform:
                    tapCount === 1
                      ? 'translateY(-4px) rotate(-2deg)'
                      : tapCount === 2
                      ? 'translateY(-10px) rotate(4deg)'
                      : 'none',
                  transformOrigin: '90px 70px',
                }}
              >
                <rect
                  x="28"
                  y="55"
                  width="124"
                  height="24"
                  rx="8"
                  fill="#E07A96"
                  stroke="#C96980"
                  strokeWidth="3"
                />
                <rect x="78" y="55" width="24" height="24" fill="#FFF3C4" />
                {/* Top Bow */}
                <path
                  d="M90 55 C65 25 45 38 58 53 C66 60 80 56 90 55 Z"
                  fill="#FFF3C4"
                  stroke="#E6CE7A"
                  strokeWidth="2.5"
                />
                <path
                  d="M90 55 C115 25 135 38 122 53 C114 60 100 56 90 55 Z"
                  fill="#FFF3C4"
                  stroke="#E6CE7A"
                  strokeWidth="2.5"
                />
                <circle cx="90" cy="53" r="7" fill="#E07A96" />
              </g>
            </svg>

            {/* Tap Counter Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#F4A6B8] text-xs font-bold text-[#E07A96] shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>
                {tapCount === 0 && 'Ketuk Kado (0 / 3)'}
                {tapCount === 1 && 'Kado mulai bergoyang! Ketuk lagi (1 / 3) 💓'}
                {tapCount === 2 && 'Satu ketukan lagi!! (2 / 3) ✨'}
              </span>
            </div>
          </button>
        </div>
      ) : (
        /* OPENED GRAND FINALE CELEBRATION */
        <div className="relative bg-[#FFFDF9] rounded-[32px] p-6 sm:p-10 border-2 border-[#F4A6B8] shadow-[0_20px_60px_rgba(224,122,150,0.35)] text-center animate-fadeIn overflow-hidden">
          {/* Confetti & Floating Hearts Header */}
          <div className="flex items-center justify-center gap-2 mb-3 text-[#E07A96]">
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-xs font-bold uppercase tracking-widest bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#F4A6B8]/50">
              Grand Finale • Happy Birthday
            </span>
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          <h2
            style={{ fontFamily: "'Fredoka', sans-serif" }}
            className="text-2xl sm:text-4xl font-bold text-[#4A353B] mb-2"
          >
            {config.finalSurprise?.mainHeadline}
          </h2>
          <p
            style={{ fontFamily: "'Caveat', cursive" }}
            className="text-2xl text-[#E07A96] font-bold mb-6"
          >
            Untuk {config.herName} Tersayang 🌷
          </p>

          {/* Interactive Birthday Cake: Make a Wish & Blow Out the Candles */}
          <div className="my-6 p-5 rounded-3xl bg-gradient-to-b from-[#FFF0F3] to-[#FFFDF9] border border-[#F4A6B8]/40 max-w-md mx-auto">
            <p className="text-xs font-bold text-[#E07A96] mb-2">
              {candlesLit
                ? '🕯️ Ucapkan doa terbaikmu dalam hati, lalu ketuk kue untuk meniup lilinnya!'
                : '✨ Yay! Semoga seluruh doa dan harapan baikmu terkabul tahun ini!'}
            </p>

            <button
              type="button"
              onClick={handleBlowCandles}
              className="mx-auto block cursor-pointer select-none transition-transform hover:scale-105"
              title="Ketuk untuk meniup lilin"
            >
              <svg viewBox="0 0 160 120" className="w-40 h-28 mx-auto">
                {/* Plate */}
                <ellipse cx="80" cy="105" rx="60" ry="8" fill="#E8DFF5" />
                {/* Bottom Cake Layer */}
                <rect x="35" y="70" width="90" height="32" rx="8" fill="#F8BBD0" stroke="#E07A96" strokeWidth="2" />
                {/* Top Frosting Drip */}
                <path
                  d="M35 76 Q45 86 55 76 Q65 86 75 76 Q85 86 95 76 Q105 86 115 76 Q122 84 125 76 L125 70 L35 70 Z"
                  fill="#FFFDF9"
                />
                {/* Candles */}
                {[58, 80, 102].map((cx, i) => (
                  <g key={i}>
                    <rect x={cx - 4} y="44" width="8" height="26" rx="3" fill="#FFF3C4" stroke="#E07A96" strokeWidth="1.5" />
                    {candlesLit ? (
                      <path
                        d={`M${cx} 26 C${cx - 6} 34 ${cx - 5} 42 ${cx} 42 C${cx + 5} 42 ${cx + 6} 34 ${cx} 26 Z`}
                        fill="#FFB300"
                        className="animate-pulse"
                      />
                    ) : (
                      <path
                        d={`M${cx} 40 Q${cx - 4} 32 ${cx + 3} 26`}
                        fill="none"
                        stroke="#8A6F77"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    )}
                  </g>
                ))}
              </svg>
            </button>

            {candlesLit && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E07A96] bg-white px-3 py-1 rounded-full shadow-sm border border-[#F4A6B8]/40">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> Ketuk Lilin untuk Meniup 💨
              </span>
            )}
          </div>

            {/* Featured Special Polaroid Frame */}
            <div className="relative max-w-md mx-auto bg-white p-4 pb-6 rounded-3xl border-2 border-[#F4A6B8]/50 shadow-md my-6">
              <WashiTape color="pink" className="absolute -top-3 left-1/2 -translate-x-1/2" />
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#FFF0F3] mb-3 flex items-center justify-center">
                <SmartMediaView
                  src={config.finalSurprise?.featuredMedia?.src || ''}
                  title={config.herName}
                  mediaType={config.finalSurprise?.featuredMedia?.type || 'image'}
                  illustrationType="smile"
                  fit="contain"
                />
              </div>
            <p
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-xl text-[#4A353B] font-bold"
            >
              &ldquo;{config.finalSurprise?.featuredMedia?.caption || ''}&rdquo;
            </p>

            {/* Quick button to test replacing final photo */}
            <div className="mt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFinalFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] text-[#E07A96] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3 h-3" /> Ganti Foto Spesial Ini
              </button>
            </div>
          </div>

          {/* Main Emotional Message */}
          <div className="space-y-4 text-sm sm:text-base text-[#4A353B] leading-relaxed text-left bg-[#FFF0F3]/50 p-5 sm:p-7 rounded-3xl border border-[#F4A6B8]/30 my-6">
            {config.finalSurprise?.emotionalMessage?.map((msg, idx) => (
              <p key={idx}>{msg}</p>
            ))}
          </div>

          {/* Closing Signature */}
          <div className="my-6">
            <p
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-2xl sm:text-3xl font-bold text-[#E07A96]"
            >
              {config.finalSurprise?.closingWish || ''}
            </p>
            <p className="text-xs text-[#8A6F77] mt-1">— {config.senderName}</p>
          </div>

          {/* Replay Journey Button */}
          <div className="mt-8 pt-6 border-t border-dashed border-[#F4A6B8]/40 flex justify-center">
            <ScrapbookButton variant="outline" onClick={onRestart}>
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Perjalanan dari Awal</span>
            </ScrapbookButton>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 12. LIVE CUSTOMIZATION DRAWER (PHASE 5 ASSET HELPER)
// ============================================================================

const CustomizationDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onChangeConfig: React.Dispatch<React.SetStateAction<BirthdayConfig>>;
  onUploadCustomMusic: (url: string, fileName: string) => void;
}> = ({ isOpen, onClose, config, onChangeConfig, onUploadCustomMusic }) => {
  const musicInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUploadCustomMusic(url, file.name.replace(/\.[^/.]+$/, ''));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#4A353B]/50 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FFFDF9] h-full p-6 overflow-y-auto border-l-2 border-[#F4A6B8] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#F4A6B8]/40 mb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A96]">
              Phase 5 • Asset & Content Studio
            </span>
            <h3
              style={{ fontFamily: "'Fredoka', sans-serif" }}
              className="text-xl font-bold text-[#4A353B]"
            >
              Kustomisasi Kejutan 🛠️
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-[#FFF0F3] text-[#E07A96] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#FFF0F3]/70 border border-[#F4A6B8]/40 text-[#4A353B] leading-relaxed">
            💡 <strong>Tips:</strong> Anda bisa langsung mengubah nama, tanggal, ucapan, atau mencoba mengunggah lagu MP3 & foto pribadi dari perangkat Anda di sini untuk melihat hasilnya secara langsung!
          </div>

          <div>
            <label className="block font-bold text-[#4A353B] mb-1">
              Nama Panggilan Pacar:
            </label>
            <input
              type="text"
              value={config.herName}
              onChange={(e) =>
                onChangeConfig((prev) => ({ ...prev, herName: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4A6B8] bg-white text-sm text-[#4A353B]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#4A353B] mb-1">
              Nama Anda (Pengirim):
            </label>
            <input
              type="text"
              value={config.senderName}
              onChange={(e) =>
                onChangeConfig((prev) => ({ ...prev, senderName: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4A6B8] bg-white text-sm text-[#4A353B]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#4A353B] mb-1">
              Label Tanggal / Usia Spesial:
            </label>
            <input
              type="text"
              value={config.birthdayDate}
              onChange={(e) =>
                onChangeConfig((prev) => ({ ...prev, birthdayDate: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4A6B8] bg-white text-sm text-[#4A353B]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#4A353B] mb-1">
              Judul Pembuka (Chapter 1):
            </label>
            <input
              type="text"
              value={config.welcome.headline}
              onChange={(e) =>
                onChangeConfig((prev) => ({
                  ...prev,
                  welcome: { ...prev.welcome, headline: e.target.value },
                }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4A6B8] bg-white text-sm text-[#4A353B]"
            />
          </div>

          {/* Upload MP3 Test */}
          <div className="pt-3 border-t border-dashed border-[#F4A6B8]/40">
            <label className="block font-bold text-[#4A353B] mb-1">
              Musik Latar (MP3 Pribadi / Music Box Default):
            </label>
            <p className="text-[11px] text-[#8A6F77] mb-2">
              Saat ini: <strong>{config.music.title}</strong>
            </p>
            <input
              ref={musicInputRef}
              type="file"
              accept="audio/*"
              onChange={handleAudioFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => musicInputRef.current?.click()}
              className="w-full py-2.5 px-4 rounded-xl bg-[#FFF3C4] hover:bg-[#FFE082] text-[#4A353B] font-bold flex items-center justify-center gap-2 border border-[#E6CE7A] cursor-pointer"
            >
              <Music className="w-4 h-4 text-[#E07A96]" />
              <span>Pilih File Lagu MP3 dari HP/Laptop</span>
            </button>
          </div>


        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 13. MAIN APPLICATION & CHAPTER STATE MACHINE
// ============================================================================

export function App() {
  const [config, setConfig] = useState<BirthdayConfig>(initialBirthdayConfig);
  const [currentChapter, setCurrentChapter] = useState<ChapterId>(1);
  const [unlockedChapters, setUnlockedChapters] = useState<ChapterId[]>([1]);
  const [isCustomDrawerOpen, setIsCustomDrawerOpen] = useState(false);

  // Audio state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState<string>(initialBirthdayConfig.music.src || '');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const navigateToChapter = useCallback((chapter: ChapterId) => {
    setCurrentChapter(chapter);
    setUnlockedChapters((prev) => (prev.includes(chapter) ? prev : [...prev, chapter]));
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  }, []);

  // Sync audio playback between HTML5 Audio (if custom MP3 exists) and Web Audio API Music Box fallback
  const startMusicPlayback = useCallback(() => {
    setIsPlayingMusic(true);
    if (customAudioUrl && audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.play().catch(() => {
        soundEngine.startMelodyLoop();
      });
    } else {
      soundEngine.startMelodyLoop();
    }
  }, [customAudioUrl, isMuted, volume]);

  const togglePlayPause = () => {
    if (isPlayingMusic) {
      setIsPlayingMusic(false);
      audioRef.current?.pause();
      soundEngine.stopMelodyLoop();
    } else {
      startMusicPlayback();
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    soundEngine.setVolume(newVol);
    soundEngine.setMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
  };

  const handleUploadCustomMusic = (url: string, title: string) => {
    soundEngine.stopMelodyLoop();
    setCustomAudioUrl(url);
    setConfig((prev) => ({
      ...prev,
      music: { ...prev.music, title, src: url },
    }));
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.volume = volume;
        audioRef.current.play().catch(() => {});
        setIsPlayingMusic(true);
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      soundEngine.stopMelodyLoop();
    };
  }, []);

  const chaptersList: { id: ChapterId; title: string; icon: React.ReactNode }[] = [
    { id: 1, title: 'Welcome', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 2, title: 'Suratmu', icon: <Mail className="w-3.5 h-3.5" /> },
    { id: 3, title: 'Kenangan', icon: <Camera className="w-3.5 h-3.5" /> },
    { id: 4, title: 'Mini Game', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { id: 5, title: 'Tentangmu', icon: <Heart className="w-3.5 h-3.5" /> },
    { id: 6, title: 'Kejutan', icon: <Gift className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        backgroundColor: '#FFFDF9',
        backgroundImage: 'radial-gradient(rgba(244, 166, 184, 0.35) 1.3px, transparent 1.3px)',
        backgroundSize: '22px 22px',
      }}
      className="min-h-screen w-full text-[#4A353B] flex flex-col justify-between relative"
    >
      {/* Load Google Fonts: Fredoka, Plus Jakarta Sans, Caveat */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      />

      {/* Hidden HTML5 Audio Element for Custom MP3 */}
      {customAudioUrl && <audio ref={audioRef} src={customAudioUrl} loop />}

      {/* Top Navigation & Chapter Progress Bar */}
      <header className="sticky top-0 z-30 bg-[#FFFDF9]/85 backdrop-blur-md border-b border-[#F4A6B8]/30 px-3 sm:px-6 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] border border-[#F4A6B8] flex items-center justify-center text-[#E07A96] shadow-xs">
              <Heart className="w-4 h-4 fill-[#F4A6B8]" />
            </div>
            <div className="hidden sm:block">
              <p
                style={{ fontFamily: "'Fredoka', sans-serif" }}
                className="text-xs font-bold text-[#4A353B] leading-none"
              >
                Little World For {config.herName}
              </p>
              <p className="text-[10px] text-[#8A6F77]">{config.birthdayDate}</p>
            </div>
          </div>

          {/* Chapter Stepping Stones */}
          <nav
            aria-label="Chapter Navigation"
            className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 no-scrollbar"
          >
            {chaptersList.map((ch) => {
              const isUnlocked = unlockedChapters.includes(ch.id);
              const isCurrent = currentChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playSfx('pop');
                    // Mengizinkan klik langsung agar mudah diuji maupun dijelajahi ulang
                    navigateToChapter(ch.id);
                  }}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#F4A6B8] text-white shadow-sm scale-105'
                      : isUnlocked
                      ? 'bg-[#FFF0F3] text-[#E07A96] hover:bg-[#FADADD]'
                      : 'bg-white/70 text-[#8A6F77] hover:bg-white border border-[#F4A6B8]/30'
                  }`}
                  title={`Buka Chapter ${ch.id}: ${ch.title}`}
                >
                  {isUnlocked ? ch.icon : <Lock className="w-3 h-3 opacity-60" />}
                  <span className="hidden md:inline">{ch.title}</span>
                  <span className="md:hidden">{ch.id}</span>
                </button>
              );
            })}
          </nav>

          {/* Customize Assets Button */}
          <button
            type="button"
            onClick={() => setIsCustomDrawerOpen(true)}
            className="px-3 py-1.5 rounded-full bg-[#FFF3C4] hover:bg-[#FFE082] border border-[#E6CE7A] text-[#4A353B] text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
            title="Edit Nama, Foto, & Lagu"
          >
            <Settings className="w-3.5 h-3.5 text-[#E07A96]" />
            <span className="hidden sm:inline">Edit Konten</span>
          </button>
        </div>
      </header>

      {/* Main Stage Container */}
      <main className="flex-1 w-full">
        {currentChapter === 1 && (
          <Chapter1Welcome
            config={config}
            onStartJourney={() => {
              startMusicPlayback();
              navigateToChapter(2);
            }}
          />
        )}

        {currentChapter === 2 && (
          <Chapter2Letter
            config={config}
            onNextChapter={() => navigateToChapter(3)}
          />
        )}

        {currentChapter === 3 && (
          <Chapter3Memories
            config={config}
            onUpdateMemoryPhoto={(id, newUrl) => {
              setConfig((prev) => ({
                ...prev,
                memories: prev.memories.map((m) =>
                  m.id === id ? { ...m, src: newUrl } : m
                ),
              }));
            }}
            onNextChapter={() => navigateToChapter(4)}
          />
        )}

        {currentChapter === 4 && (
          <Chapter4MiniGame
            config={config}
            onNextChapter={() => navigateToChapter(5)}
          />
        )}

        {currentChapter === 5 && (
          <Chapter5SpecialYou
            config={config}
            onNextChapter={() => navigateToChapter(6)}
          />
        )}

        {currentChapter === 6 && (
          <Chapter6FinalSurprise
            config={config}
            onUpdateFinalPhoto={(newUrl) => {
              setConfig((prev) => ({
                ...prev,
                finalSurprise: {
                  ...prev.finalSurprise,
                  featuredMedia: {
                    ...(prev.finalSurprise?.featuredMedia || {
                      type: 'image',
                      src: '',
                      caption: '',
                    }),
                    src: newUrl,
                  },
                },
              }));
            }}
            onRestart={() => navigateToChapter(1)}
          />
        )}
      </main>

      {/* Bottom Chapter Quick Switcher Footer */}
      <footer className="py-4 px-3 sm:px-4 pb-24 sm:pb-6 text-center text-xs text-[#8A6F77] border-t border-[#F4A6B8]/20 bg-[#FFFDF9]/85 backdrop-blur-xs">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
          <button
            type="button"
            disabled={currentChapter === 1}
            onClick={() =>
              currentChapter > 1 &&
              navigateToChapter((currentChapter - 1) as ChapterId)
            }
            className="px-3.5 py-1.5 rounded-full bg-white border border-[#F4A6B8]/40 text-[#4A353B] font-semibold text-xs disabled:opacity-30 flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs hover:bg-[#FFF0F3]"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Prev
          </button>

          <span className="text-[11px] sm:text-xs truncate">
            Made with 💖 for <strong>{config.herName}</strong> • Chapter {currentChapter} of 6
          </span>

          <button
            type="button"
            disabled={currentChapter === 6}
            onClick={() =>
              currentChapter < 6 &&
              navigateToChapter((currentChapter + 1) as ChapterId)
            }
            className="px-3.5 py-1.5 rounded-full bg-white border border-[#F4A6B8]/40 text-[#4A353B] font-semibold text-xs disabled:opacity-30 flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs hover:bg-[#FFF0F3]"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* Persistent Floating Music Player */}
      <FloatingMusicPlayer
        musicConfig={config.music}
        isPlaying={isPlayingMusic}
        onTogglePlay={togglePlayPause}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Live Customization & Asset Upload Drawer */}
      <CustomizationDrawer
        isOpen={isCustomDrawerOpen}
        onClose={() => setIsCustomDrawerOpen(false)}
        config={config}
        onChangeConfig={setConfig}
        onUploadCustomMusic={handleUploadCustomMusic}
      />
    </div>
  );
}

export default App;