const corsOptions = {
  origin: [
    'http://localhost:3001',
    'http://localhost:5001'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = corsOptions; 