import { addReportItem, AddReportItemPayload } from "@api"
import useSWRMutation from 'swr/mutation'

import { ReportKeys } from "./reports.types"
import {MutationParams} from '../types'
import { getReportKeys } from "./useReport"

const mutation = async (key: ReportKeys, {arg}: {arg: AddReportItemPayload}) => {
  return await addReportItem(arg)
}

export const useAddReportItem = ({keys}: MutationParams<ReportKeys>) => {
  return useSWRMutation(getReportKeys(keys) as ReportKeys, mutation)
}