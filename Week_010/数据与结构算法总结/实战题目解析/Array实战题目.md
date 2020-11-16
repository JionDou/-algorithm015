**两数之和**

```javascript
/* JavaScript */
// 方法一: 暴力法 时间复杂度 O(n2)
var twoSum = function(nums, target) {
  for(let i = 0; i < nums.length - 1; i++) { // 第一次循环遍历第一组数
    for(let j = i + 1; j < nums.length; j++) {  // 第二次循环遍历第二组数
      if(nums[i] + nums[j] === target) { // 两数相加等于目标数
        return [nums[i],nums[j]]
      }
    }
  }
}
// 方法二: 哈希表 两遍遍历 .
var twoSum = function(nums, target) {
  // 1. 定义一个储备(reserve)变量
  let res = {}
  for(let i = 0; i < nums.length; i++) { // 将一组数放在定义的储备变量里
    res[target - nums[i]] = nums[i]
  }
  for(let j = 0; j < nums.length; j++) { // 再次遍历要访问的数是否存在
    if(res[nums[j]] !== undefined) {
      return [nums[j], res[nums[j]]]
    }
  }
}

// 方法三: 哈希表 一遍遍历 (最坏的情况是,如果第一个数和最后一个数相加等于目标数,每个数都访问了一次,时间复杂度是O(n),空间复杂度也是O(n)).
var twoSum = function(nums, target) {
  let res = {}
  for(let i = 0; i < nums.length; i++) {
    if(res[nums[i]] !== undefined) {
      return [nums[i], res[nums[i]]]
    }else {
      res[target - nums[i]] = nums[i]
    }
  }
}
```



**三数之和**

```javascript
/* JavaScript */
// 方法一: 暴力法 时间复杂度是O(n3)
var threeSum = function(nums) {
  let res = []
  for(let i = 0; i < nums.length - 2; i++) {
    for(let j = i + 1; j < nums.length - 1; j++) {
      for(let k = j + 1; k < nums.length; k++) {
        if(nums[i] + nums[j] + nums[k] === 0) {
          res.push([nums[i], nums[j], nums[k]])
        }
      }
    }
  }
  return res
}

// 方法二: 两遍哈希表遍历 时间复杂度是O(n2) 空间复杂度O(n)
var threeSum = function(nums) {
  let res = []
  let hash = {}
  for(let i = 0; i < nums.length - 2; i++) {
    for(let j = i + 1; i < nums.length - 1; j++) {
      if(hash[nums[j]] != undefined) {
        res.push([nums[j]].concat(hash[nums[j]]))
        hash[nums[j]] = undefined
      }else {
        let mark = 0 - nums[i] - nums[j]
        hash[mark] = [nums[i], nums[j]]
      }
    }
  }
  return res
}
// 方法三: 优化方法二 时间复杂度可以做到O(nlogn) 但是会报错
var threeSum = function(nums) {
  let res = []
  nums.sort((a, b) => a - b)  // 排序,将最小数放在左边,最大数放右边
  for(let i = 1; i < nums.length - 1; i++) {
    let first = 0
    let last = nums.length - 1
    do {
      let result = nums[i] + nums[first] + nums[last]
      if(result === 0) {
        res.push([nums[i], nums[first], nums[last]])
      }
      if(result <= 0 && first < i) {
        while(nums[first] === nums[++first]);
      }else if (result > 0 && last > i) {
        while(nums[last] === nums[--last]);
      }else {
        break
      }
    }while(1) {}
  }
  return res
}
// 方法四: 排序 + 双指针
var threeSum = function(nums) {
  let res = []
  let length = nums.length;
  nums.sort((a, b) => a - b)
  if(nums[0] <= 0 && nums[length - 1] >= 0) {
    for(let i = 0; i < length - 2;) {
      if(nums[i] > 0) break;
      let first = i + 1
      let last = length - 1
      do {
        if(first >= last || nums[i] * nums[last] > 0) break
        let result = nums[i] + nums[first] + nums[last]
        if(result === 0) {
          res.push([nums[i], nums[first], nums[last]])
        }
        if(result <= 0) {
          while(first < last && nums[first] === nums[++first]) {}
        }else {
          while(first < last && nums[last] === nums[--last]) {}
        }
      }while(first < last)
        while(nums[i] === nums[++i]) {}
    }
  }
  return res
}
```



```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for(int k = 0; k < nums.length - 2; k++){
            if(nums[k] > 0) break;
            if(k > 0 && nums[k] == nums[k - 1]) continue;
            int i = k + 1, j = nums.length - 1;
            while(i < j){
                int sum = nums[k] + nums[i] + nums[j];
                if(sum < 0){
                    while(i < j && nums[i] == nums[++i]);
                } else if (sum > 0) {
                    while(i < j && nums[j] == nums[--j]);
                } else {
                    res.add(new ArrayList<Integer>(Arrays.asList(nums[k], nums[i], nums[j])));
                    while(i < j && nums[i] == nums[++i]);
                    while(i < j && nums[j] == nums[--j]);
                }
            }
        }
        return res;
    }
}
```

