document.addEventListener('DOMContentLoaded', function() {
    // Calendar Functionality
    let currentDate = new Date();
    const monthYearElement = document.getElementById('monthYear');
    const calendarGrid = document.getElementById('calendarGrid');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        
        // Set month/year header
        monthYearElement.textContent = currentDate.toLocaleDateString('id-ID', { 
            month: 'long', 
            year: 'numeric' 
        });
        
        // Day headers
        const dayNames = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });

        // Get days in month
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startDay = firstDay.getDay();
        const totalDays = lastDay.getDate();
        
        // Previous month days
        for (let i = 0; i < startDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day other-month';
            calendarGrid.appendChild(dayElement);
        }

        // Current month days
        const today = new Date();
        for (let i = 1; i <= totalDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = i;
            
            // Highlight today
            if (i === today.getDate() && 
                currentDate.getMonth() === today.getMonth() && 
                currentDate.getFullYear() === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Mark event days (example: 5th, 10th, 15th, etc.)
            if (i % 5 === 0) {
                dayElement.classList.add('has-event');
                dayElement.addEventListener('click', () => {
                    alert(`Event pada tanggal ${i} ${monthYearElement.textContent}`);
                });
            }
            
            calendarGrid.appendChild(dayElement);
        }

        // Next month days
        const daysShown = startDay + totalDays;
        const remainingCells = 42 - daysShown; // 6 weeks
        for (let i = 1; i <= remainingCells; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day other-month';
            dayElement.textContent = i;
            calendarGrid.appendChild(dayElement);
        }
    }

    // Calendar navigation
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Initial calendar render
    renderCalendar();

    // Tab System
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('[id$="-tab"]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Hide all content
            tabContents.forEach(content => {
                content.classList.remove('active-tab');
            });
            
            // Show selected content
            const tabId = tab.dataset.tab;
            document.getElementById(`${tabId}-tab`).classList.add('active-tab');
        });
    });

    // Sample Events Data
    const events = {
        upcoming: [
            {
                title: "Aksi Bersih Pantai Ancol",
                date: "15 Jun 2023",
                category: "Beach Cleanup",
                description: "Mari bersama-sama membersihkan pantai Ancol dari sampah plastik dan limbah lainnya.",
                location: "Pantai Ancol, Jakarta",
                time: "08:00 - 12:00",
                participants: "50 orang",
                image: "🏖️"
            },
            {
                title: "Workshop Daur Ulang Kreatif",
                date: "22 Jun 2023",
                category: "Workshop",
                description: "Belajar membuat kerajinan dari bahan daur ulang bersama para ahli.",
                location: "Green Hub Jakarta",
                time: "13:00 - 16:00",
                participants: "30 orang",
                image: "♻️"
            }
        ],
        past: [
            {
                title: "Penanaman 1000 Pohon",
                date: "5 Mei 2023",
                category: "Tree Planting",
                description: "Kegiatan penanaman pohon di area hijau Jakarta Selatan.",
                location: "Jakarta Selatan",
                time: "07:00 - 11:00",
                participants: "100 orang",
                image: "🌳"
            },
            {
                title: "Webinar Perubahan Iklim",
                date: "28 Apr 2023",
                category: "Webinar",
                description: "Diskusi online tentang dampak perubahan iklim dan solusinya.",
                location: "Online",
                time: "19:00 - 21:00",
                participants: "200 orang",
                image: "🌍"
            }
        ]
    };

    // Render Events
    function renderEvents() {
        const upcomingContainer = document.getElementById('upcomingEvents');
        const pastContainer = document.getElementById('pastEvents');
        
        // Render upcoming events
        events.upcoming.forEach(event => {
            upcomingContainer.appendChild(createEventCard(event));
        });
        
        // Render past events
        events.past.forEach(event => {
            pastContainer.appendChild(createEventCard(event, false));
        });
    }
    
    function createEventCard(event, isUpcoming = true) {
        const card = document.createElement('div');
        card.className = 'event-card';
        
        card.innerHTML = `
            <div class="event-date">${event.date}</div>
            <div class="event-image">${event.image}</div>
            <div class="event-content">
                <span class="event-category">${event.category}</span>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-details">
                    <div class="event-detail">
                        <span>📍</span>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-detail">
                        <span>⏰</span>
                        <span>${event.time}</span>
                    </div>
                    <div class="event-detail">
                        <span>👥</span>
                        <span>${event.participants}</span>
                    </div>
                </div>
                ${isUpcoming ? 
                    `<button class="register-btn" data-event="${event.title}">Daftar Sekarang</button>` : 
                    `<button class="register-btn" disabled>Event Selesai</button>`}
            </div>
        `;
        
        return card;
    }

    // Initial events render
    renderEvents();

    // Modal Functionality
    const modal = document.getElementById('registrationModal');
    const modalClose = document.getElementById('modalClose');
    
    // Event delegation for register buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('register-btn')) {
            const eventTitle = e.target.dataset.event;
            openRegistrationModal(eventTitle);
        }
    });
    
    function openRegistrationModal(eventTitle) {
        document.getElementById('modalTitle').textContent = `Pendaftaran: ${eventTitle}`;
        
        // Create form dynamically
        const form = document.getElementById('registrationForm');
        form.innerHTML = `
            <div class="form-group">
                <label for="name">Nama Lengkap*</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email*</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="phone">Nomor WhatsApp*</label>
                <input type="tel" id="phone" name="phone" required>
            </div>
            <div class="form-group">
                <label for="notes">Catatan (opsional)</label>
                <textarea id="notes" name="notes"></textarea>
            </div>
            <button type="submit" class="submit-btn">Kirim Pendaftaran</button>
        `;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih! Pendaftaran Anda telah berhasil dikirim.');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.reset();
    });
});