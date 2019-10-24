import Music from './runtime/music'
export default class Game {
  constructor() {
    this.draw = canvas.getContext('2d')
    this.R = {
      "bg_day": "img/bg_day.png",
      "bg_night": "img/bg_night.png",
      "bird0_0": "img/bird0_0.png",
      "bird0_1": "img/bird0_1.png",
      "bird0_2": "img/bird0_2.png",
      "bird1_0": "img/bird1_0.png",
      "bird1_1": "img/bird1_1.png",
      "bird1_2": "img/bird1_2.png",
      "bird2_0": "img/bird2_0.png",
      "bird2_1": "img/bird2_1.png",
      "bird2_2": "img/bird2_2.png",
      "black": "img/black.png",
      "blink_00": "img/blink_00.png",
      "blink_01": "img/blink_01.png",
      "blink_02": "img/blink_02.png",
      "brand_copyright": "img/brand_copyright.png",
      "button_menu": "img/button_menu.png",
      "button_ok": "img/button_ok.png",
      "button_pause": "img/button_pause.png",
      "button_play": "img/button_play.png",
      "button_rate": "img/button_rate.png",
      "button_resume": "img/button_resume.png",
      "button_score": "img/button_score.png",
      "button_share": "img/button_share.png",
      "font_048": "img/font_048.png",
      "font_049": "img/font_049.png",
      "font_050": "img/font_050.png",
      "font_051": "img/font_051.png",
      "font_052": "img/font_052.png",
      "font_053": "img/font_053.png",
      "font_054": "img/font_054.png",
      "font_055": "img/font_055.png",
      "font_056": "img/font_056.png",
      "font_057": "img/font_057.png",
      "land": "img/land.png",
      "medals_0": "img/medals_0.png",
      "medals_1": "img/medals_1.png",
      "medals_2": "img/medals_2.png",
      "medals_3": "img/medals_3.png",
      "new": "img/new.png",
      "number_context_00": "img/number_context_00.png",
      "number_context_01": "img/number_context_01.png",
      "number_context_02": "img/number_context_02.png",
      "number_context_03": "img/number_context_03.png",
      "number_context_04": "img/number_context_04.png",
      "number_context_05": "img/number_context_05.png",
      "number_context_06": "img/number_context_06.png",
      "number_context_07": "img/number_context_07.png",
      "number_context_08": "img/number_context_08.png",
      "number_context_09": "img/number_context_09.png",
      "number_context_10": "img/number_context_10.png",
      "number_score_00": "img/number_score_00.png",
      "number_score_01": "img/number_score_01.png",
      "number_score_02": "img/number_score_02.png",
      "number_score_03": "img/number_score_03.png",
      "number_score_04": "img/number_score_04.png",
      "number_score_05": "img/number_score_05.png",
      "number_score_06": "img/number_score_06.png",
      "number_score_07": "img/number_score_07.png",
      "number_score_08": "img/number_score_08.png",
      "number_score_09": "img/number_score_09.png",
      "pipe_down": "img/pipe_down.png",
      "pipe_up": "img/pipe_up.png",
      "pipe2_down": "img/pipe2_down.png",
      "pipe2_up": "img/pipe2_up.png",
      "score_panel": "img/score_panel.png",
      "text_game_over": "img/text_game_over.png",
      "text_ready": "img/text_ready.png",
      "title": "img/title.png",
      "tutorial": "img/tutorial.png",
      "white": "img/white.png",
      "baozha": "img/baozha.png"
    }
    this.scene = 0 // 场景编号
    this.score = 0  // 分数
    if (!wx.getStorageSync("score")) {
      wx.setStorageSync("score", "[]")
    }
    this.progress()
    this.music = new Music()
  }
  progress() { //加载资源
    let count = 0 // 统计加载完成的图片
    let total = Object.keys(this.R).length  // 所有图片的个数
    // 遍历对象
    for (let key in this.R) {
      // 只要图片onload触发了,就证明图片加载成功了
      // 自己创建一个img
      ((src) => {
        this.R[key] = new wx.createImage()
        this.R[key].src = src
        this.R[key].onload = () => {
          count++
          if (count == total) {
            this.start()
          }
        }
      })(this.R[key])
    }
  }
  clear() {  // 清屏
    this.draw.clearRect(0, 0, canvas.width, canvas.height)
  }
  start() {
    this.f = 0
    // 场景管理器实例
    this.sM = new SceneManager()
    this.sM.enter(0)
    this.timer = setInterval(function () {
      this.clear()
      this.sM.updataAndRender()
      this.f++
    }.bind(this), 20)
  }
}

