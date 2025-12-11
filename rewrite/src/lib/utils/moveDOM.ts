export const moveDom = (node: Element, inject: string) => {
  const target = document.querySelector(inject)!
  target.appendChild(node)
}
