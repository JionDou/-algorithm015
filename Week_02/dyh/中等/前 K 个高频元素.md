方法一: 桶排序法

```java
//基于桶排序求解「前 K 个高频元素」
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
            HashMap<Integer, Integer> map = new HashMap<>();
            // 统计每个数字出现的次数
            for (int num : nums) {
                if (map.get(num) == null) {
                    // 数字不存在于map中
                    map.put(num, 1);
                } else {
                    // 数字存在map中，取出次数并且加1
                    int tmp = map.get(num);
                    map.put(num, tmp + 1);
                }
            }
            // 创建大顶堆
            // 底层基于链表，只能设置初始长度，不能设置固定大小的堆。
            PriorityQueue<Integer> heap = new PriorityQueue<Integer>(new Comparator<Integer>() {
                @Override
                public int compare(Integer o1, Integer o2) {
                    int tmp = map.get(o2) - map.get(o1);
                    return tmp;
                }
            });
            // 添加到堆中，完成堆化
            // 数组中有几个不同的key，堆中就有多少个元素，这些元素是按照其在map中的出现次数排序
            for (int num : map.keySet()) {
                heap.add(num);
            }
            // 转换成数组
            // 此处最好返回列表
            if (k > heap.size()) {
                return null;
            }
            int[] res = new int[k];
            for (int i = 0; i < k; i++) {
                res[i] = heap.poll();
            }
            return res;
        }
}

/*
* 时间复杂度: O(n)，n 表示数组的长度。首先，遍历一遍数组统计元素的频率，这一系列操作的时间复杂度是 O(n)；桶的数量为 n+1，所以桶排序的时间复杂度为 O(n)；因此，总的时间复杂度是 O(n)。
* 空间复杂度: O(n).
*/
```

