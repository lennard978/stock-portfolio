export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/stock-portfolio/service-worker.js')
      .then(() => console.log('SW registered!'))
      .catch(err => console.error('SW registration failed:', err));
  }
}


export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()))
  }
}

