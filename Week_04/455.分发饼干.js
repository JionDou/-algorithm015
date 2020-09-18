/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
    //1.将g和s从小到大排列
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);
    //2.设置胃口值和饼干
    let child = 0, cookie = 0;
    //3.循环
    while(child < g.length && cookie < s.length) {
        //3.1如果当前孩子满足饼干,那么孩子往后推一
        if(g[child] <= s[cookie]) {
            child++;
        }
        //3.2否则饼干往后推一
        cookie++;
    }
    return child;
};
// @lc code=end

