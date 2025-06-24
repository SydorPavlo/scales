const [leftPlate, rightPlate] = document.getElementsByClassName('plate')

window.onmousedown = e => {
  if (!e.target.matches('.weight')) return

  let weight, oldWeight

  if (e.target.matches('#table>*')) {
    oldWeight = e.target
    weight = oldWeight.cloneNode(true)
  } else {
    weight = e.target
  }

  window.onmousemove = e => {
    const x = Math.min(e.x, innerWidth - 25)
    const y = Math.min(e.y, innerHeight - 70)
    document.body.append(weight)
    updateScales()

    weight.style = `
      pointer-events: none;
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      translate: -50%; 
    `
    oldWeight?.setAttribute('style', `
      pointer-events: none;
      visibility: hidden; 
    `)
  }

  window.onmouseup = e => {
    window.onmousemove = null
    window.onmouseup = null

    const plate = e.target.closest('.plate')

    if (plate) {
      plate.append(weight)
      updateScales()
    } else if (oldWeight) {
      weight.remove()
      oldWeight.removeAttribute('style')
    } else {
      const selector = `#table>.${weight.className.slice(7)}[style]`
      oldWeight = document.querySelector(selector)
      oldWeight.replaceWith(weight)
    }
    weight.removeAttribute('style')
  }
}

function updateScales() {
  const leftSum = calcSum(...leftPlate.children)
  const rightSum = calcSum(...rightPlate.children)

  const result = leftSum > rightSum ? 'more' :
    leftSum < rightSum ? 'less' : ''
  
  rod.className = result
}

function calcSum(...weights) {
  let sum = 0 
  
  for (const weight of weights) {
    sum += Number(weight.innerText)
  }
  return sum
}
