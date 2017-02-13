import {parseSvgFile} from '../svg/svg-parser';

let output = [];

let handleFiles = function (files) {
    // files is a FileList of File objects. List some properties.
    for (let i = 0, f; f = files[i]; i++) {
        output.push(parseSvgFile(f));
    }
    document.getElementById('list').innerHTML = '<ul><li>' + output.join('</li><li>') + '</li></ul>';
};

export const handleFileSelect = function (evt) {
    handleFiles(evt.target.files);
};

export const handleFileDrop = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();

    handleFiles(evt.dataTransfer.files);
};

export const handleDragOver = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
};
