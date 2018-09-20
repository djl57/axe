import {
  getStyleName,
  getCssName
} from '@axe/utils/lib/style'

export const transform = getStyleName('transform')
export const transition = getStyleName('transition')
export const cssTransform = getCssName('transform')

export function isElement (node) {
  if (window.HTMLElement) {
    return node instanceof window.HTMLElement
  }

  return node && node.nodeType === 1 && (typeof node.nodeName === 'string')
}
