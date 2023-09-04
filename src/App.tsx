// @ts-ignore

import reactLogo from './assets/react.svg'
import './App.css'

import { FileUploadSingle } from './FileUploadSingle'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Color, Vector3 } from 'three'
import { useControls } from 'leva'
import { OrbitControls, TransformControls, useCursor } from '@react-three/drei'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (ref.current.rotation.x += delta))


// Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color={new Color(((props.position[0] + 5) / 12) , ((props.position[1] + 5) / 12), ((props.position[2] + 5) / 12))} />
    </mesh>
  )
}

function App() {
	const boxes = []

	for (let i = -5; i < 5; i++) {
		for (let j = -5; j < 5; j++) {
			for (let k = -5; k < 5; k++) {
				boxes.push(<Box position={[i, j, k]} />)
			}
		}
	}

	const children = [
		<OrbitControls makeDefault />,
		<ambientLight />,
		<pointLight position={[10, 10, 10]} />,
		...boxes
	]

	const { x, y, z } = useControls({ x: 0, y: 0, z: 20 })

	const camera = { fov: 90, near: 0.1, far: 1000, position: new Vector3(x, y, z) }
	// const controls = new OrbitControls( camera );

	// controls.rotateSpeed = 0.4;
	// controls.zoomSpeed = 0.3;
	// controls.panSpeed = 0;

	// controls.enableDamping = true;
	// controls.dampingFactor = 0.1;

	// useFrame((state, delta) => controls.update())

	const canvas = <Canvas camera={camera} children={children} />

	return <div style={{ width: "75vw", height: "75vh" }}>
	{/* <FileUploadSingle/> */}
	{canvas}
	</div>
	// return canvas
}

export default App
