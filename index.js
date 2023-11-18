/**
 * A template for generating syntax diagrams html file.
 * See: https://github.com/chevrotain/chevrotain/tree/master/diagrams for more details
 *
 * usage:
 * - npm install in the parent directory (parser) to install dependencies
 * - Run this in file in node.js (node gen_diagrams.js)
 * - open the "generated_diagrams.html" that will be created in this folder using
 *   your favorite browser.
 */
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createSyntaxDiagramsCode } from "chevrotain";

import { RiScriptParser } from "../riscript/src/parser.js";
import { getTokens, TextTypes } from '../riscript/src/tokens.js';

const { Constants, tokens } = getTokens();
const __dirname = dirname(fileURLToPath(import.meta.url));

// extract the serialized grammar.
console.log('pre parser');
const parserInstance = new RiScriptParser(tokens, TextTypes);
console.log('got parser');

const serializedGrammar = parserInstance.getSerializedGastProductions();

// create the HTML Text
const htmlText = createSyntaxDiagramsCode(serializedGrammar);

// Write the HTML file to disk
const outPath = path.resolve(__dirname, "./");
fs.writeFileSync(outPath + "/generated_diagrams.html", htmlText);
