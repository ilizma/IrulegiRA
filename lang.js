// Language handling
let currentLang = localStorage.getItem('lang') || 'euskera'; // Default to Basque
let translations = {};
const LANG_VERSION = '2.1';

const LANG_KEYS = {
    euskera: 'EU',
    castellano: 'ES'
};

async function loadTranslations(lang) {
    try {
        const response = await fetch(`lang/${lang}.json?v=${LANG_VERSION}`, {
            cache: 'no-store'
        });
        translations = await response.json();
        currentLang = lang;
        localStorage.setItem('lang', lang);
        applyTranslations();
        updateLangButton();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function toggleLanguage() {
    const newLang = currentLang === 'euskera' ? 'castellano' : 'euskera';
    loadTranslations(newLang);
}

function updateLangButton() {
    const btn = document.getElementById('lang-btn');
    if (btn) {
        btn.textContent = LANG_KEYS[currentLang === 'euskera' ? 'castellano' : 'euskera'];
    }
}

function applyTranslations() {
    // This will be implemented per page
    console.log('Translations loaded for', currentLang, translations);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations(currentLang);
});
