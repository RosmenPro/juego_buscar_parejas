import Box from './Box.js';

export default class Game {
  constructor(gameElement, resetButton) {
    this.gameElement = gameElement;
    this.resetButton = resetButton;
    this.colors = [
      'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown',
      'cyan', 'lime', 'teal', 'magenta', 'gray', 'navy', 'olive'
    ];
    this.boxes = [];
    this.firstBox = null;
    this.secondBox = null;
    this.matchedPairs = 0;
    this.startTime = null;
    this.timerInterval = null;

    // Añadir el manejador del clic en el botón de reinicio
    this.resetButton.addEventListener('click', () => this.startGame());
    
    // Inicializar el juego
    this.startGame();
  }

  startGame() {
    // Limpiar el grid y las cajas existentes
    this.gameElement.innerHTML = '';
    this.boxes = [];
    this.firstBox = null;
    this.secondBox = null;
    this.matchedPairs = 0;
    this.startTime = null;

    const rows = parseInt(prompt("Número de filas:"));
    const cols = parseInt(prompt("Número de columnas:"));

    if (rows * cols % 2 !== 0) {
      alert("El número total de cajas debe ser par.");
      return;
    }

    let colorPairs = this.colors.slice(0, (rows * cols) / 2);
    colorPairs = [...colorPairs, ...colorPairs];
    colorPairs = colorPairs.sort(() => 0.5 - Math.random());

    // Ajustar la cuadrícula
    this.gameElement.style.gridTemplateColumns = `repeat(${cols}, 60px)`;
    this.gameElement.style.gridTemplateRows = `repeat(${rows}, 60px)`;

    // Crear y agregar las cajas
    colorPairs.forEach((color, index) => {
      const box = new Box(color, index);
      this.gameElement.appendChild(box.element);
      this.boxes.push(box);
    });

    // Iniciar el temporizador
    this.startTime = new Date();
    this.startTimer(); // <-- Añadir función para iniciar cronómetro

    // Limpiar cualquier manejador de eventos previo y agregar el nuevo
    this.gameElement.removeEventListener('click', this.handleBoxClick);
    this.handleBoxClick = this.handleBoxClick.bind(this);
    this.gameElement.addEventListener('click', this.handleBoxClick);
  }

  handleBoxClick(event) {
    const target = event.target;
    if (target.classList.contains('box')) {
      const box = this.boxes.find(b => b.index == target.dataset.index);

      if (!this.firstBox) {
        this.firstBox = box;
        box.reveal();
      } else if (!this.secondBox) {
        this.secondBox = box;
        box.reveal();
        this.checkForMatch();
      }
    }
  }

  checkForMatch() {
    if (this.firstBox.color === this.secondBox.color) {
      this.matchedPairs++;
      this.resetSelection();
      if (this.matchedPairs === this.boxes.length / 2) {
        const timeTaken = Math.floor((new Date() - this.startTime) / 1000);
        this.gameElement.innerHTML += `<div id="message">¡Has ganado! Tiempo: ${timeTaken} segundos</div>`;
        clearInterval(this.timerInterval); // Detener el cronómetro al ganar
      }
    } else {
      setTimeout(() => {
        this.firstBox.hide();
        this.secondBox.hide();
        this.resetSelection();
      }, 200); // 1 segundo de retraso
    }
  }

  resetSelection() {
    this.firstBox = null;
    this.secondBox = null;
  }

  startTimer() {
    const timerElement = document.getElementById('timer');
    this.timerInterval = setInterval(() => {
      const currentTime = Math.floor((new Date() - this.startTime) / 1000);
      timerElement.textContent = `Tiempo: ${currentTime} segundos`;
    }, 1000);
  }
}