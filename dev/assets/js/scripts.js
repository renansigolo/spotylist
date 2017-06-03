//Inicia o modulo do Angular
var app = angular.module('setlist', ['firebase', 'ui.router']);

//Declara os modulos do controllers
app.controller("LoginController", loginController);
app.controller("CadastroController", cadastroController);
app.controller("HomeController", homeController);

//Rotas
app.config(rotas);

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
  console.log("Home");
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
