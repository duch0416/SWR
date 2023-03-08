

import { removeReportItem, RemoveReportItemPayload } from "@api"
import useSWRMutation from 'swr/mutation'

import { ReportKeys } from "./reports.types"
import {MutationParams} from '../types'
import { getReportKeys } from "./useReport"

const mutation = async (key: ReportKeys, {arg}: {arg: RemoveReportItemPayload}) => {
  return await removeReportItem(arg)
}

export const useRemoveReportItem = ({keys}: MutationParams<ReportKeys>) => {
  // Q: Maybe we should consider adding separate key for mutation and invalidate queries onMutation success ?
  return useSWRMutation(getReportKeys(keys), mutation)
}