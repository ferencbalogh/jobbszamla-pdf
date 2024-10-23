const puppeteer = require('puppeteer');

exports.generatePdfFromUrl = async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).send('URL paraméter hiányzik');
    }

    console.log('Launching browser...');
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    console.log('Loading page:', url);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 }); // Increased timeout

    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({ format: 'A4' });
    console.log('PDF generated:', pdfBuffer.length);

    await browser.close();

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename=generated.pdf`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Hiba a PDF generálás során:', error);
    res.status(500).send('Hiba a PDF generálás során: ' + error.message); // Send error message
  }
};