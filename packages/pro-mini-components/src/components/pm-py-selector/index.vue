<template>
  <view>
    <text :class="[
        'oneLine',
        selectedNames !== '请选择' ? 'colorNormal' : 'colorGray',
        'basicStyle',
      ]"
          @click="showPopup">{{ selectedNames }}</text>
    <u-popup v-model="show"
             mode="bottom"
             border-radius="20"
             @close="close"
             @open="open">
      <view class="main-panel">
        <view class="main-header">
          <view class="main-title">请选择</view>
          <view class="search-header">
            <!-- 搜索 -->
            <view class="search-container">
              <view class="search-container__input-container">
                <input @click="openSearchMode"
                       v-model.trim="searchContent"
                       class="search-container__input"
                       placeholder="请输入名称搜索"
                       confirm-type="done"
                       :placeholder-style="placeholderStyle" />
              </view>
              <u-icon name="search"
                      v-if="searchContent === '' || !searchContent"
                      class="search-container__icon"
                      alt="" />
              <span v-else
                    class="search-container__cancel"
                    @click="clearAll">
                取消
              </span>
            </view>
            <!-- 选择区 -->
            <view class="selected-container"
                  v-if="!searchMode">
              <view class="selected-container-title">已选择</view>
              <view class="selected-item-container">
                <view class="selected-item-wrapper"
                      v-for="item in selectedValue"
                      :key="item.value">
                  <view class="selected-item"
                        @tap="removeSelected(item)">
                    {{ item.label }}
                    <u-icon class="remove-icon"
                            :size="24"
                            name="close"
                            color="#FB7C47" />
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <u-gap height="10"
               bg-color="#f8f8f8" />
        <!-- 已选择 -->
        <view class="select-container"
              v-if="!searchMode">
          <scroll-view :scroll-y="true"
                       class="selector-scroll">
            <view v-for="item in sortedValues"
                  :key="item[0]"
                  class="select-box">
              <view class="select-title">{{ item[0] }}</view>
              <view class="row-content">
                <view class="row-tag"
                      v-for="_item in item[1]"
                      :key="_item.value"
                      @click="selectStore(_item)">
                  <view class="row-tag-inner">
                    {{ _item.label }}
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
        <!-- 搜索 -->
        <view class="search-result-content"
              v-if="!noSearchResult && searchMode">
          <scroll-view :scroll-y="true"
                       class="selector-scroll">
            <view class="search-result-row"
                  v-for="item in searchRange"
                  :key="item.value"
                  @click="selectSearchResult(item)">
              {{ item.label }}
            </view>
          </scroll-view>
        </view>

        <view class="no-result-container"
              v-if="noSearchResult && searchMode">
          <view>
            <img :src="noResult"
                 class="no-result" />
            <view class="content">搜索无结果</view>
          </view>
        </view>

        <view class="footer-btns-container">
          <u-button v-if="!searchMode"
                     my-class="confirm-btn"
                     type="primary"
                     @click="confirm">确&nbsp;认</u-button>
          <u-button v-else
                     my-class="confirm-btn"
                     type="primary"
                     @click="back">返&nbsp;回</u-button>
        </view>
      </view>
    </u-popup>
    <u-popup v-model="show"
             mode="bottom"
             border-radius="20"
             @close="close"
             @open="open">
      <view class="main-panel">
        <view class="main-header">
          <view class="main-title">选择</view>
          <view class="search-header">
            <!-- 搜索 -->
            <view class="search-container">
              <view class="search-container__input-container">
                <input @click="openSearchMode"
                       v-model.trim="searchContent"
                       class="search-container__input"
                       placeholder="请输入名称搜索"
                       confirm-type="done"
                       :placeholder-style="placeholderStyle" />
                <!-- @confirm="doTheSearch"
                     @blur="doTheSearch" -->
              </view>
              <u-icon name="search"
                      v-if="searchContent === '' || !searchContent"
                      class="search-container__icon" />
              <span v-else
                    class="search-container__cancel"
                    @click="clearAll">
                取消
              </span>
            </view>
            <!-- 选择区 -->
            <view class="selected-container"
                  v-if="!searchMode">
              <view class="selected-container-title">已选择</view>
              <view class="selected-item-container">
                <view class="selected-item-wrapper"
                      v-for="item in selectedValue"
                      :key="item.value">
                  <view class="selected-item"
                        @tap="removeSelected(item)">
                    {{ item.label }}
                    <u-icon class="remove-icon"
                            :size="24"
                            name="close"
                            color="#FB7C47" />
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <u-gap height="10"
               bg-color="#f8f8f8" />
        <!-- 已选择 -->
        <view class="select-container"
              v-if="!searchMode">
          <scroll-view :scroll-y="true"
                       class="selector-scroll">
            <view v-for="item in sortedValues"
                  :key="item[0]"
                  class="select-box">
              <view class="select-title">{{ item[0] }}</view>
              <view class="row-content">
                <view class="row-tag"
                      v-for="_item in item[1]"
                      :key="_item.value"
                      @click="selectStore(_item)">
                  <view class="row-tag-inner">
                    {{ _item.label }}
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
        <!-- 搜索 -->
        <view class="search-result-content"
              v-if="!noSearchResult && searchMode">
          <scroll-view :scroll-y="true"
                       class="selector-scroll">
            <view class="search-result-row"
                  v-for="item in searchRange"
                  :key="item.value"
                  @click="selectSearchResult(item)">
              {{ item.label }}
            </view>
          </scroll-view>
        </view>

        <view class="no-result-container"
              v-if="noSearchResult && searchMode">
          <view>
            <img :src="noResult"
                 class="no-result" />
            <view class="content">搜索无结果</view>
          </view>
        </view>

        <view class="footer-btns-container">
          <u-button v-if="!searchMode"
                     my-class="confirm-btn"
                     type="primary"
                     @click="confirm">确&nbsp;认</u-button>
          <u-button v-else
                     my-class="confirm-btn"
                     type="primary"
                     @click="back">返&nbsp;回</u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop, Watch } from 'vue-property-decorator'
