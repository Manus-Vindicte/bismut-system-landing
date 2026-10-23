# Browser Evidence — Bismut Website

Date: 2026-10-23
Baseline: fe55d53

## Method
Local HTTP server serving `dist/` on http://localhost:8123.
Headless Chrome (`--headless=new`) used for real rendering + screenshots.
No browser automation library available; interactive E2E reported as BLOCKED.

## HTTP results (all 200)
- index.html, forge.html, libsystem.html, library-explorer.html
- launcher.html, engine.html, graphics.html
- bismut-libraries.v1.json (18 entries, schema 1.0)

## Screenshots (docs/evidence/)
- shot-1280x720-index.html.png
- shot-1280x720-library-explorer.html.png
- shot-1920x1080-library-explorer.html.png

## Repro command (screenshots)
```
cd dist
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let f=path.join(process.cwd(),req.url.split('?')[0]);if(f.endsWith('/')||f.endsWith('\\\\'))f+='index.html';fs.readFile(f,(e,d)=>{if(e){res.statusCode=404;res.end('nf');return;}res.end(d);});}).listen(8123,()=>console.log('listening'));" 
# then:
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --window-size=1280,720 --screenshot=shot.png http://localhost:8123/index.html
```

## BLOCKED
- Interactive E2E (search keystrokes, filter combos, keyboard focus traversal) requires Playwright/Puppeteer, not installed.
- Mobile (375x667) screenshot not captured.
- Browser console errors: none observed during page loads.
- Real JSON fetch confirmed via HTTP 200 + 18 entries.