let game = new Game()

class Background {
  constructor() {
    this.x = 0
    this.w = 288
    this.h = 512
    this.step = 1
  }
  updata() {
    this.x -= this.step
    if (this.x <= -this.w) {
      this.x = 0
    }
  }
  render() {
    // drawImage(图片,sx,sy,sw,sh,x,y,w,h)  // sy,sx 切片的位置  sw,sh切片的宽
    game.draw.drawImage(game.R["bg_day"], this.x, canvas.height - this.h)
    game.draw.drawImage(game.R["bg_day"], this.x + this.w, canvas.height - this.h)
    game.draw.drawImage(game.R["bg_day"], this.x + this.w * 2, canvas.height - this.h)
    // 将上方空白补上
    game.draw.fillStyle = "#4ec0ca"
    game.draw.fillRect(0, 0, canvas.width, canvas.height - this.h)
  }
}

// 背景底部背景
class Land {
  constructor() {
    this.x = 0
    this.w = 336
    this.h = 112
    this.step = 1
  }
  updata() {
    this.x -= this.step
    if (this.x <= -this.w) {
      this.x = 0
    }
  }
  render() {
    game.draw.drawImage(game.R["land"], this.x, canvas.height - this.h)
    game.draw.drawImage(game.R["land"], this.x + this.w, canvas.height - this.h)
    game.draw.drawImage(game.R["land"], this.x + this.w * 2, canvas.height - this.h)
  }
}

// 上下水管设置函数
class Pipe {
  constructor() {
    // 上管子随机值320-100随机高
    this.t1 = Math.round(Math.random() * 220 + 100)
    // 空隙
    this.space = 140
    // 下管子高度
    this.b1 = canvas.height - 112 - this.t1 - this.space
    this.x = canvas.width
    this.done = true
    game.pipeArr.push(this)
  }
  updata() {
    this.x -= 1
    // 一旦管子走出界面就从数组移除
    if (this.x <= -52) {
      game.pipeArr.shift()
    }

    this.x1 = this.x
    this.x2 = this.x + 52
    this.y1 = this.t1
    this.y2 = this.t1 + this.space

    // 碰撞判断
    if ((game.bird.x2 > this.x1 && game.bird.y1 < this.y1 && game.bird.x1 < this.x2) || (game.bird.x2 > this.x1 && game.bird.y2 > this.y2 && game.bird.x1 < this.x2)) {
      game.sM.enter(3)
    }

    // 分数判断
    if (game.bird.x1 > this.x2 && this.done) {
      game.score++
      game.music.playShoot()
      this.done = false
    }

  }
  render() {
    game.draw.drawImage(game.R["pipe_down"], 0, 320 - this.t1, 52, this.t1, this.x, 0, 52, this.t1)
    game.draw.drawImage(game.R["pipe_up"], 0, 0, 52, this.b1, this.x, this.t1 + this.space, 52, this.b1)
  }
}

