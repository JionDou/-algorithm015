/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    pre = i = 0; //变量 pre 保存当前要构造的树的 root,变量 i 保存 inorder 数组中位置
    build = function(stop) {
        //如果根位置不等于停止点,继续创建左右子树.
        //每次递归调用，都会确定出一个停止点，它告诉了子调用在哪里停止，把自己的根节点值作为左子树调用的停止点，自己的（父调用给下来的）停止点作为右子树的停止点
        if(inorder[i] != stop) {
            var root = new TreeNode(preorder[pre++])
            root.left = build(root.val)
            i++
            root.right = build(stop)
            return root
        }
        return null
    }
    return build()
}


// 方法: 递归构建左右子树
var buildTree = function(preorder, inorder) {
    if(inorder.length == 0) return null;
    //由根节点，在 inorder [左 | 根 | 右][左∣根∣右] 中划分出左、右子树的 inorder 序列。
    const root = new TreeNode(preorder[0]);
    //通过 inorder 中左右子树的节点个数，在 preorder 中确定左、右子树的 preorder 序列。
    const mid = inorder.indexOf(preorder[0]);
    //得到左、右子树的 preorder 和 inorder 序列，递归构建左右子树
    root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0,mid));
    root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid +1));
    return root;
};
//优化代码: 字符串截取性能消耗比较大,每次把preorder和inorder切割用两个指针表示即可.写一个接受指针的辅助函数
const buildTree = (preorder, inorder) => {
    const helper = (p_start, p_end, i_start, i_end) => {
        if(p_start > p_end) return null;
        let rootVal = preorder[p_start]; //根节点的值
        let root = new TreeNode(rootVal); //根节点
        let mid = inorder.indexOf(rootVal); //根节点在inorder的位置
        let leftNum = mid - i_start; //左子树的节点树
        root.left = helper(p_start + 1, p_start + leftNum, mid - 1, i_start);
        root.right = helper(p_start + leftNum + 1, p_end, mid + 1, i_end);
        return root;
    }
    return helper(0, preorder.length - 1, 0, inorder.length - 1);
}
// 再次优化:每次递归都要 indexOf 寻找根节点的位置，耗费性能。
//提前把 inorder 数组元素和索引存到哈希表中。查询哈希表比较快。
const buildTree = (preorder, inorder) => {
    const map = new Map();
    for(let i = 0; i < inorder.length; i++) {
        map.set(inorder[i],i);
    }
    const helper = (p_start, p_end, i_start, i_end) => {
        if(p_start > p_end) return null;
        let rootVal = preorder[p_start];
        let root = new TreeNode(rootVal);
        let mid = map.get(rootVal);
        let leftNum = mid - i_start;
        root.left = helper(p_start + 1, p_start + leftNum, mid - 1, i_start);
        root.right = helper(p_start + leftNum + 1, p_end, mid + 1, i_end);
        return root;
    }
    return helper(0, preorder.length - 1, 0, inorder.length - 1);
}
// @lc code=end

