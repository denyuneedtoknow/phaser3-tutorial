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
    }
    add(points) {
        this.setScore(this.score + points)
    }
    updateScoretext() {
        this.setText(formatScore(this.score))
    }
}