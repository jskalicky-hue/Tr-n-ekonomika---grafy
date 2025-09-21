// Nastavení výchozích hodnot
const produkt = "Jablka";
const puvodniCena = 15;

// Parametry nabídky a poptávky (lze upravit dle potřeby)
const a = 3;      // posun nabídky (intercept nabídky)
const b = 1.1;    // sklon nabídky (nabídka roste s cenou)
const c = 60;     // posun poptávky (intercept poptávky)
const d = -1.4;   // sklon poptávky (poptávka klesá s cenou)

// --- DOM Elements ---
const btnNabidka = document.getElementById('btn-nabidka');
const btnPoptavka = document.getElementById('btn-poptavka');
const btnTrh = document.getElementById('btn-trh');
const nabidkaSection = document.getElementById('nabidka-section');
const poptavkaSection = document.getElementById('poptavka-section');
const trhSection = document.getElementById('trh-section');

// Popisy produktů a cen
document.getElementById('nabidka-produkt').textContent = produkt;
document.getElementById('nabidka-puvodni-cena').textContent = puvodniCena;
document.getElementById('poptavka-produkt').textContent = produkt;
document.getElementById('poptavka-puvodni-cena').textContent = puvodniCena;
document.getElementById('trh-produkt').textContent = produkt;
document.getElementById('trh-puvodni-cena').textContent = puvodniCena;

// Přepínání záložek
function hideAll() {
  nabidkaSection.style.display = "none";
  poptavkaSection.style.display = "none";
  trhSection.style.display = "none";
  btnNabidka.classList.remove("active");
  btnPoptavka.classList.remove("active");
  btnTrh.classList.remove("active");
}
btnNabidka.onclick = function() {
  hideAll();
  nabidkaSection.style.display = "";
  btnNabidka.classList.add("active");
};
btnPoptavka.onclick = function() {
  hideAll();
  poptavkaSection.style.display = "";
  btnPoptavka.classList.add("active");
};
btnTrh.onclick = function() {
  hideAll();
  trhSection.style.display = "";
  btnTrh.classList.add("active");
};

// --- Nabídka ---
const nabidkaCenaInput = document.getElementById('nabidka-cena');
const nabidkaVysledek = document.getElementById('nabidka-vysledek');
let nabidkaChart;
function vykresliNabidkaGraf(cena) {
  // Nabídka: Q = a + b*P
  // Generuj data
  let ceny = [], mnozstvi = [];
  for (let i = 0; i <= 100; i += 1) {
    ceny.push(i);
    mnozstvi.push(a + b * i);
  }
  // Najdi index zadané ceny
  let idx = ceny.findIndex(val => val >= cena);
  // Data pro zvýraznění bodu
  let body = ceny.map((_,i) => i===idx ? a + b*cena : null);

  if (!nabidkaChart) {
    nabidkaChart = new Chart(document.getElementById('nabidka-graf').getContext('2d'), {
      type: 'line',
      data: {
        labels: ceny,
        datasets: [{
          label: 'Nabídka',
          data: mnozstvi,
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.03)',
          fill: false,
          tension: 0.05,
          pointRadius: 0,
          borderWidth: 2
        },{
          label: 'Zadaná cena',
          data: body,
          type: 'scatter',
          showLine: false,
          pointRadius: 7,
          pointBackgroundColor: ['red'],
          borderColor: 'red'
        }]
      },
      options: {
        plugins: { legend: { position: 'top' }},
        scales: {
          x: { title: { display: true, text: 'Cena (Kč)' }, min: 0, max: 100 },
          y: { title: { display: true, text: 'Nabízené množství' }, beginAtZero: true }
        }
      }
    });
  } else {
    nabidkaChart.data.labels = ceny;
    nabidkaChart.data.datasets[0].data = mnozstvi;
    nabidkaChart.data.datasets[1].data = body;
    nabidkaChart.update();
  }
  // Výstup
  const mnozstviZadano = a + b * cena;
  nabidkaVysledek.innerHTML = `
    Při ceně <b>${cena} Kč</b> výrobci nabídnou <b>${mnozstviZadano.toFixed(1)}</b> kusů produktu.
  `;
}
nabidkaCenaInput.addEventListener("input", e => {
  let cena = parseFloat(e.target.value) || puvodniCena;
  vykresliNabidkaGraf(cena);
});
vykresliNabidkaGraf(puvodniCena);

