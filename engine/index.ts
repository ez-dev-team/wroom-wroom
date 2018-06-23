import Physics from './physics/physics'
import ClientServer from './client-server/client-server'
import Render from './render/render'

const all = {
	physics: Physics,
	clientServer: ClientServer,
	render: Render
}
console.info('modules', all)

document.body.innerHTML = `Loaded. Watch console.`
