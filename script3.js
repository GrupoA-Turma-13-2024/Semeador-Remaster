function lerElementos3() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    } else {
      const elementos3 = document.querySelectorAll('.ler_texto3');
      elementos3.forEach(elemento3 => {
        const texto3 = elemento3.textContent;
        const utterance3 = new SpeechSynthesisUtterance(texto3);
        window.speechSynthesis.speak(utterance3);
      });
    }
  }

  document.getElementById('lerTexto3').addEventListener('click', lerElementos3);