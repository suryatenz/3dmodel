// 



import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { ShaderMaterial } from 'three';
import { Vector3 } from 'three';


function Model(props){
  const { scene } = useGLTF("/goblin.glb");
  scene.traverse((child) => {
    if (child.isMesh) {
      // Create custom shader material for tint effect
      child.material = new ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          tint: { value: new Vector3(0.5, 0.5, 1.0) } // Blue tint
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec2 vUv;

          void main() {
            vNormal = normal;
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D baseTexture;
          uniform vec3 tint;
          varying vec3 vNormal;
          varying vec2 vUv;

          void main() {
            vec4 baseColor = texture2D(baseTexture, vUv);
            vec3 greenColor = vec3(0.0, 1.0, 0.0); // Green color
            vec3 finalColor = baseColor.rgb * greenColor * tint;
            gl_FragColor = vec4(finalColor, baseColor.a);
          }
        `,
      });
    }
  });

  return <primitive object={scene} {...props} />;
}

export const Car = () => {
  return (
    <>
    <div className="text-center text-red-500 text-2xl italic pb-4 pt-4">Goblin</div>
    <div className="pl-9" style={{ padding: "0px" }}>
      <Canvas className='' dpr={[3, 5]} shadows camera={{ fov: 45 }} style={{ "width": "92rem", "height": "36rem", "paddingLeft":"5rem" }}>
        <color attach="background" args={["#101010"]} />
        <PresentationControls speed={2} global zoom={3} polar={[-1, Math.PI / 4]}>
          <Stage environment={'sunset'}>
            <Model scale={0.001} rotation={[0, Math.PI, 0]} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
    </>
  );
};
