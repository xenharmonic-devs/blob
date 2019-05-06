/* global Image */

const getImage = url =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => {
      resolve(img)
    })
    img.addEventListener('error', reject.bind(reject))
    img.src = url
  })

export { getImage }
