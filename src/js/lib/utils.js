export const collectionHas = function (collection, needle) {
    for (const item of collection) {
        if (item === needle) {
            return true;
        }
    }
    return false;
};
