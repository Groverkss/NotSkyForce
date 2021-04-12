import * as THREE from 'three';
import MeshManager from './MeshManager'
import Background from './Background'

import Config from './Config'

class Game {
  constructor() {
    this.playerVelocityX = 0;
    this.playerVelocityY = 0;
    this.keys = {
      "up": false,
      "down": false,
      "left": false,
      "right": false
    }
  }

  async init() {
    /* Camera Setup */
    this.setCamera();

    /* Scene setup */
    this.setScene();

    /* Setup render */
    this.setRenderer();

    /* Setup background */
    this.background = new Background();
    await this.background.build();
    this.scene.add(this.background.stars);

    /* Load all meshes */
    this.meshManager = new MeshManager();
    await this.meshManager.build();

    /* Player object */
    this.scene.add(this.meshManager.meshes.player);
    const playerMesh = this.meshManager.meshes.player;
    playerMesh.lookAt(0, 0, -1);
    playerMesh.scale.x = 0.08;
    playerMesh.scale.z = 0.08;
    playerMesh.scale.y = 0.08;
    playerMesh.position.z = 3;

    /* Add light */
    this.addLight();

    document.body.appendChild( this.renderer.domElement );
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
  }

  processInput() {
    this.playerVelocityX = 0;
    this.playerVelocityY = 0;

    if (this.keys.up) {
      this.playerVelocityY += 0.03;
    }

    if (this.keys.down) {
      this.playerVelocityY -= 0.03;
    }

    if (this.keys.right) {
      this.playerVelocityX += 0.03;
    }

    if (this.keys.left) {
      this.playerVelocityX -= 0.03;
    }
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  setScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('black');
  }

  setCamera() {
    const cameraSettings = Config.camera.cameraSettings;
    this.camera = new THREE.PerspectiveCamera(
      cameraSettings.cameraFov,
      cameraSettings.cameraAspect,
      cameraSettings.cameraNear,
      cameraSettings.cameraFar
    );

    const position = Config.camera.position;
    this.camera.position.x = position.x;
    this.camera.position.y = position.y;
    this.camera.position.z = position.z;

    const lookAt = Config.camera.lookAt;
    this.camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
  }

  addLight() {
    const color = 0xFFFFFF;
    const intensity = 1;

    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 2, 0);

    this.scene.add(light);
  }

  render(time) {
    /* Move stars in background */
    this.background.update();

    if (this.meshManager && this.meshManager.meshes && this.meshManager.meshes.player) {
      this.processInput();
      this.meshManager.meshes.player.position.x += this.playerVelocityX;
      this.meshManager.meshes.player.position.y += this.playerVelocityY;
    }

    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame(this.render.bind(game));
  }
}

const game = new Game();
game.init();
requestAnimationFrame(game.render.bind(game));
