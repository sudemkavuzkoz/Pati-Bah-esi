/**
 * Pati Bahçesi - Pets Definition & Procedural 2D Vector Rendering
 * Modern minimalist 2D style with expressive states.
 */

const PETS_DATABASE = [
  {
    id: 'cat',
    name: 'Pamuk',
    species: 'Tekir Kedi 🐾',
    icon: '🐱',
    level: 1,
    unlocked: true,
    unlockRequirement: null,
    unlockOrder: 1,
    quotes: {
      idle: ['Miyav! Güneş çok tatlı vuruyor...', 'Tırmalama tahtam nerede acaba?', 'Karnım hafiften acıkıyor gibi!', 'Beni biraz okşar mısın?'],
      fed: ['Mırmır! Bu balık nefisti!', 'Çok lezzetliydi, teşekkür ederim!', 'Göbüşüm doydu!'],
      petted: ['Mırrrr... Tam arkamdan kaşı lütfen!', 'Çok seviyorum seni!', 'Gözlerim huzurdan kapandı...'],
      washed: ['Pırıl pırıl oldum, tüylerim parlıyor!', 'Mis gibi köpük kokuyorum!'],
      sleep: ['Zzz... Yumuşacık rüyalar...', 'Şekerleme vakti!']
    },
    colors: {
      primary: '#fed7aa',
      secondary: '#ffffff',
      ears: '#fb923c',
      innerEar: '#f472b6',
      cheeks: '#fbcfe8',
      eyes: '#1e293b'
    }
  },
  {
    id: 'dog',
    name: 'Fındık',
    species: 'Shiba Inu 🐕',
    icon: '🐶',
    level: 1,
    unlocked: false,
    unlockRequirement: { questsNeeded: 2, title: '2 Görev Tamamla' },
    unlockOrder: 2,
    quotes: {
      idle: ['Hav hav! Enerjim tavan!', 'Hadi bahçede top koşturalım!', 'Kuyruğumu kovalıyorum yine!', 'Yeni bir maceraya hazır mısın?'],
      fed: ['Hammm! Kemik ve mama zamanı harika!', 'Karnım doydu, şimdi oyun zamanı!'],
      petted: ['Kuyruğum fırıl fırıl dönüyor!', 'En iyi dostum sensin!', 'Kulağımın arkasını sevmene bayılıyorum!'],
      washed: ['Hadi kurulanıp silkeleneyim!', 'Köpükler havada uçuşuyor!'],
      sleep: ['Hav... Zzz... Rüyalarda top peşinde koşuyorum...']
    },
    colors: {
      primary: '#f59e0b',
      secondary: '#fef3c7',
      ears: '#d97706',
      innerEar: '#fbcfe8',
      cheeks: '#fed7aa',
      eyes: '#1e293b'
    }
  },
  {
    id: 'bunny',
    name: 'Pufi',
    species: 'Lop Tavşan 🐰',
    icon: '🐰',
    level: 1,
    unlocked: false,
    unlockRequirement: { questsNeeded: 4, title: '4 Görev Tamamla' },
    unlockOrder: 3,
    quotes: {
      idle: ['Burnum kıpır kıpır kokluyor!', 'Taze çıtır bir havuç var mı?', 'Zıp zıp zıplamak istiyorum!', 'Kulaklarım çok yumuşak değil mi?'],
      fed: ['Kıtır kıtır! Havuç en sevdiğim!', 'Ne tatlı bir ziyafet!'],
      petted: ['Pıt pıt kalbim heyecanla atıyor!', 'Beni kucağına al!'],
      washed: ['Ilık suyla banyo yapmak pamuk gibi hissettiriyor!'],
      sleep: ['Zzz... Havuç tarlasında uyuyorum...']
    },
    colors: {
      primary: '#fce7f3',
      secondary: '#ffffff',
      ears: '#f472b6',
      innerEar: '#fda4af',
      cheeks: '#f43f5e',
      eyes: '#475569'
    }
  },
  {
    id: 'fox',
    name: 'Kızıl',
    species: 'Akıllı Tilki 🦊',
    icon: '🦊',
    level: 1,
    unlocked: false,
    unlockRequirement: { questsNeeded: 6, title: '6 Görev Tamamla' },
    unlockOrder: 4,
    quotes: {
      idle: ['Ormanın derinliklerinden sana selam getirdim!', 'Gözlerim karanlıkta bile parlar!', 'Akıllı numaralarımı görmek ister misin?'],
      fed: ['Enfes! Tilkiler iyi yemekten anlar!'],
      petted: ['Kabarık kuyruğumu okşayabilirsin!'],
      washed: ['Kızıl kürküm güneş gibi parıldıyor!'],
      sleep: ['Zzz... Ormanın sessiz huzuru...']
    },
    colors: {
      primary: '#ea580c',
      secondary: '#ffffff',
      ears: '#1e293b',
      innerEar: '#fed7aa',
      cheeks: '#fdba74',
      eyes: '#0f172a'
    }
  },
  {
    id: 'panda',
    name: 'Bambu',
    species: 'Kızıl Panda 🐼',
    icon: '🐾',
    level: 1,
    unlocked: false,
    unlockRequirement: { questsNeeded: 8, title: '8 Görev Tamamla' },
    unlockOrder: 5,
    quotes: {
      idle: ['Dallara tırmanmayı çok özledim!', 'Pofuduk kuyruğum yastık gibi!', 'Birlikte biraz kestirelim mi?'],
      fed: ['Taze bambu filizleri gibi leziz!'],
      petted: ['Ayıcıktan farksızım, sarıl bana!'],
      washed: ['Tertemiz bir panda barınağa neşe katar!'],
      sleep: ['Zzz... Bir ağaç dalına sarılmışım gibi...']
    },
    colors: {
      primary: '#c2410c',
      secondary: '#fef3c7',
      ears: '#ffffff',
      innerEar: '#431407',
      cheeks: '#fed7aa',
      eyes: '#1e293b'
    }
  },
  {
    id: 'dragon',
    name: 'Lümin',
    species: 'Büyülü Ejderha 🐉',
    icon: '✨',
    level: 1,
    unlocked: false,
    unlockRequirement: { questsNeeded: 11, title: 'Tüm Görevleri Bitir' },
    unlockOrder: 6,
    quotes: {
      idle: ['Gözlerimde yıldız tozları parıldıyor!', 'Ufak bir kıvılcım ister misin? Puf!', 'Barınağın en büyülü dostuyum!'],
      fed: ['Alev gibi sıcak ve leziz! Harika!'],
      petted: ['Pullarım parıldıyor! Büyüm artıyor!'],
      washed: ['Köpükler ejderha nefesimle gökkuşağı oluyor!'],
      sleep: ['Zzz... Bulutların üzerinde süzülüyorum...']
    },
    colors: {
      primary: '#a855f7',
      secondary: '#e9d5ff',
      ears: '#c084fc',
      innerEar: '#38bdf8',
      cheeks: '#f472b6',
      eyes: '#facc15'
    }
  },
  {
    id: 'parrot',
    name: 'Maviş',
    species: 'Renkli Papağan 🦜',
    icon: '🦜',
    level: 1,
    xp: 0,
    unlocked: false,
    unlockRequirement: { questsNeeded: 5, title: '5 Görev Tamamla' },
    unlockOrder: 7,
    quotes: {
      idle: ['Cik cik! Kanatlarım pır pır ediyor!', 'Yeni bir kelime öğrendim!', 'Şarkı söyleyelim mi?', 'Tüylerim rengarenk parlıyor!'],
      fed: ['Çekirdek mi o? Bayılırım, ver ver!', 'Harika bir ziyafet cik cik!'],
      petted: ['Gagalamam, seni çok sevdim!', 'Kafamı kaşıman çok hoşuma gidiyor!'],
      washed: ['Kanat banyosu en sevdiğim şey! Şap şup!'],
      sleep: ['Cik... Gözlerim kapandı... Zzz...']
    },
    colors: {
      primary: '#06b6d4',
      secondary: '#fef08a',
      ears: '#10b981',
      innerEar: '#f59e0b',
      cheeks: '#f472b6',
      eyes: '#0f172a'
    }
  },
  {
    id: 'hamster',
    name: 'Fıstık',
    species: 'Pofuduk Hamster 🐹',
    icon: '🐹',
    level: 1,
    xp: 0,
    unlocked: false,
    unlockRequirement: { questsNeeded: 7, title: '7 Görev Tamamla' },
    unlockOrder: 8,
    quotes: {
      idle: ['Yanaklarıma bir fındık daha sığar!', 'Çarkımda dönmek harika!', 'Bıyıklarım kıpır kıpır kokluyor!', 'Talaşlarımın arasında kayboldum!'],
      fed: ['Kıtır kıtır! Yanaklarımı doldurdum!', 'Ayçiçeği çekirdeği tam bana göre!'],
      petted: ['Pıt pıt kalbim seninle atıyor!', 'Beni avucuna al, ısınayım!'],
      washed: ['Köpüklere dikkat, fındık kadar kaldım!'],
      sleep: ['Zzz... Yanaklarım dolu uyuyorum...']
    },
    colors: {
      primary: '#fdba74',
      secondary: '#ffffff',
      ears: '#ea580c',
      innerEar: '#fbcfe8',
      cheeks: '#f43f5e',
      eyes: '#1e293b'
    }
  }
];

