
const materias = [
  { id: 1, nome: "Física", curso: "Sistemas" },
  { id: 2, nome: "Matemática", curso: "Sistemas" },
];

let sortDirection = true; 
let currentColumn = null; 


function renderTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; 

  
  materias.forEach((materia) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${materia.id}</td><td>${materia.nome}</td><td>${materia.curso}</td>`;
    tableBody.appendChild(row);
  });
}


function sortTable(column) {
  
  if (currentColumn === column) {
    sortDirection = !sortDirection;
  } else {
    sortDirection = true;
    currentColumn = column;
  }

  
  materias.sort((a, b) => {
    if (a[column] > b[column]) return sortDirection ? 1 : -1;
    if (a[column] < b[column]) return sortDirection ? -1 : 1;
    return 0;
  });

  
  updateArrows(column);

 
  renderTable();
}


function updateArrows(column) {
  const columns = ["id", "nome", "curso"];
  columns.forEach((col) => {
    const arrow = document.getElementById(`${col}-arrow`);
    if (col === column) {
      arrow.textContent = sortDirection ? " ↑" : " ↓";
    } else {
      arrow.textContent = "";
    }
  });
}


renderTable();


document
  .getElementById("addSubjectForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); 

    
    const id = parseInt(document.getElementById("id").value);
    const nome = document.getElementById("nome").value;
    const curso = document.getElementById("curso").value;

   
    materias.push({ id, nome, curso });

    
    renderTable();

    
    document.getElementById("addSubjectForm").reset();
  });

function editarCampos() {
  
  document.getElementById("editable-fields").style.display = "block";
  document.getElementById("email-text").style.display = "none";
  document.getElementById("cpf-text").style.display = "none";

  
  document.getElementById("cpf").value =
    document.getElementById("cpf-text").innerText;
  document.getElementById("email").value =
    document.getElementById("email-text").innerText;
}

function validarCPF(cpf) {
  
  cpf = cpf.replace(/\D/g, "");

  
  if (cpf.length !== 11) {
    return false;
  }

  
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(9))) {
    return false;
  }

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

function validarEmail(email) {
 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function salvarCampos() {
  
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;

 
  let isValid = true;
  let errorMessage = "";

  if (cpf && !validarCPF(cpf)) {
    errorMessage +=
      "CPF inválido. Deve estar no formato 000.000.000-00 e ser um CPF válido.\n";
    isValid = false;
  }

  if (email && !validarEmail(email)) {
    errorMessage +=
      "E-mail inválido. Deve estar no formato exemplo@dominio.com.\n";
    isValid = false;
  }

  if (!isValid) {
    alert(errorMessage);
    return; 
  }

  
  document.getElementById("cpf-text").innerText = cpf;
  document.getElementById("email-text").innerText = email;

  
  document.getElementById("editable-fields").style.display = "none";
  document.getElementById("email-text").style.display = "inline";
  document.getElementById("cpf-text").style.display = "inline";
}
let currentImageIndex = 0;

const images = [
  "JP Profile200px.jpg",
  "JP Profile 2_200px.jpg",
  "JP Profile 3_200px.jpg",
];

function changeImage(direction) {
  currentImageIndex =
    (currentImageIndex + direction + images.length) % images.length;
  document.getElementById("carouselImage").src = images[currentImageIndex];
}
