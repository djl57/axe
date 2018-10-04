import mcss from './style.module.css'

export class Tips {
  constructor (parentNode) {
    this.parentNode = parentNode || document.body
    this.els = {
      tips: document.createElement('div'),
      body: document.createElement('div'),
      content: document.createElement('div')
    }

    this.queue = []

    this._initClassName()
    this._initRender()
  }

  _initClassName () {
    const els = this.els

    els.tips.className = mcss.tips
    els.body.className = mcss.body
    els.content.className = mcss.content
  }

  _initRender () {
    const els = this.els

    els.body.appendChild(els.content)
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
      els.content.textContent = options.content || ''
    } else {
      els.content.innerHTML = options.contentHtml
    }

    setTimeout(() => {
      resolve()
      this.hide()
    }, options.duration || 1500)

    // show
    els.tips.style.display = ''
  }

  show (options) {
    if (typeof options === 'string') {
      options = { content: options }
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
