<?php

namespace CodePipelineDemo;

/**
 * Website Validator Helper Class
 * 
 * Provides utility methods for validating static website files
 */
class WebsiteValidator
{
    private string $projectRoot;

    public function __construct(string $projectRoot = null)
    {
        $this->projectRoot = $projectRoot ?? dirname(__DIR__);
    }

    /**
     * Validate HTML file structure
     */
    public function validateHtmlStructure(string $filePath): array
    {
        $content = file_get_contents($filePath);
        $errors = [];

        // Check for DOCTYPE
        if (!preg_match('/<!DOCTYPE\s+html>/i', $content)) {
            $errors[] = 'Missing DOCTYPE declaration';
        }

        // Check for essential tags
        $requiredTags = ['<html', '<head>', '<body>', '</html>', '</head>', '</body>'];
        foreach ($requiredTags as $tag) {
            if (strpos($content, $tag) === false) {
                $errors[] = "Missing required tag: {$tag}";
            }
        }

        // Check for meta charset
        if (!preg_match('/<meta[^>]+charset[^>]*>/i', $content)) {
            $errors[] = 'Missing charset meta tag';
        }

        return $errors;
    }

    /**
     * Validate CSS syntax
     */
    public function validateCssSyntax(string $filePath): array
    {
        $content = file_get_contents($filePath);
        $errors = [];

        // Check balanced braces
        $openBraces = substr_count($content, '{');
        $closeBraces = substr_count($content, '}');

        if ($openBraces !== $closeBraces) {
            $errors[] = "Unbalanced braces: {$openBraces} open, {$closeBraces} close";
        }

        // Check for basic CSS structure
        if (!preg_match('/[a-zA-Z#.][^{]*\{[^}]*\}/', $content)) {
            $errors[] = 'No valid CSS rules found';
        }

        return $errors;
    }

    /**
     * Validate JavaScript syntax (basic)
     */
    public function validateJavaScriptSyntax(string $filePath): array
    {
        $content = file_get_contents($filePath);
        $errors = [];

        // Check balanced parentheses
        $openParens = substr_count($content, '(');
        $closeParens = substr_count($content, ')');

        if ($openParens !== $closeParens) {
            $errors[] = "Unbalanced parentheses: {$openParens} open, {$closeParens} close";
        }

        // Check for function definitions
        if (!preg_match('/function\s+\w+\s*\(/', $content)) {
            $errors[] = 'No function definitions found';
        }

        return $errors;
    }

    /**
     * Get project file paths
     */
    public function getProjectFiles(): array
    {
        return [
            'html' => $this->projectRoot . '/website/index.html',
            'css' => $this->projectRoot . '/website/style.css',
            'js' => $this->projectRoot . '/website/script.js',
            'readme' => $this->projectRoot . '/README.md',
            'buildspec' => $this->projectRoot . '/buildspec.yml',
            'package' => $this->projectRoot . '/package.json'
        ];
    }

    /**
     * Check if all required files exist
     */
    public function checkRequiredFiles(): array
    {
        $files = $this->getProjectFiles();
        $missing = [];

        foreach ($files as $type => $path) {
            if (!file_exists($path)) {
                $missing[] = $type;
            }
        }

        return $missing;
    }
}
