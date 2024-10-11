import * as three from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//adding textures for planets and images for background
import stars from '/background_images/stars.jpg'
import star from '/background_images/star.jpg'
import galaxy from  '/background_images/galaxy.jpg'
import space from  '/background_images/space.jpg'
import Sun from '/textures/img/sun.jpg'
import Mercury from '/textures/img/mercury.jpg'
import Venus from '/textures/img/venus.jpg'
import Earth from '/textures/img/earth.jpg'
import Moon from '/textures/img/moon.jpg'
import Mars from '/textures/img/mars.jpg'
import Jupiter from '/textures/img/jupiter.jpg'
import Saturn from '/textures/img/saturn.jpg'
import Saturn_Rings from '/textures/img/saturn_rings.png'
import Uranus from '/textures/img/uranus.jpg'
import Neptune from '/textures/img/neptune.jpg'


// configuration of scene camera and rendering
const scene = new three.Scene()
const camera = new three.PerspectiveCamera(70 , innerWidth / innerHeight , 0.1 , 1000)
const rendering = new three.WebGLRenderer({
  canvas : document.querySelector('.bg'),
});
//setting up background
/*
const bgTexture = texture_loader.load(stars)
bgTexture.colorSpace = three.SRGBColorSpace
scene.background = bgTexture*/
const texture_loader = new three.TextureLoader();
/*const cube_background = new three.CubeTextureLoader()
const texture = cube_background.load([
  space,
  space,
  space,
  space,
  space,
  stars
])
scene.background = texture;*/


rendering.setSize(innerWidth , innerHeight);
rendering.setPixelRatio(devicePixelRatio);
/*camera helper grid helper and axis helper
const helper = new three.CameraHelper(camera);
scene.add(helper)
const axis_helper = new three.AxesHelper(30);
scene.add(axis_helper);
const grid_helper = new three.GridHelper(200);
scene.add(grid_helper);
*/
rendering.setClearColor(0x0000000)
//setting up mouse control
const controls =  new OrbitControls(camera, rendering.domElement)
camera.position.set(20,20,20);
controls.update();





//setting up sun

const sun_geo = new three.SphereGeometry(10,64,32);
const sun_material = new three.MeshBasicMaterial({
  wireframe : false,
  map: texture_loader.load(Sun)
})
const sun = new three.Mesh(sun_geo,sun_material);
scene.add(sun);
sun.position.set(0,0,0)
const pointlight = new three.PointLight(0xFFFFFFFF,5,100)
scene.add(pointlight);
pointlight.position.set(10,0,0)


//seting up function that creates our planets without copying code
function createPlanet (size , texture , position){
  const geo = new three.SphereGeometry(size,40,40)
  const mat = new three.MeshStandardMaterial({
  map: texture_loader.load(texture)
})
const mesh = new three.Mesh(geo,mat);
const obj = new three.Object3D
obj.add(mesh)
scene.add(mesh)

mesh.position.x = position

return{mesh , obj}
}

const mercury = createPlanet(0.0701308035072589,Mercury,10.39)
const venus = createPlanet(0.1739830386660917,Venus,10.72)
const earth= createPlanet(0.1833548943510134,Earth,11.11)
const moon= createPlanet(0.049946816156389264,Moon,11.40)
const mars = createPlanet(0.0869565217391304,Mars,11.75)
const jupiter = createPlanet(2.055253701308035,Jupiter,15)
const saturn = createPlanet(1.732585884720425,Saturn,19.54)
const uranus= createPlanet(0.7347707345120023,Uranus,29.2)
const neptune = createPlanet(0.7119160557711657,Neptune,40.6)


//Saturn rings
const ring_geo = new three.RingGeometry(2,1.5)
const ring_material = new three.MeshBasicMaterial({
  map:texture_loader.load(Saturn_Rings),
  side:three.DoubleSide
})
const rings = new three.Mesh(ring_geo , ring_material)
rings.position.set(19.54,0,0)
scene.add(rings)
rings.rotation.x = Math.PI/2






 

function animate(){
  rendering.setAnimationLoop(animate);
  rendering.render(scene , camera)
  //self rotation
  sun.rotateY(0.04)
  mercury.mesh.rotateY(0.04)
  mercury.obj.rotateY(0.04)
  venus.mesh.rotateY(0.04)
  venus.obj.rotateY(0.04)
  earth.mesh.rotateY(0.04)
  earth.obj.rotateY(0.04)
  moon.mesh.rotateY(0.04)
  moon.obj.rotateY(0.04)
  mars.mesh.rotateY(0.04)
  mars.obj.rotateY(0.04)
  jupiter.mesh.rotateY(0.04)
  jupiter.obj.rotateY(0.04)
  saturn.mesh.rotateY(0.04)
  saturn.obj.rotateY(0.04)
  uranus.mesh.rotateY(0.04)
  uranus.obj.rotateY(0.04)
  neptune.mesh.rotateY(0.04)
  neptune.obj.rotateY(0.04)

}
animate()
