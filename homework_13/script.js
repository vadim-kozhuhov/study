'use strict';
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
        document.querySelectorAll('.error').forEach(function (error) {
            error.textContent = '';
        })
        let name = document.getElementById('name').value.trim();
        let message = document.getElementById('message').value.trim();
        let phone = document.getElementById('phone').value.trim();
        let mail = document.getElementById('mail').value.trim();
        let isValid = true;
        const namePattern = /.+/;
        const phonePattern = /^\+380\d{9}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const messagePattern = /^.{5,}$/;
        if (!name.match(namePattern)) {
            document.getElementById('nameError').textContent = 'Name is required';
            isValid = false;
        }
        if (!message.match(messagePattern)) {
            document.getElementById('messageError').textContent = 'At least 5 symbols';
            isValid = false;
        }
        if (!phone.match(phonePattern)) {
            document.getElementById('phoneError').textContent = 'Must be start from +380 and have total 12 digits';
            isValid = false;
        }
        if (phone === '') {
            document.getElementById('phoneError').textContent = 'Phone is required';
            isValid = false;
        }
        if (!mail.match(emailPattern)) {
            document.getElementById('mailError').textContent = 'Wrong email format';
            isValid = false;
        }
        if (isValid) {
            console.log(`Name:, ${name}`);
            console.log(`Message:, ${message}`);
            console.log(`Phone number:, ${phone}`);
            console.log(`Email:, ${mail}`);
        } else {
            event.preventDefault();
        }

    })
})
