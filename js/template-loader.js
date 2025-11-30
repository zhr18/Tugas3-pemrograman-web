    // template-loader.js - Load external HTML templates into the page

    (function() {
    'use strict';

    /**
     * Load external template HTML file
     * @param {string} url - URL to template file
     * @returns {Promise<string>} Template HTML content
     */
    async function loadTemplate(url) {
        try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load template: ${url}`);
        }
        return await response.text();
        } catch (error) {
        console.error('Error loading template:', error);
        throw error;
        }
    }

    /**
     * Insert template into page
     * @param {string} html - Template HTML content
     */
    function insertTemplate(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const template = doc.querySelector('script[type="text/x-template"]');
        
        if (template) {
        document.body.appendChild(template);
        }
    }

    /**
     * Load all templates
     */
    async function loadAllTemplates() {
        // Deteksi jika dibuka via file:// yang sering memblokir fetch
        if (window.location.protocol === 'file:') {
        console.error('Templates tidak bisa dimuat dari file://. Jalankan via HTTP server.');
        const warn = document.createElement('div');
        warn.style.background = '#ffc400';
        warn.style.color = '#003B8E';
        warn.style.padding = '12px';
        warn.style.textAlign = 'center';
        warn.style.fontWeight = '600';
        warn.textContent = 'Gagal memuat template dari file://. Silakan jalankan dengan Live Server atau python -m http.server.';
        document.body.insertBefore(warn, document.body.firstChild);
        return;
        }
        const templates = [
        './templates/stock-table.html',
        './templates/do-tracking.html',
        './templates/order-form.html'
        ];

        try {
        for (const templateUrl of templates) {
            const html = await loadTemplate(templateUrl);
            insertTemplate(html);
        }
        console.log('All templates loaded successfully');
        } catch (error) {
        console.error('Failed to load templates:', error);
        }
    }

    // Auto-load templates when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAllTemplates);
    } else {
        loadAllTemplates();
    }
    })();
