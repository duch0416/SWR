import { getApiUrl } from "api/helpers/getApiUrl";
import axios from "axios";
import { AddReportItemPayload } from "./types"

export type Item = {
  name: string;
  id: string;
}

export const fetchReport = async () => {
  console.log('fetch =>', 'fetched report')
  const data = await axios.get(getApiUrl('/reports'))
  return data.data
}

export const addReportItem = async (reportName: string, payload: AddReportItemPayload) => {

  return await axios.post(getApiUrl(`/reports`), payload)
}

export const removeReportItem = async (reportName: string, payload: AddReportItemPayload) => {

  return await axios.delete(getApiUrl(`/reports/${payload.id}`))
}
