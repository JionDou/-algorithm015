JavaScript

```javascript
var levelOrder = function(root) {
  var nums = [];
  search(nums, root,0);
  return nums;
}
function search(nums, node, k) {
  if(node == null) return;
  if(nums[k] == undefined) {
    nums[k] = [];
  }
  nums[k].push(node.val);
  for(var i = 0; i < node.children.length; i++) {
    search(nums, node.children[i], k+1);
  }
}
```

方法一: 利用队列实现广度优先搜索

```java
public List<List<Integer>> levelOrder(Node root) {
  List<List<Integer>> result = new ArrayList<>();
  if(root == null) return result;
  Queue<Node> queue = new LinkedList<>();
  queue.add(root);
  while(!queue.isEmpty()) {
    List<Integer> level = new ArrayList<>();
    int size = queue.size();
    for(int i = 0; i<size; i++) {
      Node node = queue.poll();
      level.add(node.val);
      queue.addAll(node.children);
    }
    result.add(level);
  }
  return result;
}
/*
* 时间复杂度: O(n).n是指节点的数量
* 空间复杂度: O(n).
*/
```

方法二: 简化的广度优先搜索

```java
public List<List<Integer>> levelOrder(Node root) {
  List<List<Integer>> result = new ArrayList<>();
  if(root == null) return result;
  List<Node> previousLayer =Arrays.asList(root);
  while(!previousLayer.isEmpty()) {
    List<Node> currentLayer = new ArrayList<>();
    List<Integer> previousVals = new ArrayList<>();
    for(Node node: previousLayer) {
    previousVals.add(node.val);
    currentLayer.addAll(node.children);
    }
    result.add(previousVals);
  	previousLayer = currentLayer; 
  }
  return result;
}
/*
* 时间复杂度: O(n).n是指节点的数量
* 空间复杂度: O(n).列表包含所有节点
*/
```

方法三: 递归

```java
class Solution {
  private List<List<Integer>> result = new ArrayList<>();
  public List<List<Integer>> levelOrder(Node root) {
    if(root != null) traverseNode(root,0);
    return result;
  }
  public void traverseNode(Node node, int level) {
    if(result.size() <= level) {
      result.add(new ArrayList<>());
    }
    result.get(level).add(node.val);
    for(Node child : node.children) {
      traverseNode(child,level + 1);
    }
  }
}
/*
* 时间复杂度: O(n).n是指节点的数量
* 空间复杂度: 正常情况O(logn)，最坏情况O(n)。运行时在堆栈上的空间。
*/
```

