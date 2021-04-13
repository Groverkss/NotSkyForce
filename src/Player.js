import Config from './Config'
import BulletManager from './BulletManager'

class Player {
  constructor(playerMesh, game) {
    this.mesh = playerMesh;
    this.game = game;
    this.bulletManager = new BulletManager(this.game);

    this.mesh.lookAt(0, 0, -1);
    this.mesh.scale.x = 0.08;
    this.mesh.scale.z = 0.08;
    this.mesh.scale.y = 0.08;
    this.mesh.position.z = 3;

    this.playerVelocityX = 0;
    this.playerVelocityY = 0;

    game.scene.add(this.mesh);
  }

  update(time) {
    this.processInput();
    this.move();
    this.bulletManager.moveBullets();
  }

  move() {
    this.mesh.position.x += this.playerVelocityX;
    this.mesh.position.y += this.playerVelocityY;
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
