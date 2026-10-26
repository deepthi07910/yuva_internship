
document.addEventListener('DOMContentLoaded', () => {
    const themeTrigger = document.getElementById('mode-switcher');
    const systemStashKey = 'yuva-cached-theme';
    const activeStoredConfig = localStorage.getItem(systemStashKey);

    // Initial parsing check to implement user layouts instantly
    if (activeStoredConfig === 'dark') {
        document.documentElement.setAttribute('data-visual-theme', 'dark');
        themeTrigger.innerHTML = '<span class="icon"></span> Light Mode';
    }

    themeTrigger.addEventListener('click', () => {
        const structuralState = document.documentElement.getAttribute('data-visual-theme');
        
        if (structuralState === 'dark') {
            document.documentElement.removeAttribute('data-visual-theme');
            localStorage.setItem(systemStashKey, 'light');
            themeTrigger.innerHTML = '<span class="icon"></span> Dark Mode';
        } else {
            document.documentElement.setAttribute('data-visual-theme', 'dark');
            localStorage.setItem(systemStashKey, 'dark');
            themeTrigger.innerHTML = '<span class="icon"></span> Light Mode';
        }
    });
    const tabControlsWrapper = document.getElementById('tab-buttons');
    const allPanels = document.querySelectorAll('#tab-panels .panel');

    tabControlsWrapper.addEventListener('click', (event) => {
        // Intercept triggers safely from targets via event bubbling layers
        const targetBtn = event.target.closest('.tab-btn');
        if (!targetBtn || targetBtn.classList.contains('active')) return;

        // Strip previous interactive indicators
        tabControlsWrapper.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        allPanels.forEach(panel => panel.classList.remove('active'));
        targetBtn.classList.add('active');
        const designatedPanelId = targetBtn.getAttribute('data-target');
        document.getElementById(designatedPanelId).classList.add('active');
    });
    const entryForm = document.getElementById('async-form');
    const nameInput = document.getElementById('user-fullname');
    const emailInput = document.getElementById('user-email');

    entryForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        let visualIntegrityStatus = true;
        clearFeedback('name-feedback', nameInput);
        clearFeedback('email-feedback', emailInput);
        document.getElementById('form-toast').textContent = '';

        if (nameInput.value.trim() === '') {
            applyFeedback('name-feedback', nameInput, 'Structural requirement: Name field is empty.');
            visualIntegrityStatus = false;
        } else if (nameInput.value.trim().length < 3) {
            applyFeedback('name-feedback', nameInput, 'Structural requirement: Minimum 3 alphabetical flags.');
            visualIntegrityStatus = false;
        }

        const structuralEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            applyFeedback('email-feedback', emailInput, 'Structural requirement: Coordinate path empty.');
            visualIntegrityStatus = false;
        } else if (!structuralEmailRegex.test(emailInput.value.trim())) {
            applyFeedback('email-feedback', emailInput, 'Configuration mismatch: Address structural signature invalid.');
            visualIntegrityStatus = false;
        }

        // Fire UI completion notifications if all checks pass
        if (visualIntegrityStatus) {
            const toastOutput = document.getElementById('form-toast');
            toastOutput.textContent = 'Module Registered Successfully! Cache synced.';
            entryForm.reset();
        }
    });
    function applyFeedback(elementId, inputRef, alertString) {
        const labelTarget = document.getElementById(elementId);
        labelTarget.textContent = alertString;
        labelTarget.classList.add('error');
        inputRef.style.borderColor = 'var(--negative)';
    }

    function clearFeedback(elementId, inputRef) {
        const labelTarget = document.getElementById(elementId);
        labelTarget.textContent = '';
        labelTarget.classList.remove('error');
        inputRef.style.borderColor = '';
    }
});
