<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ExportStatic extends Command
{
    protected $signature = 'portfolio:export-static {--path=dist : Output directory (relative to project root)}';

    protected $description = 'Render the portfolio to a static site (for GitHub Pages hosting).';

    public function handle(): int
    {
        $outDir = base_path($this->option('path'));
        $fakeRoot = 'http://static.local';

        $this->info('Rendering / ...');
        $response = app()->handle(Request::create($fakeRoot . '/', 'GET'));

        if ($response->getStatusCode() !== 200) {
            $this->error('Failed to render home page (HTTP ' . $response->getStatusCode() . ').');
            return self::FAILURE;
        }

        // Make every URL relative so the site works under /<repo-name>/ on GitHub Pages.
        $html = str_replace([$fakeRoot . '/', $fakeRoot], ['./', '.'], $response->getContent());

        File::deleteDirectory($outDir);
        File::ensureDirectoryExists($outDir);

        File::put($outDir . '/index.html', $html);
        File::put($outDir . '/404.html', $html);
        File::put($outDir . '/.nojekyll', '');

        foreach (['build', 'images'] as $dir) {
            if (File::isDirectory(public_path($dir))) {
                File::copyDirectory(public_path($dir), $outDir . '/' . $dir);
            }
        }
        foreach (['favicon.ico', 'robots.txt'] as $file) {
            if (File::exists(public_path($file))) {
                File::copy(public_path($file), $outDir . '/' . $file);
            }
        }

        $this->info('Static site exported to: ' . $outDir);
        return self::SUCCESS;
    }
}

