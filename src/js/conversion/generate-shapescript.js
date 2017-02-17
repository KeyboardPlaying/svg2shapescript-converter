const xml = require('./xml');

const generateScript = function (svgXml) {
    let oParser = xml.parser();
    let svgDocument = oParser.parseFromString(svgXml, "text/xml");
    let rects = svgDocument.getElementsByTagName('rect');

    let text = 'shape main {\n';
    text += '    h_align = "center";\n';
    text += '    v_align = "center";\n';
    text += '    fixedAspectRatio = "true";\n';
    text += '\n';


    for (let rectIndex = 0; rectIndex < rects.length; rectIndex++) {
        text += '    Rectangle(15, 12, 85, 75);\n'
    }

    text += '}\n';

    return text;
};

module.exports = {
    generateScript: generateScript
};