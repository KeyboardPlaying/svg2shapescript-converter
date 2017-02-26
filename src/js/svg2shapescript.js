// Rivets
import rivets from './lib/rivets';
import template from '../html/svg2ss-converter.html';

// The magic
import UploadHandler from './file/upload-handler';
import {MIMETYPE_SVG, generateScript} from './conversion/generate-shapescript';

// The styling
import 'scss/svg2shapescript.scss';

const loadConverter = function (converterDiv) {
    const callbackHandler = function (file) {
        if (file.type === MIMETYPE_SVG) {
            file.shapeScript = generateScript(new DOMParser().parseFromString(file.content, 'application/xml'));
        }
    };

    const files = [],
        svgUploadHandler = new UploadHandler(files, callbackHandler);

    converterDiv.innerHTML = template;
    rivets.bind(converterDiv, {files});

    svgUploadHandler.startListening(
        document.getElementById('files'),
        document.getElementById('drop-zone'));
};

window.onload = function () {
    const converterDiv = document.getElementById('svg2ss-converter');

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        // Great success! All file APIs are supported.
        loadConverter(converterDiv);

    } else {

        // We can't make it, sorry.
        converterDiv.innerText = 'The File APIs are not fully supported in this browser.';
    }
};
