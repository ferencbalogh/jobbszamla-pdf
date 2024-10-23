const express = require('express');
const generatePdf = require('./pdf'); // A pdf.js fájlt importáljuk, ami a generatePdfFromUrl függvényt tartalmazza
const validUrl = require('valid-url');

const app = express();
const port = 4444;
const hash = "x8zqiwd0cayybp7gnlly";

app.get('/api/pdf', async (req, res) => {
 /* try {*/
    const url = req.query.url;
    const token = req.query.token;

    if(!token || token !== hash) {
      return res.status(400).send('Érvénytelen token.');
    }

    // URL validálás és sanitizálás (fontos a biztonság miatt!)
    if (!url || !validUrl.isWebUri(url)) {
      return res.status(400).send('Érvénytelen vagy hiányzó URL paraméter.');
    }

    const pdfBuffer = await generatePdf.generatePdfFromUrl(req, res);

    // Ellenőrizzük, hogy a válasz fejlécek még nem lettek elküldve
    if (!res.headersSent) {
      res.set('Content-Type', 'application/pdf');
      res.set('Content-Disposition', `attachment; filename=generated.pdf`);
      res.send(pdfBuffer);
    }
  /*} catch (error) {
    console.error(error.stack); // Részletes hibakereséshez
    if (!res.headersSent) {
      res.status(500).send('Hiba a PDF generálás során');
    }
  }*/
});

app.listen(port, () => {
  console.log(`Szerver fut a http://localhost:${port}/api/pdf címen`);
});