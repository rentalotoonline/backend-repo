export function camelToSnakeCase(input: string): string {
  return input.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

export function snakeToCamelCase(input: string): string {
  return input.replace(/_([a-z])/g, (_, match) => match.toUpperCase());
}