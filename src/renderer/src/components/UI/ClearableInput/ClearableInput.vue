<template>
  <div class="clearable-input-wrapper">
    <el-input
      :model-value="modelValue"
      :placeholder="placeholder"
      :readonly="readonly"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <template #suffix>
        <div
          v-if="modelValue && showClearIcon"
          class="clear-button"
          @click="handleClear"
          @mouseenter="isHovering = true"
          @mouseleave="isHovering = false"
        >
          <el-icon :class="{ 'hover-icon': isHovering }">
            <IconMdiCloseCircleOutline />
          </el-icon>
        </div>
        <slot name="suffix"></slot>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholder?: string;
  readonly?: boolean;
  showClearIcon?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
  (e: 'clear'): void;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  readonly: true,
  showClearIcon: true,
});

const emit = defineEmits<Emits>();
const isHovering = ref(false);

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>

<style lang="scss" scoped>
.clearable-input-wrapper {
  width: 100%;

  :deep(.el-input__wrapper) {
    cursor: default;

    .clear-button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 2px;
      border-radius: 50%;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: var(--el-fill-color-light);
      }

      &:active {
        background-color: var(--el-fill-color);
        transform: scale(0.95);
      }

      .el-icon {
        color: var(--el-text-color-placeholder);
        font-size: 18px;
        transition: color 0.2s ease;
      }

      .hover-icon {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
