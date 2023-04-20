<template>
  <u-modal v-model="show"
           @close="onClose">
    <slot></slot>
  </u-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import uModal from 'uview-ui/components/u-modal/u-modal.vue'

@Component({
  uModal,
})
export default class PmModal extends Vue {
  show = true
  onClose() {}
}
</script>

<style scoped lang="scss">
@import 'uview-ui/index.scss';
@import 'uview-ui/theme.scss';
</style>
