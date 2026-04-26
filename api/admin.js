export default function handler(req, res) {
    const cookies = req.headers.cookie || "";
    const isAuthenticated = cookies.includes("auth_session=active_hidz");

    if (!isAuthenticated) {
        res.setHeader('Content-Type', 'text/html');
        return res.status(403).send(``);
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Admin Dashboard | HIDZ</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                body { background: radial-gradient(circle at top right, #0a0f1e, #050505); }
                .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }
            </style>
        </head>
        <body class="text-white font-sans min-h-screen flex items-center justify-center p-6">
            <div class="w-full max-w-lg p-10 glass rounded-[2.5rem] shadow-2xl">
                <div class="flex items-center gap-3 mb-8">
                    <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h1 class="text-xl font-bold tracking-tight text-blue-400">HIDZ INPUT SYSTEM</h1>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <label class="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block ml-1">Image URL</label>
                        <input type="text" id="imgUrl" placeholder="https://files.catbox.moe/..." class="w-full p-4 bg-black/40 border border-gray-800 rounded-2xl focus:border-blue-500 outline-none transition text-sm">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block ml-1">Layanan</label>
                        <input type="text" id="layanan" placeholder="Contoh: Instagram Followers" class="w-full p-4 bg-black/40 border border-gray-800 rounded-2xl focus:border-blue-500 outline-none transition text-sm">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block ml-1">Jumlah</label>
                            <input type="text" id="jumlah" placeholder="1000" class="w-full p-4 bg-black/40 border border-gray-800 rounded-2xl focus:border-blue-500 outline-none transition text-sm">
                        </div>
                        <div>
                            <label class="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block ml-1">Harga (Rp)</label>
                            <input type="text" id="price" placeholder="6.000" class="w-full p-4 bg-black/40 border border-gray-800 rounded-2xl focus:border-blue-500 outline-none transition text-sm">
                        </div>
                    </div>
                    
                    <button onclick="upload()" id="btn" class="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold mt-4 shadow-lg shadow-blue-900/20">PUBLISH TESTIMONI</button>
                    
                    <button onclick="logout()" class="w-full py-3 text-gray-500 text-xs hover:text-red-400">Logout</button>
                </div>
            </div>

            <script>
                async function upload() {
                    const btn = document.getElementById('btn');
                    const payload = {
                        url: document.getElementById('imgUrl').value,
                        layanan: document.getElementById('layanan').value,
                        jumlah: document.getElementById('jumlah').value,
                        price: document.getElementById('price').value
                    };

                    if(!payload.url || !payload.layanan) return alert('URL & Layanan wajib diisi!');
                    
                    btn.innerText = 'SYNCING...';
                    btn.disabled = true;

                    const res = await fetch('/api/add-testi', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if(res.ok) {
                        alert('Berhasil!');
                        location.reload();
                    } else {
                        alert('Gagal!');
                    }
                }
                function logout() {
                    document.cookie = "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.href = '/';
                }
            </script>
        </body>
        </html>
    `);
}
