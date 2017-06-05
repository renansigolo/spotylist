var app = angular.module('spotify', []);

function BuscaController($scope, $http) {
  $scope.entrada = null;
  $scope.artistas = null;
  $scope.erro = false;

  $scope.buscar = buscar;
  $scope.buscarNoEnter = buscarNoEnter;


  // Inserir o token gerado aqui
  var token = 'BQCpewEpKCgUiCsyz1EOdIzJXSziNZGeEQWMNZ4roeD_S768H8rZgdO6OV-P-sM039HLRn5pS6xwVU-Ik0T7hg';
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
}

app.controller('BuscaController', BuscaController);
