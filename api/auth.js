import { serialize } from 'cookie';

export default function handler(req, res) {
    const { user, pass } = req.query;

    if (user === "wahidzzz" && pass === "warelgg") {
        const cookie = serialize('auth_session', 'active_hidz', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, 
            path: '/',
        });

        res.setHeader('Set-Cookie', cookie);
        res.setHeader('Content-Type', 'text/html');
        
        return res.status(200).send(`
            <script>
                // Simpan cadangan status login di browser client
                localStorage.setItem('hidz_admin_logged', 'true');
                alert('Login Berhasil, Selamat Datang Wahid!');
                setTimeout(() => {
                    window.location.href = '/api/admin';
                }, 500);
            </script>
            <body style="background:#000;color:#fff;font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;">
                <p>Mempersiapkan Dashboard...</p>
            </body>
        `);
    }
    return res.status(401).send("Akses Ditolak. Username atau Password salah.");
}
