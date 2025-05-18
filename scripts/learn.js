import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { STLLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/STLLoader.js';

// Create the camera
const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 5); // Adjust camera position

// Create the scene
const scene = new THREE.Scene();
let sculpture;
const loader = new STLLoader();

// Load the STL file
loader.load(
    './assets/sculpture.stl',
    function (geometry) {
        console.log('STL file loaded successfully');
        console.log('Geometry:', geometry);  // Log the geometry object

        if (geometry) {
            // Create the material for the sculpture
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            sculpture = new THREE.Mesh(geometry, material);
            scene.add(sculpture);

            // Scale down the sculpture and position it at the center
            sculpture.scale.set(0.1, 0.1, 0.1);  // Scale the model down to fit in the scene
            sculpture.position.set(0, 0, 0);  // Position the model at the center

            console.log('Sculpture added to scene');
        } else {
            console.error('No geometry found in the STL file.');
        }
    },
    function (progress) {
        // Show loading progress
        console.log((progress.loaded / progress.total * 100).toFixed(2) + '% loaded');
    },
    function (err) {
        // Log errors during loading
        console.error('An error occurred during STL loading:', err);
    }
);

// Create the renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('sculpture').appendChild(renderer.domElement);

// Add ambient and directional light
const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Directional light
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Create the rendering loop
const renderingRecursion = () => {
    requestAnimationFrame(renderingRecursion);

    // Render the scene
    renderer.render(scene, camera);

    // Rotate the sculpture to make sure it’s visible
    if (sculpture) {
        sculpture.rotation.x += 0.01;
        sculpture.rotation.y += 0.01;
    }
};
renderingRecursion();