import { debounce } from 'helpful-decorators'
import uPopup from 'uview-ui/components/u-popup/u-popup.vue'
import uGap from 'uview-ui/components/u-gap/u-gap.vue'
import uIcon from 'uview-ui/components/u-icon/u-icon.vue'
import uButton from 'uview-ui/components/u-button/u-button.vue'

import pinyin from './pinyin'
import { message } from './message'

@Component({
  mixins: [pinyin],
  components: {
    uPopup,
    uGap,
    uButton,
    uIcon,
  },
})
export default class extends Vue {
  /**
   * 选择器值
   */
  @Prop({ type: Array }) readonly value!: []

  /**
   * 是否禁用
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean

  /**
   * 是否可清空
   */
  @Prop({ type: Boolean, default: false }) readonly clearable!: boolean

  /**
   * 占位符
   */
  @Prop({ type: String, default: '请选择' }) readonly placeholder?: string

  /**
   * options 数据
   */
  @Prop({ type: Array }) options!: Array<{ value: any; label: any }>

  placeholderStyle =
    'color:#bbbbbb;font-size:28rpx;line-height:40rpx;text-align:right;'

  selectedNames = '请选择'

  searchMode = false

  show = false

  searchContent = ''

  searchRange: any[] = []

  selectedValue: any[] = [
    // { label: 'iconanme', value: 1 },
    // { label: 'iconanme', value: 2 },
    // { label: 'iconanme', value: 3 },
    // { label: 'iconanme', value: 4 },
    // { label: 'iconanme', value: 5 },
    // { label: 'iconanme', value: 6 }
  ]

  /**
   * 判断是否有搜索结果
   */
  get noSearchResult() {
    return this.searchRange.length === 0 && this.searchContent?.length > 0
  }

