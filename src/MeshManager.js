import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Config from './Config';

class MeshManager {
  constructor() {
    this.loader = new GLTFLoader();
    this.meshes = {};
  }

  async build() {
    for (const object in Config.objects) {
      const mesh = await this.loadMesh(Config.objects[object].objectFile);
      if (!mesh) {
        console.log(`Error while loading mesh for ${object}`);
      }
      this.meshes[`${object}`] = {
        mesh: mesh
      };
    }   
  }

  loadMesh(path) {
    return new Promise( (resolve, reject) => {
      this.loader.load(path, 
        gltf => {
          resolve(gltf.scene)
        },
        undefined, 
        error => {
          console.error(error);
          reject(null);
        }
      )
    }); 
  }
}

export default MeshManager;
