// ===== GLOBAL FUNCTIONS =====

// Mobile Navigation Toggle
function setupMobileNav() {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            header.classList.toggle('active');
        });
    }
}

// Smooth Scrolling for Anchor Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Tab Navigation System
function setupTabSystem() {
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Hide all content
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected content
            const tabId = tab.getAttribute('onclick').match(/'(.*?)'/)[1];
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const duration = 3000;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ===== LANDING SLIDER =====
function setupLandingSlider() {
    const landingSliderElement = document.getElementById('landing-slider');
    const landingImages = [
        'url("../images/slider-bg-1.jpg")',
        'url("../images/slider-bg-2.jpg")',
        'url("../images/slider-bg-3.png")'
    ];
    let currentLandingImageIndex = 0;

    function changeLandingBackground() {
        if (!landingSliderElement || landingImages.length === 0) return;
        currentLandingImageIndex = (currentLandingImageIndex + 1) % landingImages.length;
        landingSliderElement.style.backgroundImage = landingImages[currentLandingImageIndex];
    }

    if (landingSliderElement && landingImages.length > 0) {
        landingSliderElement.style.backgroundImage = landingImages[0];
        setInterval(changeLandingBackground, 5000);
    }
}

// ===== GREETINGS SLIDER =====
function setupGreetingsSlider() {
    let currentGreetingSlideIndex = 0;
    const greetingSlides = document.querySelectorAll('.greetings-slide');
    const greetingNavButtons = document.querySelectorAll('.greetings-nav button');

    function showGreetingSlide(index) {
        if (greetingSlides.length === 0) return;
        greetingSlides.forEach((slide) => {
            slide.classList.remove('active');
        });
        currentGreetingSlideIndex = (index + greetingSlides.length) % greetingSlides.length;
        greetingSlides[currentGreetingSlideIndex].classList.add('active');
    }

    if (greetingNavButtons.length === 2) {
        greetingNavButtons[0].addEventListener('click', function() {
            showGreetingSlide(currentGreetingSlideIndex - 1);
        });
        greetingNavButtons[1].addEventListener('click', function() {
            showGreetingSlide(currentGreetingSlideIndex + 1);
        });
    }

    if (greetingSlides.length > 0) {
        showGreetingSlide(0);
    }
}

// ===== EVENT DETAIL MODAL =====
function setupEventModal() {
    const modal = document.getElementById('detailModal');
    const modalClose = document.getElementById('modalClose');
    
    // Event data
    const eventData = {
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

    // Event listener for detail buttons
    document.querySelectorAll('.detail-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventTitle = this.closest('.history-card').querySelector('h3').textContent;
            showEventDetail(eventTitle);
        });
    });

    // Show event detail in modal
    function showEventDetail(eventTitle) {
        const event = eventData[eventTitle];
        if (!event) return;

        // Fill modal with event data
        document.getElementById('detailEventTitle').textContent = event.title;
        document.getElementById('detailEventDate').textContent = event.date;
        document.getElementById('detailEventLocation').textContent = event.location;
        document.getElementById('detailEventTime').textContent = event.time;
        document.getElementById('detailEventDesc').textContent = event.desc;
        document.getElementById('detailEventNotes').textContent = event.notes;
        
        // Update status
        const statusElement = document.getElementById('detailEventStatus');
        statusElement.textContent = 
            event.status === 'confirmed' ? 'Terkonfirmasi' :
            event.status === 'completed' ? 'Selesai' : 'Menunggu Konfirmasi';
        statusElement.className = 'event-status ' + event.status;
        
        // Update image
        if (event.image) {
            document.querySelector('.event-thumbnail').src = event.image;
            document.querySelector('.event-thumbnail').alt = event.title;
        }

        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close button
    modalClose.addEventListener('click', closeModal);

    // Download button
    document.querySelector('.download-btn')?.addEventListener('click', function() {
        alert('Fitur download tiket akan segera tersedia!');
    });

    // Cancel button
    document.querySelector('.cancel-btn')?.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin membatalkan pendaftaran untuk event ini?')) {
            alert('Pendaftaran telah dibatalkan. Anda bisa mendaftar lagi nanti jika masih tersedia kuota.');
            closeModal();
        }
    });
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
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
document.addEventListener('DOMContentLoaded', function() {
    setupMobileNav();
    setupSmoothScrolling();
    setupTabSystem();
    setupIntersectionObserver();
    setupLandingSlider();
    setupGreetingsSlider();
    setupEventModal();
    setupFormValidation();
    
    // Set active tab based on URL hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        document.getElementById(hash).classList.add('active');
        document.querySelector(`[onclick*="${hash}"]`).classList.add('active');
    }
});
