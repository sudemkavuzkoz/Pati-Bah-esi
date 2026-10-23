/**
 * Pati Bahçesi - Main Application Logic
 * Coordinates Pet State, Needs HUD, Interactions, Shop, and UI Modals.
 */

class PatiApp {
  constructor() {
    this.coins = 120;
    this.hearts = 45;
    this.activePetId = 'cat';
    this.activeAccessory = 'none';
    this.activeTheme = 'theme-garden';
    this.fedVariety = new Set();
    this.petStats = {};

    this.inventory = {
      hats: ['none'],
      themes: ['theme-garden']
    };

    // Progression & Customization State
    this.customNames = {};
    this.customPets = [];
    this.petXP = {};
    this.petLevels = {};

    this.newPetDraft = {
      species: 'cat',
      name: 'Lokum',
      primaryColor: '#fed7aa',
      accentColor: '#fb923c',
      personality: 'energetic'
    };

    // Load saved data
    this.loadGameState();

    // Subsystems
    this.questManager = new QuestManager(this);
    this.miniGame = new MiniGame(this);

    // DOM Elements Cache
    this.dom = {
      container: document.getElementById('game-app'),
      coinCount: document.getElementById('coin-count'),
      heartCount: document.getElementById('heart-count'),
      unlockedPetsCount: document.getElementById('unlocked-pets-count'),
      unlockedPetsCountBottom: document.getElementById('unlocked-pets-count-bottom'),
      petSvgContainer: document.getElementById('pet-svg-container'),
      petCharacterWrapper: document.getElementById('pet-character-wrapper'),
      petName: document.getElementById('current-pet-name'),
      petSpecies: document.getElementById('current-pet-species'),
      petLevel: document.getElementById('current-pet-level'),
      petMood: document.getElementById('current-pet-mood'),
      petXpFill: document.getElementById('pet-xp-fill'),
      petXpText: document.getElementById('pet-xp-text'),
      moodBubble: document.getElementById('mood-bubble'),
      bubbleText: document.getElementById('bubble-text'),
      petRoster: document.getElementById('pet-roster'),
      feedTray: document.getElementById('feed-tray'),
      themeToggleBtn: document.getElementById('theme-toggle-btn'),
      audioToggleBtn: document.getElementById('audio-toggle-btn'),
      audioIcon: document.getElementById('audio-icon'),
      helpBtn: document.getElementById('help-btn'),

      // Rename elements
      renamePetBtn: document.getElementById('rename-pet-btn'),
      renameModal: document.getElementById('rename-modal'),
      closeRenameBtn: document.getElementById('close-rename-btn'),
      cancelRenameBtn: document.getElementById('cancel-rename-btn'),
      saveRenameBtn: document.getElementById('save-rename-btn'),
      renameInputField: document.getElementById('rename-input-field'),
      renameRandomBtn: document.getElementById('rename-random-btn'),
      renamePetIcon: document.getElementById('rename-pet-icon'),
      renameSpeciesTag: document.getElementById('rename-species-tag'),
      renameOldName: document.getElementById('rename-old-name'),
      suggestionPills: document.getElementById('suggestion-pills'),

      // Add Pet elements
      addPetModal: document.getElementById('add-pet-modal'),
      openAddPetBtn: document.getElementById('add-new-pet-btn'),
      closeAddPetBtn: document.getElementById('close-add-pet-btn'),
      cancelAddPetBtn: document.getElementById('cancel-add-pet-btn'),
      confirmAddPetBtn: document.getElementById('confirm-add-pet-btn'),
      newPetSvgPreview: document.getElementById('new-pet-svg-preview'),
      previewPetNameDisplay: document.getElementById('preview-pet-name-display'),
      previewPetSpeciesDisplay: document.getElementById('preview-pet-species-display'),
      newPetNameInput: document.getElementById('new-pet-name-input'),
      randomNameBtn: document.getElementById('random-name-btn'),
      speciesPickerGrid: document.getElementById('species-picker-grid'),
      presetColorsWrap: document.getElementById('preset-colors-wrap'),
      newPetColorPicker: document.getElementById('new-pet-color-picker'),
      personalityChipsRow: document.getElementById('personality-chips-row'),

      // Care buttons
      btnFeed: document.getElementById('dock-btn-feed'),
      btnPet: document.getElementById('dock-btn-pet'),
      btnWash: document.getElementById('dock-btn-wash'),
      btnSleep: document.getElementById('dock-btn-sleep'),
      sleepBtnIcon: document.getElementById('sleep-btn-icon'),
      sleepBtnLabel: document.getElementById('sleep-btn-label'),
      btnMinigame: document.getElementById('dock-btn-minigame'),

      // Modals
      questsModal: document.getElementById('quests-modal'),
      openQuestsBtn: document.getElementById('open-quests-btn'),
      closeQuestsBtn: document.getElementById('close-quests-btn'),

      shopModal: document.getElementById('shop-modal'),
      openShopBtn: document.getElementById('open-shop-btn'),
      closeShopBtn: document.getElementById('close-shop-btn'),

      minigameModal: document.getElementById('minigame-modal'),
      closeMinigameBtn: document.getElementById('close-minigame-btn'),

      celebrationModal: document.getElementById('celebration-modal'),
      celebrationConfirmBtn: document.getElementById('celebration-confirm-btn'),
      celebratedPetPreview: document.getElementById('celebrated-pet-preview'),
      celebratedPetTitle: document.getElementById('celebrated-pet-title'),
      celebratedPetDesc: document.getElementById('celebrated-pet-desc'),
      confettiContainer: document.getElementById('confetti-container'),

      toast: document.getElementById('toast-notification'),
      toastMsg: document.getElementById('toast-msg'),
      toastIcon: document.getElementById('toast-icon')
    };

    this.init();
  }

  get stats() {
    return this.getPetStats(this.activePetId);
  }

  get isSleeping() {
    return !!this.getPetStats(this.activePetId).isSleeping;
  }

  set isSleeping(val) {
    this.getPetStats(this.activePetId).isSleeping = !!val;
  }

