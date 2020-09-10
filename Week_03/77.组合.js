/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// 字典序法
var combine = function(n, k) {
    const temp = [];
    const ans = [];
    for(let i = 1; i <= k; ++i) {
        temp.push(i);
    }
    temp.push(n + 1);
    let j = 0;
    while(j < k) {
        ans.push(temp.slice(0,k));
        j = 0;
        while(j < k && temp[j] + 1 == temp[j + 1]) {
            temp[j] = j + 1;
            ++j;
        }
        ++temp[j];
    }
    return ans;
};
// @lc code=end

