export const formateDate1 = (timestamp) => {
  const currentTimestamp = Date.now();
  const diffInMilliseconds = currentTimestamp - new Date(timestamp);
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays > 7) {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString()}`;
    return formattedDate;
  }

  if(diffInDays) {
    return `${diffInDays}d`
  }
  return `${diffInHours}h`;
};