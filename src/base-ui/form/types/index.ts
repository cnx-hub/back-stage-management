type IForType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  field: string
  type: IForType
  label: string
  rules?: any[]
  placeHolder?: string
  options?: any[]
  otherOption?: any
  isHidden?: boolean
  defaultValue?: any[]
}

export interface IForm {
  title?: string
  formItems: IFormItem[]
  itemStyle?: any
  colLayout?: any
  labelWidth?: string
  modelValue?: any
}
