import PDFDocument from 'pdfkit';

export function generatePdfBuffer({ goldPrice, amount, grams }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // PDF content...
    doc.fontSize(20).text('GoldDigger Investment Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Date: ${new Date().toLocaleString()}`);
    doc.text(`Receipt #: GD-${Math.floor(Math.random() * 100000)}`);
    doc.moveDown();
    doc.text('-----------------------------------------');
    doc.text(`Amount Invested: ₹${amount}`);
    doc.text(`Gold Price at Purchase: ₹${goldPrice}/gram`);
    doc.text(`Gold Purchased: ${grams} grams`);
    doc.text('-----------------------------------------');
    doc.moveDown();
    doc.text('Thank you for investing with GoldDigger.', { align: 'center' });

    doc.end();
  });
}
