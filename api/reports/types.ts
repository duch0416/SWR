export type FetchReportResponse = {
  data: any[]
}

export type AddReportItemPayload = {
  name: string;
  id: string;
  reportId: string;
}

export type RemoveReportItemPayload = {
  name: string;
  id: string;
  reportId: string;
}