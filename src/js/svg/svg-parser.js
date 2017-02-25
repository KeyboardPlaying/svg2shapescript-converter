import {generateScript} from "../conversion/generate-shapescript";

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
                let parser = new DOMParser();
                let svgdoc = parser.parseFromString(e.target.result, 'application/xml');
                pre.innerText = generateScript(svgdoc);
                document.getElementById('list').insertBefore(pre, null);
            };
        })(f);

        reader.readAsText(f);
    }
    return line.join('');
};
