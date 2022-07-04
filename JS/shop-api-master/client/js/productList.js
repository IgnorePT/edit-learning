// challenge nº2
// - Apply sortBy, category and sizes.
// - Fetch information from the server
// -- Should reload product list
// -- I can unselect filters.
// -- All the products should have their route correct.
// e.g - https://edit-shop-api.herokuapp.com/product.html?id=1
// Notes #2
// Category ids available:
// 1 - snickers
// 2 - coats
// 3 - pants
// 4 - jackets

//Criar Logica para página de produtos
// Conseguir produtos:
// 1 - Precisamos de conseguir ir buscar os produtos as api de produtos - 
// 2 - Precismos de armazenar esses produtos em algum sitio para utilizar

//1 - Pergunta - Como fazer uma chamada a uma api em Javascript?
// Resposta Google - (https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data-pt)

//Formato do Fetch (Promise) usando then()
//endpoint = url = http://localhost:5000/api/getProductsList
fetch('endpoint', { 
    //opcoes
}).then(function(resposta){

    //Esta função retorna uma novo objeto de Resposta  
    //https://developer.mozilla.org/en-US/docs/Web/API/Response

    return resposta.json(); //Convertemos a resposta em formato JSON

}).then(function(respostaEmFormatoJSON){
    /*
    Aqui ja podemos usar a resposta em formato JSON porque no then() anterior retornamos (return) a resposta usando o metodo json(); 
    */
    console.log(respostaEmFormatoJSON); // Imprimir na consola toda a resposta em formato json == objeto
})

