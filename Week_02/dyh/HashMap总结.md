数组、ArrayList、LinkedList可以视为一种特殊的Map,键为索引,值为对象.

ArrayList以数组的形式实现,顺序插入.查找快,插入、删除较慢.

LinkedList以链表形式实现,顺序插入.查找慢,插入、删除方便.

HashMap是一种能够结合上面两种优点的数据结构.HashMap实现了Map接口.

HashMap是一种键值对(k-v)形式存储的数据结构.

![image-20200831155639830](/Users/bean-dou/Documents/Typora/数据结构和算法/week02/HashMap总结.png)

添加数据(HashMap的一个存储单元Entry(单向链表):)

```JAVA
static class Entry<K,V> implements Map.Entry<K,V> {
  final K key;
  V value;
  Entry<K,V> next;
  int hash;
  Entry(int h, K k, V v, Entry<K, V> n) {
    value = v;
    next = n;
    key = k;
    hash = h;
  }
}
```

```java
public static void main(String[] args){
  Map<String,String> map = new HashMap<>();
  map.put("111","111");
  map.put("222","222");
}
```

HashMap实现原理

1.内部组成

HashMap内部有如下几个主要的实例变量:

```java
transient Entry<K,V>[] table = (Entry<K,V>[]) EMPTY_TABLE; 
transient int size;
int threshold;
final float loadFactor;
```

table的初始值为EMPTY_TABLE,是一个空表,具体定义为:

```java
static final Entry<?, ?>[] EMPTY_TABLE = {}; //当添加键值对后,就不是空表了.添加第一个元素时,默认分配的大小为16,并不是size大于16时再进行扩展,下次什么时候扩展与threshold有关.
```

threshold表示阈值,当键值对个数size大于等于threshold时考虑进行扩展.threshold是怎么算出来的呢?(threshold等于table.length乘以loadFactor.loadFactor是负载因子)

2.默认构造方法

```java
public HashMap(int initialCapacity, float loadFactor) {
  this.loadFactor = loadFactor;
  threshold = initialCapacity;
}
```

3.保存键值对

```java
public V put(K key, V value) {
  if(table == EMPTY_TABLE) {
    inflateTable(threshold);
  }
  if(key == null) 
    return putForNullKey(value);
  int hash = hash(key.hashCode());
  int i = indexFor(hash,table.length);
  for (Entry<K,V> e = table[i]; e != null;e = e.next) {
    Object k;
    if(e.hash == hash && ((k = e.key) == key || key.equals(k))) {
      V oldValue = e.value;
      e.value = value;
      e.recordAccess(this);
      return oldValue;
    }
  }
  modCount++;
  addEntry(hash,key,value,i);
  return null;
}
```

如果是第一次保存,首先调用inflateTable()方法给table分配实际空间,inflateTable的主要代码为:

```java
private void inflateTable(int toSize) {
  //Find a power of 2 >= toSize
  int capacity = roundUpToPowerOf2(toSize);
  threshold = (int) Math.min(capacity * loadFactor, MAXIMUM_CAPACITY + 1);
  table = new Entry[capacity];
}
```

下一步调用hash方法计算key的hash值.hash方法的代码为:

```java
final int hash(Object k) {
  int h = 0
    h ^= k.hashCode();
  h ^= (h >>> 20) ^ (h >>> 12);
  return h ^ (h >>> 7) ^ (h >>> 4);
}
```

根据哈希值得到保存位置(取模):

```java
static int indexFor(int h, int length) {
  return h & (length-1);  //h&(length-1)等同于求模运算h%length
}
```

查找是否已经有这个键了

```java
for (Entry<K, V> e = table[i]; e != null; e = e.next) //找到保存位置i,table[i]指向下一个单向链表.
```

如果没找到则调用addEntry方法在给定的位置添加一条,代码为:

```java
void addEntry(int hash, K key, V value, int bucketIndex) {
  if((size >= threshold) && (null != table[bucketIndex])) {
    resize(2 * table.length);
    hash = (null != key) ? hash(key) : 0;
    bucketIndex = indexFor(hash,table.length);
  }
  createEntry(hash, key, value, bucketIndex);
}
```

