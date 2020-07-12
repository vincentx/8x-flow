import CodeMirror from "codemirror/lib/codemirror";
import * as dsl from "@8x-flow/yaml-script";

export function parse(text, options, cm) {
    let found = [];
    try {
        dsl.parse(text);
    } catch (e) {
        let line = cm && cm.getCursor() ? cm.getCursor().line : 0;
        found.push({from: CodeMirror.Pos(line, 0), to: CodeMirror.Pos(line, 0), message: e});
    }
    return found;
}
