import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import GameScene from './scenes/GameScene'
import GameOver from './scenes/GameOver'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 }
		}
	},
	scene: [HelloWorldScene, GameScene, GameOver]
}

export default new Phaser.Game(config)
