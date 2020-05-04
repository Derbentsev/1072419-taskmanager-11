import {
  formatTime,
  formatDate,
  isOverdueDate,
} from '../../utils/common';
import {encode} from 'he';


const createButtonMarkup = (name, isArchive = true) => {
  return (
    `<button type="button" class="card__btn card__btn--${name} ${isArchive ? `` : `card__btn--disabled`}">
      ${name}
    </button>`
  );
};

/**
 * Создаем разметку Карточка задачи
 * @param {object} task - Объект задача
 * @return {void}
 */
export const createTaskTemplate = (task) => {
  const {description: notSanitizedDescription, dueDate, color, repeatingDays} = task;

  const isExpired = dueDate instanceof Date && isOverdueDate(dueDate, Date.now());
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? formatDate(dueDate) : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;
  const description = encode(notSanitizedDescription);

  const editButton = createButtonMarkup(`edit`);
  const archiveButton = createButtonMarkup(`archive`, !task.isArchive);
  const favoritesButton = createButtonMarkup(`favorites`, !task.isFavorite);

  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${editButton}
            ${archiveButton}
            ${favoritesButton}
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date}</span>
                  <span class="card__time">${time}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </article>`
  );
};
