const generateScript = function (svgXml) {
    let oParser = new DOMParser();
    let svgDocument = oParser.parseFromString(svgXml, "text/xml");
    window._svg = svgDocument;

    let text = '';

    let rects = svgDocument.getElementsByTagName('rect');

    for (let rectIndex = 0; rectIndex < rects.length; rectIndex++) {
        text += 'rect\n'
    }

    return text;
};

export const parseSvgFile = function (f) {
    let line = [
        '<strong>', encodeURI(f.name), '</strong> (', (f.type || 'n/a'), ') - ', f.size, ' bytes, last modified: ',
        (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a')
    ];
    if (f.type === 'image/svg+xml') {
        let reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function () {
            return function (e) {
                // Render thumbnail.
                let pre = document.createElement('pre');
                pre.innerText = generateScript(e.target.result);
                document.getElementById('list').insertBefore(pre, null);
            };
        })(f);

        reader.readAsText(f);
    }
    return line.join('');
};
