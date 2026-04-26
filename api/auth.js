import { serialize } from 'cookie';

export default function handler(req, res) {
    const { user, pass } = req.query;

    if (user === "wahidzzz" && pass === "warelgg") {
        const cookie = serialize('auth_session', 'active_hidz', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 hari
            path: '/',
        });

        res.setHeader('Set-Cookie', cookie);
        return res.status(200).send(`
            <script>
                alert('Login Berhasil, Selamat Datang Wahid!');
                window.location.href = '/dashboard';
            </script>
        `);
    }
    return res.status(401).send("Akses Ditolak.");
}