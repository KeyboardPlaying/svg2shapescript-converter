import {handleDragOver, handleFileSelect, handleFileDrop} from './file/upload-handler';
// The styling
import 'scss/svg2shapescript.scss';

window.onload = function () {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        let fileInput = document.getElementById('files'),
            dropZone = document.getElementById('drop-zone');

        // Great success! All the File APIs are supported.
        fileInput.addEventListener('change', handleFileSelect, false);
        dropZone.addEventListener('click', function () {
            fileInput.click();
        }, false);
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileDrop, false);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
};
