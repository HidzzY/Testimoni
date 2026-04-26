import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send("Method Not Allowed");

    const { url, layanan, jumlah, price } = req.body;
    
    const { data, error } = await supabase
        .from('testimonials')
        .insert([{ 
            image_url: url, 
            layanan: layanan, 
            jumlah: jumlah, 
            price: price 
        }]);

    if (error) return res.status(500).json(error);
    return res.status(200).json({ success: true });
}
