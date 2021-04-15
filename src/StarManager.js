import * as THREE from 'three'
import Config from './Config'

class Star {
  constructor(starMesh, game) {
    this.game = game;
    this.mesh = starMesh;

    this.mesh.position.z = -30;

    this.mesh.scale.x = 0.2;
    this.mesh.scale.y = 0.2;
    this.mesh.scale.z = 0.2;

    this.stars = [];

    this.timer = Config.star.frequency;
  }

  addStar(x, y, z) {
    const star = this.mesh.clone();

    if (x) {
      star.position.x = x;
    }

    if (y) {
      star.position.y = y;
    }

    if (z) {
      star.position.z = z;
    }

    star.velocity = Config.star.velocity;
    star.alive = true;
    this.game.scene.add(star);
    this.stars.push(star);
  }

  update() {
    this.addStarsIfTime();
    this.stars = this.stars.filter(star => star.alive);
    this.move();

    const playerBound = new THREE.Box3;
    playerBound.setFromObject(this.game.player.mesh);
    this.game.player.boundingBox = playerBound;

    this.stars.forEach(star => {
      if (this.checkCollision(star)) {
        console.log(this.game.player.score);
        star.alive = false;
        this.game.scene.remove(star);
        this.game.player.score += Config.star.score;
      }
    });
  }

  addStarsIfTime() {
    this.timer--;
    if (this.timer <= 0) {
      this.timer = Config.star.frequency;

      const posX = Math.random() *
              (Config.star.boundary.x.right - Config.star.boundary.x.left) +
          Config.star.boundary.x.left;

      const posY = Math.random() *
              (Config.star.boundary.y.up - Config.star.boundary.y.down) +
          Config.star.boundary.y.down;

      this.addStar(posX, posY);
    }
  }

  move() {
    this.stars.forEach(star => {
      if (star.position.z >= 10) {
        star.alive = false;
        this.game.scene.remove(star);
        return;
      }

      star.velocity += Config.star.acceleration;
      star.position.z += star.velocity;

      star.rotation.x += Config.star.rotateSpeed;
      star.rotation.y += Config.star.rotateSpeed;
      star.rotation.z += Config.star.rotateSpeed;
    });
  }

  checkCollision(star) {
    const objectBB = this.game.player.boundingBox;
    const starBound = new THREE.Box3;
    starBound.setFromObject(star);
    if (objectBB.intersectsBox(starBound)) {
      return true;
    }
  }
}

export default Star;
