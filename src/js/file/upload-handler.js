import {parseSvgFile} from '../svg/svg-parser';

const output = [];

const handleFiles = function (files) {
    // files is a FileList of File objects. List some properties.
    for (let i = 0; i < files.length; i++) {
        output.push(parseSvgFile(files[i]));
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
