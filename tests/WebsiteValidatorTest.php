<?php

namespace CodePipelineDemo\Tests;

use PHPUnit\Framework\TestCase;
use CodePipelineDemo\WebsiteValidator;

/**
 * 🧪 Website Validator Tests
 * 
 * Tests for the WebsiteValidator helper class
 */
class WebsiteValidatorTest extends TestCase
{
    private WebsiteValidator $validator;

    protected function setUp(): void
    {
        $this->validator = new WebsiteValidator();
    }

    /**
     * @test
     * @group validator
     */
    public function validator_should_detect_missing_files(): void
    {
        $missingFiles = $this->validator->checkRequiredFiles();
        
        // In a properly set up project, no files should be missing
        $this->assertEmpty(
            $missingFiles,
            'All required project files should exist: ' . implode(', ', $missingFiles)
        );
    }

    /**
     * @test
     * @group validator
     */
    public function validator_should_validate_html_structure(): void
    {
        $files = $this->validator->getProjectFiles();
        
        if (file_exists($files['html'])) {
            $errors = $this->validator->validateHtmlStructure($files['html']);
            
            $this->assertEmpty(
                $errors,
                'HTML structure should be valid: ' . implode(', ', $errors)
            );
        } else {
            $this->markTestSkipped('HTML file not found');
        }
    }

    /**
     * @test
     * @group validator
     */
    public function validator_should_validate_css_syntax(): void
    {
        $files = $this->validator->getProjectFiles();
        
        if (file_exists($files['css'])) {
            $errors = $this->validator->validateCssSyntax($files['css']);
            
            $this->assertEmpty(
                $errors,
                'CSS syntax should be valid: ' . implode(', ', $errors)
            );
        } else {
            $this->markTestSkipped('CSS file not found');
        }
    }

    /**
     * @test
     * @group validator
     */
    public function validator_should_validate_javascript_syntax(): void
    {
        $files = $this->validator->getProjectFiles();
        
        if (file_exists($files['js'])) {
            $errors = $this->validator->validateJavaScriptSyntax($files['js']);
            
            $this->assertEmpty(
                $errors,
                'JavaScript syntax should be valid: ' . implode(', ', $errors)
            );
        } else {
            $this->markTestSkipped('JavaScript file not found');
        }
    }

    /**
     * @test
     * @group validator
     */
    public function validator_should_return_correct_file_paths(): void
    {
        $files = $this->validator->getProjectFiles();
        
        $this->assertArrayHasKey('html', $files);
        $this->assertArrayHasKey('css', $files);
        $this->assertArrayHasKey('js', $files);
        $this->assertArrayHasKey('readme', $files);
        $this->assertArrayHasKey('buildspec', $files);
        $this->assertArrayHasKey('package', $files);
        
        // Check that paths end with expected filenames
        $this->assertStringEndsWith('index.html', $files['html']);
        $this->assertStringEndsWith('style.css', $files['css']);
        $this->assertStringEndsWith('script.js', $files['js']);
    }
}
