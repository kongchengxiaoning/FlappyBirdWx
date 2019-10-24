let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio.src = 'audio/sfx_wing.WAV'

    this.shootAudio     = new Audio()
    this.shootAudio.src = 'audio/sfx_point.WAV'

    this.boomAudio     = new Audio()
    this.boomAudio.src = 'audio/sfx_hit.WAV'

    this.buttonAudio = new Audio()
    this.buttonAudio.src = 'audio/sfx_swooshing.WAV'
  }

  playBgm() {
    this.bgmAudio.play()
  }

  playShoot() {
    this.shootAudio.currentTime = 0
    this.shootAudio.play()
  }

  playExplosion() {
    this.boomAudio.currentTime = 0
    this.boomAudio.play()
  }
  playbutton(){
    this.buttonAudio.currentTime = 0
    this.buttonAudio.play()
  }
}
