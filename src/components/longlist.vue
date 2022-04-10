<template>
  <div>
    <!-- 能滚动的盒子 -->
    <div
      class="viewport"
      ref="viewport"
      @scroll="scrollListener"
      :style="`height:${boxH}px`"
    >
      <!-- 滚动条 -->
      <div class="scroll-bar" ref="scrollbar" :style="`height:${barH}px`"></div>
      <!-- 列表位置 -->
      <div
        class="scroll-list"
        :style="{
          transform: `translate3d(0,${offset}px,0)`,
          top: `${offset_top}px`,
        }"
        ref="list"
      >
        <div v-for="item in visibleData" :key="item.__index" ref="a">
          <!-- 通过插槽传出去 -->
          <slot ref="itemdom" :row="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vue-longlist",
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //每一列的高度
    itemHeight: {
      type: Number,
      default: 30,
    },
    //显示几条数据
    showNum: {
      type: Number,
      default: 10,
    },
    hasIndex: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      start: 0, //滚动过程显示的开始索引
      end: 10, //滚动过程显示的结束索引
      offset: 0,
      offset_top: 0,
      boxH: 0,
      barH: 0,
    };
  },
  computed: {
    //显示的数组，用计算属性计算
    visibleData() {
      let start = this.start - this.prevCount;
      let end = this.end + this.nextCount;
      if (!this.hasIndex)
        this.dataList.forEach((item, index) => {
          item.__index = index;
        });
      return this.dataList.slice(start, end);
    },
    //前面预留几个 为了放置空白现象
    prevCount() {
      return Math.min(this.start, this.showNum);
    },
    //后面预留几个
    nextCount() {
      return Math.min(this.showNum, this.dataList.length - this.end);
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      //当前的一项高度*显示的项目高度
      this.boxH = this.itemHeight * this.showNum;
      //当前总长度*当前的项目高度
      setTimeout(() => {
        this.barH = this.dataList.length * this.itemHeight;
      });
    },
    scrollListener() {
      //获取滚动高度
      let scrollTop = this.$refs.viewport.scrollTop;
      //开始的数组索引
      this.start = Math.floor(scrollTop / this.itemHeight);
      //结束索引
      this.end = this.start + this.showNum;
      //绝对定位对相对定位的偏移量
      this.offset_top = this.start * this.itemHeight;
      this.offset = 0 - this.prevCount * this.itemHeight;
    },
    setRate(rate) {
      setTimeout(() => {
        this.start = rate;
        this.$refs.viewport.scrollTop = this.start * this.itemHeight;
        this.end = this.start + this.showNum;
        this.offset_top = this.start * this.itemHeight;
        this.offset = 0 - this.prevCount * this.itemHeight;
      }, 50);
    },
  },
  watch: {
    dataList() {
      this.initData();
    },
  },
};
</script>
    <style>
.viewport {
  overflow-y: scroll;
  position: relative;
}
.scroll-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>