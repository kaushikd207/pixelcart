export const isDomainAvailable = async (_domain: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.5); // 50% chance of being available
    }, 500);
  });
};
