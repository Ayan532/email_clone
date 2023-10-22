

export const getDateFormat=(timestamp)=>{
    const date = new Date(timestamp);


    const formattedDate = date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return formattedDate
}