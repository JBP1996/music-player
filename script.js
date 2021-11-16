
/* Olá (@_@) */

var musicas = [
	{titulo: "i’ll always be waiting for you", fundo: "", favorito: false, artista: "Shiloh dynasty", img: "shilohdynasty.PNG", caminho: "illalwaysbewaitingforyou.mp3"},
	{titulo: "his hers", fundo: "hisherscapa.JPG", favorito: false, artista: "internet money ft don toliver, gunna & lil uzi vert", img: "internetmoneylogo.JPEG", caminho: "hishers.mp3"},
	{titulo: "fuck love", fundo: "tentacioncapa.JPG", artista: "xxxtentacion ft trippie redd", favorito: false, img: "xxxtentacion.JPEG", caminho: "fucklove.mp3"},
	{titulo: "smile", fundo: "lengedsneverdie.JPEG", artista: "juice wrld ft the weeknd", favorito: false, img: "juicewrld.PNG", caminho: "smile.mp3"},
	/*{titulo: "", fundo: "", artista: "", favorito: false, img: "", caminho: ""},
	{titulo: "", fundo: "", artista: "", favorito: false, img: "", caminho: ""},
	{titulo: "", fundo: "", artista: "", favorito: false, img: "", caminho: ""},
	{titulo: "", fundo: "", artista: "", favorito: false, img: "", caminho: ""},
	{titulo: "", fundo: "", artista: "", favorito: false, img: "", caminho: ""},
	{titulo: "", fundo: "", artista: "", favorito: false, img: "", caminho: ""},
	{titulo: "", fundo: "", artista: "", favorito: false, img: "", caminho: ""},
	{titulo: "", fundo: "", artista: "", favorito: false, img: "", caminho: ""},
	{titulo: "", fundo: "", artista: "", favorito: false, im:g: "", caminho: ""},
	{titulo: "", fundo: "", artista: "", favorito: false, img: "", caminho: ""},
	{titulo: "", fundo: "", artista: "", favorito: false, img: "", caminho: ""},*/
];

var musicasFavoritas = [];

var slider = document.querySelector('.slider');

var musicaAtual = document.querySelector('.musica-atual'),
tituloMusicaAtual = document.getElementById('titulo--musica-atual');

var pp = document.querySelectorAll(".pp"),
prox = document.getElementById("proximo"),
ant = document.getElementById("anterior");

var audio = document.querySelector("audio");

var duracao = document.getElementById("duracao");

var duracaoFinal = document.getElementById("duracaoFinal");

var tempoAtual = document.getElementById("tempoAtual");

var musicaAtualTelaCheia = document.querySelector(".musica-atual-tela-cheia"),
areaDeRolagem = document.getElementById("area-de-rolagem");

var containerMusica = document.getElementById("containerMusica");
var variedade = document.getElementById("variedade");
var barra = document.querySelector(".barra");
var movimentoY, comecoY;

var btnAbrirmusicaAtualTelaCheia = document.querySelector(".btn--abrir-musica-atual-tela-cheia"),
titulo = document.querySelector(".titulo");

var estaAberto = false,
estaMovendo = false;

var pesquisar = document.querySelector("#pesquisar"),
titulomusicaAtualTelaCheia = document.querySelector(".titulo--musica-atual-tela-cheia");

var card = document.querySelector('.card');

var estado = document.querySelector('#estado');

var som = document.getElementById('som');

var select = document.querySelector('#idioma select');

var itemDaNav = document.querySelectorAll('.nav > div');

var cntrCfgrc = document.getElementById('container-configuracao');

var cntrFavorito = document.getElementById('container-favoritos');

var addF = document.querySelector('.add-f');

var corpo = document.querySelector('.corpo'),
cabecalho = document.querySelector('.cabecalho');

var info = document.querySelector('#info-f');

