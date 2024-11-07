import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); // Black background
document.body.appendChild(renderer.domElement);

// Create three wireframe cubes with different colors
const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
    new THREE.LineBasicMaterial({ color: 0xff0000 }), // Red wireframe
    new THREE.LineBasicMaterial({ color: 0x00ff00 }), // Green wireframe
    new THREE.LineBasicMaterial({ color: 0x0000ff })  // Blue wireframe
];

const cubes = materials.map(material => {
    // Convert BoxGeometry to EdgesGeometry to show only the edges
    const edges = new THREE.EdgesGeometry(geometry);
    return new THREE.LineSegments(edges, material);
});

cubes.forEach(cube => scene.add(cube));

camera.position.z = 5;

// Animation variables
const rotationSpeed = 0.02;
const delayOffset = Math.PI / 4; // Offset between cubes

// Animation loop
function animate(time) {
    requestAnimationFrame(animate);

    // Rotate each cube with a delay
    cubes.forEach((cube, index) => {
        const timeOffset = time * 0.001 - (index * delayOffset);
        cube.rotation.x = timeOffset * rotationSpeed;
        cube.rotation.y = timeOffset * rotationSpeed;
    });

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate(0);