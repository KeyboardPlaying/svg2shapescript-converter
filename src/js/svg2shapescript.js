import UiController from './ui/controller';

// The styling
import 'scss/svg2shapescript.scss';

window.onload = function () {
    const converterDivs = document.getElementsByClassName('svg2sharescript');

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        // Great success! All file APIs are supported.
        for (const div of converterDivs) {
            new UiController(div).render();
        }

    } else {

        // We can't make it, sorry.
        for (const div of converterDivs) {
            div.innerText = 'The File APIs are not fully supported in this browser, the converter cannot work.';
        }
    }
};
