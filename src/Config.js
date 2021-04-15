const Config = {
  background: {
    numStars: 6000,
    starPath: '/assets/textures/backgroundStar.png',
    acceleration: 0.012,
    rotateSpeed: 0.0015,
  },
  camera: {
    position: {
      x: 0,
      y: 2,
      z: 5,
    },
    lookAt: {
      x: 0,
      y: 0,
      z: 0,
    },
    cameraSettings: {
      cameraFov: 60,  // In degrees
      cameraAspect: 2,
      cameraNear: 0.1,
      cameraFar: 1000,
    }
  },
  objects: {
    enemy: {
      objectFile: '/assets/objects/enemy.gltf',
    },
    player: {
      objectFile: '/assets/objects/player.gltf',
    },
    star: {
      objectFile: '/assets/objects/star.gltf',
    }
  },
  player: {
    velocityX: 0.03,
    velocityY: 0.03,
    boundary: {
      y: {
        up: 2.1,
        down: -0.36,
      },
      x: {
        right: 1.77,
        left: -1.77,
      },
    },
  },
  star: {
    velocity: 0.1,
    acceleration: 0.0005,
    rotateSpeed: 0.02,
    frequency: 20,
    boundary: {
      y: {
        up: 4,
        down: -2,
      },
      x: {
        right: 3,
        left: -3,
      },
    },
    score: 10,
  }
}

export default Config;
