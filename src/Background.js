import * as THREE from 'three';

import Config from './Config'

class Background {
  constructor() {
    this.starGeo = new THREE.BufferGeometry();
    let starVerts = [];
    for (let i = 0; i < Config.background.numStars * 3; i++) {
      starVerts.push(
          Math.random() * 600 - 300,
      )
    }
    starVerts = new Float32Array(starVerts);
    this.starGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(starVerts, 3)
            .setUsage(THREE.DynamicDrawUsage));
  }

  async build() {
    const sprite = await this.loadTexture();
    this.starMaterial =
        new THREE.PointsMaterial({color: 0xaaaaaa, size: 0.7, map: sprite});

    this.stars = new THREE.Points(this.starGeo, this.starMaterial);

    /* Stores velocity of each point */
    this.stars.userData = Array(Config.background.numStars).fill(0);
  }

  update() {
    if (!this.stars) {
      return;
    }

    const len = Config.background.numStars * 3;
    for (let i = 2, j = 0; i < len; i += 3, j++) {
      this.stars.userData[j] += Config.background.acceleration;
      this.stars.geometry.getAttribute('position').array[i] +=
          this.stars.userData[j];

      if (this.stars.geometry.getAttribute('position').array[i] > 200) {
        this.stars.userData[j] = 0;
        this.stars.geometry.getAttribute('position').array[i] = -200;
      }

      this.stars.geometry.getAttribute('position').needsUpdate = true;
    }
    this.stars.rotation.z += Config.background.rotateSpeed;
  }

  loadTexture() {
    return new Promise((resolve, reject) => {
      new THREE.TextureLoader().load(
          Config.background.starPath, sprite => resolve(sprite));
    });
  }
}

export default Background;
