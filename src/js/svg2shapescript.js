import rivets from 'rivets';
import template from '../html/svg2ss-converter.html';

import {handleDragOver, handleFileSelect, handleFileDrop} from './file/upload-handler';
// The styling
import 'scss/svg2shapescript.scss';

window.onload = function () {
    const converterDiv = document.getElementById('svg2ss-converter');

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        loadConverter(converterDiv);
    } else {
        converterDiv.innerText = 'The File APIs are not fully supported in this browser.';
    }
};

function loadConverter(converterDiv) {
    converterDiv.innerHTML = template;
    rivets.bind(converterDiv, {hello: 'world'});

    const fileInput = document.getElementById('files'),
        dropZone = document.getElementById('drop-zone');

    // Great success! All the File APIs are supported.
    fileInput.addEventListener('change', handleFileSelect, false);
    dropZone.addEventListener('click', function () {
        fileInput.click();
    }, false);
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileDrop, false);
}
