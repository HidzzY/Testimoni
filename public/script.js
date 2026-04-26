AOS.init({ 
    once: true,
    duration: 800 
});

async function loadTesti() {
    const gallery = document.getElementById('gallery');
    
    try {
        const res = await fetch('/api/get-all');
        
        if (!res.ok) throw new Error("API tidak merespon atau belum di-deploy");

        const data = await res.json();

        if (!data || data.length === 0) {
            console.log("Belum ada data di database Supabase.");
            return;
        }

        data.forEach(item => {
            if (item.image_url) {
                const div = document.createElement('div');
                div.className = "testi-card group relative overflow-hidden rounded-xl bg-gray-900 border border-white/5 shadow-xl";
                div.setAttribute('data-aos', 'fade-up');
                
                div.innerHTML = `
                    <img src="${item.image_url}" 
                         alt="Testimoni Hidz" 
                         class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                         onerror="this.parentElement.style.display='none'">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                `;
                
                gallery.appendChild(div);
            }
        });

        setTimeout(() => {
            AOS.refresh();
        }, 100);

    } catch (e) { 
        console.error("Gagal memuat data:", e.message);
    }
}

// Jalankan fungsi saat halaman dibuka
document.addEventListener('DOMContentLoaded', loadTesti);
