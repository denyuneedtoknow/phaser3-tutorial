import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
        this.gameOver = false
    }
    preload() {

    }
    create() {
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(200, 200, 'Game Over, Press SPACEBAR to restart', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
    }
    update() {
        if (this.spaceKey.isDown) {
            this.scene.start('hello-world')
        }
    }
}