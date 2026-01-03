const ZODIAC_SIGNS = [
    "牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座",
    "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"
];

const PREFECTURES = {
    "北海道": { lat: 43.06, lng: 141.35 }, "青森県": { lat: 40.82, lng: 140.75 }, "岩手県": { lat: 39.70, lng: 141.15 },
    "宮城県": { lat: 38.27, lng: 140.87 }, "秋田県": { lat: 39.72, lng: 140.10 }, "山形県": { lat: 38.24, lng: 140.36 },
    "福島県": { lat: 37.75, lng: 140.47 }, "茨城県": { lat: 36.34, lng: 140.45 }, "栃木県": { lat: 36.57, lng: 139.88 },
    "群馬県": { lat: 36.39, lng: 139.06 }, "埼玉県": { lat: 35.86, lng: 139.65 }, "千葉県": { lat: 35.61, lng: 140.12 },
    "東京都": { lat: 35.69, lng: 139.69 }, "神奈川県": { lat: 35.45, lng: 139.64 }, "新潟県": { lat: 37.90, lng: 139.02 },
    "富山県": { lat: 36.70, lng: 137.21 }, "石川県": { lat: 36.59, lng: 136.63 }, "福井県": { lat: 36.07, lng: 136.22 },
    "山梨県": { lat: 35.66, lng: 138.57 }, "長野県": { lat: 36.65, lng: 138.18 }, "岐阜県": { lat: 35.39, lng: 136.72 },
    "静岡県": { lat: 34.98, lng: 138.38 }, "愛知県": { lat: 35.18, lng: 136.91 }, "三重県": { lat: 34.73, lng: 136.51 },
    "滋賀県": { lat: 35.00, lng: 135.87 }, "京都府": { lat: 35.01, lng: 135.76 }, "大阪府": { lat: 34.69, lng: 135.50 },
    "兵庫県": { lat: 34.69, lng: 135.18 }, "奈良県": { lat: 34.69, lng: 135.83 }, "和歌山県": { lat: 34.23, lng: 135.17 },
    "鳥取県": { lat: 35.50, lng: 134.24 }, "島根県": { lat: 35.47, lng: 133.05 }, "岡山県": { lat: 34.66, lng: 133.93 },
    "広島県": { lat: 34.39, lng: 132.46 }, "山口県": { lat: 34.19, lng: 131.47 }, "徳島県": { lat: 34.07, lng: 134.56 },
    "香川県": { lat: 34.34, lng: 134.04 }, "愛媛県": { lat: 33.84, lng: 132.77 }, "高知県": { lat: 33.56, lng: 133.53 },
    "福岡県": { lat: 33.61, lng: 130.42 }, "佐賀県": { lat: 33.25, lng: 130.30 }, "長崎県": { lat: 32.75, lng: 129.88 },
    "熊本県": { lat: 32.79, lng: 130.74 }, "大分県": { lat: 33.24, lng: 131.61 }, "宮崎県": { lat: 31.91, lng: 131.42 },
    "鹿児島県": { lat: 31.56, lng: 130.56 }, "沖縄県": { lat: 26.21, lng: 127.68 }
};

function getZodiacSign(degree) {
    const normalized = ((degree % 360) + 360) % 360;
    return ZODIAC_SIGNS[Math.floor(normalized / 30)];
}

/**
 * Calculates simplified planetary positions.
 * This implementation improves precision with time and location.
 */
function calculateHoroscope(year, month, day, hour, minute, prefName) {
    const dateTime = new Date(Date.UTC(year, month - 1, day, hour - 9, minute)); // Adjusted for JST (GMT+9)
    const timestamp = dateTime.getTime();
    const startOfEra = new Date(Date.UTC(2000, 0, 1, 12, 0, 0)).getTime();
    const daysSinceEpoch = (timestamp - startOfEra) / (1000 * 60 * 60 * 24);

    const location = PREFECTURES[prefName] || PREFECTURES["東京都"];

    // Sun position (Approximate: 0.9856 degrees per day from 2000 epoch)
    const sunDegree = (daysSinceEpoch * 0.9856 + 280) % 360;

    // Moon position (Approximate: 13.176 degrees per day)
    const moonDegree = (daysSinceEpoch * 13.176 + 125) % 360;

    // Mars (Approximate: 0.524 degrees per day)
    const marsDegree = (daysSinceEpoch * 0.524 + 100) % 360;

    // Jupiter (Approximate: 0.083 degrees per day)
    const jupiterDegree = (daysSinceEpoch * 0.0832 + 30) % 360;

    // Saturn (Approximate: 0.033 degrees per day)
    const saturnDegree = (daysSinceEpoch * 0.0337 + 50) % 360;

    const results = [
        { name: "太陽", degree: sunDegree, sign: getZodiacSign(sunDegree), color: "#facc15" },
        { name: "月", degree: moonDegree, sign: getZodiacSign(moonDegree), color: "#c084fc" },
        { name: "水星", degree: (sunDegree + Math.sin(daysSinceEpoch / 5.5) * 20) % 360, sign: getZodiacSign(sunDegree + 10), color: "#60a5fa" },
        { name: "金星", degree: (sunDegree + Math.cos(daysSinceEpoch / 14.5) * 45) % 360, sign: getZodiacSign(sunDegree - 15), color: "#f472b6" },
        { name: "火星", degree: marsDegree, sign: getZodiacSign(marsDegree), color: "#f87171" },
        { name: "木星", degree: jupiterDegree, sign: getZodiacSign(jupiterDegree), color: "#fb923c" },
        { name: "土星", degree: saturnDegree, sign: getZodiacSign(saturnDegree), color: "#94a3b8" }
    ];

    // Calculate Ascendant (Approximate based on time of day and longitude)
    // Sidereal time calculation (very simplified)
    const hoursJST = hour + minute / 60;
    const localSolarTimeOffset = (location.lng - 135) / 15; // JST is 135E
    const correctedTime = hoursJST + localSolarTimeOffset;
    
    // Very rough ASC: At sunrise (6:00 local), Sun is near ASC.
    const ascOffset = (correctedTime - 6) * 15;
    const ascDegree = (sunDegree + ascOffset + 360) % 360;

    return {
        planets: results,
        ascendant: { name: "アセンダント", degree: ascDegree, sign: getZodiacSign(ascDegree) },
        location: prefName,
        dateTime: `${year}/${month}/${day} ${hour}:${minute}`
    };
}

