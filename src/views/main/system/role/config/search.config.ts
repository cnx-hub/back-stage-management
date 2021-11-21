import { IForm } from '@/base-ui/form/types'
export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeHolder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeHolder: '请输入权限介绍'
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOption: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  colLayout: { span: 8 }
}
