// 根据id parent_id结构化扁平数组
// 先遍历数组全部放进一个临时对象key为id，根据id parent_id为对象里的每一项添加子节点(children)，当没有parent_id时把他放进最终返回对象(tree)里。
function buildTree(arr) {
  const temp = {}
  const tree = {}
  for (const index in arr) {
    temp[arr[index]._id] = arr[index]
  }
  for (const key in temp) {
    if (temp[key].parent_id) {
      if (temp[temp[key].parent_id]) {
        if (!temp[temp[key].parent_id].children) {
          temp[temp[key].parent_id].children = new Object()
        }
        temp[temp[key].parent_id].children[key] = temp[key]
      }
    } else {
      tree[temp[key]._id] = temp[key]
    }
  }
  console.log(tree)
}
