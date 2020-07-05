import fs from "fs";

export function yml(name) {
    return fs.readFileSync(`${process.cwd()}/test/scripts/${name}.yml`).toString();
}