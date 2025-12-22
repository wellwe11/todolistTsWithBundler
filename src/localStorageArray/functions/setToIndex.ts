const setToIndex = (direction: string, index: number, arrayLength: number) => {
  let toIndex: number;
  if (direction === "up") {
    if (index === 0) return null;
    toIndex = index - 1;
  } else {
    if (index === arrayLength) return null;
    toIndex = index + 1;
  }

  return toIndex;
};

export default setToIndex;
