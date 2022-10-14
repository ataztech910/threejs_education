import './style.css'
import * as THREE from 'three'
import gsap, { wrap } from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui'
// import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { MeshBasicMaterial } from 'three'
/**
 * Debug
 */
const gui = new dat.GUI()


const cursor = {
    x: 0,
    y: 0
}

// Sizes
const sizes = {}
const setSizes = () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
}
setSizes()


const delta = 0.5

// Texture
// const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => {
//     console.log('Textures loading')
// }

// loadingManager.onProgress = () => {
//     console.log('in Progress')
// }

// loadingManager.onLoad = () => {
//     console.log('Textures loaded')
// }
// const textureLoader = new THREE.TextureLoader(loadingManager)
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const fontLoader = new FontLoader()
// const texture = textureLoader.load('/door.jpg')
// const textureWithBoobs = textureLoader.load('/photo.jpg')
// const textureWithBoobs = textureLoader.load('/checkerboard-1024x1024.png')
// const textureWithBoobs = textureLoader.load('/checkerboard-8x8.png')
// const textureWithBoobs = textureLoader.load('/minecraft.png')
// textureWithBoobs.repeat.x = 2
// textureWithBoobs.repeat.y = 2
// textureWithBoobs.wrapS = THREE.RepeatWrapping
// textureWithBoobs.wrapT = THREE.RepeatWrapping

// textureWithBoobs.offset.x = 0.5
// textureWithBoobs.offset.y = 0.5

// textureWithBoobs.rotation = Math.PI / 3

// textureWithBoobs.generateMipmaps = false
// textureWithBoobs.minFilter = THREE.NearestFilter
// textureWithBoobs.magFilter = THREE.NearestFilter


const doorColorTexture = textureLoader.load('/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/door/height.jpg')
const doorNormalTexture = textureLoader.load('/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/door/roughness.jpg')
const matcapTexture = textureLoader.load('/matcaps/6.png')
const gradientTexture = textureLoader.load('/gradients/5.jpg')

const environmentMapTexture = cubeTextureLoader.load([
    '/environmentMaps/0/px.jpg',
    '/environmentMaps/0/nx.jpg',
    '/environmentMaps/0/py.jpg',
    '/environmentMaps/0/ny.jpg',
    '/environmentMaps/0/pz.jpg',
    '/environmentMaps/0/nz.jpg',
])

// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter




// Scene
const scene = new THREE.Scene()


/**
 * Objects
 */

// Regular material
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color(0x00ff00)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// Normal material
// const material = new THREE.MeshNormalMaterial()

// Mapcap mataerial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// Mesh depth material
// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0xff0000)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.45
// material.roughness = 0.65
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 2

// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.10

// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.transparent = true
// material.alphaMap = doorAlphaTexture

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture

gui.add(material, 'metalness').min(0).max(1)
gui.add(material, 'roughness').min(0).max(1)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)

sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)

torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
torus.position.x = 1.5

scene.add(sphere, plane, torus)


const ambienLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambienLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.set(0.7, - 0.6, 1)
// mesh.scale.set(2, 0.5, 0.5)

// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25

// scene.add(mesh)
// scene.add(new THREE.AxesHelper())

// const group = new THREE.Group()
// scene.add(group)


// const image = new Image()
// const texture = new THREE.Texture(image)
// image.onload = () => {
//     console.log('image loaded')
//     texture.needsUpdate = true
// }
// image.src = 'door.jpg'

const geometry = new THREE.BoxBufferGeometry(1, 1, 1) //new THREE.BufferGeometry()
// const geometry = new THREE.SphereGeometry(1, 32, 32) //new THREE.BufferGeometry()
const count = 50
console.log(geometry.attributes.uv)
let positionsArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4
}

// console.log(positionsArray)
const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)

// geometry.setAttribute('position', positionAttribute)

const params = {
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 })
    }
}

// const material = new THREE.MeshBasicMaterial(params)
// const mesh = new THREE.Mesh(
//     geometry,
//     material
// )



// gui
//     .addColor(params, 'color')
//     .onChange(() => {
//         material.color.set(params.color)
//     })

// gui.add(params, 'spin')

// scene.add(mesh)
// gui.add(mesh.position, 'y', -3, 3, 0.01)
// gui.add(mesh.position, 'x', -3, 3, 0.01)
// gui.add(mesh.position, 'z', -3, 3, 0.01)

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1, 4, 4, 4),
//     new THREE.MeshBasicMaterial({ 
//         color: 0xff0000,
//         wireframe: true
//     })
// )

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0x00ff00})
// )

// cube2.position.x = -2

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0x000fff})
// )

// cube3.position.x = 2

// group.add(cube1)
// group.add(cube2)
// group.add(cube3)

// group.position.y = 1


// Camera
const camera = new THREE.PerspectiveCamera(140, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1,
//     100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 1
camera.lookAt(sphere.position)
scene.add(camera)

const controls = new OrbitControls(camera, document.querySelector('#webgl'))
controls.enableDamping = true
// camera.lookAt(mesh.position)
// console.log(mesh.position.distanceTo(camera.position))

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// let time = 0

// gsap.to(group.position, { duration: 1, delay: 1, x: 2})
// renderer.render( scene, camera )
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - delta
    cursor.y = event.clientY / sizes.height - delta
})
window.addEventListener('resize', () => {
    console.log('resize')
    setSizes()
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        document.querySelector('#webgl').requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})


const clock = new THREE.Clock()
const animate = () => {
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime
    const elapsedTime = clock.getElapsedTime()
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // group.rotation.x = elapsedTime
    // group.rotation.y = elapsedTime
    // camera.position.x = Math.cos(elapsedTime)
    // camera.position.y = Math.sin(elapsedTime)
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2//- cursor.x * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2 //cursor.y * 3
    // camera.position.y =  cursor.y * 3
    // camera.lookAt(group.position)
    controls.update()
    renderer.render( scene, camera )
    requestAnimationFrame( animate )
}

animate()

