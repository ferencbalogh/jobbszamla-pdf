const express = require('express');
const generatePdf = require('./index');

const app = express();
const port = 4000;

app.get('/generate-pdf', async (req, res) => {
  try {
    const pdfBuffer = await generatePdf.generatePdfFromUrl(req, res);
    if (!res.headersSent) { // Ellenőrizzük, hogy a fejlécek elküldésre kerültek-e már
      res.set('Content-Type', 'application/pdf');
      res.set('Content-Disposition', `attachment; filename=generated.pdf`);
      res.send(pdfBuffer);
    }
  } catch (error) {
    console.error(error.stack);
    if (!res.headersSent) { // Ellenőrizzük, hogy a fejlécek elküldésre kerültek-e már
      res.status(500).send('Hiba a PDF generálás során');
    }
  }
});

app.listen(port, () => {
  console.log(`Szerver fut a http://localhost:${port}/generate-pdf címen`);
});