  getPetStats(petId = this.activePetId) {
    if (!this.petStats) {
      this.petStats = {};
    }
    if (!this.petStats[petId]) {
      const startingProfiles = {
        cat: { hunger: 75, happiness: 85, energy: 65, hygiene: 90, isSleeping: false },
        dog: { hunger: 55, happiness: 90, energy: 85, hygiene: 70, isSleeping: false },
        bunny: { hunger: 80, happiness: 80, energy: 70, hygiene: 95, isSleeping: false },
        fox: { hunger: 65, happiness: 85, energy: 80, hygiene: 75, isSleeping: false },
        panda: { hunger: 50, happiness: 80, energy: 55, hygiene: 85, isSleeping: false },
        dragon: { hunger: 90, happiness: 95, energy: 90, hygiene: 90, isSleeping: false },
        parrot: { hunger: 75, happiness: 85, energy: 85, hygiene: 80, isSleeping: false },
        hamster: { hunger: 60, happiness: 75, energy: 90, hygiene: 80, isSleeping: false }
      };
      const def = startingProfiles[petId] || { hunger: 75, happiness: 85, energy: 75, hygiene: 85, isSleeping: false };
      this.petStats[petId] = Object.assign({}, def);
    }
    return this.petStats[petId];
  }

  init() {
    this.setupTheme();
    this.updateHeaderStats();
    this.syncActivePetUI();
    this.renderPetRoster();
    this.questManager.renderQuestsList();
    this.questManager.updateQuestBadge();
    this.initEventListeners();
    this.initRenameModal();
    this.initAddPetModal();
    this.startDecayInterval();

    // Friendly greeting
    const pet = this.getActivePet();
    const stats = this.getPetStats(pet.id);
    if (stats.isSleeping) {
      this.setMoodText(`Zzz... ${pet.name} mışıl mışıl uyuyor... 💤`);
    } else {
      this.setMoodText(`Merhaba! Ben ${pet.name}. Bugün birlikte harika vakit geçirelim! 🐾`);
    }
  }

  syncActivePetUI() {
    const pet = this.getActivePet();
    const stats = this.getPetStats(pet.id);

    if (stats.isSleeping) {
      this.dom.sleepBtnIcon.textContent = '☀️';
      this.dom.sleepBtnLabel.textContent = 'Uyandır';
      this.renderActivePet('sleeping');
    } else {
      this.dom.sleepBtnIcon.textContent = '🌙';
      this.dom.sleepBtnLabel.textContent = 'Uyut';
      this.renderActivePet('normal');
    }

    this.updateNeedsDisplay();
    this.updatePetMood();
  }

  getActivePet() {
    let pet = PETS_DATABASE.find(p => p.id === this.activePetId);
    if (!pet || !pet.unlocked) {
      pet = PETS_DATABASE.find(p => p.unlocked) || PETS_DATABASE[0];
      if (pet) this.activePetId = pet.id;
    }
    return pet || PETS_DATABASE[0];
  }

