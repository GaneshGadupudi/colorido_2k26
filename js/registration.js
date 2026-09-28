// ============================================================
// COLORIDO 2K26 — REGISTRATION MODULE
// Form validation, conditional fields, and success state
// ============================================================

import { events } from '../data/events.js';

export function initRegistration() {
  const form = document.getElementById('registrationForm');
  if (!form) return;

  // Populate event dropdown
  const eventSelect = document.getElementById('eventSelect');
  events.forEach((e) => {
    const opt = document.createElement('option');
    opt.value = e.id;
    opt.textContent = `${e.name} — ${e.category} (${e.division})`;
    eventSelect.appendChild(opt);
  });

  // Conditional fields
  const participantType = document.getElementById('participantType');
  const teamNameGroup = document.getElementById('teamNameGroup');
  const participantCountGroup = document.getElementById('participantCountGroup');

  participantType.addEventListener('change', (e) => {
    if (e.target.value === 'team') {
      teamNameGroup.classList.add('show');
      participantCountGroup.classList.add('show');
    } else {
      teamNameGroup.classList.remove('show');
      participantCountGroup.classList.remove('show');
    }
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      form.style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
    }
  });

  // Register another
  document.getElementById('registerAnother').addEventListener('click', () => {
    form.reset();
    form.style.display = 'block';
    document.getElementById('formSuccess').classList.remove('show');
    teamNameGroup.classList.remove('show');
    participantCountGroup.classList.remove('show');
    clearErrors();
  });

  // Real-time validation
  form.querySelectorAll('input, select').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      const group = field.closest('.form-group');
      if (group && group.classList.contains('has-error')) {
        validateField(field);
      }
    });
  });
}

function validateForm() {
  const fields = {
    fullName: { required: true, type: 'text' },
    collegeName: { required: true, type: 'text' },
    email: { required: true, type: 'email' },
    phone: { required: true, type: 'phone' },
    eventSelect: { required: true, type: 'select' },
  };

  let isValid = true;

  Object.entries(fields).forEach(([id, config]) => {
    const field = document.getElementById(id);
    if (!field) return;
    if (!validateField(field, config)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(field, config) {
  const value = field.value.trim();
  const group = field.closest('.form-group');
  if (!group) return true;

  const isRequired = config?.required ?? field.hasAttribute('required');
  const type = config?.type ?? field.type;

  let valid = true;

  if (isRequired && value === '') {
    valid = false;
  } else if (value !== '') {
    if (type === 'email') {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (type === 'phone') {
      valid = /^\d{10}$/.test(value.replace(/\s/g, ''));
    }
  }

  if (valid) {
    group.classList.remove('has-error');
  } else {
    group.classList.add('has-error');
  }

  return valid;
}

function clearErrors() {
  document.querySelectorAll('.form-group.has-error').forEach((g) => g.classList.remove('has-error'));
}
