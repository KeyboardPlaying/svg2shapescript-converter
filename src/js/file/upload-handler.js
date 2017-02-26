class SvgUploadHandler {
    /**
     *Creates the handler.
     *
     * @param files the file array
     * @param uploadCallback
     * @constructor
     */
    constructor(files, uploadCallback) {
        this.uploadedFiles = files || [];
        this.uploadCallback = uploadCallback;
    }

    /**
     * Reads a single file and parses it into an object.
     *
     * @param f the file being uploaded
     * @param {function} uploadCallback the function to be called once the upload is finished
     * @returns {{name: string, type: string, size: number, lastModified: string}}
     */
    static readFile(f, uploadCallback) {
        const file = {
            name: encodeURI(f.name),
            type: f.type,
            size: f.size,
            lastModified: f.lastModifiedDate
        };

        const reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function () {
            return function (e) {
                file.content = e.target.result;
                if (uploadCallback) {
                    uploadCallback.call(this, file);
                }
            };
        })(f);

        reader.readAsText(f);
        return file;
    }

    /**
     * Handles files being uploaded, parsing them and pushing them to the array.
     *
     * @param {Array} uploaded the files being uploaded
     * @private
     */
    handleFiles(uploaded) {
        // uploaded is a FileList of File objects. List some properties.
        for (let i = 0, f; f = uploaded[i]; i++) {
            this.uploadedFiles.push(SvgUploadHandler.readFile(f, this.uploadCallback));
        }
    }

    /**
     * Handles the event when files are selected through the file input
     *
     * @param evt the select event
     */
    handleFileSelect(evt) {
        this.handleFiles(evt.target.files);
    }

    /**
     * Handles the event when files are dragged over the drop zone.
     *
     * @param evt the drag over event
     */
    handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        // Explicitly show this is a copy.
        evt.dataTransfer.dropEffect = 'copy';
    }

    /**
     * Handles the event when files are dropped over the drop zone.
     *
     * @param evt the drop event
     */
    handleFileDrop(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        this.handleFiles(evt.dataTransfer.files);
    }

    startListening(fileInput, dropZone) {
        if (fileInput) {
            fileInput.addEventListener('change', this.handleFileSelect.bind(this), false);
        }

        if (dropZone) {
            if (fileInput) {
                // Make clicking on the drop zone equivalent to clicking on the file input
                dropZone.addEventListener('click', function () {
                    fileInput.click();
                }, false);
            }

            dropZone.addEventListener('dragover', this.handleDragOver.bind(this), false);
            dropZone.addEventListener('drop', this.handleFileDrop.bind(this), false);
        }
    }
}

export default SvgUploadHandler;
