/**
 * Baby Profile Engine (Quản lý Hồ Sơ Bé)
 * Lưu trữ tên bé, tuổi, avatar 3D hoặc ảnh thật tải lên của bé (nén Base64)
 * Hỗ trợ đồng bộ xuyên suốt Master Hub và các trò chơi.
 */
const BabyProfile = {
  STORAGE_KEY: 'toddler_baby_profile',

  // Danh sách Avatar 3D Preset dễ thương cho bé
  PRESET_AVATARS: [
    { id: 'baby', name: 'Em Bé Đáng Yêu', icon: 'baby.png', emoji: '👶' },
    { id: 'boy', name: 'Bé Trai Năng Động', icon: 'boy.png', emoji: '👦' },
    { id: 'girl', name: 'Bé Gái Xinh Xắn', icon: 'girl.png', emoji: '👧' },
    { id: 'rabbit', name: 'Thỏ Con Tinh Nghịch', icon: 'rabbit.png', emoji: '🐰' },
    { id: 'bear', name: 'Gấu Con Ngoan Ngoãn', icon: 'bear.png', emoji: '🐻' },
    { id: 'cat', name: 'Mèo Con Nhanh Nhẹn', icon: 'cat.png', emoji: '🐱' },
    { id: 'dog', name: 'Cún Con Trung Thành', icon: 'dog.png', emoji: '🐶' },
    { id: 'panda', name: 'Gấu Trúc Dễ Thương', icon: 'panda.png', emoji: '🐼' }
  ],

  getDefaultProfile() {
    return {
      name: 'Bé Yêu',
      age: 3,
      avatarType: 'preset', // 'preset' hoặc 'custom'
      presetId: 'baby',
      photoBase64: null, // Ảnh thật bé tải lên (compressed JPEG)
      updatedAt: Date.now()
    };
  },

  getProfile() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Object.assign({}, this.getDefaultProfile(), parsed);
      }
    } catch (e) {
      console.warn('[BabyProfile] Lỗi đọc localStorage:', e);
    }
    return this.getDefaultProfile();
  },

  saveProfile(profileData) {
    try {
      const current = this.getProfile();
      const updated = Object.assign({}, current, profileData, { updatedAt: Date.now() });
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('baby-profile-updated', { detail: updated }));
      }
      return updated;
    } catch (e) {
      console.error('[BabyProfile] Lỗi lưu hồ sơ bé:', e);
      return null;
    }
  },

  getDisplayName() {
    const prof = this.getProfile();
    const name = (prof.name || '').trim();
    return name.length > 0 ? name : 'Bé Yêu';
  },

  getAge() {
    const prof = this.getProfile();
    const age = parseInt(prof.age, 10);
    return (!isNaN(age) && age >= 1 && age <= 10) ? age : 3;
  },

  /**
   * Lấy đường dẫn hoặc chuỗi data:image đại diện cho avatar bé
   * @param {string} basePath Đường dẫn tương đối đến thư mục gốc (vd: '' hoặc '../')
   */
  getAvatarSrc(basePath = '') {
    const prof = this.getProfile();
    if (prof.avatarType === 'custom' && prof.photoBase64) {
      return prof.photoBase64;
    }
    const preset = this.PRESET_AVATARS.find(a => a.id === prof.presetId) || this.PRESET_AVATARS[0];
    const prefix = basePath ? (basePath.endsWith('/') ? basePath : basePath + '/') : '';
    return `${prefix}assets/icons/${preset.icon}`;
  },

  /**
   * Tự động nén và crop ảnh tròn/vuông từ File input sang Base64 chuẩn JPEG < 100KB
   */
  compressAndProcessPhoto(file, callback) {
    if (!file || !file.type.match(/image.*/)) {
      if (callback) callback(new Error('Vui lòng chọn file hình ảnh hợp lệ'), null);
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const targetSize = 256; // Kích thước tối ưu cho avatar & bằng khen
        canvas.width = targetSize;
        canvas.height = targetSize;

        // Tính crop vuông chính giữa ảnh
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, targetSize, targetSize);
        // Nén JPEG chất lượng 0.82 dung lượng chỉ tầm ~25KB
        const base64 = canvas.toDataURL('image/jpeg', 0.82);
        if (callback) callback(null, base64);
      };
      img.onerror = function() {
        if (callback) callback(new Error('Không thể đọc file ảnh'), null);
      };
      img.src = e.target.result;
    };
    reader.onerror = function(err) {
      if (callback) callback(err, null);
    };
    reader.readAsDataURL(file);
  },

  escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  /**
   * Render HTML Widget hồ sơ bé cho Header
   * @param {string} basePath Đường dẫn tương đối đến root
   */
  renderHeaderWidget(containerId = 'baby-profile-widget', basePath = '') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const prof = this.getProfile();
    const avatarSrc = this.getAvatarSrc(basePath);
    const displayName = this.escapeHtml(this.getDisplayName());
    const age = this.getAge();

    container.innerHTML = `
      <div class="baby-profile-pill" onclick="BabyProfile.openEditModal('${basePath}')" title="Nhấn để đổi tên & ảnh bé">
        <div class="baby-pill-avatar-wrap">
          <img src="${avatarSrc}" alt="${displayName}" class="baby-pill-avatar-img" id="baby-pill-avatar-img">
          <span class="baby-pill-badge-star">⭐</span>
        </div>
        <div class="baby-pill-info">
          <div class="baby-pill-name" id="baby-pill-name">${displayName}</div>
          <div class="baby-pill-sub">${age} Tuổi • Chạm để đổi ✏️</div>
        </div>
      </div>
    `;
  },

  /**
   * Hiển thị Modal chỉnh sửa Hồ sơ Bé phong cách Claymorphic Pastel
   */
  openEditModal(basePath = '') {
    let modal = document.getElementById('baby-profile-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'baby-profile-modal';
      modal.className = 'baby-profile-modal-overlay';
      document.body.appendChild(modal);
    }

    const prof = this.getProfile();
    this._selectedAge = prof.age || 3;
    this._tempAvatarType = prof.avatarType || 'preset';
    this._tempPresetId = prof.presetId || 'baby';
    this._tempPhotoBase64 = prof.photoBase64 || null;

    const prefix = basePath ? (basePath.endsWith('/') ? basePath : basePath + '/') : '';
    const curAvatar = this.getAvatarSrc(basePath);
    const safeName = this.escapeHtml(prof.name || '');

    modal.innerHTML = `
      <div class="baby-profile-modal-box">
        <button type="button" class="baby-modal-close" onclick="BabyProfile.closeEditModal()">✕</button>
        
        <div class="baby-modal-header">
          <div class="baby-modal-crown">👑</div>
          <h2 class="baby-modal-title">Hồ Sơ Của Bé Yêu</h2>
          <p class="baby-modal-sub">Đặt tên & hình bé để in lên Bằng Khen khoe Ông Bà nhé!</p>
        </div>

        <div class="baby-modal-body">
          <!-- Xem trước Avatar -->
          <div class="baby-preview-card">
            <div class="baby-avatar-ring">
              <img src="${curAvatar}" id="baby-modal-avatar-preview" alt="Avatar bé">
            </div>
            <label class="btn-upload-photo" for="baby-photo-input">
              <span>📷</span>
              <span>Tải Ảnh Thật Của Bé</span>
            </label>
            <input type="file" id="baby-photo-input" accept="image/*" style="display: none;" onchange="BabyProfile._onFileSelected(this)">
          </div>

          <!-- Tên bé -->
          <div class="baby-form-group">
            <label class="baby-form-label" for="baby-name-input">Tên thân mật của bé:</label>
            <div class="baby-input-wrap">
              <span class="baby-input-icon">💖</span>
              <input type="text" id="baby-name-input" class="baby-text-input" placeholder="Ví dụ: Bé Bắp, Miu, Đậu..." value="${safeName}" maxlength="24">
            </div>
          </div>

          <!-- Tuổi của bé -->
          <div class="baby-form-group">
            <label class="baby-form-label">Tuổi của bé:</label>
            <div class="baby-age-selector">
              ${[2, 3, 4, 5, 6].map(a => `
                <button type="button" class="btn-age-pill ${prof.age == a ? 'active' : ''}" onclick="BabyProfile._selectAge(${a}, this)">
                  ${a} Tuổi
                </button>
              `).join('')}
            </div>
            <input type="hidden" id="baby-age-input" value="${prof.age || 3}">
          </div>

          <!-- Chọn Avatar 3D Đáng Yêu -->
          <div class="baby-form-group">
            <label class="baby-form-label">Hoặc chọn bạn đồng hành 3D đáng yêu:</label>
            <div class="baby-presets-grid">
              ${this.PRESET_AVATARS.map(p => `
                <div class="baby-preset-item ${prof.avatarType === 'preset' && prof.presetId === p.id ? 'active' : ''}" 
                     data-id="${p.id}" 
                     onclick="BabyProfile._selectPreset('${p.id}', '${prefix}assets/icons/${p.icon}', this)">
                  <img src="${prefix}assets/icons/${p.icon}" alt="${p.name}" class="baby-preset-img">
                  <span class="baby-preset-name">${p.name.split(' ')[0]}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="baby-modal-actions">
          <button type="button" class="btn-save-profile" onclick="BabyProfile._saveFromModal('${basePath}')">
            <span>✨ Lưu Hồ Sơ Bé ✨</span>
          </button>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
  },

  closeEditModal() {
    const modal = document.getElementById('baby-profile-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  },

  _selectedAge: 3,
  _tempPhotoBase64: null,
  _tempPresetId: 'baby',
  _tempAvatarType: 'preset',

  _selectAge(age, btn) {
    this._selectedAge = age;
    const input = document.getElementById('baby-age-input');
    if (input) input.value = age;
    const parent = btn.parentElement;
    if (parent) {
      parent.querySelectorAll('.btn-age-pill').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
    }
  },

  _selectPreset(presetId, iconUrl, el) {
    this._tempPresetId = presetId;
    this._tempAvatarType = 'preset';
    this._tempPhotoBase64 = null;

    const preview = document.getElementById('baby-modal-avatar-preview');
    if (preview) preview.src = iconUrl;

    const grid = el.parentElement;
    if (grid) {
      grid.querySelectorAll('.baby-preset-item').forEach(item => item.classList.remove('active'));
      el.classList.add('active');
    }
  },

  _onFileSelected(input) {
    if (input.files && input.files[0]) {
      this.compressAndProcessPhoto(input.files[0], (err, base64) => {
        if (err) {
          alert('Không thể xử lý ảnh: ' + (err.message || 'Lỗi'));
          return;
        }
        this._tempPhotoBase64 = base64;
        this._tempAvatarType = 'custom';
        const preview = document.getElementById('baby-modal-avatar-preview');
        if (preview) preview.src = base64;

        // Bỏ chọn preset
        const grid = document.querySelector('.baby-presets-grid');
        if (grid) {
          grid.querySelectorAll('.baby-preset-item').forEach(item => item.classList.remove('active'));
        }
      });
    }
  },

  _saveFromModal(basePath = '') {
    const nameInput = document.getElementById('baby-name-input');
    const ageInput = document.getElementById('baby-age-input');

    const name = nameInput ? nameInput.value.trim() : 'Bé Yêu';
    const age = ageInput ? parseInt(ageInput.value, 10) : 3;

    const current = this.getProfile();
    const updateData = {
      name: name.length > 0 ? name : 'Bé Yêu',
      age: age || 3
    };

    if (this._tempAvatarType === 'custom' && this._tempPhotoBase64) {
      updateData.avatarType = 'custom';
      updateData.photoBase64 = this._tempPhotoBase64;
    } else if (this._tempPresetId) {
      updateData.avatarType = 'preset';
      updateData.presetId = this._tempPresetId;
      updateData.photoBase64 = null;
    }

    this.saveProfile(updateData);
    this.closeEditModal();
    this.renderHeaderWidget('baby-profile-widget', basePath);

    // Phát âm thanh động viên nếu có
    if (typeof ToddlerAudio !== 'undefined') {
      if (ToddlerAudio.playSuccess) {
        ToddlerAudio.playSuccess();
      } else if (ToddlerAudio.playWin) {
        ToddlerAudio.playWin();
      }
    }
  }
};

if (typeof window !== 'undefined') {
  window.BabyProfile = BabyProfile;
}
