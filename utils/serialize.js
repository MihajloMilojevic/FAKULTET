export default function serialize(value) {
    return JSON.parse(JSON.stringify(value));
}