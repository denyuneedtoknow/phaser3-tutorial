import Phaser from "phaser";
import ScoreLabel from "../ui/ScoreLabel";
import BombSpawner from "./BombSpawner";


const GROUND_KEY = 'ground'
const DUDE_KEY = 'dude'
const STAR_KEY = 'star'
const BOMB_KEY = 'bomb'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('gameScene')
        this.player = undefined
        this.cursors = undefined
        this.scoreLabel = undefined
        this.stars = undefined
        this.bombSpawner = undefined
        this.gameOver = false
    }

    preload() {
        this.load.image('sky', 'assets/sky.png')
        this.load.image(GROUND_KEY, 'assets/platform.png')
        this.load.image(STAR_KEY, 'assets/star.png')
        this.load.image(BOMB_KEY, 'assets/bomb.png')

        this.load.spritesheet(DUDE_KEY,
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        )

    }
    create() {
        this.sky = this.add.image(400, 300, 'sky')
        this.sky.setDataEnabled()
        this.sky.data.set('points', '')
        const platforms = this.createPlatforms()
        this.player = this.createPlayer()
        this.cursors = this.input.keyboard.createCursorKeys()
        this.stars = this.createStars()

        this.scoreLabel = this.createScorelabel(16, 16, 0)

        this.bombSpawner = new BombSpawner(this, BOMB_KEY)
        const bombsGroup = this.bombSpawner.group

        this.physics.add.collider(this.player, platforms)
        this.physics.add.collider(this.stars, platforms)
        this.physics.add.collider(bombsGroup, platforms)

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this)
    }
    createPlatforms() {
        this.scale.scaleMode

        const platforms = this.physics.add.staticGroup()
        platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()

        platforms.create(600, 400, GROUND_KEY)
        platforms.create(50, 250, GROUND_KEY)
        platforms.create(750, 220, GROUND_KEY)
        return platforms
    }
    createPlayer() {
        const player = this.physics.add.sprite(100, 450, DUDE_KEY)
        player.setBounce(0.2)
        player.setCollideWorldBounds(true)
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'turn',
            frames: [{ key: DUDE_KEY, frame: 4 }],
            frameRate: 20
        })
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        return player
    }
    createStars() {
        const stars = this.physics.add.group({
            key: STAR_KEY,
            repeat: 10,
            setXY: { x: 12, y: 0, stepX: 70, }
        })

        stars.children.iterate((c) => {
            const child = ( /**@type {Phaser.Physics.Arcade.Sprite} */(c))
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })

        return stars
    }
    update() {
        if (this.gameOver) {
            this.scene.start("GameOver");
            this.gameOver = false
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)

            this.player.anims.play('left', true)
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)

            this.player.anims.play('right', true)
        }
        else {
            this.player.setVelocityX(0)

            this.player.anims.play('turn')
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330)
        }
    }
    collectStar(player, star) {
        star.disableBody(true, true)
        this.scoreLabel.add(10)
        if (this.stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            this.stars.children.iterate((c) => {
                const child = ( /**@type {Phaser.Physics.Arcade.Sprite} */(c))
                child.enableBody(true, child.x, 0, true, true)
            })
        }
        this.bombSpawner.spawn(player.x)
    }

    createScorelabel(x, y, score) {
        const style = { fontSize: '32px', fill: '#000' }
        const label = new ScoreLabel(this, x, y, score, style)
        this.add.existing(label)
        console.log(this.game.scene.keys['gameScene'].sky.data.list);
        return label

    }
    hitBomb(player, bomb) {
        this.physics.pause()
        player.setTint(0xff0000)
        bomb.setTint(0xFF8000)
        player.anims.play('turn')
        this.gameOver = true
    }
}