// --- PARAMETRY ---
const produkt = "Jablka";
const puvodniCena = 15;

// Nabídka: Q = a + bP
const a = 3;
const b = 1.1;

// Poptávka: Q = c + dP
const c = 60;
const d = -1.4;

// --- DOM Elements ---
const btnNabidka = document.getElementById('btn-nabidka');
const btnPoptavka = document.getElementById('btn-poptavka');
const btnTrh = document.getElementById('btn-trh');
const nabidkaSection = document.getElementById('nabidka-section');
const poptavkaSection = document.getElementById('poptavka-section');
const trhSection = document.getElementById('trh-section');

// Produkt a cena do popisků
document.getElementById('nabidka-produkt').textContent = produkt;
document.getElementById('nabidka-puvodni-cena').textContent = puvodniCena;
document.getElementById('poptavka-produkt').textContent = produkt;
document.getElementById('poptavka-puvodni_cena').textContent = puvodniCena;
document.getElementById('trh-produkt').textContent = produkt;
document.getElementById('trh-puvodni_cena').textContent = puvodniCena;

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
  let ceny = [], mnozstvi = [];
  for (let i = 0; i <= 100; i++) {
    ceny.push(i);
    mnozstvi.push(a + b * i);
  }
  // Scatter pro zadanou cenu
  const mnozstviZadano = a + b * cena;
  let body = [{ x: cena, y: mnozstviZadano }];

  if (!nabidkaChart) {
    nabidkaChart = new Chart(document.getElementById('nabidka-graf').getContext('2d'), {
      type: 'line',
      data: {
        datasets: [{
          label: 'Nabídka',
          data: ceny.map((c, i) => ({ x: c, y: mnozstvi[i] })),
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.03)',
          fill: false,
          tension: 0.05,
          pointRadius: 0,
          borderWidth: 2,
          parsing: false
        },{
          label: 'Zadaná cena',
          data: body,
          type: 'scatter',
          showLine: false,
          pointRadius: 7,
          pointBackgroundColor: ['red'],
          borderColor: 'red',
          parsing: false
        }]
      },
      options: {
        plugins: { legend: { position: 'top' }},
        scales: {
          x: { title: { display: true, text: 'Cena (Kč)' }, min: 0, max: 100 },
          y: { title: { display: true, text: 'Nabízené množství' }, min: 0 }
        }
      }
    });
  } else {
    nabidkaChart.data.datasets[0].data = ceny.map((c, i) => ({ x: c, y: mnozstvi[i] }));
    nabidkaChart.data.datasets[1].data = body;
    nabidkaChart.update();
  }
  nabidkaVysledek.innerHTML = `Při ceně <b>${cena} Kč</b> výrobci nabídnou <b>${mnozstviZadano.toFixed(1)}</b> kusů produktu.`;
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
  for (let i = 0; i <= 100; i++) {
    ceny.push(i);
    mnozstvi.push(c + d * i);
  }
  // Scatter pro zadanou cenu
  const mnozstviZadano = c + d * cena;
  let body = [{ x: cena, y: mnozstviZadano }];

  if (!poptavkaChart) {
    poptavkaChart = new Chart(document.getElementById('poptavka-graf').getContext('2d'), {
      type: 'line',
      data: {
        datasets: [{
          label: 'Poptávka',
          data: ceny.map((c, i) => ({ x: c, y: mnozstvi[i] })),
          borderColor: 'green',
          backgroundColor: 'rgba(0,255,0,0.03)',
          fill: false,
          tension: 0.05,
          pointRadius: 0,
          borderWidth: 2,
          parsing: false
        },{
          label: 'Zadaná cena',
          data: body,
          type: 'scatter',
          showLine: false,
          pointRadius: 7,
          pointBackgroundColor: ['red'],
          borderColor: 'red',
          parsing: false
        }]
      },
      options: {
        plugins: { legend: { position: 'top' }},
        scales: {
          x: { title: { display: true, text: 'Cena (Kč)' }, min: 0, max: 100 },
          y: { title: { display: true, text: 'Poptávané množství' }, min: 0 }
        }
      }
    });
  } else {
    poptavkaChart.data.datasets[0].data = ceny.map((c, i) => ({ x: c, y: mnozstvi[i] }));
    poptavkaChart.data.datasets[1].data = body;
    poptavkaChart.update();
  }
  poptavkaVysledek.innerHTML = `Při ceně <b>${cena} Kč</b> spotřebitelé poptávají <b>${mnozstviZadano.toFixed(1)}</b> kusů produktu.`;
}
poptavkaCenaInput.addEventListener("input", e => {
  let cena = parseFloat(e.target.value) || puvodniCena;
  vykresliPoptavkaGraf(cena);
});
vykresliPoptavkaGraf(puvodniCena);

