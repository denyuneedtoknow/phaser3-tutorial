import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
        this.gameOver = false
    }
    preload() {

    }
    create() {
        this.add.text(200, 200, 'Game Over', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        this.input.on('pointerup', () => {
            this.scene.start('hello-world')
        });
    }
    update() { }
}