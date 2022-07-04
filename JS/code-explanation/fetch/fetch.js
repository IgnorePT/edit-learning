// Aceder a uma API atraves de metodos fetch
/*
     Fetch é uma função que nos permite acceder a dados de outros recursos disponivies, podem ser de ficheiros
     ou recursos que se encontrem disponiveis online na internet a estes recursos chamamos de API's 
    
     Estrutura do Fetch:
     - A função fetch recebe 2 parametros, o primeiro é o enpoint que estamos a chamar ou caminho para o fichero,
      o segundo é opcional, e é uma objeto onde podemos passar configurações

    - endpoint == url ('string') - exemplo: 'http://localhost:5000/api/getProductsList'
    - objeto == {} - exemplo: 
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
}).then(function(resposta){

    //Esta função retorna uma novo objeto de Resposta  
    //https://developer.mozilla.org/en-US/docs/Web/API/Response

    return resposta.json(); //Existe uma função neste objeto de resposta que nos permite converter a resposta em formato JSON.

}).then(function(respostaEmFormatoJSON){
    /*
    Aqui ja podemos usar a resposta em formato JSON porque no then() anterior retornamos ("return") a resposta usando o metodo json(); 
    */
    console.log(respostaEmFormatoJSON); // Imprimir na consola toda a resposta em formato json == objeto
})

/* A função Fetch retorna uma promise (Promesa) que é um objeto cujo valor pode existir no imediato, num futuro proximo, ou nunca.

Sendo assim ela pode ter diferentes estados :
-- pending: estado inicial, significa que a operação da promise ainda não foi completada ou rejeitada. 
-- fulfilled: significa que a operação da promise foi completada com sucesso.
-- rejected: significa que a operação da promise falhou e foi rejeitada.
*/
