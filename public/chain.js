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

  // Drag and drop for upload zone
  const dropzone = document.getElementById('dropzone');
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
      });
    });
    ['dragleave', 'drop'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
      });
    });
    dropzone.addEventListener('drop', (e) => {
      const input = dropzone.querySelector('input[type="file"]');
      if (input && e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        updateFileList(input);
      }
    });
  }
});

// Show selected files and reveal upload button
function updateFileList(input) {
  const list = document.getElementById('fileList');
  const btn = document.getElementById('uploadBtn');
  if (!list || !btn) return;

  list.innerHTML = '';
  const files = input.files;
  if (files.length === 0) {
    btn.style.display = 'none';
    return;
  }

  for (const f of files) {
    const size = f.size < 1024 * 1024
      ? (f.size / 1024).toFixed(0) + ' KB'
      : (f.size / (1024 * 1024)).toFixed(1) + ' MB';
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `<span>${f.name}</span><span class="file-size">${size}</span>`;
    list.appendChild(item);
  }
  btn.style.display = 'inline-flex';
}
