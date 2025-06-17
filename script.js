const leftPlate = document.getElementsByClassName('left')[0]


window.onmousedown = e => {
  if (!e.target.matches('.weight')) return

  const weight = e.target
  const newWeight = weight.cloneNode(true)

  window.onmousemove = e => {
    const x = Math.min(e.x, innerWidth - 25)
    const y = Math.min(e.y, innerHeight - 70)
    document.body.append(newWeight)
    newWeight.style = `
      pointer-events: none;
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      translate: -50%; 
    `

    weight.style = `
      pointer-events: none;
      visibility: hidden;
    `
  }

  window.onmouseup = e => {
    window.onmousemove = null
    window.onmouseup = null

    const plate = e.target.closest('.plate')

    if (plate) {
      plate.append(newWeight)
    } else {
      newWeight.remove()
      weight.removeAttribute('style')
    }
    newWeight.removeAttribute('style')
  }
}