import Game from './class/Game.js';
import '../sass/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  const gameElement = document.getElementById('game');
  const resetButton = document.getElementById('reset');
  
  new Game(gameElement, resetButton);
});