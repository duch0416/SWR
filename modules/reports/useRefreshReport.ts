import { mutate } from 'swr'
import { ReportKeys } from './reports.types'

const isReportKey = (key: any): key is ReportKeys => {
  return typeof key === 'object' && key?.['queryKey'] === 'report'
}

export const useRefreshReport = ({ keys }: { keys: ReportKeys }) => {

  // refresh all queries with given reportId
  const refreshReport = () => {
    mutate(
      key => {
        if (isReportKey(key)) {
          return key?.reportId === keys.reportId
        }

        return false;
      },
      undefined,
      { revalidate: true }
    )
  }

  return refreshReport
}

export const useRefreshReports = () => {
  // refresh all report queries
  const refreshReport = () => {
    mutate(
      key => {
        if (isReportKey(key)) {
          return true
        }

        return false;
      },
      undefined,
      { revalidate: true }
    )
  }

  return refreshReport
}