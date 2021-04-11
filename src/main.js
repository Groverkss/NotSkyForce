import * as THREE from 'three'

class Game {
  constructor() {
    this.cameraFov = 75; // In degrees
    this.cameraAspect = 2;
    this.cameraNear = 0.1;
    this.cameraFar = 5;
  }

  init() {
    /* Camera Setup */
    this.camera = new THREE.PerspectiveCamera(
      this.cameraFov, this.cameraAspect, this.cameraNear, this.cameraFar
    );
    this.camera.position.z = 3;

    /* Scene setup */
    this.scene = new THREE.Scene();

    /* Setup render */
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    this.addObjects();
    this.addLight();
  }

  addObjects() {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({color: 0xFFFF00});

    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);
  }

  addLight() {
    const color = 0xFFFFFF;
    const intensity = 1;

    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);

    this.scene.add(light);
  }

  render(time) {
    time *= 0.001; // Time is given in milliseconds

    this.cube.rotation.x = time;
    this.cube.rotation.y = time;

    this.renderer.render( this.scene, this.camera );

    requestAnimationFrame(this.render.bind(game));
  }
}

const game = new Game();
game.init();
requestAnimationFrame(game.render.bind(game));
