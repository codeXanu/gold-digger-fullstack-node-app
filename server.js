import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js';
import { getGoldPrice } from './utils/getGoldPrice.js';


const PORT = process.env.PORT || 8000;

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res)=> {

    

    if(req.url === '/api/price') {
        const price = getGoldPrice();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({price}))
        return;
    }

    await serveStatic(req, res, __dirname)
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    // res.end('<h1>The server is working!</h1>');
});


server.listen(PORT, ()=> console.log(`Server is running at http://localhost:${PORT}`))