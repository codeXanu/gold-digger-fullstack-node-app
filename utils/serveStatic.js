import path from "node:path";
import fs from 'node:fs/promises'
import { getContentType } from "./getContentType.js";
import { sendResponse } from "./sendResponse.js";

export async function serveStatic(req, res, baseDir) {
    // console.log(req.url)
    const publicDir = path.join(baseDir, 'public')
    const filePath = path.join(
        publicDir,
        req.url === '/' ? 'index.html' : req.url
    )

    const ext = path.extname(filePath)
    const ContentType = getContentType(ext)

try {
    const content = await fs.readFile(filePath)
    // 🔽 Special headers if it's a PDF download
    if (ext === '.pdf') {
      res.writeHead(200, {
        'Content-Type': ContentType,
        'Content-Disposition': 'attachment; filename=' + path.basename(filePath)
      });
      return res.end(content);
    }
     // ✅ Otherwise, serve normally
    sendResponse(res, 200, ContentType, content)
    
} catch (err) {
    if(err.code === 'ENOENT') {
        const content = await fs.readFile(path.join(publicDir, '404.html'))
        sendResponse(res, 404, 'text/html', content)
    } else {
        sendResponse(res, 500, 'text/html', '<html><h1>Server Error: ${err.code}</h1></html>')
    }
}

}