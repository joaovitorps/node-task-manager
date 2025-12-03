export default function verifyUrl(url) {
    return new RegExp(`^${url}(?<query>\\?(.*))?$`);
}