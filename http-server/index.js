const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/registration') {
    const filePath = path.join(__dirname, 'registration.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Error loading registration page');
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
    return;
  }

  // Other routes like home, project, etc.

  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Page Not Found');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
