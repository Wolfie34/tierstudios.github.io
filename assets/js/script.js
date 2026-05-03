document.addEventListener("DOMContentLoaded", function () {
    // Force Dark Theme Logo
    const logoImg = document.getElementById('site-logo');
    if (logoImg) logoImg.src = 'assets/img/logo_dark.PNG';

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menuItems = document.getElementById('menu-items');

    if (menuToggle && menuItems) {
        menuToggle.addEventListener('click', function() {
            menuItems.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Prevent scrolling
        });

        // Close menu when clicking a link
        const navLinks = menuItems.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuItems.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ==========================================
    // Code Highlighting & Copy Logic (Gemini Style)
    // ==========================================

    // First, run highlight.js
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // Then wrap the code blocks and add copy buttons
    var codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(function (codeBlock) {
        var pre = codeBlock.parentNode;

        // Skip if already processed
        if (pre.parentNode.classList.contains('gemini-code-container')) return;

        // 1. Setup Structure
        var container = document.createElement('div');
        container.className = 'gemini-code-container';

        var header = document.createElement('div');
        header.className = 'gemini-code-header';

        var langClass = codeBlock.className.match(/language-(\w+)/);
        var langName = langClass ? langClass[1].toUpperCase() : 'CODE';
        if (langName === 'CSHARP') langName = 'C#';

        header.innerHTML = `
            <div style="display:flex; align-items:center;">
                <span style="display:inline-block; width:10px; height:10px; background:#ff5f56; border-radius:50%; margin-right:6px;"></span>
                <span style="display:inline-block; width:10px; height:10px; background:#ffbd2e; border-radius:50%; margin-right:6px;"></span>
                <span style="display:inline-block; width:10px; height:10px; background:#27c93f; border-radius:50%;"></span>
                <span style="color:#4fc1ff; margin-left:10px; font-weight:bold;">${langName}</span>
            </div>
            <button class="gemini-copy-btn" type="button"><i class="fas fa-copy"></i> Copy</button>
        `;

        pre.className = 'gemini-code-content';
        pre.removeAttribute('style');

        pre.parentNode.insertBefore(container, pre);
        container.appendChild(header);
        container.appendChild(pre);

        // 2. Copy Functionality
        var copyBtn = header.querySelector('.gemini-copy-btn');

        copyBtn.addEventListener('click', function () {
            var codeText = codeBlock.innerText || codeBlock.textContent;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(codeText).then(successEffect).catch(function () {
                    fallbackCopy(codeText);
                });
            } else {
                fallbackCopy(codeText);
            }

            function fallbackCopy(text) {
                var textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    successEffect();
                } catch (err) {
                    copyBtn.innerHTML = '<i class="fas fa-times"></i> Error';
                }
                document.body.removeChild(textArea);
            }

            function successEffect() {
                var originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied';
                copyBtn.style.color = '#4caf50';
                copyBtn.style.borderColor = '#4caf50';
                setTimeout(function () {
                    copyBtn.innerHTML = originalHTML;
                    copyBtn.style.color = '';
                    copyBtn.style.borderColor = '';
                }, 2000);
            }
        });
    });
});
