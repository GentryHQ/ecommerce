<!-- <template>
  <transition>
    <div v-if="visible" class="popup">
      <p>{{ message }}</p>
    </div>
  </transition>
</template> -->

<template>
  <div>
    <transition-group name="popup">
      <div v-for="(popup, index) in popups" :key="index" :style="{ bottom: `${index * 60}px` }" class="popup">
        {{ popup }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>

const props = defineProps({
  visible: Boolean,
  popups: Array,
})
</script>

<!-- <style lang="scss" scoped>
.popup {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  0% {
    transform: translate(-50%, 100%);
  }

  100% {
    transform: translate(-50%, 0%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style> -->

<style scoped>
.popup {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

.transition-enter-active,
.transition-leave-active {
  transition: opacity 0.5s;
}

.transition-enter,
.transition-leave-to {
  opacity: 0;
}
</style>