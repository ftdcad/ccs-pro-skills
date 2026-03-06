// CCS PRO Chain — Toggle Logic + Upload Handler

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
  document.querySelectorAll('.pro-section[data-status="error"]')
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

  // Intercept upload form for async submission with loading overlay
  const uploadForm = document.querySelector('.upload-form');
  if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fileInput = uploadForm.querySelector('input[type="file"]');
      if (!fileInput || !fileInput.files.length) return;

      // Show loading overlay
      showProcessingOverlay();

      try {
        const formData = new FormData(uploadForm);
        const response = await fetch(uploadForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'X-Requested-With': 'fetch' },
        });

        const data = await response.json();

        if (data.success && data.redirect) {
          window.location.href = data.redirect;
        } else {
          hideProcessingOverlay();
          alert('Error: ' + (data.error || 'Unknown error'));
        }
      } catch (err) {
        hideProcessingOverlay();
        alert('Network error: ' + err.message);
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

// Processing overlay
function showProcessingOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'processingOverlay';
  overlay.className = 'processing-overlay';
  overlay.innerHTML = `
    <div class="processing-card">
      <div class="processing-spinner"></div>
      <div class="processing-title">Analyzing Policy</div>
      <div class="processing-detail">CCS Policy Pro is reading the document...</div>
      <div class="processing-timer" id="processingTimer">0s</div>
      <div class="processing-hint">Large policies (40+ pages) may take 60-90 seconds.</div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Start timer
  const start = Date.now();
  const timerEl = document.getElementById('processingTimer');
  overlay._timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - start) / 1000);
    if (timerEl) timerEl.textContent = elapsed + 's';
  }, 1000);
}

function hideProcessingOverlay() {
  const overlay = document.getElementById('processingOverlay');
  if (overlay) {
    if (overlay._timerInterval) clearInterval(overlay._timerInterval);
    overlay.remove();
  }
}
