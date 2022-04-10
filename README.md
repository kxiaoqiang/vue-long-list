## long-list

> A vue comonetent that renders a long list.

## Example
---

```
// npm i @llyk/vue-long-list

<template>
  <div class="hello">
    <long-list
      ref="longlist"
      :dataList="list"  // 需要遍历的数组
      :itemHeight="18"  // 每条数据的高度，默认30
      :showNum="10"     // 显示数据条数
      :hasIndex="true"  // 若遍历的数组对象内含有__index属性，请添加这个属性，否则将被替换 默认值： false
    >
      <template v-slot="{ row }">
        <div >{{ row.name }}</div>
      </template>
    </long-list>
  </div>
</template>
import LongList from '@llyk/vue-long-list';
export default {
  name: "HelloWorld",
  components: {
    LongList,
  },
  methods: {
    add() {
      this.list.push({
        name: (Math.random() * 100).toString(),
      });
      this.$refs.longlist.setRate(this.list.length);  // 显示最后一个数据
    },
  }
}

```
