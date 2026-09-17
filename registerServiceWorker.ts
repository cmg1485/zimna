export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          // Check for service worker updates periodically
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    console.log('Zman PWA: New content is available; please refresh.');
                  } else {
                    console.log('Zman PWA: Content is precached for offline use.');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.warn('Service Worker registration skipped or failed:', error);
        });
    });
  }
}
