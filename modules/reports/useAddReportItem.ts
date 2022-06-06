import { useMutation, useQueryClient } from "react-query"
import { addReportItem, AddReportItemPayload } from "@api"
import { reportKeys } from "./useReport"

export const useAddReportItem = (reportName: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation((item: AddReportItemPayload) => addReportItem(reportName, item), {
    onError: (err) => {
      // show some toast with error
      console.log('error')
    },
    onSuccess: (res) => {
      // show some toast with success message
      queryClient.invalidateQueries(reportKeys.report(reportName))
      console.log('mutation =>', 'successfully added item')
    }
  })

  const addItem = (item: AddReportItemPayload) => {
    mutation.mutate(item)
  }

  return {
    ...mutation,
    addItem,
  }
}