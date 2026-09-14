// ===== Data =====
const messageAr = "بحبك يكل حاجة في حياتي وحقك عليا لو ضايقتك  تعالي نفتكر كل حاجة بينا هنا ونبدأ بداية جديدة";
const messageEn = "I love you with everything in my life, and you have every right over me if I ever hurt you. Come, let's remember everything between us here and start a new beginning";

const finalAr = "ملك... من أول يوم كلمتك فيه في عيد ميلادك، وأنا عارف إنك هتبقي حاجة كبيرة في حياتي. كل لحظة معاكِ بتعلمي إن الحب الحقيقي مش كلام، ده إحساس. بحبك يا ملك، بحبك بجنون، بحبك لدرجة إني مش قادر أتخيل يوم من غيرك. إنتي نوري، إنتي حياتي، إنتي كل حاجة.";
const finalEn = "Malak... From the first day I talked to you on your birthday, I knew you would become something big in my life. Every moment with you teaches me that true love isn't words, it's a feeling. I love you Malak, I love you madly, I love you to the point where I can't imagine a day without you. You are my light, my life, my everything.";

const galleryData = [
  { img: 'media/p1.jpg', ar: 'خطواتنا سوا', en: 'Our steps together' },
  { img: 'media/p2.jpg', ar: 'إيديك في إيديا', en: 'Your hand in mine' },
  { img: 'media/p3.jpg', ar: 'أول باقة ورد', en: 'First bouquet' },
  { img: 'media/p4.jpg', ar: 'أحلى سيلفي', en: 'Sweetest selfie' },
  { img: 'media/p5.jpg', ar: 'قلبنا مع بعض', en: 'Our hearts together' },
  { img: 'media/p6.jpg', ar: 'فلتر الحب', en: 'Love filter' },
  { img: 'media/p7.jpg', ar: 'ابتسامتك نور عيني', en: 'Your smile' },
  { img: 'media/p8.jpg', ar: 'مراية حبنا', en: 'Mirror of love' }
];

const startDate = new Date('2025-04-06T00:00:00');

// ===== Floating Hearts =====
function createFloatingHearts() {
  const bg = document.getElementById('heartsBg');
  const hearts = ['❤','💕','💗','💓','💖'];
  for (let i = 0; i < 25; i++) {
    const h = document.createElement('div');
    h.className = 'heart-float';
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = Math.random() * 100 + '%';
    h.style.animationDuration = (8 + Math.random() * 12) + 's';
    h.style.animationDelay = Math.random() * 10 + 's';
    h.style.fontSize = (16 + Math.random() * 24) + 'px';
    bg.appendChild(h);
  }
}

// ===== Burst Hearts =====
function burstHearts(e) {
  const hearts = ['❤','💕','','💗','💓'];
  for (let i = 0; i < 15; i++) {
    const h = document.createElement('div');
    h.className = 'burst-heart';
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = e.clientX + 'px';
    h.style.top = e.clientY + 'px';
    const angle = (Math.PI * 2 * i) / 15;
    const dist = 80 + Math.random() * 100;
    h.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    h.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1500);
  }
}

// ===== Navigation =====
function goToScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  target.classList.add('active');
  target.scrollTop = 0;
  
  if (id === 'screen-message') startTypewriter();
  if (id === 'screen-memory') startCounter();
  if (id === 'screen-gallery') buildGallery();
  if (id === 'screen-final') startFinalTypewriter();
}

// ===== Password =====
function checkPassword() {
  const input = document.getElementById('passwordInput').value.trim().toLowerCase();
  if (input === 'love') {
    goToScreen('screen-message');
    setTimeout(() => startMusic(), 500);
  } else {
    const box = document.querySelector('.password-box');
    box.classList.add('shake');
    setTimeout(() => box.classList.remove('shake'), 400);
    document.getElementById('passwordInput').value = '';
  }
}

document.getElementById('passwordInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') checkPassword();
});

// ===== Typewriter =====
function typeWriter(el, text, speed, callback) {
  el.innerHTML = '<span class="cursor"></span>';
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      el.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
      i++;
    } else {
      el.innerHTML = text;
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

function startTypewriter() {
  const arEl = document.getElementById('msgAr');
  const enEl = document.getElementById('msgEn');
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.classList.remove('show');
  
  typeWriter(arEl, messageAr, 60, () => {
    setTimeout(() => {
      typeWriter(enEl, messageEn, 40, () => {
        setTimeout(() => nextBtn.classList.add('show'), 500);
      });
    }, 400);
  });
}

function startFinalTypewriter() {
  const arEl = document.getElementById('finalAr');
  const enEl = document.getElementById('finalEn');
  
  typeWriter(arEl, finalAr, 50, () => {
    setTimeout(() => {
      typeWriter(enEl, finalEn, 35, () => {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            burstHearts({ clientX: window.innerWidth/2, clientY: window.innerHeight/2 });
          }, i * 300);
        }
      });
    }, 400);
  });
}

// ===== Counter =====
function updateCounter() {
  const now = new Date();
  const diff = now - startDate;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  
  document.getElementById('cDays').textContent = String(days).padStart(3, '0');
  document.getElementById('cHours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cMins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cSecs').textContent = String(secs).padStart(2, '0');
}

function startCounter() {
  updateCounter();
  setInterval(updateCounter, 1000);
}

// ===== Gallery =====
function buildGallery() {
  const container = document.getElementById('galleryContainer');
  const nextBtn = document.getElementById('galleryNextBtn');
  
  if (container.children.length > 0) {
    nextBtn.classList.add('show');
    return;
  }
  
  galleryData.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <img class="gallery-img" src="${item.img}" alt="memory" onerror="this.style.background='linear-gradient(135deg, #ffe0ec, #ffc2d4)'">
      <div class="gallery-caption">${item.ar}</div>
      <div class="gallery-caption-en">${item.en}</div>
    `;
    container.appendChild(div);
    
    setTimeout(() => {
      div.classList.add('show');
    }, idx * 300);
  });
  
  setTimeout(() => {
    nextBtn.style.display = 'inline-block';
    nextBtn.classList.add('show');
  }, galleryData.length * 300 + 500);
}

// ===== Music =====
let musicStarted = false;

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  
  const player = document.getElementById('musicPlayer');
  player.classList.add('show');
  
  const audio = document.getElementById('bgMusic');
  audio.volume = 0.5;
  
  audio.play().then(() => {
    player.classList.add('playing');
    document.getElementById('playIcon').style.display = 'none';
    document.getElementById('pauseIcon').style.display = 'block';
  }).catch(e => {
    console.log('Audio autoplay blocked');
  });
}

function togglePlay() {
  const audio = document.getElementById('bgMusic');
  const player = document.getElementById('musicPlayer');
  
  if (audio.paused) {
    audio.play();
    player.classList.add('playing');
    document.getElementById('playIcon').style.display = 'none';
    document.getElementById('pauseIcon').style.display = 'block';
  } else {
    audio.pause();
    player.classList.remove('playing');
    document.getElementById('playIcon').style.display = 'block';
    document.getElementById('pauseIcon').style.display = 'none';
  }
}

// ===== Init =====
createFloatingHearts();
