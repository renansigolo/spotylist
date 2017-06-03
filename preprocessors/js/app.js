//Inicia o modulo do Angular
var app = angular.module('setlist', ['firebase', 'ui.router']);

//Declara os modulos do controllers
app.controller("LoginController", loginController);
app.controller("CadastroController", cadastroController);
app.controller("HomeController", homeController);

//Rotas
app.config(rotas);
