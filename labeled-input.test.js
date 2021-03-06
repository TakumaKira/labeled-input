import './labeled-input.component.js'
import { TestUtils } from './test-utils.js'

describe('LabeledInput Component', () => {
  it('displays default style label without passing any attribute', async () => {
    const defaultFontFamily = 'sans-serif'
    const {root} = await TestUtils.render('labeled-input')
    expect(getComputedStyle(root.host).fontFamily).toBe(defaultFontFamily)
    const baseFontSize = Number(getComputedStyle(document.body).fontSize.replace('px', ''))
    const inputElem = root.querySelector('input')
    expect(getComputedStyle(inputElem).fontFamily).toBe(defaultFontFamily)
    expect(getComputedStyle(inputElem).fontSize).toBe(`${baseFontSize * 1.2}px`)
    const labelElem = root.querySelector('label')
    expect(getComputedStyle(labelElem).fontFamily).toBe(defaultFontFamily)
    expect(getComputedStyle(labelElem).fontSize).toBe(`${baseFontSize}px`)
    const hasLabelText = root.innerHTML.includes('Label')
    expect(hasLabelText).toBeTruthy()
    expect(inputElem.type).toBe('text')
    const wrapperElem = root.querySelector('div')
    expect(getComputedStyle(wrapperElem).backgroundColor).toBe('rgba(0, 0, 0, 0)')
    expect(getComputedStyle(inputElem).color).toBe('rgb(0, 0, 0)')
    expect(getComputedStyle(wrapperElem, ':after').backgroundColor).toBe('rgba(0, 0, 0, 0.75)')
    expect(getComputedStyle(labelElem).color).toBe('rgba(0, 0, 0, 0.5)')
    expect(getComputedStyle(wrapperElem, ':after').height).toBe('1px')
    expect(getComputedStyle(labelElem).transform).toBe('none')
    inputElem.focus()
    await new Promise(resolve => setTimeout(resolve, 500))
    expect(getComputedStyle(wrapperElem, ':after').height).toBe('2px')
    const expectedY1 = -1 * (Number(getComputedStyle(inputElem).height.replace('px', '')) / 2 + Number(getComputedStyle(labelElem).height.replace('px', '')) * 0.8 / 2 + Number(getComputedStyle(inputElem).height.replace('px', '')) / 1.2 * 0.25)
    const resultTransform1 = getComputedStyle(labelElem).transform
    const substr1 = resultTransform1.split('matrix(0.8, 0, 0, 0.8, 0, ')[1]
    const resultY1 = Number(substr1.substring(0, substr1.length - 1))
    expect(Math.abs(resultY1 - expectedY1)).toBeLessThanOrEqual(2)
    inputElem.value = 'a'
    inputElem.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}))
    inputElem.blur()
    await new Promise(resolve => setTimeout(resolve, 500))
    expect(getComputedStyle(wrapperElem, ':after').height).toBe('2px')
    const expectedY2 = -1 * (Number(getComputedStyle(inputElem).height.replace('px', '')) / 2 + Number(getComputedStyle(labelElem).height.replace('px', '')) * 0.8 / 2 + Number(getComputedStyle(inputElem).height.replace('px', '')) / 1.2 * 0.25)
    const resultTransform2 = getComputedStyle(labelElem).transform
    const substr2 = resultTransform2.split('matrix(0.8, 0, 0, 0.8, 0, ')[1]
    const resultY2 = Number(substr2.substring(0, substr2.length - 1))
    expect(Math.abs(resultY2 - expectedY2)).toBeLessThanOrEqual(2)
    inputElem.value = ''
    inputElem.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}))
    await new Promise(resolve => setTimeout(resolve, 500))
    expect(getComputedStyle(wrapperElem, ':after').height).toBe('1px')
    expect(getComputedStyle(labelElem).transform).toBe('none')
  })

  it('displays styled label with full attributes', async () => {
    const fontFamily = 'serif'
    const fontWeight = 100
    const fontSize = '30px'
    const labelFontSize = '20px'
    const label = 'test'
    const type = 'password'
    const backgroundColor = 'rgba(1, 1, 1, 0.1)'
    const inputColor = 'rgba(2, 2, 2, 0.2)'
    const underlineColor = 'rgba(3, 3, 3, 0.3)'
    const labelColor = 'rgba(4, 4, 4, 0.4)'
    const underlineHeight = '2px'
    const underlineHeightFocused = '4px'
    const attributes = {
      'font-family': fontFamily,
      'font-weight': fontWeight,
      'font-size': fontSize,
      'label-font-size': labelFontSize,
      label,
      type,
      'background-color': backgroundColor,
      'input-color': inputColor,
      'underline-color': underlineColor,
      'label-color': labelColor,
      'underline-height': underlineHeight,
      'underline-height-focused': underlineHeightFocused,
    }
    const {root} = await TestUtils.render('labeled-input', attributes)
    expect(getComputedStyle(root.host).fontFamily).toBe(fontFamily)
    const inputElem = root.querySelector('input')
    expect(getComputedStyle(inputElem).fontFamily).toBe(fontFamily)
    expect(getComputedStyle(inputElem).fontSize).toBe(fontSize)
    const labelElem = root.querySelector('label')
    expect(getComputedStyle(labelElem).fontFamily).toBe(fontFamily)
    expect(getComputedStyle(labelElem).fontSize).toBe(labelFontSize)
    const hasLabelText = root.innerHTML.includes(label)
    expect(hasLabelText).toBeTruthy()
    expect(inputElem.type).toBe(type)
    const wrapperElem = root.querySelector('div')
    expect(getComputedStyle(wrapperElem).backgroundColor).toBe(backgroundColor)
    expect(getComputedStyle(inputElem).color).toBe(inputColor)
    expect(getComputedStyle(wrapperElem, ':after').backgroundColor).toBe(underlineColor)
    expect(getComputedStyle(labelElem).color).toBe(labelColor)
    expect(getComputedStyle(wrapperElem, ':after').height).toBe(underlineHeight)
    expect(getComputedStyle(labelElem).transform).toBe('none')
    inputElem.focus()
    await new Promise(resolve => setTimeout(resolve, 500))
    expect(getComputedStyle(wrapperElem, ':after').height).toBe(underlineHeightFocused)
    const expectedY1 = -1 * (Number(getComputedStyle(inputElem).height.replace('px', '')) / 2 + Number(getComputedStyle(labelElem).height.replace('px', '')) * 0.8 / 2 + Number(getComputedStyle(inputElem).height.replace('px', '')) / 1.2 * 0.25)
    const resultTransform1 = getComputedStyle(labelElem).transform
    const substr1 = resultTransform1.split('matrix(0.8, 0, 0, 0.8, 0, ')[1]
    const resultY1 = Number(substr1.substring(0, substr1.length - 1))
    expect(Math.abs(resultY1 - expectedY1)).toBeLessThanOrEqual(2)
    inputElem.value = 'a'
    inputElem.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}))
    inputElem.blur()
    await new Promise(resolve => setTimeout(resolve, 500))
    expect(getComputedStyle(wrapperElem, ':after').height).toBe(underlineHeightFocused)
    const expectedY2 = - 1 * (Number(getComputedStyle(inputElem).height.replace('px', '')) / 2 + Number(getComputedStyle(labelElem).height.replace('px', '')) * 0.8 / 2 + Number(getComputedStyle(inputElem).height.replace('px', '')) / 1.2 * 0.25)
    const resultTransform2 = getComputedStyle(labelElem).transform
    const substr2 = resultTransform2.split('matrix(0.8, 0, 0, 0.8, 0, ')[1]
    const resultY2 = Number(substr2.substring(0, substr2.length - 1))
    expect(Math.abs(resultY2 - expectedY2)).toBeLessThanOrEqual(2)
    inputElem.value = ''
    inputElem.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}))
    await new Promise(resolve => setTimeout(resolve, 500))
    expect(getComputedStyle(wrapperElem, ':after').height).toBe(underlineHeight)
    expect(getComputedStyle(labelElem).transform).toBe('none')
  })

  it('dispatches input event and provide value', async () => {
    const {root} = await TestUtils.render('labeled-input')
    const labeledInput = root.host
    expect(labeledInput.value).toBe('')
    const eventSpy = jasmine.createSpy()
    labeledInput.addEventListener('oninput', eventSpy)
    const value = 'a'
    labeledInput.value = value
    const inputElem = root.querySelector('input')
    inputElem.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}))
    const event = new CustomEvent('oninput', {detail: {value}, composed: true})
    expect(eventSpy).toHaveBeenCalledWith(event)
    expect(labeledInput.value).toBe(value)
  })
})