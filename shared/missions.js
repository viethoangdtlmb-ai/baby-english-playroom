/**
 * Mission & Roadmap Engine (Lộ trình 52 Tuần & Sổ Dán Sticker)
 * Quản trị tiến độ, nạp cấu hình xoay vòng 7 ngày cho từng tuần,
 * HUD đếm sao và hộp thoại chúc mừng chiến thắng.
 */
const MissionEngine = {
  // Load progress from LocalStorage
  getProgress() {
    try {
      const data = localStorage.getItem('baby_english_progress');
      if (data) return JSON.parse(data);
    } catch (e) {}

    // Default starting state
    return {
      currentDay: 1,
      currentWeek: 1,
      completedDays: [],
      stickers: {}
    };
  },

  saveProgress(prog) {
    try {
      localStorage.setItem('baby_english_progress', JSON.stringify(prog));
    } catch (e) {}
  },

  getCurrentWeek() {
    if (typeof window !== 'undefined' && window.location && window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const queryWeek = parseInt(urlParams.get('week'), 10);
      if (!isNaN(queryWeek) && queryWeek >= 1 && queryWeek <= 52) {
        return queryWeek;
      }
    }
    const prog = this.getProgress();
    if (prog.currentWeek) return prog.currentWeek;
    return 1;
  },

  setWeek(weekNum) {
    const prog = this.getProgress();
    prog.currentWeek = Math.max(1, Math.min(52, weekNum));
    this.saveProgress(prog);
  },

  /**
   * Lấy ngày thực tế trong tuần (1 = Thứ Hai ... 7 = Chủ Nhật)
   * Hỗ trợ debug thông qua tham số URL ?debugDay=1..7 để kiểm thử
   */
  getRealDayOfWeek() {
    if (typeof window !== 'undefined' && window.location && window.location.search) {
      const p = new URLSearchParams(window.location.search);
      const debugDay = parseInt(p.get('debugDay'), 10);
      if (!isNaN(debugDay) && debugDay >= 1 && debugDay <= 7) {
        return debugDay;
      }
    }
    const d = new Date().getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
    return d === 0 ? 7 : d;
  },

  getMissionUrl(mission, weekNum = null) {
    if (!mission || !mission.gameUrl) return '#';
    const week = weekNum || this.getCurrentWeek();
    const base = mission.gameUrl.split('?')[0];
    return `${base}?mission=${mission.id}&week=${week}&day=${mission.day}`;
  },

  getCurrentWeekData() {
    const curWeek = this.getCurrentWeek();
    if (typeof window !== 'undefined' && window.ToddlerVocabulary && window.ToddlerVocabulary.build80_20Pack) {
      return window.ToddlerVocabulary.build80_20Pack(curWeek);
    }
    return null;
  },

  DEFAULT_ROADMAP: [],

  /**
   * Sinh động lộ trình 7 ngày riêng biệt cho tuần được chọn
   * Mỗi tuần các bạn nhỏ, món ăn, chế độ bắn bóng, đối tượng tắm đều thay đổi
   */
  getWeekRoadmap(weekNum = null) {
    const week = weekNum || this.getCurrentWeek();
    const vocab = (typeof window !== 'undefined' && window.ToddlerVocabulary) ? window.ToddlerVocabulary : null;
    const weekData = (vocab && vocab.build80_20Pack) 
      ? vocab.build80_20Pack(week)
      : null;

    if (!weekData) {
      return this.DEFAULT_ROADMAP;
    }

    const char = weekData.feedingChar;
    const clean = weekData.cleanTarget;
    const balloonMode = weekData.balloonMode;
    const balloonTitle = balloonMode === 'color' ? 'Bắn đúng 5 bóng màu yêu cầu!' :
      (balloonMode === 'animal' ? 'Bắn đúng 5 bóng con vật yêu cầu!' : 'Bắn đúng 5 bóng đồ chơi yêu cầu!');
    const balloonIcon = balloonMode === 'color' ? '🎈✨' : (balloonMode === 'animal' ? '🐶✨' : '🚗✨');

    const peekTarget = weekData.peekBox.target;
    const touchMode = weekData.touchMode;
    const touchTitle = touchMode === 'body' ? 'Chỉ đúng 4 bộ phận cơ thể!' :
      (touchMode === 'home' ? 'Chỉ đúng 4 đồ vật trong phòng!' : 'Chỉ đúng 4 trang phục bé mặc!');
    const touchIcon = touchMode === 'body' ? '👶✨' : (touchMode === 'home' ? '⏰✨' : '🧢✨');

    const isEvenWeek = (week % 2 === 0);
    const day1Mission = isEvenWeek ? {
      day: 1,
      dayName: 'Monday',
      dayVn: 'Thứ Hai',
      id: 'mission_day_1',
      title: balloonTitle,
      englishTitle: 'Pop the Target Balloons',
      gameUrl: `01_balloon_pop/index.html?mission=mission_day_1&week=${week}&day=1`,
      targetCount: 5,
      actionText: 'Bắn đúng bóng',
      sticker: { id: `sticker_w${week}_d1`, word: 'balloon', icon: balloonIcon, name: 'Bé Bắn Bóng Giỏi' },
      voiceIntro: 'Balloon Pop!'
    } : {
      day: 1,
      dayName: 'Monday',
      dayVn: 'Thứ Hai',
      id: 'mission_day_1',
      title: `Khớp đúng 3 món ${char.vnName} thèm!`,
      englishTitle: `Feed ${char.name} the Right Foods`,
      gameUrl: `02_drag_and_feed/index.html?mission=mission_day_1&week=${week}&day=1`,
      targetCount: 3,
      actionText: 'Khớp đúng món',
      sticker: { id: `sticker_w${week}_d1`, word: char.id || char.name, icon: char.emoji + '✨', name: `${char.vnName} No Nê` },
      voiceIntro: `${char.name}!`
    };

    return [
      day1Mission,
      isEvenWeek ? {
        day: 2,
        dayName: 'Tuesday',
        dayVn: 'Thứ Ba',
        id: 'mission_day_2',
        title: 'Chạm nổ 3 bong bóng cứu bạn nhỏ!',
        englishTitle: 'Bubble Bath Rescue',
        gameUrl: `18_bubble_bath/index.html?mission=mission_day_2&week=${week}&day=2`,
        targetCount: 3,
        actionText: 'Nổ bong bóng',
        sticker: { id: `sticker_w${week}_d2`, word: 'bubble', icon: '🫧✨', name: 'Bé Tắm Bong Bóng Giỏi' },
        voiceIntro: 'Bubble Bath!'
      } : {
        day: 2,
        dayName: 'Tuesday',
        dayVn: 'Thứ Ba',
        id: 'mission_day_2',
        title: 'Rung cây hái đủ 3 giỏ quả!',
        englishTitle: 'Shake Tree & Harvest Fruit',
        gameUrl: `17_fruit_harvest/index.html?mission=mission_day_2&week=${week}&day=2`,
        targetCount: 3,
        actionText: 'Hái đủ giỏ',
        sticker: { id: `sticker_w${week}_d2`, word: 'apple', icon: '🍎✨', name: 'Bé Hái Quả Giỏi' },
        voiceIntro: 'Fruit Harvest!'
      },
      isEvenWeek ? {
        day: 3,
        dayName: 'Wednesday',
        dayVn: 'Thứ Tư',
        id: 'mission_day_3',
        title: 'Lái xe vượt 3 cổng đố vui về nhà!',
        englishTitle: 'Trace & Solve 3 Gates',
        gameUrl: `08_car_tracing/index.html?mission=mission_day_3&week=${week}&day=3`,
        targetCount: 3,
        actionText: 'Mở cổng đố vui',
        sticker: { id: `sticker_w${week}_d3`, word: 'car', icon: '🚗✨', name: `Tay Đua Thông Thái Tuần ${week}` },
        voiceIntro: 'Car Tracing!'
      } : {
        day: 3,
        dayName: 'Wednesday',
        dayVn: 'Thứ Tư',
        id: 'mission_day_3',
        title: `Mở hộp tìm ${peekTarget.word}!`,
        englishTitle: `Find the ${peekTarget.word}`,
        gameUrl: `03_peek_a_boo/index.html?mission=mission_day_3&week=${week}&day=3`,
        targetCount: 3,
        actionText: 'Mở đúng bạn',
        sticker: { id: `sticker_w${week}_d3`, word: peekTarget.word || peekTarget.id, icon: peekTarget.emoji + '✨', name: `Bé Tìm Thấy ${peekTarget.word}` },
        voiceIntro: `${peekTarget.word}!`
      },
      isEvenWeek ? {
        day: 4,
        dayName: 'Thursday',
        dayVn: 'Thứ Năm',
        id: 'mission_day_4',
        title: clean.vnTitle,
        englishTitle: clean.name,
        gameUrl: `04_rub_to_clean/index.html?mission=mission_day_4&week=${week}&day=4`,
        targetCount: 1,
        actionText: 'Tắm sạch sẽ',
        sticker: { id: `sticker_w${week}_d4`, word: clean.id || clean.name, icon: clean.emoji + '✨', name: `${clean.name} Sạch Sẽ` },
        voiceIntro: `${clean.name}!`
      } : {
        day: 4,
        dayName: 'Thursday',
        dayVn: 'Thứ Năm',
        id: 'mission_day_4',
        title: (weekData.newWords && weekData.newWords.length > 0)
          ? `Nghe & đập trứng tìm: ${weekData.newWords.slice(0, 3).map(w => w.word).join(', ')}!`
          : 'Nghe âm thanh & tìm đúng hình!',
        englishTitle: 'Listen & Hatch Surprise Egg',
        gameUrl: `11_find_the_word/index.html?mission=mission_day_4&week=${week}&day=4`,
        targetCount: 3,
        actionText: 'Nghe & chọn đúng',
        sticker: {
          id: `sticker_w${week}_d4`,
          word: (weekData.newWords && weekData.newWords[1]) ? weekData.newWords[1].id : 'star',
          icon: ((weekData.newWords && weekData.newWords[1]) ? weekData.newWords[1].emoji : '🥚') + '✨',
          name: `Đôi Tai Vàng Tuần ${week}`
        },
        voiceIntro: (weekData.newWords && weekData.newWords[1]) ? `${weekData.newWords[1].word}!` : 'Listen and Find!'
      },
      {
        day: 5,
        dayName: 'Friday',
        dayVn: 'Thứ Sáu',
        id: 'mission_day_5',
        title: (weekData.shadowPool && weekData.shadowPool.length > 0)
          ? `Ghép đúng bóng: ${weekData.shadowPool.map(s => s.word).join(', ')}!`
          : 'Khớp đúng 3 bóng đen bạn nhỏ!',
        englishTitle: (weekData.shadowPool && weekData.shadowPool.length > 0)
          ? `Match ${weekData.shadowPool[0].word}'s Shadow`
          : 'Match the Shadows',
        gameUrl: `07_shadow_match/index.html?mission=mission_day_5&week=${week}&day=5`,
        targetCount: 3,
        actionText: 'Ghép đúng bóng',
        sticker: { 
          id: `sticker_w${week}_d5`, 
          word: (weekData.shadowPool && weekData.shadowPool[0]) ? weekData.shadowPool[0].word : 'elephant',
          icon: (weekData.shadowPool && weekData.shadowPool[0] ? weekData.shadowPool[0].emoji : '🧩') + '✨', 
          name: `Bé Ghép Đúng ${weekData.shadowPool && weekData.shadowPool[0] ? weekData.shadowPool[0].word : 'Bóng Đen'}` 
        },
        voiceIntro: (weekData.shadowPool && weekData.shadowPool[0]) ? `${weekData.shadowPool[0].word}!` : 'Shadow Match!'
      },
      isEvenWeek ? {
        day: 6,
        dayName: 'Saturday',
        dayVn: 'Thứ Bảy',
        id: 'mission_day_6',
        title: 'Ghép câu 3 từ tạo hình bạn nhỏ!',
        englishTitle: 'Mix & Match 3-Word Sentences',
        gameUrl: `12_mix_and_match/index.html?mission=mission_day_6&week=${week}&day=6`,
        targetCount: 1,
        actionText: 'Ghép đúng mẫu',
        sticker: { id: `sticker_w${week}_d6`, word: 'star', icon: '🎨✨', name: `Vua Ghép Câu Tuần ${week}` },
        voiceIntro: 'Mix and Match!'
      } : {
        day: 6,
        dayName: 'Saturday',
        dayVn: 'Thứ Bảy',
        id: 'mission_day_6',
        title: 'Mặc đồ thật đẹp cho bạn nhỏ!',
        englishTitle: 'Dress Up Friends',
        gameUrl: `16_dress_up/index.html?mission=mission_day_6&week=${week}&day=6`,
        targetCount: 1,
        actionText: 'Mặc đồ đẹp',
        sticker: { id: `sticker_w${week}_d6`, word: 'dress', icon: '👗✨', name: 'Nhà Thiết Kế Nhí' },
        voiceIntro: 'Dress Up!'
      },
      {
        day: 7,
        dayName: 'Sunday',
        dayVn: 'Chủ Nhật',
        id: 'mission_day_7',
        title: 'Nghỉ ngơi & Thi mở Quà Của Mẹ!',
        englishTitle: 'Sunday Rest & Weekend Star Quiz',
        gameUrl: `13_weekend_test/index.html?week=${week}`,
        targetCount: 5,
        actionText: 'Thi 5 Sao',
        sticker: { id: `sticker_w${week}_d7`, word: 'crown', icon: '👑✨', name: `Huy Chương Tuần ${week}` },
        voiceIntro: 'Weekend Star Quiz!'
      }
    ];
  },

  // Fallback roadmap
  get ROADMAP() {
    return this.getWeekRoadmap(this.getCurrentWeek());
  },

  getCurrentMission() {
    const prog = this.getProgress();
    const roadmap = this.getWeekRoadmap(this.getCurrentWeek());
    const day = Math.min(roadmap.length, prog.currentDay || 1);
    return roadmap[day - 1];
  },

  // In-Game Session State
  sessionCount: 0,
  activeMission: null,
  isCompleted: false,

  // Initialize Mission in any Mini-Game
  initGameMission(missionId, containerSelector = '.hud') {
    // 1. CHỈ KÍCH HOẠT KHI ĐI TỪ LỘ TRÌNH (có tham số ?mission= trên URL)
    // Nếu vào chơi từ "Góc Chơi Tự Do" (không có ?mission=) -> Chế độ Free Play 100%, không hiện sao, không dán sticker!
    const urlParams = (typeof window !== 'undefined' && window.location && window.location.search)
      ? new URLSearchParams(window.location.search)
      : null;
    const queryMission = urlParams ? urlParams.get('mission') : null;
    if (!queryMission) {
      this.activeMission = null;
      this.isCompleted = false;
      const tracker = document.getElementById('shared-mission-tracker');
      if (tracker) tracker.remove();
      return;
    }

    const currentWeek = this.getCurrentWeek();
    const roadmap = this.getWeekRoadmap(currentWeek);
    const targetMissionId = queryMission || missionId;
    this.activeMission = roadmap.find(m => m.id === targetMissionId);
    if (!this.activeMission) return;

    // 2. CẤM TUYỆT ĐỐI DÁN CHO NGÀY CHƯA ĐẾN (activeMission.day > currentRealDay)
    const currentRealDay = this.getRealDayOfWeek();
    if (this.activeMission.day > currentRealDay) {
      console.warn(`[MissionEngine] Ngày ${this.activeMission.day} chưa đến (Hôm nay là Ngày ${currentRealDay}). Khóa chế độ nhiệm vụ dán sticker.`);
      this.activeMission = null;
      this.isCompleted = false;
      const tracker = document.getElementById('shared-mission-tracker');
      if (tracker) tracker.remove();
      return;
    }

    this.sessionCount = 0;
    this.isCompleted = false;
    const hud = document.querySelector(containerSelector);
    if (!hud) return;

    let tracker = document.getElementById('shared-mission-tracker');
    if (!tracker) {
      tracker = document.createElement('div');
      tracker.id = 'shared-mission-tracker';
      tracker.className = 'shared-mission-hud';
      hud.insertBefore(tracker, hud.children[1] || null);
    }

    let starsHtml = '';
    for (let i = 1; i <= this.activeMission.targetCount; i++) {
      starsHtml += `<span class="shared-star" id="mstar-${i}">☆</span>`;
    }

    const visualIcon = this.activeMission.sticker ? this.activeMission.sticker.icon.replace('✨', '') : '🎯';
    tracker.innerHTML = `
      <span class="shared-mission-title">
        <span style="font-size: 1.6rem; line-height: 1;">${visualIcon}</span>
        <span style="font-size: 1.05rem; font-weight: 700;">${this.activeMission.englishTitle || this.activeMission.title}</span>
      </span>
      <div class="shared-stars-row">${starsHtml}</div>
    `;

    // Tự động kích hoạt Bàn tay chỉ dẫn nếu sau 3s bé chưa tương tác
    this.scheduleIdleHint();
  },

  idleTimer: null,
  scheduleIdleHint() {
    if (this.idleTimer) clearTimeout(this.idleTimer);
    const babyAge = (typeof window !== 'undefined' && window.BabyProfile && BabyProfile.getAge)
      ? BabyProfile.getAge()
      : 3;
    const hintDelayMs = babyAge >= 4 ? 5200 : 3200;

    this.idleTimer = setTimeout(() => {
      this.spawnGhostHand();
    }, hintDelayMs);

    const onUserTouch = () => {
      if (this.idleTimer) clearTimeout(this.idleTimer);
      const ghost = document.getElementById('shared-ghost-hand');
      if (ghost) ghost.remove();
      window.removeEventListener('pointerdown', onUserTouch);
      window.removeEventListener('touchstart', onUserTouch);
    };
    window.addEventListener('pointerdown', onUserTouch, { once: true });
    window.addEventListener('touchstart', onUserTouch, { once: true });
  },

  spawnGhostHand() {
    let ghost = document.getElementById('shared-ghost-hand');
    if (!ghost) {
      ghost = document.createElement('div');
      ghost.id = 'shared-ghost-hand';
      ghost.className = 'ghost-hand-hint';
      ghost.innerText = '👆';

      // Smart target detection: point directly at active game element if present
      let leftPos = '45%';
      let topPos = '50%';
      const targetEl = document.querySelector('.target-calling, .box-slot:not(.opened), .drag-card:not(.matched), .option-card:not(.wrong), .bucket-card, .bubble');
      if (targetEl && targetEl.getBoundingClientRect) {
        const rect = targetEl.getBoundingClientRect();
        if (rect.width > 10 && rect.height > 10) {
          leftPos = Math.round(rect.left + rect.width * 0.5) + 'px';
          topPos = Math.round(rect.top + rect.height * 0.55) + 'px';
        }
      }
      ghost.style.left = leftPos;
      ghost.style.top = topPos;
      document.body.appendChild(ghost);
      setTimeout(() => { if (ghost) ghost.remove(); }, 4800);
    }
  },

  // Record an action inside game
  recordAction() {
    if (!this.activeMission) return;
    this.sessionCount++;

    const star = document.getElementById('mstar-' + this.sessionCount);
    if (star) {
      star.classList.add('earned');
      star.innerText = '⭐';
      if (window.ToddlerAudio) ToddlerAudio.playTone(523 + this.sessionCount * 60, 'triangle', 0.2);
    }

    if (!this.isCompleted && this.sessionCount >= this.activeMission.targetCount) {
      this.isCompleted = true;
      this.completeMission(this.activeMission);
    }
  },

  completeMission(mission) {
    if (!mission) return;
    const currentRealDay = this.getRealDayOfWeek();
    if (mission.day > currentRealDay) {
      console.warn(`[MissionEngine] Cấm dán sticker cho ngày chưa đến: Ngày ${mission.day} > Hôm nay (${currentRealDay})`);
      return;
    }

    const prog = this.getProgress();
    const currentWeek = this.getCurrentWeek();
    const weekDayKey = `w${currentWeek}_d${mission.day}`;

    if (!prog.completedDays) prog.completedDays = [];
    if (!prog.completedDays.includes(weekDayKey)) {
      prog.completedDays.push(weekDayKey);
    }

    // Unlock Sticker
    if (!prog.stickers) prog.stickers = {};
    prog.stickers[mission.sticker.id] = {
      unlockedAt: new Date().toISOString(),
      icon: mission.sticker.icon,
      name: mission.sticker.name,
      day: mission.day,
      week: currentWeek
    };

    this.saveProgress(prog);

    // Show Victory Celebration Modal (Allow child 1.4s to enjoy in-game slapstick animation)
    setTimeout(() => {
      if (window.ToddlerAudio) {
        ToddlerAudio.playFanfare();
        ToddlerAudio.speakWord('Yay! Good job!');
      }
      this.renderVictoryModal(mission);
    }, 1400);
  },

  renderVictoryModal(mission) {
    let modal = document.getElementById('shared-victory-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'shared-victory-modal';
      modal.className = 'shared-victory-modal';
      document.body.appendChild(modal);
    }
    modal.style.cssText = 'position: fixed; inset: 0; z-index: 99999; display: flex; align-items: center; justify-content: center; background: rgba(62, 39, 35, 0.72); backdrop-filter: blur(8px); padding: 16px;';

    const currentWeek = this.getCurrentWeek();
    const isSaturdayDay6 = (mission.day === 6);
    const isPastCatchUp = (mission.day < this.getRealDayOfWeek());

    let actionsHtml = `
      <a href="../index.html" class="shared-btn-collect" style="display:inline-flex; align-items:center; justify-content:center; gap:8px; border-radius:40px; padding:14px 28px; font-weight:800; text-decoration:none; color:white; background:linear-gradient(135deg, #66BB6A, #2E7D32); box-shadow:0 8px 20px rgba(46,125,50,0.35);">📖 Ra Dán Sticker ➜</a>
      <button type="button" class="shared-btn-continue" onclick="MissionEngine.dismissModalAndContinue()" style="display:inline-flex; align-items:center; justify-content:center; gap:8px; border-radius:40px; padding:14px 28px; font-weight:800; cursor:pointer; background:white; border:3px solid #B0BEC5; color:#455A64;">🎮 Chơi Tiếp Nè!</button>
    `;

    if (isSaturdayDay6) {
      actionsHtml = `
        <a href="../13_weekend_test/index.html?week=${currentWeek}" class="shared-btn-collect" style="background: linear-gradient(135deg, #FF4081, #F50057); border: 3px solid #FF80AB; color: white; width: 100%; max-width: 380px; justify-content: center; box-shadow: 0 8px 24px rgba(245, 0, 87, 0.4); display:inline-flex; align-items:center; border-radius:40px; padding:16px 28px; font-weight:900; font-size:1.25rem; text-decoration:none;">
          🎁 Thi Cuối Tuần & Nhận Quà Mẹ ➜
        </a>
        <a href="../index.html" class="shared-btn-continue" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center; padding:12px 24px; border-radius:30px; background:white; border:2.5px solid #FF80AB; color:#C2185B; font-weight:800; margin-top:8px;">📖 Ra Dán Sticker</a>
      `;
    }

    const victoryTitle = isSaturdayDay6
      ? 'XUẤT SẮC! BÉ ĐÃ HOÀN THÀNH BÀI THỨ 7!'
      : (isPastCatchUp ? 'HOORAY! BÉ ĐÃ HỌC BÙ THÀNH CÔNG!' : 'HOORAY! BÉ HOÀN THÀNH NHIỆM VỤ!');
    const victorySub = isSaturdayDay6
      ? 'Bé đã học xong bài Thứ 7! Đấu trường cuối tuần đã mở để nhận "Phần Thưởng Của Mẹ" rồi nè!'
      : (isPastCatchUp ? `Bé đã dán bù thành công Sticker Ngày ${mission.day} (${mission.dayVn || ''}) vào Sổ Thần Kỳ!` : 'Bé thật là giỏi! Nhận được Sticker mới vào Sổ Thần Kỳ!');

    let realWorldHtml = '';
    if (typeof window !== 'undefined' && window.ToddlerVocabulary && ToddlerVocabulary.getRealWorldParentTip) {
      const tipInfo = ToddlerVocabulary.getRealWorldParentTip(currentWeek);
      const pillsHtml = (tipInfo.words || []).slice(0, 4).map(w => {
        const phrase = ToddlerVocabulary.getWordContextPhrase(w).replace(/'/g, "\\'");
        return `<button type="button" onclick="if(window.ToddlerAudio){ToddlerAudio.playPop();ToddlerAudio.speak('${phrase}');}" style="background:#FFF8E1; border:2px solid #FFB300; border-radius:20px; padding:5px 12px; font-weight:800; font-size:0.88rem; color:#E65100; cursor:pointer; display:inline-flex; align-items:center; gap:4px;"><span>${w.emoji || '⭐'}</span><span>${w.word}</span><span>🔊</span></button>`;
      }).join('');

      realWorldHtml = `
        <div style="background:#E8F5E9; border:2.5px dashed #66BB6A; border-radius:20px; padding:12px 14px; margin-bottom:16px; text-align:left;">
          <div style="font-size:0.9rem; font-weight:900; color:#1B5E20; margin-bottom:6px;">💡 Thử Thách 10 Giây Ngoài Đời Cùng Mẹ:</div>
          <div style="font-size:0.85rem; font-weight:700; color:#2E7D32; line-height:1.35; margin-bottom:8px;">${tipInfo.tipText}</div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:center;">${pillsHtml}</div>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="shared-victory-card" style="background: linear-gradient(180deg, #FFFFFF 0%, #FFFDF5 100%); border: 5px solid #FFC107; border-radius: 36px; padding: 26px 24px; max-width: 490px; width: 100%; text-align: center; box-shadow: 0 24px 60px rgba(0,0,0,0.35); position:relative; z-index:100000; max-height:94vh; overflow-y:auto;">
        <div class="shared-trophy" style="font-size: 4.2rem; margin-bottom: 4px;">🏆</div>
        <h2 class="shared-victory-title" style="font-size: 1.45rem; font-weight: 900; color: #E65100; margin: 6px 0;">${victoryTitle}</h2>
        <p class="shared-victory-sub" style="font-size: 0.98rem; font-weight: 700; color: #5D4037; margin-bottom: 14px; line-height: 1.35;">${victorySub}</p>
        
        <div class="shared-sticker-box" style="background: #FFFDF5; border: 3.5px dashed #FFB300; border-radius: 24px; padding: 10px 20px; display: inline-flex; flex-direction: column; align-items: center; margin-bottom: 14px;">
          <div class="shared-sticker-icon" style="font-size: 3.4rem;">${mission.sticker.icon}</div>
          <div class="shared-sticker-name" style="font-size: 1.08rem; font-weight: 800; color: #E65100; margin-top: 2px;">${mission.sticker.name}</div>
        </div>

        ${realWorldHtml}
        
        <div class="shared-modal-actions" style="display: flex; flex-direction: column; gap: 10px; justify-content: center; align-items: center;">
          ${actionsHtml}
        </div>
      </div>
    `;
    modal.style.display = 'flex';
  },

  // Dismiss modal and allow endless free play without interruption
  dismissModalAndContinue() {
    const modal = document.getElementById('shared-victory-modal');
    if (modal) {
      modal.style.display = 'none';
    }
    const title = document.querySelector('.shared-mission-title');
    if (title) {
      title.innerText = '🎯 Đã Xong! (Chơi Tự Do)';
      title.style.color = '#2E7D32';
    }
    if (window.ToddlerAudio) {
      ToddlerAudio.playChime();
      ToddlerAudio.speakWord('Yay! Have fun!');
    }
  },

  // -------------------------------------------------------------
  // GENTLE BEDTIME / EYE-CARE GUARD (Đồng hồ Bạn Gấu Đi Ngủ bảo vệ mắt bé)
  // -------------------------------------------------------------
  BEDTIME_KEY: 'toddler_bedtime_guard',
  _bedtimeInterval: null,

  setBedtimeTimer(minutes) {
    try {
      if (!minutes || minutes <= 0) {
        localStorage.removeItem(this.BEDTIME_KEY);
        const overlay = document.getElementById('toddler-bedtime-overlay');
        if (overlay) overlay.remove();
        return null;
      }
      const expiresAt = Date.now() + minutes * 60 * 1000;
      const data = { minutes, expiresAt };
      localStorage.setItem(this.BEDTIME_KEY, JSON.stringify(data));
      this.startBedtimeWatcher();
      return data;
    } catch (e) {
      return null;
    }
  },

  getBedtimeRemainingSec() {
    try {
      const raw = localStorage.getItem(this.BEDTIME_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.expiresAt) return null;
      return Math.max(0, Math.floor((data.expiresAt - Date.now()) / 1000));
    } catch (e) {
      return null;
    }
  },

  startBedtimeWatcher() {
    if (this._bedtimeInterval) clearInterval(this._bedtimeInterval);
    this._bedtimeInterval = setInterval(() => {
      const rem = this.getBedtimeRemainingSec();
      if (rem !== null && rem <= 0) {
        this.showBedtimeSleepOverlay();
      }
    }, 3000);
  },

  showBedtimeSleepOverlay() {
    if (document.getElementById('toddler-bedtime-overlay')) return;
    if (window.ToddlerAudio) {
      ToddlerAudio.startBGM('nap');
      ToddlerAudio.speak('Teddy is sleepy now! Good night, see you tomorrow!');
    }
    const overlay = document.createElement('div');
    overlay.id = 'toddler-bedtime-overlay';
    overlay.style.cssText = 'position:fixed; inset:0; z-index:200000; background:linear-gradient(180deg, #1A237E 0%, #0D47A1 60%, #1565C0 100%); color:#FFF; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px; text-align:center; font-family:var(--font-toddler, sans-serif);';
    overlay.innerHTML = `
      <div style="font-size:5.5rem; margin-bottom:10px; filter:drop-shadow(0 8px 20px rgba(0,0,0,0.4));">🧸💤🌙</div>
      <h2 style="font-size:1.85rem; font-weight:900; color:#FFF59D; margin-bottom:10px;">Bạn Gấu Bông Buồn Ngủ Rồi!</h2>
      <p style="font-size:1.1rem; font-weight:700; color:#E3F2FD; max-width:440px; line-height:1.5; margin-bottom:22px;">
        Đôi mắt xinh của bé đã học rất chăm chỉ! Bé cho bạn Gấu đi ngủ và nghỉ mắt một chút nhé, ngày mai mình lại chơi tiếp nha! 🌟
      </p>
      <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
        <button type="button" onclick="if(window.ToddlerAudio){ToddlerAudio.speak('Good night! Sweet dreams!');}" style="background:linear-gradient(135deg, #FFD54F, #FFB300); color:#3E2723; border:none; border-radius:40px; padding:14px 28px; font-size:1.15rem; font-weight:900; cursor:pointer; box-shadow:0 8px 20px rgba(0,0,0,0.3);">
          👋 Chúc Bạn Gấu Ngủ Ngon!
        </button>
        <button type="button" onclick="MissionEngine.setBedtimeTimer(10); document.getElementById('toddler-bedtime-overlay').remove(); if(window.ToddlerAudio){ToddlerAudio.startBGM('hub');}" style="background:rgba(255,255,255,0.14); color:#BBDEFB; border:2px solid rgba(255,255,255,0.3); border-radius:40px; padding:12px 20px; font-size:0.9rem; font-weight:700; cursor:pointer;">
          🔓 Mẹ cho chơi thêm 10 phút
        </button>
      </div>
    `;
    document.body.appendChild(overlay);
  }
};

if (typeof window !== 'undefined') {
  window.MissionEngine = MissionEngine;
  window.addEventListener('DOMContentLoaded', () => {
    if (MissionEngine.getBedtimeRemainingSec() !== null) {
      MissionEngine.startBedtimeWatcher();
    }
  });
}
