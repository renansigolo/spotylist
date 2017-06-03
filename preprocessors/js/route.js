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
    templateUrl: 'templates/home.html',
    controller: 'HomeController',
    url: '/home'
  });

  $urlRouterProvider.otherwise('/login');

}
