import { padLeft } from './string';

const REGEX_DATE_SPLIT_FORMAT =
  /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

const splitDate = (date: Date) => {
  return {
    y: date.getFullYear(),
    M: date.getMonth(),
    D: date.getDate(),
    W: date.getDay(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    ms: date.getMilliseconds(),
  };
};

export const formatDate = (template = 'HH:mm', date: Date) => {
  const splitted = splitDate(date);

  const matches: any = {
    YY: `${splitted.y}`.slice(-2),
    YYYY: splitted.y,
    M: splitted.M + 1,
    MM: padLeft(`${splitted.M + 1}`, '0', 2),
    D: splitted.D,
    DD: padLeft(`${splitted.D}`, '0', 2),
    d: `${splitted.W}`,
    H: `${splitted.H}`,
    HH: padLeft(`${splitted.H}`, '0', 2),
    m: `${splitted.m}`,
    mm: padLeft(`${splitted.m}`, '0', 2),
    s: `${splitted.s}`,
    ss: padLeft(`${splitted.s}`, '0', 2),
    SSS: padLeft(`${splitted.ms}`, '0', 3),
  };

  return template.replace(REGEX_DATE_SPLIT_FORMAT, (match) => matches[match]);
};
