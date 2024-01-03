import * as THREE from 'three';
import { merge } from './merge.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export default class Passage extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);

        this.loaded = false;

        this.onLoad = function (object) {
            switch (this.passage.position.direction) {
                case 'north':
                    object.scene.position.set(
                        this.passage.position.positionX - this.halfSize.width - 1.5,
                        0,
                        this.passage.position.positionY - this.halfSize.depth,
                    );
                    break;
                case 'south':
                    object.scene.position.set(
                        this.passage.position.positionX - this.halfSize.width + 1.5,
                        0,
                        this.passage.position.positionY - this.halfSize.depth - 1,
                    );
                    object.scene.rotateY(Math.PI);
                    break;
                case 'east':
                    object.scene.position.set(
                        this.passage.position.positionX - this.halfSize.width,
                        0,
                        this.passage.position.positionY - this.halfSize.depth + 1.5,
                    );
                    object.scene.rotateY(Math.PI / 2);
                    break;
                case 'west':
                    object.scene.position.set(
                        this.passage.position.positionX - this.halfSize.width + 1,
                        0,
                        this.passage.position.positionY - this.halfSize.depth - 0.5,
                    );
                    object.scene.rotateY(-Math.PI / 2);
                    break;
            }

            // Set the scale after loading textures
            object.scene.scale.set(0.2, 0.2, 0.2);
            this.add(object.scene);

            this.loaded = true;
        };

        const onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + ((100.0 * xhr.loaded) / xhr.total).toFixed(0) + '% loaded.');
        };

        const onError = function (url, error) {
            console.error("Error loading resource '" + url + "' (" + error + ').');
        };

        // Create a resource .gltf or .glb file loader
        const loader = new GLTFLoader();

        // Load a model description resource file
        this.url = './models/nether_portal/scene.gltf';
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            (object) => this.onLoad(object),

            // onProgress callback
            (xhr) => onProgress(this.url, xhr),

            // onError callback
            (error) => onError(this.url, error),
        );
    }
}
