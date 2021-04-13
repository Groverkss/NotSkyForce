const Config = {
  background: {
    numStars: 6000,
    starPath: '/assets/textures/backgroundStar.png',
    acceleration: 0.012,
    rotateSpeed: 0.0015,
  },
  camera: {
    position: {
      x: 0, y: 2, z: 5,
    },
    lookAt: {
      x: 0, y: 0, z: 0,
    },
    cameraSettings: {
      cameraFov: 60,     // In degrees
      cameraAspect: 2,
      cameraNear: 0.1,
      cameraFar: 1000,
    }
  },
  objects: {
    enemy: {
      objectFile: "/assets/objects/enemy.glb",
    },
    player: {
      objectFile: "/assets/objects/player.gltf",
    },
  },
  player: {
    velocityX: 0.03,
    velocityY: 0.03,
  }
}

export default Config;
