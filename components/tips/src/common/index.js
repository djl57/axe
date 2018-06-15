import mcss from './style.module.css'

class Tips {
  constructor (parentNode) {
    this.parentNode = parentNode || document.body
    this.els = {
      tips: document.createElement('div'),
      content: document.createElement('p')
    }
    this.timer = null

    this._initClassName()
    this._initRender()
  }

  _initClassName () {
    const els = this.els

    els.tips.className = mcss.tips
    els.content.className = mcss.content
  }

  _initRender () {
    const els = this.els

    els.tips.appendChild(els.content)

    els.tips.style.display = 'none'

    this.parentNode.appendChild(els.tips)
  }

  show (options, callback) {
    const els = this.els

    clearTimeout(this.timer)

    if (options.zIndex) {
      els.tips.style.zIndex = options.zIndex
    }

    els.content.textContent = options.content || ''

    this.timer = setTimeout(() => {
      this.hide()
      callback && callback()
    }, options.duration || 1500)

    // show
    els.tips.style.display = ''
  }

  hide () {
    this.els.tips.style.display = 'none'
  }
}

export default new Tips()
