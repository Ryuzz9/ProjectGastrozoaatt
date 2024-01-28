



let carrinho = [];
 

//função ao clicar em add ao carrinho

// vai pegar as informações do onclick 'adicionarProduto'
function adicionarProduto(nome,preco,imagem){
    // ultilizando o metodo push para adicionar no array ' let carrinho ' 
    // fazendo com que após clicar em 'adicionarProduto' sera adicionado pelo array as informações (nome,preço,imagem)  
    carrinho.push({nome,preco,imagem});
    // criar uma função para atualizar carrinho se houver remoção ou adição
    atualizarCarriinho();
}
 
 //função de remover produto
//  cria-se um paramentro chamado index por dentro da função para ultilizala em outros metodos
// sendo fundamental 'para chamar o parametro após o click da função e ocorrer uma alteração so quando for chamada'
function removerProduto(index){ 
    carrinho.splice(index,1); // pegando o array carrinho para fazer a remover o produto do array ultilizando o metodo splice
                             // consequentemento removendo o produto pelo parametro chamado daquela função proposta pelo botão
    atualizarCarriinho(); // atualizar o carrinho após fazer a alteração
}

const carrinhoDiv = document.getElementById('carrinho');
carrinhoDiv.style.display = 'block'; // Tornar o carrinho visível automaticamente
 //função para alterar carrinho apos exclusão ou adição
function atualizarCarriinho(){ // aqui onde vai ocorrer a função onde vai atualizar se caso houver alguma alteração nas funções acima
 
    const listaCarrinho = document.getElementById("lista-carrinho"); //função para puxar a info de saida "lista carrinho"
    listaCarrinho.innerHTML = "";//aparecer na tela de maneira att
 
    //  forEach executa uma função para cada um dos parametors como argumento deste metodo pelo carrinho
    carrinho.forEach((produto,index)=>{  
        
         const listaPedido = document.getElementById("lista-pedido")
        const li = document.createElement("li");  // cria uma variavel inalteravel onde vai criar uma tabela para adicionar o produto 
        // comando de saida como tabela ultilizando img e span
        li.innerHTML = `
        <img src="${produto.imagem}">
        <span>${produto.nome}</span>
        <span>${produto.preco}</span>
        <button onclick="removerProduto(${index})"> Remover</button>
        `;
        // OBS: FUNÇÃO DE EXTREMA IMPORTANCIA 'index' no button onclick acima tem sua função de chamar o parametro index da função removerProduto
        // fazendo com que ele faça a função apos clicar em remover prdouto no botão da pagina  
        listaPedido.appendChild(tr); // faz com que a tabela da variavel constante 'li' apareça pelo id ListaCarrinho

        carrinho.forEach((produto,index)=>{  
            const tr = document.createElement("tr");  // cria uma variavel inalteravel onde vai criar uma tabela para adicionar o produto 
            // comando de saida como tabela ultilizando img e span
            tr.innerHTML = `
            
            <span>${produto.nome}</span>
            <span>${produto.preco}</span>
            <button onclick="removerProduto(${index})"> Remover</button>
            `;
            // OBS: FUNÇÃO DE EXTREMA IMPORTANCIA 'index' no button onclick acima tem sua função de chamar o parametro index da função removerProduto
            // fazendo com que ele faça a função apos clicar em remover prdouto no botão da pagina  
            listaCarrinho.appendChild(li); // faz com que a tabela da variavel constante 'li' apareça pelo id ListaCarrinho
        });
    });
}





function comprar() {
    var cep = document.forms["formulario"]["cep"].value;
        var en1 = document.forms["formulario"]["ed1"].value;
        var en2 = document.forms["formulario"]["ed2"].value;

        carrinho.push({cep});
        carrinho.push({en1});
        carrinho.push({en2});

    // Salve o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    window.location.href = "../pagADM/index.html";
}






function carregarProdutos() {
    // Recupere o carrinho do localStorage
    const carrinhoSalvo = localStorage.getItem('carrinho');
    carrinho = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];

    // Atualize a exibição da lista de produtos
    atualizarProduto();
}

function atualizarProduto() {
    const tbody = document.getElementById("corpo-tabela");
    tbody.innerHTML = "";

    // Itere sobre os produtos do carrinho e adicione à tabela
    carrinho.forEach((produto, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${produto.nome}</td>
            <td>${produto.preco}</td>
            <td>${produto.cep}</td>
            <td>${produto.en1}</td>
            <td>${produto.en2}</td> 
            <button onclick="removerProduto(${index})"> Remover</button>
            <p>
        `;
        tbody.appendChild(tr);
    });
}

// Chame a função para carregar os produtos ao carregar a página
carregarProdutos();

function removerProduto(index){

    carrinho.splice(index,1);

    atualizarProduto()

}

function imprimirTabela() {
    // Oculta os elementos que não devem ser impressos
    
        document.getElementById('home').style.display = 'none';
        document.getElementById('navbar').style.display = 'none';
        document.querySelector('.imgbanner').style.display = 'none';
        document.querySelector('.banner').style.display = 'none';
        document.querySelector('.produtos').style.display = 'none';
        document.querySelector('.produto').style.display = 'none';
        document.querySelector('.adicionar').style.display = 'none';
        document.querySelector('.carros').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
        document.getElementById('.tabela').style.display = 'block';

    // Chama o método de impressão
    window.print();

    // Restaura a visibilidade dos elementos após a impressão
    document.getElementById('.navbar').style.display = "block";
    document.getElementById('home').style.display = "block";
    document.getElementById('.produto').style.display = "block";
    document.querySelector('.imgbanner').style.display = 'block';
    document.querySelector('.banner').style.display = 'block';
    document.querySelector('.produtos').style.display = 'block';
    document.querySelector('.adicionar').style.display = 'block';
    document.getElementById('.tabela').style.display = 'block';
    document.querySelector('.carros').style.display = 'block';

  }


    

