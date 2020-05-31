
const rulesJson = require('./swnrules.json');


function textReplaces(txt) {
    const repls = [
        [/\%2B/g, "+"],
        [/\%2C/g, ","],
        [/\%2D/g, "-"],
        [/\%2E/g, "."],
        [/\%2F/g, "/"],
        [/\%3A/g, ":"],
        [/\%3B/g, ";"],
        [/\%3C/g, "<"],
        [/\%3D/g, "="],
        [/\%3E/g, ">"],
        [/\%3F/g, "?"],
        ["•", "."],
    ];

    return repls.reduce((txt, rule) => {
        return txt.replace(rule[0], rule[1]);
    }, txt);
}



/**
 * 
 * New paragraph rules:
 * 
 * 1. Has font size larger that headerFontSize limit
 * 2. Space between y is more than typical line change
 *  - How to find out about column change...
 * 3. Y is normal linechange but x is deeper than last line.
 * 
 * Not a paragraph change
 * 1. Is in the same line /y) as previous text
 * 
 * @param {*} pageNum 
 */

function getPage(pageNum) {
    // console.log(rulesJson.formImage.Pages[pageNum])
    const page = rulesJson.formImage.Pages[pageNum];
    const pageTexts = Array.from(page.Texts);
    console.log("HEIGHT", page.Height);
    console.log("WIDTH", rulesJson.formImage.Width);
    console.log(Object.keys(page));
    Object.keys(page).forEach(k => {
        if (k !== "Texts" && page[k].length > 0) {
            console.log(k, page[k]);
        }


    })

    let specialCase = "NON";
    let prevText = null;
    const headerFontSizeLimit = 16;
    const lineChangeLimit = 0.8;
    let paragraph = "";
    const columnCharsMax = 60;
    const bodyFontSize = 13;
    const marginsTotal = 5;
    const columnSeparationMargin = 2;
    const charWidth = (rulesJson.formImage.Width - marginsTotal - columnSeparationMargin) / columnCharsMax;
    console.log("CharWidth", charWidth);
    let wasNewParagraph = false;
    return pageTexts.reduce((texts, p, ind) => {

        const fontSize = p.R[0].TS[1];
        if (p.R.length > 1) {
            console.log(p);
        }


        const x = p.x;
        const y = p.y;
        const type = fontSize >= headerFontSizeLimit ? "h" : "p";
        const text = textReplaces(decodeURI(p.R[0].T));

        const isBold = p.R[0].TS[2] === 1;
        const isItalic = p.R[0].TS[3] === 1;

        const encs = text.match(/\%\d./g);
        if (encs) {
            console.log("MISSING ENCODINGS!", encs, text);
        }

        let isNewParagraph = false;
        let isHeader = false;

        // console.log(x, y);
        if (fontSize > headerFontSizeLimit) {
            if (prevText !== null && y !== prevText.y) {
                // console.log("Rule: FontSize", text);
                isNewParagraph = true;
                isHeader = true;
            }
        }



        if (prevText !== null) {
            const prevSize = prevText.R[0].TS[1];
            const previousText = textReplaces(decodeURI(prevText.R[0].T));

            if (fontSize !== prevSize) {
                if (prevSize >= headerFontSizeLimit && fontSize < headerFontSizeLimit) {
                    isNewParagraph = true;
                }

            }

            if (y - prevText.y > lineChangeLimit) {
                // console.log("Rule: Linechange!");
                isNewParagraph = true;
            }

            if (x - 0.1 > prevText.x && y > prevText.y) {
                // console.log("Rule: x and y", x - 0.1 > prevText.x, y > prevText.y);
                isNewParagraph = true;
            }

            if (x > prevText.x * 1.7 && y < prevText.y) {
                if (text.charAt(0).toUpperCase() === text.charAt(0)) {
                    isNewParagraph = true;
                }
            }



            if(wasNewParagraph && !isNewParagraph) {
                if(prevText.w < 10 && previousText.length > 3) {
                    console.log(previousText, text);
                    isNewParagraph = true;
                    
                }
            }
            // if (text === "Colonists") {
                // console.log(ind, text, p.x, p.y, p.w, p.sw);
            // }



            // console.log(previousText.length, text.length, prevText.x, x, prevSize, fontSize, );

            // Positioned way after previous text in the same line means a table most likely

            // if(prevText.y === y ) { 
            //     const prevTextEnds = prevText.x + previousText.length * charWidth;
            //     if(x > prevTextEnds + 4) {
            //         console.log("Table? ",x, y, text);
            //         // isNewParagraph = true;
            //     }
            // }

        }


        if (isBold && text.includes(":")) {
            isNewParagraph = true;
        }




        if (isNewParagraph) {
            texts.push(paragraph);
            paragraph = "";
        }


        if (text !== "-") {
            if (isHeader) {
                paragraph += text.toUpperCase();
            } else {
                paragraph += text;
            }

        }

        if (ind + 1 === pageTexts.length) {
            paragraph += text;
            texts.push(paragraph);
            paragraph = "";
        }

        wasNewParagraph = isNewParagraph;
        prevText = p;

        return texts;
    }, []);
}

const page = getPage(226);



console.log(page);