  /**
   * 拼音排序
   */
  get sortedValues() {
    const reg = /^[A-Za-z]+$/
    const relation: any = {}
    const others: any[] = ['其他', []]

    if (this.options && this.options.length) {
      this.options.forEach((opt) => {
        const c = this.makePy(opt.label)

        if (!reg.test(c)) {
          others[1] = others[1].concat(opt)
        } else if (relation[c]) {
          relation[c].push(opt)
        } else {
          relation[c] = [opt]
        }
      })
    }

    const ret = Object.keys(relation)
      .sort((a, b) => a.charCodeAt() - b.charCodeAt())
      .reduce((acc, char: string, idx) => {
        acc[idx] = [char, relation[char]]
        return acc
      }, [])
      .concat([others])
      .filter((item: any[]) => item[1].length > 0)

    return ret
  }

  /**
   * 获取选中的值
   */
  getItem(value) {
    return value?.map((v) => {
      return this.options.find((_v) => _v.value === v)
    })
  }

  /**
   * 获取options的改变
   */
  @Watch('options', { immediate: true, deep: true })
  onOptionsChange(options) {
    this.searchRange = options
  }

  /**
   * 获取value的改变
   */
  @Watch('value', { immediate: true, deep: true })
  onValueChange(value) {
    let values: any[]
    let label = '请选择'
    if (this.options.length && value?.length) {
      const selected = this.getItem(value)
      values = selected
      label = selected?.map((v) => v.label).join(',')
    } else {
      values = []
    }

    this.selectedValue = values
    this.selectedNames = label
  }

  /**
   * 获取value的改变
   */
  @Emit('select')
  handleSelect(item) {
    this.selectedValue.push(item)
    return this.selectedValue
  }

  /**
   * 打开面板
   */
  openSearchMode() {
    this.searchMode = true
  }

  /**
   * 清空选择值
   */
  clearAll() {
    this.searchContent = ''
    this.searchRange = this.options
  }

  /**
   * 清空某个选择值
   */
  removeSelected(item) {
    this.selectedValue.splice(
      this.selectedValue.findIndex((_i) => _i.value === item.value),
      1
    )
  }

  /**
   * 模糊搜索
   */
  @Watch('searchContent')
  @debounce(400, {
    leading: false,
    trailing: true,
  })
  doTheSearch(text) {
    if (!this.options || !this.options.length) return
    let range: any[] = []
    if (text) {
      range = this.options.filter((opt) => {
        return opt.label?.includes(text)
      })!
    } else {
      range = this.options
    }

    this.searchRange = range
  }

  /**
   * 清空搜索
   */
  clearSearch() {
    this.searchRange = this.options
    this.searchContent = ''
  }

  /**
   * 是否展示
   */
  @Watch('show')
  onShowChange(show) {
    if (!show) {
      this.selectedValue = this.getItem(this.value)
      this.searchMode = false
    } else {
      this.onValueChange(this.value)
    }
  }

  /**
   * 是否清空
   */
  @Watch('searchMode')
  onModeChange(mode) {
    if (!mode) {
      this.clearSearch()
    }
  }

  /**
   * @vuese
   * 选择搜索结果
   */
  selectSearchResult(item) {
    this.handleSelect(item)
    this.searchMode = false
  }

  /**
   * @vuese
   * 打开面板
   */
  open() {
    this.show = true
  }

  /**
   * @vuese
   * 触发onInput
   */
  @Emit('input')
  handleInput(value) {
    return value
  }

  /**
   * @vuese
   * 关闭面板
   */
  close() {
    this.handleInput(this.value)
    this.show = false
  }

  /**
   * @vuese
   * 关闭面板
   */
  back() {
    this.searchMode = false
  }

  /**
   * @vuese
   * 确认选择
   */
  confirm() {
    const ids = this.selectedValue.map((v) => v.id)

    this.handleInput(ids)
    const names = this.selectedValue.map((v) => v.label).join(',')
    this.selectedNames = names?.length ? names : '请选择'
    this.show = false
  }

