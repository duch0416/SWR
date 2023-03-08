import { getApiUrl } from "api/helpers/getApiUrl";
import axios from "axios";
import { AddReportItemPayload } from "./types"

export type Item = {
  name: string;
  id: string;
}

type FetchReportParams = {
  reportId: string;
  page?: number;
  search?: string;
}

export const fetchReport = async (params: FetchReportParams):  Promise<Item[]> => {
  const res = await axios.get(getApiUrl('/reports'), {params})

  return res?.data?.data
}

export const addReportItem = async (payload: AddReportItemPayload): Promise<Item> => {
  const res = await axios.post(getApiUrl(`/reports/${payload.reportId}`), payload)
  return res.data
}

export const removeReportItem = async (payload: AddReportItemPayload): Promise<Item> => {
  const removedItem = await axios.delete(getApiUrl(`/reports/${payload.reportId}`), {data: payload})
  return removedItem.data
}
