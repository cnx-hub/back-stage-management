export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80' },
    { prop: 'newPrice', label: '新价格', minWidth: '80' },
    { prop: 'desc', label: '商品描述', minWidth: '100' },
    { prop: 'enable', label: '状态', minWidth: '80', slotName: 'status' },
    { prop: 'imgUrl', label: '图片', minWidth: '100', slotName: 'image' },
    { prop: 'inventoryCount', label: '库存', minWidth: '80' },
    { prop: 'saleCount', label: '销量', minWidth: '80' },
    { prop: 'favorCount', label: '收藏', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '80' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'create'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'update'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  title: '商品列表',
  showIndexColumn: true,
  showSelectColumn: true,
  selectChange: (value: any) => {
    console.log(value)
  }
}
