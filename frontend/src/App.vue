<template>
  <v-app>

    <v-app-bar app>
      <router-link to="/">
          <v-img
              src="./assets/logo.png"
              :max-width="30"
              :max-height="30"
          ></v-img>
      </router-link>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container>

        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app :height="56">
      <v-icon>mdi-linkedin</v-icon>
      <a class="black--text" href="https://www.linkedin.com/in/sergey-alvinsky-998a20113/" target="_blank">linkedin</a>
      <v-icon class="ml-4">mdi-github</v-icon>
      <a class="black--text" href="https://github.com/orioncx" target="_blank">github</a>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
</style>
