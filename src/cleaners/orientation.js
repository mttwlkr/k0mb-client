export const generateOrientation = (d) => {
  if (d.width > 0 && d.height > 0) {
    if (d.width > d.height) {
      return "horizontal"
    }
    if (d.width < d.height) {
      return "vertical"
    }
    return "square"
  }
  return "blank"
}