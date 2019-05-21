// Creare una griglia 6x6, ad ogni click su un riquadro parte una richiesta AJAX
// che prende un numero random da 1 a 9 (utilizzare l'API https://www.boolean.careers/api/random/int).
// Se è <= 5 il quadrato diventa giallo, se è > di 5 il quadrato diventa verde.
// Il numero ottenuto appare al centro del quadrato.
//
// mi raccomando, l'obiettivo dell'esercizio è giocare con ajax, non diventare matti a generare la griglia!
// Potete tranquillamente disegnarla direttamente nell'html per cominciare, POI,
// quando le chiamate ajax funzionano e il codice fa tutto quello che deve fare
// (cambiare colore al riquadro e inserire il numero), allora potete generare la griglia con jQuery,
// se vi fa piacere
$(document).ready(function() {
  for (var i = 0; i < 36; i++) {
    $.ajax({
      url: "https://www.boolean.careers/api/random/int",
      method: 'GET',
      success: function(data) {
        //salvo il numero della API in una variabile
        var random = data.response;
        //salvo il template del quadrato in una variabile
        var source = $('#square-gen').html();
        //compilo il template
        var template = Handlebars.compile(source);
        //imposto variabile in caso di vittoria
        var win = {
          'gameclass': "win"
        };
        //imposto variabile in caso di sconfitta
        var lose = {
          'gameclass': 'lose'
        }
        //imposto istruzioni di compilazione e compilo
        var quadrato;

        if (random <= 5) {
          quadrato = template(win);
        } else {
          quadrato = template(lose);
        }
        //inserisco template generato nel body
        $('.game').append(quadrato);
      },
      error: function() {
        alert('errore')
    }
    });
  }
});


$(document).on('click','.square', function() {
  $(this).toggleClass('click');
});
