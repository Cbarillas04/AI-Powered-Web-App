import { PDFParse } from 'pdf-parse';
import mammoth from "mammoth"
import fs from "fs";

export async function extractText(file) {
    let result;
    if (file.mimetype === "application/pdf") {
        const parse = await PDFParse(file.buffer);
        result = await parse.text
    }else if (file.mimetype.includes("wordprocessingml")) {
        const extract = await mammoth.extractRawText({buffer: file.buffer});
        result = await extract.value;
    }else { 
        result = await file.buffer.toString("utf-8");
    }
    return result;
}
