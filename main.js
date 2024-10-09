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
const cube_background = new three.CubeTextureLoader()
const texture = cube_background.load([
  space,
  space,
  space,
  space,
  space,
  stars
])
scene.background = texture;


rendering.setSize(innerWidth , innerHeight);
rendering.setPixelRatio(devicePixelRatio);
//camera helper grid helper and axis helper
//const helper = new three.CameraHelper(camera);
//scene.add(helper)
const axis_helper = new three.AxesHelper(30);
scene.add(axis_helper);
const grid_helper = new three.GridHelper(200);
scene.add(grid_helper);

//setting up mouse control
const controls =  new OrbitControls(camera, rendering.domElement)
camera.position.set(20,20,20);
controls.update();
// setting up ambient light from the sun
const amlight = new three.AmbientLight( 0x404040 );
scene.add( amlight );



//setting up sun

const sun_geo = new three.SphereGeometry(10,64,32);
const sun_material = new three.MeshBasicMaterial({
  wireframe : false,
  map: texture_loader.load(Sun)
})
const sun = new three.Mesh(sun_geo,sun_material);
scene.add(sun);
sun.position.set(0,0,0)
const pointlight = new three.PointLight(0xFFFFFFFF,2,30)
scene.add(pointlight);
pointlight.position.set(10,0,0)
//seting up mercury
const mercury_geo = new three.SphereGeometry(0.0701308035072589,64,32)
const mercury_material = new three.MeshStandardMaterial({
  map: texture_loader.load(Mercury),
  wireframe : false
})
const mercury = new three.Mesh(mercury_geo,mercury_material);
sun.add(mercury)
mercury.position.set(10.39,0,0)
//Venus
const venus_geo = new three.SphereGeometry(0.1739830386660917,64,32)
const venus_material = new three.MeshStandardMaterial({
  map: texture_loader.load(Venus),
  wireframe : false
})
const venus = new three.Mesh(venus_geo,venus_material);
scene.add(venus)
venus.position.set(10.72,0,0)
//Earth
const earth_geo = new three.SphereGeometry(0.1833548943510134,64,32)
const earth_material = new three.MeshStandardMaterial({
  map: texture_loader.load(Earth),
  wireframe : false
})
const earth = new three.Mesh(earth_geo,earth_material);
scene.add(earth)
earth.position.set(11.11,0,0)
//Moon
const moon_geo = new three.SphereGeometry(0.049946816156389264,32)
const moon_material = new three.MeshStandardMaterial({
  map: texture_loader.load(Moon),
  wireframe : false
})
const moon = new three.Mesh(moon_geo,moon_material);
scene.add(moon)
moon.position.set(11.11,0,0.25)

//Mars
const mars_geo = new three.SphereGeometry(0.0869565217391304,64,32)
const mars_material = new three.MeshStandardMaterial({
  map: texture_loader.load(Mars),
  wireframe : false
})
const mars = new three.Mesh(mars_geo,mars_material);
scene.add(mars)
mars.position.set(11.52,0,0)
//Jupiter
const jupiter_geo = new three.SphereGeometry(2.055253701308035,64,32)
const jupiter_material = new three.MeshStandardMaterial({
  map: texture_loader.load(Jupiter),
  wireframe : false
})
const jupiter = new three.Mesh(jupiter_geo,jupiter_material);
scene.add(jupiter)
jupiter.position.set(15.,0,0)

//Saturn
const saturn_geo = new three.SphereGeometry(1.732585884720425,64,32)
const saturn_material = new three.MeshStandardMaterial({
  map: texture_loader.load(Saturn),
  wireframe : false
})
const saturn = new three.Mesh(saturn_geo,saturn_material);
scene.add(saturn)
saturn.position.set(19.54,0,0)
//Saturn rings
const rings_geo = new three.TorusGeometry(1.9,0.05,64,32)
const rings_material = new three.MeshStandardMaterial({
  map: texture_loader.load(Saturn_Rings),
  wireframe : false
})
const rings = new three.Mesh(rings_geo,rings_material);
scene.add(rings);
rings.position.set(19.54,0,0);
rings.rotateX(2.041)
//Uranus
const uranus_geo = new three.SphereGeometry(0.7347707345120023,64,32)
const uranus_material = new three.MeshStandardMaterial({
  map: texture_loader.load(Uranus),
  wireframe : false
})
const uranus = new three.Mesh(uranus_geo,uranus_material);
scene.add(uranus)
uranus.position.set(29.2,0,0)
//Neptune
const neptune_geo = new three.SphereGeometry(0.7119160557711657,64,32)
const neptune_material = new three.MeshStandardMaterial({
  map: texture_loader.load(Neptune),
  wireframe : false
})
const neptune = new three.Mesh(neptune_geo,neptune_material);
scene.add(neptune)
neptune.position.set(40.6,0,0)

//animation

function animate(){
  rendering.setAnimationLoop(animate);
  rendering.render(scene , camera)
  sun.rotateY(0.01)

}
animate()
