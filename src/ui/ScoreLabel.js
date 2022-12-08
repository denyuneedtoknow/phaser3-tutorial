import Phaser from "phaser";
const formatScore = (score) => {
    return `Score: ${score}`
}
export default class ScoreLabel extends Phaser.GameObjects.Text {
    constructor(scene, x, y, score, style) {
        super(scene, x, y, formatScore(score), style)
        this.score = score
    }
    setScore(score) {
        this.score = score
        this.updateScoretext()
        this.data = this.scene.game.scene.keys['gameScene'].sky.data
        this.data.set('points', score)

    }
    add(points) {
        this.setScore(this.score + points)
    }
    updateScoretext() {
        this.setText(formatScore(this.score))
    }
}