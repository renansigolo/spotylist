//Inicia o modulo do Angular
var app = angular.module('setlist', ['firebase', 'ui.router']);

//Declara os modulos do controllers
app.controller("LoginController", loginController);
app.controller("CadastroController", cadastroController);
app.controller("HomeController", homeController);
app.controller('BuscaController', buscaController);

//Rotas
app.config(rotas);

//Spotify
function buscaController($scope, $http) {

    $scope.entrada = null;
    $scope.artistas = null;
    $scope.erro = false;

    $scope.buscar = buscar;
    $scope.buscarNoEnter = buscarNoEnter;


    // Inserir o token gerado aqui
    var token = 'BQD4J3Z5Z3Osk_E2LeW9IgkfIxvrdYCbZKZZdfh9YB6udb_8RynYHW2C_KB-Wy93qfgKGH0Nj56OmznlMT4cKQ';
    //


    var tempoInicio;

    function buscar() {
        $scope.erro = false;

        var parametros = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/search?type=artist&q=' + $scope.entrada,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };

        $http(parametros).then(respostaSucesso, respostaErro);
    }

    function respostaSucesso(resposta) {
        $scope.artistas = resposta.data.artists.items;
        console.log(resposta);
        var IdAtrtista = resposta.data.artists.items[0].id;
        var searchTopTracks = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/artists/' + IdAtrtista + '/top-tracks?country=US',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        $http(searchTopTracks).then(topTracks);
    }

    function topTracks(body) {
        console.log(body);
        $scope.tracks = body.data.tracks;
    }


    function respostaErro() {
        $scope.artistas = null;
        $scope.erro = true;
    }

    function buscarNoEnter(event) {
        //verificar o código da tecla pressionada
        //o código 13 é a tecla 'enter'
        if (event.keyCode == 13) {
            buscar();
        }
    }
    //generate a random number to use on span tags
    $scope.getRandomSpan = function () {
    return Math.floor((Math.random() * 1000) + 1);
}
}