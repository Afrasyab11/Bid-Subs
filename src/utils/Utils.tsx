export const checkNullOrEmpty = (value:any) => {
  if (value === undefined || value === null || value === "") return true;

  if (typeof value === "object" && !Array.isArray(value)) {
    return Object.keys(value).length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
};