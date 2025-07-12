// Simulated Dashboard API
export function dashboardAPI(query) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 4) + 1)
    }, 500)
  })
}
