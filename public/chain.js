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

  // Set up drag and drop for ALL dropzones (main + supplemental)
  document.querySelectorAll('.upload-dropzone').forEach(dropzone => {
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
        // Get the proKey from the dropzone id — supplemental dropzones use "dropzone-{proKey}"
        const proKey = dropzone.id.startsWith('dropzone-') ? dropzone.id.substring(9) : null;
        updateFileList(input, proKey);
      }
    });
  });

  // Intercept ALL upload forms for async submission with loading overlay
  document.querySelectorAll('.upload-form').forEach(uploadForm => {
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fileInput = uploadForm.querySelector('input[type="file"]');
      if (!fileInput || !fileInput.files.length) return;

      // Determine if this is a supplemental re-run
      const isSupplemental = uploadForm.classList.contains('supplemental-form');
      const title = isSupplemental ? 'Re-analyzing with Supplemental Documents' : 'Analyzing Policy';
      const detail = isSupplemental
        ? 'CCS Policy Pro is re-reading all documents with your new uploads...'
        : 'CCS Policy Pro is reading the document...';

      showProcessingOverlay(title, detail);

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
  });
});

// Show selected files and reveal upload button
// proKey is optional — used for supplemental forms to target the right file list
function updateFileList(input, proKey) {
  const listId = proKey ? 'fileList-' + proKey : 'fileList';
  const btnId = proKey ? 'uploadBtn-' + proKey : 'uploadBtn';
  const list = document.getElementById(listId);
  const btn = document.getElementById(btnId);
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

// Re-run a completed PRO step with existing files
async function rerunPro(claimId, proKey) {
  showProcessingOverlay('Re-running Analysis', 'Re-processing existing documents with latest model...');

  try {
    const response = await fetch('/claim/' + claimId + '/rerun/' + proKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (data.success && data.redirect) {
      window.location.href = data.redirect;
    } else {
      hideProcessingOverlay();
      alert('Error: ' + (data.error || 'Re-run failed'));
    }
  } catch (err) {
    hideProcessingOverlay();
    alert('Network error: ' + err.message);
  }
}

// Delete claim
async function deleteClaim(claimId) {
  if (!confirm('Delete this claim and all uploaded files? This cannot be undone.')) return;

  try {
    const response = await fetch('/claim/' + claimId, { method: 'DELETE' });
    const data = await response.json();
    if (data.success) {
      window.location.href = '/';
    } else {
      alert('Error: ' + (data.error || 'Could not delete claim'));
    }
  } catch (err) {
    alert('Network error: ' + err.message);
  }
}

// Processing overlay
function showProcessingOverlay(title, detail) {
  title = title || 'Analyzing Policy';
  detail = detail || 'CCS Policy Pro is reading the document...';
  const overlay = document.createElement('div');
  overlay.id = 'processingOverlay';
  overlay.className = 'processing-overlay';
  overlay.innerHTML = `
    <div class="processing-card">
      <div class="processing-spinner"></div>
      <div class="processing-title">${title}</div>
      <div class="processing-detail">${detail}</div>
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
