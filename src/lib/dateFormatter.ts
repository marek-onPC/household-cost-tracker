import { DateType } from "../types";

export const dateFormatter = (date: Date, format: DateType) => {
  const preformattedDate = new Date(date);
  let formattedDate: string = preformattedDate.toLocaleString();

  switch (format) {
    case DateType.DDMMYYYY:
      {
        const day = preformattedDate.getDate().toString();
        const month =
          (preformattedDate.getMonth() + 1).toString().length === 1
            ? `0${(preformattedDate.getMonth() + 1).toString()}`
            : (preformattedDate.getMonth() + 1).toString();
        const year = preformattedDate.getFullYear();
        formattedDate = `${day}.${month}.${year}`;
      }
      break;

    case DateType.MMDDYYYY:
      {
        const day = preformattedDate.getDate().toString();
        const month =
          (preformattedDate.getMonth() + 1).toString().length === 1
            ? `0${(preformattedDate.getMonth() + 1).toString()}`
            : (preformattedDate.getMonth() + 1).toString();
        const year = preformattedDate.getFullYear();
        formattedDate = `${month}.${day}.${year}`;
      }
      break;

    case DateType.YYYYMMDD:
      {
        const day = preformattedDate.getDate().toString();
        const month =
          (preformattedDate.getMonth() + 1).toString().length === 1
            ? `0${(preformattedDate.getMonth() + 1).toString()}`
            : (preformattedDate.getMonth() + 1).toString();
        const year = preformattedDate.getFullYear();
        formattedDate = `${year}.${month}.${day}`;
      }
      break;

    case DateType.ASIA_YYYYMMDD:
      {
        const day = preformattedDate.getDate().toString();
        const month =
          (preformattedDate.getMonth() + 1).toString().length === 1
            ? `0${(preformattedDate.getMonth() + 1).toString()}`
            : (preformattedDate.getMonth() + 1).toString();
        const year = preformattedDate.getFullYear();
        formattedDate = `年${year}月${month}日${day}`;
      }
      break;
  }
  return formattedDate;
};
