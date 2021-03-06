import {
  Days,
  COLORS,
} from '../../consts';
import {
  formatTime,
  formatDate,
  isRepeating,
  isOverdueDate,
} from '../../utils/common';
import {encode} from 'he';


const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 140;

const isAllowableDescriptionLength = (description) => {
  const length = description.length;

  return length >= MIN_DESCRIPTION_LENGTH && length <= MAX_DESCRIPTION_LENGTH;
};

/**
 * Создаем шаблон разметки цветов в задаче
 * @param {object} colors - Цвета
 * @param {object} currentColor - Текущий цвет
 * @return {string} - Разметку цветов в задаче
 */
const createColorsMarkup = (colors, currentColor) => {
  return (
    colors
    .map((color, index) => {
      return (
        `<input
          type="radio"
          id="color-${color}-${index}"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${currentColor === color ? `checked` : ``}
        />
        <label
          for="color-${color}--${index}"
          class="card__color card__color--${color}"
          >${color}</label>`
      );
    })
    .join(`\n`)
  );
};

/**
 * Создаем шаблон разметки дней в задаче
 * @param {object} days - Дни недели
 * @param {object} repeatingDays - Повторяющиеся дни
 * @return {string} - Разметку дней в задаче
 */
const createReportingDaysMarkup = (days, repeatingDays) => {
  return (
    days
    .map((day, index) => {
      const isChecked = repeatingDays[day];

      return (
        `<input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}-${index}"
            name="repeat"
            value="${day}"
            ${isChecked ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}-${index}"
            >${day}</label>`
      );
    })
    .join(`\n`)
  );
};

const createTaskEditTemplate = (task, options = {}) => {
  const {dueDate, color} = task;
  const {isDateShowing, isRepeatingTask, activeRepeatingDays, currentDescription, externalData} = options;

  const description = encode(currentDescription);

  const isExpired = dueDate instanceof Date && isOverdueDate(dueDate, new Date());
  const isBlockSaveButton = (isDateShowing && isRepeatingTask) ||
    (isRepeatingTask && !isRepeating(activeRepeatingDays)) ||
      !isAllowableDescriptionLength(description);

  const date = (isDateShowing && dueDate) ? formatDate(dueDate) : ``;
  const time = (isDateShowing && dueDate) ? formatTime(dueDate) : ``;

  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const colorsMarkup = createColorsMarkup(COLORS, color);
  const repeatingDaysMarkup = createReportingDaysMarkup(Days, activeRepeatingDays);

  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;

  return `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
    <form class="card__form" method="get">
      <div class="card__inner">

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text">${description}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
              </button>

              ${isDateShowing ? `<fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${date} ${time}"
                  />
                </label>
              </fieldset>` : ``}

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
              </button>

              ${isRepeatingTask ? `<fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  ${repeatingDaysMarkup}
                </div>
              </fieldset>` : ``}

            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${colorsMarkup}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>${saveButtonText}</button>
          <button class="card__delete" type="button">${deleteButtonText}</button>
        </div>
      </div>
    </form>
  </article>`;
};


export {
  createTaskEditTemplate,
  isAllowableDescriptionLength,
};
