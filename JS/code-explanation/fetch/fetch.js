
/*
    Aceder a uma API atraves de metodos fetch
    Fetch é uma função que nos permite acceder a dados de outros recursos disponivies, podem ser de ficheiros
    ou recursos que se encontrem disponiveis online na internet a estes recursos chamamos de API's 
    
    Estrutura do Fetch:
    - A função fetch recebe 2 parametros, o primeiro é o enpoint que estamos a chamar ou caminho para o fichero,
    o segundo é opcional, e é uma objeto onde podemos passar configurações

    * endpoint == url ('string')
    exemplo: 'http://localhost:5000/api/getProductsList'

    * objeto == {} 
    exemplo: 
    {
        method: 'POST', // *GET, POST, PUT, DELETE, etc. -- Metodos disponiveis de chamadas
        mode: 'cors', // no-cors, *cors, same-origin -- se permite chamar recursos de origens diferentes
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached -- 
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        ...etc
    }

*/

//Exemplo de Fetch:

fetch('endpoint', {
    //opcoes
}).then(function (resposta) {

    //Esta função retorna uma novo objeto de Resposta  
    //https://developer.mozilla.org/en-US/docs/Web/API/Response

    return resposta.json(); //Existe uma função neste objeto de resposta que nos permite converter a resposta para formato JSON.

}).then(function (respostaEmFormatoJSON) {
    /* Aqui ja podemos usar a resposta em formato JSON porque no then() anterior retornamos ("return") a resposta usando o metodo json(); */

    console.log(respostaEmFormatoJSON); // Imprimir na consola toda a resposta em formato json == objeto (semelhante)

}).catch(function (valorRejeitado) {
    console.error(error) //caso aconteça algum erro iremos implrimir na consola o erro
})

/**  
A função Fetch retorna uma promise (Promesa) que é um objeto cujo valor pode existir no imediato, num futuro proximo, ou nunca.

Sendo assim ela pode ter diferentes estados :
-- pending: estado inicial, significa que a operação da promise ainda não foi concluida ou rejeitada. 
-- fulfilled: significa que a operação da promise foi concluida com sucesso.
-- rejected: significa que a operação da promise falhou e foi rejeitada.


Mas então como fazemos para aguardar pela resolução da promise??
Existem duas formas ou encademos o metodo then() que é um metodo das promises ou podemos utilizar a nomencula asyc/await (Ver mais afrente)
NEste primeiro caso utilizamos o metodo then() 

O metodo then() este metodo tambem retorna uma promise e recebe 2 parametros que são duas funções(Metodos)
- o primeiro utilizado quando a promise é reolvida com sucesso
- o segundo utilizado em caso da promise ser rejeitada 

Esta segunda função/metodo pode ser omitida e podemos utilizar o metodo catch() para tratar das promises que foram rejeitadas
O metodo catch() recebe uma função como parametro onde podemos tratar o erro caso a promise tenha sido rejeitada.

*/

// Versão 1 . Fetch com .then(func1, func2)

fetch('http://localhost:5000/api/getProductsList') //não precisei de passar o 2º parametro que é um objeto de configuração e é opcional
    .then(function (respostaConcluida) {

        console.log("Promise Resolvida com Sucesso");
        return respostaConcluida.json();

    }, function (respostaRejeitada) {

        console.log("Promise Rejeitada ");
        console.error(respostaRejeitada);

    }).then(function (respostaConcluidaJson) {

        //Resposta da função positiva anterior em formato JSON
        console.log(respostaConcluidaJson);
    }, function (respostaRejeitada2) {

        console.log("Segunda Promise Rejeitada ");
        console.error(respostaRejeitada2);
    })

/** 
 * Ter em atenção que no caso anterior o then() recebe os 2 parametros separados por , simplificado ficaria assim:
 * fetch('...').then( function(...){...} , function(...){...}).then(function(...){...} , function(...){...})
 * 
 * Como este tipo de escrita é mais confuso é mais normal usarmos o then().catch() - ver Versão 2.
*/

// Versão 2 - Mesma função com Catch()
fetch('http://localhost:5000/api/getProductsList') //não precisei de passar o 2º parametro que é um objeto de configuração e é opcional
    .then(function (respostaConcluida) {

        console.log("Promise Resolvida com Sucesso");
        return respostaConcluida.json();

    }).then(function (respostaConcluidaJson) {

        //Resposta da função positiva anterior em formato JSON
        console.log(respostaConcluidaJson);

    }).catch(function (respostaRejeitada) {

        console.log("Segunda Promise Rejeitada ");
        console.error(respostaRejeitada);
    })

/**
 * Versão 3 - Versão com Async/Await
 * 
 * Async / Await é uma forma de sintatica de simplificar a escrita de promises, ela simplifica a forma de escrita e leitura assim
 * como permite escrever codigo de uma forma mais sequencial permitindo esperar pela resolução da promise antes de ela ser resolvida
 * 
 * Para termos a possibilidade de utilizar async/await temos de necessariamente declarar uma função assíncrona sem uma função
 * assíncrona não nos será possivel utilizarmos a expressão await para esperar pelo resultado desta forma somos sempre obrigados
 * a colocar o Fetch(que é uma promise) dentro de uma função assíncrona.
 * 
 * Estrutura do async / await com fetch! 
 */

//Definimos uma função assincrona colocando o async antes de declarar a função
async function funcaoAssincrona(){

    //Agora dentro da função assincrona podemos utilizar o await para esperar que o fetch vá buscar os dados.
    // Neste caso armazenamos a resposta na variavel response! 
    const response = await fetch('endpoint'); // a variavel response var receber o calor da resposta do fetch que é um objeto de Resposta (Ver primeiro exemplo de fetch).

    //Como o response é um objeto de Resposta temos o mesmo metodo "json()" disponivel para ser usado    
    const responseJson = await response.json() // precisamos de usar o await para converter em JSON porque este metodo é CPU Bound (https://pt.wikipedia.org/wiki/CPU_bound)

    console.log(responseJson); // Imprimir na consola toda a resposta em formato json == objeto (semelhante)

}


/**
 * Versão GetProductList usando async await
 * 
 * Como vimos anteriormente foi necessario criar uma função assíncrona para podermos utilizar o async/await
 * dentro dessa função é que utilizamos o fetch e esperamos pelo seu resultado usando a sintaxe await
 */

async function getProductData(){

    const response = await fetch('http://localhost:5000/api/getProductsList');
    const productList = await response.json();

    // Na variavel productList já pode ser utilizada para popular os dados da view como no challenge
    // O mais comum neste caso é depois criarmos uma função que vai tratar dos dados separadamente para se tornar mais facil de manter o codigo
    handleProductListResponse(productList); //Funcão externa que vai receber a resposta dos produtos em json para tratar.
}

/**
 * Notas:
 * Podemos definir funções normais, arrow functions ou anonimas como async e utilizarmos o await
 * Deixo em baixo alguns exemplos de funções declaradas de forma diferente.
 * Vejam bem onde esta localizada o async que é sempre antes de declarar a função
 */

//Normal utilizando function
async function funcaoX(){
    const response = await fetch('endpoint');
}

//Arrow Function
const funcaoY = async () => {
    const response = await fetch('endpoint');
}

//Função anonima (sem nome) neste caso declaramos a função para o eventListener : function(){} <- isto é uma função anonima
window.addEventListener("DOMContentLoaded", async function(){
    const response = await fetch('endpoint');
});


//Função anonima (sem nome) neste caso usando uma arrow function anonima : () => {} <- isto é uma função anonima
window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('endpoint');
});
