/**
 * Добавляем впереди нули к строке, если число меньше 10
 * @param {string} value - Исходная строка
 * @return {string} Строка с добавленным нулем
 */
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

/**
 * Преобразовываем время в формате `часы:минуты`
 * @param {string} time - Исходная запись времени
 * @return {string} Время в формате `часы:минуты`
 */
const formatTime = (time) => {
  const hours = castTimeFormat(time.getHours() % 12);
  const minutes = castTimeFormat(time.getMinutes());

  return `${hours}:${minutes}`;
};


export {
  formatTime,
};
