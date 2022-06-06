import { useQuery } from "react-query"

import { fetchReport } from "@api"
import { useTableProps } from "../../hooks/useTableProps"

type ReportName = string

export const reportKeys = {
  report: (reportName: ReportName) => [`report-${reportName}`]
}

export const useReport = (reportName: ReportName) => {
  const { tableProps } = useTableProps()

  const queryKey = reportKeys.report(reportName)[0]

  const query = useQuery({
    queryKey: [queryKey, tableProps],
    queryFn: fetchReport,
    select: (res) => res.data
  })

  return  {
    ...query,
  }
} 