import { IMessagePayloadHeaderItem } from "./types/MessageItem.ts";

export const getEmailHeadersValue = (
  headersArray: IMessagePayloadHeaderItem[],
  valueName: string
) => {
  if (!headersArray) {
    return;
  }

  return headersArray.find((item) => item.name === valueName)?.value;
};
