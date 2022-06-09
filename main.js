// https://www.youtube.com/watch?v=Q7AOvWpIVHU&t=155s

import './style.css'
import * as Three from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// Setup of basic elements
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new Three.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Torus
const geometry = new Three.TorusGeometry(10, 3, 16, 100);
const material = new Three.MeshStandardMaterial({
  color: 0xFF6347,
  wireframe: false
});
const torus = new Three.Mesh(geometry, material);

scene.add(torus);

// Lighting
const pointLight = new Three.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5);

const ambientLight = new Three.AmbientLight(0xFFFFFF);

scene.add(pointLight, ambientLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Stars
function createStar() {
  const s = Three.MathUtils.randFloat(0.125, 0.375);
  const sphereGeo = new Three.SphereGeometry(s, 24, 24);
  const sphereMaterial = new Three.MeshStandardMaterial({color: 0xFFFFFF});
  const star = new Three.Mesh(sphereGeo, sphereMaterial);

  const [x, y, z] = Array(3).fill().map(() => Three.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(createStar);

// Background
const spaceTexture = new Three.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// Moon
const moon = new Three.Mesh(
  new Three.SphereGeometry(3, 32, 32),
  new Three.MeshStandardMaterial({
    map: new Three.TextureLoader().load("moon.jpg"),
    normalMap: new Three.TextureLoader().load("normal.jpg"),
  })
); 

scene.add(moon)

// Animate everything
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.z += 0.01;
  torus.rotation.y += 0.01;

  moon.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();