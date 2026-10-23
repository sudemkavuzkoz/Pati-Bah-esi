/**
 * Pati Bahçesi - Quest & Progression Engine
 * Tracks user actions, claims rewards, and unlocks new pets!
 */

const INITIAL_QUESTS = [
  {
    id: 'q_feed_first',
    title: 'İlk Ziyafet',
    desc: 'Dostunu lezzetli bir mamayla 2 kez besle.',
    targetType: 'feed',
    targetCount: 2,
    currentCount: 0,
    rewardCoins: 30,
    rewardHearts: 15,
    completed: false,
    claimed: false,
    icon: '🍱'
  },
  {
    id: 'q_pet_love',
    title: 'Pati Sevgisi',
    desc: 'Dostunun başını okşayıp 5 kez sev.',
    targetType: 'pet',
    targetCount: 5,
    currentCount: 0,
    rewardCoins: 25,
    rewardHearts: 20,
    completed: false,
    claimed: false,
    icon: '💖'
  },
  {
    id: 'q_minigame_starter',
    title: 'Lezzet Yağmuru Şampiyonu',
    desc: 'Mini oyunda en az 40 puan topla.',
    targetType: 'minigame_score',
    targetCount: 40,
    currentCount: 0,
    rewardCoins: 45,
    rewardHearts: 25,
    completed: false,
    claimed: false,
    icon: '🎮'
  },
  {
    id: 'q_wash_pet',
    title: 'Köpük Banyosu',
    desc: 'Dostunu mis gibi köpüklerle yıka ve temizliğini artır.',
    targetType: 'wash',
    targetCount: 1,
    currentCount: 0,
    rewardCoins: 30,
    rewardHearts: 15,
    completed: false,
    claimed: false,
    icon: '🛁'
  },
  {
    id: 'q_sweet_dreams',
    title: 'Tatlı Rüyalar',
    desc: 'Işıkları kapat ve dostunu şekerleme uykusuna yatır.',
    targetType: 'sleep',
    targetCount: 1,
    currentCount: 0,
    rewardCoins: 35,
    rewardHearts: 20,
    completed: false,
    claimed: false,
    icon: '🌙'
  },
  {
    id: 'q_shop_buyer',
    title: 'Şık ve Sevimli',
    desc: 'Pati Dükkanı’ndan dostun için bir şapka veya süs al.',
    targetType: 'buy_item',
    targetCount: 1,
    currentCount: 0,
    rewardCoins: 50,
    rewardHearts: 30,
    completed: false,
    claimed: false,
    icon: '🛍️'
  },
  {
    id: 'q_variety_food',
    title: 'Gurme Damak',
    desc: 'En az 3 kez farklı yiyecekler ikram et.',
    targetType: 'feed_variety',
    targetCount: 3,
    currentCount: 0,
    rewardCoins: 40,
    rewardHearts: 25,
    completed: false,
    claimed: false,
    icon: '🐟'
  },
  {
    id: 'q_high_score',
    title: 'Refleks Ustası',
    desc: 'Mini oyunda tek seferde 90 puan rekoru kır.',
    targetType: 'minigame_score',
    targetCount: 90,
    currentCount: 0,
    rewardCoins: 65,
    rewardHearts: 40,
    completed: false,
    claimed: false,
    icon: '⚡'
  },
  {
    id: 'q_total_hearts',
    title: 'Büyük Sevgi Çemberi',
    desc: 'Toplam 75 Sevgi Kalbi topla.',
    targetType: 'accumulate_hearts',
    targetCount: 75,
    currentCount: 0,
    rewardCoins: 80,
    rewardHearts: 50,
    completed: false,
    claimed: false,
    icon: '🌟'
  },
  {
    id: 'q_theme_change',
    title: 'Yeni Manzara',
    desc: 'Barınağın ortam temasını değiştir.',
    targetType: 'theme_change',
    targetCount: 1,
    currentCount: 0,
    rewardCoins: 30,
    rewardHearts: 20,
    completed: false,
    claimed: false,
    icon: '🎨'
  },
  {
    id: 'q_perfect_care',
    title: 'Kusursuz Barınak',
    desc: 'Dostunun tüm ihtiyaçlarını %90 üzerine çıkar.',
    targetType: 'perfect_stats',
    targetCount: 1,
    currentCount: 0,
    rewardCoins: 100,
    rewardHearts: 60,
    completed: false,
    claimed: false,
    icon: '👑'
  }
];

class QuestManager {
  constructor(app) {
    this.app = app;
    this.quests = [];
    this.loadQuests();
  }

