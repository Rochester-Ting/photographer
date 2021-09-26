<template>
  <div>
    <div
      class="
        w-full
        h-16
        border-b border-solid border-gray-100
        flex
        items-center
        px-10
        justify-between
      "
    >
      <n-breadcrumb>
        <n-breadcrumb-item> 在线审片 </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="sl-content flex p-5">
      <div class="bg-img w-full h-full"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * name: Piece
 * description:
 * author: roct
 * date: 9:49 下午 2021/8/31
 */
</script>
<style scoped lang="scss">
.sl-content {
  height: calc(100vh - 64px);
  .bg-img {
    background-image: url('../../assets/gg.png');
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100%;
  }
}
</style>
