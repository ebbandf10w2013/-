<template>
  <div id="app">
    <nav>
      <ul>

        <li><router-link :to="{ name: 'admin' }">管理</router-link></li>
        <li><router-link :to="{ name: 'user' }">投票</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* 简单的样式 */
nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}

router-link {
  text-decoration: none;
  color: blue;
}

router-link-active {
  font-weight: bold;
}
</style>
