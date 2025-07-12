// Simulated Recommendation API
export function recommendationAPI(query) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 4) + 1)
    }, 500)
  })
}
