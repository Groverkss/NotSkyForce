import * as THREE from 'three';
import MeshManager from './MeshManager'

class Game {
  constructor() {
    this.cameraFov = 75; // In degrees
    this.cameraAspect = 2;
    this.cameraNear = 0.1;
    this.cameraFar = 20;
  }

  async init() {
    /* Camera Setup */
    this.camera = new THREE.PerspectiveCamera(
      this.cameraFov, this.cameraAspect, this.cameraNear, this.cameraFar
    );
    this.camera.position.z = 5;
    this.camera.position.y = 2;

    this.camera.lookAt(0, 0, 0);

    /* Scene setup */
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('black');

    /* Setup render */
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    /* Load all meshes */
    this.meshManager = new MeshManager();
    await this.meshManager.build();

    const rocket = this.meshManager.meshes.enemy.mesh;

    /* Set rocket */
    rocket.scale.set(0.3, 0.3, 0.3);

    /* Add light */
    this.addLight();

    this.scene.add(rocket);
  }

  addLight() {
    const color = 0xFFFFFF;
    const intensity = 1;

    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 2, 0);

    this.scene.add(light);
  }

  render(time) {
    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame(this.render.bind(game));
  }
}

const game = new Game();
game.init();
requestAnimationFrame(game.render.bind(game));
