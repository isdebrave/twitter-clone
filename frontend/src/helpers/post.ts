export const isDummy = (id: number | string) => typeof id === "number";

export const isHeartFill = (array: string[], meId: string) => {
  if (array.includes(meId)) {
    return true;
  }

  return false;
};
