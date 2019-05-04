const getRelativeCoordinates = e => {
  const rect = e.target.getBoundingClientRect()
  return {
    x: Math.floor(e.clientX - rect.left),
    y: Math.floor(e.clientY - rect.top)
  }
}

export { getRelativeCoordinates }
