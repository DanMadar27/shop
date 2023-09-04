export const validateSearch = (query: string) => {
  const regex = new RegExp('^[a-zA-Z0-9\\s]*$'); // Alphanumeric and spaces (can be empty string)
  return regex.test(query);
}
