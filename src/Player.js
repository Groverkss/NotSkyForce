import * as THREE from 'three'
import Config from './Config'
import BulletManager from './BulletManager'
import StarManager from './StarManager'

class Player {
  constructor(playerMesh, game) {
    this.mesh = playerMesh;
    this.game = game;

    this.bulletManager = new BulletManager(this.game);
    this.starManager = new StarManager(
      this.game.meshManager.meshes.star,
      this.game
    );

    this.mesh.lookAt(0, 0, -1);
    this.mesh.scale.x = 0.08;
    this.mesh.scale.z = 0.08;
    this.mesh.scale.y = 0.08;
    this.mesh.position.z = 3;

    this.playerVelocityX = 0;
    this.playerVelocityY = 0;

    this.score = 0;

    game.scene.add(this.mesh);
  }

  update(time) {
    this.processInput();
    this.move();
    this.bulletManager.moveBullets();
    this.starManager.update();
    this.updateScore();
  }

  updateScore() {
    document.querySelector('#HUD').innerHTML = `Score: ${this.score}`
  }

  move() {
    const posX = this.mesh.position.x + this.playerVelocityX;
    const posY = this.mesh.position.y + this.playerVelocityY;

    if (posX >= Config.player.boundary.x.left &&
      posX <= Config.player.boundary.x.right) {
      this.mesh.position.x = posX;
    }

    if (posY >= Config.player.boundary.y.down &&
      posY <= Config.player.boundary.y.up) {
      this.mesh.position.y = posY;
    }
  }

  processInput() {
    this.playerVelocityX = 0;
    this.playerVelocityY = 0;

    if (this.game.inputCon.keys.up) {
      this.playerVelocityY += Config.player.velocityY;
    }

    if (this.game.inputCon.keys.down) {
      this.playerVelocityY -= Config.player.velocityY;
    }

    if (this.game.inputCon.keys.right) {
      this.playerVelocityX += Config.player.velocityX;
    }

    if (this.game.inputCon.keys.left) {
      this.playerVelocityX-= Config.player.velocityX;
    }

    if (this.game.inputCon.keys.space) {
      this.bulletManager.addBullet();
    }
  }
}

export default Player;
