<template>
  <div class="w-30px h-30px inline-block" ref="wrap">
    <div class="loader" :class="{ 'loader-2': loading }" ref="inner">
      <svg
        class="loader-star"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <polygon
          points="29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8 "
          fill="currentColor"
        />
      </svg>
      <div class="loader-circles"></div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  });

  const wrap = ref();
  const inner = ref();

  function handleScale() {
    const { width, height } = wrap.value.getBoundingClientRect();
    const size = Math.min(width, height);
    inner.value.style.transform = `scale(${size / 60})`;
    inner.value.style.transformOrigin = '0 0';
  }

  onMounted(() => {
    handleScale();
  });
</script>

<style lang="less" scoped>
  //   currentColor: #eab308;
  @size: 60px;

  .loader {
    position: relative;
    width: @size;
    height: @size;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
  }

  .loader-2 .loader-star {
    position: static;
    width: @size;
    height: @size;
    transform: scale(1);
    animation: loader-2-star 1s ease alternate infinite;
  }

  .loader-2 .loader-circles {
    width: 8px;
    height: 8px;
    background: currentColor;
    border-radius: 50%;
    position: absolute;
    left: calc(50% - 4px);
    top: calc(50% - 4px);
    transition: all 1s ease;
    animation: loader-2-circles 1s ease-in-out alternate infinite;
  }

  @-webkit-keyframes loader-2-circles {
    0% {
      box-shadow: 0 0 0 currentColor;
      opacity: 1;
      transform: rotate(0deg);
    }
    50% {
      box-shadow: 24px -22px currentColor, 30px -15px 0 -3px currentColor,
        31px 0px currentColor, 29px 9px 0 -3px currentColor,
        24px 23px currentColor, 17px 30px 0 -3px currentColor,
        0px 33px currentColor, -10px 28px 0 -3px currentColor,
        -24px 22px currentColor, -29px 14px 0 -3px currentColor,
        -31px -3px currentColor, -30px -11px 0 -3px currentColor,
        -20px -25px currentColor, -12px -30px 0 -3px currentColor,
        5px -29px currentColor, 13px -25px 0 -3px currentColor;
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: rotate(360deg);
      box-shadow: 25px -22px currentColor, 15px -22px 0 -3px black,
        31px 2px currentColor, 21px 2px 0 -3px black, 23px 25px currentColor,
        13px 25px 0 -3px black, 0px 33px currentColor, -10px 33px 0 -3px black,
        -26px 24px currentColor, -19px 17px 0 -3px black, -32px 0px currentColor,
        -23px 0px 0 -3px black, -25px -23px currentColor,
        -16px -23px 0 -3px black, 0px -31px currentColor,
        -2px -23px 0 -3px black;
    }
  }

  @keyframes loader-2-circles {
    0% {
      box-shadow: 0 0 0 currentColor;
      opacity: 1;
      transform: rotate(0deg);
    }
    50% {
      box-shadow: 24px -22px currentColor, 30px -15px 0 -3px currentColor,
        31px 0px currentColor, 29px 9px 0 -3px currentColor,
        24px 23px currentColor, 17px 30px 0 -3px currentColor,
        0px 33px currentColor, -10px 28px 0 -3px currentColor,
        -24px 22px currentColor, -29px 14px 0 -3px currentColor,
        -31px -3px currentColor, -30px -11px 0 -3px currentColor,
        -20px -25px currentColor, -12px -30px 0 -3px currentColor,
        5px -29px currentColor, 13px -25px 0 -3px currentColor;
      transform: rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: rotate(360deg);
      box-shadow: 25px -22px currentColor, 15px -22px 0 -3px black,
        31px 2px currentColor, 21px 2px 0 -3px black, 23px 25px currentColor,
        13px 25px 0 -3px black, 0px 33px currentColor, -10px 33px 0 -3px black,
        -26px 24px currentColor, -19px 17px 0 -3px black, -32px 0px currentColor,
        -23px 0px 0 -3px black, -25px -23px currentColor,
        -16px -23px 0 -3px black, 0px -31px currentColor,
        -2px -23px 0 -3px black;
    }
  }

  @-webkit-keyframes loader-2-star {
    0% {
      transform: scale(0) rotate(0deg);
    }
    100% {
      transform: scale(0.7) rotate(360deg);
    }
  }

  @keyframes loader-2-star {
    0% {
      transform: scale(0) rotate(0deg);
    }
    100% {
      transform: scale(0.7) rotate(360deg);
    }
  }
</style>
