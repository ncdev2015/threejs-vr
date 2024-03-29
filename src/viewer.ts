import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class Viewer {

    size: THREE.Vec2;

    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    grid: THREE.GridHelper;

    constructor(name: string, canvasWidth: number, canvasHeight: number) {
        // Viewer size
        this.size = new THREE.Vector2(canvasWidth, canvasHeight);

        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);        

        // Renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(canvasWidth, canvasHeight);

        // Connects Viewer instance with the canvas identified by id
        document.getElementById(name)!.appendChild(this.renderer.domElement);

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Grid
        this.grid = new THREE.GridHelper(1000, 1000);
    }
    
    setup() {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
            
        this.scene.add( cube );
        this.scene.add( this.grid );        

        this.camera.position.set(3, 4, 3);

        this.controls.update();

        let animate = () => {
            requestAnimationFrame( animate );
    
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            //this.effect.render(this.scene, this.camera);
    
            this.renderer.render( this.scene, this.camera );
        }
    
        animate();
    }

    setSize(width: number, height: number) {
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        //this.effect.setSize(width, height);
    }
}

