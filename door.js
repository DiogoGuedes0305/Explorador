import * as THREE from 'three';
import { merge } from './merge.js';
// import { FBXLoader } from 'three/examples/jsm/Addons.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

/*
 * parameters = {
 *  url: String,
 *  door: {positionX: Number, positionY: Number, direction: String},
 *  halfSize: {width: Number, depth: Number},
 * }
 */
export default class Door extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);

        this.loaded = false;

        this.onLoad = function (object) {
            object.scale.set(0.1, 0.1, 0.1);
            if (this.door.position.direction === 'north') {
                object.position.set(
                    this.door.position.positionX - this.halfSize.width + 0.5,
                    0,
                    this.door.position.positionY - this.halfSize.depth,
                );
            } else {
                object.position.set(
                    this.door.position.positionX - this.halfSize.width,
                    0,
                    this.door.position.positionY - this.halfSize.depth + 0.5,
                );
                object.rotateY(Math.PI / 2);
            }

            // Create a material with light brown color
            const material = new THREE.MeshPhongMaterial({ color: 0xd2b48c }); // Use the color code for light brown

            // Assign the material to the object's children (assuming the model has child meshes)
            object.traverse((child) => {
                if (child.isMesh) {
                    child.material = material;
                }
            });

            // Set the scale after loading textures
            object.scale.set(this.dScale[0], this.dScale[1], this.dScale[2]);

            // Add the door object to the scene
            this.add(object);
            this.loaded = true;
        };

        const onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + ((100.0 * xhr.loaded) / xhr.total).toFixed(0) + '% loaded.');
        };

        const onError = function (url, error) {
            console.error("Error loading resource '" + url + "' (" + error + ').');
        };

        // Create a resource .fbx file loader
        const loader = new FBXLoader();

        // Load a model description resource file
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
