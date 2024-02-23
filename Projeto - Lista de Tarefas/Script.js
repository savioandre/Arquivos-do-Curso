function criarLista(titulo, texto) {
    const listas = document.querySelector('.layout_listas');

    const div = document.createElement('div');
    const input = document.createElement('input');
    const textarea = document.createElement('textarea');
    const span = document.createElement('span');

    div.classList.add('lista');
    input.classList.add('titulo_lista');
    input.placeholder = 'Título';
    input.value = titulo || '';
    textarea.classList.add('texto_lista');
    textarea.placeholder = 'Digite aqui...';
    textarea.value = texto || '';
    span.classList.add('msg');
    span.innerHTML = 'Salvamento Automático';

    listas.appendChild(div);
    div.appendChild(input);
    div.appendChild(textarea);
    div.appendChild(span);

    // Salvando os dados sempre que uma nova lista é criada
    salvarDados();
}

function salvarDados() {
    const divs = document.querySelectorAll('.lista');
    const historico = [];

    divs.forEach(div => {
        const titulo = div.querySelector('.titulo_lista').value;
        const texto = div.querySelector('.texto_lista').value;
        historico.push({ titulo, texto });
    });

    localStorage.setItem('lista', JSON.stringify(historico));
}

function restaurarDados() {
    const historico = JSON.parse(localStorage.getItem('lista')) || [];

    historico.forEach(item => {
        criarLista(item.titulo, item.texto);
    });
}

document.querySelector('.botao_nova_lista')
    .addEventListener('click', () => {
        // Quando o botão é clicado, cria uma nova lista
        criarLista();
    });

document.addEventListener('input', () => {
    // Sempre que houver uma entrada de texto, os dados são salvos
    salvarDados();
});

// Restaura os dados quando a página é carregada
window.onload = restaurarDados;