// 小飞机函数
class Bird {
  constructor() {
    this.x = canvas.width / 2
    this.y = canvas.height * (1 - 0.618)
    this.changeY = 0
    this.rotate = 0
    this.img = [game.R["bird0_0"], game.R["bird0_1"], game.R["bird0_2"]]
    this.status = 'drop'
    this.cb = 0
  }
  updata() {
    if (this.status == 'drop') {
      this.changeY += 0.4
      this.y += this.changeY
      this.rotate += 0.02
    } else if (this.status == 'up') {
      this.changeY -= 0.4
      if (this.changeY <= 0) {
        this.status = 'drop'
        return
      }
      this.y -= this.changeY
      this.y <= 0 ? this.y = 0 : null
      // 切换图片翅膀状态
      this.cb++
      this.cb > 2 ? this.cb = 0 : null
    }
    this.x1 = this.x - 17
    this.x2 = this.x + 17
    this.y1 = this.y - 12
    this.y2 = this.y + 12
    // 落地检测
    if (this.y >= canvas.height - 120) {
      game.sM.enter(3)
    }

  }
  render() {
    game.draw.save()
    game.draw.translate(this.x, this.y)
    game.draw.rotate(this.rotate)
    game.draw.drawImage(this.img[this.cb], -24, -24)
    game.draw.restore()
  }
  clickTop() {
    this.status = 'up'
    this.rotate = -0.5
    this.changeY = 7
  }
}

