import { formatDistance, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

export const handleGetTimeOut = (dateString: string): string => {
  const date = parseISO(dateString);
  let distance = formatDistance(date, new Date(), { locale: vi });
  distance = distance.replace("khoảng ", "");
  distance = distance.replace("dưới ", "");
  return distance + " trước";
};
