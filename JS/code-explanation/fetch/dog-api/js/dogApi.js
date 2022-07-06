/* 
    API Exercicio
    Descrição: Vamos Usar o Dog API para preencher uma imagem aleatoriamente na pagina!
    Endpoint: https://dog.ceo/api/breeds/image/random Fetch!
*/

console.log("We are a dog api!!!"); // Testar se o ficheiro esta a ser carregado na página (Na consola do browser tem de aparecer esta mensagem)

/**
 * O objetivo deste exercicio é usarmos o fetch para popular uma imagem no ficheiro index.html
 * Para isso precisamos de ir buscar dados a uma API de cães e modificar a DOM para apresentar o resultado
 * - Importate: FETCH e DOM Manipulaton
 * 
 * Para popular a DOM e modificar precisamos de garantir que ela existe e o seu conteudo foi carregado
 * para isso podemos usar o metodo addEventListener passando o parametro de DOMContentLoaded e desta forma garantimos
 * que o codigo que for inserido na sua função(tambem chamado de callback) ira correr depois de todos os elementos estarem carregados
 * 
 * Dentro de esta função entao podemos contactar a API para receber os dados e modificar a DOM
 */

// Vamos usar metodo then().catch() para este exemplo
// Criamos o addEventListener da window com o DOMContentLoaded
window.addEventListener("DOMContentLoaded", function(){
    // Primeiro passo é fazermos fetch a API de forma a conseguirmos os dados necessario para popular a página (Ver ficheiro fetch.js)
    // Como a base do fetch é um metodo get simples não precisamos de passar o parametro opcional com as opções
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(function(response){
             //Usamos a função JSON do response Object para convertes os dados a formato JSON e retornamos para a proxima função
            return response.json();

            //Precisamos de encadear outro then() de forma a ter acesso aos dados em formato JSON
        }).then(function(resposeInJson){
            //Aqui ja temos os dados em formato json uma boa forma de ver os dados que recebemos é fazendo console.log da resposta
            console.log(resposeInJson);

            /**
             * Objeto que recebemos:
              {
                "message": "https://images.dog.ceo/breeds/terrier-russell/iguet2.jpeg",
                "status": "success"
            }
             */
            
            //Tendo acessoa resposta verificamos que o message traz um url para a imagem
            //Desta forma so precisamos de 
            document.getElementById('imageDog').setAttribute('src', resposeInJson.message);

        }).catch(function(error) {
            console.error(error); //Imprimimos o erro na consola caso alguma coisa falhe na API
        })

})


/**
 * Exercicios Iniciados
 */

/**
 * Exercicio 1
 * 
 * Criar uma nova section e onde temos que apresentar uma nova imagem de um cão mas neste caso a imagem tem de aparecer antes do texto
 * Treino: HTML, CSS, DOM Manipulation & Fetch de API
 */


/**
 * Exercicio 2
 * 
 * Utilizando a documentação da API queremos fazer uma listagem de todas as raças disponiveis a ser utilizado para cães
 * Link para a documentação da API: https://dog.ceo/dog-api/documentation/
 * 
 * Ter atenção ao que se recebe.
 * Treino: HTML, CSS, DOM Manipulation & Fetch de API
 */