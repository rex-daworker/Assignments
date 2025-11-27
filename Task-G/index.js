// Author: Rex Odomero Oghenerobo
// Date: 2025-11-07
// Handles registration form validation and table row creation

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const tbody = document.querySelector('#dataTable tbody');

  const fields = {
    name: document.getElementById('fullName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    birth: document.getElementById('birth'),
    terms: document.getElementById('terms')
  };

  const errors = {
    name: document.getElementById('errName'),
    email: document.getElementById('errEmail'),
    phone: document.getElementById('errPhone'),
    birth: document.getElementById('errBirth'),
    terms: document.getElementById('errTerms')
  };

  function clearErrors() {
    Object.values(errors).forEach(e => e.textContent = '');
  }

  function validate() {
    clearErrors();
    let valid = true;

    // Full name: at least two words, each ≥ 2 characters
    const parts = fields.name.value.trim().split(/\s+/);
    if (parts.length < 2 || parts.some(p => p.length < 2)) {
      errors.name.textContent = 'Please enter your full name (first and last, at least 2 letters each).';
      valid = false;
    }

    // Email validation
    const email = fields.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email.textContent = 'Please provide a valid email address (e.g., name@example.com).';
      valid = false;
    }

    // Phone validation (Finnish +358 format)
    const phone = fields.phone.value.replace(/\s+/g, '');
    if (!/^\+358\d{7,9}$/.test(phone)) {
      errors.phone.textContent = 'Phone number must start with +358 and contain 7–9 digits.';
      valid = false;
    }

    // Birth date validation
    const birth = new Date(fields.birth.value);
    const today = new Date();
    if (isNaN(birth)) {
      errors.birth.textContent = 'Please select your birth date.';
      valid = false;
    } else {
      const age = today.getFullYear() - birth.getFullYear() -
        (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
      if (birth > today) {
        errors.birth.textContent = 'Birth date cannot be in the future.';
        valid = false;
      } else if (age < 13) {
        errors.birth.textContent = 'You must be at least 13 years old.';
        valid = false;
      }
    }

    // Terms checkbox
    if (!fields.terms.checked) {
      errors.terms.textContent = 'You must accept the terms to continue.';
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    // Fill timestamp automatically
    const timestamp = new Date().toLocaleString();
    document.getElementById('timestamp').value = timestamp;

    // Create new table row
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${timestamp}</td>
      <td>${fields.name.value.trim()}</td>
      <td>${fields.email.value.trim()}</td>
      <td>${fields.phone.value.trim()}</td>
      <td>${fields.birth.value}</td>
      <td>${fields.terms.checked ? 'Yes' : 'No'}</td>
    `;
    tbody.appendChild(row);

    // Reset form
    form.reset();
  });
});
