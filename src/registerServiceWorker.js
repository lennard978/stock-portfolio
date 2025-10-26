export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(reg => {
        console.log('SW registered', reg.scope)
      }).catch(err => console.warn('SW register failed', err))
    })
  }
}


export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()))
  }
}