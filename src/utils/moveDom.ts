const moveDom = <NT extends Element, NI extends Element | Document>(
  node: NT,
  inject: NI
) => {
  const target = document.querySelector(inject)
  target!.appendChild(node)
}

export default moveDom