class PetRenderer {
  /**
   * Generates a modern minimalist vector SVG string for any pet & emotion & accessory.
   * Supports pet ID string OR direct Pet Object with custom template & colors.
   */
  static renderSVG(petIdOrObject, state = 'normal', accessory = 'none') {
    let pet;
    if (typeof petIdOrObject === 'object' && petIdOrObject !== null) {
      pet = petIdOrObject;
    } else {
      pet = PETS_DATABASE.find(p => p.id === petIdOrObject) || PETS_DATABASE[0];
    }
    const c = pet.colors || {
      primary: '#fed7aa',
      secondary: '#ffffff',
      ears: '#fb923c',
      innerEar: '#f472b6',
      cheeks: '#fbcfe8',
      eyes: '#1e293b'
    };
    const template = pet.template || pet.id || 'cat';
    
    // Eyes variation based on state
    let eyesSvg = '';
    let mouthSvg = '';
    let extraEffects = '';

    if (state === 'sleeping') {
      // Sleeping curved peaceful eyes
      eyesSvg = `
        <path d="M 65,105 Q 80,118 95,105" fill="none" stroke="${c.eyes}" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M 125,105 Q 140,118 155,105" fill="none" stroke="${c.eyes}" stroke-width="4.5" stroke-linecap="round"/>
      `;
      mouthSvg = `
        <ellipse cx="110" cy="132" rx="4" ry="2" fill="#f43f5e" />
      `;
    } else if (state === 'happy' || state === 'petted') {
      // Happy arcs
      eyesSvg = `
        <path d="M 65,108 Q 80,92 95,108" fill="none" stroke="${c.eyes}" stroke-width="5" stroke-linecap="round"/>
        <path d="M 125,108 Q 140,92 155,108" fill="none" stroke="${c.eyes}" stroke-width="5" stroke-linecap="round"/>
      `;
      mouthSvg = `
        <path d="M 100,126 Q 110,140 120,126" fill="#f43f5e" stroke="${c.eyes}" stroke-width="3" stroke-linecap="round"/>
      `;
      extraEffects = `
        <circle cx="50" cy="70" r="3" fill="#f43f5e" opacity="0.8"/>
        <circle cx="170" cy="65" r="4" fill="#f59e0b" opacity="0.8"/>
      `;
    } else if (state === 'eating') {
      // Chewing animation eyes and open mouth with crumb
      eyesSvg = `
        <circle cx="80" cy="102" r="8" fill="${c.eyes}"/>
        <circle cx="83" cy="99" r="3" fill="#ffffff"/>
        <circle cx="140" cy="102" r="8" fill="${c.eyes}"/>
        <circle cx="143" cy="99" r="3" fill="#ffffff"/>
      `;
      mouthSvg = `
        <ellipse cx="110" cy="132" rx="10" ry="8" fill="#e11d48"/>
        <circle cx="110" cy="144" r="3" fill="#fb923c"/>
      `;
    } else {
      // Normal state: big cute anime-style round expressive eyes
      eyesSvg = `
        <circle cx="80" cy="102" r="10" fill="${c.eyes}"/>
        <circle cx="77" cy="98" r="4" fill="#ffffff"/>
        <circle cx="84" cy="105" r="2" fill="#ffffff"/>
        <circle cx="140" cy="102" r="10" fill="${c.eyes}"/>
        <circle cx="137" cy="98" r="4" fill="#ffffff"/>
        <circle cx="144" cy="105" r="2" fill="#ffffff"/>
      `;
      mouthSvg = `
        <path d="M 102,126 Q 110,132 118,126" fill="none" stroke="${c.eyes}" stroke-width="3.5" stroke-linecap="round"/>
      `;
    }

    // Blushing cheeks
    const blushSvg = `
      <ellipse cx="68" cy="116" rx="9" ry="6" fill="${c.cheeks}" opacity="0.8"/>
      <ellipse cx="152" cy="116" rx="9" ry="6" fill="${c.cheeks}" opacity="0.8"/>
    `;

    // Species specific body & ears & tail
    let bodyAndEars = '';

    switch (template) {
      case 'cat':
        bodyAndEars = `
          <!-- Cat Tail -->
          <path d="M 160,175 C 195,170 210,135 195,120 C 185,110 175,120 180,135 C 185,150 170,170 150,176" fill="${c.ears}" />
          <!-- Cat Ears -->
          <polygon points="55,80 75,30 100,68" fill="${c.ears}" rx="6"/>
          <polygon points="62,75 75,42 92,68" fill="${c.innerEar}"/>
          <polygon points="120,68 145,30 165,80" fill="${c.ears}" rx="6"/>
          <polygon points="128,68 145,42 158,75" fill="${c.innerEar}"/>
          <!-- Head / Body Base -->
          <ellipse cx="110" cy="120" rx="60" ry="52" fill="${c.primary}"/>
          <ellipse cx="110" cy="138" rx="40" ry="32" fill="${c.secondary}"/>
          <!-- Whiskers -->
          <line x1="45" y1="120" x2="25" y2="116" stroke="${c.eyes}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
          <line x1="45" y1="128" x2="25" y2="132" stroke="${c.eyes}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
          <line x1="175" y1="120" x2="195" y2="116" stroke="${c.eyes}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
          <line x1="175" y1="128" x2="195" y2="132" stroke="${c.eyes}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
          <!-- Nose -->
          <polygon points="106,120 114,120 110,125" fill="#f43f5e"/>
          <!-- Little Paws -->
          <ellipse cx="85" cy="165" rx="14" ry="10" fill="${c.secondary}" stroke="#e2e8f0" stroke-width="1.5"/>
          <ellipse cx="135" cy="165" rx="14" ry="10" fill="${c.secondary}" stroke="#e2e8f0" stroke-width="1.5"/>
        `;
        break;

      case 'dog':
        bodyAndEars = `
          <!-- Dog Tail Wagging -->
          <path d="M 160,170 Q 195,150 185,125 Q 175,135 155,165" fill="${c.ears}"/>
          <!-- Shiba Triangle Ears -->
          <polygon points="60,75 80,35 102,70" fill="${c.ears}"/>
          <polygon points="68,70 80,45 94,68" fill="${c.innerEar}"/>
          <polygon points="118,70 140,35 160,75" fill="${c.ears}"/>
          <polygon points="126,68 140,45 152,70" fill="${c.innerEar}"/>
          <!-- Body -->
          <ellipse cx="110" cy="120" rx="60" ry="52" fill="${c.primary}"/>
          <!-- White Shiba Snout Mask -->
          <ellipse cx="110" cy="132" rx="38" ry="28" fill="${c.secondary}"/>
          <!-- Nose -->
          <ellipse cx="110" cy="122" rx="7" ry="5" fill="#1e293b"/>
          <!-- Paws -->
          <ellipse cx="82" cy="166" rx="14" ry="10" fill="${c.secondary}"/>
          <ellipse cx="138" cy="166" rx="14" ry="10" fill="${c.secondary}"/>
        `;
        break;

      case 'bunny':
        bodyAndEars = `
          <!-- Fluffy Bunny Ears -->
          <ellipse cx="78" cy="40" rx="14" ry="38" transform="rotate(-10 78 40)" fill="${c.primary}"/>
          <ellipse cx="78" cy="40" rx="8" ry="28" transform="rotate(-10 78 40)" fill="${c.innerEar}"/>
          <ellipse cx="142" cy="40" rx="14" ry="38" transform="rotate(10 142 40)" fill="${c.primary}"/>
          <ellipse cx="142" cy="40" rx="8" ry="28" transform="rotate(10 142 40)" fill="${c.innerEar}"/>
          <!-- Round Body -->
          <ellipse cx="110" cy="122" rx="58" ry="50" fill="${c.primary}"/>
          <ellipse cx="110" cy="138" rx="36" ry="26" fill="${c.secondary}"/>
          <!-- Tiny Bunny Nose -->
          <polygon points="106,120 114,120 110,124" fill="#fb7185"/>
          <!-- Cute Bunny Paws -->
          <ellipse cx="85" cy="166" rx="13" ry="9" fill="${c.secondary}"/>
          <ellipse cx="135" cy="166" rx="13" ry="9" fill="${c.secondary}"/>
          <!-- Fluffy Tail -->
          <circle cx="165" cy="155" r="14" fill="${c.secondary}"/>
        `;
        break;

      case 'fox':
        bodyAndEars = `
          <!-- Fox Big Bushy Tail -->
          <path d="M 160,170 C 205,170 215,115 190,95 C 180,85 170,110 155,160" fill="${c.primary}"/>
          <path d="M 190,95 C 185,90 178,100 180,110 C 190,112 195,105 190,95" fill="#ffffff"/>
          <!-- Fox Sharp Ears with Black Tips -->
          <polygon points="56,76 74,25 98,68" fill="${c.ears}"/>
          <polygon points="62,72 74,40 90,68" fill="${c.innerEar}"/>
          <polygon points="122,68 146,25 164,76" fill="${c.ears}"/>
          <polygon points="130,68 146,40 158,72" fill="${c.innerEar}"/>
          <!-- Face Mask -->
          <ellipse cx="110" cy="120" rx="58" ry="50" fill="${c.primary}"/>
          <polygon points="70,125 110,150 150,125 130,110 90,110" fill="${c.secondary}"/>
          <!-- Black Nose -->
          <circle cx="110" cy="124" r="5" fill="#0f172a"/>
          <!-- Paws -->
          <ellipse cx="84" cy="165" rx="13" ry="9" fill="#1e293b"/>
          <ellipse cx="136" cy="165" rx="13" ry="9" fill="#1e293b"/>
        `;
        break;

      case 'panda':
        bodyAndEars = `
          <!-- Striped Tail -->
          <path d="M 155,165 C 200,165 210,125 190,110 C 180,105 170,120 150,160" fill="${c.primary}"/>
          <ellipse cx="185" cy="130" rx="10" ry="6" fill="#78350f" transform="rotate(-20 185 130)"/>
          <ellipse cx="170" cy="150" rx="10" ry="6" fill="#78350f" transform="rotate(-20 170 150)"/>
          <!-- Cute Round Ears with White Edge -->
          <circle cx="68" cy="62" r="20" fill="${c.primary}"/>
          <circle cx="68" cy="62" r="14" fill="#ffffff"/>
          <circle cx="152" cy="62" r="20" fill="${c.primary}"/>
          <circle cx="152" cy="62" r="14" fill="#ffffff"/>
          <!-- Face -->
          <ellipse cx="110" cy="120" rx="60" ry="50" fill="${c.primary}"/>
          <ellipse cx="80" cy="115" rx="18" ry="14" fill="#ffffff" opacity="0.95"/>
          <ellipse cx="140" cy="115" rx="18" ry="14" fill="#ffffff" opacity="0.95"/>
          <ellipse cx="110" cy="136" rx="22" ry="16" fill="#ffffff"/>
          <!-- Nose -->
          <ellipse cx="110" cy="125" rx="6" ry="4" fill="#1e293b"/>
          <!-- Dark Paws -->
          <ellipse cx="82" cy="166" rx="14" ry="10" fill="#431407"/>
          <ellipse cx="138" cy="166" rx="14" ry="10" fill="#431407"/>
        `;
        break;

      case 'dragon':
        bodyAndEars = `
          <!-- Tiny Dragon Wings -->
          <path d="M 52,110 C 25,95 20,65 42,60 C 50,75 55,95 62,115" fill="#c084fc" stroke="#a855f7" stroke-width="2"/>
          <path d="M 168,110 C 195,95 200,65 178,60 C 170,75 165,95 158,115" fill="#c084fc" stroke="#a855f7" stroke-width="2"/>
          <!-- Horns -->
          <polygon points="75,65 82,30 95,60" fill="#facc15"/>
          <polygon points="125,60 138,30 145,65" fill="#facc15"/>
          <!-- Body -->
          <ellipse cx="110" cy="120" rx="58" ry="50" fill="${c.primary}"/>
          <ellipse cx="110" cy="136" rx="36" ry="28" fill="${c.secondary}"/>
          <!-- Scales / Belly Ridges -->
          <path d="M 98,128 Q 110,134 122,128" fill="none" stroke="#a855f7" stroke-width="2"/>
          <path d="M 100,138 Q 110,144 120,138" fill="none" stroke="#a855f7" stroke-width="2"/>
          <!-- Paws -->
          <ellipse cx="84" cy="166" rx="12" ry="8" fill="${c.secondary}"/>
          <ellipse cx="136" cy="166" rx="12" ry="8" fill="${c.secondary}"/>
        `;
        break;

      case 'parrot':
        bodyAndEars = `
          <!-- Parrot Crest Feathers -->
          <path d="M 105,75 Q 92,30 110,22 Q 118,38 112,70" fill="${c.ears}"/>
          <path d="M 112,70 Q 124,35 134,30 Q 130,50 120,72" fill="${c.innerEar || '#f59e0b'}"/>
          <!-- Parrot Tail Feathers -->
          <path d="M 150,165 Q 185,185 195,160 Q 170,145 145,155" fill="${c.ears}"/>
          <path d="M 145,170 Q 175,195 185,175 Q 165,155 140,160" fill="${c.innerEar || '#38bdf8'}"/>
          <!-- Wings -->
          <ellipse cx="60" cy="130" rx="16" ry="32" transform="rotate(15 60 130)" fill="${c.ears}"/>
          <ellipse cx="160" cy="130" rx="16" ry="32" transform="rotate(-15 160 130)" fill="${c.ears}"/>
          <!-- Body -->
          <ellipse cx="110" cy="120" rx="54" ry="50" fill="${c.primary}"/>
          <!-- Belly Feather Patch -->
          <ellipse cx="110" cy="138" rx="34" ry="26" fill="${c.secondary}"/>
          <!-- Curved Parrot Beak -->
          <path d="M 102,118 Q 110,114 118,118 Q 116,138 110,142 Q 104,138 102,118" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
          <!-- Cute Little Bird Feet -->
          <ellipse cx="94" cy="168" rx="8" ry="5" fill="#f59e0b"/>
          <ellipse cx="126" cy="168" rx="8" ry="5" fill="#f59e0b"/>
        `;
        break;

      case 'hamster':
        bodyAndEars = `
          <!-- Hamster Round Ears -->
          <circle cx="68" cy="65" r="18" fill="${c.ears}"/>
          <circle cx="68" cy="65" r="10" fill="${c.innerEar || '#fbcfe8'}"/>
          <circle cx="152" cy="65" r="18" fill="${c.ears}"/>
          <circle cx="152" cy="65" r="10" fill="${c.innerEar || '#fbcfe8'}"/>
          <!-- Chubby Hamster Body -->
          <ellipse cx="110" cy="122" rx="64" ry="52" fill="${c.primary}"/>
          <!-- Chubby White Cheeks & Belly -->
          <ellipse cx="78" cy="125" rx="22" ry="18" fill="${c.secondary}"/>
          <ellipse cx="142" cy="125" rx="22" ry="18" fill="${c.secondary}"/>
          <ellipse cx="110" cy="138" rx="34" ry="28" fill="${c.secondary}"/>
          <!-- Tiny Pink Nose -->
          <ellipse cx="110" cy="120" rx="4" ry="3" fill="#f43f5e"/>
          <!-- Whiskers -->
          <line x1="60" y1="124" x2="38" y2="122" stroke="${c.eyes}" stroke-width="1.8" stroke-linecap="round" opacity="0.45"/>
          <line x1="60" y1="130" x2="40" y2="134" stroke="${c.eyes}" stroke-width="1.8" stroke-linecap="round" opacity="0.45"/>
          <line x1="160" y1="124" x2="182" y2="122" stroke="${c.eyes}" stroke-width="1.8" stroke-linecap="round" opacity="0.45"/>
          <line x1="160" y1="130" x2="180" y2="134" stroke="${c.eyes}" stroke-width="1.8" stroke-linecap="round" opacity="0.45"/>
          <!-- Little Paws holding a treat/seed -->
          <ellipse cx="98" cy="150" rx="7" ry="9" fill="${c.secondary}" stroke="#e2e8f0" stroke-width="1"/>
          <ellipse cx="122" cy="150" rx="7" ry="9" fill="${c.secondary}" stroke="#e2e8f0" stroke-width="1"/>
          <!-- Sunflower Seed in paws -->
          <ellipse cx="110" cy="148" rx="5" ry="7" fill="#78350f" transform="rotate(15 110 148)"/>
          <!-- Paws feet -->
          <ellipse cx="82" cy="168" rx="11" ry="6" fill="${c.secondary}"/>
          <ellipse cx="138" cy="168" rx="11" ry="6" fill="${c.secondary}"/>
        `;
        break;

      default:
        // Fallback to cat template
        bodyAndEars = `
          <ellipse cx="110" cy="120" rx="60" ry="52" fill="${c.primary}"/>
          <ellipse cx="110" cy="138" rx="40" ry="32" fill="${c.secondary}"/>
          <polygon points="55,80 75,30 100,68" fill="${c.ears}"/>
          <polygon points="120,68 145,30 165,80" fill="${c.ears}"/>
          <ellipse cx="85" cy="165" rx="14" ry="10" fill="${c.secondary}"/>
          <ellipse cx="135" cy="165" rx="14" ry="10" fill="${c.secondary}"/>
        `;
        break;
    }

    // Accessory rendering (Hats, Bows, Crowns)
    let accessorySvg = '';
    if (accessory === 'party_hat') {
      accessorySvg = `
        <polygon points="95,68 110,10 125,68" fill="#ec4899" stroke="#db2777" stroke-width="2"/>
        <circle cx="110" cy="10" r="7" fill="#fbbf24"/>
        <line x1="99" y1="50" x2="121" y2="50" stroke="#fbbf24" stroke-width="3"/>
      `;
    } else if (accessory === 'crown') {
      accessorySvg = `
        <polygon points="85,62 92,38 102,52 110,34 118,52 128,38 135,62" fill="#facc15" stroke="#d97706" stroke-width="2"/>
        <circle cx="92" cy="38" r="3" fill="#f43f5e"/>
        <circle cx="110" cy="34" r="3" fill="#38bdf8"/>
        <circle cx="128" cy="38" r="3" fill="#f43f5e"/>
      `;
    } else if (accessory === 'bow') {
      accessorySvg = `
        <polygon points="110,65 92,54 92,76" fill="#f43f5e"/>
        <polygon points="110,65 128,54 128,76" fill="#f43f5e"/>
        <circle cx="110" cy="65" r="5" fill="#fbcfe8"/>
      `;
    } else if (accessory === 'flower') {
      accessorySvg = `
        <circle cx="132" cy="58" r="6" fill="#f472b6"/>
        <circle cx="142" cy="58" r="6" fill="#f472b6"/>
        <circle cx="137" cy="50" r="6" fill="#f472b6"/>
        <circle cx="137" cy="66" r="6" fill="#f472b6"/>
        <circle cx="137" cy="58" r="5" fill="#fef08a"/>
      `;
    }

    return `
      <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg">
        ${extraEffects}
        ${bodyAndEars}
        ${blushSvg}
        ${eyesSvg}
        ${mouthSvg}
        ${accessorySvg}
      </svg>
    `;
  }
}

