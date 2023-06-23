export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}  ${hours}:${minutes}`;

  return formattedDate;
};

export const getDateDifference = (dateString: string): string => {
  var now = new Date();
  var givenDate = new Date(dateString);

  var timeDiff = Math.abs(now.getTime() - givenDate.getTime());
  var diffSeconds = Math.floor(timeDiff / 1000);
  var diffMinutes = Math.floor(diffSeconds / 60);
  var diffHours = Math.floor(diffMinutes / 60);
  var diffDays = Math.floor(diffHours / 24);
  var diffWeeks = Math.floor(diffDays / 7);
  var diffMonths = Math.floor(diffDays / 30.44);
  var diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return diffYears + " year" + (diffYears > 1 ? "s" : "");
  } else if (diffMonths > 0) {
    return diffMonths + " month" + (diffMonths > 1 ? "s" : "");
  } else if (diffWeeks > 0) {
    return diffWeeks + " week" + (diffWeeks > 1 ? "s" : "");
  } else if (diffDays > 0) {
    return diffDays + " day" + (diffDays > 1 ? "s" : "");
  } else if (diffHours > 0) {
    return diffHours + " hour" + (diffHours > 1 ? "s" : "");
  } else if (diffMinutes > 0) {
    return diffMinutes + " minute" + (diffMinutes > 1 ? "s" : "");
  } else {
    return diffSeconds + " second" + (diffSeconds > 1 ? "s" : "");
  }
};
