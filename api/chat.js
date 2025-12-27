import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers for your domain
  res.setHeader('Access-Control-Allow-Origin', 'https://melaku-tilahun.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

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

Provide a brief, helpful response:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ 
      response: text,
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