// --- Poptávka ---
const poptavkaCenaInput = document.getElementById('poptavka-cena');
const poptavkaVysledek = document.getElementById('poptavka-vysledek');
let poptavkaChart;
function vykresliPoptavkaGraf(cena) {
  // Poptávka: Q = c + d*P
  let ceny = [], mnozstvi = [];
  for (let i = 0; i <= 100; i += 1) {
    ceny.push(i);
    mnozstvi.push(c + d * i);
  }
  let idx = ceny.findIndex(val => val >= cena);
  let body = ceny.map((_,i) => i===idx ? c + d*cena : null);

  if (!poptavkaChart) {
    poptavkaChart = new Chart(document.getElementById('poptavka-graf').getContext('2d'), {
      type: 'line',
      data: {
        labels: ceny,
        datasets: [{
          label: 'Poptávka',
          data: mnozstvi,
          borderColor: 'green',
          backgroundColor: 'rgba(0,255,0,0.03)',
          fill: false,
          tension: 0.05,
          pointRadius: 0,
          borderWidth: 2
        },{
          label: 'Zadaná cena',
          data: body,
          type: 'scatter',
          showLine: false,
          pointRadius: 7,
          pointBackgroundColor: ['red'],
          borderColor: 'red'
        }]
      },
      options: {
        plugins: { legend: { position: 'top' }},
        scales: {
          x: { title: { display: true, text: 'Cena (Kč)' }, min: 0, max: 100 },
          y: { title: { display: true, text: 'Poptávané množství' }, beginAtZero: true }
        }
      }
    });
  } else {
    poptavkaChart.data.labels = ceny;
    poptavkaChart.data.datasets[0].data = mnozstvi;
    poptavkaChart.data.datasets[1].data = body;
    poptavkaChart.update();
  }
  // Výstup
  const mnozstviZadano = c + d * cena;
  poptavkaVysledek.innerHTML = `
    Při ceně <b>${cena} Kč</b> spotřebitelé poptávají <b>${mnozstviZadano.toFixed(1)}</b> kusů produktu.
  `;
}
poptavkaCenaInput.addEventListener("input", e => {
  let cena = parseFloat(e.target.value) || puvodniCena;
  vykresliPoptavkaGraf(cena);
});
vykresliPoptavkaGraf(puvodniCena);

// --- Propojený trh (nabídka & poptávka) ---
const trhCenaInput = document.getElementById('trh-cena');
const trhVysledek = document.getElementById('trh-vysledek');
let trhChart;
function vykresliTrhGraf(cena) {
  // Propojený trh: osa X = množství, osa Y = cena
  let ceny = [], nabidka = [], poptavka = [];
  for (let i = 0; i <= 100; i += 1) {
    ceny.push(i);
    nabidka.push(a + b * i);
    poptavka.push(c + d * i);
  }
  let idx = ceny.findIndex(val => val >= cena);

  // Najdi množství nabídky a poptávky pro zadanou cenu
  const mnozstviNab = a + b * cena;
  const mnozstviPop = c + d * cena;

  // Dataset pro scatter bod v zadané ceně (přehozené osy)
  let bodyNab = nabidka.map((mq, i) => i===idx ? { x: mq, y: ceny[idx] } : null);
  let bodyPop = poptavka.map((mq, i) => i===idx ? { x: mq, y: ceny[idx] } : null);

  // Přepočet pro přehozené osy: x = množství, y = cena
  let nabidkaXY = ceny.map((cena, i) => ({ x: nabidka[i], y: cena }));
  let poptavkaXY = ceny.map((cena, i) => ({ x: poptavka[i], y: cena }));

  // Rovnovážná cena a množství
  const rovnovaznaCena = (c - a) / (b - d);
  const rovnovazneMnozstvi = a + b * rovnovaznaCena;

  if (!trhChart) {
    trhChart = new Chart(document.getElementById('trh-graf').getContext('2d'), {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Nabídka',
            data: nabidkaXY,
            borderColor: 'blue',
            backgroundColor: 'rgba(0,0,255,0.03)',
            fill: false,
            tension: 0.05,
            pointRadius: 0,
            borderWidth: 2,
            parsing: false
          },
          {
            label: 'Poptávka',
            data: poptavkaXY,
            borderColor: 'green',
            backgroundColor: 'rgba(0,255,0,0.03)',
            fill: false,
            tension: 0.05,
            pointRadius: 0,
            borderWidth: 2,
            parsing: false
          },
          {
            label: 'Zadaná cena – nabídka',
            data: bodyNab.filter(v => v),
            type: 'scatter',
            showLine: false,
            pointRadius: 7,
            pointBackgroundColor: ['blue'],
            borderColor: 'blue'
          },
          {
            label: 'Zadaná cena – poptávka',
            data: bodyPop.filter(v => v),
            type: 'scatter',
            showLine: false,
            pointRadius: 7,
            pointBackgroundColor: ['green'],
            borderColor: 'green'
          }
        ]
      },
      options: {
        plugins: { legend: { position: 'top' }},
        scales: {
          x: { title: { display: true, text: 'Množství' }, beginAtZero: true },
          y: { title: { display: true, text: 'Cena (Kč)' }, min: 0, max: 100 }
        }
      }
    });
  } else {
    trhChart.data.datasets[0].data = nabidkaXY;
    trhChart.data.datasets[1].data = poptavkaXY;
    trhChart.data.datasets[2].data = bodyNab.filter(v => v);
    trhChart.data.datasets[3].data = bodyPop.filter(v => v);
    trhChart.update();
  }

  // Výstup: pouze rovnovážná cena a množství, bez nadbytku/nedostatku
  let info = `
    <b>Rovnovážná cena:</b> ${rovnovaznaCena.toFixed(2)} Kč,
    <b>rovnovážné množství:</b> ${rovnovazneMnozstvi.toFixed(1)} ks.<br>
    <b>Při ceně ${cena} Kč:</b>
    <br>Nabídka: <b>${mnozstviNab.toFixed(1)}</b> ks,
    poptávka: <b>${mnozstviPop.toFixed(1)}</b> ks.<br>
  `;
  // Odstraněna informace o nadbytku/nedostatku
  trhVysledek.innerHTML = info;
}
trhCenaInput.addEventListener("input", e => {
  let cena = parseFloat(e.target.value) || puvodniCena;
  vykresliTrhGraf(cena);
});
vykresliTrhGraf(puvodniCena);
