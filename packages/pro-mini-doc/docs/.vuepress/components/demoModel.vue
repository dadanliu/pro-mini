<template>
  <!-- <div :class="['van-doc-simulator', { 'van-doc-simulator-fixed': true }]">
    <iframe ref="iframe"
            :src="href"
            :style="simulatorStyle"
            frameborder="0" />
  </div> -->
  <div class="demo-model">
    <div class="model-content">
      <iframe
        class="iframe"
        scrolling="auto"
        frameborder="0"
        :src="href"
        id="demo-modal"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
  import process from "process";
  export default {
    props: {
      url: {
        type: String,
        default: "/",
      },
    },
    data() {
      return {
        scrollTop: 60,
        windowHeight: 640,
      };
    },
    computed: {
      href() {
        let online = "//fe.ops.focus.cn/pro-mini-demos";
        if (typeof window !== "undefined") {
          if (location.hostname.includes("fe.ops.focus.cn")) {
          } else {
            online = "http://localhost:8810";
          }
        }

        const splited = this.url.split("/");
        if (splited) {
          const componentName = splited[splited.length - 1];
          let url = `${online}/#/${componentName}`;
          console.log("url", url);
          return url;
        } else {
          return;
        }
      },
      isFixed() {
        return this.scrollTop > 60;
      },
      simulatorStyle() {
        const height = Math.min(640, this.windowHeight - 90);
        return {
          height: height + "px",
        };
      },
    },
    mounted() {
      window.addEventListener("scroll", () => {
        this.scrollTop = window.scrollY;
      });
      window.addEventListener("resize", () => {
        this.windowHeight = window.innerHeight;
      });
    },
  };
</script>
<style lang="scss">
  // .van-doc-simulator {
  //   position: absolute;
  //   top: calc(50% + 30px);
  //   right: 50px;
  //   z-index: 1;
  //   box-sizing: border-box;
  //   width: 360px;
  //   min-width: 360px;
  //   overflow: hidden;
  //   background: #fafafa;
  //   border-radius: 20px;
  //   @media (max-width: 1100px) {
  //     right: auto;
  //     left: 750px;
  //   }
  //   @media (min-width: 420px) {
  //     right: 50%;
  //     margin-right: calc(420px / 2 * -1 + 24px);
  //   }
  //   &-fixed {
  //     position: fixed;
  //     top: 50%;
  //   }
  //   iframe {
  //     display: block;
  //     width: 100%;
  //   }
  // }
  //
</style>
<style scoped>
  .demo-model {
    font-size: 16px;
    width: 360px;
    min-width: 360px;
    position: fixed;
    z-index: 10;
    margin: 0;
    top: calc((100vh - 560px - 3.6rem) / 2 + 3.6rem);
    box-sizing: border-box;
    overflow-y: auto;
    /* background: #fafafa; */
    background-image: url(/pro-mini/common/iPhoneX_model.png);   
    background-repeat: no-repeat;
    background-size: 100%;
    border-radius: 20px;
    padding: 10px 16px 10px 16px;
  }

  .model-content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 30px;
  }

  .iframe {
    height: 100%;
    width: 100%;
    border-radius: 30px;
  }

  @media screen and (min-width: 1200px) {
    .demo-model {
      width: 310px;
      height: calc(310px * 143.6 / 70.9);
    }

    .demo-model {
      top: calc((100vh - 310px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
    }
  }

  @media (max-width: 1200px) {
    .demo-model {
      display: none;
    }
  }

  @media screen and (min-width: 1366px) {
    .demo-model {
      width: 270;
      height: calc(270px * 143.6 / 70.9);
      top: calc((100vh - 270px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
    }
  }

  @media screen and (min-width: 1500px) {
    .demo-model {
      width: 310px;
      height: calc(310px * 143.6 / 70.9);
      top: calc((100vh - 310px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
    }
  }

  @media screen and (min-width: 1920px) {
    .demo-model {
      width: 350px;
      height: calc(350px * 143.6 / 70.9);
      top: calc((100vh - 350px * 143.6 / 70.9 - 3.6rem) / 2 + 3.6rem);
    }
  }
</style>
