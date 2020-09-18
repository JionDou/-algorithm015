/*
 * @lc app=leetcode.cn id=860 lang=javascript
 *
 * [860] 柠檬水找零
 */

// @lc code=start
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    let five = 0, ten = 0;  //最初没有钱
    for(let bill of bills) {
        //如果顾客支付了 5 美元钞票，那么我们就得到 5 美元的钞票。
        //如果顾客支付了 10 美元钞票，我们必须找回一张 5 美元钞票。如果我们没有 5 美元的钞票，答案就是 False ，因为我们无法正确找零。
        if(bill == 5) five++;  
        //如果顾客支付了 20 美元钞票，我们必须找回 15 美元。
        //否则，我们将无法给出总面值为 15 美元的零钱，答案是 False
        else if(bill == 10) {
            if(five == 0) return false;
            five--;
            ten++;
        }else {
            if(five > 0 && ten > 0) {
                five--;
                ten--;
            }else if(five >= 3) {
                five -= 3;
            }else{
                return false;
            }
        }
    }
    return true;
};
// @lc code=end

