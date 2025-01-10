const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
//const { openai, systemMessage } = require('./config/openai');
const helmet = require('helmet');
const app = express();

require('dotenv').config();

// Security middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Allow all origins in development
    methods: ['GET', 'POST'], // Explicitly allow methods
    allowedHeaders: ['Content-Type'] // Explicitly allow headers
}));

app.use(helmet({
    contentSecurityPolicy: false // Disable CSP in development
}));

app.get('/dataVisualization', (req, res)=>{
    res.sendFile(path.join(__dirname + "/public/dataVisualization.html"));
});

app.get('/healthMonitor', (req, res)=>{
    res.sendFile(path.join(__dirname + "/public/healthMonitor.html"));
});

app.get('/modelsRepository', (req, res)=>{
    res.sendFile(path.join(__dirname + "/public/modelsRepository.html"));
});

app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname + "/public/about.html"));
});

// Add this logging middleware to debug requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                systemMessage,
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        // Only send necessary data back
        res.json({
            response: completion.choices[0].message.content
        });
    } catch (error) {
        // Log error safely without exposing sensitive details
        console.error('API Error:', error.message);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

// Add a test endpoint
app.post('/api/test', (req, res) => {
    console.log('Test endpoint hit:', req.body);
    res.json({ message: 'Test endpoint working' });
});

// Use port 3000 for development
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});