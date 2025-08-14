export const padZero = (value: string | number): string =>
  String(value).padStart(2, '0')

export const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1)

export const formatLaunchDate = (date: string): string =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })