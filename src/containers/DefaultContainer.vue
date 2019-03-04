<template>
  <div class="app">

    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
        <b-link class="navbar-brand" to="#">
          <img class="navbar-brand-full" src="img/brand/logo.svg" width="89" height="25" alt="CoreUI Logo">
          <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">
        </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />

      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
        </b-nav-item>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
    </AppHeader>

    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>

        <SidebarForm/>

        <SidebarNav :navItems="nav"></SidebarNav>

        <SidebarFooter/>

        <SidebarMinimizer/>
      </AppSidebar>

      <main class="main">
        <Breadcrumb :list="list"/>

        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>

    <vue-snotify></vue-snotify>

    <TheFooter>
      <div>
        <span class="ml-1">&copy; 2019 Teorema.</span>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from '@/tools/_nav'
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb } from '@coreui/vue'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      nav: nav.items
    }
  },

  watch: {
    notifications(notifications) {
      notifications.forEach(notification => {
        this.$snotify[notification.type](notification.body, notification.title, notification.config);
      });
    }
  },

  computed: {
    notifications() {
      return this.$store.getters['app/notifications'];
    },

    name () {
      return this.$route.name
    },

    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  }
}
</script>
