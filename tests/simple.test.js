// 🧪 Simple Website Test Suite for Node.js 12
const fs = require('fs');
const path = require('path');

describe('Basic File Tests', () => {
  
  test('HTML file should exist', () => {
    const htmlPath = path.join(__dirname, '..', 'website', 'index.html');
    expect(fs.existsSync(htmlPath)).toBe(true);
  });
  
  test('CSS file should exist', () => {
    const cssPath = path.join(__dirname, '..', 'website', 'style.css');
    expect(fs.existsSync(cssPath)).toBe(true);
  });
  
  test('JavaScript file should exist', () => {
    const jsPath = path.join(__dirname, '..', 'website', 'script.js');
    expect(fs.existsSync(jsPath)).toBe(true);
  });
  
  test('HTML should contain title', () => {
    const htmlPath = path.join(__dirname, '..', 'website', 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    expect(htmlContent).toContain('CodePipeline S3 Demo');
  });
  
  test('HTML should contain version 2.1', () => {
    const htmlPath = path.join(__dirname, '..', 'website', 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    expect(htmlContent).toContain('v2.1');
  });
  
});
