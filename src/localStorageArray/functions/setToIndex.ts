const setToIndex = (
  direction: string,
  index: number,
  startIndex: number,
  arrayLength: number
) => {
  let toIndex: number;

  if (direction === "up") {
    if (index === startIndex) return null;
    toIndex = index - 1;
  } else {
    if (index === arrayLength - 1) return null;
    toIndex = index + 1;
  }

  return toIndex;
};

export default setToIndex;
