import {parse} from "../src/main";
import glob from "glob";
import fs from "fs";

describe('Functional Test', () => {
    describe('Function Cases', () => {
        test.each(cases())('TEST: %s', (_, y, j) => {
            expectMatch(parse(read(y)), json(j));
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
            ['rfp'],
            ['proposal'],
            ['contract'],
            ['evidence'],
            ['agreement']
        ])('%s declaration', (mi) => {

            test.each(cases('moment-interval'))('TEST: %s', (_, y, j) => {
                expectMatch(parse(require(y).yaml({type: mi})), require(j).json(mi));
            });

            test.each(errors('moment-interval'))('TEST: %s', (_, y, t) => {
                expectError(read(t).trim(), () => parse(require(y).yaml({type: mi})))
            });
        });
    });

    describe("Declarations with fulfillment", () => {
        describe.each([
            ['contract'],
            ['agreement']
        ])('%s declaration', (mi) => {

            test.each(cases('fulfillment'))('TEST: %s', (_, y, j) => {
                expectMatch(parse(require(y).yaml({type: mi})), require(j).json(mi));
            });

            test.each(errors('fulfillment'))('TEST: %s', (_, y, t) => {
                expectError(read(t).trim(), () => parse(require(y).yaml({type: mi})))
            });
        });
    });

    function cases(folder) {
        let yaml = glob.sync(`${process.cwd()}/test/scripts/${folder}/**/*.yml.js`);
        return yaml.filter((file) => fs.existsSync(`${(file.slice(0, -7))}.json.js`))
            .map((file) => [file.split(process.cwd())[1], file, `${(file.slice(0, -7))}.json.js`]);
    }

    function errors(folder) {
        let yaml = glob.sync(`${process.cwd()}/test/scripts/${folder}/**/*.yml.js`);
        return yaml.filter((file) => fs.existsSync(`${(file.slice(0, -7))}.txt`))
            .map((file) => [file.split(process.cwd())[1], file, `${(file.slice(0, -7))}.txt`]);
    }

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

