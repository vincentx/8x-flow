import {parse} from "../src/main";
import glob from "glob";
import fs from "fs";

describe('Functional Test', () => {
    describe('Function Cases', () => {
        test.each(cases())('TEST: %s', (_, y, j) => {
            expectMatch(parse(read(y)), json(j));
        });

        test.each(errors())('TEST: %s', (_, y, t) => {
            expectError(read(t).trim(), () => parse(read(y)));
        });

        function cases() {
            let yaml = glob.sync(`${process.cwd()}/test/scripts/**/*.yml`);
            return yaml.filter((file) => fs.existsSync(`${(file.slice(0, -4))}.json`))
                .map((file) => [file.split(process.cwd())[1], file, `${(file.slice(0, -4))}.json`]);
        }

        function errors() {
            let yaml = glob.sync(`${process.cwd()}/test/scripts/**/*.yml`);
            return yaml.filter((file) => fs.existsSync(`${(file.slice(0, -4))}.txt`))
                .map((file) => [file.split(process.cwd())[1], file, `${(file.slice(0, -4))}.txt`]);
        }
    });

    describe("Moment Interval Declarations", () => {
        describe.each([
            ['contract'],
            ['evidence']
        ])('%s declaration', (mi) => {

            test.each(cases())('TEST: %s', (_, y, j) => {
                expectMatch(parse(require(y).yaml({type: mi})), JSON.parse(require(j).json({type: mi})));
            });

            test.each(errors())('TEST: %s', (_, y, t) => {
                expectError(read(t).trim(), () => parse(require(y).yaml({type: mi})))
            });
        });

        function cases() {
            let yaml = glob.sync(`${process.cwd()}/test/scripts/moment-interval/**/*.yml.js`);
            return yaml.filter((file) => fs.existsSync(`${(file.slice(0, -7))}.json.js`))
                .map((file) => [file.split(process.cwd())[1], file, `${(file.slice(0, -7))}.json.js`]);
        }

        function errors() {
            let yaml = glob.sync(`${process.cwd()}/test/scripts/moment-interval/**/*.yml.js`);
            return yaml.filter((file) => fs.existsSync(`${(file.slice(0, -7))}.txt`))
                .map((file) => [file.split(process.cwd())[1], file, `${(file.slice(0, -7))}.txt`]);
        }
    });


    function expectMatch(result, expected) {
        expect(result.models).toEqual(expect.arrayContaining(expected.models));
        expect(result.models.length).toEqual(expected.models.length);
        expect(result.relationships).toEqual(expect.arrayContaining(expected.relationships));
        expect(result.relationships.length).toEqual(expected.relationships.length);
    }

    function expectError(message, actual) {
        expect(message.length).toBeGreaterThan(0);
        expect(actual).toThrow(message);
    }

    function read(name) {
        return fs.readFileSync(name, 'utf8').toString();
    }

    function json(name) {
        return JSON.parse(fs.readFileSync(name, 'utf8'));
    }
});

