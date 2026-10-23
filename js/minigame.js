/**
 * Pati Bahçesi - "Lezzet Yağmuru" (Treats Rain) Mini-game
 * Smooth 60FPS Canvas arcade game where you catch falling treats.
 */

class MiniGame {
  constructor(app) {
    this.app = app;
    this.canvas = document.getElementById('minigame-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.modal = document.getElementById('minigame-modal');
    this.overlay = document.getElementById('mg-overlay');
    this.startBtn = document.getElementById('mg-start-btn');
    this.scoreDisplay = document.getElementById('mg-score-val');
    this.timeDisplay = document.getElementById('mg-time-val');
    this.livesDisplay = document.getElementById('mg-lives-display');
    this.overlayTitle = document.getElementById('mg-overlay-title');
    this.overlayDesc = document.getElementById('mg-overlay-desc');
    this.overlayIcon = document.getElementById('mg-overlay-icon');

    this.isPlaying = false;
    this.score = 0;
    this.timeLeft = 30;
    this.lives = 3;
    this.timerInterval = null;
    this.animationId = null;

    // Basket / Player
    this.player = {
      x: 300,
      y: 330,
      width: 90,
      height: 40,
      targetX: 300,
      speed: 0.25
    };

    // Falling entities
    this.items = [];
    this.particles = [];
    this.spawnTimer = 0;
    this.spawnInterval = 35; // frames

    this.initEvents();
  }

  initEvents() {
    this.startBtn.addEventListener('click', () => {
      this.startGame();
    });

    const moveHandler = (clientX) => {
      if (!this.isPlaying) return;
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const mouseX = (clientX - rect.left) * scaleX;
      this.player.targetX = Math.max(this.player.width / 2, Math.min(this.canvas.width - this.player.width / 2, mouseX));
    };

    this.canvas.addEventListener('mousemove', (e) => moveHandler(e.clientX));
    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        moveHandler(e.touches[0].clientX);
        e.preventDefault();
      }
    }, { passive: false });
  }

  open() {
    this.modal.classList.remove('hidden');
    this.resetToTitle();
  }

  close() {
    this.endGame(false);
    this.modal.classList.add('hidden');
  }

  resetToTitle() {
    this.isPlaying = false;
    this.overlay.classList.remove('hidden');
    this.overlayIcon.textContent = '🎮';
    this.overlayTitle.textContent = 'Lezzet Yağmuru!';
    this.overlayDesc.textContent = 'Düşen lezzetli ödülleri yakala, çürük balıklardan kaçın! 30 saniyen var.';
    this.startBtn.textContent = 'Oyuna Başla 🚀';
    this.scoreDisplay.textContent = '0';
    this.timeDisplay.textContent = '30s';
    this.livesDisplay.textContent = '❤️❤️❤️';
    this.drawIntroFrame();
  }

  startGame() {
    this.isPlaying = true;
    this.score = 0;
    this.timeLeft = 30;
    this.lives = 3;
    this.items = [];
    this.particles = [];
    this.player.x = this.canvas.width / 2;
    this.player.targetX = this.player.x;

    this.overlay.classList.add('hidden');
    this.updateHUD();

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateHUD();
      if (this.timeLeft <= 0) {
        this.endGame(true);
      }
    }, 1000);

    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.loop();
  }

  updateHUD() {
    this.scoreDisplay.textContent = this.score;
    this.timeDisplay.textContent = `${this.timeLeft}s`;
    let hearts = '';
    for (let i = 0; i < this.lives; i++) hearts += '❤️';
    for (let i = this.lives; i < 3; i++) hearts += '🖤';
    this.livesDisplay.textContent = hearts;
  }

  spawnItem() {
    const types = [
      { emoji: '🐟', points: 10, isHazard: false, speed: 2.5, size: 28 },
      { emoji: '🥕', points: 15, isHazard: false, speed: 3.0, size: 28 },
      { emoji: '🧁', points: 25, isHazard: false, speed: 3.5, size: 32 },
      { emoji: '⭐', points: 50, isHazard: false, speed: 4.2, size: 30 },
      { emoji: '🦴', points: 20, isHazard: false, speed: 3.2, size: 28 },
      { emoji: '💀', points: -1, isHazard: true, speed: 3.8, size: 30 }, // Hazard: loses a life
      { emoji: '⚡', points: 30, isHazard: false, speed: 4.5, size: 28 }
    ];

    // 25% chance of hazard
    const isHazard = Math.random() < 0.22;
    let chosen;
    if (isHazard) {
      chosen = types.find(t => t.isHazard);
    } else {
      const benign = types.filter(t => !t.isHazard);
      chosen = benign[Math.floor(Math.random() * benign.length)];
    }

    this.items.push({
      x: 30 + Math.random() * (this.canvas.width - 60),
      y: -20,
      ...chosen,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.08
    });
  }

  addParticles(x, y, color = '#facc15') {
    for (let i = 0; i < 8; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.8) * 6,
        size: 3 + Math.random() * 4,
        color: color,
        life: 1.0,
        decay: 0.04 + Math.random() * 0.03
      });
    }
  }

  loop() {
    if (!this.isPlaying) return;

    this.update();
    this.draw();

    this.animationId = requestAnimationFrame(() => this.loop());
  }

  update() {
    // Smooth interpolate player
    this.player.x += (this.player.targetX - this.player.x) * this.player.speed;

    // Spawner
    this.spawnTimer++;
    if (this.spawnTimer > this.spawnInterval) {
      this.spawnItem();
      this.spawnTimer = 0;
      // Slight acceleration over time
      if (this.timeLeft < 15 && this.spawnInterval > 22) {
        this.spawnInterval--;
      }
    }

    // Update items
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.y += it.speed;
      it.rotation += it.rotSpeed;

      // Collision with basket
      const basketLeft = this.player.x - this.player.width / 2;
      const basketRight = this.player.x + this.player.width / 2;
      const basketTop = this.player.y - 15;
      const basketBottom = this.player.y + 20;

      if (it.y >= basketTop && it.y <= basketBottom && it.x >= basketLeft && it.x <= basketRight) {
        if (it.isHazard) {
          // Hazard hit!
          this.lives--;
          if (window.soundFX) window.soundFX.playHazard();
          this.addParticles(it.x, it.y, '#ef4444');
          this.updateHUD();

          if (this.lives <= 0) {
            this.endGame(true);
            return;
          }
        } else {
          // Point catch!
          this.score += it.points;
          if (window.soundFX) window.soundFX.playCatch();
          this.addParticles(it.x, it.y, '#f59e0b');
          this.updateHUD();
        }

        this.items.splice(i, 1);
        continue;
      }

      // Out of bounds
      if (it.y > this.canvas.height + 30) {
        this.items.splice(i, 1);
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background stars & glow
    this.ctx.fillStyle = '#1e293b';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Ground line
    this.ctx.fillStyle = '#0f172a';
    this.ctx.fillRect(0, this.canvas.height - 25, this.canvas.width, 25);

    // Falling items
    this.ctx.font = '28px serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.items.forEach(it => {
      this.ctx.save();
      this.ctx.translate(it.x, it.y);
      this.ctx.rotate(it.rotation);
      this.ctx.fillText(it.emoji, 0, 0);
      this.ctx.restore();
    });

    // Particles
    this.particles.forEach(p => {
      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw Player / Basket with active pet theme
    const px = this.player.x;
    const py = this.player.y;
    const pw = this.player.width;
    const ph = this.player.height;

    // Basket body
    this.ctx.fillStyle = '#f59e0b';
    this.ctx.beginPath();
    this.ctx.roundRect(px - pw / 2, py, pw, ph, [0, 0, 16, 16]);
    this.ctx.fill();

    // Basket rim
    this.ctx.fillStyle = '#d97706';
    this.ctx.beginPath();
    this.ctx.roundRect(px - pw / 2 - 4, py - 6, pw + 8, 10, [4, 4, 4, 4]);
    this.ctx.fill();

    // Pet icon sitting in basket
    const activePet = this.app.getActivePet();
    this.ctx.font = '24px serif';
    this.ctx.fillText(activePet ? activePet.icon : '🐾', px, py - 14);
  }

  drawIntroFrame() {
    this.ctx.fillStyle = '#1e293b';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#64748b';
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Hazır olduğunda "Oyuna Başla" butonuna bas!', this.canvas.width / 2, this.canvas.height / 2);
  }

  endGame(completed = true) {
    this.isPlaying = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.animationId) cancelAnimationFrame(this.animationId);

    if (completed) {
      const earnedCoins = Math.max(10, Math.floor(this.score * 0.8));
      const earnedHearts = Math.max(5, Math.floor(this.score * 0.4));

      this.app.coins += earnedCoins;
      this.app.hearts += earnedHearts;

      // Boost happiness of pet
      const earnedXP = Math.max(15, Math.floor(this.score * 0.5));
      const pet = this.app.getActivePet();
      if (pet) {
        this.app.stats.happiness = Math.min(100, this.app.stats.happiness + 25);
        this.app.addPetXP(earnedXP);
      }

      this.app.updateHeaderStats();
      this.app.updateNeedsDisplay();

      // Track quest
      this.app.questManager.trackProgress('minigame_score', this.score);

      if (window.soundFX) window.soundFX.playCelebration();

      this.overlay.classList.remove('hidden');
      this.overlayIcon.textContent = '🏆';
      this.overlayTitle.textContent = `Tebrikler! Skor: ${this.score}`;
      this.overlayDesc.textContent = `Kazanılan: +${earnedCoins} 🪙, +${earnedHearts} 💖, +${earnedXP} ⭐ XP! Dostunun mutluluğu arttı!`;
      this.startBtn.textContent = 'Tekrar Oyna 🔄';
    }
  }
}

window.MiniGame = MiniGame;
