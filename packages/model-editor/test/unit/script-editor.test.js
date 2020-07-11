import {shallowMount} from '@vue/test-utils'

import ScriptEditor from '../../src/components/script-editor';

document.body.createTextRange = function () {
    return {
        getBoundingClientRect: function () {
            return {bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0}
        },
        getClientRects: () => []
    }
}

describe("ScriptEditor", () => {

    test("should build code mirror from text area", () => {
        let component = shallowMount(ScriptEditor, {}).vm.$el;
        expect(component.querySelectorAll("textarea.script").length).toBe(1);
        expect(component.querySelectorAll("div.CodeMirror").length).toBe(1);
        expect(component.querySelectorAll("div.CodeMirror > div > textarea").length).toBe(1);
    });

    test("should pass code to code mirror via data", () => {
        let component = shallowMount(ScriptEditor, {data: () => {return {script: "contract: Order"}}});
        let editor = component.vm.$root.$children[0].editor;

        expect(editor.getValue()).toBe("contract: Order");
    });

    test("should bind changes back to script", () => {
        let data = {script: "contract: Order"};
        let component = shallowMount(ScriptEditor, {data: () => data});
        let editor = component.vm.$root.$children[0].editor;
        editor.setValue("contract: Purchase Order");

        expect(data.script).toBe("contract: Purchase Order");
        expect(component.emitted().input.length).toBe(1);
        expect(component.emitted().input[0][0]).toBe("contract: Purchase Order");
    });

    test("should emit input event when script changes", () => {
        let data = {script: "contract: Order"};
        let component = shallowMount(ScriptEditor, {data: () => data});
        let editor = component.vm.$root.$children[0].editor;
        editor.setValue("contract: Purchase Order");

        expect(component.emitted().input.length).toBe(1);
        expect(component.emitted().input[0][0]).toBe("contract: Purchase Order");
    });

});
