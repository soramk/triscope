/**
 * Horoscope Calculation Logic (Simplified)
 * Note: For 100% precision, an ephemeris data is required. 
 * This implementation uses simplified expressions for planetary positions.
 */

const ZODIAC_SIGNS = [
    "牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座",
    "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"
];

const PLANETS = [
    { name: "太陽", id: "sun" },
    { name: "月", id: "moon" },
    { name: "水星", id: "mercury" },
    { name: "金星", id: "venus" },
    { name: "火星", id: "mars" },
    { name: "木星", id: "jupiter" },
    { name: "土星", id: "saturn" }
];

function getZodiacSign(degree) {
    const normalized = ((degree % 360) + 360) % 360;
    return ZODIAC_SIGNS[Math.floor(normalized / 30)];
}

/**
 * Calculates simplified planetary positions.
 * This is a mockup of the logic. For a real production app, 
 * use libraries like 'astrology-js' via CDN.
 */
function calculateHoroscope(birthDate, birthTime, lat, lng) {
    const dateTime = new Date(`${birthDate}T${birthTime}`);
    const timestamp = dateTime.getTime();

    // Seeded random based on timestamp for demonstration if precise formulas are too long.
    // However, I will implement a very basic astronomical offset for the Sun at least.
    const dayOfYear = (timestamp - new Date(dateTime.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24);

    // Sun position (Approximate: 0.9856 degrees per day, starting from Spring Equinox ~March 21)
    const sunDegree = (dayOfYear - 79 + 360) * 0.9856 % 360;

    // Moon position (Approximate: 13.17 degrees per day)
    const moonDegree = (dayOfYear * 13.17) % 360;

    // mock results for other planets based on the date
    const results = [
        { name: "太陽", degree: sunDegree, sign: getZodiacSign(sunDegree) },
        { name: "月", degree: moonDegree, sign: getZodiacSign(moonDegree) },
        { name: "水星", degree: (sunDegree + 10) % 360, sign: getZodiacSign(sunDegree + 10) },
        { name: "金星", degree: (sunDegree - 15) % 360, sign: getZodiacSign(sunDegree - 15) },
        { name: "火星", degree: (dayOfYear * 0.5) % 360, sign: getZodiacSign(dayOfYear * 0.5) },
        { name: "木星", degree: (dayOfYear * 0.08) % 360, sign: getZodiacSign(dayOfYear * 0.08) },
        { name: "土星", degree: (dayOfYear * 0.03) % 360, sign: getZodiacSign(dayOfYear * 0.03) }
    ];

    // Calculate Ascendant (Approximate based on time of day)
    // At sunrise, Ascendant is Sun's sign. 24 hours = 360 degrees.
    const hoursPastMidnight = dateTime.getHours() + dateTime.getMinutes() / 60;
    // VERY rough approximation: Sunrise at 6:00
    const ascOffset = (hoursPastMidnight - 6) * 15;
    const ascDegree = (sunDegree + ascOffset + 360) % 360;

    return {
        planets: results,
        ascendant: { name: "アセンダント", degree: ascDegree, sign: getZodiacSign(ascDegree) }
    };
}

function renderChart(data) {
    const canvas = document.getElementById('horoscope-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    ctx.clearRect(0, 0, width, height);

    // Draw background circles
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 40, 0, Math.PI * 2);
    ctx.stroke();

    // Draw Zodiac sections
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30) * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle) * (radius - 40), centerY + Math.sin(angle) * (radius - 40));
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.stroke();

        // Draw Sign Labels
        const labelAngle = (i * 30 + 15) * Math.PI / 180;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(ZODIAC_SIGNS[i], centerX + Math.cos(labelAngle) * (radius - 20), centerY + Math.sin(labelAngle) * (radius - 20));
    }

    // Draw Planets
    data.planets.forEach(p => {
        const angle = (p.degree - 90) * Math.PI / 180; // Adjusted for 0 degree at top or left? Actually 0 is E
        const x = centerX + Math.cos(angle) * (radius - 80);
        const y = centerY + Math.sin(angle) * (radius - 80);

        ctx.fillStyle = p.name === "太陽" ? "#ffd700" : "#8a2be2";
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "10px Inter";
        ctx.fillText(p.name, x, y - 10);
    });

    // Draw Ascendant line
    const ascAngle = (data.ascendant.degree - 90) * Math.PI / 180;
    ctx.strokeStyle = "#ff4500";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(ascAngle) * radius, centerY + Math.sin(ascAngle) * radius);
    ctx.stroke();
    ctx.setLineDash([]);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const birthDate = document.getElementById('birth-date').value;
            const birthTime = document.getElementById('birth-time').value;

            const results = calculateHoroscope(birthDate, birthTime);
            renderChart(results);

            // Render interpretation
            const output = document.getElementById('horoscope-output');
            output.innerHTML = `
                <div class="section-card">
                    <h3>鑑定結果</h3>
                    <p>あなたの<strong>太陽星座</strong>は <strong>${results.planets[0].sign}</strong> です。</p>
                    <p>あなたの<strong>月星座</strong>は <strong>${results.planets[1].sign}</strong> です。</p>
                    <p><strong>アセンダント（第一印象）</strong>は <strong>${results.ascendant.sign}</strong> です。</p>
                    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--glass-border);">
                        <p><strong>太陽星座 (${results.planets[0].sign}) の性質:</strong><br>
                        ${getInterpretation(results.planets[0].sign)}</p>
                    </div>
                </div>
            `;
        });
    }
});

function getInterpretation(sign) {
    const interpretations = {
        "牡羊座": "情熱的で開拓者精神にあふれています。新しいことへの挑戦を恐れません。",
        "牡牛座": "安定感があり、五感を大切にします。根気強く実直な性格です。",
        "双子座": "知的好奇心が旺盛で、コミュニケーションに長けています。多才です。",
        "蟹座": "共感力が高く、家族や仲間を大切にします。感受性が豊かです。",
        "獅子座": "創造的でカリスマ性があります。自己表現を楽しみ、人目を引く存在です。",
        "乙女座": "分析的で実務能力に長けています。細部へのこだわりと誠実さを持っています。",
        "天秤座": "調和と均衡を重んじ、審美眼に優れています。外交的で公平です。",
        "蠍座": "洞察力が鋭く、深い変容を求めます。情熱的で集中力があります。",
        "射手座": "自由を愛し、高い理想を追い求めます。楽観的で哲学的です。",
        "山羊座": "責任感が強く、目標達成に向けて着実に歩みます。野心的で堅実です。",
        "水瓶座": "独創的で進歩的です。博愛精神を持ち、既成概念にとらわれません。",
        "魚座": "直感的で慈愛に満ちています。想像力豊かで、目に見えない世界と共鳴します。"
    };
    return interpretations[sign] || "";
}
