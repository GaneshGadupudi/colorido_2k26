// ============================================================
// COLORIDO 2K26 — REGISTRATION MODULE
// Form validation, conditional fields, Supabase submission, and
// success state
// ============================================================

import { events } from '../data/events.js';
import { event_svg } from '../data/event-svg.js';
import { icons } from './icons.js';
import { createRegistration } from './services/registrationsService.js';

export function initRegistration() {
  const form = document.getElementById('registrationForm');
  if (!form) return;

  // Fill in the input icon placeholders declared in the HTML
  form.querySelectorAll('.input-icon[data-icon]').forEach((el) => {
    el.innerHTML = icons[el.dataset.icon] || '';
  });

  // Populate event dropdown
  const eventSelect = document.getElementById('eventSelect');
  events.forEach((e) => {
    const opt = document.createElement('option');
    opt.value = e.id;
    opt.textContent = `${e.name} — ${e.category} (${e.division})`;
    eventSelect.appendChild(opt);
  });

  // Live preview of the selected event's details
  const eventPreview = document.getElementById('eventPreview');
  function renderEventPreview(eventId) {
    const event = events.find((e) => e.id === eventId);
    if (!event) {
      eventPreview.hidden = true;
      eventPreview.innerHTML = '';
      return;
    }
    eventPreview.hidden = false;
    eventPreview.innerHTML = `
      <div class="event-preview-icon">${icons[event.icon] || icons.circle}</div>
      <div class="event-preview-body">
        <span class="event-preview-category">${event.category} · ${event.division}</span>
        <h4>${event.name}</h4>
        <p class="event-preview-tagline">${event.tagline}</p>
        <div class="event-preview-meta">
          <span>${icons.calendar} ${event.date}, ${event.time}</span>
          <span>${icons['map-pin']} ${event.venue}</span>
          <span>${icons.user} ${event.teamSize}</span>
          <span>${icons['credit-card']} ${event.fee}</span>
        </div>
      </div>
    `;
  }
  eventSelect.addEventListener('change', (e) => renderEventPreview(e.target.value));

  // Pre-select an event handed off from the Events page (?event=<id>)
  const preselectedId = new URLSearchParams(window.location.search).get('event');
  if (preselectedId && events.some((e) => e.id === preselectedId)) {
    eventSelect.value = preselectedId;
  }
  renderEventPreview(eventSelect.value);

  // Conditional fields
  const participantType = document.getElementById('participantType');
  const teamNameGroup = document.getElementById('teamNameGroup');
  const participantCountGroup = document.getElementById('participantCountGroup');

  const teamNameField = document.getElementById('teamName');
  const participantCountField = document.getElementById('participantCount');
  const teamMembersGroup = document.getElementById('teamMembersGroup');
  const teamMembersFields = document.getElementById('teamMembersFields');

  // Keeps one "Team Member N Name" input per participant beyond the
  // registrant (who already gave their own name above), adding/removing
  // fields as the count changes without wiping names already typed in.
  function syncTeamMemberFields() {
    const total = Number(participantCountField.value) || 0;
    const needed = Math.max(0, total - 1);
    const current = teamMembersFields.children.length;

    for (let i = current - 1; i >= needed; i--) {
      teamMembersFields.children[i].remove();
    }

    for (let i = current; i < needed; i++) {
      const id = `teamMember${i}`;
      const group = document.createElement('div');
      group.className = 'form-group field-in';
      group.innerHTML = `
        <label for="${id}">Team Member ${i + 2} Name <span class="required">*</span></label>
        <div class="input-icon-group">
          <span class="input-icon" aria-hidden="true">${icons.user}</span>
          <input type="text" id="${id}" name="${id}" placeholder="Enter member's full name" required aria-describedby="${id}Error" aria-invalid="false" />
        </div>
        <div class="error-message" id="${id}Error" role="alert">Please enter this member's name.</div>
      `;
      teamMembersFields.appendChild(group);

      const input = group.querySelector('input');
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (group.classList.contains('has-error')) validateField(input);
      });
    }
  }

  participantType.addEventListener('change', (e) => {
    const isTeam = e.target.value === 'team';
    teamNameGroup.classList.toggle('show', isTeam);
    participantCountGroup.classList.toggle('show', isTeam);
    teamMembersGroup.classList.toggle('show', isTeam);
    teamNameField.toggleAttribute('required', isTeam);
    participantCountField.toggleAttribute('required', isTeam);
    if (isTeam) {
      syncTeamMemberFields();
    } else {
      clearFieldError(teamNameField);
      clearFieldError(participantCountField);
      teamMembersFields.innerHTML = '';
    }
  });

  participantCountField.addEventListener('input', syncTeamMemberFields);

  // Form submit
  const submitBtn = form.querySelector('.form-submit');
  const formError = document.getElementById('registrationError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstError = form.querySelector('.form-group.has-error input, .form-group.has-error select');
      if (firstError) firstError.focus();
      return;
    }

    if (formError) formError.hidden = true;

    const data = new FormData(form);
    const eventId = data.get('eventSelect');
    const teamMembers = Array.from(teamMembersFields.querySelectorAll('input'))
      .map((input) => input.value.trim())
      .filter(Boolean);

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    try {
      await createRegistration({
        fullName: data.get('fullName'),
        collegeName: data.get('collegeName'),
        email: data.get('email'),
        phone: data.get('phone'),
        gender: data.get('gender'),
        eventId,
        participantType: data.get('participantType'),
        teamName: data.get('teamName'),
        participantCount: data.get('participantCount'),
        teamMembers,
      });
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      if (formError) {
        formError.textContent = err.message;
        formError.hidden = false;
      }
      return;
    }

    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    form.style.display = 'none';

    const eventSvg = document.querySelector('.event-svg');
    const svg = event_svg[eventId];
    const success = document.getElementById('formSuccess');
    success.classList.add('show');
    // Show SVG
    eventSvg.innerHTML = svg;
    // Keep SVG visible for 1 second
    setTimeout(() => {
      eventSvg.innerHTML = `
        <div class="success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>`;
      const heading = success.querySelector('h3');
      heading.setAttribute('tabindex', '-1');
      heading.focus();
    }, 2000);
  });

  // Register another
  document.getElementById('registerAnother').addEventListener('click', () => {
    form.reset();
    form.style.display = 'block';
    document.getElementById('formSuccess').classList.remove('show');
    teamNameGroup.classList.remove('show');
    participantCountGroup.classList.remove('show');
    teamMembersGroup.classList.remove('show');
    teamNameField.removeAttribute('required');
    participantCountField.removeAttribute('required');
    teamMembersFields.innerHTML = '';
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
    fullName: { type: 'text' },
    collegeName: { type: 'text' },
    email: { type: 'email' },
    phone: { type: 'phone' },
    gender: { type: 'select' },
    eventSelect: { type: 'select' },
    participantType: { type: 'select' },
    // required toggled dynamically on the fields themselves based on participantType
    teamName: { type: 'text' },
    participantCount: { type: 'number' },
  };

  let isValid = true;

  Object.entries(fields).forEach(([id, config]) => {
    const field = document.getElementById(id);
    if (!field) return;
    if (!validateField(field, config)) {
      isValid = false;
    }
  });

  document.querySelectorAll('#teamMembersFields input').forEach((field) => {
    if (!validateField(field)) {
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
    } else if (type === 'number') {
      const num = Number(value);
      const min = field.min !== '' ? Number(field.min) : -Infinity;
      const max = field.max !== '' ? Number(field.max) : Infinity;
      valid = Number.isFinite(num) && num >= min && num <= max;
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

function clearFieldError(field) {
  const group = field?.closest('.form-group');
  if (!group) return;
  group.classList.remove('has-error');
  field.setAttribute('aria-invalid', 'false');
}
