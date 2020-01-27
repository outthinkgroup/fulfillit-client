export default () => {
  let shouldRender = false
  if (typeof window !== "undefined") {
    shouldRender = true
  }
  return shouldRender
}
