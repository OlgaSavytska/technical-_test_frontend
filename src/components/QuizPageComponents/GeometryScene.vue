<template>
    <div>
        <div ref="scene"></div>
    </div>
</template>

<script>
import * as THREE from 'three';

export default{
    name: 'GeometryScene',

    props: {
        pageParams: {
            type: Number,
            default: null
        }
    },

    data(){
        return{
            openQuiz: false,
            scene: null,
            camera: null,
            renderer: null,
            squares: [],
            shapes: []
        }
    },

    mounted(){
        this.initScene();
        this.initBackground();
        this.initFallingShapes();
        this.animate();

        window.addEventListener('resize', this.handleResize);
        this.handleResize()
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },

    methods: {
        initScene() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.renderer.domElement);
            this.camera.position.z = 0.4;
        },

        initBackground() {
            const backgroundColor = new THREE.Color(0xF3F6F4);
            const backgroundGeometry = new THREE.PlaneGeometry(1000, 1000);
            const backgroundMaterial = new THREE.MeshBasicMaterial({ color: backgroundColor, side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
            const backgroundPlane = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
            this.scene.add(backgroundPlane);
        },

        initFallingShapes() {
            const shapeCount = 78;

            let box = new THREE.BoxGeometry(1, 1, 1)

            const geometries = [
                new THREE.TetrahedronGeometry(1),
                box.scale(1, 0.5, 1),
                new THREE.ConeGeometry(1, 1, 32),
                new THREE.OctahedronGeometry(1),
            ];

            for (let i = 0; i < shapeCount; i++) {
                const randomGeometry = geometries[Math.floor(Math.random() * geometries.length)];
                const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(Math.random(), Math.random(), Math.random()) });
                
                
                const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
                const wireframe = new THREE.LineSegments(new THREE.WireframeGeometry(randomGeometry), wireframeMaterial);
                
                const shape = new THREE.Mesh(randomGeometry, material);
                
                shape.position.set(
                (Math.random() - 0.5) * 20,
                Math.random() * 10,
                (Math.random() - 0.5) * 20
                );
                wireframe.position.copy(shape.position);

                this.shapes.push({ shape, wireframe });
                this.scene.add(shape, wireframe);
            }
        },

        animate() {
            requestAnimationFrame(this.animate);

            this.shapes.forEach(({ shape, wireframe }) => {
                shape.position.y -= 0.005;
                wireframe.position.y = shape.position.y;
                if (shape.position.y < -5) {
                shape.position.y = 10;
                wireframe.position.y = 10;
                }
            });

            this.renderer.render(this.scene, this.camera);
        },

        handleResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight + this.pageParams)
            this.initFallingShapes()
        }
    }
}
</script>