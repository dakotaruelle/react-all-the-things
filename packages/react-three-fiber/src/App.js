// --- Object creation ---

const group = new THREE.Group();
scene.add(group);

// Click handler on group (requires raycasting setup)
// See raycasting section below

// Inner flash light
const innerLight = new THREE.PointLight("#ffffff", 0, 4);
innerLight.position.set(0, 0, 0);
group.add(innerLight);

// Particles
const particleMat = new THREE.PointsMaterial({
  map: PARTICLE_TEXTURE,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  depthTest: false,
  transparent: true,
  size: 0.3,
  sizeAttenuation: true,
});
const particles = new THREE.Points(particleGeo, particleMat);
particles.renderOrder = 1;
particles.frustumCulled = false;
group.add(particles);

// Red top half — pivot group offset to back of sphere
const topPivot = new THREE.Group();
topPivot.position.set(0, 0, -1);
group.add(topPivot);

// Red hemisphere
const topHalfGeo = new THREE.SphereGeometry(1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const topHalfMat = new THREE.MeshStandardMaterial({
  color: "#ee1515",
  side: THREE.DoubleSide,
  roughness: 0.3,
  metalness: 0.1,
});
const topHalf = new THREE.Mesh(topHalfGeo, topHalfMat);
topHalf.position.set(0, 0, 1);
topPivot.add(topHalf);

// Black equator band
const bandGeo = new THREE.TorusGeometry(1.0, 0.055, 16, 128);
const bandMat = new THREE.MeshStandardMaterial({ color: "#111111" });
const band = new THREE.Mesh(bandGeo, bandMat);
band.position.set(0, 0, 1);
band.rotation.x = Math.PI / 2;
topPivot.add(band);

// Button — black outer cylinder
const btnOuterGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.08, 32);
const btnOuterMat = new THREE.MeshStandardMaterial({ color: "#111111" });
const btnOuter = new THREE.Mesh(btnOuterGeo, btnOuterMat);
btnOuter.position.set(0, 0, 2.04);
btnOuter.rotation.x = Math.PI / 2;
topPivot.add(btnOuter);

// Button — white inner cylinder
const btnInnerGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 32);
const buttonMat = new THREE.MeshStandardMaterial({ color: "white" }); // buttonMatRef equivalent
const btnInner = new THREE.Mesh(btnInnerGeo, buttonMat);
btnInner.position.set(0, 0, 2.1);
btnInner.rotation.x = Math.PI / 2;
topPivot.add(btnInner);

// White bottom half
const bottomGeo = new THREE.SphereGeometry(1, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
const bottomMat = new THREE.MeshStandardMaterial({
  color: "white",
  side: THREE.DoubleSide,
  roughness: 0.3,
  metalness: 0.1,
});
const bottomHalf = new THREE.Mesh(bottomGeo, bottomMat);
group.add(bottomHalf);


// --- Click / Raycasting (replaces R3F's onClick) ---

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const buttonMeshes = [btnOuter, btnInner]; // meshes with handleButtonClick

window.addEventListener("click", (e) => {
  pointer.x =  (e.clientX / window.innerWidth)  * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  // group click
  if (raycaster.intersectObject(group, true).length > 0) {
    if (spinTime.current === null) spinTime.current = 0;
  }

  // button click
  if (raycaster.intersectObjects(buttonMeshes).length > 0) {
    handleButtonClick();
  }
});

window.requestAnimationFrame(() => {
  // three.render()
})
