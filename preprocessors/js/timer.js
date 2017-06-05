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