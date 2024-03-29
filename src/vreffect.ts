import * as THREE from 'three';
import { StereoEffect } from 'three/addons/effects/StereoEffect.js';

import { Viewer } from './viewer';

export class Vreffect extends Viewer {
    effect: StereoEffect;

    constructor(name: string, width: number, height: number) {
        super(name, width, height);

        // VR effect        
        this.effect = new StereoEffect(this.renderer);
        this.effect.setSize(width, height);
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

            this.renderer.render( this.scene, this.camera );

            this.effect.render(this.scene, this.camera);
        }
    
        animate();
    }

    setSize(width: number, height: number) {
        super.setSize(width, height);
        this.effect.setSize(width, height);
    }
}