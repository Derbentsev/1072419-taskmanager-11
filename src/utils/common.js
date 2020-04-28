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


export {
  formatTime,
  formatDate,
};
