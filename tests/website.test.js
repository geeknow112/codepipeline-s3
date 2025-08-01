// 🧪 Comprehensive Website Test Suite
const fs = require('fs');
const path = require('path');

describe('📁 File Existence Tests', () => {
  
  test('✅ HTML file should exist and be accessible', () => {
    const htmlPath = path.join(__dirname, '..', 'website', 'index.html');
    expect(fs.existsSync(htmlPath)).toBe(true);
    
    // Check file is readable
    expect(() => {
      fs.readFileSync(htmlPath, 'utf8');
    }).not.toThrow();
  });
  
  test('✅ CSS file should exist and be accessible', () => {
    const cssPath = path.join(__dirname, '..', 'website', 'style.css');
    expect(fs.existsSync(cssPath)).toBe(true);
    
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    expect(cssContent.length).toBeGreaterThan(100); // Should have substantial content
  });
  
  test('✅ JavaScript file should exist and be accessible', () => {
    const jsPath = path.join(__dirname, '..', 'website', 'script.js');
    expect(fs.existsSync(jsPath)).toBe(true);
    
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    expect(jsContent.length).toBeGreaterThan(50);
  });
  
  test('✅ Configuration files should exist', () => {
    const buildspecPath = path.join(__dirname, '..', 'buildspec.yml');
    const packagePath = path.join(__dirname, '..', 'package.json');
    const readmePath = path.join(__dirname, '..', 'README.md');
    
    expect(fs.existsSync(buildspecPath)).toBe(true);
    expect(fs.existsSync(packagePath)).toBe(true);
    expect(fs.existsSync(readmePath)).toBe(true);
  });
  
});

describe('🔍 HTML Structure Tests', () => {
  
  let htmlContent;
  
  beforeAll(() => {
    const htmlPath = path.join(__dirname, '..', 'website', 'index.html');
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  });
  
  test('✅ Should have proper DOCTYPE declaration', () => {
    expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
  });
  
  test('✅ Should have html, head, and body tags', () => {
    expect(htmlContent).toContain('<html');
    expect(htmlContent).toContain('<head>');
    expect(htmlContent).toContain('<body>');
    expect(htmlContent).toContain('</html>');
    expect(htmlContent).toContain('</head>');
    expect(htmlContent).toContain('</body>');
  });
  
  test('✅ Should have title tag', () => {
    expect(htmlContent).toContain('<title>');
    expect(htmlContent).toMatch(/<title>.*CodePipeline.*<\/title>/i);
  });
  
  test('✅ Should link to CSS and JavaScript files', () => {
    expect(htmlContent).toContain('style.css');
    expect(htmlContent).toContain('script.js');
  });
  
  test('✅ Should have meta viewport for responsive design', () => {
    expect(htmlContent).toContain('viewport');
    expect(htmlContent).toContain('width=device-width');
  });
  
});

describe('🎨 CSS Validation Tests', () => {
  
  let cssContent;
  
  beforeAll(() => {
    const cssPath = path.join(__dirname, '..', 'website', 'style.css');
    cssContent = fs.readFileSync(cssPath, 'utf8');
  });
  
  test('✅ Should have basic CSS structure', () => {
    expect(cssContent).toContain('body');
    expect(cssContent).toContain('{');
    expect(cssContent).toContain('}');
  });
  
  test('✅ Should have responsive design rules', () => {
    expect(cssContent).toContain('@media');
    expect(cssContent).toMatch(/max-width.*768px/);
  });
  
  test('✅ Should have proper CSS syntax (balanced brackets)', () => {
    const openBrackets = (cssContent.match(/{/g) || []).length;
    const closeBrackets = (cssContent.match(/}/g) || []).length;
    expect(openBrackets).toBe(closeBrackets);
  });
  
  test('✅ Should contain color definitions', () => {
    // Check for color values (hex, rgb, or named colors)
    const hasColors = /color\s*:\s*(#[0-9a-f]{3,6}|rgb\(|rgba\(|\w+)/i.test(cssContent);
    expect(hasColors).toBe(true);
  });
  
});

describe('⚡ JavaScript Validation Tests', () => {
  
  let jsContent;
  
  beforeAll(() => {
    const jsPath = path.join(__dirname, '..', 'website', 'script.js');
    jsContent = fs.readFileSync(jsPath, 'utf8');
  });
  
  test('✅ Should contain function definitions', () => {
    expect(jsContent).toMatch(/function\s+\w+/);
  });
  
  test('✅ Should have event listeners', () => {
    expect(jsContent).toContain('addEventListener');
  });
  
  test('✅ Should have proper JavaScript syntax (balanced parentheses)', () => {
    const openParens = (jsContent.match(/\(/g) || []).length;
    const closeParens = (jsContent.match(/\)/g) || []).length;
    expect(openParens).toBe(closeParens);
  });
  
  test('✅ Should contain DOM manipulation', () => {
    const hasDOMManipulation = /document\.|getElementById|querySelector/.test(jsContent);
    expect(hasDOMManipulation).toBe(true);
  });
  
});

describe('📄 Content Validation Tests', () => {
  
  test('✅ HTML should contain expected project content', () => {
    const htmlPath = path.join(__dirname, '..', 'website', 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    expect(htmlContent).toContain('CodePipeline S3 Demo');
    expect(htmlContent).toContain('GitHub');
    expect(htmlContent).toContain('デプロイ');
    expect(htmlContent).toContain('Pull Request');
  });
  
  test('✅ README should contain comprehensive documentation', () => {
    const readmePath = path.join(__dirname, '..', 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    expect(readmeContent).toContain('CodePipeline');
    expect(readmeContent).toContain('S3');
    expect(readmeContent).toContain('GitHub');
    expect(readmeContent).toContain('アーキテクチャ');
  });
  
});

describe('⚙️ Configuration Tests', () => {
  
  test('✅ buildspec.yml should have proper structure', () => {
    const buildspecPath = path.join(__dirname, '..', 'buildspec.yml');
    const buildspecContent = fs.readFileSync(buildspecPath, 'utf8');
    
    expect(buildspecContent).toContain('version: 0.2');
    expect(buildspecContent).toContain('phases:');
    expect(buildspecContent).toContain('artifacts:');
    expect(buildspecContent).toContain('install:');
    expect(buildspecContent).toContain('build:');
  });
  
  test('✅ package.json should have proper configuration', () => {
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    expect(packageContent.name).toBe('codepipeline-s3-demo');
    expect(packageContent.scripts).toBeDefined();
    expect(packageContent.scripts.test).toBeDefined();
    expect(packageContent.devDependencies).toBeDefined();
    expect(packageContent.devDependencies.jest).toBeDefined();
  });
  
});

describe('🔒 Security and Best Practices Tests', () => {
  
  test('✅ Should not contain sensitive information', () => {
    const files = ['website/index.html', 'website/style.css', 'website/script.js', 'README.md'];
    
    files.forEach(file => {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for common sensitive patterns
        expect(content).not.toMatch(/password\s*[:=]\s*['"]\w+['"]/i);
        expect(content).not.toMatch(/secret\s*[:=]\s*['"]\w+['"]/i);
        expect(content).not.toMatch(/api[_-]?key\s*[:=]\s*['"]\w+['"]/i);
      }
    });
  });
  
  test('✅ HTML should have proper charset declaration', () => {
    const htmlPath = path.join(__dirname, '..', 'website', 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    expect(htmlContent).toMatch(/<meta.*charset.*utf-8/i);
  });
  
});