  loadQuests() {
    const saved = localStorage.getItem('pati_quests');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with template to allow updates
        this.quests = INITIAL_QUESTS.map(initial => {
          const found = parsed.find(q => q.id === initial.id);
          return found ? { ...initial, ...found } : { ...initial };
        });
      } catch (e) {
        this.quests = JSON.parse(JSON.stringify(INITIAL_QUESTS));
      }
    } else {
      this.quests = JSON.parse(JSON.stringify(INITIAL_QUESTS));
    }
  }

  saveQuests() {
    localStorage.setItem('pati_quests', JSON.stringify(this.quests));
  }

  /**
   * Dispatches progress on specific action types
   */
  trackProgress(actionType, amount = 1) {
    let stateChanged = false;

    this.quests.forEach(quest => {
      if (quest.completed) return;

      if (quest.targetType === actionType) {
        if (actionType === 'minigame_score') {
          // If score is higher than current record
          if (amount > quest.currentCount) {
            quest.currentCount = amount;
            stateChanged = true;
          }
        } else {
          quest.currentCount += amount;
          stateChanged = true;
        }

        if (quest.currentCount >= quest.targetCount) {
          quest.currentCount = quest.targetCount;
          quest.completed = true;
          this.app.showToast(`🎉 Görev Tamamlandı: "${quest.title}"!`);
          if (window.soundFX) window.soundFX.playPop();
        }
      }
    });

    if (stateChanged) {
      this.saveQuests();
      this.renderQuestsList();
      this.updateQuestBadge();
      this.checkPetUnlocks();
    }
  }

  getCompletedCount() {
    return this.quests.filter(q => q.claimed || q.completed).length;
  }

  getClaimableCount() {
    return this.quests.filter(q => q.completed && !q.claimed).length;
  }

  /**
   * Checks whether the current completed quest count unlocks any new pet
   */
  checkPetUnlocks() {
    const completedCount = this.getCompletedCount();
    
    // Find next locked pet
    const lockedPets = PETS_DATABASE.filter(p => !p.unlocked);
    
    lockedPets.forEach(pet => {
      if (pet.unlockRequirement && completedCount >= pet.unlockRequirement.questsNeeded) {
        pet.unlocked = true;
        this.app.saveGameState();
        this.app.triggerPetCelebration(pet);
      }
    });

    this.updateUnlockBanner();
  }

  getNextUnlockablePet() {
    return PETS_DATABASE.find(p => !p.unlocked);
  }

  updateUnlockBanner() {
    const bannerEl = document.getElementById('unlock-banner');
    const avatarEl = document.getElementById('next-pet-silhouette');
    const nameEl = document.getElementById('next-pet-name');
    const barEl = document.getElementById('unlock-progress-bar');
    const textEl = document.getElementById('unlock-progress-text');

    if (!bannerEl) return;

    const nextPet = this.getNextUnlockablePet();
    const completedCount = this.getCompletedCount();

    if (!nextPet) {
      // All pets unlocked!
      avatarEl.textContent = '👑';
      nameEl.textContent = 'Tüm Dostlar Barınakta!';
      barEl.style.width = '100%';
      textEl.textContent = 'Tüm evcil hayvanların kilidi açık! Muhteşem bir bakıcısın.';
      return;
    }

    const needed = (nextPet.unlockRequirement && nextPet.unlockRequirement.questsNeeded) ? nextPet.unlockRequirement.questsNeeded : 3;
    const pct = Math.min(100, Math.round((completedCount / needed) * 100));

    avatarEl.textContent = nextPet.icon;
    nameEl.textContent = `${nextPet.name} (${nextPet.species.split(' ')[0]})`;
    barEl.style.width = `${pct}%`;
    textEl.textContent = `${completedCount} / ${needed} Görev Tamamlandı (${pct}%)`;
  }

  updateQuestBadge() {
    const badgeEl = document.getElementById('quest-alert-dot');
    const previewEl = document.getElementById('quest-preview-text');
    const claimable = this.getClaimableCount();

    if (!badgeEl || !previewEl) return;

    if (claimable > 0) {
      badgeEl.style.display = 'flex';
      badgeEl.textContent = claimable;
      previewEl.textContent = `${claimable} Ödül Hazır! 🎁`;
    } else {
      const activeUncompleted = this.quests.filter(q => !q.completed).length;
      badgeEl.style.display = 'none';
      previewEl.textContent = activeUncompleted > 0 ? `${activeUncompleted} Görev Var` : 'Tüm Görevler Bitti!';
    }
  }

  claimReward(questId) {
    const quest = this.quests.find(q => q.id === questId);
    if (!quest || !quest.completed || quest.claimed) return;

    quest.claimed = true;
    this.app.coins += quest.rewardCoins;
    this.app.hearts += quest.rewardHearts;
    
    if (window.soundFX) window.soundFX.playCoin();
    this.app.showToast(`🪙 +${quest.rewardCoins} Altın & 💖 +${quest.rewardHearts} Sevgi Kazandın!`);
    
    this.saveQuests();
    this.app.updateHeaderStats();
    this.renderQuestsList();
    this.updateQuestBadge();
    this.checkPetUnlocks();
  }

  renderQuestsList() {
    const container = document.getElementById('quests-list');
    if (!container) return;

    container.innerHTML = '';

    this.quests.forEach(quest => {
      const card = document.createElement('div');
      card.className = `quest-item-card ${quest.completed ? 'completed' : ''}`;

      const progressPct = Math.min(100, Math.round((quest.currentCount / quest.targetCount) * 100));

      let actionSection = '';
      if (quest.claimed) {
        actionSection = `<span class="quest-status-done">✅ Tamamlandı</span>`;
      } else if (quest.completed) {
        actionSection = `<button class="claim-reward-btn" data-qid="${quest.id}">Ödülü Al 🎁</button>`;
      } else {
        actionSection = `
          <div class="quest-reward">
            <span>🪙 +${quest.rewardCoins}</span>
            <span>💖 +${quest.rewardHearts}</span>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="quest-left">
          <div class="quest-icon-box">${quest.icon}</div>
          <div class="quest-details">
            <span class="quest-title">${quest.title}</span>
            <span class="quest-desc">${quest.desc}</span>
            <div class="quest-progress-bar-mini" title="${quest.currentCount}/${quest.targetCount}">
              <div class="quest-fill-mini" style="width: ${progressPct}%;"></div>
            </div>
          </div>
        </div>
        <div class="quest-right">
          ${actionSection}
        </div>
      `;

      // Event listener for claiming
      const claimBtn = card.querySelector('.claim-reward-btn');
      if (claimBtn) {
        claimBtn.addEventListener('click', () => {
          this.claimReward(quest.id);
        });
      }

      container.appendChild(card);
    });

    this.updateUnlockBanner();
  }
}

window.QuestManager = QuestManager;
