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
    $window.location.href = 'usuario.html';
  }

  function cadastroErro(erro) {
    // Ainda precisamos fazer o tratamento de erros vindos do Firebase
    // para orientar o usuário de nosso app.
    console.log(erro);
  }
}
