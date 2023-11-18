/*
 * A script for generating riscript syntax diagrams html file.
 * See: https://github.com/chevrotain/chevrotain/tree/master/diagrams for more details
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
const parserInstance = new RiScriptParser(tokens, TextTypes);
const serializedGrammar = parserInstance.getSerializedGastProductions();

// create the HTML Text
const htmlText = createSyntaxDiagramsCode(serializedGrammar);

// Write the HTML file to disk
const outPath = path.resolve(__dirname, "./");
const outFile = outPath + "/riscript-syntax.html";
fs.writeFileSync(outFile,  htmlText);
console.log(`wrote syntax diagram to ${outFile}`);
