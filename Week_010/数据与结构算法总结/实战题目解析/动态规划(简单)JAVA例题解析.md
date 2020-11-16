#### <font color=red>**爬楼梯**</font>

解题思路:

+ 状态定义:
  + 爬第n阶楼梯的方法数量,等于两部分之和
+ 状态转移方程:
  + 爬上n - 1阶楼梯的方法数量.因为在爬1阶就能到第n阶;
  + 爬上n - 2阶楼梯的方法数量,因为再爬2阶就能到第n阶;
  + 得到公式dp[n] = dp[n - 1] + dp[n - 2]
+ 初始化:
  + dp[0] = 1 和 dp[1] = 1
+ 返回值:
  + dp[n]

时间复杂度: O(n)

```java
class Solution {
  public int climbStairs(int n) {
    int[] dp = new int[n + 1];
    dp[0] = 1;
    dp[1] = 1;
    for(int i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
  }
}
class Solution {
    public int climbStairs(int n) {
         int a = 1, b = 1;
        while (--n > 0) {
            a = a + b + 0 * (b = a);
        }
        return a;
    }
}
class Solution {
    int[] memo = new int[46];
    
    public int climbStairs(int n) {        
        if(memo[n] > 0) {
            return memo[n];
        }
        if(n <= 1) {
            return 1;
        }
        int left = climbStairs(n-1);
        int right = climbStairs(n-2);
        int res = left + right;
        memo[n] =  res;
        return res;
    }
}
```

