let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

function salvarAlunos() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
}

function renderAlunos() {
    const container = document.getElementById("listaAlunos");
    container.innerHTML = "";
    alunos.forEach((aluno, index) => {
        const div = document.createElement("div");
        div.className = "aluno";
        div.innerHTML = `
      <strong>${aluno.nome}</strong> (${aluno.nivel})<br>
      <button onclick="verTreino(${index})">Ver treino</button>
    `;
        container.appendChild(div);
    });
}

function gerarTreinos(nivel) {
    const treinos = {
        iniciante: [
            "Caminhada 30min",
            "Trote leve 2km",
            "Descanso",
            "Caminhada 20min + trote 1km",
            "Trote 3km",
            "Descanso",
            "Corrida leve 4km"
        ],
        intermediario: [
            "Corrida leve 5km",
            "Fartlek 3x(500m rápido / 500m leve)",
            "Descanso",
            "Tiros 4x400m",
            "Corrida moderada 6km",
            "Descanso",
            "Longão 8km"
        ],
        avancado: [
            "Intervalado 6x600m",
            "Corrida moderada 8km",
            "Descanso ativo (bike 30min)",
            "Tiros 8x400m",
            "Corrida forte 5km",
            "Descanso",
            "Longão 12km"
        ]
    };
    return treinos[nivel] || [];
}

function verTreino(index) {
    const aluno = alunos[index];
    const treinos = aluno.treinos || gerarTreinos(aluno.nivel);
    aluno.treinos = treinos;
    salvarAlunos();

    const titulo = document.getElementById("tituloTreinos");
    const lista = document.getElementById("treinosLista");
    titulo.textContent = `Treinos da semana: ${aluno.nome}`;
    lista.innerHTML = "";

    treinos.forEach((treino, i) => {
        const li = document.createElement("li");
        li.textContent = treino;
        if (aluno.concluidos && aluno.concluidos.includes(i)) {
            li.classList.add("concluido");
        }
        li.addEventListener("click", () => {
            aluno.concluidos = aluno.concluidos || [];
            if (aluno.concluidos.includes(i)) {
                aluno.concluidos = aluno.concluidos.filter(j => j !== i);
                li.classList.remove("concluido");
            } else {
                aluno.concluidos.push(i);
                li.classList.add("concluido");
            }
            salvarAlunos();
        });
        lista.appendChild(li);
    });

    document.getElementById("modalTreinos").classList.remove("hidden");
}

function fecharModal() {
    document.getElementById("modalTreinos").classList.add("hidden");
}

document.getElementById("formAluno").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nomeAluno").value;
    const nivel = document.getElementById("nivelAluno").value;

    alunos.push({ nome, nivel, concluidos: [] });
    salvarAlunos();
    renderAlunos();
    e.target.reset();
});

renderAlunos();