function adicionarMusica(objeto) {
	var itens = document.getElementsByClassName("item");
	var img = document.querySelector('.img img');
	
	for (var i = 0; i < itens.length; i++) {
	
		if (itens[i].textContent.indexOf(objeto.titulo.toLowerCase()) !== - 1) itens[i].id = "ativo";
	
		else if (itens[i].hasAttribute("id")) itens[i].removeAttribute("id");
	};
	
	titulo.innerHTML = objeto.titulo + '<br><small class="artista">' + objeto.artista + '</small>';
	
	audio.src = "musica/" + objeto.caminho;
	
	if (objeto.favorito) {
		addF.setAttribute('fill', 'red');
		addF.style.color = 'red';
	} else {
		addF.setAttribute('fill', 'none');
		addF.style.color = 'black';
	}
	document.querySelector("title").textContent =  objeto.titulo + " - " + objeto.artista
	tituloMusicaAtual.innerHTML = objeto.titulo.toLowerCase() + '<br><small class="artista">' + objeto.artista.toLowerCase() + '</small>';
	
	if (objeto.img !== "") {
		img.src = "imagem/" + objeto.img;
		
	} else if (img.hasAttribute('src')) {
		img.removeAttribute('src');
	
	}
	
	if (objeto.fundo !== "") {
		areaDeRolagem.style.background = 'url("imagem/' + objeto.fundo + '") no-repeat 100% 50%';
		areaDeRolagem.style.backgroundSize = '100% auto';

	}
	else {
           if (musicaAtualTelaCheia.classList.contains('modo-escuro-ativo')) {
            areaDeRolagem.style.background = 'rgb(70, 70, 70)';
          } else {
            areaDeRolagem.style.background = 'ghostWhite';
}
}
}
/* adicionar música favorita quando a música atual estiver em tela cheia */

function adicionarMusicaFavoritaTC() {

	var musicaFavorita = document.createElement('div');
	musicaFavorita.className = 'item';
	var indece;
	
		if (musicas[posicaoMusicaAtual()].favorito !== true) {
		
			musicas[posicaoMusicaAtual()].favorito = true;
			
			addF.setAttribute('fill', 'red');
			
			addF.style.color = 'red';
			
			info.textContent = '';
			
			musicaFavorita.innerHTML = musicas[posicaoMusicaAtual()].titulo.toLowerCase() + '<br><small class="artista">' + musicas[posicaoMusicaAtual()].artista.toLowerCase() + '</small>';
			
			musicasFavoritas.push(musicaFavorita.firstChild.nodeValue, musicaFavorita);
			
			cntrFavorito.appendChild(musicaFavorita);
			
		} else {
			
			addF.setAttribute('fill', 'none');
			
			addF.style.color = 'black';
			
			musicas[posicaoMusicaAtual()].favorito = false;
			
			indece = musicasFavoritas.indexOf(musicas[posicaoMusicaAtual()].titulo);
			
			cntrFavorito.removeChild(musicasFavoritas[indece + 1]);
			
			if (indece  > -1) {
				musicasFavoritas.splice(indece + 1, 1);
				musicasFavoritas.splice(indece, 1);
			}
		}
		
		if (musicasFavoritas.length <= 1) {
                   if (select.value.indexOf("pt") !== -1) 
                        info.textContent = 'sem músicas';
                   else if (select.value.indexOf("en") !== -1)
                        info.textContent = "no songs";
              }
}

var navMusica = document.querySelector('#navMusica');
var navFavorito = document.querySelector('#navFavorito');
var navConf = document.querySelector('#navConf');

navMusica.addEventListener('change', () => {
	if(navMusica.checked) {
		location = '#containerMusica';
	}
});
navFavorito.addEventListener('change', () => {
	if(navFavorito.checked) {
		location = '#container-favoritos';
	}
});
navConf.addEventListener('change', () => {
	if(navConf.checked) {
		location = '#container-configuracao';
	}
});

/* */

addF.addEventListener('touchstart', adicionarMusicaFavoritaTC , false);
addF.addEventListener('click', adicionarMusicaFavoritaTC , false);

var informacoes = document.querySelector('.informacoes');

informacoes.addEventListener('click', function (e) {
	var inf = document.createElement('div');
	inf.innerHTML = '<h3 class="txt-info">INFORMAÇÕES</h3><div><b>programador</b><span>William Humbwavali</span></div><div><b>músicas </b><span>' + musicas.length + '</span></div><a target="_blank" href="http://instagram.com/williamhumbwavali"><div><b>me siga no instagram</b><span> <svg width="20" height="20" fill="gray"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg></span> </div></a><div class="fechar-informacoes"><svg height="24" width="24" fill="gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/></svg></div>' ;
       if (!modo.checked)
	      inf.id = "informacoes";
       else {
             inf.id = "informacoes";
             inf.style.backgroundColor = "rgb(50, 50, 50)";
             inf.style.color = "white";
       }
	document.body.appendChild(inf);
	corpo.classList.add('desativado');
	cabecalho.classList.add('desativado');
	document.querySelector('.fechar-informacoes').addEventListener('touchstart', () => fecharInformacoes(inf), false);
	document.querySelector('.fechar-informacoes').addEventListener('click', () => fecharInformacoes(inf), false);
})

