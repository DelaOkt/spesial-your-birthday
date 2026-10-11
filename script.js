
// ===============================
// 🎵 SISTEM MUSIK WEBSITE
// ===============================

const backgroundMusic = new Audio("assets/audio/backsound.mp3");
const favoriteMusic = new Audio("assets/audio/favorite-song.mp3");
const birthdayMusic = new Audio("assets/audio/happy-birthday.mp3");

backgroundMusic.loop = true;

backgroundMusic.volume = 0.35;
favoriteMusic.volume = 0.8;
birthdayMusic.volume = 0.8;

backgroundMusic.preload = "auto";
favoriteMusic.preload = "auto";
birthdayMusic.preload = "auto";

let musicStarted = false;
let activeMusic = null;


function stopAllMusic() {
  [backgroundMusic, favoriteMusic, birthdayMusic].forEach((audio) => {
    audio.pause();
  });

  activeMusic = null;
}

async function playMusic(audio) {
  if (activeMusic === audio && !audio.paused) return;

  // Hentikan musik lain tanpa mengulang dari awal
[backgroundMusic, favoriteMusic, birthdayMusic].forEach((track) => {
  if (track !== audio) {
    track.pause();
  }
});

activeMusic = audio;

  try {
    await audio.play();
  } catch (error) {
    console.log("Musik belum bisa diputar:", error);
    activeMusic = null;
  }
}

function updateSceneMusic(scene) {
  if (!musicStarted) return;

  
if (scene.label === "A SONG FOR YOU") {
  extra.classList.remove("hidden");

  extra.innerHTML = `
    <div class="romantic-player visible" id="romanticPlayer">
      <div class="record-scene">
        <span class="record-sparkle one">✧</span>
        <span class="record-sparkle two">♡</span>
        <span class="record-sparkle three">✦</span>

        <div class="vinyl-record" id="vinylRecord">
          <div class="vinyl-label">♡</div>
        </div>
      </div>

      <p class="song-caption">A little song for you</p>
      <p class="song-subcaption" id="songStatus">
        a song you might like ♡
      </p>

      <button class="song-control" id="playFavoriteSong">
        ▶ Putar lagu kita
      </button>
    </div>
  `;

  const player = document.getElementById("romanticPlayer");
  const record = document.getElementById("vinylRecord");
  const status = document.getElementById("songStatus");
  const playButton = document.getElementById("playFavoriteSong");

  function updateFavoritePlayer() {
    const isPlaying =
      activeMusic === favoriteMusic && !favoriteMusic.paused;

    player.classList.toggle("playing", isPlaying);
    record.classList.toggle("playing", isPlaying);

    playButton.textContent = isPlaying
      ? "Ⅱ Jeda lagu"
      : "▶ Putar lagu kita";

    status.textContent = isPlaying
      ? "now playing, just for you ♡"
      : "a song that reminds me of you ♡";
  }

  playButton.addEventListener("click", async () => {
    if (activeMusic === favoriteMusic && !favoriteMusic.paused) {
      favoriteMusic.pause();
      updateFavoritePlayer();
      return;
    }

    await playMusic(favoriteMusic);
    updateFavoritePlayer();
  });

  favoriteMusic.addEventListener("play", updateFavoritePlayer);
  favoriteMusic.addEventListener("pause", updateFavoritePlayer);
  favoriteMusic.addEventListener("ended", updateFavoritePlayer);

  updateFavoritePlayer();
}


  if (scene.label === "HAPPY BIRTHDAY") {
    playMusic(birthdayMusic);
    return;
  }

  // Scene lainnya menggunakan backsound
  playMusic(backgroundMusic);
}

const celebrationLayer = document.createElement("div");
celebrationLayer.className = "celebration-layer";
celebrationLayer.setAttribute("aria-hidden", "true");
document.body.appendChild(celebrationLayer);

let celebrationTimer;

