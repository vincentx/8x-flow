import {parse} from "../src/main";
import glob from "glob";
import fs from "fs";

describe('Functional Test', () => {
    let yaml = glob.sync(`${process.cwd()}/test/scripts/**/*.yml`);
    let cases = yaml.filter((file) => fs.existsSync(`${(file.slice(0, -4))}.json`))
        .map((file) => [file.split(process.cwd())[1], file, `${(file.slice(0, -4))}.json`]);

    test.each(cases)('TEST: %s', (_, y, j) => {
        let result = parse(yml(y));
        let expected = json(j);

        expect(result.models).toEqual(expect.arrayContaining(expected.models));
        expect(result.relationships).toEqual(expect.arrayContaining(expected.relationships));
    });
});

export function yml(name) {
    return fs.readFileSync(name, 'utf8').toString();
}

export function json(name) {
    return JSON.parse(fs.readFileSync(name, 'utf8'));
}