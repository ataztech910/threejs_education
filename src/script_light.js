import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
    AmbientLight,
    PointLight,
    Clock,
    WebGLRenderer,
    PerspectiveCamera,
    MeshStandardMaterial ,
    Mesh,
    Scene,
    TextureLoader,
    SphereGeometry,
    PlaneGeometry,
    TorusGeometry,
    BoxGeometry, 
    HemisphereLight,
    RectAreaLight,
    Vector3,
    SpotLight,
    SpotLightHelper,
    HemisphereLightHelper
} from 'three'

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('#webgl')

// Scene
const scene = new Scene()

/**
 * Lights
 */
const ambientLight = new AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

const pointLight = new PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
// gui.add(pointLight.position, 'x').min(0).max(100).step(1)
// gui.add(pointLight.position, 'y').min(0).max(100).step(1)
// gui.add(pointLight.position, 'z').min(0).max(100).step(1)
// gui.add(pointLight, 'distance').min(10).max(100).step(1)
// scene.add(pointLight)

const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1)
// scene.add(hemisphereLight)

const rectAreaLight = new RectAreaLight(0x4e00ff, 5, 1, 1)
rectAreaLight.lookAt(new Vector3())
// scene.add(rectAreaLight)

const spotLight = new SpotLight(0x78f00,0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
// gui.add(spotLight.position, 'x').min(-10).max(10).step(0.01)
// gui.add(spotLight.position, 'y').min(-10).max(10).step(0.01)
// gui.add(spotLight.position, 'z').min(-10).max(10).step(0.01)
// gui.add(spotLight, 'distance').min(1).max(100).step(Math.PI * 0.1)
// gui.add(spotLight, 'penumbra').min(0).max(1).step(0.001)
scene.add(spotLight)

// Helpers

const hemisphereLightHelper = new HemisphereLightHelper(hemisphereLight, 0.5)
const spotLightHelper = new SpotLightHelper(spotLight)
// gui.add(hemisphereLightHelper, 'size').min(0).max(100).step(0.001)
scene.add(hemisphereLightHelper)
scene.add(spotLightHelper)


/**
 * Objects
 */
// Material
const material = new MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new Mesh(
    new SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new Mesh(
    new BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new Mesh(
    new TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new Mesh(
    new PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

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
