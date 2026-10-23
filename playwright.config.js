const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  testMatch: /.*\.pw\.spec\.js/,
  timeout: 60000,
  use: {
    baseURL: 'http://localhost:8123',
    channel: 'chrome',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'node -e "const http=require(\'http\'),fs=require(\'fs\'),path=require(\'path\');http.createServer((req,res)=>{let f=path.join(process.cwd(),\'dist\',req.url.split(\'?\')[0]);if(f.endsWith(\'/\')||f.endsWith(\'\\\\\'))f+=\'index.html\';fs.readFile(f,(e,d)=>{if(e){res.statusCode=404;res.end(\'nf\');return;}res.end(d);});}).listen(8123,()=>console.log(\'listening\'));"',
    url: 'http://localhost:8123',
    reuseExistingServer: true,
    timeout: 30000
  },
  projects: [
    { name: 'desktop-1280', use: { viewport: { width: 1280, height: 720 } } },
    { name: 'desktop-1920', use: { viewport: { width: 1920, height: 1080 } } },
    { name: 'mobile-375', use: { viewport: { width: 375, height: 667 } } }
  ]
});