function startBirthdayParty() {
  clearTimeout(celebrationTimer);
  celebrationLayer.innerHTML = "";
  document.body.classList.add("birthday-mode");

  // Balon pastel terbang dari bawah layar
  const balloons = ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"];

  balloons.forEach((emoji, i) => {
    const balloon = document.createElement("span");
    balloon.className = "balloon";
    balloon.textContent = emoji;

    balloon.style.setProperty("--balloon-left", `${4 + i * 12}%`);
    balloon.style.setProperty("--balloon-delay", `${i * 0.35}s`);
    balloon.style.setProperty("--balloon-speed", `${7 + (i % 3)}s`);
    balloon.style.setProperty(
      "--balloon-size",
      `${38 + (i % 3) * 9}px`
    );

    celebrationLayer.appendChild(balloon);
  });

  // Confetti warna pink, peach, emas, dan ungu pastel
  const colors = [
    "#f18caf", "#ffd166", "#f7b79d",
    "#c7a4e8", "#ffffff", "#e7a5bc"
  ];

  for (let i = 0; i < 65; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";

    piece.style.setProperty(
      "--confetti-left",
      `${Math.random() * 100}%`
    );
    piece.style.setProperty(
      "--confetti-color",
      colors[i % colors.length]
    );
    piece.style.setProperty(
      "--confetti-size",
      `${5 + Math.random() * 6}px`
    );
    piece.style.setProperty(
      "--confetti-speed",
      `${3 + Math.random() * 3}s`
    );
    piece.style.setProperty(
      "--confetti-delay",
      `${Math.random() * 2}s`
    );

    celebrationLayer.appendChild(piece);
  }

  // Confetti selesai; balon tetap boleh terbang sebentar
  celebrationTimer = setTimeout(() => {
    celebrationLayer
      .querySelectorAll(".confetti")
      .forEach(piece => piece.remove());
  }, 7000);
}

function stopBirthdayParty() {
  clearTimeout(celebrationTimer);
  document.body.classList.remove("birthday-mode");
  celebrationLayer.innerHTML = "";
}



const memories = [
  {
    title: "Momen Ngeselin",
    text: "20/03/2026\n Apakah abang ingat ini? Momen dimana abang menghitung jatuhku berapa kali_-.",
    file: "assets/photos/foto1.jpeg",
    type: "photo"
  },
  {
    title: "Momen Belajar",
    text: "15/03/2026\n Abang ingat? ini adalah momen dimana abang menjadikan aku sebagai moderator Mount Enjoy. Abang yang mengajariku cara menggunakan command itu.",
    file: "assets/videos/video1.mp4",
    type: "video"
  },
  {
    title: "Momen Nungguin",
    text: "13/05/2026\n Nah ini, orang lagi main malah tiduran disini. Wkwkwk saking mengantuknya ya bang?",
    file: "assets/photos/foto2.jpeg",
    type: "photo"
  },
  {
    title: "Momen Mengantuk",
    text: "21/04/2026\n Ingat ini juga tidak? Aku invite abang malam-malam buat carry aku karena ngantuk, ehh malah abang juga ngantuk hahaha.",
    file: "assets/videos/video2.mp4",
    type: "video"
  },
  {
    title: "Momen Iseng",
    text: "04/04/2026\n Ingat kah dengan ini? Mount Mustahil abang yang summitnya masih ada ayamnya. Momen dimana abang masih suka nendang-nendang aku enih :v.",
    file: "assets/photos/foto3.jpeg",
    type: "photo"
  },
  {
    title: "Momen Sepeda",
    text: "18/03/2026\n Nah kalau ini waktu main Sawah Indo, dibonceng abang keliling pake sepeda, mana abang kesambar pulak itu ireng ahahha.",
    file: "assets/videos/video3.mp4",
    type: "video"
  },
  {
    title: "Momen Flashback",
    text: "27/05/2026\n Ini sih pas main bertiga ya satunya si bontot Kay. Tapi kalau liat ava abang yang ini keinget pertama ketemu abang pake ava ini di Mount Kaka Pink bulan Januari dulu, sampe aku kira abang wanita hehe, maaf.",
    file: "assets/photos/foto4.jpeg",
    type: "photo"
  },
  {
    title: "Momen Konser",
    text: "24/04/2026\n Kalau yang ini di Mount Mager abang, ada kasur-kasurnya tuh (kalau tidak salah ingat ya hehe). Ini lagi konser apa ya kita?",
    file: "assets/videos/video4.mp4",
    type: "video"
  },
  {
    title: "Momen Ugem",
    text: "01/04/2026\n Yang ini sih aku yang ajak abang ke map Dermaga (Map Tamu Undangan yang dulu pernah keban). Semua Map Tamu Undangan pasti sudah pernah abang mainin soalnya selalu ku ajak hehe.",
    file: "assets/photos/foto5.jpeg",
    type: "photo"
  },
  {
    title: "Momen Api",
    text: "07/04/2026\n Last deh hehe, biar ga kepanjangan. Abang ingat ini? Abang yang ngasih aku akses dan izin untuk ngehancurin Mount Demam, karena posisi aku lagi nangis waktu itu?",
    file: "assets/videos/video5.mp4",
    type: "video"
  }
];


