let scaling = require('./scaling');

const generateScript = function (svgDocument) {
    let defsRemovalInProgress = true;

    while (defsRemovalInProgress) {
        let defsElement = svgDocument.getElementsByTagName('defs')[0];

        if (defsElement) {
            defsElement.parentNode.removeChild(defsElement);
        } else {
            defsRemovalInProgress = false;
        }
    }

    let rects = svgDocument.getElementsByTagName('rect');
    let instructions = [];
    let scaler = new scaling.Scaler();

    for (let rectIndex = 0; rectIndex < rects.length; rectIndex++) {
        let rect = rects[rectIndex];
        let x = Number(rect.getAttribute('x'));
        let y = Number(rect.getAttribute('y'));
        let w = Number(rect.getAttribute('width'));
        let h = Number(rect.getAttribute('height'));
        instructions.push({fn: 'Rectangle', args: [x, y, w, h]});
        scaler.register(x, y);
        scaler.register(x + w, y + h);
    }

    instructions.forEach(function (inst) {
        inst.args[0] = scaler.scale_x(inst.args[0]);
        inst.args[1] = scaler.scale_y(inst.args[1]);
        inst.args[2] = scaler.scale_w(inst.args[2]);
        inst.args[3] = scaler.scale_h(inst.args[3]);
    });

    let text = 'shape main {\n';
    text += '    h_align = "center";\n';
    text += '    v_align = "center";\n';
    text += '    fixedAspectRatio = "true";\n';
    text += '\n';

    instructions.forEach(function (inst) {
        text += `    ${inst.fn}(${inst.args.join(',')});\n`
    });

    text += '}\n';

    return text;
};

module.exports = {
    generateScript: generateScript
};