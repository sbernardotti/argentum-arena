import Ii18nString from "./Ii18nString";

const TAG = "[processi18nString]";

export default function processi18nString(
  lang: string,
  string: Ii18nString,
  ...args: string[]
): string {
  let message = string[lang as keyof Ii18nString];

  args.forEach((arg, index) => {
    message = message.replace(`$${index + 1}`, arg);
  });

  return message;
}