// --- Propojený trh (Nabídka & Poptávka) ---
const trhCenaInput = document.getElementById('trh-cena');
const trhVysledek = document.getElementById('trh-vysledek');
let trhChart;
function vykresliTrhGraf(cena) {
  const maxCena = 46;
  const minMnozstvi = -20;
  const maxMnozstvi = 120;

  // Nabídka a poptávka: x = cena, y = množství
  let ceny = [];
  let nabidkaXY = [];
  let poptavkaXY = [];
  for (let i = 0; i <= maxCena; i++) {
    ceny.push(i);
    nabidkaXY.push({ x: i, y: a + b * i });
    poptavkaXY.push({ x: i, y: c + d * i });
  }

  // Scatter pro zadanou cenu
  const mnozstviNab = a + b * cena;
  const mnozstviPop = c + d * cena;
  let bodyNab = [{ x: cena, y: mnozstviNab }];
  let bodyPop = [{ x: cena, y: mnozstviPop }];

  // Rovnováha
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
            data: bodyNab,
            type: 'scatter',
            showLine: false,
            pointRadius: 7,
            pointBackgroundColor: ['blue'],
            borderColor: 'blue',
            parsing: false
          },
          {
            label: 'Zadaná cena – poptávka',
            data: bodyPop,
            type: 'scatter',
            showLine: false,
            pointRadius: 7,
            pointBackgroundColor: ['green'],
            borderColor: 'green',
            parsing: false
          }
        ]
      },
      options: {
        plugins: { legend: { position: 'top' }},
        scales: {
          x: { title: { display: true, text: 'Cena (Kč)' }, min: 0, max: maxCena },
          y: { title: { display: true, text: 'Množství' }, min: minMnozstvi, max: maxMnozstvi }
        }
      }
    });
  } else {
    trhChart.data.datasets[0].data = nabidkaXY;
    trhChart.data.datasets[1].data = poptavkaXY;
    trhChart.data.datasets[2].data = bodyNab;
    trhChart.data.datasets[3].data = bodyPop;
    trhChart.options.scales.x.min = 0;
    trhChart.options.scales.x.max = maxCena;
    trhChart.options.scales.y.min = minMnozstvi;
    trhChart.options.scales.y.max = maxMnozstvi;
    trhChart.update();
  }

  // Výstup – pouze čísla, žádný komentář o trhu
  let info = `
    <b>Rovnovážná cena:</b> ${rovnovaznaCena.toFixed(2)} Kč,
    <b>rovnovážné množství:</b> ${rovnovazneMnozstvi.toFixed(1)} ks.<br>
    <b>Při ceně ${cena} Kč:</b>
    <br>Nabídka: <b>${mnozstviNab.toFixed(1)}</b> ks,
    poptávka: <b>${mnozstviPop.toFixed(1)}</b> ks.<br>
  `;
  trhVysledek.innerHTML = info;
}
trhCenaInput.addEventListener("input", e => {
  let cena = parseFloat(e.target.value) || puvodniCena;
  vykresliTrhGraf(cena);
});
vykresliTrhGraf(puvodniCena);

