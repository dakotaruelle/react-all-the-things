import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const WHITE = new THREE.Color('white')
const PRESSED_YELLOW = new THREE.Color('#ffff99')

const PARTICLE_COUNT = 120

const PARTICLE_TEXTURE = (() => {
  const canvas = document.createElement('canvas')
  canvas.width = 32; canvas.height = 32
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 32, 32)
  return new THREE.CanvasTexture(canvas)
})()

function Pokeball() {
  const groupRef = useRef<THREE.Group>(null)
  const topPivotRef = useRef<THREE.Group>(null)
  const posY = useRef(8)
  const velY = useRef(0)
  const spinTime = useRef<number | null>(null)
  const spinDuration = 0.9
  const buttonMatRef = useRef<THREE.MeshStandardMaterial>(null)
  const buttonPressTime = useRef<number | null>(null)
  const pressDuration = 0.35
  const hopTime = useRef<number | null>(null)
  const hopDuration = 0.5
  const openTime = useRef<number | null>(null)
  const innerLightRef = useRef<THREE.PointLight>(null)
  const openTotalDuration = 2.2

  // Particles
  const particlePosArr = useRef(new Float32Array(PARTICLE_COUNT * 3).fill(-9999))
  const particleColArr = useRef(new Float32Array(PARTICLE_COUNT * 3))
  const particleVelArr = useRef(new Float32Array(PARTICLE_COUNT * 3))
  const particleLifeArr = useRef(new Float32Array(PARTICLE_COUNT))
  const particleMaxLifeArr = useRef(new Float32Array(PARTICLE_COUNT))
  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(particlePosArr.current, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(particleColArr.current, 3))
    return geo
  }, [])

  const { gl } = useThree()
  gl.localClippingEnabled = false

  const spawnParticles = () => {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const maxLife = 0.5 + Math.random() * 0.7
      particleMaxLifeArr.current[i] = maxLife
      particleLifeArr.current[i] = maxLife

      // Start near center with small jitter
      particlePosArr.current[i * 3 + 0] = (Math.random() - 0.5) * 0.3
      particlePosArr.current[i * 3 + 1] = (Math.random() - 0.5) * 0.3
      particlePosArr.current[i * 3 + 2] = (Math.random() - 0.5) * 0.3

      // Velocity: cone pointing upward through the opening
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.55 // ~100° cone upward
      const speed = 1 + Math.random() * 3.5
      particleVelArr.current[i * 3 + 0] = Math.sin(phi) * Math.cos(theta) * speed
      particleVelArr.current[i * 3 + 1] = Math.cos(phi) * speed
      particleVelArr.current[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * speed
    }
    particleGeo.attributes.position.needsUpdate = true
    particleGeo.computeBoundingSphere()
  }

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Spring drop toward y=0
    const stiffness = 12
    const damping = 5
    velY.current += (-stiffness * posY.current - damping * velY.current) * delta
    posY.current += velY.current * delta

    let hopOffset = 0
    if (hopTime.current !== null) {
      hopTime.current += delta
      const t = Math.min(hopTime.current / hopDuration, 1)
      hopOffset = Math.sin(t * Math.PI) * 0.4
      if (t >= 1) hopTime.current = null
    }
    groupRef.current.position.y = posY.current + hopOffset

    // Button press color animation
    if (buttonPressTime.current !== null) {
      buttonPressTime.current += delta
      const t = Math.min(buttonPressTime.current / pressDuration, 1)
      if (buttonMatRef.current)
        buttonMatRef.current.color.copy(WHITE).lerp(PRESSED_YELLOW, Math.sin(t * Math.PI))
      if (t >= 1) {
        if (buttonMatRef.current) buttonMatRef.current.color.copy(WHITE)
        buttonPressTime.current = null
      }
    }

    // Open/close animation — pivot is at the back (z=-1), rotates on X
    if (openTime.current !== null && topPivotRef.current) {
      openTime.current += delta
      const t = Math.min(openTime.current / openTotalDuration, 1)

      let openProgress: number
      if (t < 0.3) {
        const p = t / 0.3
        openProgress = 1 - (1 - p) * (1 - p)
      } else if (t < 0.7) {
        openProgress = 1
      } else {
        const p = (t - 0.7) / 0.3
        openProgress = (1 - p) * (1 - p)
      }

      topPivotRef.current.rotation.x = -openProgress * Math.PI * 0.6
      groupRef.current.rotation.x = openProgress * (Math.PI / 4)
      groupRef.current.position.y = posY.current - openProgress * 0.7
      if (innerLightRef.current) innerLightRef.current.intensity = openProgress * 40

      if (t >= 1) {
        topPivotRef.current.rotation.x = 0
        groupRef.current.rotation.x = 0
        groupRef.current.position.y = posY.current
        if (innerLightRef.current) innerLightRef.current.intensity = 0
        openTime.current = null
      }
    }

    // Spin one full revolution with ease-in-out, then snap back to 0
    if (spinTime.current !== null) {
      spinTime.current += delta
      const t = Math.min(spinTime.current / spinDuration, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      groupRef.current.rotation.y = eased * Math.PI * 2
      if (t >= 1) {
        groupRef.current.rotation.y = 0
        spinTime.current = null
      }
    }

    // Particle update
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (particleLifeArr.current[i] > 0) {
        particleLifeArr.current[i] -= delta
        const normalized = Math.max(0, particleLifeArr.current[i]) / particleMaxLifeArr.current[i]
        particlePosArr.current[i * 3 + 0] += particleVelArr.current[i * 3 + 0] * delta
        particlePosArr.current[i * 3 + 1] += particleVelArr.current[i * 3 + 1] * delta
        particlePosArr.current[i * 3 + 2] += particleVelArr.current[i * 3 + 2] * delta
        particleColArr.current[i * 3 + 0] = normalized
        particleColArr.current[i * 3 + 1] = normalized
        particleColArr.current[i * 3 + 2] = normalized * 0.8
      } else if (particlePosArr.current[i * 3 + 1] !== -9999) {
        particlePosArr.current[i * 3 + 1] = -9999
      }
    }
    particleGeo.attributes.position.needsUpdate = true
    particleGeo.attributes.color.needsUpdate = true
  })

  const handleButtonClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    if (buttonPressTime.current === null) {
      buttonPressTime.current = 0
      openTime.current = 0
      spawnParticles()
    }
  }

  return (
    <group
      ref={groupRef}
      onClick={() => { if (spinTime.current === null) spinTime.current = 0 }}
    >
      {/* Inner flash light */}
      <pointLight ref={innerLightRef} position={[0, 0, 0]} intensity={0} color="#ffffff" distance={4} />

      {/* Particles */}
      <points geometry={particleGeo} renderOrder={1} frustumCulled={false}>
        <pointsMaterial
          map={PARTICLE_TEXTURE}
          vertexColors={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
          transparent={true}
          size={0.3}
          sizeAttenuation={true}
        />
      </points>

      {/* Red top half — pivot is at the back of the sphere for hinge */}
      <group ref={topPivotRef} position={[0, 0, -1]}>
        <mesh position={[0, 0, 1]}>
          <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ee1515" side={THREE.DoubleSide} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Black equator band */}
        <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.0, 0.055, 16, 128]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        {/* Button - raised black cylinder */}
        <mesh position={[0, 0, 2.04]} rotation={[Math.PI / 2, 0, 0]} onClick={handleButtonClick}>
          <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        {/* Button - white raised inner cylinder */}
        <mesh position={[0, 0, 2.1]} rotation={[Math.PI / 2, 0, 0]} onClick={handleButtonClick}>
          <cylinderGeometry args={[0.12, 0.12, 0.06, 32]} />
          <meshStandardMaterial ref={buttonMatRef} color="white" />
        </mesh>
      </group>

      {/* White bottom half */}
      <mesh>
        <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="white" side={THREE.DoubleSide} roughness={0.3} metalness={0.1} />
      </mesh>
    </group>
  )
}

function App() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, 0, 3] }}>
      <color attach="background" args={['#111111']} />
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 4, 2]} intensity={30} color="white" />
      <Pokeball />
    </Canvas>
  )
}

export default App
