export const generateSlug = (title: string) => {
  return title.toLowerCase().split(' ').join('-');
};
