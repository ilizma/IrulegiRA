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

// Modelos de las fichas de detalle
const MODELS = {
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
    'objeto12': 'models/PlacaBrigantina.glb',
    'fort': 'models/Fort.glb',
    'castle': 'models/Castle.glb',
};

function modelPath(modelId) {
    return MODELS[modelId] || MODELS['fort'];
}

// Lanzador nativo de Scene Viewer (solo como reserva si model-viewer no puede)
function sceneViewerUrl(modelId, customTitle) {
    const absoluteModelPath = window.location.origin +
        window.location.pathname.replace(/\/[^\/]*$/, '/') +
        modelPath(modelId);
    const title = encodeURIComponent(customTitle || '');
    return `intent://arvr.google.com/scene-viewer/1.0?file=${absoluteModelPath}&mode=ar_only&title=${title}&resizable=true&disable_occlusion=true#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
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

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (!isAndroid && !isIOS) {
        showModal("La Realidad Aumentada solo está disponible en dispositivos móviles (Android o iOS) / Errealitate Areagotua gailu mugikorretan (Android edo IOS) bakarrik dago eskuragarri");
        return;
    }

    // El modelo se precarga al abrir la ficha (ver prepareAR al final del archivo)
    if (modelViewer.getAttribute('src') !== modelPath(modelId)) {
        modelViewer.setAttribute('src', modelPath(modelId));
    }
    if (customTitle) {
        modelViewer.setAttribute('alt', customTitle);
    }

    // model-viewer decide el modo: WebXR (cámara dentro de la propia web)
    // → Scene Viewer → Quick Look
    if (typeof modelViewer.activateAR === 'function') {
        try {
            await modelViewer.activateAR();
            return;
        } catch (e) {
            // No ha podido (modelo aún cargando, sin WebXR, etc.)
        }
    }

    if (isAndroid) {
        window.location.href = sceneViewerUrl(modelId, customTitle);
    } else {
        showModal("La Realidad Aumentada no es compatible en este dispositivo iOS.");
    }
}

// Precarga el modelo de la ficha abierta para que activateAR() pueda lanzarse
// justo al pulsar el botón, sin esperar la descarga del GLB
document.addEventListener('DOMContentLoaded', function () {
    const modelViewer = document.getElementById('ar-viewer');
    if (!modelViewer) return;
    const modelId = new URLSearchParams(window.location.search).get('model');
    if (MODELS[modelId]) {
        modelViewer.setAttribute('src', MODELS[modelId]);
    }
});