function renderHoroscopeChart(data) {
    const canvas = document.getElementById('horoscope-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 50;

    ctx.clearRect(0, 0, width, height);

    // Draw background outer circle (Zodiac)
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 30, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw Zodiac segments
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const xStart = centerX + Math.cos(angle) * radius;
        const yStart = centerY + Math.sin(angle) * radius;
        const xEnd = centerX + Math.cos(angle) * (radius + 30);
        const yEnd = centerY + Math.sin(angle) * (radius + 30);

        ctx.strokeStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();

        // Labels
        const labelAngle = (i * 30 + 15 - 90) * Math.PI / 180;
        ctx.fillStyle = '#64748b';
        ctx.font = '10px "Noto Sans JP"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ZODIAC_SIGNS[i], centerX + Math.cos(labelAngle) * (radius + 15), centerY + Math.sin(labelAngle) * (radius + 15));
    }

    // Draw Houses (Simplified: equal houses from ASC)
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = '#94a3b8';
    for (let i = 0; i < 12; i++) {
        const angle = (data.ascendant.degree + i * 30 - 90) * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw Planets
    data.planets.forEach(p => {
        const angle = (p.degree - 90) * Math.PI / 180;
        const rPos = radius * 0.7;
        const x = centerX + Math.cos(angle) * rPos;
        const y = centerY + Math.sin(angle) * rPos;

        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#1e1b4b';
        ctx.font = 'bold 10px "Noto Sans JP"';
        ctx.fillText(p.name, x, y - 12);
    });

    // Draw ASC Line
    const ascAngle = (data.ascendant.degree - 90) * Math.PI / 180;
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(ascAngle) * radius, centerY + Math.sin(ascAngle) * radius);
    ctx.stroke();
    
    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 12px "Noto Sans JP"';
    ctx.fillText("ASC", centerX + Math.cos(ascAngle) * (radius + 40), centerY + Math.sin(ascAngle) * (radius + 40));
}

function getInterpretation(sign) {
    const interpretations = {
        "牡羊座": "何事にも真っ先に飛び込む勇気と情熱を持っています。開拓者精神にあふれ、直感に従って行動することで運気が開けます。",
        "牡牛座": "優れた五感と、一度決めたことをやり遂げる粘り強さがあります。安定感と心地よさを大切にすることで才能が発揮されます。",
        "双子座": "知的好奇心が極めて旺盛で、コミュニケーションに長けています。軽やかに情報を扱い、多才に活躍する質です。",
        "蟹座": "共感力が非常に高く、大切な人や場所を守ろうとする深い愛情を持っています。安心できる環境でその慈愛が輝きます。",
        "獅子座": "自分らしく輝くことへの強い意欲と、周囲を惹きつける華やかさがあります。主役として自己表現を楽しむことで道が開けます。",
        "乙女座": "洞察力と分析力が鋭く、物事を整理し整える能力に長けています。誠実で実務的なアプローチが信頼を集めます。",
        "天秤座": "客観的な視点を持ち、あらゆるものに調和と美しさをもたらします。外交能力が高く、洗練された人間関係を築きます。",
        "蠍座": "物事の本質を見抜く深い洞察力と、一つのことを極める凄まじい集中力を持っています。深い絆と変容を恐れない強さがあります。",
        "射手座": "自由な精神で未知の世界を冒険し、高い理想を追い求めます。楽観的で哲学的、広い視野で物事を捉える質です。",
        "山羊座": "目標達成のための強い責任感と、着実に形にする構築力を持っています。野心的でありながら極めて現実的な努力家です。",
        "水瓶座": "独創的で進歩的、誰に対しても平等な博愛精神を持っています。既成概念にとらわれない改革的な視点が魅力です。",
        "魚座": "直感的で慈愛に満ち、目に見えない世界や他者の感情と共鳴します。想像力豊かで、すべてを包み込む優しさがあります。"
    };
    return interpretations[sign] || "";
}