const scenes = [
  {
    label: "A SPECIAL MESSAGE",
    title: "Alooo Assalamu'alaikum Abanggg",
    message: "Ada sesuatu nih buat abang. Tapi bukanya jangan buru-buru yaa hehe ☺️",
    button: "Klik di sini 💐",
    flower: "🌷"
  },

  {
    label: "EITSS, BENTAR DULU",
    title: "Hehehe, jangan buru-buru atuh",
    message: "Tenanggg, ini bukan tugas, bukan ujian, apalagi tagihan 😭\nAku cuma mau kasih sesuatu buat abang.",
    button: "Oke, lanjut 👀",
    flower: "🎀"
  },
  {
    label: "A LITTLE STORIE",
    title: "Tau tidak bang?",
    message: "Kalau di ingat-ingat ya abang, kita udah 9 bulan lebih berteman, terus akrab, dan juga dekat, lama juga ya? Iyain aja udah, kalau tidak aku majokk hehe.\nLumayan banyak juga ya cerita, obrolan, dan hal random di antaranya.",
    button: "Terusss? 🤔",
    flower: "💌"
  },
  {
    label: "OUR LITTLE MEMORIES",
    title: "Ada beberapa hal yang aku simpan",
    message: "Jadi aku kumpulin beberapa kenangan di sini. Lihat satu-satu yaa, jangan di-skip semua nanti aku majok 😤.",
    button: "Lihat kenangan →",
    flower: "📸"
  },
  ...memories.map((memory, index) => ({
    label: `MEMORY ${String(index + 1).padStart(2, "0")} / ${memories.length}`,
    title: memory.title,
    message: memory.text,
    button: index === memories.length - 1 ? "Ada lagi nih →" : "Kenangan berikutnya →",
    flower: "♡",
    file: memory.file,
    type: memory.type
  })),
  {
    label: "A SONG FOR YOU",
    title: "Kalau lagu ini diputar...",
    message: "Ada salah satu lagu yang mungkin abang suka, coba abang dengerin kira-kira lagu apa? 🎶",
    button: "Lanjut dulu 🎵",
    flower: "🎧"
  },
  {
    label: "A LITTLE NOTE",
    title: "Sebenernya aku mau bilang...",
    message: "Bilang apa ya? Nanti ajadehh yaa, lanjut dulu aja gasih yekann 🤭.",
    button: "Satu kejutan lagi →",
    flower: "💌"
  },
  {
    label: "HAPPY BIRTHDAY",
    title: "Barakallah Fii Umrik Abanggg! 🎂🥳💐",
    message: "Mudah-mudahan hal-hal baik selalu menemukan abang, semoga sehat dan bahagia selalu, dan semoga apa yang lagi abang usahakan bisa pelan-pelan tercapai, serta jadi pribadi yang lebih baik lagi., aamiin ☺️♡",
    button: "Ehh... ada satu lagi",
    flower: "🎂"
  },
  {
    label: "JUST ONE LAST THING",
    title: "Terima kasih ya, abang ☺️♡",
    message: "Terima kasih sudah hadir dan jadi bagian dari cerita yang lama ini, senang bisa kenal sama abang ☺️. Semoga di hari yang spesial ini abang selalu ngerasa disayang dan punya banyak alasan buat senyum. Semoga abang selalu dalam lindungan Allah SWT., dan dijauhkan dari segala marabahaya, aamiin ✨. ",
    button: "Buka pesan rahasia 💗",
    flower: "🧸"
  },
  {
    label: "SECRET MESSAGE",
    title: "Ini khusus buat abang",
    message: "Ada orang yang kehadirannya bikin hari biasa jadi punya cerita. Dan hari ini, aku cuma ingin abang tahu kalau abang itu salah satunya 💗. Terima kasih ya abang sudah selalu kuat selama ini. Abang tidak sendirian kok, banyak yang sayang sama abang. Aku tau banyak impian yang diam-diam abang usahain, aku yakin semua itu akan terwujud. Semangat ya abang, aku selalu mendoakan yang terbaik buat abang. Hidup lebih lama lagi ya abang 🤍☺️. Udah ah nanti kepanjangan lagi kasian abang bacanya hehe, sekali lagi Selamat Ulang Tahun yang ke-27 tahun Abang 🥳💐🤍☺️.",
    button: "Ulangi dari awal ↺",
    flower: "💖"
  }
];

let current = 0;

const popup = document.getElementById("popup");
const title = document.getElementById("title");
const message = document.getElementById("message");
const stepLabel = document.getElementById("stepLabel");
const media = document.getElementById("media");
const extra = document.getElementById("extra");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const progress = document.getElementById("progress");
const flower = document.querySelector(".flower");

