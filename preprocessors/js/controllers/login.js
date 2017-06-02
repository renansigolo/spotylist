// Esse controller é similar ao CadastroController, verificar os comentários
// feitos nele.
angular.module('setlist').controller("LoginController", LoginController);

function LoginController($scope, $firebaseAuth, $window) {
  var auth = $firebaseAuth();
  $scope.dados = {};
  $scope.login = login;
  $scope.mensagemErro;

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
    $scope.mensagemErro = erro.message;
  }
}
