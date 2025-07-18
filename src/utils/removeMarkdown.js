export const removeMarkdown = text => {
  return text
    .replace(/(#+\s*)/g, "") // Заголовки
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // Жирный текст
    .replace(/(\*|_)(.*?)\1/g, "$2") // Курсив
    .replace(/~~(.*?)~~/g, "$1") // Зачеркнутый текст
    .replace(/`(.*?)`/g, "$1") // Код (inline)
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Ссылки
    .replace(/\n/g, " ") // Переносы строк
    .replace(/<\/?[^>]+(>|$)/g, ""); // HTML-теги (на случай если есть)
};
