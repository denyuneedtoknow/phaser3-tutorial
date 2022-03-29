import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
    constructor() {
        super('hello-world')
    }
    preload() {

        this.load.image('sky', 'assets/sky.png')

    }

    create() {
        this.add.image(400, 300, 'sky')
        this.add.text(200, 200, 'Click to play', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        this.input.on('pointerup', () => {
            this.scene.start('gameScene')
        });


    }
}
