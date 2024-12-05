async function obterImagens() {
    try {
      const response = await fetch('http://localhost:3000/api/imagens');
      if (!response.ok) {
        throw new Error("Erro ao obter imagens.");
      }
  
      const imagens = await response.json();
  
      // Itera sobre as imagens e preenche os elementos <img> no HTML
      for (let imagem of imagens) {
        const imgElemento = document.querySelector(`#imagem-${imagem.id}`);
        
        if (imgElemento) {
          imgElemento.src = imagem.imagem; // Define o atributo 'src' com a URL da imagem
        }
      }
    } catch (error) {
      console.error("Erro ao carregar imagens:", error);
    }
  }

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', obterImagens);

  async function obterTextos() {
    const response = await fetch('http://localhost:3000/textos');
    const textos = await response.json();
  
    // Itera sobre os textos e preenche os elementos no HTML
    for (let texto of textos) {
      const tituloElemento = document.querySelector(`#titulo-${texto.id}`);
      const textoElemento = document.querySelector(`#texto-${texto.id}`);
  
      if (tituloElemento) tituloElemento.textContent = texto.titulo;
  
      if (textoElemento) {
        // Substituir \n por <br> e inserir no HTML
        textoElemento.innerHTML = texto.texto.replace(/\n/g, '<br>');
      }
    }
  }
  
  
  document.addEventListener('DOMContentLoaded', obterTextos);

  

let currentIndex10 = 0;

function showSlide10(index10) {
    const slides10 = document.querySelectorAll('.carousel10-item');
    if (index10 >= slides10.length) {
        currentIndex10 = 0;
    } else if (index10 < 0) {
        currentIndex10 = slides10.length - 1;
    } else {
        currentIndex10 = index10;
    }
    slides10.forEach((slide10, r) => {
        slide10.classList.toggle('active', r === currentIndex10);
    });
}

function nextSlide10() {
    showSlide10(currentIndex10 + 1);
}

function prevSlide10() {
    showSlide10(currentIndex10 - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide10(currentIndex10);
});



setInterval(() => {
nextSlide10();
}, 5000);



function lerElementos4() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    } else {
      const elementos4 = document.querySelectorAll('.ler_texto4');
      elementos4.forEach(elemento4 => {
        const texto4 = elemento4.textContent;
        const utterance4 = new SpeechSynthesisUtterance(texto4);
        window.speechSynthesis.speak(utterance4);
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
  
  
  
  // Adiciona o evento de clique ao botão
  document.getElementById('lerTexto4').addEventListener('click', lerElementos4);