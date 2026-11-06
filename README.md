# Explorador

Jogo 3D no browser (Three.js). Controlas uma personagem que anda pelos pisos de quatro edifícios (A, B, C e D) e muda
de piso pelos elevadores e de edifício pelas passagens (os portais).

## ▶️ Jogar

**https://diogoguedes0305.github.io/Explorador/**

Não é preciso instalar nada: abre no Chrome, Edge ou Firefox de um computador (precisa de teclado).
A primeira vez demora uns segundos a carregar (texturas e modelos 3D).

## Teclas

| Tecla | Ação |
|---|---|
| ↑ ↓ ← → | Andar e virar |
| J | Saltar |
| W / P / T / Y / N | Acenar / dar um soco / polegar para cima / dizer sim / dizer não |
| 1 / 2 / 3 / 4 | Vista fixa / primeira pessoa / terceira pessoa / vista de cima |
| R | Vista realista |
| M | Mini-mapa |
| H | Ajuda |
| U | Mostrar/esconder o painel de opções |
| A / D / S / F | Ligar/desligar as luzes (ambiente, direcional, foco, lanterna) |
| X / G | Sombras / nevoeiro |
| Z | Estatísticas (fps) |
| B | Volumes de colisão |

No painel de opções pode escolher-se o edifício e o piso onde começar e o céu (skybox).

## Como está feito

- `Index.html` — a página; carrega o Three.js 0.160 do CDN (jsDelivr) por um *import map*.
- `thumb_raiser.js` — o motor do jogo (câmaras, teclado, colisões, mudança de piso).
- `maze.js`, `wall.js`, `ground.js`, `door.js`, `elevator.js`, `passage.js` — a construção de cada piso a partir de
  `buildings/*.json`.
- `player.js`, `animations.js` — a personagem e as animações (`models/`).
- `lights.js`, `fog.js`, `cubetexture.js`, `audio.js`, `user_interface.js` — luzes, nevoeiro, céu, sons e painel.

Para correr no próprio computador basta um servidor estático na pasta (por exemplo `npx serve .`) e abrir `Index.html`.
As pastas `three.js-master/`, `node_modules/` e `public/` não são usadas pela página e não vão para o site.

Publicado automaticamente pelo GitHub Pages (`.github/workflows/pages.yml`) a cada alteração no ramo `master`.

Créditos dos sons, céus e texturas: ver o painel do jogo (Dreamstime, Fesliyan Studios, Pixabay, OpenGameArt, TextureCan).
