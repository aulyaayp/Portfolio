// ==========================================
// PORTFOLIO JAVASCRIPT - AULYA YULIA PUTRI
// Tema: Soft Yellow & Pink (Pastel Dots & Capsule Header)
// ==========================================

// Konfigurasi Tailwind CSS
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Fredoka"', 'cursive', 'sans-serif'],
        rounded: ['"Fredoka"', 'cursive', 'sans-serif'],
        soft: ['"Fredoka"', 'cursive', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      colors: {
        pastel: {
          pink: {
            50: '#fff5f7',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
          },
          yellow: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#eab308',
          }
        }
      }
    }
  }
};

// Inisialisasi ikon Lucide
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;
  if (action === 'download-cv') {
    handleDownloadCV(event);
  } else if (action === 'copy') {
    copyToClipboard(target.dataset.copyText, target.dataset.copyMessage);
  } else if (action === 'open-project') {
    openProjectModal(Number(target.dataset.projectId));
  } else if (action === 'open-image') {
    openImageModal(target);
  } else if (action === 'close-project') {
    closeProjectModal();
  } else if (action === 'close-image') {
    closeImageModal();
  } else if (action === 'stop-propagation') {
    event.stopPropagation();
  } else if (action === 'email-submit') {
    handleEmailSubmit(event);
  }
});

document.addEventListener('submit', (event) => {
  if (event.target.id === 'contact-form') {
    handleFormSubmit(event);
  }
});

document.addEventListener('error', (event) => {
  const image = event.target;
  if (image instanceof HTMLImageElement && image.dataset.fallback) {
    const fallback = image.dataset.fallback;
    image.removeAttribute('data-fallback');
    image.src = fallback;
  }
}, true);

// Data Detail Studi Kasus Proyek Aulya
const projectDetails = {
  1: {
    title: "AI Productivity and AI API Integration for Developers",
    category: "Web Development & Artificial Intelligence",
    role: "Full-Stack Developer & AI Developer",
    timeline: "10 hari",
    impact: "Developer Productivity & Real-Time AI",
    challenge: "Kebutuhan pemrosesan input pengguna berbasis AI secara real-time dan tuntutan penyelesaian pengembangan aplikasi dalam waktu singkat.",
    solution: "Mengintegrasikan backend Node.js/Express.js dengan Google Gemini API untuk respons instan, serta memanfaatkan AI-assisted development tools untuk mempercepat penulisan kode dan pengujian.",
    tools: ["Node.js", "Google Gemini API", "GitHub", "AI Dev Tools", "Express.js"],
    link: "https://github.com/aulyaayp",
    linkText: "https://github.com/aulyaayp/avpn-batch-26-project"
  },
  2: {
    title: "Integrasi Notes App dengan RESTful API",
    category: "Web Development",
    role: "Web Developer",
    timeline: "1 Bulan",
    impact: "Manajemen Catatan Aman & Real-Time",
    challenge: "Kebutuhan manajemen catatan dinamis yang tersinkronisasi dengan server secara asinkron serta keamanan pembatasan akses halaman berdasarkan status autentikasi pengguna.",
    solution: "Membangun aplikasi web dengan React yang terintegrasi RESTful API untuk operasi CRUD dan pengarsipan, serta menerapkan autentikasi berbasis token dengan protected routes.",
    tools: ["React", "RESTful API", "JavaScripT", "HTML5", "CSS3"],
    link: "https://github.com/aulyaayp",
    linkText: "https://github.com/aulyaayp/Notes-App"
  },
  3: {
    title: "Tracker.io – Aplikasi Web Pencatat Keuangan",
    category: "Web Development",
    role: "Frontend Developer",
    timeline: "1 Bulan",
    impact: "Pelacakan Keuangan Mandiri & Real-Time",
    challenge: "Kebutuhan pencatatan pemasukan dan pengeluaran yang responsif tanpa ketergantungan server, serta sinkronisasi otomatis antara daftar transaksi dengan ringkasan saldo.",
    solution: "Membangun aplikasi web dengan Vanilla JavaScript (ES6+), mengintegrasikan Web Storage API (localStorage) dan Custom Event untuk sinkronisasi data lokal secara real-time, serta fitur pencarian cepat.",
    tools: ["JavaScript (ES6+)", "HTML5", "CSS3", "DOM Manipulation"],
    link: "https://github.com/aulyaayp",
    linkText: "https://github.com/aulyaayp/expense-tracker"
  },
  4: {
    title: "HoldOn — Aplikasi Manajemen Keuangan & Pencegah Belanja Impulsif",
    category: "UI/UX Design",
    role: "UI/UX Designer",
    timeline: "1 Bulan",
    impact: "Pengendalian Belanja Impulsif & Mindful Finance",
    challenge: "Tingginya kebiasaan belanja impulsif akibat keputusan pembelian yang terburu-buru serta kurangnya kesadaran terhadap batas aman pengeluaran harian.",
    solution: "Merancang antarmuka dengan pendekatan Calm UI (palet sage green) yang dilengkapi fitur Cooldown Timer untuk menunda transaksi impulsif, indikator Safe-to-Spend, dan pelacakan Total Money Saved.",
    tools: ["Figma", "UI Design", "UX Research", "Wireframing", "Prototyping"],
    link: "https://github.com/aulyaayp",
    linkText: "https://www.figma.com/proto/l4FYOljZECaADzGBYs1Zn7/project_usb?node-id=323-736&p=f&t=rP511mxZhAI8BoIC-1&scaling=scale-down&content-scaling=fixed&page-id=38%3A30&starting-point-node-id=721%3A8716"
  }
};

