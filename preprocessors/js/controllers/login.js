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
    $window.location.href = 'usuario.html';
  }

  function loginErro(erro) {
    $scope.controleErro = true;
    $scope.mensagemErro = erro.message;
  }
}

function loginController($scope, $state) {
  console.log("Login");
}
