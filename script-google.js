function showModal(message) {
    const modal = document.getElementById('custom-modal');
    const modalMsg = document.getElementById('modal-message');
    if (modal && modalMsg) {
        modalMsg.innerText = message;
        modal.style.display = 'flex';
    } else {
        alert(message);
    }
}

function closeModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

async function startAR(modelId, customTitle) {
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        showModal("La Realidad Aumentada requiere una conexión segura (HTTPS).");
        return;
    }

    const modelViewer = document.getElementById('ar-viewer');
    if (!modelViewer) {
        return;
    }
    
    const models = {
        'objeto1': 'models/BrazaleteVidrio.glb',
        'objeto2': 'models/FichaCeramica.glb',
        'objeto3': 'models/PiedraAlisar.glb',
        'objeto4': 'models/MolinoMano.glb',
        'objeto5': 'models/PuntaLanza.glb',
        'objeto6': 'models/MdI.glb',
        'objeto7': 'models/CuchilloHierro.glb',
        'objeto8': 'models/DadoHueso.glb',
        'objeto9': 'models/ViroteBallesta.glb',
        'objeto10': 'models/ClavoHierro.glb',
        'objeto11': 'models/HebillaHierro.glb',
        'objeto12': 'models/PlacaBrigantina.glb'
    };
    
    const modelPath = models[modelId] || models['fort'];
    const absoluteModelPath = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/') + modelPath;
    
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isAndroid) {
        const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${absoluteModelPath}&mode=ar_only&title=${encodeURIComponent(customTitle)}&resizable=true&disable_occlusion=true#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
        window.location.href = intentUrl;
    } else if (isIOS) {
        modelViewer.src = modelPath;
        if (customTitle) {
            modelViewer.alt = customTitle;
        }
        const trigger = async () => {
            try {
                await modelViewer.activateAR();
            } catch (e) {
                showModal("La Realidad Aumentada no es compatible en este dispositivo iOS.");
            }
        };
        if (modelViewer.loaded) { trigger(); } 
        else { modelViewer.addEventListener('load', trigger, { once: true }); }
        setTimeout(trigger, 200);
    } else {
        showModal("La Realidad Aumentada solo está disponible en dispositivos móviles (Android o iOS).");
    }
}
