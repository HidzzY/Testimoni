AOS.init({ once: true });

async function loadTesti() {
    try {
        const res = await fetch('/api/get-all');
        const data = await res.json();
        const gallery = document.getElementById('gallery');

        data.forEach(item => {
            const div = document.createElement('div');
            div.className = "testi-card";
            div.setAttribute('data-aos', 'fade-up');
            div.innerHTML = `<img src="${item.image_url}" class="w-full rounded-xl">`;
            gallery.appendChild(div);
        });
    } catch (e) { console.log("Belum ada data tambahan."); }
}

loadTesti();