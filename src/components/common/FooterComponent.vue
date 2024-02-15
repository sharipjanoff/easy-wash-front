<template>
  <footer className="footer" v-if="isMobile">
    <div class="footer__item">
      <router-link to="/">
        <i class="pi pi-home" style="font-size: 1.5rem"></i>
      </router-link>
    </div>
    <div class="footer__item">
      <router-link to="/">
        <i class="pi pi-search" style="font-size: 1.5rem"></i>
      </router-link>
    </div>
    <div class="footer__item">
      <router-link to="/">
        <i class="pi pi-map-marker" style="font-size: 1.5rem"></i>
      </router-link>
    </div>
    <div class="footer__item">
      <router-link to="/">
        <i class="pi pi-check-square" style="font-size: 1.5rem"></i>
      </router-link>
    </div>
    <div class="footer__item">
      <router-link to="/">
        <i class="pi pi-user" style="font-size: 1.5rem"></i>
      </router-link>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import SidebarComponent from '@/components/common/SidebarComponent.vue'

const viewportWidth = window.innerWidth
const isMobile = ref(viewportWidth < 650)
console.log(isMobile.value)
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-evenly;
  min-height: 50px;
  width: 100%;
  background: aliceblue;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    i {
      width: 100%;
    }
  }
}
</style>
