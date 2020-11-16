/*
 * @lc app=leetcode.cn id=70 lang=java
 *
 * [70] 爬楼梯
 */

// @lc code=start
class Solution {
    // 方法一:数学 斐波那契数列 
    public int climbStairs(int n) {
        double sqrt_5 = Math.sqrt(5);
        double fib_n = Math.pow((1 + sqrt_5 / 2), n + 1) - Math.pow((1 - sqrt_5 / 2), n + 1);
        return (int)(fib_n / sqrt_5); 
    }
    //方法二:动态规划
    public int climbStairs(int n) {
        //1.分配动态规划空间
        int[] dp = new int[n + 1];
        //2.初始化dp[0],dp[1]
        dp[0] = 1; dp[1] = 1;
        //爬上 n-1 阶楼梯的方法数量。因为再爬1阶就能到第n阶
        //爬上 n-2 阶楼梯的方法数量，因为再爬2阶就能到第n阶
        //所以得到公式 dp[n] = dp[n-1] + dp[n-2]
        for(int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }

}
// @lc code=end

