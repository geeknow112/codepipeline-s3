<?php

namespace CodePipelineDemo\Tests;

use PHPUnit\Framework\TestCase;

/**
 * 🧪 Website Validation Tests with PHPUnit
 * 
 * This test suite validates the static website files and content
 * for the CodePipeline S3 demo project.
 */
class WebsiteTest extends TestCase
{
    private string $projectRoot;

    protected function setUp(): void
    {
        $this->projectRoot = dirname(__DIR__);
    }

    /**
     * @test
     * @group files
     */
    public function html_file_should_exist(): void
    {
        $htmlPath = $this->projectRoot . '/website/index.html';
        
        $this->assertFileExists(
            $htmlPath,
            'website/index.html file should exist in project root'
        );
        
        $this->assertFileIsReadable(
            $htmlPath,
            'index.html should be readable'
        );
    }

    /**
     * @test
     * @group files
     */
    public function css_file_should_exist(): void
    {
        $cssPath = $this->projectRoot . '/website/style.css';
        
        $this->assertFileExists(
            $cssPath,
            'website/style.css file should exist in project root'
        );
        
        $this->assertFileIsReadable(
            $cssPath,
            'website/style.css should be readable'
        );
    }

    /**
     * @test
     * @group files
     */
    public function javascript_file_should_exist(): void
    {
        $jsPath = $this->projectRoot . '/website/script.js';
        
        $this->assertFileExists(
            $jsPath,
            'website/script.js file should exist in project root'
        );
        
        $this->assertFileIsReadable(
            $jsPath,
            'website/script.js should be readable'
        );
    }

    /**
     * @test
     * @group content
     */
    public function html_should_contain_expected_title(): void
    {
        $htmlPath = $this->projectRoot . '/website/index.html';
        $htmlContent = file_get_contents($htmlPath);
        
        $this->assertStringContainsString(
            'CodePipeline S3 Demo',
            $htmlContent,
            'HTML should contain the expected title'
        );
        
        $this->assertStringContainsString(
            '<!DOCTYPE html>',
            $htmlContent,
            'HTML should have proper DOCTYPE declaration'
        );
    }

    /**
     * @test
     * @group content
     */
    public function css_should_contain_body_styles(): void
    {
        $cssPath = $this->projectRoot . '/website/style.css';
        $cssContent = file_get_contents($cssPath);
        
        $this->assertStringContainsString(
            'body',
            $cssContent,
            'CSS should contain body element styles'
        );
        
        $this->assertGreaterThan(
            100,
            strlen($cssContent),
            'CSS file should have substantial content'
        );
    }

    /**
     * @test
     * @group content
     */
    public function javascript_should_contain_functions(): void
    {
        $jsPath = $this->projectRoot . '/website/script.js';
        $jsContent = file_get_contents($jsPath);
        
        $this->assertStringContainsString(
            'function',
            $jsContent,
            'JavaScript should contain function definitions'
        );
        
        $this->assertStringContainsString(
            'addEventListener',
            $jsContent,
            'JavaScript should contain event listeners'
        );
    }

    /**
     * @test
     * @group structure
     */
    public function html_should_have_proper_structure(): void
    {
        $htmlPath = $this->projectRoot . '/website/index.html';
        $htmlContent = file_get_contents($htmlPath);
        
        // Check for essential HTML tags
        $this->assertStringContainsString('<html', $htmlContent);
        $this->assertStringContainsString('<head>', $htmlContent);
        $this->assertStringContainsString('<body>', $htmlContent);
        $this->assertStringContainsString('</html>', $htmlContent);
        $this->assertStringContainsString('</head>', $htmlContent);
        $this->assertStringContainsString('</body>', $htmlContent);
        
        // Check for meta tags
        $this->assertStringContainsString('<meta', $htmlContent);
        $this->assertStringContainsString('charset', $htmlContent);
    }

    /**
     * @test
     * @group structure
     */
    public function css_should_have_valid_syntax(): void
    {
        $cssPath = $this->projectRoot . '/website/style.css';
        $cssContent = file_get_contents($cssPath);
        
        // Basic CSS syntax validation
        $openBraces = substr_count($cssContent, '{');
        $closeBraces = substr_count($cssContent, '}');
        
        $this->assertEquals(
            $openBraces,
            $closeBraces,
            'CSS should have balanced braces'
        );
        
        // Check for responsive design
        $this->assertStringContainsString(
            '@media',
            $cssContent,
            'CSS should contain media queries for responsive design'
        );
    }

    /**
     * @test
     * @group config
     */
    public function project_configuration_files_should_exist(): void
    {
        $configFiles = [
            'buildspec.yml',
            'package.json',
            'README.md'
        ];
        
        foreach ($configFiles as $file) {
            $filePath = $this->projectRoot . '/' . $file;
            $this->assertFileExists(
                $filePath,
                "Configuration file {$file} should exist"
            );
        }
    }

    /**
     * @test
     * @group security
     */
    public function files_should_not_contain_sensitive_information(): void
    {
        $files = ['website/index.html', 'website/style.css', 'website/script.js', 'README.md'];
        $sensitivePatterns = [
            '/password\s*[:=]\s*["\'][\w]+["\']/i',
            '/secret\s*[:=]\s*["\'][\w]+["\']/i',
            '/api[_-]?key\s*[:=]\s*["\'][\w]+["\']/i'
        ];
        
        foreach ($files as $file) {
            $filePath = $this->projectRoot . '/' . $file;
            if (file_exists($filePath)) {
                $content = file_get_contents($filePath);
                
                foreach ($sensitivePatterns as $pattern) {
                    $this->assertNotRegExp(
                        $pattern,
                        $content,
                        "File {$file} should not contain sensitive information"
                    );
                }
            }
        }
    }
}
