const id_url = "2PACX-1vTiyh-S9W80RFrPR6BuxXo2_EgJUk1aUko7rB4P9SlMcsSi5Lg3bm4yLDncQ4rsv57879OMCKpnV--w";

const url = `https://docs.google.com/spreadsheets/d/e/${id_url}/pub?output=csv`;

// Elementos do DOM
const montadoraSelect = document.getElementById('montadora');
const modeloSelect = document.getElementById('modelo');
const resultado = document.getElementById('mostra-resultado');
const resultadoModelosAno = document.getElementById('mostra-resultado-modelos-ano');
const titulo = document.getElementById('titulo-resultado');
const modelosAno = document.getElementById('modelos-ano');

resultadoModelosAno.textContent = '';

let data = []; // Armazena os dados da planilha

// Fetch da planilha no formato CSV
async function fetchData() {
  try {
    const response = await fetch(url);
    const csvText = await response.text();
    processCSVData(csvText);
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
}

// Processar o CSV para array de objetos
function processCSVData(csvText) {
  const rows = csvText.split('\n');
  const headers = rows[0].split(',');

  data = rows.slice(1).map(row => {
    const values = row.split(',');
    return {
      montadora: values[2],
      modelo: values[3],
      ano: values[4],
    };
  });

  populateMontadoras();
}

// Popular o select de montadoras
function populateMontadoras() {
  const montadoras = [...new Set(data.map(item => item.montadora))];
  montadoras.forEach(montadora => {
    const option = document.createElement('option');
    option.value = montadora;
    option.textContent = montadora;
    montadoraSelect.appendChild(option);
  });

  montadoraSelect.addEventListener('change', handleMontadoraChange);
}

// Atualizar o select de modelos baseado na montadora
function handleMontadoraChange() {
  const montadora = montadoraSelect.value;
  modeloSelect.innerHTML = '<option value="">Selecione o ano</option>';
  modelosAno.innerHTML = '<option value="">Selecione o modelo</option>';
  resultadoModelosAno.style.display = "none";
  resultado.style.display = "none";
  resultado.textContent = '';

  if (!montadora) {
    modeloSelect.style.display = 'block';
    return;
  }

  const modelos = [
    ...new Set(data.filter(item => item.montadora === montadora).map(item => item.modelo))
  ];

  modelos.forEach(modelo => {
    const option = document.createElement('option');
    option.value = modelo;
    option.textContent = modelo;
    modeloSelect.appendChild(option);
  });

  modeloSelect.style.display = 'block';
  modeloSelect.addEventListener('change', handleModeloChange);
}

// Atualizar os anos baseado no modelo
function handleModeloChange() {
  const montadora = montadoraSelect.value;
  const modelo = modeloSelect.value;
  resultado.textContent = '';

  if (!modelo) return;

  const anos = [
    ...new Set(
      data
        .filter(item => item.montadora === montadora && item.modelo === modelo)
        .map(item => item.ano)
    )
  ];

  titulo.style.display = 'block';
  resultado.style.display = 'block';
  resultado.innerHTML = anos.join('<br>');

  populaModelos(anos);
}

// Popular o select de modelos-ano
function populaModelos(anos) {
  const modelos = [...new Set(anos.map(item => item))];
  modelos.forEach(modelo => {
    const option = document.createElement('option');
    option.value = modelo;
    option.textContent = modelo;
    modelosAno.appendChild(option);
  });

  modelosAno.style.display = 'block';
  modelosAno.addEventListener('change', pegaAno);
}

function pegaAno() {
  const modelo = modelosAno.value;

  if (!modelo) return;

  const anos = [
    ...new Set(
      data
        .filter(item => item.ano === modelo)
        .map(item => item.modelo)
    )
  ];

  resultadoModelosAno.style.display = "block";
  resultadoModelosAno.innerHTML = anos.join('<br>');
}


// Inicializar
fetchData();