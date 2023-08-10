<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav class="nav">
        <RouterLink class="link" active-class="active" to="/">Игра</RouterLink>
        <RouterLink class="link" active-class="active" to="/liders">Лидеры</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />

</template>

<style scoped>
.nav {
  max-width: 1000px;
  display: flex;
  justify-content: space-evenly;
  margin: 30px auto;
}

.link {
  text-decoration: none;
  font-size: 26px;
  color: #fff;
}
.active{
  color: #beca6b;
  font-weight: 700;
}
</style>
