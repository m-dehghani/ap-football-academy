export function parseBirthDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const today = new Date();
  const endOfToday = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day ||
    date.getTime() > endOfToday
  ) {
    return null;
  }
  return date;
}

export function calculateAge(birthDate: Date, onDate = new Date()): number {
  let age = onDate.getUTCFullYear() - birthDate.getUTCFullYear();
  const monthDifference = onDate.getUTCMonth() - birthDate.getUTCMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && onDate.getUTCDate() < birthDate.getUTCDate())
  ) {
    age -= 1;
  }
  return age;
}
