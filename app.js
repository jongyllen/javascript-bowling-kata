export default class Game {
  constructor() {
    this._rolls = []
    this._currentRoll = 0
  }

  roll(pins) {
    this._rolls[this._currentRoll++] = pins
  }

  score() {
    let score = 0, frameIndex = 0

    for (let frame = 0; frame < 10; frame++) {
      if (isStrike.call(this, frameIndex)) { // strike
        score += 10 + strikeBonus.call(this, frameIndex)
        frameIndex++
      } else if (isSpare.call(this, frameIndex)) {
        score += 10 + spareBonus.call(this, frameIndex)
        frameIndex += 2
      } else {
        score += sumOfBallsInFrame.call(this, frameIndex)
        frameIndex += 2
      }
    }

    return score
  }
}

function sumOfBallsInFrame(frameIndex) {
  return this._rolls[frameIndex] + this._rolls[frameIndex+1];
}

function spareBonus(frameIndex) {
  return this._rolls[frameIndex + 2];
}

function strikeBonus(frameIndex) {
  return this._rolls[frameIndex+1] + this._rolls[frameIndex+2];
}

function isStrike(frameIndex) {
  return this._rolls[frameIndex] == 10
}

function isSpare(frameIndex) {
  return this._rolls[frameIndex] + this._rolls[frameIndex+1] == 10
}