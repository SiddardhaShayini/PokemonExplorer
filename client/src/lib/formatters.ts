// Format height from decimeters to meters
export const formatHeight = (height: number): string => {
  const meters = height / 10;
  return `${meters}m`;
};

// Format weight from hectograms to kilograms
export const formatWeight = (weight: number): string => {
  const kilograms = weight / 10;
  return `${kilograms}kg`;
};
