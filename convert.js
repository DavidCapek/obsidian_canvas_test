const fs = require('fs').promises;
const { unified } = require('unified');
const parse = require('rehype-parse');
const rehypeJsonCanvas = require('rehype-jsoncanvas');
const stringify = require('rehype-stringify');

async function convertCanvas(inputFile, outputFile) {
  try {
    const canvasData = await fs.readFile(inputFile, 'utf-8');
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><img src="${inputFile}"></body></html>`; // Create a basic HTML structure with the canvas as an image

    const file = await unified()
      .use(parse) // Parse the minimal HTML
      .use(rehypeJsonCanvas) // Use the plugin
      .use(stringify) // Convert back to HTML
      .process(html); // process

    await fs.writeFile(outputFile, file.toString());
    console.log(`Canvas converted: ${inputFile} -> ${outputFile}`);
  } catch (error) {
    console.error(`Error converting ${inputFile}:`, error);
    process.exit(1); // Exit with an error code
  }
}
//get arguments from command line
const args = process.argv.slice(2);
if (args.length != 2)
{
    console.error("The script must be called with 2 arguments, input file and output file");
    process.exit(1);
}
const inputFile = args[0];
const outputFile = args[1];

convertCanvas(inputFile, outputFile);
