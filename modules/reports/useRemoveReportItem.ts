import { useMutation, useQueryClient } from "react-query"
import { AddReportItemPayload, removeReportItem } from "@api"
import { reportKeys } from "./useReport"

export const useRemoveReportItem = (reportName: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation((item: AddReportItemPayload) => removeReportItem(reportName, item), {
    onError: (err) => {
      // show some toast with error
      console.log('error')
    },
    onSuccess: (res) => {
      // show some toast with success message
      queryClient.invalidateQueries(reportKeys.report(reportName))
      console.log('mutation =>', 'successfully removed item')
    }
  })

  const removeItem = (item: AddReportItemPayload) => {
    mutation.mutate(item)
  }

  return {
    ...mutation,
    removeItem,
  }
}