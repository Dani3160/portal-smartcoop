<template>
  <div>
    <!-- Page Header -->
    <div class="page-header mt-4 mb-4">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Selamat datang di Portal Smartcoop - Dashboard utama untuk monitoring dan analisis data koperasi</p>
    </div>

    <!-- Summary Cards Row 1 -->
    <b-row class="mb-4">
      <b-col cols="12" md="6" lg="3" class="mb-3">
        <b-card class="summary-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="summary-label">Koperasi</h6>
            <div class="summary-icon summary-icon-green">
              <i class="ri-building-line"></i>
            </div>
          </div>
          <div class="mb-2">
            <p class="summary-value">273</p>
            <p class="summary-unit">Total Data</p>
          </div>
          <div class="summary-detail">
            <span class="summary-detail-item">
              <i class="ri-checkbox-circle-line text-success"></i>
              Aktif: 191
            </span>
            <span class="summary-detail-item">
              <i class="ri-close-circle-line text-danger"></i>
              Non Aktif: 82
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" md="6" lg="3" class="mb-3">
        <b-card class="summary-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="summary-label">Anggota Koperasi</h6>
            <div class="summary-icon summary-icon-blue">
              <i class="ri-group-line"></i>
            </div>
          </div>
          <div class="mb-2">
            <p class="summary-value">153.019</p>
            <p class="summary-unit">Total Anggota</p>
          </div>
          <div class="summary-detail">
            <span class="summary-detail-item">
              <i class="ri-checkbox-circle-line text-success"></i>
              Aktif: 122.606
            </span>
            <span class="summary-detail-item">
              <i class="ri-close-circle-line text-danger"></i>
              Non Aktif: 15.476
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" md="6" lg="3" class="mb-3">
        <b-card class="summary-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="summary-label">Asset Koperasi</h6>
            <div class="summary-icon summary-icon-orange">
              <i class="ri-money-dollar-circle-line"></i>
            </div>
          </div>
          <div class="mb-2">
            <p class="summary-value-large">Rp. 404,72 T</p>
            <p class="summary-unit">Total Asset : 404.721.999.522.791.808</p>
          </div>
          <div class="summary-detail">
            <span class="summary-detail-item">
              <i class="ri-arrow-up-line text-success"></i>
              +12.5%
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" md="6" lg="3" class="mb-3">
        <b-card class="summary-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="summary-label">Saldo Simpanan</h6>
            <div class="summary-icon summary-icon-purple">
              <i class="ri-wallet-line"></i>
            </div>
          </div>
          <div class="mb-2">
            <p class="summary-value-large">Rp. 1,09 T</p>
            <p class="summary-unit">Total Saldo : 1.097.721.030.073</p>
          </div>
          <div class="summary-detail">
            <span class="summary-detail-item">
              <i class="ri-arrow-up-line text-success"></i>
              +8.3%
            </span>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- Financial Profile Card -->
    <b-row class="mb-4">
      <b-col cols="12">
        <b-card class="financial-card">
          <div class="card-header-custom">
            <h5 class="card-title-custom mb-0">
              <i class="ri-pie-chart-line mr-2"></i>
              Profil Keuangan
            </h5>
          </div>
          <b-row class="mt-4">
            <b-col cols="12" md="6" lg="3" class="mb-3">
              <div class="financial-item">
                <div class="financial-icon financial-icon-primary">
                  <i class="ri-money-dollar-circle-line"></i>
                </div>
                <div class="financial-content">
                  <p class="financial-label">Asset Koperasi</p>
                  <p class="financial-value">Rp. 404,72 T</p>
                  <p class="financial-value-full">Rp. 404.721.999.522.791.808</p>
                </div>
              </div>
            </b-col>
            <b-col cols="12" md="6" lg="3" class="mb-3">
              <div class="financial-item">
                <div class="financial-icon financial-icon-green">
                  <i class="ri-wallet-3-line"></i>
                </div>
                <div class="financial-content">
                  <p class="financial-label">Saldo Simpanan</p>
                  <p class="financial-value">Rp. 1,09 T</p>
                  <p class="financial-value-full">Rp. 1.097.721.030.073</p>
                </div>
              </div>
            </b-col>
            <b-col cols="12" md="6" lg="3" class="mb-3">
              <div class="financial-item">
                <div class="financial-icon financial-icon-orange">
                  <i class="ri-hand-coin-line"></i>
                </div>
                <div class="financial-content">
                  <p class="financial-label">Rilis Pinjaman</p>
                  <p class="financial-value">Rp. 671,52 M</p>
                  <p class="financial-value-full">Rp. 671.528.454.141</p>
                </div>
              </div>
            </b-col>
            <b-col cols="12" md="6" lg="3" class="mb-3">
              <div class="financial-item">
                <div class="financial-icon financial-icon-blue">
                  <i class="ri-pie-chart-2-line"></i>
                </div>
                <div class="financial-content">
                  <p class="financial-label">Sisa Hasil Usaha</p>
                  <p class="financial-value">Rp. 0</p>
                  <p class="financial-value-full">Rp. 0</p>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- Transaction Data Cards Row 2 -->
    <b-row class="mb-4">
      <b-col cols="12" lg="6" class="mb-4">
        <b-card class="transaction-card">
          <div class="card-header-custom">
            <h5 class="card-title-custom mb-0">
              <i class="ri-exchange-line mr-2"></i>
              Data Transaksi
            </h5>
          </div>
          <div class="transaction-list">
            <div class="transaction-item">
              <div class="transaction-icon transaction-icon-primary">
                <i class="ri-wallet-3-line"></i>
              </div>
              <div class="transaction-content">
                <p class="transaction-label">Transaksi Simpanan</p>
                <p class="transaction-value">2.637 Data</p>
              </div>
            </div>
            <div class="transaction-item">
              <div class="transaction-icon transaction-icon-orange">
                <i class="ri-hand-coin-line"></i>
              </div>
              <div class="transaction-content">
                <p class="transaction-label">Transaksi Pinjaman</p>
                <p class="transaction-value">187 Data</p>
              </div>
            </div>
            <div class="transaction-item">
              <div class="transaction-icon transaction-icon-green">
                <i class="ri-store-line"></i>
              </div>
              <div class="transaction-content">
                <p class="transaction-label">Transaksi Toko</p>
                <p class="transaction-value">1.619 Data</p>
              </div>
            </div>
            <div class="transaction-item">
              <div class="transaction-icon transaction-icon-blue">
                <i class="ri-bank-card-line"></i>
              </div>
              <div class="transaction-content">
                <p class="transaction-label">PPOB</p>
                <p class="transaction-value">847 Data</p>
              </div>
            </div>
            <div class="transaction-item">
              <div class="transaction-icon transaction-icon-purple">
                <i class="ri-more-line"></i>
              </div>
              <div class="transaction-content">
                <p class="transaction-label">Lainnya</p>
                <p class="transaction-value">1 Data</p>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6" class="mb-4">
        <b-card class="transaction-card">
          <div class="card-header-custom">
            <h5 class="card-title-custom mb-0">
              <i class="ri-smartphone-line mr-2"></i>
              Transaksi Digital Payment
            </h5>
          </div>
          <div class="transaction-list">
            <div class="transaction-item">
              <div class="transaction-icon transaction-icon-primary">
                <i class="ri-file-list-3-line"></i>
              </div>
              <div class="transaction-content">
                <p class="transaction-label">Jumlah Transaksi</p>
                <p class="transaction-value">20.482 Data</p>
              </div>
            </div>
            <div class="transaction-item highlight-item">
              <div class="transaction-icon transaction-icon-orange">
                <i class="ri-money-cny-circle-line"></i>
              </div>
              <div class="transaction-content">
                <p class="transaction-label">Total Transaksi</p>
                <p class="transaction-value-large">Rp. 29,23 M</p>
                <p class="transaction-value-full">Rp. 29.230.560.816</p>
              </div>
            </div>
            <div class="transaction-item">
              <div class="transaction-icon transaction-icon-green">
                <i class="ri-bank-line"></i>
              </div>
              <div class="transaction-content">
                <p class="transaction-label">BRIVA</p>
                <p class="transaction-value">4.656 Data</p>
              </div>
            </div>
            <div class="transaction-item">
              <div class="transaction-icon transaction-icon-blue">
                <i class="ri-exchange-funds-line"></i>
              </div>
              <div class="transaction-content">
                <p class="transaction-label">Internal Transfer</p>
                <p class="transaction-value">4.611 Data</p>
              </div>
            </div>
            <div class="transaction-item">
              <div class="transaction-icon transaction-icon-purple">
                <i class="ri-global-line"></i>
              </div>
              <div class="transaction-content">
                <p class="transaction-label">External Transfer</p>
                <p class="transaction-value">11.215 Data</p>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- Charts Row -->
    <b-row class="mb-4 align-items-stretch">
      <b-col cols="12" lg="8" class="mb-4 d-flex">
        <b-card class="chart-card w-100">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Transaksi Tahun Ini dan Tahun Lalu</h5>
            <div class="chart-legend">
              <span class="legend-item">
                <span class="legend-color" style="background-color: #10b981;"></span>
                2021
              </span>
              <span class="legend-item">
                <span class="legend-color" style="background-color: #3b82f6;"></span>
                2022
              </span>
              <span class="legend-item">
                <span class="legend-color" style="background-color: #FF720D;"></span>
                2023
              </span>
            </div>
          </div>
          <div id="transaction-bar-chart"></div>
        </b-card>
      </b-col>
      <b-col cols="12" lg="4" class="mb-4 d-flex">
        <b-card class="chart-card w-100">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Perbandingan Total Transaksi</h5>
          </div>
          <div id="transaction-donut-chart"></div>
          <div class="chart-stats mt-4">
            <div class="stat-item">
              <span class="stat-dot" style="background-color: #10b981;"></span>
              <span class="stat-text">2021: 10.6%</span>
            </div>
            <div class="stat-item">
              <span class="stat-dot" style="background-color: #3b82f6;"></span>
              <span class="stat-text">2022: 27.7%</span>
            </div>
            <div class="stat-item">
              <span class="stat-dot" style="background-color: #FF720D;"></span>
              <span class="stat-text">2023: 61.7%</span>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      barChart: null,
      donutChart: null
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    formatRupiah(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    initCharts() {
      this.$nextTick(() => {
        if (window.ApexCharts) {
          this.initBarChart()
          this.initDonutChart()
        }
      })
    },
    initBarChart() {
      const barChartElement = document.querySelector('#transaction-bar-chart')
      if (barChartElement) {
        const self = this
        const options = {
          series: [
            {
              name: '2021',
              data: [250000, 50000, 80000, 5000, 2000]
            },
            {
              name: '2022',
              data: [480000, 140000, 410000, 15000, 5000]
            },
            {
              name: '2023',
              data: [1080000, 240000, 1070000, 25000, 8000]
            }
          ],
          chart: {
            type: 'bar',
            height: 450,
            toolbar: { show: false },
            stacked: false
          },
          colors: ['#10b981', '#3b82f6', '#FF720D'],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              borderRadius: 4
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Simpanan', 'Pinjaman', 'Toko', 'PPOB', 'Lainnya'],
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
              formatter: (val) => {
                return self.formatRupiah(Math.round(val))
              }
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: (val) => {
                return self.formatRupiah(Math.round(val))
              }
            }
          },
          legend: {
            show: false
          },
          grid: {
            borderColor: '#e5e7eb',
            strokeDashArray: 4
          }
        }

        this.barChart = new window.ApexCharts(barChartElement, options)
        this.barChart.render()
      }
    },
    initDonutChart() {
      const donutChartElement = document.querySelector('#transaction-donut-chart')
      if (donutChartElement) {
        const self = this
        // Data transaksi dalam rupiah (sesuai gambar)
        const transactionData = {
          2021: 411058,
          2022: 1073738,
          2023: 2396972
        }
        
        const total = transactionData[2021] + transactionData[2022] + transactionData[2023]
        const percentages = [
          (transactionData[2021] / total * 100).toFixed(1),
          (transactionData[2022] / total * 100).toFixed(1),
          (transactionData[2023] / total * 100).toFixed(1)
        ]

        const options = {
          series: [transactionData[2021], transactionData[2022], transactionData[2023]],
          chart: {
            type: 'donut',
            height: 350
          },
          labels: ['2021', '2022', '2023'],
          colors: ['#10b981', '#3b82f6', '#FF720D'],
          plotOptions: {
            pie: {
              donut: {
                size: '70%',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: 'Total',
                    formatter: () => {
                      return 'Rp. ' + self.formatRupiah(total)
                    }
                  }
                }
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => val.toFixed(1) + '%'
          },
          legend: {
            show: false
          },
          tooltip: {
            enabled: true,
            y: {
              formatter: (val, { seriesIndex }) => {
                const year = ['2021', '2022', '2023'][seriesIndex]
                const value = transactionData[year]
                const percentage = percentages[seriesIndex]
                return 'Rp. ' + self.formatRupiah(value) + ' (' + percentage + '%)'
              }
            }
          }
        }

        this.donutChart = new window.ApexCharts(donutChartElement, options)
        this.donutChart.render()
      }
    }
  },
  beforeDestroy() {
    if (this.barChart) {
      this.barChart.destroy()
    }
    if (this.donutChart) {
      this.donutChart.destroy()
    }
  }
}
</script>

<style scoped>
/* Styles moved to custom.css */
</style>
