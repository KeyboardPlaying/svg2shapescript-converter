import rivets from 'rivets';

const EMPTY = '',
    FILE_SIZE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB'];

rivets.formatters.length = (object) => object ? object.length : 0;

rivets.formatters.gt = (left, right) => left > right;

rivets.formatters.toBoolean = (value) => Boolean(value);

rivets.formatters.dateTime = (date) => date
    ? date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    : EMPTY;

rivets.formatters.fileSize = function (size) {
    if (!size) {
        return EMPTY;
    }

    let digitGroups = Math.min(Math.floor(Math.log10(size) / Math.log10(1024)));
    if (digitGroups > FILE_SIZE_UNITS.length) {
        digitGroups = FILE_SIZE_UNITS.length;
    }

    const fileSize = size / Math.pow(1024, digitGroups);
    return Math.round(fileSize * 100) / 100 + ' ' + FILE_SIZE_UNITS[digitGroups];
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
