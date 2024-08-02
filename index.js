const puppeteer = require('puppeteer');

exports.generatePdfFromUrl = async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).send('URL paraméter hiányzik');
    }

    const browser = await puppeteer.launch({args: ['--no-sandbox']}); // Sandbox kikapcsolása Cloud Functions környezetben
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'}); // Várj amíg a lap teljesen betölt

    const pdfBuffer = await page.pdf({format: 'A4'});

    await browser.close();

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename=generated.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Hiba a PDF generálás során:', error);
    res.status(500).send('Hiba a PDF generálás során');
  }
};