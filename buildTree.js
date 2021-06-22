// 最简
var getTrees = (data) => {
  const pIdChildMap = {}
  data.forEach((i)=>{
    pIdChildMap[i.parent_id] ? pIdChildMap[i.parent_id].push(i) : (pIdChildMap[i.parent_id] = [i])
  })

  for(let i = 0; i < data.length; i++) {
    data[i].children = pIdChildMap[data[i]._id]
  }

  // 返回成自己想要的
  return data
}
