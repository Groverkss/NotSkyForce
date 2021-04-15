import * as THREE from 'three'
import Config from './Config'

class BulletManager {
  constructor(game) {
    this.game = game;
    this.mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 2, 25),
      new THREE.MeshBasicMaterial({color: 0xff0000}),
    );
    this.mesh.scale.x = 0.05;
    this.mesh.scale.y = 0.05;
    this.mesh.scale.z = 0.05;
    this.mesh.lookAt(0, -1, 0);

    this.bullets = [];
    this.canShoot = 0;
  }

  addBullet() {
    if (this.canShoot <= 0) {  
      const bullet = this.mesh.clone();
      bullet.position.x = this.game.player.mesh.position.x;
      bullet.position.y = this.game.player.mesh.position.y + 0.05;
      bullet.position.z = this.game.player.mesh.position.z + 0.01;

      this.bullets.push(bullet);

      this.game.scene.add(bullet);

      bullet.alive = true;
      setTimeout( () => {
        this.game.scene.remove(bullet);
        bullet.alive = false;
      }, 3000);
      this.canShoot = 15;
    }
  }

  moveBullets() {
    this.bullets = this.bullets.filter( bullet => bullet.alive );
    for (let bullet of this.bullets) {
      bullet.position.z -= 0.1;
    }
    this.canShoot -= 1;
  }
}

export default BulletManager;
