<template>
  <div class="dashboard-wrapper" :class="{ 'dark-mode': darkMode }">
    <!-- Sidebar Overlay -->
    <div
      v-if="sidebarVisible && isMobile"
      class="sidebar-overlay"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <Sidebar
      :sidebar-visible="sidebarVisible"
      :open-dropdowns="openDropdowns"
      @toggle-sidebar="toggleSidebar"
      @toggle-dropdown="toggleDropdown"
    />

    <!-- Main Content -->
    <div class="main-content" :class="{ 'sidebar-open': sidebarVisible }">
      <!-- Top Header -->
      <Navbar
        :dark-mode="darkMode"
        :notifications="notifications"
        :show-notification-dropdown="showNotificationDropdown"
        :show-user-profile-dropdown="showUserProfileDropdown"
        @toggle-sidebar="toggleSidebar"
        @toggle-dark-mode="toggleDarkMode"
        @toggle-notification-dropdown="toggleNotificationDropdown"
        @toggle-user-profile-dropdown="toggleUserProfileDropdown"
        @handle-logout="handleLogout"
      />

      <!-- Main Content Area -->
      <main class="main-content-area">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from '../Sidebar.vue'
import Navbar from '../Navbar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Sidebar,
    Navbar
  },
  data() {
    const isDesktop = window.innerWidth >= 992
    return {
      sidebarVisible: isDesktop,
      isMobile: !isDesktop,
      darkMode: false,
      showNotificationDropdown: false,
      showUserProfileDropdown: false,
      openDropdowns: {
        spk: false,
        marketing: false,
        master: false,
        bri: false,
        user: false
      },
      notifications: {
        inbox: [
          { title: 'Judul Broadcast 1', message: 'berhasil dikirim', time: '1 jam yang lalu' },
          { title: 'Judul Broadcast 2', message: 'berhasil dikirim', time: '2 jam yang lalu' },
          { title: 'Judul Broadcast 3', message: 'berhasil dikirim', time: '3 jam yang lalu' }
        ],
        other: [
          { title: 'Judul Broadcast Agen 1', message: 'berhasil dikirim', time: '30 menit yang lalu' },
          { title: 'Judul Broadcast Agen 2', message: 'berhasil dikirim', time: '1 jam yang lalu' }
        ]
      }
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.notification-wrapper') && !e.target.closest('.user-profile-wrapper-custom')) {
        this.showNotificationDropdown = false
        this.showUserProfileDropdown = false
      }
    })
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      document.body.classList.toggle('dark-mode', this.darkMode)
      if (window.toastr) {
        window.toastr.info(this.darkMode ? 'Dark mode enabled' : 'Light mode enabled')
      }
    },
    toggleNotificationDropdown() {
      this.showNotificationDropdown = !this.showNotificationDropdown
      this.showUserProfileDropdown = false
    },
    toggleUserProfileDropdown() {
      this.showUserProfileDropdown = !this.showUserProfileDropdown
      this.showNotificationDropdown = false
    },
    toggleDropdown(dropdownName) {
      this.openDropdowns[dropdownName] = !this.openDropdowns[dropdownName]
    },
    handleLogout() {
      if (window.Swal) {
        window.Swal.fire({
          title: 'Logout',
          text: 'Apakah Anda yakin ingin logout?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#ef4444',
          cancelButtonColor: '#6b7280',
          confirmButtonText: 'Ya, Logout',
          cancelButtonText: 'Batal'
        }).then((result) => {
          if (result.isConfirmed) {
            if (window.toastr) {
              window.toastr.success('Logout berhasil!')
            }
          }
        })
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth < 992
      if (window.innerWidth >= 992) {
        this.sidebarVisible = true
      } else {
        this.sidebarVisible = false
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
/* Styles moved to custom.css */
</style>
