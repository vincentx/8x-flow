import CodeMirror from "codemirror/lib/codemirror";
import * as dsl from "@8x-flow/yaml-script";

export function parse(text) {
    let found = [];
    try {
        dsl.parse(text);
    } catch (e) {
        found.push({from: CodeMirror.Pos(0, 0), to: CodeMirror.Pos(0, 0), message: e});
    }
    return found;
}
