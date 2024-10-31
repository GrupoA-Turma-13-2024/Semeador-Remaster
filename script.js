
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


document.querySelector('.texto_barra').addEventListener('click', function() {
    document.querySelector('.dropdown-content').classList.toggle('show');
});

// Fechar o dropdown se o usuário clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.texto_barra')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
