import mcss from './style.module.css'

class Modal {
  constructor (parentNode) {
    this.parentNode = parentNode || document.body
    this.els = {
      modal: document.createElement('div'),
      layer: document.createElement('div'),
      body: document.createElement('div'),
      title: document.createElement('h3'),
      content: document.createElement('p'),
      btnWrap: document.createElement('div'),
      confirm: document.createElement('button'),
      cancel: document.createElement('button')
    }

    this._initClassName()
    this._initEventListener()
    this._initRender()
  }

  _initClassName () {
    const els = this.els

    els.modal.className = mcss.modal
    els.layer.className = mcss.layer
    els.body.className = mcss.body
    els.title.className = mcss.title
    els.content.className = mcss.content
    els.btnWrap.className = mcss.btnWrap
    els.confirm.className = [mcss.btn, mcss.confirm].join(' ')
    els.cancel.className = [mcss.btn, mcss.cancel].join(' ')
  }

  _initEventListener () {
    const els = this.els

    // 阻止弹窗底部内容滚动
    els.modal.addEventListener('touchmove', e => {
      e.preventDefault()
    }, false)

    els.layer.addEventListener('click', () => {
      this.hide()
      this.callback && this.callback('close')
    }, false)

    els.cancel.addEventListener('click', () => {
      this.hide()
      this.callback && this.callback('cancel')
    }, false)

    els.confirm.addEventListener('click', () => {
      this.hide()
      this.callback && this.callback('confirm')
    }, false)
  }

  _initRender () {
    const els = this.els

    els.btnWrap.appendChild(els.cancel)
    els.btnWrap.appendChild(els.confirm)
    els.body.appendChild(els.title)
    els.body.appendChild(els.content)
    els.body.appendChild(els.btnWrap)
    els.modal.appendChild(els.layer)
    els.modal.appendChild(els.body)

    els.modal.style.display = 'none'

    this.parentNode.appendChild(els.modal)
  }

  show (options, callback) {
    const els = this.els

    if (options.zIndex) {
      els.modal.style.zIndex = options.zIndex
    }

    if (options.title) {
      els.title.style.display = ''
      els.title.textContent = options.title
    } else {
      els.title.style.display = 'none'
    }

    els.content.textContent = options.content || ''

    els.confirm.style.color = options.confirmColor || ''
    els.confirm.textContent = options.confirmText || '确定'

    if (options.cancelText) {
      els.cancel.style.display = ''
      els.cancel.style.color = options.cancelColor || ''
      els.cancel.textContent = (typeof options.cancelText === 'string') ? options.cancelText : '取消'
    } else {
      els.cancel.style.display = 'none'
    }

    this.callback = callback

    // show
    els.modal.style.display = ''
  }

  hide () {
    this.els.modal.style.display = 'none'
  }
}

export default new Modal()
