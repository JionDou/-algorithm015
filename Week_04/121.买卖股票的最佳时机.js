/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let maxProfit = 0;
    for(let i = 1; i < prices.length; i++) {
        if(prices[i] > prices[i - 1])
            maxProfit += prices[i] - prices[i - 1];
    }
    return maxProfit;
};
const maxProfit = (prices) => {
    let profit = 0;
    for(let i = 1; i < prices.length; i++) {
        //1.设tmp为第i-1日买入与第i日卖出赚取的利润,即tmp=prices[i] - prices[i - 1];
        let tmp = prices[i] - prices[i - 1];
        //2.当该天利润为正 tmp > 0,则将利润加入总利润profit;当利润为0或为负,则直接跳过;
        if(tmp > 0) profit += tmp;
    }
    //3.返回总利润
    return profit;
}
// @lc code=end

