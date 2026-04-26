AOS.init({ once: true, duration: 800 });

async function loadTesti() {
    const gallery = document.getElementById('gallery');
    
    try {
        const res = await fetch('/api/get-all');
        const data = await res.json();

        if (!data || data.length === 0) return;

        gallery.innerHTML = '';

        data.forEach(item => {
            const dateObj = item.created_at ? new Date(item.created_at) : new Date();
            const timeStr = dateObj.toLocaleString('id-ID', {
                day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            const div = document.createElement('div');
            div.className = "group bg-[#0f0f0f] border border-white/5 rounded-3xl overflow-hidden shadow-2xl hover:border-blue-500/50 transition-all duration-500";
            div.setAttribute('data-aos', 'fade-up');
            
            div.innerHTML = `
                <div class="relative w-full aspect-[4/3] overflow-hidden bg-gray-900">
                    <img src="${item.image_url}" 
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         onerror="this.parentElement.parentElement.remove()">
                    <div class="absolute top-3 right-3 bg-blue-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">PAID</div>
                </div>
                
                <div class="p-5 space-y-3 text-left">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-[10px] text-gray-500 uppercase tracking-widest">Layanan</p>
                            <h4 class="text-sm font-bold text-blue-400">${item.layanan || 'Social Media Service'}</h4>
                        </div>
                        <div class="text-right">
                            <p class="text-[10px] text-gray-500 uppercase tracking-widest">Jumlah</p>
                            <h4 class="text-sm font-bold">${item.jumlah || '-'}</h4>
                        </div>
                    </div>
                    
                    <div class="pt-3 border-t border-white/5 flex justify-between items-center">
                        <div>
                            <p class="text-[10px] text-gray-500 uppercase tracking-widest">Total Bayar</p>
                            <h4 class="text-md font-black text-green-500">Rp ${item.price || '0'}</h4>
                        </div>
                        <div class="text-right">
                            <p class="text-[10px] text-gray-400 font-mono italic">${timeStr}</p>
                        </div>
                    </div>
                </div>
            `;
            gallery.appendChild(div);
        });

        setTimeout(() => { AOS.refresh(); }, 100);

    } catch (e) { 
        console.error("Gagal memuat data:", e.message);
    }
}

document.addEventListener('DOMContentLoaded', loadTesti);
