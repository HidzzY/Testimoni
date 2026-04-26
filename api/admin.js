export default function handler(req, res) {
    const cookies = req.headers.cookie || "";
    
    if (!cookies.includes("auth_session=active_hidz")) {
        res.setHeader('Content-Type', 'text/html');
        return res.status(404).send(`
<!DOCTYPE html><html lang="id"><head>    <meta charset="UTF-8">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <meta name="robots" content="noindex, nofollow">    <title>404 Not Found - HidzOrder</title>        <link rel="preconnect" href="https://fonts.googleapis.com">    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style> :root { --bg-color: #0f172a; --primary-color: #60a5fa; --text-color: #cbd5e1; --header-text-color: #f8fafc; --white-color: #1e293b; --border-color: #334155; --soft-blue-bg: rgba(96, 165, 250, 0.1); --card-bg: rgba(30, 41, 59, 0.7); --card-border: rgba(51, 65, 85, 0.5); --easter-egg-bg: #f8fafc; --easter-egg-text: #1e293b; } * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: 'Poppins', sans-serif; background-color: var(--bg-color); color: var(--text-color); display: flex; justify-content: center; align-items: center; padding: 20px; position: relative; overflow: hidden; height: 100vh; } .animated-bg { position: absolute; top: -5%; left: -5%; width: 110%; height: 110%; z-index: 0; transition: transform 0.2s; } .shape { position: absolute; border-radius: 50%; background: var(--soft-blue-bg); animation: move 30s infinite ease-in-out; } .shape1 { width: 450px; height: 450px; top: -150px; left: -150px; } .shape2 { width: 550px; height: 550px; bottom: -200px; right: -250px; } @keyframes move { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(10vw, 20vh) scale(1.1); } } .main-content { position: relative; z-index: 2; text-align: center; padding: 2.5rem; background: var(--card-bg); backdrop-filter: blur(12px); border-radius: 16px; border: 1px solid var(--card-border); animation: fadeIn 0.8s ease-out; } .error-code { font-size: 8rem; font-weight: 700; background: linear-gradient(45deg, var(--primary-color), #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; cursor: pointer; } .home-button { display: inline-block; background-color: var(--primary-color); color: #0f172a; padding: 12px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; margin-top: 20px; } .easter-egg-msg { position: fixed; background: white; color: black; padding: 8px 15px; border-radius: 20px; font-size: 0.8rem; pointer-events: none; z-index: 100; opacity: 0; transition: 0.3s; } .show { opacity: 1; } @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } </style></head><body>
    <div class="animated-bg"><div class="shape shape1"></div><div class="shape shape2"></div></div>
    <main class="main-content">
        <div class="error-code">404</div>
        <p style="margin: 20px 0; line-height: 1.6;">Oops! Halaman tidak ditemukan.<br>File mungkin rusak atau sudah dihapus oleh admin.</p>
        <a href="/" class="home-button">Kembali ke Beranda</a>
    </main>
    <script>
        const codes = document.querySelector('.error-code');
        const msgs = ["Nyari apa hayoo?", "Gak ada apa-apa di sini...", "404: Harapan tidak ditemukan.", "Coba lagi tahun depan.", "Wahid lagi tidur, jangan diganggu."];
        codes.addEventListener('click', (e) => {
            const m = document.createElement('div');
            m.className = 'easter-egg-msg show';
            m.textContent = msgs[Math.floor(Math.random() * msgs.length)];
            m.style.left = e.clientX + 'px'; m.style.top = e.clientY + 'px';
            document.body.appendChild(m);
            setTimeout(() => m.remove(), 2000);
        });
    </script>
</body></html>
        `);
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
            <div class="w-full max-w-md p-10 glass rounded-[2.5rem] shadow-2xl">
                <div class="flex items-center gap-3 mb-8">
                    <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h1 class="text-xl font-bold tracking-tight text-blue-400">HIDZ SYSTEM ACTIVE</h1>
                </div>
                
                <div class="space-y-6">
                    <div>
                        <label class="text-xs uppercase tracking-widest text-gray-500 mb-2 block ml-1">Testimony URL</label>
                        <input type="text" id="imgUrl" placeholder="Paste catbox URL here..." 
                            class="w-full p-4 bg-black/40 border border-gray-800 rounded-2xl focus:border-blue-500 outline-none transition-all text-sm">
                    </div>
                    
                    <button onclick="upload()" id="btn" class="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-900/20">
                        PUBLISH DATA
                    </button>
                    
                    <button onclick="location.href='/'" class="w-full py-3 text-gray-500 text-xs hover:text-white transition">
                        View Public Website
                    </button>
                </div>
            </div>

            <script>
                async function upload() {
                    const url = document.getElementById('imgUrl').value;
                    const btn = document.getElementById('btn');
                    if(!url) return alert('Input tidak boleh kosong!');
                    
                    btn.innerText = 'SYNCING...';
                    btn.disabled = true;

                    const res = await fetch('/api/add-testi', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ url })
                    });

                    if(res.ok) {
                        alert('Database Updated!');
                        document.getElementById('imgUrl').value = '';
                    } else {
                        alert('Server Error.');
                    }
                    btn.innerText = 'PUBLISH DATA';
                    btn.disabled = false;
                }
            </script>
        </body>
        </html>
    `);
}
