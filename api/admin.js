export default function handler(req, res) {
    const cookies = req.headers.cookie || "";
    if (!cookies.includes("auth_session=active_hidz")) {
        return res.status(403).send("<h1>403 Forbidden</h1><p>Akses ini terkunci. Login via URL terlebih dahulu.</p>");
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Admin Dashboard | HIDZ</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-[#050505] text-white font-sans min-h-screen flex items-center justify-center">
            <div class="w-full max-w-md p-8 bg-[#111] border border-blue-900/30 rounded-3xl shadow-2xl">
                <h1 class="text-2xl font-bold text-blue-500 mb-2">Hidz Admin Panel</h1>
                <p class="text-gray-500 text-sm mb-8">Tambahkan URL foto testimoni terbaru.</p>
                
                <div class="space-y-4">
                    <input type="text" id="imgUrl" placeholder="https://files.catbox.moe/..." 
                        class="w-full p-4 bg-black border border-gray-800 rounded-xl focus:border-blue-500 outline-none transition">
                    <button onclick="upload()" id="btn" class="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold transition">
                        Publish Testimoni
                    </button>
                </div>
            </div>

            <script>
                async function upload() {
                    const url = document.getElementById('imgUrl').value;
                    const btn = document.getElementById('btn');
                    if(!url) return alert('Isi URL dulu!');
                    
                    btn.innerText = 'Memproses...';
                    btn.disabled = true;

                    const res = await fetch('/api/add-testi', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ url })
                    });

                    if(res.ok) {
                        alert('Testimoni Berhasil Ditambahkan!');
                        document.getElementById('imgUrl').value = '';
                    } else {
                        alert('Gagal menyimpan ke database.');
                    }
                    btn.innerText = 'Publish Testimoni';
                    btn.disabled = false;
                }
            </script>
        </body>
        </html>
    `);
}