// Capsule Navbar Active Tab Controller
const capsuleLinks = document.querySelectorAll('.capsule-link');
capsuleLinks.forEach(link => {
  link.addEventListener('click', () => {
    capsuleLinks.forEach(l => l.classList.remove('active-tab'));
    link.classList.add('active-tab');
  });
});

// Update active tab on scroll
window.addEventListener('scroll', () => {
  const navMap = [
    { id: 'hero', nav: 'hero' },
    { id: 'about', nav: 'about' },
    { id: 'projects', nav: 'projects' },
    { id: 'certifications', nav: 'certifications' },
    { id: 'contact', nav: 'contact' }
  ];

  const scrollPos = window.scrollY + 180;

  for (let i = navMap.length - 1; i >= 0; i--) {
    const el = document.getElementById(navMap[i].id);
    if (el && el.offsetTop <= scrollPos) {
      capsuleLinks.forEach(l => {
        if (l.getAttribute('data-nav') === navMap[i].nav) {
          l.classList.add('active-tab');
        } else {
          l.classList.remove('active-tab');
        }
      });
      break;
    }
  }
});

// Toggle Menu Seluler (Responsive Navbar)
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Filter Kategori Proyek
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active', 'bg-pink-500', 'text-white', 'shadow-sm');
      b.classList.add('text-slate-700', 'hover:text-pink-600');
    });
    btn.classList.add('active', 'bg-pink-500', 'text-white', 'shadow-sm');
    btn.classList.remove('text-slate-700', 'hover:text-pink-600');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Filter Kategori Sertifikasi
const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
const certCards = document.querySelectorAll('.cert-card');

certFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    certFilterBtns.forEach(b => {
      b.classList.remove('active', 'bg-pink-500', 'text-white', 'shadow-sm');
      b.classList.add('text-slate-700', 'hover:text-pink-600');
    });
    btn.classList.add('active', 'bg-pink-500', 'text-white', 'shadow-sm');
    btn.classList.remove('text-slate-700', 'hover:text-pink-600');

    const filter = btn.getAttribute('data-cert-filter');
    certCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-cert-category') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Salin Teks ke Clipboard
function copyToClipboard(text, message) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showToast(message);
  } catch (err) {
    showToast("Gagal menyalin teks secara otomatis.");
  }
  document.body.removeChild(tempInput);
}

// Tampilkan Notifikasi Toast
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3500);
}

// Download CV Action
function handleDownloadCV(e) {
  if (e) e.preventDefault();
  const a = document.createElement('a');
  a.href = 'CV-AulyaYuliaPutri.pdf';
  a.download = 'CV-AulyaYuliaPutri.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("Mengunduh CV Aulya Yulia Putri (PDF)...");
}

