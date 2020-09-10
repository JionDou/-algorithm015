/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
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
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
	if(!root || root === p || root === q) return root;
	const left = lowestCommonAncestor(root.left, p, q);
	const right = lowestCommonAncestor(root.right, p, q);
	if(!left) return right; //左子树找不到,返回右子树
	if(!right) return left; //右子树找不到,返回左子树
	return root;
}
// var lowestCommonAncestor = function(root, p, q) {
//     let ans;
//     const dfs = (root, p, q) => {
//         if(root === null) return false;
//         const lson = dfs(root.left, p, q);
//         const rson = dfs(root.right, p, q);
//         if((lson && lson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
//             ans = root;
//         }
//         return lson || rson || (root.val === p.val || root.val === q.val);
//     }
//     dfs(root, p, q);
//     return ans;
// };
// @lc code=end

