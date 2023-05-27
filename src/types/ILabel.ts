export interface ILabelsResponse {
  labels: ILabel[];
}

export interface ILabel {
  id: string;
  name: string;
  messageListVisibility: string;
  labelListVisibility: string;
  type: string;
}
