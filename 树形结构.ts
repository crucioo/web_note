// 过滤树形结构生成树形结构
const filterTree = (treeData: AnyObject[], filter: (node: AnyObject) => boolean) => {
    const result = [];

    for (const node of treeData) {
        if (filter(node)) {
            let filteredNode = { ...node.data };
            if (node.childNodes?.length) {
                filteredNode.nodeList = filterTree(node.childNodes, filter);
            }
            result.push(filteredNode);
        } else if (node.childNodes?.length) {
            // 当前节点不符合过滤条件，则检测子节点是否符合过滤条件
            const filteredChildren = filterTree(node.childNodes, filter);
            if (filteredChildren.length > 0) {
                // 如果子节点有符合过滤条件的
                let filteredNode = { ...node.data, nodeList: filteredChildren };
                result.push(filteredNode);
            }
        }
    }

    return result;
};
