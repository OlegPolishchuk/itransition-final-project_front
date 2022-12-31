export const parseDate = (date: string): string => {
  const updatedDate = Date.parse(`${date}`);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Intl.DateTimeFormat('ru', options).format(updatedDate);
};
