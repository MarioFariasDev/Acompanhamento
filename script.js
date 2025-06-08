// Lista de alunos
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

// Ao carregar a página, renderiza os alunos
window.onload = () => {
    renderAlunos();
};

// Adiciona novo aluno
document.getElementById("formAluno").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nomeAluno").value.trim();
    const nivel = document.getElementById("nivelAluno").value;
    const objetivo = document.getElementById("objetivoAluno").value;

    if (!nome) return alert("Digite o nome do aluno");

    const novoAluno = {
        nome,
        nivel,
        objetivo,
        treinos: gerarTreinoPersonalizado(nivel, objetivo),
    };

    alunos.push(novoAluno);
    salvarDados();
    renderAlunos();

    // Limpa o formulário
    document.getElementById("formAluno").reset();
});

// Renderiza a lista de alunos
function renderAlunos() {
    const lista = document.getElementById("listaAlunos");
    lista.innerHTML = "";

    alunos.forEach((aluno) => {
        const div = document.createElement("div");
        div.className = "aluno";

        const nome = document.createElement("span");
        nome.textContent = `${aluno.nome} - ${aluno.objetivo}`;

        const btnVer = document.createElement("button");
        btnVer.textContent = "Ver Treino";
        btnVer.onclick = () => verTreinos(aluno.nome);

        div.appendChild(nome);
        div.appendChild(btnVer);
        lista.appendChild(div);
    });
}

// Mostra os treinos no modal
function verTreinos(nome) {
    const aluno = alunos.find((a) => a.nome === nome);
    if (!aluno) return alert("Aluno não encontrado.");

    const titulo = document.getElementById("tituloTreinos");
    titulo.textContent = `Treinos de ${aluno.nome}`;

    const lista = document.getElementById("treinosLista");
    lista.innerHTML = "";

    aluno.treinos.forEach((treino) => {
        const li = document.createElement("li");
        li.textContent = treino;
        lista.appendChild(li);
    });

    document.getElementById("modalTreinos").classList.remove("hidden");
}

// Fecha o modal
function fecharModal() {
    document.getElementById("modalTreinos").classList.add("hidden");
}

// Gera treino com base no nível e objetivo
function gerarTreinoPersonalizado(nivel, objetivo) {
    if (objetivo === "5km") {
        return [
            "Dia 1: Caminhada rápida 30 min",
            "Dia 2: Corrida leve 3 km",
            "Dia 3: Descanso",
            "Dia 4: Corrida contínua 4 km",
            "Dia 5: Descanso",
            "Dia 6: Intervalado 20 min",
            "Dia 7: Corrida leve 3 km",
        ];
    } else if (objetivo === "10km") {
        return [
            "Dia 1: Corrida 5 km leve",
            "Dia 2: Subidas 6x 200m",
            "Dia 3: Descanso",
            "Dia 4: Corrida 7 km ritmo moderado",
            "Dia 5: Descanso",
            "Dia 6: Intervalado 5x 800m forte",
            "Dia 7: Corrida longa 10 km",
        ];
    }
    return ["Treino personalizado não disponível ainda."];
}

// Exportar para PDF
function exportarPDF() {
    const alunoNome = document.getElementById("tituloTreinos").textContent.replace("Treinos de ", "");
    const aluno = alunos.find(a => a.nome === alunoNome);
    if (!aluno) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Plano de Treino - ${aluno.nome}`, 10, 20);
    doc.setFontSize(12);

    aluno.treinos.forEach((treino, i) => {
        doc.text(`${treino}`, 10, 30 + i * 10);
    });

    doc.save(`Treino_${aluno.nome}.pdf`);
}

// Salva no localStorage
function salvarDados() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
}