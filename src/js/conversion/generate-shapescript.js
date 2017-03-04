const scaling = require('./scaling');

const MIMETYPE_SVG = 'image/svg+xml';

const parseSvg = function (source) {
    return new DOMParser().parseFromString(source, 'application/xml');
};

const popToken = function (context) {
    if (context.tokens.length > 0) {
        let token = context.tokens[0];
        context.tokens = context.tokens.splice(1);
        return token;
    } else {
        return undefined;
    }
}

const parsePath = function (context) {
    while (token = popToken(context)) {
        if (token == 'Z') {
            // Nothing to do here
        } else if (token == 'M') {
            let x = Number(popToken(context));
            let y = Number(popToken(context));
            context.instructions.push({fn: 'MoveTo', args: [x, y]});
            context.scaler.register(x, y);
        } else if (token == 'L') {
            let x = Number(popToken(context));
            let y = Number(popToken(context));
            context.instructions.push({fn: 'LineTo', args: [x, y]});
            context.scaler.register(x, y);
        } else {
            let x = Number(token);
            let y = Number(popToken(context));
            context.instructions.push({fn: 'LineTo', args: [x, y]});
            context.scaler.register(x, y);
        }
    }
}

const generateShapeScript = function (svgDocument) {
    let defsRemovalInProgress = true;

    while (defsRemovalInProgress) {
        let defsElement = svgDocument.getElementsByTagName('defs')[0];

        if (defsElement) {
            defsElement.parentNode.removeChild(defsElement);
        } else {
            defsRemovalInProgress = false;
        }
    }

    let instructions = [];
    let scaler = new scaling.Scaler();

    let rects = svgDocument.getElementsByTagName('rect');

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

    let ellipses = svgDocument.getElementsByTagName('ellipse');

    for (let ellipseIndex = 0; ellipseIndex < ellipses.length; ellipseIndex++) {
        let ellipse = ellipses[ellipseIndex];
        let cx = Number(ellipse.getAttribute('cx'));
        let cy = Number(ellipse.getAttribute('cy'));
        let rx = Number(ellipse.getAttribute('rx'));
        let ry = Number(ellipse.getAttribute('ry'));
        let x = cx - rx;
        let y = cy - ry;
        let w = rx * 2;
        let h = ry * 2;
        instructions.push({fn: 'Ellipse', args: [x, y, w, h]});
        scaler.register(x, y);
        scaler.register(x + w, y + h);
    }

    let paths = svgDocument.getElementsByTagName('path');

    for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
        let path = paths[pathIndex];
        let pathDescription = path.getAttribute('d');
        let tokens = pathDescription.match(/[\w\.]+/g);
        parsePath({tokens, instructions, scaler});
    }

    instructions.forEach(function (inst) {
        if (inst.fn == 'Rectangle') {
            inst.args[0] = scaler.scale_x(inst.args[0]);
            inst.args[1] = scaler.scale_y(inst.args[1]);
            inst.args[2] = scaler.scale_w(inst.args[2]);
            inst.args[3] = scaler.scale_h(inst.args[3]);
        } else {
            inst.args[0] = scaler.scale_x(inst.args[0]);
            inst.args[1] = scaler.scale_y(inst.args[1]);
        }
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
    MIMETYPE_SVG,
    parseSvg,
    generateShapeScript
};
