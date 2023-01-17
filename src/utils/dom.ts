const createElement = (tagName: string, className: string): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName)
  element.className = className
  return element
}

const hasClass = (el: HTMLElement, className: string) => {
  const classList = Array.from(el.classList)
  return classList.includes(className)
}

const addClass = (el: HTMLElement, className: string) => {
  el.classList.add(className)
}

const removeClass = (el: HTMLElement, className: string) => {
  el.classList.remove(className)
}

const removeNodes = (parent: HTMLElement) => {
  // 当parent下还存在子节点时 循环继续
  while (parent.hasChildNodes()) {
    // @ts-ignore
    parent.removeChild(parent.firstChild)
  }
}

export default {
  createElement,
  addClass,
  hasClass,
  removeClass,
  removeNodes
}
