import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { ConeGeometry, 
         Mesh, 
         MeshBasicMaterial, 
         MeshToonMaterial, 
         TorusGeometry, 
         TorusKnotGeometry, 
         DirectionalLight } from 'three'
         import gsap from 'gsap'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange( () => {
        material.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('#webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: '#ff0000' })
// )
// scene.add(cube)

const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load('gradients/3.jpg');
gradientTexture.magFilter = THREE.NearestFilter

const material = new MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
});
const mesh = [
        new Mesh(
            new TorusGeometry(1, 0.4, 16, 60),
            material
        ),
        new Mesh(
            new ConeGeometry(1, 2, 32),
            material
        ),
        new Mesh(
            new TorusKnotGeometry(0.8, 0.35, 100, 16),
            material
        ),
]

const objectsDistance = - 4
mesh[0].position.y = objectsDistance * 0;
mesh[1].position.y = objectsDistance * 1;
mesh[2].position.y = objectsDistance * 2;

scene.add(...mesh);

const sectionMeshes = [ ...mesh ]

const directionalLight = new DirectionalLight('#ffffff');
directionalLight.position.set(1,1,0);
scene.add(directionalLight);



const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++)
{
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = -1 * objectsDistance * 0.5 - Math.random() * -1 * objectsDistance * sectionMeshes.length
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: textureLoader,
    size: 0.03
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

 const cameraGroup = new THREE.Group()
 scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
// scene.add(camera)
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0;

let scrollY = window.scrollY

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
});




let currentSection = 0
window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)

    if(newSection != currentSection)
    {
        currentSection = newSection
        
        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5'
            }
        )
    }
})


mesh[0].position.x = 2
mesh[1].position.x = - 2
mesh[2].position.x = 2

const tick = () =>
{
    scrollY = window.scrollY

    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime

    camera.position.y = scrollY  / sizes.height * objectsDistance



    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

    for(const mesh of sectionMeshes) {
        mesh.rotation.x += deltaTime * 0.1
        mesh.rotation.y += deltaTime * 0.12
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()