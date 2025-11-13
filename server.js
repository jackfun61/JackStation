// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint for login verification
app.post('/send-verification', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.json({ success: false, error: "Missing email or code" });

  // For now, accept anything as success
  console.log(`Login attempt: ${email} / ${code}`);
  res.json({ success: true });
});

// Serve static files (like index.html & login.png)
app.use(express.static(__dirname));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
