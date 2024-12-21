const express = require('express');
const https = require('https');
const path = require('path');

const app = express();

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.post('/fetch-verification-details', (req, res) => {
  const { user_json_url } = req.body;

  https.get(user_json_url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const userData = JSON.parse(data);
        res.json({
          success: true,
          details: userData,
        });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Invalid JSON data' });
      }
    });
  }).on('error', (err) => {
    res.status(500).json({ success: false, message: err.message });
  });
});

// For all other requests, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
