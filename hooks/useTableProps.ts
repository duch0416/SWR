import { useState, ReactNode, createContext, useContext } from "react"
import { TablePropsContext } from "../provider/TablePropsProvider"

export const useTableProps = () => {
  const context = useContext(TablePropsContext)

  if (!context) {
    throw new Error('You cannot use table props  outside off TablePropsProvider')
  }

  return context
}