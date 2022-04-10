<template>
  <div>
    <long-list ref="longlist" :dataList="list" :itemHeight="21">
      <template v-slot="{ row }">
        <div @click="click(row)">{{ row.name }}</div>
      </template>
    </long-list>
    <button @click="add">add</button>
  </div>
</template>

<script>
import LongList from "./components/longlist";
export default {
  data() {
    return {
      initData: "hello 你好",
    };
  },
  components: {
    LongList,
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    // created() {
    let i = 1000;
    while (i) {
      this.list.push({
        name: (Math.random() * 100).toString(),
      });
      i--;
    }
  },
  methods: {
    add() {
      this.list.push({
        name: (Math.random() * 100).toString(),
      });
      this.$refs.longlist.setRate(this.list.length);
    },
    click(val) {
      console.log(val);
    },
  },
};
</script>

<style>
</style>