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

  // Pre-select an event handed off from the Events page (?event=<id>)
  const preselectedId = new URLSearchParams(window.location.search).get('event');
  if (preselectedId && events.some((e) => e.id === preselectedId)) {
    eventSelect.value = preselectedId;
  }

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
  const submitBtn = form.querySelector('.form-submit');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstError = form.querySelector('.form-group.has-error input, .form-group.has-error select');
      if (firstError) firstError.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    // Brief, deliberate delay so the loading state is perceivable feedback
    // rather than an instantaneous, unconfirmed click.
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      form.style.display = 'none';
      const success = document.getElementById('formSuccess');
      success.classList.add('show');
      success.querySelector('h3').setAttribute('tabindex', '-1');
      success.querySelector('h3').focus();
    }, 600);
  });

  // Register another
  document.getElementById('registerAnother').addEventListener('click', () => {
    form.reset();
    form.style.display = 'block';
    document.getElementById('formSuccess').classList.remove('show');
    teamNameGroup.classList.remove('show');
    participantCountGroup.classList.remove('show');
    clearErrors();
    document.getElementById('fullName').focus();
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
    field.setAttribute('aria-invalid', 'false');
  } else {
    group.classList.add('has-error');
    field.setAttribute('aria-invalid', 'true');
  }

  return valid;
}

function clearErrors() {
  document.querySelectorAll('.form-group.has-error').forEach((g) => {
    g.classList.remove('has-error');
    const field = g.querySelector('input, select, textarea');
    if (field) field.setAttribute('aria-invalid', 'false');
  });
}
