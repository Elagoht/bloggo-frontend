export default class Calendar {
  public static formatDate = (input: string | Date | number) => {
    const date = input instanceof Date ? input : new Date(input);
    const showYear = date.getFullYear() < new Date().getFullYear();

    return date.toLocaleString(window.navigator.language, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      year: showYear ? "numeric" : undefined,
    });
  };
}
