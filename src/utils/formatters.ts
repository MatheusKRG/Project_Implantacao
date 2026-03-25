export function toCommaList(values: string[]) {
  return values.filter(Boolean).join(", ");
}

export function toTagArray(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
