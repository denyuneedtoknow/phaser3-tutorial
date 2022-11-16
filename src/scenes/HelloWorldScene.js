import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
    constructor() {
        super('hello-world')
    }
    preload() {

        this.load.image('sky', 'assets/sky.png')

    }

    create() {

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.sky=this.add.image(400, 300, 'sky')
                console.log(this.sky);
        this.add.text( this.sky.x/2, this.sky.y/2,'Press SPACEBAR to play', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })

    }
    update() {
        if (this.spaceKey.isDown) {
            this.scene.start('gameScene')
        }
    }
}