function fecharInformacoes(alvo) {
	alvo.style.animation = 'fim .27s ease';
	setTimeout(() => {
		document.body.removeChild(alvo);
		corpo.classList.remove('desativado');
		cabecalho.classList.remove('desativado');
	}, 200);
}

(function () { 
	for (var i = 0; i < musicas.length; i++) {
			
		var item = document.createElement("div");
		
		item.className = "item";
			
		musicas.sort(function (a, b) {
			var tituloA = a.titulo.toUpperCase();
			var tituloB = b.titulo.toUpperCase();
				
			if (tituloA > tituloB) return 1;
			if (tituloA < tituloB) return -1;
				
			return 0;
		});
		item.innerHTML = musicas[i].titulo.toLowerCase() + '<br><small class="artista">' + musicas[i].artista.toLowerCase() + '</small>';
		containerMusica.appendChild(item);
	};
	adicionarMusica(musicas[0]);
} ());

containerMusica.addEventListener("click", selecionarMusica, false);
cntrFavorito.addEventListener('click', selecionarMusica, false);

function selecionarMusica(e) {
	if (e.target.getAttribute("class") === 'item') {
		for (var i = 0; i < musicas.length; i++) {
			if (e.target.textContent.indexOf(musicas[i].titulo.toLowerCase()) !== -1) {

musicaAtual.style.display = "block";
	slider.style.height = "calc(100% - 235px)";

				adicionarMusica(musicas[i]);
				audio.play();
			}
		}
	}
}
var btnCancelarPesquisa = document.querySelector('header button');

pesquisar.addEventListener('focus', () => {
	var itens = document.getElementsByClassName('item');
	var p = document.querySelector('.p');
	musicaAtual.style.display = 'none';
	pesquisar.style.width = '70%';
	
	setTimeout(() => {
		btnCancelarPesquisa.style.display = 'inline-block';
	}, 300);
	
	slider.style.height = 'calc(100% - 150px)';
	pesquisar.addEventListener("input", (e) => {
		var valorE = pesquisar.value.toLowerCase();
		
		for (var i in itens) {
			if (itens[i].textContent.indexOf(valorE) !== - 1) 
				itens[i].style.display = 'block';
			else 
				itens[i].style.display = "none";
		}
	}, false);
	btnCancelarPesquisa.addEventListener('click', cancelarPesquisa, false);
}, false);

function cancelarPesquisa() {
	musicaAtual.style.display = "block";
	slider.style.height = "calc(100% - 235px)";
	pesquisar.style.width = "90%";
	btnCancelarPesquisa.style.display = "none";
}

function posicaoMusicaAtual() {
	var ativo = document.getElementById("ativo");
	var item = document.getElementsByClassName("item");
	for (var i = 0; i < item.length; i++) {
		if (item[i] === ativo) {
			return i;
			break;
		} else {
			continue;
		}
	}
};
	
function proxMusica() { 
	var proxima = posicaoMusicaAtual() + 1;
	adicionarMusica(musicas[proxima]);
	for (var i = 0; i < pp.length; i++) {
		if (!(pp[i].innerHTML.indexOf("play") !== -1)) audio.play();
	}
}
	
function musicaAnt() {
	var anterior = posicaoMusicaAtual() - 1;
	if (audio.currentTime >= 5) audio.currentTime = 0;
	else {
		adicionarMusica(musicas[anterior]);
		for (var i = 0; i < pp.length; i++) {
			if (!(pp[i].innerHTML.indexOf("play") !== -1)) audio.play();	
		}
	}
}
	
prox.addEventListener("click", proxMusica, false);
ant.addEventListener("click", musicaAnt, false);
	
