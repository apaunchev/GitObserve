import { formatDistanceToNow, parseISO } from "date-fns";

export const isoToRelative = (date, addSuffix = true) => {
  if (!date) return null;

  return formatDistanceToNow(parseISO(date), { addSuffix });
};
