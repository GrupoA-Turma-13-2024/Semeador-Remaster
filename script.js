
// elementos para descer a tela

document.getElementById('descer1').addEventListener('click', function(){
    document.getElementById('alvo1').scrollIntoView({behavior:'smooth'
});
});

document.getElementById('descer2').addEventListener('click', function(){
    document.getElementById('alvo2').scrollIntoView({behavior:'smooth'
});
});


document.getElementById('descer3').addEventListener('click', function(){
    document.getElementById('alvo3').scrollIntoView({behavior:'smooth'
});
});

document.getElementById('descer4').addEventListener('click', function(){
    document.getElementById('alvo4').scrollIntoView({behavior:'smooth'
});
});

document.getElementById('descer5').addEventListener('click', function(){
    document.getElementById('alvo5').scrollIntoView({behavior:'smooth'
});
});


function lerElementos() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    } else {
      const elementos = document.querySelectorAll('.ler_texto');
      elementos.forEach(elemento => {
        const texto = elemento.textContent;
        const utterance = new SpeechSynthesisUtterance(texto);
        window.speechSynthesis.speak(utterance);
      });
    }
  }
  
  // Adiciona o evento de clique ao botão
  document.getElementById('lerTexto').addEventListener('click', lerElementos);
  