  /**
   * @vuese
   * 空值提示
   */
  messageInfo() {
    if (!this.options.length) {
      message.info('暂无可选项')
    }
  }

  /**
   * @vuese
   * 清空
   */
  clear() {
    if (!this.disabled) {
      this.handleInput([])
      this.$nextTick(() => {
        this.selectedValue = []
      })
    }
  }

  /**
   * @vuese
   * 空值提示
   */
  showPopup() {
    if (!this.options || !this.options.length) {
      message.info('暂无可选项')
      return
    }
    this.show = true
  }
}
</script>

<style scoped lang="scss">
@mixin onlyOneLine($width) {
  max-width: $width;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.colorGray {
  color: #bbbbbb;
}
.colorNormal {
  color: #666;
}
.right-arrow {
  font-size: 36rpx;
  color: #bbbbbb;
  line-height: 36rpx;
  margin-left: 10rpx;
}
.basicStyle {
  min-width: 100px;
  text-align: right;
}
.footer-btns-container {
  border-top: 1px solid #e5e5e5;
  padding: 15px 0;
  margin: 0 15px;
  .confirm-btn {
    background: #fb7c47;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
  }
}

.search-header {
  .search-container {
    padding: 25rpx 30rpx;
    padding-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 13px;
    &__input {
      width: 690rpx;
      height: 70rpx;
      background: #f8f8f8;
      border-radius: 2rpx;
      padding: 18rpx 80rpx 18rpx 30rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      line-height: 32rpx;
    }
    &__icon {
      height: 24rpx;
      width: 24rpx;
      position: absolute;
      right: 60rpx;
    }
    &__cancel {
      position: absolute;
      right: 60rpx;
      text-align: center;
      font-size: 24rpx;
      color: #bbbbbb;
    }
  }

  .selected-container {
    display: flex;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 4px;
    .selected-container-title {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 42px;
      margin-right: 10px;
      width: 48px;
      flex-basis: 48px;
    }
    .selected-item-container {
      margin-top: 4px;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }
    .selected-item-wrapper {
      margin-right: 10px;
      height: 38px;
      line-height: 38px;
      display: flex;
      align-items: center;
    }
    .selected-item {
      height: 28px;
      flex: 1;
      display: flex;
      align-items: center;
      color: #fb7c47;
      background: rgba(251, 124, 71, 0.06);
      border-radius: 4px;
      border: 1px solid #fb7c47;
      padding-left: 11px;
      padding-right: 25px;
      position: relative;
      .remove-icon {
        position: absolute;
        right: 0px;
        top: 0px;
        padding: 8px;
      }
    }
  }
}

.search-result-content {
  flex: 1;
  overflow: scroll;
  .search-result-row {
    margin-left: 15px;
    margin-right: 15px;
    height: 40px;
    line-height: 40px;
    background: #ffffff;
    border-bottom: 1px solid #eee;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    font-size: 12px;
  }
}
.no-result-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  img {
    width: 65px;
    height: 65px;
  }
  .content {
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 14px;
    margin-top: 7px;
  }
}

.selector-scroll {
  height: 100%;
}

.select-container {
  padding: 0 15px 6px 15px;
  flex: 1;
  overflow: scroll;
  .select-box {
    .select-title {
      margin-top: 5px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 38px;
      height: 38px;
    }
    .row-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .row-tag {
      text-align: center;
      padding: 0 12px;
      line-height: 27px;
      height: 27px;
      background: #f5f5f5;
      display: flex;
      justify-content: center;
      border-radius: 4px;
      .row-tag-inner {
        @include onlyOneLine(144px);
      }
    }
  }
}

.main-panel {
  height: 596px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  .main-title {
    margin-top: 18px;
    margin-bottom: 13px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #222222;
    line-height: 14px;
  }
}

.oneLine {
  display: inline-block;
  max-width: 220px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
