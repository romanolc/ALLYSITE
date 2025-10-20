//
// app.js - Lógica e Simulação Interativa para o Projeto ALLY
//

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------
    // 1. GESTÃO DE ASSETS (Simulação de Otimização e Fallback)
    // ----------------------------------------------------------------

    // Mapeamento simulado dos assets com base nos uploads
    const ASSET_MAP = {
        'ally-logo-app': { originalName: '50312fb1-41b6-4ce5-9fe2-9b39bfeeb67b.webp', type: 'logo-login' },
        'device-options': { originalName: '22d4ce72-d3c8-4081-90da-cd69cb665869.webp', type: 'device-gallery' },
        'user-profile-pedro': { originalName: '361e08cc-2711-4002-93dc-d87febabe791.webp', type: 'user-photo' },
        'map-safe-risk': { originalName: '4eeea4f4-3047-4bf1-8fb7-dbdf7f965f82.webp', type: 'map-screenshot' },
        'sos-alert-screen': { originalName: '46539259-3dd3-4931-aa51-41ae16d51140.webp', type: 'sos-screen' },
        'poi-management': { originalName: '1ab80dbe-7893-489a-a097-215adfac4af4.webp', type: 'map-poi' },
        'settings-screen': { originalName: '48b306bd-9bbd-4833-8b26-2eaabaff812d.webp', type: 'settings' }
    };

    /**
     * Função para simular a incorporação de imagens com otimização.
     * Na prática, esta função criaria as tags <picture> e srcset.
     * Aqui, ela garante a acessibilidade e o fallback/placeholder.
     */
    function incorporateAssets() {
        document.querySelectorAll('[data-asset-target]').forEach((el, index) => {
            const assetId = el.getAttribute('data-asset-target');
            const assetData = ASSET_MAP[assetId];
            
            // Simulação de caminho otimizado
            const optimizedPath = `assets/images/${assetId}-1024.webp`;
            
            if (assetData) {
                // Simulação de criação do elemento <picture>
                const img = document.createElement('img');
                
                // ** HOOK: Aqui entraria a lógica real de srcset/sizes **
                img.setAttribute('src', optimizedPath); 
                img.setAttribute('alt', `Imagem do asset: ${assetId} - ${assetData.type}`);
                img.setAttribute('loading', 'lazy');
                img.setAttribute('data-asset-id', assetId);
                
                // Simulação de srcset e fallback (usando um atributo customizado)
                img.setAttribute('data-srcset-mock', `
                    assets/images/${assetId}-320.webp 320w,
                    assets/images/${assetId}-640.webp 640w,
                    assets/images/${assetId}-1024.webp 1024w,
                    assets/images/${assetId}-1600.webp 1600w
                `);
                
                el.innerHTML = ''; // Limpa o placeholder inicial
                el.appendChild(img);

                img.onload = () => img.classList.add('loaded'); // Microinteração de fade-in
                
            } else {
                // REGRA: Se a imagem faltar ou der erro -> Placeholder suave
                el.classList.add('asset-placeholder');
                el.innerHTML = `
                    <span class="icon-placeholder" aria-hidden="true">🖼️</span>
                    <p>Imagem recebida — processando</p>
                `;
                console.error(`[ALLY ASSET ERROR] Asset ID não encontrado ou falhou: ${assetId}`);
            }
        });
    }

    // ----------------------------------------------------------------
    // 2. ACESSIBILIDADE E CONFIGURAÇÕES
    // ----------------------------------------------------------------
    const toggleContrast = document.getElementById('toggle-high-contrast');
    if (toggleContrast) {
        toggleContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            const isActive = document.body.classList.contains('high-contrast');
            localStorage.setItem('high-contrast', isActive ? 'true' : 'false');
            toggleContrast.setAttribute('aria-pressed', isActive);
        });

        // Carrega estado do localStorage
        if (localStorage.getItem('high-contrast') === 'true') {
            document.body.classList.add('high-contrast');
            toggleContrast.setAttribute('aria-pressed', 'true');
        }
    }


    // ----------------------------------------------------------------
    // 3. DASHBOARD MENTOR (Simulação de Mapa e Status)
    // ----------------------------------------------------------------
    
    // Configurações de Perfis (Lógica Anti-Falso-Positivo Simulada)
    const PROFILE_THRESHOLDS = {
        'crianca': { maxSpeed: 10, displacementTime: 120 }, // 10km/h por 120s
        'jovem': { maxSpeed: 25, displacementTime: 90 },
        'adulto': { maxSpeed: 30, displacementTime: 60 }
    };

    // Dados de usuários simulados
    let mockUsers = [
        { id: 1, name: 'Pedro', profile: 'crianca', status: 'safe', photo: 'assets/users/pedro.jpg', coords: { lat: -23.5505, lng: -46.6333 }, battery: 85, speed: 0 },
        { id: 2, name: 'Luisa', profile: 'adulto', status: 'moving', photo: 'assets/users/luisa.jpg', coords: { lat: -23.5400, lng: -46.6400 }, battery: 45, speed: 22 },
        { id: 3, name: 'Ana', profile: 'jovem', status: 'risk', photo: 'assets/users/ana.jpg', coords: { lat: -23.5600, lng: -46.6200 }, battery: 98, speed: 5 }
    ];

    const mapContainer = document.getElementById('map-container');
    const userPanel = document.getElementById('user-panel');
    const sosBanner = document.getElementById('sos-alert-banner');
    const sosButton = document.getElementById('sos-trigger-button');
    const mapMock = document.querySelector('.map-mock');
    const panelCloseBtn = document.getElementById('panel-close-btn');

    if (mapContainer) {
        // ** HOOK REAL PARA GOOGLE MAPS JS API **
        // A função initMap() deve ser definida globalmente ou no script do Google Maps.
        window.initMap = function() {
            // Se o Google Maps carregar, substitua o mock e inicie o mapa real.
            console.log("Google Maps API loaded. Substituindo mock.");
            mapMock.style.display = 'none';
            // map = new google.maps.Map(mapContainer, { ... });
            // renderMarkers(map);
        };
        // -----------------------------------------------------------

        if (mapMock) {
             // Modo offline/mock: Renderiza os marcadores no mock
            renderMockMarkers();
            
            // Botão "Conectar Google Maps" se estiver offline
            const connectBtn = document.createElement('button');
            connectBtn.className = 'btn btn-primary';
            connectBtn.style.cssText = 'position: absolute; top: 10px; left: 10px; z-index: 200;';
            connectBtn.textContent = 'Conectar Google Maps (Simulação)';
            connectBtn.addEventListener('click', () => alert('Conexão simulada com API do Google Maps. Em um ambiente real, o mapa apareceria aqui.'));
            mapContainer.appendChild(connectBtn);
        }

        function renderMockMarkers() {
            mockUsers.forEach(user => {
                // Simulação de posição no mock (usa porcentagens ao invés de lat/lng)
                let mockX, mockY;
                if (user.id === 1) { mockX = '35%'; mockY = '55%'; }
                else if (user.id === 2) { mockX = '60%'; mockY = '40%'; }
                else if (user.id === 3) { mockX = '20%'; mockY = '75%'; }

                const markerEl = document.createElement('div');
                markerEl.className = 'marker';
                markerEl.style.left = mockX;
                markerEl.style.top = mockY;
                markerEl.setAttribute('data-user-id', user.id);

                markerEl.innerHTML = `
                    <div class="marker-status-ring status-${user.status}"></div>
                    <div class="marker-photo">
                        <img src="${user.photo}" alt="Foto de ${user.name}">
                    </div>
                `;

                markerEl.addEventListener('click', () => openUserPanel(user));
                mapMock.appendChild(markerEl);
            });
        }

        function openUserPanel(user) {
            const panelContent = document.getElementById('panel-content');
            
            // Preenchimento do painel
            panelContent.innerHTML = `
                <div class="panel-header">
                    <div class="marker-photo" style="width: 80px; height: 80px; margin-right: 1rem; border-color: ${user.status === 'sos' ? 'var(--color-danger)' : 'var(--color-white)'};">
                        <img src="${user.photo}" alt="Foto de ${user.name}">
                        ${user.status === 'sos' ? '<span class="badge" style="position: absolute; top: 0; right: 0; background: var(--color-danger); color: white; padding: 4px; border-radius: 4px; animation: alert-flash 0.5s infinite alternate;">SOS</span>' : ''}
                    </div>
                    <div>
                        <h2>${user.name}</h2>
                        <p>Perfil: <strong>${user.profile.charAt(0).toUpperCase() + user.profile.slice(1)}</strong></p>
                    </div>
                </div>
                
                <div class="panel-info">
                    <p>Última atualização: <strong>agora</strong></p>
                    <p>Bateria do dispositivo: <strong>${user.battery}% ${user.battery < 20 ? '(Baixa)' : '(OK)'}</strong></p>
                    <p>Velocidade atual: <strong>${user.speed} Km/h</strong></p>
                    <p>Status: <strong>${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</strong></p>
                </div>

                <button class="btn btn-primary" style="width: 100%; margin: 1rem 0;">📞 Chamar ${user.name}</button>
                
                <h3>Histórico de Eventos</h3>
                <ul class="event-history" style="list-style: none; padding: 0;">
                    <li style="border-bottom: 1px solid #eee; padding: 0.5rem 0;">12:35 - Entrou na Área Segura (Casa)</li>
                    <li style="border-bottom: 1px solid #eee; padding: 0.5rem 0;">12:30 - Velocidade alta (> ${PROFILE_THRESHOLDS[user.profile].maxSpeed} Km/h)</li>
                    <li style="border-bottom: 1px solid #eee; padding: 0.5rem 0;">10:00 - Dispositivo conectado (100% bateria)</li>
                </ul>
            `;
            userPanel.classList.add('is-open');
        }

        panelCloseBtn.addEventListener('click', () => {
            userPanel.classList.remove('is-open');
        });

        // Simulação do Fluxo SOS
        if (sosButton) {
            sosButton.addEventListener('click', () => {
                // 1. Exibir Alerta
                sosBanner.textContent = '🚨 ALERTA SOS ATIVO - Ana (Risco)';
                sosBanner.classList.add('active');
                
                // 2. Tocar Som de Alarme (Simulação com Áudio API)
                const alarmAudio = new Audio('assets/sounds/alarm.mp3'); // Assumindo um arquivo
                // alarmAudio.play().catch(e => console.log("Erro ao tocar áudio (Bloqueado): " + e));
                
                // 3. Centralizar no usuário (Simulação: foca no usuário 3 - Ana)
                const targetMarker = document.querySelector('.marker[data-user-id="3"] .marker-status-ring');
                targetMarker.classList.remove('status-risk');
                targetMarker.classList.add('status-sos');

                // 4. Abrir Painel com Contorno Vermelho
                const ana = mockUsers.find(u => u.id === 3);
                ana.status = 'sos';
                openUserPanel(ana);
                
                // 5. Simular Desativação após 10s
                setTimeout(() => {
                    sosBanner.classList.remove('active');
                    targetMarker.classList.remove('status-sos');
                    targetMarker.classList.add('status-risk'); // Volta ao risco, não safe
                    ana.status = 'risk';
                    console.log('Alarme SOS Desativado/Resetado (Simulação)');
                }, 10000);
            });
        }

    } // Fim do bloco Dashboard


    // ----------------------------------------------------------------
    // 4. ONBOARDING / VINCULAR DISPOSITIVO
    // ----------------------------------------------------------------
    const onboardingForm = document.getElementById('onboarding-form');
    const steps = document.querySelectorAll('.onboarding-step');
    let currentStep = 0;

    if (onboardingForm) {
        
        // Função para mostrar um passo específico
        function showStep(index) {
            steps.forEach((step, i) => {
                step.classList.toggle('active', i === index);
            });
            currentStep = index;
        }

        document.getElementById('next-step-1').addEventListener('click', () => showStep(1));
        document.getElementById('prev-step-2').addEventListener('click', () => showStep(0));

        // Simulação do Binding
        onboardingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const deviceCode = document.getElementById('device-code').value;
            const profileType = document.getElementById('profile-type').value;

            // Simulação de chamada API
            console.log(`[ALLY API MOCK] Tentando vincular: Código ${deviceCode}, Perfil ${profileType}`);
            
            if (deviceCode.length > 5 && profileType) {
                // Simulação de sucesso
                showStep(2); // Vai para o passo de sucesso
                document.getElementById('summary-code').textContent = deviceCode;
                document.getElementById('summary-profile').textContent = profileType.charAt(0).toUpperCase() + profileType.slice(1);
            } else {
                alert('Por favor, insira um código válido e selecione um perfil.');
            }
        });

        // Inicia o fluxo
        showStep(0);
    }
    
    // ----------------------------------------------------------------
    // 5. PWA E CONECTIVIDADE LIMITADA (Stubs)
    // ----------------------------------------------------------------
    function checkConnectivity() {
        const statusEl = document.getElementById('connectivity-status');
        if (!statusEl) return;
        
        const isOnline = navigator.onLine;
        statusEl.textContent = isOnline ? '🟢 Conectado (4G)' : '🔴 Offline (Cache/Fallback)';
        statusEl.style.backgroundColor = isOnline ? 'var(--color-success)' : 'var(--color-danger)';
        
        // Lógica de IndexedDB/LocalStorage (Stub)
        if (isOnline) {
            // Reenvio simulado de coordenadas
            const pendingData = localStorage.getItem('pending-coords');
            if (pendingData) {
                console.log(`[ALLY NETWORK] Reenviando ${pendingData.split(',').length} coordenadas pendentes.`);
                localStorage.removeItem('pending-coords');
            }
        } else {
            // Guardar coordenada (Simulação)
            const currentCoords = 'lat,lng,' + new Date().getTime();
            localStorage.setItem('pending-coords', currentCoords);
        }
    }
    
    if (document.getElementById('connectivity-status')) {
        setInterval(checkConnectivity, 5000); // Checa a cada 5 segundos
        checkConnectivity();
    }
    
    // ----------------------------------------------------------------
    // 6. INICIALIZAÇÃO GERAL
    // ----------------------------------------------------------------
    incorporateAssets();
});

// Stubs para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('ServiceWorker registrado com sucesso: ', registration.scope);
        }, error => {
            console.log('Falha no registro do ServiceWorker: ', error);
        });
    });
}
