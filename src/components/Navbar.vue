<template>
  <header class="top-header">
    <div class="header-content">
      <!-- Left: Menu Toggle & Search -->
      <div class="d-flex align-items-center flex-grow-1">
        <button
          class="sidebar-toggle-btn d-lg-none"
          @click="$emit('toggle-sidebar')"
        >
          <i class="ri-menu-line"></i>
        </button>
      </div>

      <!-- Right: Notifications & User -->
      <div class="d-flex align-items-center header-right">
        <!-- Dark Mode Toggle -->
        <button class="header-icon-btn" @click="$emit('toggle-dark-mode')">
          <i :class="darkMode ? 'ri-sun-line' : 'ri-moon-line'"></i>
        </button>

        <!-- Notifications -->
        <div class="notification-wrapper">
          <button
            class="header-icon-btn notification-btn"
            @click="$emit('toggle-notification-dropdown')"
          >
            <i class="ri-notification-3-line"></i>
            <span class="notification-badge">12</span>
          </button>
          <!-- Notification Dropdown -->
          <div
            v-show="showNotificationDropdown"
            class="notification-dropdown-menu"
            @click.stop
          >
            <!-- Header -->
            <div class="notification-header">
              <h5 class="mb-0 font-weight-bold">Notifikasi</h5>
            </div>

            <!-- Notification List -->
            <div class="notification-list-container">
              <div class="notification-list">
                <div
                  v-for="(notif, index) in notifications.inbox"
                  :key="index"
                  class="notification-item"
                >
                  <div class="notification-avatar">
                    <i class="ri-user-line"></i>
                  </div>
                  <div class="notification-content">
                    <p class="notification-title">{{ notif.title }}</p>
                    <p class="notification-message">{{ notif.message }}</p>
                    <p class="notification-time">{{ notif.time }}</p>
                  </div>
                  <div class="notification-dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Profile Dropdown -->
        <div class="user-profile-wrapper-custom">
          <button
            class="user-profile-toggle"
            @click="$emit('toggle-user-profile-dropdown')"
          >
            <div class="user-info d-none d-sm-block text-right mr-3">
              <p class="mb-0 font-weight-medium">Muhammad Ihsan Firdaus</p>
              <p class="mb-0 small text-muted">Super Admin</p>
            </div>
            <div class="user-avatar">MIF</div>
          </button>

          <!-- User Profile Dropdown Menu -->
          <div
            v-show="showUserProfileDropdown"
            class="user-profile-dropdown-menu"
            @click.stop
          >
            <!-- User Info Section -->
            <div class="user-profile-header">
              <div class="d-flex align-items-center">
                <div class="user-avatar-large">MIF</div>
                <div class="user-info-content">
                  <div class="d-flex align-items-center flex-wrap">
                    <p class="user-name">Muhammad Ihsan Firdaus</p>
                    <span class="user-badge">Super Admin</span>
                  </div>
                  <p class="user-email">developer@4visionmedia.com</p>
                </div>
              </div>
            </div>

            <!-- Menu Items -->
            <div class="profile-menu-items">
              <!-- Profile Link -->
              <a href="#" class="profile-menu-item">
                <i class="ri-user-line"></i>
                <span>Profile</span>
              </a>

              <!-- Logout -->
              <button class="profile-menu-item logout-item" @click="$emit('handle-logout')">
                <i class="ri-logout-box-line"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    darkMode: {
      type: Boolean,
      default: false
    },
    notifications: {
      type: Object,
      default: () => ({
        inbox: [],
        other: []
      })
    },
    showNotificationDropdown: {
      type: Boolean,
      default: false
    },
    showUserProfileDropdown: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-sidebar', 'toggle-dark-mode', 'toggle-notification-dropdown', 'toggle-user-profile-dropdown', 'handle-logout']
}
</script>

<style scoped>
/* Styles moved to custom.css */
</style>
