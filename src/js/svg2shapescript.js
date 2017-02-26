// Rivets
import rivets from './lib/rivets';
import template from '../html/svg2ss-converter.html';

// The magic
import UploadHandler from './file/upload-handler';
import {MIMETYPE_SVG, generateScript} from './conversion/generate-shapescript';

// The styling
import 'scss/svg2shapescript.scss';

const loadConverter = function (div) {
    const callbackHandler = function (file) {
        if (file.type === MIMETYPE_SVG) {
            file.shapeScript = generateScript(new DOMParser().parseFromString(file.content, 'application/xml'));
        }
    };

    const files = [],
        svgUploadHandler = new UploadHandler(files, callbackHandler);

    div.innerHTML = template;
    rivets.bind(div, {files});

    svgUploadHandler.startListening(
        div.querySelector('input[name="files[]"]'),
        div.querySelector('div.drop-zone'));
};

window.onload = function () {
    const converterDivs = document.getElementsByClassName('svg2sharescript');

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        // Great success! All file APIs are supported.
        for (const div of converterDivs) {
            loadConverter(div);
        }

    } else {

        // We can't make it, sorry.
        for (const div of converterDivs) {
            div.innerText = 'The File APIs are not fully supported in this browser, the converter cannot work.';
        }
    }
};
