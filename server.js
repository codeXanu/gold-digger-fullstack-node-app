import http from 'node:http'
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serveStatic } from './utils/serveStatic.js';
import { getGoldPrice } from './utils/getGoldPrice.js';
import { generatePdfBuffer } from './utils/generatePdf.js';


const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

const server = http.createServer(async (req, res)=> {

    // ✅ Gold Price SSE endpoint 
    if(req.url === '/api/price') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Cashe-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')

      setInterval( ()=> {
        const price = getGoldPrice()
        res.write(
            `data: ${JSON.stringify({ event: 'price-updated', goldPrice: price})}\n\n`
        )

      }, 2000)
        return;
    }

    // ✅ Handle PDF Generation
  if (req.method === 'POST' && req.url === '/api/invest') {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', async () => {
      try {
        const { goldPrice, amount, grams } = JSON.parse(body);

        if (!goldPrice || !amount || !grams) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Missing data' }));
        }

        const pdfBuffer = await generatePdfBuffer({ goldPrice, amount, grams });

        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=investment.pdf',
        });
        res.end(pdfBuffer);


      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error' }));
      }
    });
    return;
  }

    // ✅ Static file serving 

    await serveStatic(req, res, __dirname)

    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    // res.end('<h1>The server is working!</h1>');
});


server.listen(PORT, ()=> console.log(`Server is running at http://localhost:${PORT}`))