const TURKISH_PET_NAMES = [
  'Lokum', 'Zeytin', 'Pamuk', 'Şimşek', 'Gofret', 'Boncuk', 'Karamel', 'Maviş', 
  'Tarçın', 'Bulut', 'Maya', 'Fıstık', 'Çakıl', 'Badem', 'Köfte', 'Güneş', 
  'Pati', 'Bambi', 'Sütlaç', 'Ceviz', 'Gece', 'Pusat', 'Bobi', 'Köpük'
];

const SPECIES_CONFIG = {
  cat: { name: 'Tekir Kedi 🐾', icon: '🐱', defaultColor: '#fed7aa', accentColor: '#fb923c' },
  dog: { name: 'Shiba Inu 🐕', icon: '🐶', defaultColor: '#f59e0b', accentColor: '#d97706' },
  bunny: { name: 'Lop Tavşan 🐰', icon: '🐰', defaultColor: '#fce7f3', accentColor: '#f472b6' },
  fox: { name: 'Akıllı Tilki 🦊', icon: '🦊', defaultColor: '#ea580c', accentColor: '#c2410c' },
  panda: { name: 'Kızıl Panda 🐼', icon: '🐼', defaultColor: '#c2410c', accentColor: '#ffffff' },
  dragon: { name: 'Büyülü Ejderha 🐉', icon: '🐉', defaultColor: '#a855f7', accentColor: '#c084fc' },
  parrot: { name: 'Renkli Papağan 🦜', icon: '🦜', defaultColor: '#06b6d4', accentColor: '#10b981' },
  hamster: { name: 'Pofuduk Hamster 🐹', icon: '🐹', defaultColor: '#fdba74', accentColor: '#ea580c' }
};

