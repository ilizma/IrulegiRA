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

async function startAR(modelId) {
    // MindAR requires a camera, and the camera requires HTTPS
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        showModal("La Realidad Aumentada requiere una conexión segura (HTTPS).");
        return;
    }

    // 2. Check if is a mobile device
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad/i.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (!isAndroid && !isIOS) {
        showModal("La Realidad Aumentada solo está disponible en dispositivos móviles (Android o iOS).");
        return;
    }

    // If everything is fine, redirect to the viewer
    const currentPath = window.location.pathname;
    const fromPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    window.location.href = `ar-viewer.html?model=${modelId}&from=${fromPage}`;
}
