#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');
const { combinePngToPdf } = require('../index');
const packageJson = require('../package.json');

// Set up the command-line interface
program
  .name('png-to-pdf')
  .description('Combine multiple PNG files into a single PDF document')
  .version(packageJson.version)
  .argument('<input-pattern>', 'Glob pattern for input PNG files (e.g., "./images/*.png")')
  .argument('<output-pdf>', 'Path for the output PDF file')
  .option('-v, --verbose', 'Show verbose output')
  .action(async (inputPattern, outputPath, options) => {
    try {
      console.log(chalk.blue('PNG to PDF Combiner'));
      console.log(chalk.gray(`Version: ${packageJson.version}`));
      console.log();
      
      // Ensure output path has .pdf extension
      if (!outputPath.toLowerCase().endsWith('.pdf')) {
        outputPath += '.pdf';
      }
      
      // Convert relative paths to absolute if needed
      if (!path.isAbsolute(outputPath)) {
        outputPath = path.join(process.cwd(), outputPath);
      }
      
      console.log(chalk.yellow('Processing:'));
      console.log(`Input pattern: ${chalk.green(inputPattern)}`);
      console.log(`Output file: ${chalk.green(outputPath)}`);
      console.log();
      
      await combinePngToPdf(inputPattern, outputPath, options.verbose);
      
      console.log();
      console.log(chalk.green('✓ Conversion completed successfully!'));
      console.log(chalk.gray(`PDF saved to: ${outputPath}`));
      
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

// Parse command-line arguments
program.parse();
