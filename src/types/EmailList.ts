interface IEmailListItem {
  id: string;
  threadId: string;
}

interface IEmailListResponse {
  messages?: IEmailListItem[];
  nextPageToken?: string;
  resultSizeEstimate: number;
}