function renderScene() {
  const scene = scenes[current];

if (scene.label === "HAPPY BIRTHDAY") {
  startBirthdayParty();
} else {
  stopBirthdayParty();
}


  popup.classList.remove("changing");
  void popup.offsetWidth;
  popup.classList.add("changing");

  stepLabel.textContent = scene.label;
  title.textContent = scene.title;
  message.textContent = scene.message;
  nextBtn.textContent = scene.button;
  flower.textContent = scene.flower;

  backBtn.classList.toggle("hidden", current === 0);

  progress.innerHTML = "";
  const totalDots = 5;
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("span");
    const activeDot = Math.min(
      totalDots - 1,
      Math.floor((current / (scenes.length - 1)) * totalDots)
    );
    if (i === activeDot) dot.classList.add("active");
    progress.appendChild(dot);
  }

  media.innerHTML = "";
  media.classList.add("hidden");

  
if (scene.file) {
  media.classList.remove("hidden");

  if (scene.type === "video") {
    const video = document.createElement("video");
    video.src = scene.file;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";

    video.onerror = () => {
      media.innerHTML = `
        <div class="memory-placeholder">
          <span>🎬</span>
          <span>Video kenangan akan muncul di sini</span>
        </div>`;
    };

    media.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = scene.file;
    img.alt = scene.title;

    img.onerror = () => {
      media.innerHTML = `
        <div class="memory-placeholder">
          <span>📷</span>
          <span>Foto kenangan akan muncul di sini</span>
        </div>`;
    };

    media.appendChild(img);
  }
}


  
extra.classList.add("hidden");
extra.innerHTML = "";

if (scene.label === "HAPPY BIRTHDAY") {
  extra.classList.remove("hidden");

  extra.innerHTML = `
    <div class="birthday-cake">
      <div class="cake-emoji">
        🎂 <span class="candle-flame" id="candleFlame">🔥</span>
      </div>

      <p style="color:#c65f82; margin:8px 0 14px;">
        Make a wish dulu yaa 💗
      </p>

      <button class="blow-button" id="blowCandle">
        Tiup lilinnya! 💨
      </button>

      <div id="birthdayWish" class="birthday-wish" hidden>
        ✨ Yeay, lilinnya udah padam! ✨<br>
        Semoga semua harapan baikmu<br>
        satu per satu jadi nyata. ♡
      </div>
    </div>
  `;

  const blowButton = document.getElementById("blowCandle");
  const flame = document.getElementById("candleFlame");
  const wish = document.getElementById("birthdayWish");

  blowButton.addEventListener("click", () => {
    flame.classList.add("out");
    blowButton.disabled = true;
    blowButton.textContent = "Sudah ditiup! 💗";

    
setTimeout(() => {
  flame.textContent = "";

  // Kilauan kecil menyebar dari sekitar kue
  const cake = document.querySelector(".birthday-cake");
  const sparkleSymbols = ["✨", "✦", "💖", "⭐", "✧"];

  for (let i = 0; i < 14; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "wish-sparkle";
    sparkle.textContent =
      sparkleSymbols[i % sparkleSymbols.length];

    sparkle.style.left = `${15 + Math.random() * 70}%`;
    sparkle.style.top = `${15 + Math.random() * 55}%`;

    sparkle.style.setProperty(
      "--move-x",
      `${(Math.random() - 0.5) * 100}px`
    );
    sparkle.style.setProperty(
      "--move-y",
      `${-30 - Math.random() * 65}px`
    );

    cake.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1300);
  }

  wish.hidden = false;
  blowButton.textContent = "Wish made! ♡";
}, 400);

  });
}

if (current === scenes.length - 1) {
  nextBtn.textContent = "Mulai lagi ♡";
}

// 🎧 Tombol lagu favorit
if (scene.label === "A SONG FOR YOU") {
  extra.classList.remove("hidden");

  extra.innerHTML = `
    <div class="favorite-song-box">
      <p>🎧 A little song for you ♡</p>
      <button id="playFavoriteSong" class="blow-button">
        Putar lagu kita 🎶
      </button>
    </div>
  `;

  const playButton = document.getElementById("playFavoriteSong");

  playButton.addEventListener("click", async () => {
    if (activeMusic === favoriteMusic && !favoriteMusic.paused) {
      favoriteMusic.pause();
      playButton.textContent = "Lanjutkan lagu ▶️";
      return;
    }

    await playMusic(favoriteMusic);

    if (!favoriteMusic.paused) {
      playButton.textContent = "Jeda lagu ⏸️";
    } else {
      playButton.textContent = "Putar lagu kita 🎶";
    }
  });
}

// 🎵 Sesuaikan musik dengan scene aktif
updateSceneMusic(scene);

}

nextBtn.addEventListener("click", () => {
  if (current === scenes.length - 1) {
    current = 0;
  } else {
    current++;
  }
  musicStarted = true;
  renderScene();
});

backBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    renderScene();
  }
});

renderScene();

