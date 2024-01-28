



let carrinho = [];


//função ao clicar em add ao carrinho

// vai pegar as informações do onclick 'adicionarProduto'
function adicionarProduto(nome, preco, imagem) {
    // ultilizando o metodo push para adicionar no array ' let carrinho ' 
    // fazendo com que após clicar em 'adicionarProduto' sera adicionado pelo array as informações (nome,preço,imagem)  
    carrinho.push({ nome, preco, imagem });
    // criar uma função para atualizar carrinho se houver remoção ou adição
    atualizarCarriinho();
}

//função de remover produto
//  cria-se um paramentro chamado index por dentro da função para ultilizala em outros metodos
// sendo fundamental 'para chamar o parametro após o click da função e ocorrer uma alteração so quando for chamada'
function removerProduto(index) {
    carrinho.splice(index, 1); // pegando o array carrinho para fazer a remover o produto do array ultilizando o metodo splice
    // consequentemento removendo o produto pelo parametro chamado daquela função proposta pelo botão
    atualizarCarriinho(); // atualizar o carrinho após fazer a alteração
}

const carrinhoDiv = document.getElementById('carrinho');
carrinhoDiv.style.display = 'block'; // Tornar o carrinho visível automaticamente
//função para alterar carrinho apos exclusão ou adição
function atualizarCarriinho() { // aqui onde vai ocorrer a função onde vai atualizar se caso houver alguma alteração nas funções acima

    const listaCarrinho = document.getElementById("lista-carrinho"); //função para puxar a info de saida "lista carrinho"
    listaCarrinho.innerHTML = "";//aparecer na tela de maneira att

    //  forEach executa uma função para cada um dos parametors como argumento deste metodo pelo carrinho
    carrinho.forEach((produto, index) => {
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
        listaCarrinho.appendChild(li); // faz com que a tabela da variavel constante 'li' apareça pelo id ListaCarrinho
    });

    const totalCarrinho = document.getElementById("total-carrinho"); // variavel constante que vai pegar o preço do total dos produtos
    const total = carrinho.reduce((total, produto) => total + produto.preco, 0); // ultilizando o metodo reduce para somar os itens total e produto
    // fazendo com que ele intere buscando o valor anterior
    totalCarrinho.innerText = total.toFixed(2); // apos somar o total, com a propiedade tofixed(2) vai limitar o numero de casas quando sair o resultado
    // em "total-carrinho" acima
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.style.display = 'block'

    // Supondo que esta parte do código está em algum lugar antes da chamada da função sairCarrinho

}

// ...

function sair() {

    // Obtém o estado atual usando getComputedStyle
    // Alterna entre "block" e "none"
    carrinhoDiv.style.display = carrinhoDiv.style.display === "none" ? "block" : "none";

}




var botaoPayPalRenderizado = false;

function renderizarBotaoPayPal() {
    // Verificar se o botão do PayPal já foi renderizado
    if (!botaoPayPalRenderizado) {
        paypal.Buttons({
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            currency_code: 'BRL',
                            value: carrinho.reduce((total, produto) => total + produto.preco, 0)
                        }
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    alert("Pagamento realizado com sucesso!");
                    console.log(details);

                    // Limpar carrinho apenas após a conclusão bem-sucedida da transação
                    carrinho = [];

                    // Atualizar carrinho, se necessário
                    atualizarCarriinho();
                });
            },
            onError: function (err) {
                alert("Ocorreu um erro durante o pagamento", err);
            }
        }).render('#paypal-button-container'); // Renderizar no elemento com id "paypal-button-container"

        // Atualizar a variável para indicar que o botão foi renderizado
        botaoPayPalRenderizado = true;
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        // Adiciona um listener para o envio do formulário
        document.getElementById("form").addEventListener("submit", function enviar(event) {
            event.preventDefault(); // Impede o comportamento padrão do formulário

            var cep1 = document.forms["form"]["cep1"].value;
            var endereco1 = document.forms["form"]["endereco1"].value;
            var endereco2 = document.forms["form"]["endereco2"].value;

            if (cep1 == "") {
                alert("O campo CEP está vazio");
                return false;
            }

            if (endereco1 == "") {
                alert("O campo Endereço 1 está vazio");
                return false;
            }

            localStorage.setItem("cep1", cep1);
            localStorage.setItem("endereco1", endereco1);
            localStorage.setItem("endereco2", endereco2);

            // Exibir o contêiner do PayPal após o envio do formulário
            document.getElementById("paypal-button-container").style.display = "block";

            // Renderizar o botão do PayPal
            renderizarBotaoPayPal();
        });
    });


}

    // funcção de click para dedect display
    function toggleCarrinho() {

        carrinhoDiv.style.display = carrinhoDiv.style.display === "none" ? "block" : "none";
    }





    function comprar() {


        var cep = document.forms["formulario"]["cep"].value;
        var en1 = document.forms["formulario"]["ed1"].value;
        var en2 = document.forms["formulario"]["ed2"].value;

        carrinho.push({cep});
        carrinho.push({en1});
        carrinho.push({en2});

        // Salvar o carrinho localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        window.location.href = "../pagADM/index.html";

        return false;
    }






    function carregarProdutos() {
        // recuperar o carrinho do localStorage
        const carrinhoSalvo = localStorage.getItem('carrinho');
        carrinho = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []; //verifica se carrinho tem itens, se tier volte como verdadeiro e transfira

        // Atualizar a exibição da lista de produtos
        atualizarProduto();
    }

    function atualizarProduto() {
        const tbody = document.getElementById("corpo-tabela");
        tbody.innerHTML = "";

        //passar para uma tabela <tr>
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
        `;
            tbody.appendChild(tr);
        });
    }

    // função para carregar produto
    carregarProdutos();









