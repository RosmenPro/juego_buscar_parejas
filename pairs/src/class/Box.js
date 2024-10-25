export default class Box {
  constructor(color, index) {
    this.color = color;
    this.index = index;
    this.element = this.createBox();
  }

  createBox() {
    const box = document.createElement('div');
    box.classList.add('box');
    box.dataset.color = this.color;
    box.dataset.index = this.index;

    box.addEventListener('click', () => {
      this.reveal();
    });

    return box;
  }

  reveal() {
    if (!this.element.classList.contains('revealed')) {
      this.element.style.backgroundColor = this.color;
      this.element.classList.add('revealed');
    }
  }

  hide() {
    this.element.style.backgroundColor = 'black';
    this.element.classList.remove('revealed');
  }
}