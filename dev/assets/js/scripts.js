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
    var token = 'BQAkffzR0iJZysjhdovV7tlRqaZKkPrGraxfWchxAT4h9HKswq5JLbsEzGvSJAfoP8tDmVDjkLFKNny__2SOxg';
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
//Configuração das rotas
function rotas($stateProvider, $urlRouterProvider) {

  $stateProvider.state('login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginController',
    url: '/login'
  });
  $stateProvider.state('cadastro', {
    templateUrl: 'templates/cadastro.html',
    controller: 'CadastroController',
    url: '/cadastro'
  });
  $stateProvider.state('home', {
    templateUrl: 'home.html',
    controller: 'HomeController',
    url: '/home'
  });

  $urlRouterProvider.otherwise('/login');

}

 //Script Timer
 var target_date = new Date("June 06, 2017").getTime();
 var dias, horas, minutos, segundos;
 var regressiva = document.getElementById("regressiva");

 setInterval(function () {

     var current_date = new Date().getTime();
     var segundos_f = (target_date - current_date) / 1000;

     if (segundos_f > 0) {
         dias = parseInt(segundos_f / 86400);
         segundos_f = segundos_f % 86400;

         horas = parseInt(segundos_f / 3600);
         segundos_f = segundos_f % 3600;

         minutos = parseInt(segundos_f / 60);
         segundos = parseInt(segundos_f % 60);

         document.getElementById('dia').innerHTML = dias;
         document.getElementById('hora').innerHTML = horas;
         document.getElementById('minuto').innerHTML = minutos;
         document.getElementById('segundo').innerHTML = segundos;
     } else {
         document.getElementById('alertaContador').innerHTML = 'Votação Encerrada <br> Aguarde o próximo show<br>;)';
         document.getElementById('alertaContador').classList.add('alert-warning', 'text-center', 'margin-top');
         document.getElementById('voteList').style.display = "none";
     }

 }, 1000);
// A função angular.module retorna o módulo informado caso o segundo parâmetro
// não seja informado.
angular.module('setlist').controller("CadastroController", CadastroController);

function CadastroController($scope, $firebaseAuth, $window) {
    // O serviço $firebaseAuth retorna um objeto que é usado para todas as
    // operações futuras de cadastro e autenticação.
    var auth = $firebaseAuth();
    $scope.dados = {};
    $scope.cadastrar = cadastrar;

    function cadastrar() {
        // Vamos criar o usuário com o e-mail e senha informada. Note que ainda
        // não fizemos nenhum tratamento para verificar se o formulário foi
        // preenchido.
        auth.$createUserWithEmailAndPassword($scope.dados.email, $scope.dados.senha)
            .then(cadastroSucesso).catch(cadastroErro);
    }

    function cadastroSucesso(sucesso) {
        // Caso o cadastro seja realizado com sucesso, vamos redirecionar o
        // usuário para página 'quadro'.
        console.log(sucesso);
        $window.location.href = 'home.html';
    }

    function cadastroErro(erro) {
        // Ainda precisamos fazer o tratamento de erros vindos do Firebase
        // para orientar o usuário de nosso app.
        console.log(erro);
    }
}

function cadastroController($scope, $state) {
    console.log("Cadastro");
}
function homeController($scope, $state) {
}

angular.module('setlist').controller("LoginController", LoginController);

function LoginController($scope, $firebaseAuth, $window) {
    var auth = $firebaseAuth();
    $scope.dados = {};
    $scope.login = login;
    $scope.mensagemErro = {};
    $scope.controleErro = false;

    function login() {
        // A única diferença desse controller para o de cadastro é a função
        // usada na comunicação com o Firebase.
        auth.$signInWithEmailAndPassword($scope.dados.email, $scope.dados.senha)
            .then(loginSucesso).catch(loginErro);
    }

    function loginSucesso(sucesso) {
        console.log(sucesso);
        $window.location.href = 'home.html';
    }

    function loginErro(erro) {
        $scope.controleErro = true;
        $scope.mensagemErro = erro.message;
    }
}

function loginController($scope, $state) {
    console.log("Login");
}
angular.module('setlist').controller("UsuarioController", UsuarioController);

function UsuarioController($scope, $firebaseAuth, $firebaseArray, $window) {
    var auth = $firebaseAuth();
    var ref;
    var listaAtiva;

    $scope.novaLista = null;

    $scope.logout = logout;
    $scope.criarLista = criarLista;
    $scope.criarCard = criarCard;
    $scope.definirListaAtiva = definirListaAtiva;

    // Esse método executa a função passada como parâmetro toda vez que o status
    // de autenticação é alterado. Isso também ocorre na primeira vez que o
    // Firebase informa o status do usuário. Note que essa operação é assíncrona,
    // de forma que precisamos esperar a resposta do Firebase para trabalhar
    // com os dados do usuário.
    auth.$onAuthStateChanged(buscarStatus);

    function buscarStatus(firebaseUser) {
        // Caso o usuário não esteja autenticado, a variável firebaseUser será
        // nula. Usamos esse if para evitar erros no console ao fazer o logout,
        // já que isso causa uma mudança no status e faz com que essa função
        // seja executada novamente.
        if (!firebaseUser) {
            return;
        }

        // Os dados do usuário devem ficar disponíveis no DOM, para que possamos
        // exibir o seu email na tela.
        $scope.usuario = firebaseUser;

        // Já que os dados do usuário já estão carregados, podemos acessar
        // o objeto que armazena as listas do usuário através do seu id.
        ref = firebase.database().ref('usuarios').child($scope.usuario.uid);

        // Essa função cria um array do Firebase na variável $scope.listas.
        $scope.listas = $firebaseArray(ref);
    }

    function logout() {
        // Essa função encerra a sessão do usuário no Firebase. Note que nem
        // o refresh de página encerra a sessão automaticamente.
        auth.$signOut();
        $window.location.href = 'index.html';
    }

    function criarLista($event, novaLista) {
        if (!checarEnter($event)) {
            return;
        }

        // Como a variável $scope.listas é um array do Firebase, precisamos
        // usar a função especial $add para adicionar items no seu interior.
        // Isso garante que os dados fiquem sincronizados com o Firebase.
        $scope.listas.$add({
            nome: novaLista
        });
        novaLista = null;
    }

    function criarCard($event, novoCard) {
        if (!checarEnter($event)) {
            return;
        }

        if (!listaAtiva.cards) {
            listaAtiva.cards = [];
        }

        listaAtiva.cards.push(novoCard);
        $scope.listas.$save(listaAtiva);
        novoCard = null;
    }

    function checarEnter($event) {
        return $event.keyCode == 13;
    }

    function definirListaAtiva(lista) {
        listaAtiva = lista;
        $scope.listas.$save(listaAtiva);
    }
}