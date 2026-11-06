import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

export const formatDate = (date: string) => {
  return dayjs(date + "T00:00:00").format("D MMMM YYYY");
};

export const formatNumericDate = (date: Date) => {
  return dayjs(date).format("DD/MM/YYYY");
};
