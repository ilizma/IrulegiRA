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
    // Wait for translations to load
    while (!translations || Object.keys(translations).length === 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // MindAR requires a camera, and the camera requires HTTPS
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        showModal(translations.script['https-error']);
        return;
    }

    // Check if is a mobile device
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad/i.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (!isAndroid && !isIOS) {
        showModal(translations.script['mobile-error']);
        return;
    }

    // If everything is fine, redirect to the viewer
    window.location.href = `ar-viewer.html?model=${modelId}`;
}