//
function fecharmusicaAtualTelaCheia(e) {
	musicaAtualTelaCheia.style.transform = "translateY(100%)";
	musicaAtualTelaCheia.style.transition = 'transform .27s';
	card.style.opacity = 1;
	estado.style.opacity = 1;
	setTimeout(function () {
		if (estaAberto) {
			musicaAtualTelaCheia.style.display = "none";
			estaAberto = false;
		}
	}, 270);
}
	
musicaAtual.addEventListener("click", function () {
	if (!estaAberto) { 
			
		musicaAtualTelaCheia.style.display = 'block';
		musicaAtualTelaCheia.style.transition = "transform .27s ease";
		
		musicaAtualTelaCheia.style.transform = 'translateY(100%)';
		setTimeout(function() { 
                 musicaAtualTelaCheia.style.transform = "translateY(0)"
             }, 10);
		estaAberto = true;
			
	}
}, false);

/* */

areaDeRolagem.addEventListener("touchstart", function (e) {
	comecoY = e.targetTouches[0].clientY;
}, false);

areaDeRolagem.addEventListener("click", function (e) {
	comecoY = e.targetTouches[0].clientY;
}, false);
	
areaDeRolagem.addEventListener("touchmove", function (e) {
	movimentoY = e.changedTouches[0].clientY - comecoY;
	if (movimentoY > 0 && !document.querySelector('#pesquisar:focus')) {
		musicaAtualTelaCheia.style.transform = "translateY(" + movimentoY + "px)";
		musicaAtualTelaCheia.classList.add('sem-transicao');
		if (movimentoY > 10) estaMovendo = true;	
	};
}, false);

// NOTA: Verificar se este codigo não tem impacto e danifica a funcionalidade no phone
areaDeRolagem.addEventListener("click", function (e) {
	movimentoY = e.changedTouches[0].clientY - comecoY;
	if (!document.querySelector('#pesquisar:focus')) {
		musicaAtualTelaCheia.style.transform = "translateY(" + movimentoY + "px)";
		musicaAtualTelaCheia.classList.add('sem-transicao');
		estaMovendo = true;	
	};
}, false);
	
		
areaDeRolagem.addEventListener("touchend", function () {
	musicaAtualTelaCheia.classList.remove('sem-transicao');
	if (movimentoY >= 200 && estaMovendo) fecharmusicaAtualTelaCheia();
	else {
		musicaAtualTelaCheia.style.transform = "translateY(0)";
		musicaAtualTelaCheia.style.transition = "transform .17s ease";
	}
	movimentoY = 0;
	comecoY = 0;
	estaMovendo = false;
}, false);

// NOTA: Verificar se este codigo não tem impacto e danifica a funcionalidade no phone
areaDeRolagem.addEventListener("click", function () {
	musicaAtualTelaCheia.classList.remove('sem-transicao');

	fecharmusicaAtualTelaCheia();
	musicaAtualTelaCheia.style.transform = "translateY(0)";
	musicaAtualTelaCheia.style.transition = "transform .17s ease";
	movimentoY = 0;
	comecoY = 0;
	estaMovendo = false;
}, false);

for (let i = 0; i < pp.length; i++) {
	pp[i].addEventListener("click",  function (e) {
		if (audio.paused) audio.play();
		else audio.pause();
              e.stopPropagation();
	}, false);
}

audio.addEventListener("pause", function () {
	for (var i = 0; i < pp.length; i++) {
		pp[i].innerHTML = '<svg class="play"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/></svg>';
	}
});
	