const COLOR_PRESETS = [
  { name: 'Karamel Bal', primary: '#fed7aa', ears: '#fb923c', desc: 'Sıcak tatlı kürk' },
  { name: 'Şeker Pembe', primary: '#fce7f3', ears: '#f472b6', desc: 'Toz pembe pamuk' },
  { name: 'Altın Güneş', primary: '#fef08a', ears: '#f59e0b', desc: 'Işıl ışıl sarı' },
  { name: 'Deniz Mavisi', primary: '#bae6fd', ears: '#0284c7', desc: 'Ferah okyanus rengi' },
  { name: 'Nane Yeşili', primary: '#a7f3d0', ears: '#10b981', desc: 'Doğal orman tonu' },
  { name: 'Lavanta Mor', primary: '#e9d5ff', ears: '#a855f7', desc: 'Büyülü ve asil' },
  { name: 'Sıcak Çikolata', primary: '#d7ccc8', ears: '#5d4037', desc: 'Sevimli mocha kahve' },
  { name: 'Kar Beyazı', primary: '#f8fafc', ears: '#94a3b8', desc: 'Saf kış esintisi' }
];

function getRandomPetName() {
  return TURKISH_PET_NAMES[Math.floor(Math.random() * TURKISH_PET_NAMES.length)];
}

