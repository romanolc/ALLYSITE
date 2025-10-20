// service-worker.js STUB
const CACHE_NAME = 'ally-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'styles.css',
    'app.js',
    'dashboard.html',
    // ... incluir outros assets essenciais
];

self.addEventListener('install', event => {
  console.log('Service Worker: Instalação');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Estratégia Cache-First para a demonstração
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna recurso do cache se existir
        if (response) {
          return response;
        }
        // Se não, busca na rede
        return fetch(event.request);
      }
    )
  );
});

// Acessibilidade Offline para o Dashboard (apenas visual, como solicitado)
// O JS fará a simulação dos dados.
