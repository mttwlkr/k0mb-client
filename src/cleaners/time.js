export const getDayOfWeekString = (numDay) => {
  let dayOfWeek;
  switch (numDay) {
    case 0:
      dayOfWeek = 'Sunday'
      break;
    case 1:
      dayOfWeek = 'Monday'
      break;
    case 2:
      dayOfWeek = 'Tuesday'
      break;
    case 3:
      dayOfWeek = 'Wednesday'
      break;
    case 4:
      dayOfWeek = 'Thursday'
      break;
    case 5:
      dayOfWeek = 'Friday'
      break;
    case 6:
      dayOfWeek = 'Saturday'
      break;
    default:
      dayOfWeek = null
      break;
  }
  return dayOfWeek;
}

export const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export const getTimeOfDay = (fromUnix) => {
  const d = new Date(fromUnix);
  const h = addZero(d.getHours());
  const m = addZero(d.getMinutes());
  return `${h}:${m}`
}

export const getHour = (fromUnix) => {
  const d = new Date(fromUnix);
  return parseInt(addZero(d.getHours()), 10)
}

export const getDayOfWeekNum = (fromUnix) => {
  const d = new Date(fromUnix);
  return d.getDay();
}