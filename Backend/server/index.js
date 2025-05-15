const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const getLocalIP = require("./utils/getIP");

const app = express();
const PORT = 5000;

// Enhanced middlewares
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? "https://your-production-domain.com" // Replace with your production URL
    : "http://localhost:5173", // Updated frontend URL for Vite (React)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/certificates", express.static(path.join(__dirname, "certificates")));

// Security headers middleware
app.use((req, res, next) => {
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "DENY");
  next();
});

// Root endpoint
app.get("/", (req, res) => {
  res.send(`
    <h1>Nature Quiz Backend</h1>
    <p>Server time: ${new Date().toISOString()}</p>
    <p>Available endpoints:</p>
    <ul>
      <li>POST /generate-pdf</li>
      <li>GET /download/:filename</li>
    </ul>
  `);
});

// PDF Generation endpoint
app.post("/generate-pdf", async (req, res) => {
  try {
    const { name, school, score } = req.body;
    if (!name || !school || score === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const filename = `${name.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, "certificates", filename);

    const html = `
      <html>
        <body style="text-align:center;padding:50px;font-family:sans-serif;">
          <h1>🌿 Nature Quiz Certificate 🌿</h1>
          <p>This is to certify that</p>
          <h2>${name}</h2>
          <p>from <strong>${school}</strong> has completed the quiz with a score of:</p>
          <h3>${score} / 5</h3>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm"
      }
    });

    await browser.close();

    const downloadURL = `http://${getLocalIP()}:${PORT}/certificates/${filename}`;
    res.json({ downloadURL });

  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ error: "PDF generation failed" });
  }
});

// File download endpoint
app.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "certificates", req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(filePath, `certificate_${Date.now()}.pdf`, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).json({ error: "File download failed" });
    }
  });
});

// Error handlers
app.use((req, res) => res.status(404).json({ error: "Endpoint not found" }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`
    📦 Backend running at:
    Local: http://localhost:${PORT}
    Network: http://${getLocalIP()}:${PORT}
  `);
});
