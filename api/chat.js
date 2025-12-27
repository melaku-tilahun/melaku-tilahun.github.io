import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // Handle CORS
  // Allow all origins to fix issues with Vercel preview deployments
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // System context about the portfolio
    const systemContext = `You are an AI assistant for Melaku Tilahun's portfolio website.

About Melaku:
- Award-winning Full Stack Developer & AI/ML Engineer
- Tech Innovator at Jimma University Innovation Incubation Center
- Campus Volunteer Coordinator at YeneHealth Tech PLC

Skills:
- Backend: Node.js, Python, FastAPI, MySQL, MongoDB, Firebase, Supabase, RESTful APIs
- Frontend: React, Next.js, TypeScript, Modern CSS, Tailwind
- AI/ML: RAG Systems, Domain-Specific AI Chatbots, Multiagent Systems, LLMs, LangChain, Vector Databases, NLP
- Tools: Git, Docker, CI/CD, Cloud Platforms

Key Projects:
1. Fayda SDK - Secure Node.js SDK for Ethiopia's National ID integration via MOSIP eSignet OIDC
2. ClariMind - Data analysis platform for PDFs, Excel, and Word docs with ML-powered analysis
3. Agri-Chain-ET - Blockchain dApp for agricultural batch tracking with Solidity and Supabase
4. Polio Awareness Chatbot - AI chatbot for public health education
5. JU-SRH AI Health Chatbot - Confidential sexual & reproductive health chatbot for students

Contact:
- Email: melakutilahun15@gmail.com
- GitHub: github.com/melaku-tilahun
- LinkedIn: linkedin.com/in/melaku-tilahun

Instructions:
- Provide helpful, concise, and professional responses about Melaku's work
- Keep answers brief (2-3 sentences max)
- Suggest viewing specific portfolio sections when relevant
- Be friendly but professional
- If asked about something not in the portfolio, politely redirect to available information`;

    const prompt = `${systemContext}

User Question: ${message}

IMPORTANT: You must return a JSON object (no markdown formatting, just raw JSON).
Structure:
{
  "text": "Your conversational response here (keep it brief and helpful)",
  "actions": [
    { "type": "NAVIGATE", "payload": { "url": "projects.html", "filter": "ai-ml" } }, // Optional
    { "type": "SCROLL_TO", "payload": { "id": "contact" } } // Optional
  ],
  "suggestions": [
    { "label": "See AI Projects", "query": "Show me AI projects" },
    { "label": "Contact Info", "query": "How do I contact Melaku?" }
  ]
}

Available Actions:
- NAVIGATE: { "url": "relative_or_absolute_url", "filter": "optional_category_id" }
- SCROLL_TO: { "id": "section_id" }
- OPEN_LINK: { "url": "external_url" }

Start JSON response:`;

    // Initialize Gemini
    // Note: genAI was already initialized above line 28, so we reuse it or ensure only one exists.
    // However, looking at the previous file state, it seems I paste-replaced a block but might have left an earlier decl.
    // Safer approach: Use the existing instance if possible, or re-structure.
    
    // START FIX: 
    // We will just use the `genAI` instance created at the top of the try block (around line 28/29).
    // So we just need to get the model.
    
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up if the model adds markdown code blocks
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON response:", text);
      // Fallback if model returns plain text instead of JSON
      parsedResponse = {
        text: text, // Use the raw text as the response
        actions: [],
        suggestions: []
      };
    }

    return res.status(200).json({ 
      response: parsedResponse.text || text, // Fallback to text if property missing
      actions: parsedResponse.actions || [],
      suggestions: parsedResponse.suggestions || [],
      success: true 
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate response',
      success: false 
    });
  }
}
