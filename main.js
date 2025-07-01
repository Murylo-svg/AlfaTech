// main.js

// Pega a referência da div onde os produtos serão exibidos.
// É uma boa prática fazer isso uma vez só, no início do script.
const listaProdutosDiv = document.getElementById('lista-produtos');

/**
 * Função principal que busca os produtos do nosso servidor Node.js
 * e os exibe na tela.
 */
async function buscarEExibirProdutos() {
  // Verificamos se o elemento 'lista-produtos' realmente existe no HTML.
  if (!listaProdutosDiv) {
    console.error('Erro: Elemento com id "lista-produtos" não foi encontrado na página.');
    return;
  }

  try {
    // 1. FAZ A CHAMADA PARA O SERVIDOR
    // Faz a chamada para a rota '/produtos' do nosso servidor Node.js.
    const response = await fetch('http://localhost:3000/produtos');

    // Verifica se a resposta do servidor foi bem-sucedida (status 200-299)
    if (!response.ok) {
      // Se não foi, lança um erro para ser pego pelo bloco 'catch'.
      throw new Error(`Erro do servidor: ${response.status}`);
    }

    // Converte a resposta do servidor de JSON para um objeto/array JavaScript.
    const produtos = await response.json();

    // Limpa a lista antes de adicionar os novos itens, para evitar duplicatas.
    listaProdutosDiv.innerHTML = '';

    // Verifica se o array de produtos está vazio.
    if (produtos.length === 0) {
      listaProdutosDiv.innerHTML = '<p>Nenhum produto cadastrado no momento.</p>';
      return;
    }

    // 2. CRIA O HTML PARA CADA PRODUTO
    // Passa por cada produto retornado pelo servidor.
    produtos.forEach(produto => {
      // Cria o card do produto em formato de string HTML.
      // Adicionamos verificações para caso a imagem ou descrição sejam nulas.
      const produtoCard = `
        <div class="produto-card">
          <img src="${produto.imagem_url || 'caminho/para/imagem_padrao.jpg'}" alt="${produto.nome}">
          <h3>${produto.nome}</h3>
          <p>${produto.descricao || 'Sem descrição disponível.'}</p>
          <span class="preco">R$ ${Number(produto.preco).toFixed(2)}</span>
          <p>Estoque: ${produto.estoque}</p>
        </div>
      `;
      // Adiciona o card do produto na div principal.
      listaProdutosDiv.innerHTML += produtoCard;
    });

  } catch (error) {
    // 3. TRATA POSSÍVEIS ERROS
    // Se ocorrer qualquer erro (servidor offline, problema de rede, etc.),
    // ele será capturado aqui.
    console.error('Falha ao buscar produtos:', error);
    // Exibe uma mensagem de erro amigável para o usuário na página.
    listaProdutosDiv.innerHTML = `<p style="color: red;">Ocorreu um erro ao carregar os produtos. Por favor, tente novamente mais tarde.</p>`;
  }
}

// Chama a função para carregar os produtos assim que a página e o script forem lidos.
buscarEExibirProdutos();