如果空间是够的,不需要resize,则调用createEntry方法添加.

```java
void createEntry(int hash, K key, V value, int bucketIndex) {
  Entry<K, V> e = table[bucketIndex];
  table[bucketIndex] = new Entry<>(hash, key, value, e);
  size++;
}
```

插到对应位置的链表头部或更新已有值:

```java
if((size >= threshold) && (null != table[bucketIndex])) //如果空间不够,即size已经超过阈值threshold了,并且对应的table位置已经插入过对象了
```

根据需要扩展table大小,调用resize方法对table进行扩展:

```java
void resize(int newCapacity) {
  Entry[] oldTable = table;
  int oldCapacity = oldTable.length;
  Entry[] newTable = new Entry[newCapacity];
  transfer(newTable, initHashSeedAsNeeded(newCapacity));
  table = newTable;
  threshold = (int)Math.min(newCapacity * loadFactor, MAXIMUM_CAPACITY + 1);
}
```

分配一个容量为原来两倍的Entry数组,调用transfer方法将原来的键值对移植过来,然后更新内部的table变量,以及threshold的值.

```java
void transfer(Entry[] newTable, boolean rehash) {
  int newCapacity = newTable.length;
  for(Entry<K, V> e : table) {
    while(null != e) {
      Entry<K, V> next = e.next;
      if(rehash) {
        e.hash = null == e.key ? 0 : hash(e.key);
      }
      int i = indexFor(e.hash, new Capacity);
      e.next = newTable[i];
      newTable[i] = e;
      e = next;
    }
  }
}
```

例子:

```java
Map<String, Integer> countMap = new HashMap<>();
countMap.put("hello", 1);
countMap.put("world", 3);
countMap.put("position", 4);
```

![image-20200831190709330](/Users/bean-dou/Documents/Typora/数据结构和算法/week02/内存结构.png)

![image-20200831191540906](/Users/bean-dou/Documents/Typora/数据结构和算法/week02/内存结构-01.png)

4.查找方法

```java
public V get(Object key) {
  if(key == null) return getForNullKey();
  Entry<K, V> entry = getEntry(key);
  return null == entry ? null : entry.getValue();
}
```

HashMap支持key为null,key为null的时候,放在table[0],调用getForNullKey()获取值;如果key不为null,则调用getEntry()获取键值对节点entry,然后调用节点的getValue()方法获取值.

```java
final Entry<K, V> getEntry(Object key) {
  if(size == 0) {
    return null;
  }
  //1.计算键的hash值
  int hash = (key == null) ? 0 :hash(key);
  //2.根据hash找到table中的对应链表,在链表中遍历查找.
  for(Entry<K, V> e = table[indexFor(hash, table.length)];e != null; e = e.next) {
    Object k;
    //3.逐个比较,先通过hash快速比较,hash相同再通过equals比较.
    if(e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))) return e;
  }
  return null;
}
```

containsKey方法的逻辑与get类似,节点不为null就表示存在:

```java
public boolean containsKey(Object key) {
  return getEntry(key) != null;
}
public boolean containsKey(Object value) {
  if(value == null) return containsNullValue();
  Entry[] tab = table;
  for(int i = 0; i < tab.length; i++) {
    for(Entry e = tab[i]; e != null; e = e.next) {
      if(value.equals(e.value)) {
        return true;
      }
    }
    return false;
  }
}
```

小结:

HashMap实现了Map接口,可以方便地按照键存取值,内部使用数组链表和哈希的方式进行实现.

1. 根据键保存和获取值的效率都很高,为O(1),每个单向链表往往只有一个或少数几个节点,根据hash值就可以直接快速定位;
2. HashMap中的键值对没有顺序,因为hash值是随机的.
3. 如果经常需要根据键存取值,而且不要求顺序,那么HashMap就是理想的选择.如果要保持添加的顺序可以使用HashMap的一个子类LinkedHashMap.
4. HashMap不是线程安全的.

