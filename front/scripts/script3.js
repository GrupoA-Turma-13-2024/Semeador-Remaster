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
async function obterTextos() {
  const response = await fetch('http://localhost:3000/textos');
  const textos = await response.json();

  // Itera sobre os textos e preenche os elementos no HTML
  for (let texto of textos) {
    const tituloElemento = document.querySelector(`#titulo-${texto.id}`);
    const textoElemento = document.querySelector(`#texto-${texto.id}`);

    if (tituloElemento) tituloElemento.textContent = texto.titulo;
    if (textoElemento) textoElemento.textContent = texto.texto;
  }
}

document.addEventListener('DOMContentLoaded', obterTextos);
document.addEventListener('DOMContentLoaded', obterImagens);

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


  document.getElementById('lerTexto3').addEventListener('click', lerElementos3);