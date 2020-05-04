import moment from 'moment';


/**
 * Преобразовываем время в формате `часы:минуты`
 * @param {string} date - Исходная запись времени
 * @return {string} Время в формате `часы:минуты`
 */
const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};


export {
  formatTime,
  formatDate,
  isRepeating,
  isOverdueDate,
  isOneDay,
};
