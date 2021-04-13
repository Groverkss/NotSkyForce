class InputController {
  constructor() {
    this.keys = {
      "up": false,
      "down": false,
      "left": false,
      "right": false,
      "space": false,
    }

    document.addEventListener("keydown", this.keyboardDown.bind(this), false);
    document.addEventListener("keyup", this.keyboardUp.bind(this), false);
  }

  keyboardDown(event) {
    const keyCode = event.which;

    if (keyCode == 72) {
      this.keys.left = true;
    }

    if (keyCode == 76) {
      this.keys.right = true;
    }

    if (keyCode == 74) {
      this.keys.down = true;
    }

    if (keyCode == 75) {
      this.keys.up = true;
    }

    if (keyCode == 32) {
      this.keys.space = true;
    }
  }

  keyboardUp(event) {
    const keyCode = event.which;

    if (keyCode == 72) {
      this.keys.left = false;
    }

    if (keyCode == 76) {
      this.keys.right = false;
    }

    if (keyCode == 74) {
      this.keys.down = false;
    }

    if (keyCode == 75) {
      this.keys.up = false;
    }

    if (keyCode == 32) {
      this.keys.space = false;
    }
  }
}

export default InputController;
