/**
 * Export an XML parser to create an abstraction that can be mocked when code is run on NodeJS.
 * @returns {DOMParser}
 */

module.exports.parser = function () {
    return new DOMParser();
};