// ===== GLOBAL FUNCTIONS =====

// Mobile Navigation Toggle (sederhana)
function setupMobileNav() {
    const header     = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks   = document.querySelector('.nav-links');
    const body       = document.body;
  
    if (!mobileToggle || !header || !navLinks) return;
  
    // Saat hamburger diklik, toggle kelas 'active' dan 'no-scroll'
    mobileToggle.addEventListener('click', () => {
      header.classList.toggle('active');
      navLinks.classList.toggle('active');
      body.classList.toggle('no-scroll');
      mobileToggle.classList.toggle('open'); // untuk animasi X
    });
  
    // Saat klik salah satu link nav, tutup menu
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('no-scroll');
        mobileToggle.classList.remove('open');
      });
    });
  
    // Jika klik di luar header (area page lain), tutup menu juga
    document.addEventListener('click', function(event) {
      // Jika elemen yang diklik bukan header, nav-links, atau toggle button
      if (
        !header.contains(event.target) &&
        !mobileToggle.contains(event.target) &&
        navLinks.classList.contains('active')
      ) {
        header.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('no-scroll');
        mobileToggle.classList.remove('open');
      }
    });
  }
  
  // Smooth Scrolling for Anchor Links
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        // Abaikan jika href="#" saja
        if (this.getAttribute('href') === '#') return;
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
  
  // Tab Navigation System
  function setupTabSystem() {
    const tabs        = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabs.length === 0 || tabContents.length === 0) return;
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Hapus kelas 'active' dari semua tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Hapus kelas 'active' dari semua konten
        tabContents.forEach(content => content.classList.remove('active'));
  
        // Ambil ID tujuan dari onclick, misalnya onclick="showTab('section1')"
        const onclickVal = tab.getAttribute('onclick') || '';
        const match = onclickVal.match(/'(.*?)'/);
        if (match && match[1]) {
          const tabId = match[1];
          const targetContent = document.getElementById(tabId);
          if (targetContent) {
            targetContent.classList.add('active');
          }
        }
      });
    });
  }
  
  // Statistik Counter Animation
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const duration = 3000; // 3 detik
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const startTime = performance.now();
  
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(progress * target);
        counter.textContent = currentValue.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }
  
      requestAnimationFrame(updateCounter);
    });
  }
  
  // Intersection Observer for Stats Section
  function setupIntersectionObserver() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    observer.observe(statsSection);
  }
  
  // ===== LANDING SLIDER =====
  function setupLandingSlider() {
    const landingSliderElement = document.getElementById('landing-slider');
    const landingImages = [
      'url("../images/slider-bg-1.jpg")',
      'url("../images/slider-bg-2.jpg")',
      'url("../images/slider-bg-3.png")'
    ];
    let index = 0;
  
    if (!landingSliderElement || landingImages.length === 0) return;
  
    landingSliderElement.style.backgroundImage = landingImages[0];
    setInterval(() => {
      index = (index + 1) % landingImages.length;
      landingSliderElement.style.backgroundImage = landingImages[index];
    }, 5000);
  }
  
  // ===== GREETINGS SLIDER =====
  function setupGreetingsSlider() {
    const slides = document.querySelectorAll('.greetings-slide');
    const navBtns = document.querySelectorAll('.greetings-nav button');
    let currentIndex = 0;
  
    if (slides.length === 0 || navBtns.length < 2) return;
  
    function showSlide(i) {
      slides.forEach(slide => slide.classList.remove('active'));
      currentIndex = (i + slides.length) % slides.length;
      slides[currentIndex].classList.add('active');
    }
  
    // Prev
    navBtns[0].addEventListener('click', () => {
      showSlide(currentIndex - 1);
    });
    // Next
    navBtns[1].addEventListener('click', () => {
      showSlide(currentIndex + 1);
    });
  
    // Inisialisasi slide pertama
    showSlide(0);
  }
  
  // ===== EVENT DETAIL MODAL =====
  function setupEventModal() {
    const modal       = document.getElementById('detailModal');
    const modalClose  = document.getElementById('modalClose');
    const eventData   = {
      "Workshop Daur Ulang": {
        title: "Workshop Daur Ulang",
        date: "28 September 2023",
        status: "confirmed",
        location: "Ruang Serbaguna Green Circle, Jakarta",
        time: "13.00 - 16.00 WIB",
        desc: "Workshop ini akan mengajarkan teknik dasar daur ulang sampah plastik menjadi produk yang berguna. Peserta akan mendapatkan kit daur ulang gratis.",
        notes: "Anda sudah terdaftar sebagai peserta. Silakan datang 30 menit sebelum acara dengan membawa bukti pendaftaran.",
        image: "../images/workshop-thumb.jpg"
      },
      "Aksi Bersih Pantai": {
        title: "Aksi Bersih Pantai",
        date: "15 Oktober 2023",
        status: "completed",
        location: "Pantai Ancol, Jakarta",
        time: "07.00 - 11.00 WIB",
        desc: "Aksi bersih-bersih pantai bersama komunitas dan relawan. Kami akan mengumpulkan dan memilah sampah plastik di sepanjang pantai.",
        notes: "Anda telah berpartisipasi dalam event ini. Terima kasih atas kontribusinya!",
        image: "../images/beach-thumb.jpg"
      },
      "Penanaman Pohon": {
        title: "Penanaman Pohon",
        date: "5 November 2023",
        status: "pending",
        location: "Hutan Kota, Bandung",
        time: "08.00 - 12.00 WIB",
        desc: "Kegiatan penanaman 1000 pohon endemik untuk memulihkan ekosistem hutan kota. Setiap peserta akan menanam minimal 5 pohon.",
        notes: "Pendaftaran Anda sedang diproses. Kami akan mengirimkan konfirmasi via email maksimal 3 hari sebelum acara.",
        image: "../images/tree-thumb.jpg"
      }
    };
  
    if (!modal || !modalClose) return;
  
    document.querySelectorAll('.detail-btn').forEach(button => {
      button.addEventListener('click', function() {
        const eventTitle = this.closest('.history-card').querySelector('h3').textContent.trim();
        const eventObj = eventData[eventTitle];
        if (!eventObj) return;
  
        // Isi data ke modal
        document.getElementById('detailEventTitle').textContent    = eventObj.title;
        document.getElementById('detailEventDate').textContent     = eventObj.date;
        document.getElementById('detailEventLocation').textContent = eventObj.location;
        document.getElementById('detailEventTime').textContent     = eventObj.time;
        document.getElementById('detailEventDesc').textContent     = eventObj.desc;
        document.getElementById('detailEventNotes').textContent    = eventObj.notes;
  
        const statusElement = document.getElementById('detailEventStatus');
        statusElement.textContent = 
          eventObj.status === 'confirmed' ? 'Terkonfirmasi' :
          eventObj.status === 'completed' ? 'Selesai' :
          'Menunggu Konfirmasi';
        statusElement.className = 'event-status ' + eventObj.status;
  
        const thumb = document.querySelector('.event-thumbnail');
        if (thumb) {
          thumb.src = eventObj.image;
          thumb.alt = eventObj.title;
        }
  
        // Tampilkan modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
  
    // Tutup modal kalau klik tombol close
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  
    // Tutup modal kalau klik area di luar isi modal
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  
    // Download & Cancel (opsional)
    document.querySelector('.download-btn')?.addEventListener('click', () => {
      alert('Fitur download tiket akan segera tersedia!');
    });
    document.querySelector('.cancel-btn')?.addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin membatalkan pendaftaran untuk event ini?')) {
        alert('Pendaftaran telah dibatalkan. Anda bisa mendaftar lagi nanti jika masih tersedia kuota.');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // ===== FORM VALIDATION =====
  function setupFormValidation() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        this.querySelectorAll('[required]').forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
          } else {
            field.style.borderColor = '';
          }
        });
        if (isValid) {
          alert('Terima kasih! Formulir Anda telah berhasil dikirim.');
          this.reset();
        } else {
          alert('Silakan lengkapi semua field yang wajib diisi.');
        }
      });
    });
  }
  
  // ===== INITIALIZE ALL FUNCTIONALITIES =====
  document.addEventListener('DOMContentLoaded', () => {
    setupMobileNav();
    setupSmoothScrolling();
    setupTabSystem();
    setupIntersectionObserver();
    setupLandingSlider();
    setupGreetingsSlider();
    setupEventModal();
    setupFormValidation();
  
    // Jika ada hash pada URL, aktifkan tab yang sesuai
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
      document.getElementById(hash).classList.add('active');
      document.querySelector(`[onclick*="${hash}"]`)?.classList.add('active');
    }
  });
  
