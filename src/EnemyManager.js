import * as THREE from 'three'
import Config from './Config'

class EnemyManager {
  constructor(enemyMesh, game) {
    this.mesh = enemyMesh; 
    this.game = game;

    this.mesh.lookAt(0, 0, 1);
    this.mesh.scale.x = 0.2;
    this.mesh.scale.z = 0.2;
    this.mesh.scale.y = 0.2;
    this.mesh.position.z = -1;

    this.enemies = [];
  }

  addEnemy(x, y, z) {
    const enemy = this.mesh.clone();

    if (x) {
      enemy.position.x = x;
    }

    if (y) {
      enemy.position.y = y;
    }

    if (z) {
      enemy.position.z = z;
    }

    this.game.scene.add(enemy);

    enemy.alive = true;
    enemy.boundingBox = new THREE.Box3;
    enemy.boundingBox.setFromObject(enemy);

    this.enemies.push(enemy);
  }

  update() {
    if (!this.game.player) {
      return;
    }

    for (const enemy of this.enemies) {
      if (!enemy.alive) {
        enemy.timer--;
        if (enemy.timer <= 0) {
          enemy.alive = true;
          this.game.scene.add(enemy);
        } else {
          continue;
        }
      }

      if (this.checkCollision(enemy)) {
        enemy.alive = false;
        enemy.timer = 200;
        this.game.player.score += Config.enemy.score;
        this.game.scene.remove(enemy);
      };
    }
  }

  checkCollision(object) {
    const objectBB = object.boundingBox; 
    for (let bullet of this.game.player.bulletManager.bullets) {

      const bulletBound = new THREE.Box3;
      bulletBound.setFromObject(bullet);

      if (objectBB.intersectsBox(bulletBound)) {
        return true;
      }
    }

    return false;
  }
}

export default EnemyManager;
