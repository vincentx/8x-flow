import {parse} from "../src/main";
import glob from "glob";
import fs from "fs";

describe('Functional Test', () => {
    let yaml = glob.sync(`${process.cwd()}/test/scripts/**/*.yml`);
    let cases = yaml.filter((file) => fs.existsSync(`${(file.slice(0, -4))}.json`))
        .map((file) => [file.split(process.cwd())[1], file, `${(file.slice(0, -4))}.json`]);

    let errors = yaml.filter((file) => fs.existsSync(`${(file.slice(0, -4))}.txt`))
        .map((file) => [file.split(process.cwd())[1], file, `${(file.slice(0, -4))}.txt`]);


    test.each(cases)('TEST: %s', (_, y, j) => {
        let result = parse(read(y));
        let expected = json(j);

        expect(result.models).toEqual(expect.arrayContaining(expected.models));
        expect(result.models.length).toEqual(expected.models.length);
        expect(result.relationships).toEqual(expect.arrayContaining(expected.relationships));
        expect(result.relationships.length).toEqual(expected.relationships.length);
    });

    test.each(errors)('TEST: %s', (_, y, t)=>{
        let message = read(t).trim();
        expect(message.length).toBeGreaterThan(0);
        expect(() => parse(read(y))).toThrow(message);
    });

    function read(name) {
        return fs.readFileSync(name, 'utf8').toString();
    }

    function json(name) {
        return JSON.parse(fs.readFileSync(name, 'utf8'));
    }
});

