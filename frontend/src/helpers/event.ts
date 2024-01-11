export const stopPropagationHandler = (callback: () => void) => {
  return (e: React.MouseEvent) => {
    e.stopPropagation();
    callback();
  };
};
