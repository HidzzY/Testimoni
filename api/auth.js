import { serialize } from 'cookie';

export default function handler(req, res) {
    const { user, pass } = req.query;

    if (user === "wahidzzz" && pass === "warelgg") {
        const cookie = serialize('auth_session', 'active_hidz', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 hari
            path: '/',
        });

        res.setHeader('Set-Cookie', cookie);
        
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(`
            <script>
                alert('Login Berhasil, Selamat Datang Wahid!');
                // Beri jeda 500ms agar cookie tersimpan mantap di browser
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 500);
            </script>
            <p>Sedang mengalihkan ke Dashboard...</p>
        `);
    }
    return res.status(401).send("Akses Ditolak.");
}
