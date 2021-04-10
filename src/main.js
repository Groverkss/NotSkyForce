import * as THREE from 'three'
import { createSphere } from './geometry'

let scene, camera, renderer

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer()

  renderer.setSize( window.innerWidth, window.innerHeight )
  document.body.appendChild( renderer.domElement )

  var light = new THREE.DirectionalLight( 0xffffff )
  light.position.set( 1, 1, 1 )
  scene.add( light )

  const sphere = createSphere({})
  scene.add(sphere)
}

const render = () => {
  renderer.render( scene, camera )
}

init()
render()
