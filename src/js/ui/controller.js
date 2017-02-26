// Rivets
import rivets from '../lib/rivets';
import template from '../../html/svg2ss-converter.html';

// The magic
import UploadHandler from '../file/upload-handler';
import {MIMETYPE_SVG, parseSvg, generateShapeScript} from '../conversion/generate-shapescript';

// Some utils
import {collectionHas} from '../lib/utils';

/* This handler converts the SVG source into ShapeScript. */
const _callbackHandler = function (file) {
    if (file.type === MIMETYPE_SVG) {
        file.shapeScript = generateShapeScript(parseSvg(file.content));
    }
};


/**
 * Controller for the UI of the converter.
 *
 * @class UiController
 */
class UiController {
    /**
     * Creates a SVG2ShapeScript converter.
     *
     * @param el the element the UI should be injected into
     */
    constructor(el) {
        this.div = el;
        this.files = [];
        this.context = {
            files: this.files,
            shapeScript: ''
        };
    }

    /**
     * Render the converter and start it.
     */
    render() {
        const uploadHandler = new UploadHandler(this.files, _callbackHandler);

        this.div.innerHTML = template;
        rivets.bind(this.div, this.context);

        uploadHandler.startListening(
            this.div.querySelector('input[name="files[]"]'),
            this.div.querySelector('div.drop-zone'));

        this.div.querySelector('.uploaded').addEventListener('click', this._handleResultClick.bind(this));
    }

    /**
     * Ensures the clicked thumbnail is one of a converted SVG and displays its converted source.
     *
     * @param event the click event
     * @private
     */
    _handleResultClick(event) {
        // Ensure the clicked div was a successfully converted SVG
        const all = this.div.querySelectorAll('li.converted');
        let clickedThumbnail = event.target;
        while (clickedThumbnail && !collectionHas(all, clickedThumbnail)) { //keep going up until you find a match
            clickedThumbnail = clickedThumbnail.parentNode; //go up
        }

        // Only if conversion was successful
        if (clickedThumbnail) {
            const file = this.files[clickedThumbnail.dataset.index];
            this._displaySource(file)
        }
    }

    /**
     * Displays the ShapeScript source of the selected file.
     *
     * @param file the file to display
     * @private
     */
    _displaySource(file) {
        // alert(file.shapeScript);
        this.context.shapeScript = file.shapeScript;
    }
}

export default UiController;
