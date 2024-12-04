// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const modelContainer = document.querySelector('.model-container');

  // Initialize the scene, camera, and renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x808080); // Set background color to grey (hex code for grey)

  // Update the camera position and field of view (FOV)
  const camera = new THREE.PerspectiveCamera(75, modelContainer.clientWidth / modelContainer.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('ev-car'), antialias: true });
  renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Add basic lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Increase intensity if needed
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increase intensity for brighter lighting
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // Load the 3D model
  const loader = new THREE.GLTFLoader();
  loader.load(
    'models/Tesla2cars.glb',
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(1.5, 1.5, 1.5);
      model.position.set(0, -0.5, 0);

      scene.add(model);

      // Set up OrbitControls to interact with the camera
      const controls = new THREE.OrbitControls(camera, renderer.domElement);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Apply slow rotation to the model (around the Y-axis)
        model.rotation.y += 0.001;  // Adjust the value for a faster/slower rotation

        // Orbit controls update
        controls.update();

        renderer.render(scene, camera);
      };
      animate();
    },
    undefined,
    (error) => {
      console.error('An error occurred while loading the model:', error);
    }
  );

  // Set camera position further away
  camera.position.set(0, 2, 10); // Increase the 'z' value to zoom out

  // Handle window resize to keep the canvas responsive
  window.addEventListener('resize', () => {
    const width = modelContainer.clientWidth;
    const height = modelContainer.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
});