// Modal Rincian Studi Kasus
function openProjectModal(projectId) {
  const data = projectDetails[projectId];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const container = document.getElementById('modal-content');
  if (!modal || !container) return;

  let toolsHtml = data.tools.map(t => `<span class="px-2.5 py-1 bg-pink-50 text-pink-700 border border-pink-200 rounded-lg text-xs font-mono font-medium">${t}</span>`).join('');

  container.innerHTML = `
    <div class="flex items-center justify-between pr-8">
      <span class="text-xs font-mono text-pink-600 uppercase tracking-wider block font-semibold">${data.category}</span>
      <span class="text-xs font-mono text-slate-600 bg-yellow-100 border border-yellow-200 px-2 py-0.5 rounded-md text-amber-900 font-semibold">${data.timeline}</span>
    </div>
    <h3 class="text-xl font-semibold text-slate-900 mt-1">${data.title}</h3>
    
    <div class="flex items-center gap-2 text-xs font-mono text-pink-700 font-medium">
      <i data-lucide="user-check" class="w-4 h-4 text-pink-500"></i>
      <span>Peran: ${data.role}</span>
    </div>

    <div class="p-3.5 bg-yellow-50 border-2 border-yellow-200 rounded-xl text-slate-800 text-xs font-sans leading-relaxed shadow-xs">
      <strong class="text-pink-600 font-mono">Highlight Dampak:</strong> ${data.impact}
    </div>

    <div class="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
      <div class="p-3 bg-pink-50/60 rounded-xl border border-pink-200">
        <h4 class="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
          <i data-lucide="alert-circle" class="w-4 h-4 text-pink-500"></i> Tantangan Kebutuhan:
        </h4>
        <p class="text-slate-600">${data.challenge}</p>
      </div>
      <div class="p-3 bg-yellow-50/60 rounded-xl border border-yellow-200">
        <h4 class="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
          <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500"></i> Pendekatan & Eksekusi:
        </h4>
        <p class="text-slate-600">${data.solution}</p>
      </div>
    </div>

    <div class="pt-3 border-t border-pink-200 space-y-3">
      <div>
        <span class="text-xs font-mono text-slate-500 block mb-2 font-semibold">Perangkat & Teknologi:</span>
        <div class="flex flex-wrap gap-2">
          ${toolsHtml}
        </div>
      </div>

      <div class="pt-2 flex flex-wrap gap-3">
        <a href="${data.link}" target="_blank" rel="noreferrer" class="px-4 py-2.5 bg-pink-500 hover:bg-pink-600 rounded-xl text-xs font-semibold text-white flex items-center gap-2 transition shadow-sm">
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          <span>${data.linkText}</span>
        </a>
        <button onclick="closeProjectModal()" class="px-4 py-2.5 bg-white hover:bg-pink-50 border border-pink-200 rounded-xl text-xs font-semibold text-pink-700 transition">
          Tutup Rincian
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.add('hidden');
}

// Lightbox Gambar Dokumentasi
function openImageModal(el) {
  const img = el.querySelector('img');
  const caption = el.querySelector('h4') ? el.querySelector('h4').innerText : '';
  const modal = document.getElementById('image-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (modal && lightboxImg && lightboxCaption && img) {
    lightboxImg.src = img.src;
    lightboxCaption.innerText = caption;
    modal.classList.remove('hidden');
  }
}

function closeImageModal() {
  const modal = document.getElementById('image-modal');
  if (modal) modal.classList.add('hidden');
}

// Penanganan Formulir via Email Client
function handleEmailSubmit(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('form-name').value.trim();
  const contact = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !message) {
    showToast('Silakan isi Nama dan Pesan Anda terlebih dahulu.');
    return;
  }

  const mailSubject = encodeURIComponent(subject || `Pesan Portofolio dari ${name}`);
  const mailBody = encodeURIComponent(`Nama Pengirim: ${name}\nKontak: ${contact}\n\nPesan:\n${message}`);
  window.location.href = `mailto:putriaulyayulia@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  showToast('Membuka aplikasi email...');
}

function handleFormSubmit(e) {
  if (e) e.preventDefault();
  handleEmailSubmit(e);
}

// Inisialisasi Drag-to-Scroll
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.scroll-touch-horizontal');
  sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active-dragging');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active-dragging');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active-dragging');
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.6;
      slider.scrollLeft = scrollLeft - walk;
    });
  });
});
