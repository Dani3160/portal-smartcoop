<template>
  <aside
    id="sidebar"
    class="sidebar"
    :class="{ 'sidebar-open': sidebarVisible, 'sidebar-closed': !sidebarVisible }"
  >
    <div class="sidebar-content">
      <!-- Logo -->
      <div class="d-flex align-items-center mb-4 px-3 py-2">
        <img :src="require('@/assets/images/logo-smartcoop.png')" alt="Smartcoop" class="logo-image" />
      </div>

      <!-- Navigation Menu -->
      <ul class="sidebar-nav">
        <li>
          <router-link to="/" class="sidebar-link" active-class="active" exact>
            <i class="ri-dashboard-line mr-3"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li>
          <a href="#" class="sidebar-link">
            <i class="ri-building-line mr-3"></i>
            <span>Data Koperasi</span>
          </a>
        </li>
        <li>
          <div class="sidebar-dropdown">
            <a href="#" class="sidebar-link sidebar-dropdown-toggle" :class="{ 'active': openDropdowns.spk }" @click.prevent="$emit('toggle-dropdown', 'spk')">
              <i class="ri-file-list-line mr-3"></i>
              <span>SPK & Hosting</span>
              <i class="ri-arrow-down-s-line ml-auto dropdown-arrow" :class="{ 'rotate-180': openDropdowns.spk }"></i>
            </a>
            <ul class="sidebar-dropdown-menu" v-show="openDropdowns.spk">
              <li>
                <a href="#" class="sidebar-dropdown-item">Data Koperasi</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item active">Invoice</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item">Summary</a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div class="sidebar-dropdown">
            <a href="#" class="sidebar-link sidebar-dropdown-toggle" @click.prevent="$emit('toggle-dropdown', 'marketing')">
              <i class="ri-megaphone-line mr-3"></i>
              <span>Marketing Activity</span>
              <i class="ri-arrow-down-s-line ml-auto dropdown-arrow" :class="{ 'rotate-180': openDropdowns.marketing }"></i>
            </a>
            <ul class="sidebar-dropdown-menu" v-show="openDropdowns.marketing">
              <li>
                <a href="#" class="sidebar-dropdown-item">Master Prospek Koperasi</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item">Data Prospek Koperasi</a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <router-link to="/statistik" class="sidebar-link" active-class="active">
            <i class="ri-bar-chart-line mr-3"></i>
            <span>Statistik</span>
          </router-link>
        </li>
        <li>
          <div class="sidebar-dropdown">
            <a href="#" class="sidebar-link sidebar-dropdown-toggle" @click.prevent="$emit('toggle-dropdown', 'master')">
              <i class="ri-database-line mr-3"></i>
              <span>Master Data</span>
              <i class="ri-arrow-down-s-line ml-auto dropdown-arrow" :class="{ 'rotate-180': openDropdowns.master }"></i>
            </a>
            <ul class="sidebar-dropdown-menu" v-show="openDropdowns.master">
              <li>
                <a href="#" class="sidebar-dropdown-item">Mitra</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item">Agen</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item">Dokumen</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item">Unit Bank</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item">Regional Office</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item">Unit Kerja</a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div class="sidebar-dropdown">
            <a href="#" class="sidebar-link sidebar-dropdown-toggle" @click.prevent="$emit('toggle-dropdown', 'bri')">
              <i class="ri-bank-line mr-3"></i>
              <span>BRI Program</span>
              <i class="ri-arrow-down-s-line ml-auto dropdown-arrow" :class="{ 'rotate-180': openDropdowns.bri }"></i>
            </a>
            <ul class="sidebar-dropdown-menu" v-show="openDropdowns.bri">
              <li>
                <a href="#" class="sidebar-dropdown-item">Pengajuan Giro</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item">Digital Payment</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item">Prospek Koperasi</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item">Pengajuan Subsidi</a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div class="sidebar-dropdown">
            <a href="#" class="sidebar-link sidebar-dropdown-toggle" @click.prevent="$emit('toggle-dropdown', 'user')">
              <i class="ri-user-settings-line mr-3"></i>
              <span>User Management</span>
              <i class="ri-arrow-down-s-line ml-auto dropdown-arrow" :class="{ 'rotate-180': openDropdowns.user }"></i>
            </a>
            <ul class="sidebar-dropdown-menu" v-show="openDropdowns.user">
              <li>
                <a href="#" class="sidebar-dropdown-item">Manage User</a>
              </li>
              <li>
                <a href="#" class="sidebar-dropdown-item">Manage Role</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <!-- Footer -->
      <div class="sidebar-footer">
        <div class="d-flex align-items-center justify-content-center text-muted">
          <i class="ri-customer-service-2-line mr-2"></i>
          <span>© 2025 4VisionMedia</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    sidebarVisible: {
      type: Boolean,
      default: false
    },
    openDropdowns: {
      type: Object,
      default: () => ({
        spk: false,
        marketing: false,
        master: false,
        bri: false,
        user: false
      })
    }
  },
  emits: ['toggle-sidebar', 'toggle-dropdown']
}
</script>

<style scoped>
/* Styles moved to custom.css */
</style>
