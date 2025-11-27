//Author: Rex Odomero Oghenerobo
//Date: Monday, 13 November 2025.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const tbody = document.getElementById('dataTable');

  const f = {
    name: document.getElementById('fullName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    birth: document.getElementById('birth'),
    terms: document.getElementById('terms')
  };
  const e = {
    name: document.getElementById('errName'),
    email: document.getElementById('errEmail'),
    phone: document.getElementById('errPhone'),
    birth: document.getElementById('errBirth'),
    terms: document.getElementById('errTerms')
  };

  function clearErrors() { Object.values(e).forEach(el => el.textContent = ''); }

  function validate() {
    clearErrors(); let ok = true;
    const parts = f.name.value.trim().split(/\s+/);
    if (parts.length < 2 || parts.some(p => p.length < 2)) { e.name.textContent = 'Enter full name.'; ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim())) { e.email.textContent = 'Invalid email.'; ok = false; }
    if (!/^\+358\d{7,9}$/.test(f.phone.value.replace(/\s+/g,''))) { e.phone.textContent = 'Phone must start +358.'; ok = false; }
    const b = new Date(f.birth.value), t = new Date();
    if (isNaN(b)) { e.birth.textContent = 'Select birth date.'; ok = false; }
    else { const age = t.getFullYear()-b.getFullYear()-(t < new Date(t.getFullYear(),b.getMonth(),b.getDate())?1:0);
      if (b>t) { e.birth.textContent='Birth cannot be future.'; ok=false; }
      else if (age<13) { e.birth.textContent='Must be ≥13.'; ok=false; } }
    if (!f.terms.checked) { e.terms.textContent = 'Accept terms.'; ok = false; }
    return ok;
  }

  form.addEventListener('submit', ev => {
    ev.preventDefault(); if (!validate()) return;
    const ts = new Date().toLocaleString();
    const row = document.createElement('tr');
    row.className = "odd:bg-white even:bg-slate-100";
    row.innerHTML = `
      <td class="p-2 border">${ts}</td>
      <td class="p-2 border">${f.name.value.trim()}</td>
      <td class="p-2 border">${f.email.value.trim()}</td>
      <td class="p-2 border">${f.phone.value.trim()}</td>
      <td class="p-2 border">${f.birth.value}</td>
      <td class="p-2 border">${f.terms.checked ? 'Yes' : 'No'}</td>`;
    tbody.appendChild(row);
    form.reset();
  });
});
