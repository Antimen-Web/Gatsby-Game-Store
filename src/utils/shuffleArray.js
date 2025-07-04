export const shuffleArray = array => {
  return array
    .map(value => ({ value, sort: Math.random() })) // Добавляем случайное число
    .sort((a, b) => a.sort - b.sort) // Сортируем по случайному числу
    .map(({ value }) => value); // Извлекаем значения
};
