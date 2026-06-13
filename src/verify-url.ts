export function verifyUrl(url: string) {
  const routeParamsRegex = /:([a-zA-Z]+)/g;
  const pathWithRouteParams = url.replaceAll(
    routeParamsRegex,
    "(?<$1>[a-z0-9-_]+)",
  );

  return new RegExp(`^${pathWithRouteParams}`);
}
