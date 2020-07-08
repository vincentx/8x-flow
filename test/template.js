export default function template(strings, ...keys) {
    return (function (...values) {
        let dict = values[values.length - 1];
        let result = [strings[0]];
        keys.forEach((key, i) =>  result.push(dict[key], strings[i + 1]));
        return result.join('');
    });
}