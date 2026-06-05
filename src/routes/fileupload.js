const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const fileInfo = document.getElementById('file-info');
const fileName = document.getElementById('file-name');
const fileSize = document.getElementById('file-size');
const contentSection = document.getElementById('content-section');
const fileContent = document.getElementById('file-content');
const actionsSection = document.getElementById('actions-section');
const publishBtn = document.getElementById('publish-btn');
const publishSuccess = document.getElementById('publish-success');

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function handleFile(file) {
  fileName.textContent = file.name;
  fileSize.textContent = formatSize(file.size);
  fileInfo.classList.remove('hidden');

  const reader = new FileReader();
  reader.onload = (e) => {
    fileContent.textContent = e.target.result;
    contentSection.classList.remove('hidden');
    actionsSection.style.display = 'block';
    publishSuccess.classList.add('hidden');
    publishBtn.disabled = false;
  };
  reader.readAsText(file);
}

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) handleFile(e.target.files[0]);
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.style.borderColor = '#1a73e8';
});

dropZone.addEventListener('dragleave', () => {
  dropZone.style.borderColor = '#444';
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.style.borderColor = '#444';
  if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
});

publishBtn.addEventListener('click', () => {
  publishSuccess.classList.remove('hidden');
  publishBtn.disabled = true;
});
