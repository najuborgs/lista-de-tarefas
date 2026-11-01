/**
 * ====================================================================
 * APLICAÇÃO DE LISTA DE TAREFAS (TO-DO LIST)
 * ====================================================================
 * Este arquivo JavaScript é o "cérebro" da aplicação.
 * Ele controla o que acontece quando o usuário interage com a página:
 * 1. Adicionar uma tarefa
 * 2. Concluir/desmarcar uma tarefa
 * 3. Excluir uma tarefa
 * 4. Salvar as tarefas no navegador (LocalStorage)
 */

// --------------------------------------------------------------------
// 1. SELEÇÃO DOS ELEMENTOS DO HTML (DOM)
// --------------------------------------------------------------------
// Capturamos os elementos que precisaremos ler ou alterar.
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const taskCounter = document.getElementById('task-counter');

// --------------------------------------------------------------------
// 2. ESTADO DA APLICAÇÃO (DADOS)
// --------------------------------------------------------------------
// Nossas tarefas serão guardadas em uma lista (array) de objetos.
// Exemplo de uma tarefa: { id: 16988888, text: "Comprar pão", completed: false }
let tarefas = [];

// Carrega as tarefas salvas no navegador ao abrir a página
function carregarTarefasDoArmazenamento() {
  const dadosSalvos = localStorage.getItem('minhas_tarefas');
  if (dadosSalvos) {
    tarefas = JSON.parse(dadosSalvos);
  }
}

// Salva as tarefas atuais no localStorage (memória do navegador)
function salvarTarefasNoArmazenamento() {
  localStorage.setItem('minhas_tarefas', JSON.stringify(tarefas));
}

// --------------------------------------------------------------------
// 3. ATUALIZAÇÃO VISUAL (RENDERIZAÇÃO)
// --------------------------------------------------------------------
// Esta função redesenha a lista na tela com base no array 'tarefas'.
function renderizarTarefas() {
  // Limpa o conteúdo atual da lista antes de recriar
  todoList.innerHTML = '';

  // Controla a visibilidade da mensagem de lista vazia
  if (tarefas.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }

  // Atualiza o contador de tarefas
  const concluidas = tarefas.filter(t => t.completed).length;
  taskCounter.textContent = `${tarefas.length} tarefa(s) • ${concluidas} concluída(s)`;

  // Itera por cada tarefa e cria o elemento correspondente no HTML
  tarefas.forEach((tarefa) => {
    // 1. Cria o item de lista (<li>)
    const li = document.createElement('li');
    li.className = `todo-item ${tarefa.completed ? 'completed' : ''}`;

    // 2. Cria a área esquerda (checkbox + texto)
    const leftDiv = document.createElement('div');
    leftDiv.className = 'todo-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = tarefa.completed;
    // Quando o usuário clica no checkbox, alterna o status
    checkbox.addEventListener('change', () => alternarConclusao(tarefa.id));

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = tarefa.text;
    // Permite clicar no texto também para marcar como concluído
    span.addEventListener('click', () => alternarConclusao(tarefa.id));

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    // 3. Cria a área direita (badge de status + botão de excluir)
    const rightDiv = document.createElement('div');
    rightDiv.className = 'todo-right';

    // Badge visual indicando se a tarefa está concluída ou pendente
    const statusBadge = document.createElement('span');
    statusBadge.className = `status-badge ${tarefa.completed ? 'badge-completed' : 'badge-pending'}`;
    statusBadge.textContent = tarefa.completed ? '✓ Concluída' : 'Pendente';

    // Cria o botão de excluir
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Remover';
    deleteBtn.title = 'Excluir esta atividade';
    // Quando clicado, remove a tarefa
    deleteBtn.addEventListener('click', () => removerTarefa(tarefa.id));

    rightDiv.appendChild(statusBadge);
    rightDiv.appendChild(deleteBtn);

    // 4. Junta tudo dentro do <li> e insere na lista (<ul>)
    li.appendChild(leftDiv);
    li.appendChild(rightDiv);
    todoList.appendChild(li);
  });
}

// --------------------------------------------------------------------
// 4. AÇÕES DA APLICAÇÃO (ADICIONAR, CONCLUIR, REMOVER)
// --------------------------------------------------------------------

// Adiciona uma nova tarefa
function adicionarTarefa(texto) {
  const novaTarefa = {
    id: Date.now(), // Gera um identificador único baseado no milissegundo atual
    text: texto,
    completed: false
  };

  tarefas.push(novaTarefa);
  salvarTarefasNoArmazenamento();
  renderizarTarefas();
}

// Alterna o status da tarefa entre concluída e pendente
function alternarConclusao(id) {
  tarefas = tarefas.map((tarefa) => {
    if (tarefa.id === id) {
      return { ...tarefa, completed: !tarefa.completed };
    }
    return tarefa;
  });

  salvarTarefasNoArmazenamento();
  renderizarTarefas();
}

// Remove uma tarefa da lista
function removerTarefa(id) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  salvarTarefasNoArmazenamento();
  renderizarTarefas();
}

// --------------------------------------------------------------------
// 5. EVENTOS DO USUÁRIO
// --------------------------------------------------------------------

// Escuta o envio do formulário (quando clica em "Adicionar" ou aperta Enter)
form.addEventListener('submit', (evento) => {
  evento.preventDefault(); // Impede que a página recarregue

  const texto = input.value.trim();

  // Verifica se o usuário não digitou apenas espaços em branco
  if (texto !== '') {
    adicionarTarefa(texto);
    input.value = ''; // Limpa o campo de digitação
    input.focus();    // Mantém o cursor no campo
  }
});

// --------------------------------------------------------------------
// 6. INICIALIZAÇÃO
// --------------------------------------------------------------------
// Quando a página é carregada pela primeira vez:
carregarTarefasDoArmazenamento();
renderizarTarefas();