function generateQuotesForPersonality(personality, petName) {
  switch (personality) {
    case 'energetic':
      return {
        idle: [`Enerjim tavan! Hadi bahçede koşalım!`, `Birlikte oynamak için sabırsızlanıyorum!`, `Kuyruğumu kovalıyorum, çok eğlenceli!`, `Bana bir top fırlatır mısın?`],
        fed: [`Hammm! Harika bir yakıt oldu! Şimdi oyun zamanı!`, `Çok lezzetliydi, teşekkürler en iyi dostum!`],
        petted: [`Sevginle kanatlanıyorum adeta!`, `Beni okşadıkça neşem iki katına çıkıyor!`],
        washed: [`Köpüklerle dans ediyorum!`],
        sleep: [`Zzz... Rüyalarımda bile koşuyorum...`]
      };
    case 'sleepy':
      return {
        idle: [`Esnedim... Biraz şekerleme vakti mi acaba?`, `Güneşin vurduğu o köşe ne kadar da rahat...`, `Yumuşacık bir minder rica edebilir miyim?`, `Huzurlu bir sessizlik ne güzel...`],
        fed: [`Karnım doydu, şimdi mışıl mışıl bir uyku çekebilirim...`],
        petted: [`Mırrrr... Ellerinin sıcaklığı beni mest etti...`],
        washed: [`Ilık su beni iyice mayıştırdı...`],
        sleep: [`Mışıl mışıl... Zzz... Pamuk bulutların üstündeyim...`]
      };
    case 'curious':
      return {
        idle: [`Şu yaprağın altında ne var acaba?`, `Barınağın her köşesini keşfetmek istiyorum!`, `Bana yeni bir numara öğretir misin?`, `Gözlerim her detayı inceliyor!`],
        fed: [`Yeni tatlar keşfetmeye bayılıyorum!`],
        petted: [`Zekice hareketlerini çok seviyorum!`],
        washed: [`Köpüklerin nasıl parladığını izliyorum!`],
        sleep: [`Zzz... Rüyalarımda yeni maceralar tasarlıyorum...`]
      };
    case 'foodie':
    default:
      return {
        idle: [`Burnuma harika kokular geliyor!`, `Atıştırmalık saati geldi mi?`, `Birazcık mama ödülü fena olmazdı!`, `Göbüşüm biraz gurulduyor sanki!`],
        fed: [`Enfes! Dünyanın en iyi şefisin!`, `Tabağımı tertemiz yaladım!`],
        petted: [`Sevgin de karnım kadar doyurucu!`],
        washed: [`Mis gibi temiz bir gurmeyim artık!`],
        sleep: [`Zzz... Ödül mamalarından dağlar görüyorum...`]
      };
  }
}

window.PETS_DATABASE = PETS_DATABASE;
window.PetRenderer = PetRenderer;
window.SPECIES_CONFIG = SPECIES_CONFIG;
window.COLOR_PRESETS = COLOR_PRESETS;
window.getRandomPetName = getRandomPetName;
window.generateQuotesForPersonality = generateQuotesForPersonality;
