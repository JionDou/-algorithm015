#### <font color=red>**爬楼梯**</font>

```javascript
var climbStairs = function(n) {
    if (n < 3 ) return n;
    let arr = [1,2];
    for (let i = 2; i < n; i++) {
        arr[i] = arr[i-1] + arr[i-2];
    }
    return arr[arr.length-1];
};

let map = {};
var climbStairs = function(n) {
    if(n < 3) return n;
    if(!map[n]) {
        map[n] = climbStairs(n-1) + climbStairs(n-2);
    }
    return map[n];
};
```

