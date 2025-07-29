// 🚨 Test Failure Demonstration
// This file contains tests that can be enabled to demonstrate test failures

describe('🚨 Test Failure Demonstrations (DISABLED)', () => {
  
  // Uncomment these tests to see pipeline failures in action
  
  /*
  test('❌ This test will always fail', () => {
    expect(true).toBe(false);
  });
  
  test('❌ Missing file test', () => {
    const fs = require('fs');
    const path = require('path');
    const nonExistentFile = path.join(__dirname, '..', 'non-existent-file.txt');
    expect(fs.existsSync(nonExistentFile)).toBe(true);
  });
  
  test('❌ Content validation failure', () => {
    const fs = require('fs');
    const path = require('path');
    const htmlPath = path.join(__dirname, '..', 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // This will fail because we're looking for content that doesn't exist
    expect(htmlContent).toContain('THIS_CONTENT_DOES_NOT_EXIST');
  });
  */
  
  test('✅ Placeholder test to keep this file valid', () => {
    expect(true).toBe(true);
  });
  
});

// Instructions for testing failures:
// 1. Uncomment one of the failing tests above
// 2. Commit and push to GitHub
// 3. Create a Pull Request
// 4. Watch the pipeline fail at the Build stage
// 5. Deploy will not execute due to test failure
