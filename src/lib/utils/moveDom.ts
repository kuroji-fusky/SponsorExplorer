const moveDom = (node: any, inject: any) => {
  const target = document.querySelector(inject)
  target!.appendChild(node)
}

export default moveDom
