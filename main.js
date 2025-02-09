import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { SSAARenderPass } from 'three/addons/postprocessing/SSAARenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const BLOOM_SCENE = 1;
const mousePos = new THREE.Vector3();

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );

const darkMaterial = new THREE.MeshBasicMaterial( { color: 'black'});
const materials = {};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const canvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({alpha: false, canvas, antialias: true});
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = Math.pow(1, 4.0);
renderer.setSize( window.innerWidth, window.innerHeight );
let gltfscene = null;
var clock = new THREE.Clock();

camera.position.z = 5;

const loader = new GLTFLoader();
loader.load('Screen.gltf', function(gltf) {
    gltfscene = gltf.scene;
    gltfscene.scale.x *= 4.0;
    gltfscene.scale.y *= 4.0;
    gltfscene.scale.z *= 4.0;
    gltfscene.position.x += 2.5;
    gltfscene.children.forEach(child => {
        if(child.name == "Screen") {
            child.layers.toggle(BLOOM_SCENE);
        }
    });
    
    scene.add(gltfscene);
}, undefined, function(error) {
    console.error(error);
});


const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

const ambiLight = new THREE.AmbientLight();
scene.add(ambiLight);

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0.0;
bloomPass.strength = 0.2;
bloomPass.radius = 0.0;

const ssaaPass = new SSAARenderPass(scene, camera);
ssaaPass.clearColor = 0x000000;
ssaaPass.clearAlpha = 0.0;
ssaaPass.sampleLevel = 4;
ssaaPass.enabled = true;

const outputPass = new OutputPass();

let bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);


const mixPass = new ShaderPass(
    new THREE.ShaderMaterial( {
        uniforms: {
            baseTexture: { value: null},
            bloomTexture: { value: bloomComposer.renderTarget2.texture }
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        defines: {}
    }), 'baseTexture'
);
mixPass.needsSwap = true;


const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(ssaaPass);
finalComposer.addPass(mixPass);
finalComposer.addPass(outputPass);

function animate() {
    if(gltfscene != null) {
        //gltfscene.rotation.y -= 0.0025;
        gltfscene.position.y += Math.sin(clock.getElapsedTime()) * 0.001;
        let copy = mousePos.clone();
        copy.unproject(camera);
        copy.sub(camera.position).normalize();
        var distance = (3.0 - camera.position.z) / copy.z;
        let pos = camera.position.clone();
        pos.add(copy.multiplyScalar(distance));
        gltfscene.lookAt(pos);
    }

    document.getElementById("age").innerText = ((Date.now() - new Date(2001, 0, 3)) / 31556952000.0).toFixed(7);
    
    render();
}

addEventListener("scroll", (event) => {
    camera.position.y = -window.scrollY / 250.0;
});

addEventListener("mousemove", (event) => {
   mousePos.set(
  ( event.clientX / window.innerWidth ) * 2 - 1,
  - ( event.clientY / window.innerHeight ) * 2 + 1,
  0.5,
    );
});

function render() {
    scene.traverse(darkenNonBloomed);
    bloomComposer.render();
    scene.traverse(restoreMaterial);
    finalComposer.render();
}

function darkenNonBloomed(obj) {
    if(obj.isMesh && bloomLayer.test(obj.layers) === false) {
        materials[obj.uuid] = obj.material;
        obj.material = darkMaterial;
    }
}

function restoreMaterial(obj) {
    if(materials[obj.uuid]) {
        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];
    }
}

function disposeMaterial(obj) {
    if(obj.material) {
        obj.material.dispose();
    }
}

scene.traverse(disposeMaterial);
renderer.setAnimationLoop(animate);
