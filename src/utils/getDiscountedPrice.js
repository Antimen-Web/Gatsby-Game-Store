export const getDiscountedPrice = (price, sale) => {
  if (!sale) return price; // если нет скидки
  const discount = parseFloat(sale); // "-40%" → -40
  return +(price * (1 + discount / 100)).toFixed(2); // округляем до 2 знаков
};
