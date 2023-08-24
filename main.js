import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'

const scene  = new THREE.Scene();


/*
* Tectures  
*/
// Cube tecture 
const cubeTextureLoader = new THREE.CubeTextureLoader();


// texture Loader

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/4.png');
/*
* TextGeometry
*/
const textGeometry = new TextGeometry();
/*
* Font Loader
*/

const fontLoader = new FontLoader();

const name = "Creative Web Developer";


fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font)=>{
    const textGeometry = new TextGeometry(
      name,
      {
        font: font,
        size: 0.5,
        height: 0.2,
        curvedSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegment: 4 
      }
    );
    // textGeometry.computeBoundingBox();
    // textGeometry.translate(
    //   - (textGeometry.boundingBox.max.x - 0.02) *  0.5,
    //   - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
    //   - (textGeometry.boundingBox.max.z - 0.03) *0.5
    // );
    textGeometry.center()
    const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture});
    const text = new THREE.Mesh(textGeometry,material)
    scene.add(text);

    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 30);

    for(let i=0;i<300;i++)
    {
      const donut = new THREE.Mesh(donutGeometry, material);

      donut.position.x = (Math.random()-0.5) * 10;
      donut.position.y = (Math.random()-0.5) * 10;
      donut.position.z = (Math.random()-0.5) * 10;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      const scale = Math.random();
      donut.scale.set(scale, scale, scale)
      scene.add(donut)
    }
  }
)






const sizes = {
  width:window.innerWidth,
  height:window.innerHeight
}

// resize the screen
window.addEventListener('resize',()=>{
  // updating the sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight
  // updating the camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height)
})



// Camera 
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100 );
camera.position.z = 3;
scene.add(camera);



// Renderer
const canvas = document.querySelector(".webgl");

const renderer = new THREE.WebGLRenderer({
  canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

//  Controls 

const controls = new OrbitControls(camera, canvas);
controls.enabled = true;
controls.enableDamping = true;

//  Animation 
const tick = () =>{
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();