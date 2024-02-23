// Selecionando todos os elementos com a classe 'article.botao-modal-1' e adicionando um event listener a cada um
document.querySelectorAll('article.botao-modal-1').forEach((botao) => {
    botao.addEventListener('click', () => {
      // Criando o fundo escuro do modal e adicionando ao body
      const fundo = criarFundo();
      // Selecionando o modal, o título e o texto do modal
      const modal = document.querySelector('div.modal-1');
      const tituloModal = document.querySelector('h2.titulo-modal-1');
      const textoModal = document.querySelector('p.texto-modal-1');
  
      // Preenchendo o título e o texto do modal com base no botão clicado
      tituloModal.innerHTML = botao.children[0].textContent;
      textoModal.innerHTML = botao.children[1].textContent;
  
      // Exibindo o modal e configurando o evento de fechamento
      modal.classList.remove('off');
      fundo.addEventListener('click', fecharModal);
      document.querySelector('.fechar').addEventListener('click', fecharModal);
    });
  });
  
  // Função para criar o fundo escuro do modal
  function criarFundo() {
    const fundo = document.createElement('div');
    fundo.classList.add('on');
    document.body.appendChild(fundo);
    document.body.style.overflow = 'hidden'; // Impede que a página role enquanto o modal está aberto
    return fundo;
  }
  
  // Função para fechar o modal
  function fecharModal() {
    const fundo = document.querySelector('div.on');
    const modal = document.querySelector('div.modal-1');
  
    // Removendo o fundo escuro e escondendo o modal
    document.body.removeChild(fundo);
    modal.classList.add('off');
    document.body.style.removeProperty('overflow'); // Permite que a página role novamente
  }
  
  // Abrir Barra Lateral
  document.addEventListener('DOMContentLoaded', function () {
    // Selecionando o botão do menu e a barra lateral
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.querySelector('.barra-lateral');
  
    // Função para alternar as classes dos elementos do menu
    function toggleMenuClasses() {
      const filhos = menuBtn.children;
  
      if (filhos.length > 0) {
        filhos[0].classList.toggle('mudarX');
  
        if (filhos.length > 1) {
          filhos[1].classList.toggle('esconder');
        }
  
        filhos[filhos.length - 1].classList.toggle('mudarY');
      }
    }
  
    // Event listener para abrir/fechar o menu ao clicar no botão
    menuBtn.addEventListener('click', function () {
      // Alternando a visibilidade do menu
      const menuFechado = menu.classList.contains('oculto');
      menu.classList.toggle('oculto');
  
      // Chamando a função para adicionar/remover classes
      toggleMenuClasses();
    });
  
    // Fechar o menu ao clicar fora dele ou no botão do menu novamente
    document.addEventListener('click', function (event) {
      if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        const menuFechado = menu.classList.contains('oculto');
        menu.classList.add('oculto');
  
        // Chamando a função para adicionar/remover classes apenas se o menu estiver aberto
        if (!menuFechado) {
          toggleMenuClasses();
        }
      }
    });
  });
  // Fim da Barra
  
  // Pesquisa
  // Selecionando elementos relacionados à pesquisa
  const busca = document.querySelector('#buscar');
  const historicoContainer = document.querySelector('.historico');
  const botaoPesquisar = document.querySelector('.botao-pesquisar');
  const deletarHistoricoCompleto = document.querySelector('.botao-deletar');
  
  // Event listeners para a pesquisa
  busca.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      realizarBusca();
    }
  });
  
  botaoPesquisar.addEventListener('click', () => {
    realizarBusca();
  });
  
  // Função para realizar a busca
  function realizarBusca() {
    const termoBuscado = busca.value.trim();
  
    if (termoBuscado !== '') {
      criarElemento(termoBuscado); // Criar e exibir um novo item de histórico
      salvarElemento(termoBuscado); // Salvar o termo no localStorage
      busca.value = '';
    }
  }
  
  // Função para criar um novo item de histórico
  function criarElemento(termo) {
    const historicoItem = document.createElement('div');
    historicoItem.classList.add('item');
  
    const itemHistorico = document.createElement('p');
    itemHistorico.classList.add('p-historico');
    itemHistorico.textContent = termo;
  
    const deletaHistorico = document.createElement('span');
    deletaHistorico.innerHTML = `
      <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 6M1 6L6 1" stroke="#D91414" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    deletaHistorico.addEventListener('click', () => excluirElemento(historicoItem, termo));
  
    // Event listener para deletar o histórico completo
    deletarHistoricoCompleto.addEventListener('click', () => {
      if (localStorage.length >= 1) {
        historicoContainer.innerHTML = '';
        localStorage.clear();
      } else {
        console.error('Erro: Não há histórico para apagar.');
      }
    })
  
    // Adicionando elementos ao DOM
    historicoContainer.appendChild(historicoItem);
    historicoItem.appendChild(itemHistorico);
    historicoItem.appendChild(deletaHistorico);
  }
  
  // Função para salvar o termo no localStorage
  function salvarElemento(termo) {
    let historico = localStorage.getItem('historico') ? JSON.parse(localStorage.getItem('historico')) : [];
    historico.push(termo);
    localStorage.setItem('historico', JSON.stringify(historico));
  }
  
  // Função para excluir um item de histórico
  function excluirElemento(elemento, termo) {
    historicoContainer.removeChild(elemento);
  
    let historico = localStorage.getItem('historico') ? JSON.parse(localStorage.getItem('historico')) : [];
    historico = historico.filter(item => item !== termo);
    localStorage.setItem('historico', JSON.stringify(historico));
  }
  
  // Carregar o histórico ao carregar a página
  window.addEventListener('load', () => {
    const historico = localStorage.getItem('historico') ? JSON.parse(localStorage.getItem('historico')) : [];
    historico.forEach(termo => criarElemento(termo));
  });