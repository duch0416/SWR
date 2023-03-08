import useSwr from 'swr'

import { fetchReport, Item } from "@api"
import { QueryParams } from '../types'
import { ReportKeys } from './reports.types'

export const reportQueryKey = 'report' as const

export type ReportQueryKey = typeof reportQueryKey;

export const getReportKeys = (keys?: Partial<ReportKeys>): ReportKeys => ({ queryKey: reportQueryKey, ...keys } as ReportKeys)

export const useReport = ({ keys, options }: QueryParams<ReportKeys>) => {
  return useSwr(getReportKeys(keys), async () => await fetchReport(keys), options)
}
