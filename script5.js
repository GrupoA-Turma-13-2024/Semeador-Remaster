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

  function toggleLogin() {
    var loginContainer = document.getElementById('loginContainer');
    var escurecer = document.getElementById('escurecer');
    if (loginContainer.style.display === 'block') {
        loginContainer.style.display = 'none';
        escurecer.style.display = 'none';
    } else {
        loginContainer.style.display = 'block';
        escurecer.style.display = 'block';
    }
  }

  function botaotermo() {
    var termoContainer = document.getElementById('termoContainer');
    var escurecer = document.getElementById('escurecer');
    if (termoContainer.style.display === 'block') {
        termoContainer.style.display = 'none';
        escurecer.style.display = 'none';
    } else {
        termoContainer.style.display = 'block';
        escurecer.style.display = 'block';
    }
  }
  

  document.getElementById('lerTexto5').addEventListener('click', lerElementos5);