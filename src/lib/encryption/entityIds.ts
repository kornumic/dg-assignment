export const generateEntityId = (): string => {
  return crypto.randomUUID().toString();
};
