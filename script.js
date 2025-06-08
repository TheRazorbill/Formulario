// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const cpfInput = document.getElementById('cpf');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const submitButton = form.querySelector('button[type="submit"]');

    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value;
        value = value.replace(/\D/g, '');

        if (value.length > 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/^(\d{3})(\d{3})$/, '$1.$2');
        }

        e.target.value = value;
        validateField(e.target);
    });

    const requiredInputs = form.querySelectorAll('input[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('input', (e) => validateField(e.target));
        input.addEventListener('blur', (e) => validateField(e.target));
    });

    function validateField(input) {
        input.classList.remove('is-valid', 'is-invalid');

        if (input.value.trim() === '') {
            return;
        }

        if (input.checkValidity()) {
            input.classList.add('is-valid');
        } else {
            input.classList.add('is-invalid');
        }

        checkFormValidity();
    }

    function checkFormValidity() {
        const allValid = Array.from(requiredInputs).every(input => input.checkValidity());
        if (allValid) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', 'true');
        }
    }

    checkFormValidity();

    const formElements = form.querySelectorAll('fieldset, .form-group, button[type="submit"]');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            requiredInputs.forEach(input => validateField(input));
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            return;
        }

        submitButton.textContent = 'Enviando...';
        submitButton.setAttribute('disabled', 'true');
        submitButton.style.backgroundColor = '#6c757d';

        setTimeout(() => {
            const successMessage = document.createElement('div');
            successMessage.classList.add('form-message', 'form-message--success');
            successMessage.textContent = 'Dados enviados com sucesso! Redirecionando...';
            form.after(successMessage);

            setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 10);

            setTimeout(() => {
                form.reset();
                requiredInputs.forEach(input => input.classList.remove('is-valid', 'is-invalid'));
                submitButton