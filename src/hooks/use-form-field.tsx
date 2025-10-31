"use client"

import { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { FormFieldContext,FormItemContext } from "../components/ui/form"

export function useFormField() {
  const fieldContext = useContext(FormFieldContext)
//   type FormItemContextValue = {
//   id: string
// }
  // const FormItemContext = React.createContext<FormItemContextValue | null>(null)
  
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) throw new Error("useFormField must be used within <FormField>")
  if (!itemContext) throw new Error("useFormField must be used within <FormItem>")

  const fieldState = getFieldState(fieldContext.name, formState)
  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}
