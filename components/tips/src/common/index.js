import mcss from './style.module.css'

export class Tips {
  constructor (parentNode) {
    this.parentNode = parentNode || document.body
    this.els = {
      tips: document.createElement('div'),
      layer: document.createElement('div'),
      body: document.createElement('div')
    }

    this.queue = []

    this._initClassName()
    this._initRender()

    // 阻止弹窗底部内容滚动
    this.els.tips.addEventListener('touchmove', e => {
      let data = e.target.dataset || {}

      if (typeof data.scroll === 'undefined') {
        e.preventDefault()
      }
    }, {
      passive: false,
      capture: false
    })
  }

  _initClassName () {
    const els = this.els

    els.tips.className = mcss.tips
    els.layer.className = mcss.layer
    els.body.className = mcss.body
  }

  _initRender () {
    const els = this.els

    els.tips.appendChild(els.layer)
    els.tips.appendChild(els.body)

    els.tips.style.display = 'none'

    this.parentNode.appendChild(els.tips)
  }

  _open ({ options, resolve }) {
    const els = this.els

    if (options.zIndex) {
      els.tips.style.zIndex = options.zIndex
    }

    if (!options.contentHtml) {
      els.body.textContent = options.content || ''
    } else {
      els.body.innerHTML = options.contentHtml
    }

    // show
    els.tips.style.display = ''

    setTimeout(() => {
      resolve()
      this.hide()
    }, options.duration || 1500)
  }

  show (options, b) {
    if (typeof options === 'string') {
      options = {
        content: options,
        duration: (typeof b === 'number') && b
      }
    }

    return new Promise(resolve => {
      let item = { options, resolve }

      if (options.immediate !== false || this.els.tips.style.display === 'none') {
        this._open(item)
      } else {
        this.queue.push(item)
      }
    })
  }

  hide () {
    if (this.queue.length === 0) {
      this.els.tips.style.display = 'none'
    } else {
      this._open(this.queue.shift())
    }
  }

  hideAll () {
    this.queue = []
    this.els.tips.style.display = 'none'
  }
}

export default new Tips()
