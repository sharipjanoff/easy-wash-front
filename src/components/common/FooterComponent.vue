<template>
  <footer className="footer" v-if="isMobile">
    <router-link class="footer__item" to="/">
      <i class="pi pi-home" style="font-size: 1.5rem"></i>
    </router-link>
    <router-link class="footer__item" to="/schedule">
      <i class="pi pi-calendar" style="font-size: 1.5rem"></i>
    </router-link>
    <router-link class="footer__item" to="/map">
      <i class="pi pi-map-marker" style="font-size: 1.5rem"></i>
    </router-link>
    <router-link class="footer__item" to="/favorite">
      <i class="pi pi-heart" style="font-size: 1.5rem"></i>
    </router-link>
    <router-link class="footer__item" to="/profile">
      <i class="pi pi-user" style="font-size: 1.5rem"></i>
    </router-link>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import SidebarComponent from '@/components/common/SidebarComponent.vue'

const viewportWidth = window.innerWidth
const isMobile = ref(viewportWidth < 650)
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-evenly;
  height: 70px;
  width: 100%;
  background: #fff;

  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-decoration: none;
    color: #a8a4a4;

    i {
      width: 100%;
    }
  }

  &__item.router-link-active.router-link-exact-active {
    color: var(--primary-color);
  }

  &__item:visited {
    color: #a8a4a4;
  }
}
</style>
