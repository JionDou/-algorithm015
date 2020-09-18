/*
 * @lc app=leetcode.cn id=874 lang=javascript
 *
 * [874] 模拟行走机器人
 */

// @lc code=start
/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    const dx = [0,1,0,-1];
    const dy = [1,0,-1,0];
    let x = 0, y = 0, di = 0;
    let obstacleSet = new Set();
    for(let obstacle of obstacles) {
         ox = obstacle[0] + 30000;
         oy = obstacle[1] + 30000;
        obstacleSet.add((ox << 16) + oy);
    }
    let ans = 0;
    for(let cmd of commands) {
        if(cmd == -2)
         di = (di + 3) % 4;
         else if(cmd == -1)
            di = (di + 1) % 4;
            else{
                for(let k = 0; k < cmd; ++k) {
                    nx = x + dx[di];
                    ny = y + dy[di];
                    code = ((nx + 30000) << 16) + (ny + 30000);
                    if(!obstacleSet.has(code)) {
                        x = nx;
                        y = ny;
                        ans = Math.max(ans, x * x + y * y);
                    }
                }
            }   
    }
    return ans;
};
// @lc code=end

