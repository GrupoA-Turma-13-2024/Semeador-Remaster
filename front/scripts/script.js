const API_URL = "http://localhost:3000/api/login";

// Função para alternar a exibição do formulário de login
function toggleLogin() {
  const loginContainer = document.getElementById("loginContainer");
  loginContainer.classList.toggle("active"); // Adiciona ou remove a classe 'active'
}

// Lida com o envio do formulário de login
document.querySelector(".login-container form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.error); // Exibe uma mensagem de erro
      return;
    }

    const data = await response.json();
    alert(`Bem-vindo, ${data.usuario.nome}!`);
    toggleLogin(); // Fecha o formulário de login após o sucesso
    window.location.href = "../crud/imagens.html";
  } catch (error) {
    alert("Erro ao fazer login. Tente novamente.");
  }
});

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

    if (textoElemento) {
      // Substituir \n por <br> e inserir no HTML
      textoElemento.innerHTML = texto.texto.replace(/\n/g, '<br>');
    }
  }
}
  
document.addEventListener('DOMContentLoaded', obterTextos);
document.addEventListener('DOMContentLoaded', obterImagens);



let startTime = Date.now(); // Inicializa assim que o script é carregado
document.addEventListener("DOMContentLoaded", () => {
  // Atualiza o tempo de início após o DOM estar completamente carregado
  startTime = Date.now();
});

// Evento para capturar o tempo antes de fechar ou recarregar a página
window.addEventListener("beforeunload", () => {
  if (startTime) {
    const endTime = Date.now(); // Tempo no momento do fechamento
    const elapsedTime = Math.round((endTime - startTime) / 1000); // Tempo em segundos
    console.log("Tempo decorrido:", elapsedTime, "segundos");

    // Envia o tempo para o backend
    navigator.sendBeacon(
      "http://localhost:3000/api/logTempo",
      JSON.stringify({ tempo: elapsedTime })
      
    );
  }
});

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

document.getElementById('descer6').addEventListener('click', function(){
  document.getElementById('alvo6').scrollIntoView({behavior:'smooth'
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
  
  
  let currentIndex = 0;

  function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });
  }
  
  function nextSlide() {
    showSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    showSlide(currentIndex - 1);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
  });
  

setInterval(() => {
  nextSlide();
}, 5000);


let currentIndex2 = 0;

function showSlide2(index2) {
    const slides2 = document.querySelectorAll('.carousel2-item');
    if (index2 >= slides2.length) {
        currentIndex2 = 0;
    } else if (index2 < 0) {
        currentIndex2 = slides2.length - 1;
    } else {
        currentIndex2 = index2;
    }
    slides2.forEach((slide2, j) => {
        slide2.classList.toggle('active', j === currentIndex2);
    });
}

function nextSlide2() {
    showSlide2(currentIndex2 + 1);
}

function prevSlide2() {
    showSlide2(currentIndex2 - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide2(currentIndex2);
});



setInterval(() => {
nextSlide2();
}, 5000);


let currentIndexp = 0;

function showSlidep(indexp) {
    const slidesp = document.querySelectorAll('.carouselp-item');
    if (indexp >= slidesp.length) {
        currentIndexp = 0;
    } else if (indexp < 0) {
        currentIndexp = slidesp.length - 1;
    } else {
        currentIndexp = indexp;
    }
    slidesp.forEach((slidep, a) => {
        slidep.classList.toggle('active', a === currentIndexp);
    });
}

function nextSlidep() {
    showSlidep(currentIndexp + 1);
}

function prevSlidep() {
    showSlidep(currentIndexp - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlidep(currentIndexp);
});



setInterval(() => {
nextSlidep();
}, 5000);


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