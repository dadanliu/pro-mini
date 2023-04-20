<template>
  <pm-popup
    :visible="delayShow"
    :need-fuzzy="true"
    @close="onClose"
    :zIndex="999"
  >
    <view class="take-shot-container">
      <view class="img-container">
        <img
          class="img"
          :src="imgSrc"
          :style="{ width: imgSize.width, height: imgSize.height }"
        />
      </view>

      <view class="take-shot-operation">
        <view class="button" @click.stop="reShot">重新拍摄</view>
        <view class="button upload" @click.stop="uploadFile">立即上传</view>
      </view>
      <HpyWaterMark ref="watermark" @waterMark="onWatermark" />
    </view>
  </pm-popup>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";
  import HpyWaterMark from "./watermark/index.vue";
  import PmPopup from "../pm-popup/index.vue";
  import { getUserLocation } from "./baiduMap";

  @Component<TakeLookCard>({
    components: {
      HpyWaterMark,
      PmPopup,
    },
  })
  export default class TakeLookCard extends Vue {
    @Prop({ type: String }) bdKey!: string;

    @Prop({ type: Boolean }) isUpdateShot!: boolean;

    @Prop({ type: Boolean, default: false }) show!: boolean;

    @Prop({ type: Function, default: (data) => data })
    normalizeLocation!: Function;

    imgSrc = "";

    delayShow = false;

    flag = false;

    locationInfo = { address: "", province: "", adcode: "" };

    imgSize = {
      width: "260px",
      height: "360px",
      widthInt: 260,
      heightInt: 360,
    };

    authorizeConfig = {
      camera: false,
      location: false,
    };

    reset() {
      this.imgSrc = "";
      this.delayShow = false;
      this.flag = false;
      this.authorizeConfig = { camera: false, location: false };
      this.imgSize = {
        width: "260px",
        height: "360px",
        widthInt: 260,
        heightInt: 360,
      };
    }

    @Watch("show", { immediate: true })
    onShowChange(newValue) {
      /* 无照片使用相册 */
      if (!newValue) {
        this.reset();
        return;
      }

      this.shotImage();
    }

    @Emit("upload")
    handleUpload(src) {
      return src;
    }

    uploadImgSrc(src) {
      this.imgSrc = src;
    }

    onWatermark(tempFilePath) {
      this.imgSrc = tempFilePath;
    }

    async getLocation() {
      try {
        const { address, province, adcode } = await getUserLocation.call(this, {
          key: this.bdKey,
          normalizeLocation: this.normalizeLocation,
        });
        this.locationInfo = { address, province, adcode };
      } catch (err) {}
    }

    getNowTime() {
      let date = new Date(),
        year = date.getFullYear(),
        month: any = date.getMonth() + 1,
        day: any = date.getDate(),
        hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        minute =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        second =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      month >= 1 && month <= 9 ? (month = "0" + month) : "";
      day >= 0 && day <= 9 ? (day = "0" + day) : "";
      return (
        year +
        "年" +
        month +
        "月" +
        day +
        "日" +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    }

    reShot() {
      this.shotImage();
    }

    // 预览图片
    prevImage(src) {
      uni.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src], // 需要预览的图片http链接列表
      });
    }

    async getImageInfo(path) {
      const res: any = await uni.getImageInfo({
        src: path,
      });
      this.delayShow = true;
      this.imgSize.width = `${270}px`;
      this.imgSize.widthInt = 270;
      const height = res.height / (res.width / 270);
      this.imgSize.height = height + "px";
      // this.imgSize.height = `${Math.min(height, 360)}px`
      this.imgSize.heightInt = height;
    }

    async chooseMedia() {
      const e: any = await uni.chooseMedia({
        sourceType: ["camera"],
        mediaType: ["image"],
        sizeType: ["original"],
      });
      const path = e.tempFiles[0].tempFilePath;
      return path;
    }

    authorize() {
      /* TODO: 拒绝授权 */
      let that = this;
      return new Promise<void>((resolve) => {
        function authroizePassed(cameraIsAuthoried, locIsAuthoried) {
          if (cameraIsAuthoried && locIsAuthoried) {
            resolve();
          } else {
            that.onClose();
          }
        }
        /* success */
        uni.getSetting({
          success(res) {
            /* camera */
            let cameraIsAuthoried = res.authSetting["scope.camera"];
            let locIsAuthoried = res.authSetting["scope.userLocation"];

            let showModal = 0;
            authroizePassed(cameraIsAuthoried, locIsAuthoried);

            if (cameraIsAuthoried === undefined) {
              uni.authorize({
                scope: "scope.camera",
                // 用户接受授权，则获取用户相机位置信息
                success() {
                  cameraIsAuthoried = true;
                  authroizePassed(cameraIsAuthoried, locIsAuthoried);
                },
                // 用户拒接授权，结束引导
              });
            } else if (cameraIsAuthoried === false) {
              // 用户曾经拒接过地理位置的授权，拉起“引导修改设置”的弹窗
              showModal++;
              uni.showModal({
                content: "请打开相机和定位权限以便为您提供更好的服务",
                confirmText: "立即打开",
                success: (successRes) => {
                  // 用户点击了“立即打开”，则进入设置界面
                  if (successRes.confirm) {
                    uni.openSetting({});
                  } else {
                    that.onClose();
                  }
                  // 用户点击了取消，则直接退出modal
                },
              });
            }

            /* location */
            // 用户没有进行过地理位置的授权，拉起地理位置的授权弹框
            if (locIsAuthoried === undefined) {
              uni.authorize({
                scope: "scope.userLocation",
                // 用户接受授权，则获取用户地理位置信息
                success() {
                  locIsAuthoried = true;
                  authroizePassed(cameraIsAuthoried, locIsAuthoried);
                  if (cameraIsAuthoried) {
                    that.getLocation();
                  }
                },
                // 用户拒接授权，结束引导
              });
            } else if (locIsAuthoried === false && showModal === 0) {
              // 用户曾经拒接过地理位置的授权，拉起“引导修改设置”的弹窗
              uni.showModal({
                content: "请打开相机和定位权限以便为您提供更好的服务",
                confirmText: "立即打开",
                success: (successRes) => {
                  // 用户点击了“立即打开”，则进入设置界面
                  if (successRes.confirm) {
                    uni.openSetting({});
                  } else {
                    that.onClose();
                  }
                  // 用户点击了取消，则直接退出modal
                },
              });
            } else if (locIsAuthoried === true) {
              // 用户已经接受过地理位置的授权，获取用户地理位置信息
              that.getLocation();
            }
            authroizePassed(cameraIsAuthoried, locIsAuthoried);
          },
        });
        /* fail */
      });
    }

    @Emit("close")
    handleClose() {}

    async shotImage() {
      try {
        await this.authorize();
        const path = await this.chooseMedia();
        await this.getImageInfo(path);
        const time = this.getNowTime().split(" ");
        this.$refs.watermark.addWaterMark({
          filePaths: [path],
          fillTexts: [time[1], time[0], this.locationInfo.address],
        });
      } catch (err) {
        this.handleClose();
      }
    }

    onClose(): void {
      this.handleClose();
      this.delayShow = false;
    }
  }
</script>
<style lang="scss" scoped>
  .canvasClass {
    height: 360px;
    width: 260px;
    border: 1px solid #979797;
    background-color: #fff;
  }

  .take-shot-container {
    width: 294 * 2rpx;
    min-height: 428 * 2rpx;
    background: #ffffff;
    border-radius: 10rpx;
    position: relative;
    padding-bottom: 44px;
    .img-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 383px;
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .take-shot-operation {
      display: flex;
      position: absolute;
      width: 100%;
      bottom: 0;
      .button {
        flex: 1;
        display: flex;
        align-content: center;
        justify-content: center;
        line-height: 44px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        border-top: 1px solid #eeeeee;
      }

      .upload {
        color: #fb7c47;
        border-left: 1px solid #eeeeee;
      }
    }
  }
</style>
