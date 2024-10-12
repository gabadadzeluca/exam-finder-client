export const formatDate = (dateStr: Date) => {
  const date = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return null;
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1; // months are zero-based
  const year = date.getFullYear();

  // Check if any of the values are NaN
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year)
  ) {
    return null;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )} ${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
};
