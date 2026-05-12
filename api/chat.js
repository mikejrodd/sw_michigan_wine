import axios from 'axios';

// This function handles incoming requests to the /api/chat endpoint
export default async function handler(req, res) {
    // Only allow POST requests to this endpoint
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    // Try to handle the request and catch any errors
    try {
        // Make a POST request to the OpenAI API to generate a chat completion
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini-2024-07-18', 
            messages: req.body.messages,
            max_tokens: 800,
        }, {
            headers: {
                // Use the OpenAI API key from environment variables
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            }
        });

        // Send the response from OpenAI back to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error creating completion:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
