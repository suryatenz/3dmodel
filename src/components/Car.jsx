import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';



function Model(props){
  const { scene } = useGLTF("/goblin.glb");
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new MeshStandardMaterial({ color: 'red' }); // Set your desired color here
    }
  });

  return <primitive object={scene} {...props} />
   
}

export const Car = () => {
  return (
    <>
    <div className=" text-center text-red-500 text-2xl italic pb-4 pt-4"> Goblin</div>
    <div className=" pl-9" style={{ padding: "0px" }}>
      <Canvas className='' dpr={[3, 5]} shadows camera={{ fov: 45 }} style={{ "width": "92rem", "height": "36rem" , "paddingLeft":"5rem" }} >
        <color attach="background" args={["#101010"]} />
        <PresentationControls speed={2} global zoom={3} polar={[-1, Math.PI / 4]}>
          <Stage environment={'sunset'}>
          <Model scale={0.001} rotation={[0, Math.PI, 0]} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
    </>
  )
}