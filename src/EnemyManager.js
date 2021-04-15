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
  }
}

export default EnemyManager;
