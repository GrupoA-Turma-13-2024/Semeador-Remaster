function lerElementos5() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    } else {
      const elementos5 = document.querySelectorAll('.ler_texto5');
      elementos5.forEach(elemento5 => {
        const texto5 = elemento5.textContent;
        const utterance5 = new SpeechSynthesisUtterance(texto5);
        window.speechSynthesis.speak(utterance5);
      });
    }
  }

  document.getElementById('lerTexto5').addEventListener('click', lerElementos5);