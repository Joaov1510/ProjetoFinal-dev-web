'use strict';

document.addEventListener('DOMContentLoaded', () => {

  function abrirCurso(elemento) {
    const card = elemento.closest('.card-curso');
    if (!card) return;

    if (card.classList.contains('aberto')) {
      card.classList.remove('aberto');
      return;
    }

    const todosOsCards = document.querySelectorAll('.card-curso');
    todosOsCards.forEach(c => c.classList.remove('aberto'));

    card.classList.add('aberto');
  }

  const botoesCabecalho = document.querySelectorAll('.cabecalho-curso');
  botoesCabecalho.forEach(botao => {
    botao.addEventListener('click', () => abrirCurso(botao));
  });

  window.abrirCurso = abrirCurso;

  const botaoMenu = document.querySelector('.menu-toggle');
  const cabecalho = document.querySelector('header.cabecalho');

  if (botaoMenu && cabecalho) {
    botaoMenu.addEventListener('click', () => {
      cabecalho.classList.toggle('menu-aberto');
    });

    const linksNav = cabecalho.querySelectorAll('nav a');
    linksNav.forEach(link => {
      link.addEventListener('click', () => {
        cabecalho.classList.remove('menu-aberto');
      });
    });

    document.addEventListener('click', (evento) => {
      const clicouDentro = cabecalho.contains(evento.target);
      if (!clicouDentro && cabecalho.classList.contains('menu-aberto')) {
        cabecalho.classList.remove('menu-aberto');
      }
    });
  }

  const botaoTopo = document.querySelector('.botao-topo');

  if (botaoTopo) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        botaoTopo.classList.add('visivel');
      } else {
        botaoTopo.classList.remove('visivel');
      }
    });

    botaoTopo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const elementosReveal = document.querySelectorAll('.reveal');

  if (elementosReveal.length > 0) {
    const observerReveal = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observerReveal.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15 });

    elementosReveal.forEach(el => observerReveal.observe(el));
  }

  const contadorElemento = document.querySelector('.badge-cursos strong');

  if (contadorElemento) {
    const valorFinal = 2500;
    const duracaoMs = 2000;
    let contadorJaAnimou = false;

    function formatarNumero(numero) {
      return numero.toLocaleString('pt-BR');
    }

    function animarContador() {
      const inicio = performance.now();

      function atualizar(tempoAtual) {
        const progresso = Math.min((tempoAtual - inicio) / duracaoMs, 1);
        const valorAtual = Math.floor(progresso * valorFinal);

        contadorElemento.textContent = `+${formatarNumero(valorAtual)}`;

        if (progresso < 1) {
          requestAnimationFrame(atualizar);
        } else {
          contadorElemento.textContent = `+${formatarNumero(valorFinal)}`;
        }
      }

      requestAnimationFrame(atualizar);
    }

    const observerContador = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting && !contadorJaAnimou) {
          contadorJaAnimou = true;
          animarContador();
          observerContador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.5 });

    observerContador.observe(contadorElemento);
  }

  const linksAncora = document.querySelectorAll('a[href^="#"]');

  linksAncora.forEach(link => {
    link.addEventListener('click', (evento) => {
      const destino = link.getAttribute('href');

      if (destino === '#') return;

      const secaoAlvo = document.querySelector(destino);

      if (secaoAlvo) {
        evento.preventDefault();
        secaoAlvo.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const cabecalhoScroll = document.querySelector('header.cabecalho');

  if (cabecalhoScroll) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        cabecalhoScroll.classList.add('scrolled');
      } else {
        cabecalhoScroll.classList.remove('scrolled');
      }
    });
  }

});
