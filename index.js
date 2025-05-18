const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const glob = require('glob');

/**
 * Combines multiple PNG files into a single PDF
 * @param {string} inputPattern - Glob pattern for input PNG files (e.g., './images/*.png')
 * @param {string} outputPath - Path for the output PDF file
 * @param {boolean} verbose - Whether to show verbose output
 */
async function combinePngToPdf(inputPattern, outputPath, verbose = false) {
  try {
    // Find all PNG files matching the pattern
    const files = await glob.glob(inputPattern);
    
    if (files.length === 0) {
      console.error('No PNG files found matching the pattern:', inputPattern);
      return;
    }
    
    // Sort files numerically based on numbers in filenames
    const sortedFiles = files.sort((a, b) => {
      // Extract numbers from filenames
      const numA = parseInt(path.basename(a).match(/\d+/)?.[0] || '0');
      const numB = parseInt(path.basename(b).match(/\d+/)?.[0] || '0');
      return numA - numB;
    });
    
    if (verbose) {
      console.log(`Found ${files.length} PNG files to combine in sequence`);
    } else {
      console.log(`Found ${files.length} PNG files to combine in sequence`);
    }
    
    // Create a new PDF document
    const doc = new PDFDocument({
      autoFirstPage: false,
      margin: 0
    });
    
    // Pipe the PDF output to a file
    doc.pipe(fs.createWriteStream(outputPath));
    
    // Add each PNG to the PDF in sorted order
    for (const file of sortedFiles) {
      // Get image dimensions
      const img = doc.openImage(file);
      const imgWidth = img.width;
      const imgHeight = img.height;
      
      // Add a new page with the image dimensions
      doc.addPage({ size: [imgWidth, imgHeight], margin: 0 });
      
      // Add the image to fill the page
      doc.image(file, 0, 0, { width: imgWidth, height: imgHeight });
      
      if (verbose) {
        console.log(`Added ${path.basename(file)} to PDF`);
      }
    }
    
    // Finalize the PDF
    doc.end();
    console.log(`PDF created successfully at: ${outputPath}`);
    
  } catch (error) {
    console.error('Error combining PNG files to PDF:', error);
  }
}

// This module is now intended to be used as a library
// The CLI functionality is in ./bin/cli.js

// Export the function for use as a module
module.exports = { combinePngToPdf };