// 场景管理
class SceneManager {
  constructor() {
    this.bindEvent()
  }
  enter(number) {
    switch (number) {
      case 0:
        game.scene = 0
        this.titieY = 0
        this.buttonY = canvas.height
        this.birdY = 250
        this.birChangeY = 1.0
        break
      case 1:
        game.scene = 1
        this.tutorialAlpha = 0
        this.tutorialAlphaChange = 0.05
        break
      case 2:
        game.scene = 2
        game.score = 0
        game.bg = new Background()
        game.land = new Land()
        game.bird = new Bird()
        game.pipeArr = []
        break
      case 3:
        game.scene = 3
        this.bz = false // 是否爆炸
        game.music.playExplosion()
        break
      case 4:
        game.scene = 4
        this.gameoverY = 0
        this.score_panelY = canvas.height
        // 获取存储的成绩
        let arr = JSON.parse(wx.getStorageSync("score"))
        // 排序获取前三名
        arr.sort((a, b) => b - a)
        // 现在的成绩是game.score
        this.maxscore = arr[0]
        if (game.score > arr[0]) {
          this.model = "medals_1"
          this.maxscore = game.score
        } else if (game.score > arr[1]) {
          this.model = "medals_2"
        } else if (game.score > arr[2]) {
          this.model = "medals_3"
        } else {
          this.model = "medals_0"
        }
        // 将分数储存到数组,去重
        if (!arr.includes(game.score)) {
          arr.push(game.score)
        }
        // 存储到浏览器
        wx.setStorageSync("score", JSON.stringify(arr))
        break
    }
  }
  updataAndRender() {
    switch (game.scene) {
      case 0:
        game.draw.fillStyle = "#4ec0ca"
        game.draw.fillRect(0, 0, canvas.width, canvas.height)
        game.draw.drawImage(game.R["bg_day"], 0, canvas.height - 512)
        game.draw.drawImage(game.R["bg_day"], 288, canvas.height - 512)
        game.draw.drawImage(game.R["land"], 0, canvas.height - 112)
        game.draw.drawImage(game.R["land"], 336, canvas.height - 112)
        this.titieY += 5
        this.buttonY -= 9
        this.birdY += this.birChangeY
        this.titieY >= 160 ? this.titieY = 160 : null
        this.buttonY <= 380 ? this.buttonY = 380 : null
        if (this.birdY <= 250 || this.birdY >= 300) {
          this.birChangeY *= -1
        }
        game.draw.drawImage(game.R["title"], (canvas.width - 178) / 2, this.titieY)
        game.draw.drawImage(game.R["button_play"], (canvas.width - 116) / 2, this.buttonY)
        game.draw.drawImage(game.R["bird0_0"], (canvas.width - 48) / 2, this.birdY)

        break
      case 1:
        game.draw.fillStyle = "#4ec0ca"
        game.draw.fillRect(0, 0, canvas.width, canvas.height)
        game.draw.drawImage(game.R["bg_day"], 0, canvas.height - 512)
        game.draw.drawImage(game.R["bg_day"], 288, canvas.height - 512)
        game.draw.drawImage(game.R["land"], 0, canvas.height - 112)
        game.draw.drawImage(game.R["land"], 336, canvas.height - 112)
        game.draw.drawImage(game.R["bird0_0"], (canvas.width - 48) / 2, 150)
        if (this.tutorialAlpha > 1 || this.tutorialAlpha < 0) {
          this.tutorialAlphaChange *= -1
        }
        this.tutorialAlpha += this.tutorialAlphaChange
        game.draw.save()  // 状态保存
        game.draw.globalAlpha = this.tutorialAlpha // 透明度
        game.draw.drawImage(game.R["tutorial"], (canvas.width - 114) / 2, 250)
        game.draw.restore() // 状态恢复

        break
      case 2:
        game.bg.updata()
        game.bg.render()
        game.land.updata()
        game.land.render()
        game.f % 200 == 0 ? new Pipe() : null
        game.pipeArr.forEach((item, index) => {
          game.pipeArr[index].updata();
          game.pipeArr[index].render()
        });
        this.scoreRender()
        game.bird.updata()
        game.bird.render()
        break
      case 3:
        game.bg.render()
        game.land.render()
        game.bird.render()
        for (let i = 0; i < game.pipeArr.length; i++) {
          game.pipeArr[i].render()
        }
        this.scoreRender() // 分数函数
        if (this.bz) {

        } else {
          game.draw.drawImage(game.R["baozha"], game.bird.x1 - 10, game.bird.y1 - 20, 58, 65)
          this.enter(4)
        }

        break
      case 4:
        game.bg.render()
        game.land.render()
        this.gameoverY += 5
        if (this.gameoverY >= 180) { this.gameoverY = 180 }
        game.draw.drawImage(game.R["text_game_over"], (canvas.width - 204) / 2, this.gameoverY)
        this.score_panelY -= 10
        if (this.score_panelY <= 270) { this.score_panelY = 270 }
        game.draw.drawImage(game.R["score_panel"], (canvas.width - 238) / 2, this.score_panelY)
        game.draw.drawImage(game.R[this.model], (canvas.width - 238) / 2 + 32, this.score_panelY + 44)
        for (let i = 0; i < game.score.toString().length; i++) {
          game.draw.drawImage(game.R["number_score_0" + (parseInt(game.score.toString()[i]))], (canvas.width - 238) / 2 + 171 + i * 16, this.score_panelY + 36)
        }
        for (let j = 0; j < this.maxscore.toString().length; j++) {
          game.draw.drawImage(game.R["number_context_0" + (parseInt(this.maxscore.toString()[j]))], (canvas.width - 238) / 2 + 172 + j * 12, this.score_panelY + 80)
        }
        game.draw.drawImage(game.R["button_ok"], (canvas.width - 80) / 2, this.score_panelY + 150)
        break
    }
  }
  bindEvent() {
    // 只能给canvas绑定事件,页面上只有它一个元素,需要判断鼠标点的位置判断clientX和clientY
    // 不同场景下都可能有点击事件,需要先判断场景
    wx.onTouchStart((e) => {
      switch (game.scene) {
        case 0:
          if (e.touches[0].clientY > this.buttonY && e.touches[0].clientY < this.buttonY + 70 && e.touches[0].clientX > canvas.width / 2 - 58 && e.touches[0].clientX < canvas.width / 2 + 58) {
            game.music.playbutton()
            this.enter(1)
          }
          break
        case 1:
          game.music.playbutton()
          this.enter(2)
          break
        case 2:
          game.bird.clickTop()
          game.music.playBgm()
          break
        case 3:

          break
        case 4:
          if (e.touches[0].clientY > 418 && e.touches[0].clientY < 448 && e.touches[0].clientX > canvas.width / 2 - 40 && e.touches[0].clientX < canvas.width / 2 + 40) {
            game.music.playbutton()
            this.enter(2)
          }
          break
      }
    })
  }
  scoreRender() {  // 渲染分数
    let scorestr = game.score.toString()
    let cenLine = canvas.width / 2 - scorestr.length * 30 / 2
    for (let i = 0; i < scorestr.length; i++) {
      game.draw.drawImage(game.R["font_0" + (parseInt(scorestr[i]) + 48)], cenLine + i * 30, 100)
    }
  }
}