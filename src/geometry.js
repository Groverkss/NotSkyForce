import * as THREE from 'three'

const createSphere = ({ radius, rgb, position }) => {
  const SEGMENTS = 16
  const RINGS = 16

  const color = rgb 
    ? new THREE.Color(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
    :  0xffffff

  const sphereMaterial = new THREE.MeshLambertMaterial({ color })
  const sphereGeometry = new THREE.SphereGeometry(radius || 20, SEGMENTS, RINGS)
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

  sphere.position.x = (position && position.x !== undefined) || 0
  sphere.position.y = (position && position.y !== undefined) || 0
  sphere.position.z = (position && position.z !== undefined) || -100
  return sphere
}

export { createSphere }