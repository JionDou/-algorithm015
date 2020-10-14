**最小路径和**

解题思路:

+ 状态定义:

  + 设dp为大小m * n 矩阵,其中dp[i] [j] 的值代表走到(i, j)的最小路径和.

+ 转移方程:

  + 题目要求,只能向右或向下走,也就是说,当前单元格(i, j)只能从左方单元格(i - 1, j)或上方单元格(i, j - 1) 走到,因此只需要考虑矩阵左边界和上边界.

  + (i, j) 的最小路径和 = “(i - 1, j)与(i, j - 1)中较小的” + 当前单元格值grid[i] [j]]. 具体分为以下4种情况:

  1. 当左边和上边都不是矩阵边界时: 即当 i != 0, j != 0 时, dp[i] [j] = min(dp[i - 1] [j], dp[i] [j - 1]) + grid[i] [j];
  2. 当只有左边是矩阵边界时: 只能从上面来, 即当 i = 0, j != 0时, dp[i] [j] = dp[i] [j - 1] + grid[i] [j];
  3. 当只有上边是矩阵边界时: 只能从左边来,即当 i != 0, j = 0时, dp[i] [j] = dp[i - 1] [j] + grid[i] [j];
  4. 当左边和上边都是矩阵边界时: 即当 i = 0, j = 0时, 其实就是起点, dp[i] [j] = grid[i] [j];

+ 返回值:

  + 返回 dp 矩阵右下角值，即走到终点的最小路径和。

  时间复杂度 O(M×N) ： 遍历整个 gridgrid 矩阵元素。

  空间复杂度 O(1) ： 直接修改原矩阵，不使用额外空间.

```java
// 动态规划 
class Solution {
  public int minPathSum(int[][] grid) {
    for(int i = 0; i < grid.length; i++) {
      for(int j = 0; j < grid[0].length; j++) {
        if(i == 0 && j == 0) continue;
        else if(i == 0) grid[i][j] = grid[i][j - 1] + grid[i][j];
        else if(j == 0) grid[i][j] = grid[i - 1][j] + grid[i][j];
        else grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j];
      }
    }
    return grid[grid.length - 1][grid[0].length - 1];
  }
}
class Solution {
  public int minPathSum(int[][] grid) {
    if(grid == null || grid.length == 0 || grid[0].length == 0) {
      return 0;
    }
    int rows = grid.length, cloumns = grid[0].length;
    int[][] dp = new int[rows][columns];
    dp[0][0] = grid[0][0];
    for(int i = 1; i < rows; i++) {
      dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    for(int j = 1; j < columns; j++) {
      dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    for(int i = 1; i < rows; i++) {
      for(int j = 1; j < columns; j++) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      }
    }
    return dp[rows - 1][columns - 1];
  }
}
//时间复杂度：O(mn)，其中 m 和 n 分别是网格的行数和列数。需要对整个网格遍历一次，计算 dp 的每个元素的值。
//空间复杂度：O(mn)，其中 m 和 n 分别是网格的行数和列数。创建一个二维数组 dp，和网格大小相同。空间复杂度可以优化到 O(n),每次只存储上一行的dp 值.

```

**解码方法**

解题思路

+ 状态定义:

  + dp[i] : s[i] 结尾的前缀子串有多少种解码方法.

+ 状态转移方程:

  + 如果 `s[i]=='0'`, 字符s[i] 就不能单独解码, 所以当`s[i] != '0'`时, dp[i] = dp[i - 1] * 1.

  说明: 为了得到长度为 `i+1`的前缀子串的解码个数, 需要先得到长度为`i`的解码个数,再对`s[i]`单独解码,这里分了两步,根据[分步计数原理],用乘法.这里的`1`表示乘法单位,语义上表示`s[i]`只有`1`种编码.
  
  + 如果当前字符和它前一个字符,能够解码,即`10 <= int(s[i - 1..i]) <= 26`,即 `dp[i] += dp[i -2]`
  
  + 说明: 不同的解码方法, 使用[加法], 理论依据是[分类计数的加法原理],所以这里用`+=`.
  + ⚠️: 状态转移方程里出现了下标`i - 2`,需要耐心调试.
  
+ 初始化: 

  + 如果首字符为 `0`, 一定解不了码,可以直接返回`0`,非零情况下,`dp[0] = 1`;

+ 返回值:

  + 输出是`dp[len - 1]`

```java
public class Solution {
  public int numDecodings(String s) {
    int len = s.length();
    if(len == 0) {
      return 0;
    }
    // dp[i] 以s[i]结尾的前缀子串有多少种解码方法
    // dp[i] = dp[i - 1] * 1 if s[i] != '0'
    // dp[i] += dp[i - 2] * 1 if 10 <= int(s[i - 1..i]) <= 26
    int[] dp = new int[len];
    char[] charArray = s.toCharArray();
    if(charArray[0] == '0') {
      return 0;
    }
    dp[0] = 1;
    for(int i = 1; i < len; i++) {
      if(charArray[i] != '0') {
        dp[i] = dp[i - 1];
      }
      int num = 10 * (charArray[i - 1] - '0') + (charArray[i] - '0');
      if(num >= 10 && num <= 26) {
        if(i == 1) {
          dp[i]++;
        }else {
          dp[i] += dp[i - 2];
        }
      }
    }
    return dp[len - 1];
  }
}
```

