export interface IMessagePayloadHeaderItem {
  name: string;
  value: string;
}
interface IMessagePayloadBody {
  attachmentId: string;
  size: number;
  data: string;
}

interface IMessagePayload {
  partId: string;
  mimeType: string;
  filename: string;
  headers: IMessagePayloadHeaderItem[];
  body: IMessagePayloadBody;
  parts: IMessagePayload[];
}

export interface IMessageResponse {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  historyId: string;
  internalDate: string;
  payload: IMessagePayload;
  sizeEstimate: number;
  raw: string;
}