  loadGameState() {
    const saved = localStorage.getItem('pati_save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.coins = data.coins ?? 120;
        this.hearts = data.hearts ?? 45;
        this.activePetId = data.activePetId ?? 'cat';
        this.activeAccessory = data.activeAccessory ?? 'none';
        this.activeTheme = data.activeTheme ?? 'theme-garden';
        this.inventory = Object.assign({ hats: ['none'], themes: ['theme-garden'] }, data.inventory || {});

        this.customNames = data.customNames ?? {};
        this.customPets = data.customPets ?? [];
        this.petXP = data.petXP ?? {};
        this.petLevels = data.petLevels ?? {};
        this.petStats = data.petStats ?? {};

        // Merge saved custom pets into PETS_DATABASE
        if (Array.isArray(this.customPets)) {
          this.customPets.forEach(cp => {
            if (!PETS_DATABASE.some(p => p.id === cp.id)) {
              PETS_DATABASE.push(cp);
            }
          });
        }

        // Apply saved custom names & levels & XP to PETS_DATABASE
        PETS_DATABASE.forEach(p => {
          if (this.customNames[p.id]) {
            p.name = this.customNames[p.id];
          }
          if (this.petLevels[p.id]) {
            p.level = this.petLevels[p.id];
          }
          if (this.petXP[p.id] !== undefined) {
            p.xp = this.petXP[p.id];
          } else if (p.xp === undefined) {
            p.xp = 25;
          }
        });

        // Migrate older single-stat save if needed
        if (data.stats && !this.petStats[this.activePetId]) {
          this.petStats[this.activePetId] = Object.assign({
            hunger: 70,
            happiness: 85,
            energy: 60,
            hygiene: 90,
            isSleeping: false
          }, data.stats);
        }

        if (data.unlockedPets && Array.isArray(data.unlockedPets)) {
          PETS_DATABASE.forEach(p => {
            if (data.unlockedPets.includes(p.id)) {
              p.unlocked = true;
            }
          });
        }
      } catch (e) {
        console.error('Failed to parse save game:', e);
      }
    } else {
      PETS_DATABASE.forEach(p => {
        if (p.xp === undefined) p.xp = 25;
        if (p.level === undefined) p.level = 1;
      });
    }
  }

  saveGameState() {
    const unlockedList = PETS_DATABASE.filter(p => p.unlocked).map(p => p.id);
    const data = {
      coins: this.coins,
      hearts: this.hearts,
      activePetId: this.activePetId,
      activeAccessory: this.activeAccessory,
      activeTheme: this.activeTheme,
      stats: this.stats,
      petStats: this.petStats,
      inventory: this.inventory,
      unlockedPets: unlockedList,
      customNames: this.customNames,
      customPets: this.customPets,
      petXP: this.petXP,
      petLevels: this.petLevels
    };
    localStorage.setItem('pati_save', JSON.stringify(data));
  }

  setupTheme() {
    this.dom.container.className = `game-container ${this.activeTheme}`;
  }

  updateHeaderStats() {
    this.dom.coinCount.textContent = this.coins;
    this.dom.heartCount.textContent = this.hearts;
    const unlockedCount = PETS_DATABASE.filter(p => p.unlocked).length;
    this.dom.unlockedPetsCount.textContent = unlockedCount;
    if (this.dom.unlockedPetsCountBottom) {
      this.dom.unlockedPetsCountBottom.textContent = unlockedCount;
    }
    this.saveGameState();
  }

  updateNeedsDisplay() {
    // Hunger
    document.getElementById('val-hunger').textContent = `${Math.round(this.stats.hunger)}%`;
    document.getElementById('bar-hunger').style.width = `${Math.round(this.stats.hunger)}%`;

    // Happiness
    document.getElementById('val-happiness').textContent = `${Math.round(this.stats.happiness)}%`;
    document.getElementById('bar-happiness').style.width = `${Math.round(this.stats.happiness)}%`;

    // Energy
    document.getElementById('val-energy').textContent = `${Math.round(this.stats.energy)}%`;
    document.getElementById('bar-energy').style.width = `${Math.round(this.stats.energy)}%`;

    // Hygiene
    document.getElementById('val-hygiene').textContent = `${Math.round(this.stats.hygiene)}%`;
    document.getElementById('bar-hygiene').style.width = `${Math.round(this.stats.hygiene)}%`;

    // Check perfect stats quest
    if (this.stats.hunger >= 90 && this.stats.happiness >= 90 && this.stats.energy >= 90 && this.stats.hygiene >= 90) {
      this.questManager.trackProgress('perfect_stats', 1);
    }
  }

  renderActivePet(emotion = 'normal') {
    const pet = this.getActivePet();
    this.dom.petName.textContent = pet.name;
    this.dom.petSpecies.textContent = pet.species;
    this.dom.petLevel.textContent = `Lv. ${pet.level || 1} Dost`;

    // Render XP
    const currentXp = pet.xp || 0;
    if (this.dom.petXpFill) {
      this.dom.petXpFill.style.width = `${Math.min(100, currentXp)}%`;
    }
    if (this.dom.petXpText) {
      this.dom.petXpText.textContent = `${Math.round(currentXp)}/100 XP`;
    }

    this.updatePetMood();

    const actualEmotion = this.isSleeping ? 'sleeping' : emotion;
    this.dom.petSvgContainer.innerHTML = PetRenderer.renderSVG(pet, actualEmotion, this.activeAccessory);

    if (this.isSleeping) {
      this.dom.petCharacterWrapper.classList.add('pet-sleeping');
    } else {
      this.dom.petCharacterWrapper.classList.remove('pet-sleeping');
    }
  }

  updatePetMood() {
    if (!this.dom.petMood) return;
    if (this.isSleeping) {
      this.dom.petMood.textContent = '💤 Uyuyor';
      this.dom.petMood.className = 'pet-mood-badge mood-sleepy';
    } else if (this.stats.hunger < 35) {
      this.dom.petMood.textContent = '😋 Acıkmış';
      this.dom.petMood.className = 'pet-mood-badge mood-hungry';
    } else if (this.stats.hygiene < 35) {
      this.dom.petMood.textContent = '🧼 Kirlenmiş';
      this.dom.petMood.className = 'pet-mood-badge mood-dirty';
    } else if (this.stats.energy < 30) {
      this.dom.petMood.textContent = '🥱 Uykulu';
      this.dom.petMood.className = 'pet-mood-badge mood-sleepy';
    } else if (this.stats.happiness >= 80) {
      this.dom.petMood.textContent = '😊 Çok Mutlu';
      this.dom.petMood.className = 'pet-mood-badge mood-happy';
    } else {
      this.dom.petMood.textContent = '🐾 Neşeli';
      this.dom.petMood.className = 'pet-mood-badge mood-normal';
    }
  }

  addPetXP(amount) {
    const pet = this.getActivePet();
    pet.xp = (pet.xp || 0) + amount;
    
    if (pet.xp >= 100) {
      pet.level = (pet.level || 1) + 1;
      pet.xp = pet.xp % 100;
      this.coins += 25;
      this.updateHeaderStats();
      this.showToast(`⭐ TEBRİKLER! ${pet.name} Lv. ${pet.level} oldu! +25 🪙 kazandın!`, '🎉');
      if (window.soundFX) window.soundFX.playCelebration();
    }

    this.petXP[pet.id] = pet.xp;
    this.petLevels[pet.id] = pet.level;

    if (this.dom.petXpFill) {
      this.dom.petXpFill.style.width = `${Math.min(100, pet.xp)}%`;
    }
    if (this.dom.petXpText) {
      this.dom.petXpText.textContent = `${Math.round(pet.xp)}/100 XP`;
    }
    this.dom.petLevel.textContent = `Lv. ${pet.level} Dost`;

    this.saveGameState();
  }

  setMoodText(text) {
    this.dom.bubbleText.textContent = text;
    this.dom.moodBubble.style.animation = 'none';
    void this.dom.moodBubble.offsetWidth;
    this.dom.moodBubble.style.animation = 'bounce-gentle 3s ease-in-out infinite';
  }

  showToast(message, icon = '✨') {
    this.dom.toastMsg.textContent = message;
    this.dom.toastIcon.textContent = icon;
    this.dom.toast.classList.remove('hidden');

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.toast.classList.add('hidden');
    }, 2800);
  }

  // Petting interaction
  petCurrentPet(e) {
    if (this.isSleeping) {
      this.showToast('Şşş... Dostun mışıl mışıl uyuyor! 🌙');
      return;
    }

    this.stats.happiness = Math.min(100, this.stats.happiness + 6);
    this.hearts += 1;
    this.addPetXP(10);
    this.updateHeaderStats();
    this.updateNeedsDisplay();

    // Procedural sound
    if (window.soundFX) {
      window.soundFX.playPop();
      if (Math.random() < 0.4) window.soundFX.playPurr();
    }

    // Emotion & quotes
    const pet = this.getActivePet();
    const quote = pet.quotes.petted[Math.floor(Math.random() * pet.quotes.petted.length)];
    this.setMoodText(quote);
    this.renderActivePet('petted');

    // Spawn floating heart
    this.spawnFloatingHeart(e);

    // Track quests
    this.questManager.trackProgress('pet', 1);
    this.questManager.trackProgress('accumulate_hearts', 1);

    setTimeout(() => {
      if (!this.isSleeping) this.renderActivePet('normal');
    }, 900);
  }

  spawnFloatingHeart(e) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const emojis = ['💖', '💕', '✨', '🐾', '🌸'];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2 - 40;

    if (e && e.clientX) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    heart.style.left = `${clientX - 15}px`;
    heart.style.top = `${clientY - 20}px`;
    heart.style.setProperty('--hx', `${(Math.random() - 0.5) * 60}px`);

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }

  // Feeding interaction
  feedPet(foodType) {
    if (this.isSleeping) {
      this.showToast('Uyurken yemek yiyemez! Önce uyandır. 🌙');
      return;
    }

    if (this.stats.hunger >= 100) {
      this.showToast('Göbüşü tamamen dolu! Daha fazla yiyemez. 🍱');
      return;
    }

    const foods = {
      kibble: { hunger: 15, happiness: 5, energy: 5, cost: 0, name: 'Kuru Mama' },
      fish: { hunger: 25, happiness: 15, energy: 10, cost: 0, name: 'Taze Balık' },
      carrot: { hunger: 20, happiness: 10, energy: 8, cost: 0, name: 'Çıtır Havuç' },
      cake: { hunger: 35, happiness: 30, energy: 15, cost: 10, name: 'Ödül Keki' }
    };

    const food = foods[foodType] || foods.kibble;

    if (food.cost > 0 && this.coins < food.cost) {
      this.showToast('Yeterli altının yok! Mini oyun oynayarak kazanabilirsin. 🪙', '⚠️');
      return;
    }

    if (food.cost > 0) {
      this.coins -= food.cost;
      this.updateHeaderStats();
    }

    this.stats.hunger = Math.min(100, this.stats.hunger + food.hunger);
    this.stats.happiness = Math.min(100, this.stats.happiness + food.happiness);
    this.stats.energy = Math.min(100, this.stats.energy + food.energy);
    this.addPetXP(15);

    this.fedVariety.add(foodType);

    if (window.soundFX) window.soundFX.playMunch();

    const pet = this.getActivePet();
    const quote = pet.quotes.fed[Math.floor(Math.random() * pet.quotes.fed.length)];
    this.setMoodText(quote);
    this.renderActivePet('eating');

    this.updateNeedsDisplay();
    this.showToast(`${food.name} ikram edildi! (+${food.hunger} Tokluk)`);

    // Track quests
    this.questManager.trackProgress('feed', 1);
    this.questManager.trackProgress('feed_variety', this.fedVariety.size);

    setTimeout(() => {
      if (!this.isSleeping) this.renderActivePet('normal');
    }, 1200);
  }

  // Bath / Wash interaction
  washPet() {
    if (this.isSleeping) {
      this.showToast('Uyuyan dostunu ıslatmak istemezsin! 😴');
      return;
    }

    if (this.stats.hygiene >= 100) {
      this.showToast('Zaten mis gibi köpük kokuyor! Pırıl pırıl. ✨');
      return;
    }

    this.stats.hygiene = Math.min(100, this.stats.hygiene + 30);
    this.stats.happiness = Math.min(100, this.stats.happiness + 8);
    this.addPetXP(20);
    this.updateNeedsDisplay();

    if (window.soundFX) window.soundFX.playBath();

    // Spawn bubbles
    const bubbleContainer = document.getElementById('soap-bubbles');
    for (let i = 0; i < 12; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'soap-bubble-item';
      const size = 16 + Math.random() * 26;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${30 + Math.random() * 180}px`;
      bubble.style.top = `${60 + Math.random() * 120}px`;
      bubble.style.setProperty('--tx', `${(Math.random() - 0.5) * 80}px`);
      bubble.style.setProperty('--ty', `-${40 + Math.random() * 80}px`);
      bubbleContainer.appendChild(bubble);

      setTimeout(() => bubble.remove(), 2000);
    }

    const pet = this.getActivePet();
    const quote = pet.quotes.washed[Math.floor(Math.random() * pet.quotes.washed.length)];
    this.setMoodText(quote);
    this.showToast('Mis gibi köpük banyosu yapıldı! (+30 Temizlik) 🛁');

    // Track quests
    this.questManager.trackProgress('wash', 1);
  }

  // Sleep toggle (Per-pet independent sleep state)
  toggleSleep() {
    const pet = this.getActivePet();
    const stats = this.getPetStats(pet.id);
    stats.isSleeping = !stats.isSleeping;

    if (stats.isSleeping) {
      this.dom.sleepBtnIcon.textContent = '☀️';
      this.dom.sleepBtnLabel.textContent = 'Uyandır';
      this.renderActivePet('sleeping');
      const quote = pet.quotes.sleep[Math.floor(Math.random() * pet.quotes.sleep.length)];
      this.setMoodText(quote);
      this.showToast(`${pet.name} şekerleme uykusuna daldı... Enerjisi doluyor. 💤`);

      // Track quest
      this.questManager.trackProgress('sleep', 1);
    } else {
      this.dom.sleepBtnIcon.textContent = '🌙';
      this.dom.sleepBtnLabel.textContent = 'Uyut';
      this.renderActivePet('normal');
      this.setMoodText(`Günaydın! ${pet.name} harika uyudu, enerjisi yenilendi! ⚡`);
      this.showToast(`${pet.name} uyandı! Güne hazır. ☀️`);
    }

    this.renderPetRoster();
    this.saveGameState();
  }

  // Pet Roster Switcher with Per-Pet Sleep Badge & Individual Progress
  renderPetRoster() {
    this.dom.petRoster.innerHTML = '';

    PETS_DATABASE.forEach(pet => {
      const card = document.createElement('div');
      const isActive = pet.id === this.activePetId;
      const petStats = this.getPetStats(pet.id);
      const isSleeping = pet.unlocked && petStats.isSleeping;

      card.className = `roster-card ${isActive ? 'active' : ''} ${!pet.unlocked ? 'locked' : ''} ${isSleeping ? 'pet-is-sleeping' : ''}`;

      let lockBadge = '';
      if (!pet.unlocked) {
        lockBadge = `<span class="roster-lock-badge">🔒</span>`;
      } else if (isSleeping) {
        lockBadge = `<span class="roster-sleep-badge" title="${pet.name} uyuyor">💤</span>`;
      }

      card.innerHTML = `
        ${lockBadge}
        <span class="roster-pet-icon">${pet.icon}</span>
        <span class="roster-pet-name">${pet.name}</span>
        ${pet.unlocked ? `<span class="roster-level-sub">Lv.${pet.level || 1}</span>` : ''}
      `;

      card.addEventListener('click', () => {
        if (!pet.unlocked) {
          const needed = pet.unlockRequirement ? pet.unlockRequirement.questsNeeded : 3;
          this.showToast(`🔒 ${pet.name} kilidini açmak için ${needed} görev tamamlamalısın!`, 'ℹ️');
          return;
        }

        if (this.activePetId !== pet.id) {
          this.activePetId = pet.id;
          if (window.soundFX) window.soundFX.playPop();
          this.syncActivePetUI();
          this.renderPetRoster();

          const currentStats = this.getPetStats(pet.id);
          if (currentStats.isSleeping) {
            this.setMoodText(`Zzz... ${pet.name} odasında mışıl mışıl uyuyor. İstersen 'Uyandır' butonuna basabilirsin. 💤`);
            this.showToast(`Şşş... ${pet.name} şu anda uyuyor. 🌙`);
          } else {
            const quote = pet.quotes.idle[Math.floor(Math.random() * pet.quotes.idle.length)];
            this.setMoodText(`Merhaba! Ben ${pet.name}. ${quote}`);
            this.showToast(`${pet.name} sahneye geldi! 🐾`);
          }
          this.saveGameState();
        }
      });

      this.dom.petRoster.appendChild(card);
    });

    // Add + Yeni Ekle card at the end of the roster
    const addCard = document.createElement('div');
    addCard.className = 'roster-card roster-add-card';
    addCard.id = 'roster-add-card';
    addCard.title = 'Yeni Bir Evcil Hayvan Tasarla ve Ekle!';
    addCard.innerHTML = `
      <span class="roster-pet-icon add-icon">➕</span>
      <span class="roster-pet-name">+ Yeni Ekle</span>
    `;
    addCard.addEventListener('click', () => {
      this.openAddPetModal();
    });
    this.dom.petRoster.appendChild(addCard);
  }

  // Celebration popup when a new pet is unlocked
  triggerPetCelebration(pet) {
    this.dom.celebratedPetPreview.innerHTML = PetRenderer.renderSVG(pet, 'happy');
    this.dom.celebratedPetTitle.textContent = `${pet.name} (${pet.species})`;
    this.dom.celebratedPetDesc.textContent = `Tebrikler! Görevleri tamamlayarak ${pet.name}'ın kilidini açtın. Artık barınağında seninle yaşayacak!`;

    // Confetti pieces
    this.dom.confettiContainer.innerHTML = '';
    const colors = ['#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#a855f7', '#fbbf24'];
    for (let i = 0; i < 45; i++) {
      const conf = document.createElement('div');
      conf.className = 'confetti-piece';
      conf.style.left = `${Math.random() * 100}%`;
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.setProperty('--cx', `${(Math.random() - 0.5) * 60}px`);
      conf.style.setProperty('--cx-end', `${(Math.random() - 0.5) * 200}px`);
      conf.style.animationDelay = `${Math.random() * 0.8}s`;
      this.dom.confettiContainer.appendChild(conf);
    }

    if (window.soundFX) window.soundFX.playCelebration();
    this.dom.celebrationModal.classList.remove('hidden');

    this.renderPetRoster();
    this.updateHeaderStats();
  }

  // Shop item population & purchasing
  openShop() {
    this.dom.shopModal.classList.remove('hidden');
    this.renderShopItems('hats');
  }

  renderShopItems(activeTab = 'hats') {
    const grid = document.getElementById('shop-items-grid');
    grid.innerHTML = '';

    const tabs = document.querySelectorAll('.shop-tab');
    tabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === activeTab);
    });

    if (activeTab === 'hats') {
      const hats = [
        { id: 'none', name: 'Süssüz / Sade', icon: '❌', desc: 'Aksesuarsız doğal görünüm', cost: 0 },
        { id: 'bow', name: 'Sevimli Fiyonk', icon: '🎀', desc: 'Şık ve tatlı pembe fiyonk', cost: 50 },
        { id: 'party_hat', name: 'Parti Şapkası', icon: '🎉', desc: 'Kutlamalar için renkli koni', cost: 80 },
        { id: 'crown', name: 'Kraliyet Tacı', icon: '👑', desc: 'Asil bir şampiyon tacı', cost: 150 },
        { id: 'flower', name: 'Çiçek Tacı', icon: '🌸', desc: 'Bahar esintisi getiren çiçekler', cost: 60 }
      ];

      hats.forEach(h => {
        const owned = this.inventory.hats.includes(h.id);
        const isEquipped = this.activeAccessory === h.id;

        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <span class="shop-item-preview">${h.icon}</span>
          <span class="shop-item-name">${h.name}</span>
          <span class="shop-item-desc">${h.desc}</span>
          <button class="shop-buy-btn ${isEquipped ? 'owned' : ''}">
            ${isEquipped ? 'Takılı ✨' : owned ? 'Kullan 🎀' : `Satın Al (${h.cost} 🪙)`}
          </button>
        `;

        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
          if (isEquipped) return;

          if (owned) {
            this.activeAccessory = h.id;
            this.renderActivePet('normal');
            this.renderShopItems('hats');
            this.showToast(`${h.name} takıldı! 🎀`);
            this.saveGameState();
            return;
          }

          if (this.coins < h.cost) {
            this.showToast('Yeterli altının yok! 🪙', '⚠️');
            return;
          }

          this.coins -= h.cost;
          this.inventory.hats.push(h.id);
          this.activeAccessory = h.id;
          if (window.soundFX) window.soundFX.playCoin();
          this.updateHeaderStats();
          this.renderActivePet('normal');
          this.renderShopItems('hats');
          this.showToast(`${h.name} satın alındı ve takıldı! 🎉`);

          // Track quest
          this.questManager.trackProgress('buy_item', 1);
        });

        grid.appendChild(card);
      });

    } else if (activeTab === 'themes') {
      const themes = [
        { id: 'theme-garden', name: 'Güneşli Bahçe', icon: '🌻', desc: 'Yeşil çimenler ve açık mavi gökyüzü', cost: 0 },
        { id: 'theme-room', name: 'Sıcak Oturma Odası', icon: '🛋️', desc: 'Huzurlu pastel oda ortamı', cost: 60 },
        { id: 'theme-night', name: 'Yıldızlı Gece', icon: '🌌', desc: 'Derin gökyüzü ve ay ışığı parıltısı', cost: 90 },
        { id: 'theme-forest', name: 'Büyülü Zümrüt Ormanı', icon: '🌲', desc: 'Doğanın kalbinde ferah yeşillik', cost: 120 }
      ];

      themes.forEach(t => {
        const owned = this.inventory.themes.includes(t.id);
        const isEquipped = this.activeTheme === t.id;

        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
          <span class="shop-item-preview">${t.icon}</span>
          <span class="shop-item-name">${t.name}</span>
          <span class="shop-item-desc">${t.desc}</span>
          <button class="shop-buy-btn ${isEquipped ? 'owned' : ''}">
            ${isEquipped ? 'Aktif 🏡' : owned ? 'Seç 🎨' : `Satın Al (${t.cost} 🪙)`}
          </button>
        `;

        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
          if (isEquipped) return;

          if (owned) {
            this.activeTheme = t.id;
            this.setupTheme();
            this.renderShopItems('themes');
            this.showToast(`${t.name} teması uygulandı! 🎨`);
            this.saveGameState();
            this.questManager.trackProgress('theme_change', 1);
            return;
          }

          if (this.coins < t.cost) {
            this.showToast('Yeterli altının yok! 🪙', '⚠️');
            return;
          }

          this.coins -= t.cost;
          this.inventory.themes.push(t.id);
          this.activeTheme = t.id;
          if (window.soundFX) window.soundFX.playCoin();
          this.updateHeaderStats();
          this.setupTheme();
          this.renderShopItems('themes');
          this.showToast(`${t.name} teması satın alındı ve uygulandı! 🎉`);

          this.questManager.trackProgress('buy_item', 1);
          this.questManager.trackProgress('theme_change', 1);
        });

        grid.appendChild(card);
      });
    }
  }

  cycleTheme() {
    const allThemes = ['theme-garden', 'theme-room', 'theme-night', 'theme-forest'];
    const currentIndex = allThemes.indexOf(this.activeTheme);
    const nextIndex = (currentIndex + 1) % allThemes.length;
    this.activeTheme = allThemes[nextIndex];
    if (!this.inventory.themes.includes(this.activeTheme)) {
      this.inventory.themes.push(this.activeTheme);
    }
    this.setupTheme();
    this.showToast(`Yeni Tema: ${this.activeTheme.replace('theme-', '').toUpperCase()} 🎨`);
    this.saveGameState();
    this.questManager.trackProgress('theme_change', 1);
  }

  // Periodic Needs Decay & Regeneration Loop (Runs per-pet independently!)
  startDecayInterval() {
    setInterval(() => {
      PETS_DATABASE.filter(p => p.unlocked).forEach(p => {
        const pStats = this.getPetStats(p.id);
        if (pStats.isSleeping) {
          // Recharge energy while sleeping
          pStats.energy = Math.min(100, pStats.energy + 4);
          pStats.hunger = Math.max(10, pStats.hunger - 0.4);
        } else {
          // Gentle decay during wakefulness
          pStats.hunger = Math.max(0, pStats.hunger - 1.0);
          pStats.happiness = Math.max(10, pStats.happiness - 0.7);
          pStats.energy = Math.max(5, pStats.energy - 0.5);
          pStats.hygiene = Math.max(10, pStats.hygiene - 0.4);
        }
      });

      this.updateNeedsDisplay();
      this.updatePetMood();
      this.saveGameState();
    }, 15000); // every 15 seconds
  }

  initEventListeners() {
    // Petting click / tap
    this.dom.petCharacterWrapper.addEventListener('click', (e) => {
      this.petCurrentPet(e);
    });

    // Mood bubble click
    this.dom.moodBubble.addEventListener('click', () => {
      const pet = this.getActivePet();
      const quote = pet.quotes.idle[Math.floor(Math.random() * pet.quotes.idle.length)];
      this.setMoodText(quote);
      if (window.soundFX) window.soundFX.playPop();
    });

    // Care dock buttons
    this.dom.btnFeed.addEventListener('click', () => {
      this.dom.feedTray.classList.toggle('hidden');
    });

    this.dom.btnPet.addEventListener('click', (e) => {
      this.petCurrentPet(e);
    });

    this.dom.btnWash.addEventListener('click', () => {
      this.washPet();
    });

    this.dom.btnSleep.addEventListener('click', () => {
      this.toggleSleep();
    });

    this.dom.btnMinigame.addEventListener('click', () => {
      this.miniGame.open();
    });

    // Food selection buttons
    const foodBtns = document.querySelectorAll('.food-item-btn');
    foodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const foodType = btn.getAttribute('data-food');
        this.feedPet(foodType);
      });
    });

    // Sound toggle
    this.dom.audioToggleBtn.addEventListener('click', () => {
      const enabled = window.soundFX.toggle();
      this.dom.audioIcon.textContent = enabled ? '🔊' : '🔇';
      this.showToast(enabled ? 'Sesler Açıldı 🔊' : 'Sesler Kapatıldı 🔇');
    });

    // Theme toggle
    this.dom.themeToggleBtn.addEventListener('click', () => {
      this.cycleTheme();
    });

    // Help button
    this.dom.helpBtn.addEventListener('click', () => {
      this.showToast('🐾 İpucu: Dostunu sev, karnını doyur, görevleri bitirip yeni hayvanları aç!');
    });

    // Quests modal
    this.dom.openQuestsBtn.addEventListener('click', () => {
      this.questManager.renderQuestsList();
      this.dom.questsModal.classList.remove('hidden');
    });
    this.dom.closeQuestsBtn.addEventListener('click', () => {
      this.dom.questsModal.classList.add('hidden');
    });

    // Shop modal
    this.dom.openShopBtn.addEventListener('click', () => {
      this.openShop();
    });
    this.dom.closeShopBtn.addEventListener('click', () => {
      this.dom.shopModal.classList.add('hidden');
    });

    const shopTabs = document.querySelectorAll('.shop-tab');
    shopTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.renderShopItems(tab.getAttribute('data-tab'));
      });
    });

    // Mini game close
    this.dom.closeMinigameBtn.addEventListener('click', () => {
      this.miniGame.close();
    });

    // Celebration modal confirmation
    this.dom.celebrationConfirmBtn.addEventListener('click', () => {
      this.dom.celebrationModal.classList.add('hidden');
      // Automatically switch to the latest unlocked pet
      const unlocked = PETS_DATABASE.filter(p => p.unlocked);
      const latest = unlocked[unlocked.length - 1];
      if (latest) {
        this.activePetId = latest.id;
        this.renderPetRoster();
        this.renderActivePet('happy');
        this.setMoodText(`Yeni yuvama merhaba! Ben ${latest.name}! Seni çok sevdim! 💕`);
        this.saveGameState();
      }
    });

    // Close modals on clicking overlay outside window
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          if (modal === this.dom.minigameModal) {
            this.miniGame.close();
          } else {
            modal.classList.add('hidden');
          }
        }
      });
    });
  }

  // ==========================================
  // RENAME PET MODAL LOGIC
  // ==========================================
  initRenameModal() {
    if (!this.dom.renameModal) return;

    // Open when rename button or pet name is clicked
    if (this.dom.renamePetBtn) {
      this.dom.renamePetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openRenameModal();
      });
    }

    if (this.dom.petName) {
      this.dom.petName.addEventListener('click', () => {
        this.openRenameModal();
      });
    }

    if (this.dom.closeRenameBtn) {
      this.dom.closeRenameBtn.addEventListener('click', () => {
        this.closeRenameModal();
      });
    }

    if (this.dom.cancelRenameBtn) {
      this.dom.cancelRenameBtn.addEventListener('click', () => {
        this.closeRenameModal();
      });
    }

    if (this.dom.renameRandomBtn) {
      this.dom.renameRandomBtn.addEventListener('click', () => {
        const rand = getRandomPetName();
        this.dom.renameInputField.value = rand;
        this.dom.renameInputField.focus();
        if (window.soundFX) window.soundFX.playPop();
      });
    }

    if (this.dom.saveRenameBtn) {
      this.dom.saveRenameBtn.addEventListener('click', () => {
        this.savePetRename();
      });
    }

    if (this.dom.renameInputField) {
      this.dom.renameInputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.savePetRename();
        }
      });
    }

    // Quick suggestion pills
    if (this.dom.suggestionPills) {
      this.dom.suggestionPills.addEventListener('click', (e) => {
        const pill = e.target.closest('.name-pill');
        if (pill) {
          this.dom.renameInputField.value = pill.textContent.trim();
          this.dom.renameInputField.focus();
          if (window.soundFX) window.soundFX.playPop();
        }
      });
    }
  }

  openRenameModal() {
    const pet = this.getActivePet();
    this.dom.renamePetIcon.textContent = pet.icon;
    this.dom.renameSpeciesTag.textContent = pet.species;
    this.dom.renameOldName.textContent = pet.name;
    this.dom.renameInputField.value = pet.name;
    this.dom.renameModal.classList.remove('hidden');
    setTimeout(() => {
      this.dom.renameInputField.focus();
      this.dom.renameInputField.select();
    }, 100);
  }

  closeRenameModal() {
    this.dom.renameModal.classList.add('hidden');
  }

  savePetRename() {
    const newName = this.dom.renameInputField.value.trim();
    if (!newName) {
      this.showToast('Lütfen geçerli bir isim yazın! 🐾', '⚠️');
      this.dom.renameInputField.focus();
      return;
    }

    const pet = this.getActivePet();
    pet.name = newName;
    this.customNames[pet.id] = newName;

    // If custom pet, also update in customPets list
    const customMatch = this.customPets.find(cp => cp.id === pet.id);
    if (customMatch) customMatch.name = newName;

    this.renderActivePet('happy');
    this.renderPetRoster();
    this.saveGameState();
    this.closeRenameModal();

    if (window.soundFX) window.soundFX.playCelebration();
    this.showToast(`Dostunun yeni adı "${newName}" olarak kaydedildi! 🐾`, '✨');
    this.setMoodText(`Yeni ismimi çok sevdim! Bana artık ${newName} diyebilirsin! 💕`);
  }

  // ==========================================
  // ADD NEW PET MODAL LOGIC
  // ==========================================
  initAddPetModal() {
    if (!this.dom.addPetModal) return;

    if (this.dom.openAddPetBtn) {
      this.dom.openAddPetBtn.addEventListener('click', () => {
        this.openAddPetModal();
      });
    }

    if (this.dom.closeAddPetBtn) {
      this.dom.closeAddPetBtn.addEventListener('click', () => {
        this.closeAddPetModal();
      });
    }

    if (this.dom.cancelAddPetBtn) {
      this.dom.cancelAddPetBtn.addEventListener('click', () => {
        this.closeAddPetModal();
      });
    }

    if (this.dom.confirmAddPetBtn) {
      this.dom.confirmAddPetBtn.addEventListener('click', () => {
        this.createAndAddNewPet();
      });
    }

    if (this.dom.randomNameBtn) {
      this.dom.randomNameBtn.addEventListener('click', () => {
        const rand = getRandomPetName();
        this.newPetDraft.name = rand;
        this.dom.newPetNameInput.value = rand;
        this.updateAddPetPreview();
        if (window.soundFX) window.soundFX.playPop();
      });
    }

    if (this.dom.newPetNameInput) {
      this.dom.newPetNameInput.addEventListener('input', (e) => {
        this.newPetDraft.name = e.target.value.trim() || 'Sevimli Dost';
        this.updateAddPetPreview();
      });
    }

    // Species selector chips
    if (this.dom.speciesPickerGrid) {
      this.dom.speciesPickerGrid.addEventListener('click', (e) => {
        const chip = e.target.closest('.species-chip');
        if (chip) {
          const speciesKey = chip.getAttribute('data-species');
          this.newPetDraft.species = speciesKey;

          // Update active chip style
          this.dom.speciesPickerGrid.querySelectorAll('.species-chip').forEach(c => {
            c.classList.toggle('active', c === chip);
          });

          // Set default color of species
          const cfg = SPECIES_CONFIG[speciesKey];
          if (cfg) {
            this.newPetDraft.primaryColor = cfg.defaultColor;
            this.newPetDraft.accentColor = cfg.accentColor;
            if (this.dom.newPetColorPicker) {
              this.dom.newPetColorPicker.value = cfg.defaultColor;
            }
          }

          this.updateAddPetPreview();
          if (window.soundFX) window.soundFX.playPop();
        }
      });
    }

    // Color Presets row
    if (this.dom.presetColorsWrap) {
      this.dom.presetColorsWrap.innerHTML = '';
      COLOR_PRESETS.forEach((preset, idx) => {
        const swatch = document.createElement('button');
        swatch.type = 'button';
        swatch.className = `color-swatch-btn ${idx === 0 ? 'active' : ''}`;
        swatch.style.backgroundColor = preset.primary;
        swatch.title = `${preset.name} (${preset.desc})`;
        swatch.innerHTML = `<span class="swatch-accent" style="background-color: ${preset.ears};"></span>`;

        swatch.addEventListener('click', () => {
          this.newPetDraft.primaryColor = preset.primary;
          this.newPetDraft.accentColor = preset.ears;
          if (this.dom.newPetColorPicker) {
            this.dom.newPetColorPicker.value = preset.primary;
          }
          this.dom.presetColorsWrap.querySelectorAll('.color-swatch-btn').forEach(s => s.classList.remove('active'));
          swatch.classList.add('active');
          this.updateAddPetPreview();
          if (window.soundFX) window.soundFX.playPop();
        });

        this.dom.presetColorsWrap.appendChild(swatch);
      });
    }

    // Custom Color Picker input
    if (this.dom.newPetColorPicker) {
      this.dom.newPetColorPicker.addEventListener('input', (e) => {
        this.newPetDraft.primaryColor = e.target.value;
        this.newPetDraft.accentColor = this.shadeColor(e.target.value, -25);
        if (this.dom.presetColorsWrap) {
          this.dom.presetColorsWrap.querySelectorAll('.color-swatch-btn').forEach(s => s.classList.remove('active'));
        }
        this.updateAddPetPreview();
      });
    }

    // Personality chips
    if (this.dom.personalityChipsRow) {
      this.dom.personalityChipsRow.addEventListener('click', (e) => {
        const chip = e.target.closest('.personality-chip');
        if (chip) {
          this.newPetDraft.personality = chip.getAttribute('data-personality');
          this.dom.personalityChipsRow.querySelectorAll('.personality-chip').forEach(c => {
            c.classList.toggle('active', c === chip);
          });
          this.updateAddPetPreview();
          if (window.soundFX) window.soundFX.playPop();
        }
      });
    }
  }

  shadeColor(color, percent) {
    if (!color || typeof color !== 'string' || !color.startsWith('#') || color.length < 7) {
      return '#fb923c';
    }
    let R = parseInt(color.substring(1,3), 16);
    let G = parseInt(color.substring(3,5), 16);
    let B = parseInt(color.substring(5,7), 16);
    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);
    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;
    R = Math.max(0, R); G = Math.max(0, G); B = Math.max(0, B);
    const RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16));
    return '#' + RR + GG + BB;
  }

  openAddPetModal() {
    this.newPetDraft.name = getRandomPetName();
    if (this.dom.newPetNameInput) {
      this.dom.newPetNameInput.value = this.newPetDraft.name;
    }
    this.updateAddPetPreview();
    this.dom.addPetModal.classList.remove('hidden');
    if (window.soundFX) window.soundFX.playPop();
  }

  closeAddPetModal() {
    this.dom.addPetModal.classList.add('hidden');
  }

  updateAddPetPreview() {
    const speciesInfo = SPECIES_CONFIG[this.newPetDraft.species] || SPECIES_CONFIG.cat;
    const name = this.newPetDraft.name || 'Sevimli Dost';

    this.dom.previewPetNameDisplay.textContent = name;
    
    let personalityLabel = 'Enerjik';
    if (this.newPetDraft.personality === 'sleepy') personalityLabel = 'Uykucu';
    else if (this.newPetDraft.personality === 'curious') personalityLabel = 'Meraklı';
    else if (this.newPetDraft.personality === 'foodie') personalityLabel = 'Gurme';

    this.dom.previewPetSpeciesDisplay.textContent = `${speciesInfo.name} • ${personalityLabel} 🐾`;

    const mockPet = {
      template: this.newPetDraft.species,
      colors: {
        primary: this.newPetDraft.primaryColor,
        secondary: '#ffffff',
        ears: this.newPetDraft.accentColor,
        innerEar: '#fbcfe8',
        cheeks: '#f472b6',
        eyes: '#1e293b'
      }
    };

    this.dom.newPetSvgPreview.innerHTML = PetRenderer.renderSVG(mockPet, 'happy');
  }

  createAndAddNewPet() {
    const name = this.dom.newPetNameInput.value.trim();
    if (!name) {
      this.showToast('Lütfen evcil hayvanına bir isim ver! 🐾', '⚠️');
      this.dom.newPetNameInput.focus();
      return;
    }

    const speciesInfo = SPECIES_CONFIG[this.newPetDraft.species] || SPECIES_CONFIG.cat;
    const newId = 'custom_' + Date.now();

    const newPet = {
      id: newId,
      template: this.newPetDraft.species,
      name: name,
      species: speciesInfo.name,
      icon: speciesInfo.icon,
      level: 1,
      xp: 0,
      unlocked: true,
      unlockRequirement: null,
      unlockOrder: PETS_DATABASE.length + 1,
      personality: this.newPetDraft.personality,
      isCustom: true,
      quotes: generateQuotesForPersonality(this.newPetDraft.personality, name),
      colors: {
        primary: this.newPetDraft.primaryColor,
        secondary: '#ffffff',
        ears: this.newPetDraft.accentColor,
        innerEar: '#fbcfe8',
        cheeks: '#f472b6',
        eyes: '#1e293b'
      }
    };

    // Add to PETS_DATABASE & customPets array
    PETS_DATABASE.push(newPet);
    this.customPets.push(newPet);
    this.customNames[newId] = name;
    this.petLevels[newId] = 1;
    this.petXP[newId] = 0;
    this.petStats[newId] = {
      hunger: 80,
      happiness: 90,
      energy: 85,
      hygiene: 90,
      isSleeping: false
    };

    this.closeAddPetModal();
    this.activePetId = newId;

    this.syncActivePetUI();
    this.renderPetRoster();
    this.renderActivePet('happy');
    this.updateHeaderStats();
    this.saveGameState();

    // Trigger celebration popup
    this.triggerPetCelebration(newPet);
    this.showToast(`🎉 ${name} barınağa katıldı! Hoş geldin sevimli dostum!`, '✨');
  }
}

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new PatiApp();
});
