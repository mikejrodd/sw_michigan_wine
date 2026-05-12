// /api/googleApiKey.js
export default function handler(req, res) {
    if (req.method === 'GET') {
        // Return the API key from environment variables
        res.status(200).json({ key: process.env.GOOGLE_API_KEY });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
