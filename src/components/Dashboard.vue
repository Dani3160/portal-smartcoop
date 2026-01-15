<template>
  <div>
    <!-- Page Header -->
    <div class="page-header mt-4 mb-4">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Dashboard ini menampilkan performa broadcast, status pengiriman, dan masa aktif layanan</p>
    </div>

    <!-- Stats Cards -->
    <b-row class="mb-4">
      <b-col cols="12" md="6" lg="3" class="mb-3">
        <b-card class="stat-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="stat-label">Limit Broadcast Total</h6>
            <div class="stat-icon stat-icon-primary">
              <i class="ri-megaphone-line"></i>
            </div>
          </div>
          <div>
            <p class="stat-value">100</p>
            <p class="stat-unit">pesan</p>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" md="6" lg="3" class="mb-3">
        <b-card class="stat-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="stat-label">Sudah Terpakai</h6>
            <div class="stat-icon stat-icon-orange">
              <i class="ri-checkbox-circle-line"></i>
            </div>
          </div>
          <div>
            <p class="stat-value">50</p>
            <p class="stat-unit">pesan</p>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" md="6" lg="3" class="mb-3">
        <b-card class="stat-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="stat-label">Sisa Kuota</h6>
            <div class="stat-icon stat-icon-green">
              <i class="ri-time-line"></i>
            </div>
          </div>
          <div>
            <p class="stat-value">50</p>
            <p class="stat-unit">pesan</p>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" md="6" lg="3" class="mb-3">
        <b-card class="stat-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="stat-label">Masa Aktif Paket</h6>
            <div class="stat-icon stat-icon-blue">
              <i class="ri-calendar-line"></i>
            </div>
          </div>
          <div>
            <p class="stat-value-date">1 Januari</p>
            <p class="stat-value-year">2030</p>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- Main Content Grid -->
    <b-row class="mb-4">
      <!-- Aktivitas Broadcast -->
      <b-col cols="12" lg="8" class="mb-4">
        <b-card class="activity-card">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Aktivitas Broadcast</h5>
            <div class="broadcast-tabs">
              <b-button
                v-for="period in periods"
                :key="period.value"
                :variant="currentPeriod === period.value ? 'primary' : 'outline-secondary'"
                size="sm"
                class="mr-2"
                @click="changePeriod(period.value)"
              >
                {{ period.label }}
              </b-button>
            </div>
          </div>
          <div id="broadcast-activity-chart" class="mb-4"></div>
          <b-row class="mt-4">
            <b-col cols="4" class="text-center">
              <p class="stat-value-small">1,250</p>
              <p class="stat-label-small">Total Pesan</p>
            </b-col>
            <b-col cols="4" class="text-center">
              <p class="stat-value-small">850</p>
              <p class="stat-label-small">Berhasil Dikirim</p>
            </b-col>
            <b-col cols="4" class="text-center">
              <p class="stat-value-small">400</p>
              <p class="stat-label-small">Gagal</p>
            </b-col>
          </b-row>
        </b-card>
      </b-col>

      <!-- Broadcast Hari Ini -->
      <b-col cols="12" lg="4" class="mb-4">
        <b-card class="today-card">
          <h5 class="card-title text-white mb-4">Broadcast Hari Ini</h5>

          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="today-label">Broadcast Hari Ini</span>
              <span class="today-value">3</span>
            </div>
            <p class="today-unit">kampanye</p>
          </div>

          <div class="mb-4 pb-3 border-bottom border-white border-opacity-25">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="today-label">Total Pesan Dikirim</span>
              <span class="today-value">1.250</span>
            </div>
          </div>

          <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="today-label">Sedang Berjalan</span>
              <div class="d-flex align-items-center">
                <div class="pulse-dot"></div>
                <span class="today-value ml-2">1</span>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="today-label">Gagal</span>
              <span class="today-value text-danger-light">12</span>
            </div>
          </div>

          <div class="progress-wrapper mb-3">
            <b-progress :value="83" :max="100" variant="light" class="mb-2"></b-progress>
            <p class="text-center small text-white text-opacity-75 mb-0">83% kampanye berhasil</p>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- Kampanye Terbaru -->
    <b-row>
      <b-col cols="12">
        <b-card class="campaign-table-card">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">5 Kampanye Terbaru</h5>
          </div>
          <div class="table-responsive">
            <b-table
              :items="campaigns"
              :fields="campaignFields"
              striped
              hover
              class="campaign-table"
            >
              <template #cell(status)="row">
                <b-badge
                  :variant="getStatusVariant(row.item.status)"
                >
                  {{ row.item.status }}
                </b-badge>
              </template>
            </b-table>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      currentPeriod: 'daily',
      periods: [
        { label: 'Harian', value: 'daily' },
        { label: 'Mingguan', value: 'weekly' },
        { label: 'Bulanan', value: 'monthly' }
      ],
      campaigns: [
        {
          title: 'Pengumuman Rapat Anggota Tahunan 2025',
          total: '1,250',
          status: 'Sukses',
          time: '2 jam yang lalu'
        },
        {
          title: 'Informasi Pembagian SHU Tahunan',
          total: '850',
          status: 'Sukses',
          time: '5 jam yang lalu'
        },
        {
          title: 'Undangan Rapat Pengurus Koperasi',
          total: '420',
          status: 'Pending',
          time: '1 hari yang lalu'
        },
        {
          title: 'Pengumuman Program Simpan Pinjam Baru',
          total: '2,100',
          status: 'Gagal',
          time: '2 hari yang lalu'
        },
        {
          title: 'Pengingat Pembayaran Simpanan Wajib',
          total: '1,850',
          status: 'Sukses',
          time: '3 hari yang lalu'
        }
      ],
      campaignFields: [
        { key: 'title', label: 'Judul' },
        { key: 'total', label: 'Total Pesan' },
        { key: 'status', label: 'Status' },
        { key: 'time', label: 'Waktu' }
      ],
      broadcastChart: null
    }
  },
  mounted() {
    this.initChart()
    this.initToastr()
    this.showWelcomeToast()
  },
  methods: {
    changePeriod(period) {
      this.currentPeriod = period
      this.updateChart()
    },
    getStatusVariant(status) {
      const variants = {
        'Sukses': 'success',
        'Pending': 'warning',
        'Gagal': 'danger'
      }
      return variants[status] || 'secondary'
    },
    initChart() {
      this.$nextTick(() => {
        if (window.ApexCharts) {
          const chartElement = document.querySelector('#broadcast-activity-chart')
          if (chartElement) {
            this.updateChart()
          }
        }
      })
    },
    updateChart() {
      const dailyData = {
        categories: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        series: [{
          name: 'Jumlah Pesan',
          data: [120, 150, 180, 200, 175, 160, 140]
        }]
      }

      const weeklyData = {
        categories: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
        series: [{
          name: 'Jumlah Pesan',
          data: [850, 920, 780, 950]
        }]
      }

      const monthlyData = {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        series: [{
          name: 'Jumlah Pesan',
          data: [3200, 3500, 2800, 4000, 3800, 4200, 3600, 3900, 4100, 3700, 4000, 4300]
        }]
      }

      let data
      if (this.currentPeriod === 'daily') {
        data = dailyData
      } else if (this.currentPeriod === 'weekly') {
        data = weeklyData
      } else {
        data = monthlyData
      }

      const options = {
        series: data.series,
        chart: {
          type: 'area',
          height: 300,
          toolbar: { show: false },
          zoom: { enabled: false }
        },
        dataLabels: { enabled: false },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100]
          }
        },
        colors: ['#FF720D'],
        xaxis: {
          categories: data.categories,
          labels: {
            style: {
              colors: '#6b7280',
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#6b7280',
              fontSize: '12px'
            },
            formatter: (val) => Math.floor(val)
          }
        },
        grid: {
          borderColor: '#e5e7eb',
          strokeDashArray: 4
        },
        tooltip: {
          y: {
            formatter: (val) => val + ' pesan'
          }
        }
      }

      if (this.broadcastChart) {
        this.broadcastChart.updateOptions(options)
      } else {
        const chartElement = document.querySelector('#broadcast-activity-chart')
        if (chartElement && window.ApexCharts) {
          this.broadcastChart = new window.ApexCharts(chartElement, options)
          this.broadcastChart.render()
        }
      }
    },
    initToastr() {
      if (window.toastr) {
        window.toastr.options = {
          closeButton: true,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: 'toast-top-right',
          preventDuplicates: false,
          onclick: null,
          showDuration: '300',
          hideDuration: '1000',
          timeOut: '5000',
          extendedTimeOut: '1000',
          showEasing: 'swing',
          hideEasing: 'linear',
          showMethod: 'fadeIn',
          hideMethod: 'fadeOut'
        }
      }
    },
    showWelcomeToast() {
      if (window.toastr) {
        setTimeout(() => {
          window.toastr.success('Selamat Datang di Smartcoop Broadcast!')
        }, 500)
      }
    }
  },
  beforeDestroy() {
    if (this.broadcastChart) {
      this.broadcastChart.destroy()
    }
  }
}
</script>

<style scoped>
/* Styles moved to custom.css */
</style>
