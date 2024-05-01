const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);


// Use authentication routes
app.use('/auth', authRoutes);

// Use authentication middleware for chat routes
app.use('/chat', authMiddleware);
app.use('/chat', chatRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
