export const stopPropagationHandler = (
  e: React.MouseEvent,
  callback: () => void
) => {
  e.stopPropagation();
  callback();
};
