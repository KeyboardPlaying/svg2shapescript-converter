import rivets from 'rivets';

const EMPTY = '',
    FILE_SIZE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB'];

rivets.formatters.toBoolean = function (value) {
    return Boolean(value);
};

rivets.formatters.dateTime = function (date) {
    return date ? date.toLocaleDateString() + ' ' + date.toLocaleTimeString() : EMPTY;
};

rivets.formatters.fileSize = function (size) {
    if (!size) {
        return EMPTY;
    }

    let digitGroups = Math.floor(Math.log10(size) / Math.log10(1024));
    return Math.round(size / Math.pow(1024, Math.min(digitGroups, FILE_SIZE_UNITS.length)), 2)
        + ' ' + FILE_SIZE_UNITS[digitGroups];
};

rivets.formatters.default = function (value, def) {
    if (value) {
        return value;
    }
    return def || EMPTY;
};

rivets.formatters.toData = function (file) {
    const encodedContent = btoa(file.content);
    return `data:${file.type};base64,${encodedContent}`;
};

export default rivets;
