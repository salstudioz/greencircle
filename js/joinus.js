document.addEventListener('DOMContentLoaded', function() {
    // Data contoh event (bisa diganti dengan data dari API/database)
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

    // Event listener untuk tombol detail
    document.querySelectorAll('.detail-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventTitle = this.closest('.history-card').querySelector('h3').textContent;
            showEventDetail(eventTitle);
        });
    });

    // Event listener untuk tombol close modal
    document.getElementById('modalClose').addEventListener('click', closeModal);

    // Fungsi untuk menampilkan detail event
    function showEventDetail(eventTitle) {
        const event = eventData[eventTitle];
        if (!event) return;

        // Isi data ke modal
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
        
        // Update gambar (jika ada)
        if (event.image) {
            document.querySelector('.event-thumbnail').src = event.image;
            document.querySelector('.event-thumbnail').alt = event.title;
        }

        // Tampilkan modal
        document.getElementById('detailModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Fungsi untuk menutup modal
    function closeModal() {
        document.getElementById('detailModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Tutup modal ketika klik di luar konten
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('detailModal')) {
            closeModal();
        }
    });

    // Fungsi untuk tombol download (contoh)
    document.querySelector('.download-btn')?.addEventListener('click', function() {
        alert('Fitur download tiket akan segera tersedia!');
    });

    // Fungsi untuk tombol cancel (contoh)
    document.querySelector('.cancel-btn')?.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin membatalkan pendaftaran untuk event ini?')) {
            alert('Pendaftaran telah dibatalkan. Anda bisa mendaftar lagi nanti jika masih tersedia kuota.');
            closeModal();
        }
    });
});