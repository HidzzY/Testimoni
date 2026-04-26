import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;

        return res.status(200).json(data);
    } catch (error) {
        console.error("Supabase Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
