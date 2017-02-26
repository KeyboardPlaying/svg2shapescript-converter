import rivets from 'rivets';

const EMPTY = '';

rivets.formatters.date = function (date) {
    return date ? date.toLocaleDateString() : EMPTY;
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
