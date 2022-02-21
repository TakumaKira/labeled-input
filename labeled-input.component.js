const template = document.createElement('template')
const elements = `
  <div id="labeled-input-wrapper">
    <input id="labeled-input" name="input" placeholder=" " autocapitalize="none" />
    <label id="labeled-input-label" for="input"></label>
  </div>
`
const styles = `
  <style>
    :host {
      font-family: var(--font-family);
      font-weight: var(--font-weight);
    }
    #labeled-input-wrapper {
      position: relative;
      width: 100%;
      padding-top: var(--padding-top);
      display: flex;
      align-items: center;
      background-color: var(--background-color);
    }
    #labeled-input-wrapper::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: var(--underline-color);
      height: var(--underline-height);
      transition: height 0.3s;
    }
    #labeled-input-wrapper.focus::after, #labeled-input-wrapper.has-value::after {
      height: var(--underline-height-focused);
    }
    #labeled-input {
      display: block;
      width: 95%;
      border: none;
      outline: none;
      background-color: transparent;
      font-family: var(--font-family);
      font-size: var(--font-size);
      padding: 5px 10px;
      color: var(--input-color);
    }
    #labeled-input:-webkit-autofill,
    #labeled-input:-webkit-autofill:hover,
    #labeled-input:-webkit-autofill:focus,
    #labeled-input:-webkit-autofill:active{
      -webkit-text-fill-color: var(--input-color);
      -webkit-box-shadow: 0 0 0px 1000px rgba(0,0,0,0) inset;
      transition: background-color 5000s ease-in-out 0s;
    }
    #labeled-input-label {
      position: absolute;
      margin-left: 10px;
      transform-origin: center left;
      transition: all 0.3s;
      color: var(--label-color);
      font-size: var(--label-font-size);
      pointer-events: none;
    }
    #labeled-input:focus + #labeled-input-label,
    #labeled-input:not(:placeholder-shown) + #labeled-input-label {
      transform: translateY(-110%) scale(0.8);
    }
  </style>
`
template.innerHTML = `
  ${elements}
  ${styles}
`

export class LabeledInput extends HTMLElement {
  constructor() {
    super()
    this.attach()
    this.getElements()
    this.initializeParams()
  }
  connectedCallback() {
    this.setEventListeners()
    this.render()
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) {
      return
    }
    this.updateParams(name, newVal)
    this.render()
  }

  attach() {
    this.root = this.attachShadow({mode: 'closed'})
    this.root.appendChild(template.content.cloneNode(true))
  }
  getElements() {
    this.rootElem = this.root.host
    this.wrapperElem = this.root.querySelector('#labeled-input-wrapper')
    this.inputElem = this.root.querySelector('#labeled-input')
    this.labelElem = this.root.querySelector('#labeled-input-label')
  }
  get value() {
    return this.inputElem.value
  }
  set value(v) {
    this.inputElem.value = v
  }
  setEventListeners() {
    // input change events
    this.inputElem.oninput = e => {
      // Add has-value class when having a value
      const hasValue = this.inputElem.value !== ''
      if (hasValue) {
        this.wrapperElem.classList.add('has-value')
      } else {
        this.wrapperElem.classList.remove('has-value')
      }

      // Dispatch event on input
      this.inputElem.dispatchEvent(new CustomEvent('oninput', {
        detail: {
          value: this.inputElem.value,
        },
        composed: true
      }))
    }

    // Add focus class when focused
    this.inputElem.onfocus = e => {
      this.wrapperElem.classList.add('focus')
    }
    this.inputElem.onblur = e => {
      this.wrapperElem.classList.remove('focus')
    }
  }

  static get observedAttributes() {
    return [
      // Fonts
      'font-family',
      'font-weight',
      'font-size',
      'label-font-size',

      // Texts
      'label',
      'value',

      // Type
      'type',

      // Colors
      'background-color',
      'input-color',
      'underline-color',
      'label-color',

      // Size
      'underline-height',
      'underline-height-focused',
    ]
  }
  initializeParams() {
    // Fonts
    if (!this.fontFamily) {
      this.fontFamily = 'sans-serif'
    }
    if (!this.fontWeight) {
      this.fontWeight = 400
    }
    if (!this.fontSize) {
      this.fontSize = '1.2rem'
    }
    if (!this.labelFontSize) {
      this.labelFontSize = '1rem'
    }

    // Texts
    if (!this.label) {
      this.label = 'Label'
    }

    // Type
    if (!this.type) {
      this.type = 'text'
    }

    // Colors
    if (!this.backgroundColor) {
      this.backgroundColor = 'transparent'
    }
    if (!this.labelColor) {
      this.labelColor = 'rgba(0, 0, 0, 0.5)'
    }
    if (!this.inputColor) {
      this.inputColor = '#000000'
    }
    if (!this.underlineColor) {
      this.underlineColor = 'rgba(0, 0, 0, 0.75)'
    }

    // Size
    if (!this.underlineHeight) {
      this.underlineHeight = '1px'
    }
    if (!this.underlineHeightFocused) {
      this.underlineHeightFocused = '2px'
    }
  }
  updateParams(name, newVal) {
    switch(name) {
      // Fonts
      case 'font-family':
        this.fontFamily = newVal
        break
      case 'font-weight':
        this.fontWeight = newVal
        break
      case 'font-size':
        this.fontSize = newVal
        break
      case 'label-font-size':
        this.labelFontSize = newVal
        break

      // Texts
      case 'label':
        this.label = newVal
        break

      // Type
      case 'type':
        this.type = newVal
        break
      case 'value':
        this.value = newVal
        break

      // Colors
      case 'background-color':
        this.backgroundColor = newVal
        break
      case 'label-color':
        this.labelColor = newVal
        break
      case 'input-color':
        this.inputColor = newVal
        break
      case 'underline-color':
        this.underlineColor = newVal
        break

      // Size
      case 'underline-height':
        this.underlineHeight = newVal
        break
      case 'underline-height-focused':
        this.underlineHeightFocused = newVal
        break
    }
  }
  render() {
    // Fonts
    this.rootElem.style.setProperty('--font-family', this.fontFamily)
    this.rootElem.style.setProperty('--font-weight', this.fontWeight)
    this.rootElem.style.setProperty('--font-size', this.fontSize)
    this.rootElem.style.setProperty('--label-font-size', this.labelFontSize)
    if (this.labelFontSize.indexOf('px') !== -1) {
      this.rootElem.style.setProperty('--padding-top', `${Number(this.labelFontSize.replace('px', '')) * 1}px`)
    } else if (this.labelFontSize.indexOf('rem') !== -1) {
      const baseFontSize = Number(getComputedStyle(document.body).fontSize.replace('px', '')) // This line makes render slower
      this.rootElem.style.setProperty('--padding-top', `${Number(this.labelFontSize.replace('rem', '')) * 1.2 * baseFontSize}px`)
    }

    // Texts
    this.labelElem.textContent = this.label

    // Type
    this.inputElem.setAttribute('type', this.type)

    // Colors
    this.rootElem.style.setProperty('--background-color', this.backgroundColor)
    this.rootElem.style.setProperty('--label-color', this.labelColor)
    this.rootElem.style.setProperty('--input-color', this.inputColor)
    this.rootElem.style.setProperty('--underline-color', this.underlineColor)

    // Size
    this.rootElem.style.setProperty('--underline-height', this.underlineHeight)
    this.rootElem.style.setProperty('--underline-height-focused', this.underlineHeightFocused)
  }
}

window.customElements.define('labeled-input', LabeledInput)
