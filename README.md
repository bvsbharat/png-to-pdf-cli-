# png-to-pdf-cli

A command-line tool to combine multiple PNG files into a single PDF document.

## Features

- Combines multiple PNG files into a single PDF document
- Automatically sorts files by numerical order in filenames
- Each PNG is placed on its own page in the PDF
- The PDF page size matches the dimensions of each PNG image
- Simple and intuitive command-line interface

## Demo

Check out the demo video in the `demo` folder to see the tool in action:

- `demo/Screen Recording 2025-05-18 at 12.41.10 PM.mov`

This demonstration shows how to use the tool with various input patterns and options.

## Installation

### Global Installation (Recommended)

Install the package globally to use it as a command-line tool from anywhere:

```bash
npm install -g png-to-pdf-cli
```

### Local Installation

Install as a dependency in your project:

```bash
npm install png-to-pdf-cli
```

## Usage

### Command Line

If installed globally:

```bash
png-to-pdf <input-pattern> <output-pdf>
```

If installed locally:

```bash
npx png-to-pdf <input-pattern> <output-pdf>
```

#### Examples

```bash
# Combine all PNG files in the current directory
png-to-pdf "./*.png" output.pdf

# Combine all PNG files in a specific directory
png-to-pdf "./images/*.png" output.pdf

# Combine specific PNG files
png-to-pdf "./images/page*.png" combined.pdf

# Use verbose mode for detailed output
png-to-pdf --verbose "./images/*.png" output.pdf
```

### As a Module

You can also use this utility as a module in your own Node.js projects:

```javascript
const { combinePngToPdf } = require("png-to-pdf-cli");

combinePngToPdf("./path/to/images/*.png", "./path/to/output.pdf", true) // true enables verbose mode
  .then(() => console.log("PDF created successfully!"))
  .catch((err) => console.error("Error:", err));
```

## Publishing to npm

To publish this package to npm, follow these steps:

1. Create an npm account if you don't have one already:

   ```bash
   npm adduser
   ```

2. Update the package.json file with your information:

   - Set your name as the author
   - Add a repository field if you have a GitHub repository
   - Consider adding a description and keywords

3. Make sure your package name is unique:

   ```bash
   npm search png-to-pdf-cli
   ```

4. Test your package locally:

   ```bash
   npm link
   png-to-pdf --version
   ```

5. Publish to npm:

   ```bash
   npm publish
   ```

6. To update the package later:
   - Update the version in package.json (follow semantic versioning)
   - Run `npm publish` again

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
