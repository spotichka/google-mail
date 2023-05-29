export interface ILabelsResponse {
  labels: Label[];
}

export interface Label {
  id: string;
  name: string;
  messageListVisibility: string;
  labelListVisibility: string;
  type: string;
}
