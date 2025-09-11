export const getInvestigatorLetter = (name: string): string => {
  return name.replace(/[«».,/#!$%^&*;:{}=\-_`~()"'\s]/g, '')[0];
};
