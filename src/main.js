import * as THREE from 'three';
import MeshManager from './MeshManager'
import Background from './Background'
import InputController from './InputController'
import Player from './Player'
import EnemyManager from './EnemyManager'

import Config from './Config'

class Game {
  constructor() {
    this.playerVelocityX = 0;
    this.playerVelocityY = 0;
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
    this.player = new Player(
      this.meshManager.meshes.player,
      this,
    );

    /* Enemies */
    this.enemy = new EnemyManager(
      this.meshManager.meshes.enemy,
      this,
    );
    this.enemy.addEnemy();
    this.enemy.addEnemy(-1.5, 1.5);
    this.enemy.addEnemy(1.5, 1.5);

    /* Add light */
    this.addLight();

    /* Setup input controller */
    this.inputCon = new InputController();

    /* Add to html page */
    document.body.appendChild( this.renderer.domElement );
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
    /* Update background */
    if (this.background) {
      this.background.update();
    }

    /* Update enemy */
    if (this.player) {
      this.player.update(time);
    }

    /* Update player */
    if (this.enemy) {
      this.enemy.update();
    }

    /* Render objects */
    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame(this.render.bind(game));
  }
}

const game = new Game();
game.init();
requestAnimationFrame(game.render.bind(game));
