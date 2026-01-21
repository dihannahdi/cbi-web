const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const dataBuffer = fs.readFileSync('./audit/Semrush-Full_Site_Audit_Report-@header_title-1st_Jan_2026.pdf');
const uint8Array = new Uint8Array(dataBuffer);

(async () => {
    try {
        const parser = new PDFParse(uint8Array);
        await parser.load();
        const text = await parser.getText();
        console.log(text);
    } catch (err) {
        console.error('Error:', err);
    }
})();
