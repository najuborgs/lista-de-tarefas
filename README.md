# 📝 Aplicação de Lista de Tarefas (To-Do List)

Bem-vindo ao seu primeiro projeto prático de desenvolvimento web! Esta aplicação foi desenvolvida utilizando a tríade fundamental da web: **HTML5**, **CSS3** e **JavaScript puro (Vanilla JS)**.

---

## 📂 Estrutura do Projeto

O projeto é dividido em três componentes essenciais:

1. **`index.html` (Estrutura / Esqueleto)**
   - Define os elementos visuais da página: títulos, formulário de texto, botões e a lista vazia (`<ul>`) que receberá as tarefas.

2. **`style.css` (Aparência / Estilo)**
   - Deixa a página visualmente moderna, centralizada e limpa.
   - Aplica efeitos de foco, cores suaves, riscado nas tarefas concluídas e botões com transições interativas.

3. **`script.js` (Interatividade / Cérebro)**
   - Gerencia a lógica do aplicativo:
     - Adiciona tarefas digitadas no campo.
     - Marca/desmarca tarefas como concluídas ao clicar nelas.
     - Remove tarefas pelo botão "Remover".
     - Salva e recupera as tarefas do `localStorage` (a memória do seu navegador), mantendo os dados mesmo após atualizar ou fechar a aba.

---

## 🚀 Como testar e visualizar o projeto

Não é necessário instalar nenhum programa extra, servidor ou dependência externa!

1. Abra a pasta do projeto no seu explorador de arquivos:
   `C:\Users\naju0\.gemini\antigravity\scratch\lista-de-tarefas`
2. Dê um duplo clique no arquivo **`index.html`**.
3. Ele abrirá diretamente no seu navegador padrão (Chrome, Edge, Firefox, etc.).

---

## 💡 Próximos desafios para você praticar

Quando estiver confortável com o código, tente fazer pequenos experimentos:
- Mudar as cores principais no início do arquivo `style.css` (na seção `:root`).
- Adicionar uma confirmação antes de remover uma tarefa (usando `confirm("Tem certeza?")` no JavaScript).
- Criar um botão "Limpar todas as tarefas concluídas".
