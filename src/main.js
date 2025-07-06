import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

console.log(OrbitControls);

// intitialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "white",
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

cubeMesh.position.y = -1;
// cubeMesh.scale.setScalar(2);
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x = 1.5;
const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh3.position.x = -1.5;

const cubeMesh4 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh4.position.y = 1;

const group = new THREE.Group();
group.position.y = 1.5;
group.scale.y = 2;
group.scale.setScalar(2);

group.add(cubeMesh, cubeMesh2, cubeMesh3, cubeMesh4);

scene.add(group);
console.log(group.position.y);

// scene.add(cubeMesh);

// cubeMesh.scale.set(2, 2, 1);

// cubeMesh.position.y = 1;
// cubeMesh.position.x = 1;
// cubeMesh.position.z = 2;

// const tempVector = new THREE.Vector3(0, 0, 0);
// cubeMesh.position.copy(tempVector);

const axesHelper = new THREE.AxesHelper(4);
// scene // cubeMesh
scene.add(axesHelper);

// Math.PI * .5 === 90 dgree
// Math.PI * 2 === 360 dgree
// or you could just use this function degToRed(45)

// by default order is XYZ
cubeMesh.rotation.reorder("YXZ");
cubeMesh.rotation.y = THREE.MathUtils.degToRad(90);
cubeMesh.rotation.x = THREE.MathUtils.degToRad(45);

cubeMesh2.rotation.z = THREE.MathUtils.degToRad(45);

cubeMesh3.rotation.z = THREE.MathUtils.degToRad(-45);

cubeMesh4.rotation.z = THREE.MathUtils.degToRad(-45);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

// const aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// );
camera.position.z = 35;

// console.log(cubeMesh.position.distanceTo(camera.position));

// initialize the renderer
const canvas = document.querySelector("canvas.threeJs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

// antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// initialize the control
const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//  rnder the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
