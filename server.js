import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const INQUIRY_STORE_PATH = process.env.INQUIRY_STORE_PATH || './inquiries.json';

const requiredConfig = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
const missingConfig = requiredConfig.filter((key) => !process.env[key]);
const INQUIRY_EMAIL = process.env.INQUIRY_EMAIL || 'vinay.official0000@gmail.com';
if (missingConfig.length) {
  console.warn('Warning: Missing SMTP configuration:', missingConfig.join(', '));
  console.warn('The API will still start, but inquiry emails cannot be sent until SMTP is configured in .env.');
}

app.use(cors());
app.use(express.json());

const saveInquiry = async (inquiry) => {
  try {
    let data = [];
    try {
      const existing = await fs.readFile(INQUIRY_STORE_PATH, 'utf8');
      data = JSON.parse(existing || '[]');
    } catch (readErr) {
      if (readErr.code !== 'ENOENT') throw readErr;
    }

    data.push(inquiry);
    await fs.writeFile(INQUIRY_STORE_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Failed to save inquiry locally:', err);
    return false;
  }
};

app.post('/api/inquiry', async (req, res) => {
  const { name, email, phone, state, product, qty, msg } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email and phone are required.' });
  }

  const productValue = Array.isArray(product)
    ? product.filter(Boolean).join(', ')
    : product || 'N/A';

  const inquiry = {
    name,
    email,
    phone,
    state: state || 'N/A',
    location: req.body.location || 'N/A',
    geoLat: req.body.geoLat || 'N/A',
    geoLng: req.body.geoLng || 'N/A',
    product: productValue,
    qty: qty || 'N/A',
    msg: msg || 'N/A',
    receivedAt: new Date().toISOString(),
  };

  let emailSent = false;
  let emailError = null;

  if (!missingConfig.length) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: INQUIRY_EMAIL,
        subject: `New Inquiry from N&MTIMBER website: ${name}`,
        text: `New inquiry details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nState/City: ${state || 'N/A'}\nDelivery location: ${req.body.location || 'N/A'}\nCoordinates: ${req.body.geoLat || 'N/A'}, ${req.body.geoLng || 'N/A'}\nProduct: ${productValue}\nQuantity: ${qty || 'N/A'}\nMessage: ${msg || 'N/A'}`,
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
    } catch (error) {
      console.error('Failed to send inquiry email:', error);
      emailError = error;
    }
  }

  const saved = await saveInquiry(inquiry);
  if (!saved) {
    return res.status(500).json({ error: 'Unable to save inquiry. Please try again later.' });
  }

  if (emailSent) {
    return res.json({ success: true, message: 'Inquiry received and email sent successfully.' });
  }

  const fallbackMessage = missingConfig.length
    ? `Inquiry recorded locally. Configure SMTP to send email notifications.`
    : `Inquiry recorded locally. Email failed to send but was saved for review.`;

  return res.json({ success: true, message: fallbackMessage });
});

app.get('/api/geocode', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&accept-language=en`);
    if (!response.ok) {
      throw new Error(`Geocode service returned ${response.status}`);
    }

    const data = await response.json();
    return res.json({
      display_name: data.display_name,
      address: data.address,
      lat: data.lat,
      lon: data.lon,
    });
  } catch (error) {
    console.error('Geocode lookup failed:', error);
    return res.status(502).json({ error: 'Unable to resolve location from coordinates.' });
  }
});

const startServer = (port, attempts = 0) => {
  const server = app.listen(port, () => {
    console.log(`Inquiry backend running on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && attempts < 3) {
      const nextPort = port + 1;
      console.warn(`Port ${port} is already in use. Trying ${nextPort}...`);
      startServer(nextPort, attempts + 1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
};

startServer(PORT);