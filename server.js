import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js';
import { getGoldPrice } from './utils/getGoldPrice.js';


const PORT = process.env.PORT || 8000;

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res)=> {

    

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

    await serveStatic(req, res, __dirname)
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    // res.end('<h1>The server is working!</h1>');
});


server.listen(PORT, ()=> console.log(`Server is running at http://localhost:${PORT}`))