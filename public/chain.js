// CCS PRO Chain — Toggle Logic

function toggle(id) {
  const sec = document.getElementById(id);
  if (!sec || sec.classList.contains('placeholder')) return;
  sec.classList.toggle('open');
}

function expandAll() {
  document.querySelectorAll('.pro-section:not(.placeholder)')
    .forEach(s => s.classList.add('open'));
}

function collapseAll() {
  document.querySelectorAll('.pro-section')
    .forEach(s => s.classList.remove('open'));
}

// Auto-open complete + active sections on load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pro-section[data-status="complete"]')
    .forEach(s => s.classList.add('open'));
  document.querySelectorAll('.pro-section[data-status="active"]')
    .forEach(s => s.classList.add('open'));
});