audio.addEventListener("play", function () {
	for (var i = 0; i < pp.length; i++) {
		pp[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/></svg>';
	}
});
		
audio.addEventListener("timeupdate", function () {
	
	if (audio.duration == audio.currentTime) {
		proxMusica();
		audio.play();	
	}
		
	variedade.value = audio.currentTime;
		
	var segundosAtual = cPS(audio.currentTime),
	sA = segundosAtual < 10? "0" + segundosAtual: segundosAtual;
		
	var minutosAtual = cPM(audio.currentTime),
	mA = minutosAtual < 10? "0" + minutosAtual: minutosAtual;
		
	tempoAtual.textContent = mA + ':' + sA;
});
	
variedade.addEventListener("input", function (e) {
	
	var estaPausado = audio.paused? true: false;
	
	audio.currentTime = variedade.value;
	
	e.target.addEventListener('change', function () {
		if (estaPausado) audio.pause();
		else audio.play();
	});
});
	
audio.addEventListener("loadeddata", function () {
	variedade.max = audio.duration;
		
	var duracaoDoSegundos = cPS(audio.duration),
	dS = duracaoDoSegundos < 10? '0' + duracaoDoSegundos: duracaoDoSegundos;
		
	var duracaoDoMinutos = cPM(audio.duration),
	dM = duracaoDoMinutos < 10? '0' + duracaoDoMinutos: duracaoDoMinutos;
		
	duracaoFinal.textContent = dM + ':' + dS;
});
	
/* conversões */

function cPM() {
	return parseInt((arguments[0] / 60) % 60);
}
	
function cPS() {
	return parseInt(arguments[0] % 60);
}
var volume = document.querySelector('#volume');
	
volume.addEventListener('input', function () {
	audio.volume = volume.value / 100;
	volume.value = volumr.value;
}, false);

var btnCancelar = document.querySelector('header button');

var modo = document.querySelector('#modo-escuro input');
modo.addEventListener('change', function () {
var corpo = document.querySelector('.corpo');
		if (modo.checked) {
		
			itemDaNav.forEach((item) => {
				
				item.classList.add('modo-escuro-ativo');
			
			});
			
			document.body.className = 'modo-escuro-ativo';
			
			pesquisar.className = 'modo-escuro';
			
			musicaAtual.classList.add('modo-escuro-ativo');
			
			musicaAtualTelaCheia.classList.add('modo-escuro-ativo');
			
			titulo.style.color = "white";
			
			prox.style.backgroundColor = 'rgb(80, 80, 80)';
			
			ant.style.backgroundColor = 'rgb(80, 80, 80)';
			
			itemDaNav[0].parentNode.style.background = 'rgb(60, 60, 60)';
			
			for (var i = 0; i < pp.length; i++) {
			     pp[i].style.backgroundColor = 'rgb(80, 80, 80)';
                     }
			
			btnCancelar.style.color = 'white';
		
		} else {
			
			itemDaNav.forEach((item) => {
				
				item.classList.remove('modo-escuro-ativo');
			
			});
			
			musicaAtualTelaCheia.classList.remove('modo-escuro-ativo');
			
			musicaAtual.classList.remove('modo-escuro-ativo');
			document.body.className = '';
			
			pesquisar.className = '';
			
			titulo.style.color = "black";
			
			btnCancelar.style.color = 'black';
			
			prox.style.backgroundColor = 'rgb(240, 240, 245)';
			
			ant.style.backgroundColor = 'rgb(240, 240, 245)';
			pp[0].style.backgroundColor = 'ghostWhite';
			pp[1].style.backgroundColor = 'rgb(240, 240, 240)';
                    
			
			itemDaNav[0].parentNode.style.background = 'white';
		}
}, false);

select.addEventListener('change', definirIdioma, false);

var td = document.querySelector(".informacoes .titulo--difinicao");

function definirIdioma() {
	var idioma = document.querySelector('#idioma .titulo--difinicao'),
	modoEscuroTitulo = document.querySelector('#modo-escuro .titulo--difinicao');
	
	if (select.value === "pt") {
	
		document.querySelector('.navMusica span').textContent = 'músicas'; 
		
		document.querySelector('.navConf span').textContent = 'configuração'; 
		
		document.querySelector('.navFavorito span').textContent = 'favoritos'; 
		
		idioma.textContent = 'idioma';
		
		btnCancelar.textContent = 'cancelar';
		
		modoEscuroTitulo.textContent = 'modo escuro';
              td.textContent = "INFORMAÇÕES";
		
		pesquisar.setAttribute('placeholder', 'Procurar...');
		if (musicasFavoritas.length <= 1)
		    info.textContent = 'sem músicas';
		
	} else if (select.value === "en") {
	
		document.querySelector('.navMusica span').textContent = 'songs'; 
		
		document.querySelector('.navConf span').textContent = 'settings'; 
		
		document.querySelector('.navFavorito span').textContent = 'favorite'; 
		
		idioma.textContent = 'language';
		
		modoEscuroTitulo.textContent = 'dark mode';
		
		pesquisar.setAttribute('placeholder', 'Search...');
              td.textContent = "INFO";
		
		btnCancelar.textContent = 'cancel';
		if (musicasFavoritas.length <= 1)
		     info.textContent = 'no songs';
	}
	
}
/* #FIM (@_@) */
