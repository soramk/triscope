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

function calculateHoroscope(year, month, day, hour, minute, prefName) {
    const dateTime = new Date(Date.UTC(year, month - 1, day, hour - 9, minute));
    const timestamp = dateTime.getTime();
    const startOfEra = new Date(Date.UTC(2000, 0, 1, 12, 0, 0)).getTime();
    const daysSinceEpoch = (timestamp - startOfEra) / (1000 * 60 * 60 * 24);

    const location = PREFECTURES[prefName] || PREFECTURES["東京都"];

    const sunDeg = (daysSinceEpoch * 0.9856 + 280) % 360;
    const moonDeg = (daysSinceEpoch * 13.176 + 125) % 360;
    const mercDeg = (sunDeg + Math.sin(daysSinceEpoch / 5.5) * 20) % 360;
    const venusDeg = (sunDeg + Math.cos(daysSinceEpoch / 14.5) * 45) % 360;
    const marsDeg = (daysSinceEpoch * 0.524 + 100) % 360;
    const jupDeg = (daysSinceEpoch * 0.0832 + 30) % 360;
    const satDeg = (daysSinceEpoch * 0.0337 + 50) % 360;

    const planets = [
        { name: "太陽", degree: sunDeg, sign: getZodiacSign(sunDeg), color: "#facc15" },
        { name: "月", degree: moonDeg, sign: getZodiacSign(moonDeg), color: "#c084fc" },
        { name: "水星", degree: mercDeg, sign: getZodiacSign(mercDeg), color: "#60a5fa" },
        { name: "金星", degree: venusDeg, sign: getZodiacSign(venusDeg), color: "#f472b6" },
        { name: "火星", degree: marsDeg, sign: getZodiacSign(marsDeg), color: "#f87171" },
        { name: "木星", degree: jupDeg, sign: getZodiacSign(jupDeg), color: "#fb923c" },
        { name: "土星", degree: satDeg, sign: getZodiacSign(satDeg), color: "#94a3b8" }
    ];

    const hoursJST = hour + minute / 60;
    const localSolarTimeOffset = (location.lng - 135) / 15;
    const correctedTime = hoursJST + localSolarTimeOffset;
    const ascOffset = (correctedTime - 6) * 15;
    const ascDegree = (sunDeg + ascOffset + 360) % 360;

    return {
        planets,
        ascendant: { name: "アセンダント", degree: ascDegree, sign: getZodiacSign(ascDegree), color: "#f43f5e" },
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
    const radius = Math.min(centerX, centerY) - 60;

    ctx.clearRect(0, 0, width, height);

    // ASCを左側に固定するための回転オフセット
    // 標準的なチャートはASCが180度(左)。
    const rotationOffset = 180 - data.ascendant.degree;

    // ヘルパー関数: Zodiac度数をCanvas角度に変換
    const toRad = (zodiacDeg) => (zodiacDeg + rotationOffset) * Math.PI / 180;

    // 1. サイン（外周）の描画
    for (let i = 0; i < 12; i++) {
        const startAngle = toRad(i * 30);
        const endAngle = toRad((i + 1) * 30);

        ctx.strokeStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 30, startAngle, endAngle);
        ctx.stroke();

        // 境界線
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(startAngle) * radius, centerY + Math.sin(startAngle) * radius);
        ctx.lineTo(centerX + Math.cos(startAngle) * (radius + 30), centerY + Math.sin(startAngle) * (radius + 30));
        ctx.stroke();

        // サイン名
        const labelAngle = toRad(i * 30 + 15);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px "Noto Sans JP"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ZODIAC_SIGNS[i], centerX + Math.cos(labelAngle) * (radius + 15), centerY + Math.sin(labelAngle) * (radius + 15));
    }

    // 2. ハウス（内周）の描画 - 等分割ハウス
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = '#cbd5e1';
    for (let i = 0; i < 12; i++) {
        const angle = toRad(data.ascendant.degree + i * 30);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.stroke();
    }
    ctx.setLineDash([]);

    // 3. 天体の描画
    data.planets.forEach(p => {
        const angle = toRad(p.degree);
        const rPos = radius * 0.75;
        const x = centerX + Math.cos(angle) * rPos;
        const y = centerY + Math.sin(angle) * rPos;

        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#1e1b4b';
        ctx.font = 'bold 10px "Noto Sans JP"';
        ctx.fillText(p.name, x, y - 12);
    });

    // 4. ASCラインの描画（常に左側）
    const ascAngle = toRad(data.ascendant.degree);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(ascAngle) * radius, centerY + Math.sin(ascAngle) * radius);
    ctx.stroke();

    ctx.fillStyle = '#f43f5e';
    ctx.font = 'black 14px Arial';
    ctx.fillText("ASC", centerX + Math.cos(ascAngle) * (radius + 45), centerY + Math.sin(ascAngle) * (radius + 45));
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
