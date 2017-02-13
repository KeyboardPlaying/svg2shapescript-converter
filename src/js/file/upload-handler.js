let handleFiles = function (files) {
    // files is a FileList of File objects. List some properties.
    let output = [];
    for (let i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', encodeURI(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
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
