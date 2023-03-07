// ?随机生成一个树结构的List
// *结构:
// const type = {
//   value: 'id',
//   label: 'label',
//   children: 'children',
// }

const getKey = (prefix, id) => {
  return `${prefix}-${id}`
}

const createData = (
  maxDeep,
  maxChildren,
  minNodesNumber,
  deep = 1,
  key = 'node'
) => {
  let id = 0
  return Array.from({
      length: minNodesNumber
    })
    .fill(deep)
    .map(() => {
      const childrenNumber =
        deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
      const nodeKey = getKey(key, ++id)
      return {
        id: nodeKey,
        label: nodeKey,
        children: childrenNumber ?
          createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey) : undefined,
      }
    })
}

export default createData