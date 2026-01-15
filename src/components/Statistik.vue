<template>
  <div>
    <!-- Page Header -->
    <div class="page-header mt-4 mb-4">
      <h1 class="page-title">Statistik</h1>
      <p class="page-subtitle">Statistik dan analisis data transaksi koperasi</p>
    </div>

    <!-- Map Card -->
    <b-card class="map-card mb-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">
          <i class="ri-map-pin-line mr-2"></i>
          Data Koperasi Berdasarkan Wilayah
        </h5>
      </div>
      <!-- Search Box -->
      <div class="map-search-wrapper mb-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="ri-search-line"></i>
            </span>
          </div>
          <input
            type="text"
            class="form-control map-search-input"
            v-model="mapSearchQuery"
            @input="onMapSearch"
            @keyup.enter="performMapSearch"
            placeholder="Cari provinsi atau kota..."
            list="map-search-suggestions"
          />
          <datalist id="map-search-suggestions">
            <option v-for="(suggestion, index) in mapSearchSuggestions" :key="index" :value="suggestion" />
          </datalist>
          <div class="input-group-append" v-if="mapSearchQuery">
            <button class="btn btn-outline-secondary" type="button" @click="clearMapSearch">
              <i class="ri-close-line"></i>
            </button>
          </div>
        </div>
      </div>
      <div id="indonesia-map" class="map-container"></div>
    </b-card>

    <!-- Tabs -->
    <b-card class="statistik-tabs-card mb-4">
      <b-tabs v-model="activeTab" class="statistik-tabs">
        <b-tab title="Dashboard" active>
          <div class="tab-content mt-4">
            <!-- Transaksi Tahunan Chart -->
            <b-card class="chart-card mb-4">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="card-title mb-0">Transaksi Tahunan</h5>
              </div>
              <div id="transaksi-tahunan-chart"></div>
                 <!-- Action Buttons -->
              <div class="d-flex gap-3 mb-4">
                <button 
                  class="btn btn-action" 
                  :class="{ 'btn-action-active': showDataDetail }"
                  @click="toggleDataDetail"
                >
                  <i class="ri-table-line mr-2"></i>
                  data detail
                </button>
                <button class="btn btn-action">
                  <i class="ri-download-cloud-line mr-1"></i>
                  backup data
                </button>
              </div>
            </b-card>


            <!-- Data Detail Table -->
            <b-card v-show="showDataDetail" class="data-detail-card mb-4">
              <div class="table-responsive">
                <table class="table data-detail-table">
                  <tbody>
                    <tr v-for="(item, index) in dataDetail" :key="index">
                      <td class="font-weight-bold">{{ item.year }}</td>
                      <td>{{ item.total }} (rata-rata: {{ item.avgMonth }}/bulan, {{ item.avgWeek }}/minggu, {{ item.avgDay }}/hari)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-card>

            <!-- Data Koperasi and Data Transaksi Row -->
            <b-row class="mb-4">
              <b-col cols="12" lg="6" class="mb-4">
                <b-card class="chart-card">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="card-title mb-0">Data Koperasi</h5>
                    <div class="d-flex gap-2">
                      <button 
                        class="btn btn-sm btn-action" 
                        :class="{ 'btn-action-active': showDataKoperasiDetail }"
                        @click="toggleDataKoperasiDetail"
                      >
                        <i class="ri-table-line mr-1"></i>
                        data detail
                      </button>
                      <button class="btn btn-sm btn-action">
                        <i class="ri-download-cloud-line mr-1"></i>
                        backup data
                      </button>
                    </div>
                  </div>
                  <div id="data-koperasi-chart"></div>
                  <!-- Data Detail Table -->
                  <div v-show="showDataKoperasiDetail" class="mt-4">
                    <table class="table table-sm data-koperasi-table">
                      <tbody>
                        <tr>
                          <td class="font-weight-bold">Active</td>
                          <td>7.1%</td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">Inactive</td>
                          <td>92.9%</td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">Last Login</td>
                          <td>{{ dataKoperasiDetail.lastLogin }}</td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">Jumlah Anggota</td>
                          <td>{{ formatNumber(dataKoperasiDetail.jumlahAnggota) }}</td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">Jumlah Asset</td>
                          <td>Rp. {{ formatNumber(dataKoperasiDetail.jumlahAsset) }}</td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">Saldo Tabungan</td>
                          <td>Rp. {{ formatNumber(dataKoperasiDetail.saldoTabungan) }}</td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">Total Pemberian Pinjaman</td>
                          <td>Rp. {{ formatNumber(dataKoperasiDetail.totalPinjaman) }}</td>
                        </tr>
                        <tr>
                          <td class="font-weight-bold">SHU</td>
                          <td>Rp. {{ formatNumber(dataKoperasiDetail.shu) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card>
              </b-col>
              <b-col cols="12" lg="6" class="mb-4">
                <b-card class="chart-card">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="card-title mb-0">Data Transaksi</h5>
                    <div class="d-flex gap-2">
                      <button 
                        class="btn btn-sm btn-action" 
                        :class="{ 'btn-action-active': showDataTransaksiDetail }"
                        @click="toggleDataTransaksiDetail"
                      >
                        <i class="ri-table-line mr-1"></i>
                        data detail
                      </button>
                      <button class="btn btn-sm btn-action">
                        <i class="ri-download-cloud-line mr-1"></i>
                        backup data
                      </button>
                    </div>
                  </div>
                  <div id="data-transaksi-chart"></div>
                  <!-- Data Detail Table -->
                  <div v-show="showDataTransaksiDetail" class="mt-4">
                    <!-- Filter Tahun -->
                    <div class="mb-3">
                      <label class="form-label small text-muted mb-2">Filter Tahun</label>
                      <select 
                        id="filter-tahun-transaksi" 
                        class="form-control form-control-sm"
                        v-model="selectedYearTransaksi"
                        @change="onYearChange"
                      >
                        <option value="">--semua--</option>
                        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                      </select>
                    </div>
                    <table class="table table-sm data-transaksi-table">
                      <tbody>
                        <tr v-for="(item, index) in filteredTransaksiDetail" :key="index">
                          <td class="font-weight-bold">{{ item.label }}</td>
                          <td>{{ item.value }} (kali)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card>
              </b-col>
            </b-row>

            <!-- Koperasi Charts Row -->
            <b-row class="mb-4">
              <b-col cols="12" lg="6" class="mb-4">
                <b-card class="chart-card">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="card-title mb-0">Koperasi Berdasarkan Sektor Usaha</h5>
                  </div>
                  <div id="koperasi-sektor-chart"></div>
                  <div class="d-flex mt-2 gap-2">
                      <button 
                        class="btn btn-sm btn-action mr-2" 
                        :class="{ 'btn-action-active': showDataSektorDetail }"
                        @click="toggleDataSektorDetail"
                      >
                        <i class="ri-table-line mr-1"></i>
                        data detail
                      </button>
                      <button class="btn btn-sm btn-action">
                        <i class="ri-download-cloud-line mr-1"></i>
                        backup data
                      </button>
                    </div>
                  <!-- Data Detail Table -->
                  <div v-show="showDataSektorDetail" class="mt-4">
                    <table class="table table-sm data-sektor-table">
                      <tbody>
                        <tr v-for="(item, index) in sektorUsahaDetail" :key="index">
                          <td class="font-weight-bold">{{ item.label }}</td>
                          <td>{{ item.percentage }}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card>
              </b-col>
              <b-col cols="12" lg="6" class="mb-4">
                <b-card class="chart-card">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="card-title mb-0">Koperasi Berdasarkan Bentuk Koperasi</h5>
                  </div>
                  <div id="koperasi-bentuk-chart"></div>
                  <div class="d-flex mt-2 gap-2">
                      <button 
                        class="btn btn-sm btn-action mr-2" 
                        :class="{ 'btn-action-active': showDataBentukDetail }"
                        @click="toggleDataBentukDetail"
                      >
                        <i class="ri-table-line mr-1"></i>
                        data detail
                      </button>
                      <button class="btn btn-sm btn-action">
                        <i class="ri-download-cloud-line mr-1"></i>
                        backup data
                      </button>
                    </div>
                  <!-- Data Detail Table -->
                  <div v-show="showDataBentukDetail" class="mt-4">
                    <table class="table table-sm data-bentuk-table">
                      <tbody>
                        <tr v-for="(item, index) in bentukKoperasiDetail" :key="index">
                          <td class="font-weight-bold">{{ item.label }}</td>
                          <td>{{ item.percentage }}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card>
              </b-col>
            </b-row>

            <!-- Koperasi Jenis & Kelompok Charts Row -->
            <b-row class="mb-4">
              <b-col cols="12" lg="6" class="mb-4">
                <b-card class="chart-card">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="card-title mb-0">Koperasi Berdasarkan Jenis Koperasi</h5>
                  </div>
                  <div id="koperasi-jenis-chart"></div>
                  <div class="d-flex mt-2 gap-2">
                    <button 
                      class="btn btn-sm btn-action mr-2" 
                      :class="{ 'btn-action-active': showDataJenisDetail }"
                      @click="toggleDataJenisDetail"
                    >
                      <i class="ri-table-line mr-1"></i>
                      data detail
                    </button>
                    <button class="btn btn-sm btn-action">
                      <i class="ri-download-cloud-line mr-1"></i>
                      backup data
                    </button>
                  </div>
                  <!-- Data Detail Table -->
                  <div v-show="showDataJenisDetail" class="mt-4">
                    <table class="table table-sm data-jenis-table">
                      <tbody>
                        <tr v-for="(item, index) in jenisKoperasiDetail" :key="index">
                          <td class="font-weight-bold">{{ item.label }}</td>
                          <td>{{ item.percentage }}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card>
              </b-col>
              <b-col cols="12" lg="6" class="mb-4">
                <b-card class="chart-card">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="card-title mb-0">Koperasi Berdasarkan Kelompok Koperasi</h5>
                  </div>
                  <div id="koperasi-kelompok-chart"></div>
                  <div class="d-flex mt-2 gap-2">
                    <button 
                      class="btn btn-sm btn-action mr-2" 
                      :class="{ 'btn-action-active': showDataKelompokDetail }"
                      @click="toggleDataKelompokDetail"
                    >
                      <i class="ri-table-line mr-1"></i>
                      data detail
                    </button>
                    <button class="btn btn-sm btn-action">
                      <i class="ri-download-cloud-line mr-1"></i>
                      backup data
                    </button>
                  </div>
                  <!-- Data Detail Table -->
                  <div v-show="showDataKelompokDetail" class="mt-4">
                    <table class="table table-sm data-kelompok-table">
                      <tbody>
                        <tr v-for="(item, index) in kelompokKoperasiDetail" :key="index">
                          <td class="font-weight-bold">{{ item.label }}</td>
                          <td>{{ item.percentage }}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card>
              </b-col>
            </b-row>

              <!-- Additional Charts Row -->
              <b-row class="mb-4">
              <b-col cols="12" lg="12" class="mb-4">
                <b-card class="chart-card">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="card-title mb-0">Data Aktivasi</h5>
                    <div class="d-flex gap-3">
                      <button 
                        class="btn btn-sm btn-action" 
                        :class="{ 'btn-action-active': showDataAktivasiDetail }"
                        @click="toggleDataAktivasiDetail"
                      >
                        <i class="ri-table-line mr-2"></i>
                        data detail
                      </button>
                      <button class="btn btn-sm btn-action">
                        <i class="ri-download-cloud-line mr-1"></i>
                        backup data
                      </button>
                    </div>
                  </div>
                  <div id="aktivasi-chart"></div>
                  <!-- Data Detail Table -->
                  <div v-show="showDataAktivasiDetail" class="mt-4">
                    <table class="table table-sm data-aktivasi-table">
                      <tbody>
                        <tr v-for="(item, index) in aktivasiDetail" :key="index">
                          <td class="font-weight-bold">{{ item.year }}</td>
                          <td>{{ item.value }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card>
              </b-col>
              <!-- <b-col cols="12" lg="4" class="mb-4">
                <b-card class="chart-card">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="card-title mb-0">Distribusi Transaksi</h5>
                  </div>
                  <div id="distribusi-transaksi-chart"></div>
                </b-card>
              </b-col> -->
            </b-row>

            <!-- Summary Stats Cards -->
            <!-- <b-row class="mb-4">
              <b-col cols="12" md="6" lg="3" class="mb-3">
                <b-card class="statistik-summary-card">
                  <div class="d-flex align-items-center">
                    <div class="statistik-icon statistik-icon-primary mr-3">
                      <i class="ri-line-chart-line"></i>
                    </div>
                    <div>
                      <p class="statistik-label mb-1">Total Transaksi</p>
                      <p class="statistik-value mb-0">{{ formatNumber(totalTransactions) }}</p>
                    </div>
                  </div>
                </b-card>
              </b-col>
              <b-col cols="12" md="6" lg="3" class="mb-3">
                <b-card class="statistik-summary-card">
                  <div class="d-flex align-items-center">
                    <div class="statistik-icon statistik-icon-success mr-3">
                      <i class="ri-arrow-up-line"></i>
                    </div>
                    <div>
                      <p class="statistik-label mb-1">Rata-rata per Tahun</p>
                      <p class="statistik-value mb-0">{{ formatNumber(averagePerYear) }}</p>
                    </div>
                  </div>
                </b-card>
              </b-col>
              <b-col cols="12" md="6" lg="3" class="mb-3">
                <b-card class="statistik-summary-card">
                  <div class="d-flex align-items-center">
                    <div class="statistik-icon statistik-icon-warning mr-3">
                      <i class="ri-trophy-line"></i>
                    </div>
                    <div>
                      <p class="statistik-label mb-1">Tahun Tertinggi</p>
                      <p class="statistik-value mb-0">{{ highestYear.year }}</p>
                      <p class="statistik-subvalue mb-0">{{ formatNumber(highestYear.value) }}</p>
                    </div>
                  </div>
                </b-card>
              </b-col>
              <b-col cols="12" md="6" lg="3" class="mb-3">
                <b-card class="statistik-summary-card">
                  <div class="d-flex align-items-center">
                    <div class="statistik-icon statistik-icon-info mr-3">
                      <i class="ri-calendar-line"></i>
                    </div>
                    <div>
                      <p class="statistik-label mb-1">Periode Data</p>
                      <p class="statistik-value mb-0">2017 - 2026</p>
                    </div>
                  </div>
                </b-card>
              </b-col>
            </b-row> -->

            <!-- Data Table Card -->
            <!-- <b-card class="data-table-card">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="card-title mb-0">Data Transaksi per Tahun</h5>
                <div class="table-actions">
                  <button class="btn btn-sm btn-outline-secondary">
                    <i class="ri-download-line mr-2"></i>
                    Export
                  </button>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table statistik-data-table">
                  <thead>
                    <tr>
                      <th>Tahun</th>
                      <th>Total Transaksi</th>
                      <th>Rata-rata per Bulan</th>
                      <th>Rata-rata per Minggu</th>
                      <th>Rata-rata per Hari</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in sortedDataDetail" :key="index">
                      <td class="font-weight-bold">{{ item.year }}</td>
                      <td>{{ item.total }}</td>
                      <td>{{ item.avgMonth }}</td>
                      <td>{{ item.avgWeek }}</td>
                      <td>{{ item.avgDay }}</td>
                      <td>
                        <span v-if="index > 0 && getTrend(index)" :class="getTrendClass(index)">
                          <i :class="getTrendIcon(index)"></i>
                          {{ getTrendPercent(index) }}%
                        </span>
                        <span v-else class="text-muted">-</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-card> -->
          </div>
        </b-tab>
        <b-tab title="Digital Payment">
          <div class="tab-content mt-4">
            <p class="text-muted">Digital Payment tab - Coming soon</p>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Statistik',
  data() {
    return {
      activeTab: 0,
      showDataDetail: false,
      showDataKoperasiDetail: false,
      showDataTransaksiDetail: false,
      showDataAktivasiDetail: false,
      showDataSektorDetail: false,
      showDataBentukDetail: false,
      showDataJenisDetail: false,
      showDataKelompokDetail: false,
      selectedYearTransaksi: '',
      availableYears: [],
      barChart: null,
      aktivitasChart: null,
      aktivasiChart: null,
      distribusiChart: null,
      dataKoperasiChart: null,
      dataTransaksiChart: null,
      sektorUsahaChart: null,
      bentukKoperasiChart: null,
      jenisKoperasiChart: null,
      kelompokKoperasiChart: null,
      map: null,
      mapMarkers: [],
      mapSearchQuery: '',
      mapSearchSuggestions: [],
      mapSearchResults: [],
      mapSearchHighlight: null,
      wilayahData: {
        'Belum diset': { count: 9, cities: { 'Belum diset': 9 } },
        'Sumatra Barat': { count: 1, cities: { 'KOTA SOLOK': 1 } },
        'Riau': { count: 3, cities: { 'KABUPATEN ROKAN HULU': 1, 'KOTA PEKANBARU': 1, 'KOTA DUMAI': 1 } },
        'Sumatra Selatan': { count: 1, cities: { 'KOTA PALEMBANG': 1 } },
        'Kep. Riau': { count: 2, cities: { 'KOTA BATAM': 2 } },
        'DKI Jakarta': { count: 35, cities: { 'KOTA JAKARTA PUSAT': 9, 'KOTA JAKARTA UTARA': 5, 'KOTA JAKARTA BARAT': 1, 'KOTA JAKARTA SELATAN': 13, 'KOTA JAKARTA TIMUR': 7 } },
        'Jawa Barat': { count: 52, cities: { 'KABUPATEN BOGOR': 4, 'KABUPATEN SUKABUMI': 5, 'KABUPATEN CIANJUR': 1, 'KABUPATEN BANDUNG': 1, 'KABUPATEN TASIKMALAYA': 1, 'KABUPATEN CIREBON': 1, 'KABUPATEN INDRAMAYU': 1, 'KABUPATEN SUBANG': 3, 'KABUPATEN PURWAKARTA': 4, 'KABUPATEN KARAWANG': 4, 'KABUPATEN BEKASI': 11, 'KOTA BOGOR': 2, 'KOTA SUKABUMI': 1, 'KOTA BANDUNG': 8, 'KOTA BEKASI': 4, 'KOTA CIMAHI': 1 } },
        'Jawa Tengah': { count: 5, cities: { 'KABUPATEN CILACAP': 2, 'KABUPATEN BANJARNEGARA': 1, 'KABUPATEN MAGELANG': 1, 'KOTA SALATIGA': 1 } },
        'DI Yogyakarta': { count: 2, cities: { 'KABUPATEN SLEMAN': 1, 'KOTA YOGYAKARTA': 1 } },
        'Jawa Timur': { count: 9, cities: { 'KABUPATEN KEDIRI': 1, 'KABUPATEN MALANG': 1, 'KABUPATEN SIDOARJO': 1, 'KOTA MALANG': 1, 'KOTA MOJOKERTO': 1, 'KOTA SURABAYA': 4 } },
        'Banten': { count: 8, cities: { 'KABUPATEN TANGGERANG': 1, 'KOTA TANGGERANG': 5, 'KOTA CILEGON': 2 } },
        'Bali': { count: 2, cities: { 'KABUPATEN JEMBRANA': 1, 'KOTA DENPASAR': 1 } },
        'Nusa Tenggara Barat': { count: 1, cities: { 'KOTA MATARAM': 1 } },
        'Nusa Tenggara Timur': { count: 1, cities: { 'KOTA KUPANG': 1 } },
        'Kalimantan Barat': { count: 1, cities: { 'KOTA PONTIANAK': 1 } },
        'Kalimantan Tengah': { count: 1, cities: { 'KOTA PALANGKARAYA': 1 } },
        'Kalimantan Selatan': { count: 3, cities: { 'KABUPATEN TANAH LAUT': 1, 'KABUPATEN TABALONG': 1, 'KOTA BANJARMASIN': 1 } },
        'Kalimantan Timur': { count: 7, cities: { 'KABUPATEN PASIR': 1, 'KABUPATEN KUTAI BARAT': 1, 'KOTA BALIKPAPAN': 1, 'KOTA BONTANG': 4 } },
        'Sulawesi Tenggara': { count: 1, cities: { 'KOTA KENDARI': 1 } },
        'Gorontalo': { count: 1, cities: { 'KABUPATEN BONE BOLANGO': 1 } },
        'Maluku': { count: 1, cities: { 'KABUPATEN SERAM BAGIAN TIMUR': 1 } }
      },
      provinsiCoordinates: {
        'Belum diset': [0, 110],
        'Sumatra Barat': [-0.95, 100.35],
        'Riau': [0.5, 101.45],
        'Sumatra Selatan': [-2.99, 104.75],
        'Kep. Riau': [0.92, 104.45],
        'DKI Jakarta': [-6.2, 106.82],
        'Jawa Barat': [-6.9, 107.6],
        'Jawa Tengah': [-7.0, 110.0],
        'DI Yogyakarta': [-7.8, 110.4],
        'Jawa Timur': [-7.25, 112.75],
        'Banten': [-6.12, 106.15],
        'Bali': [-8.65, 115.22],
        'Nusa Tenggara Barat': [-8.65, 116.52],
        'Nusa Tenggara Timur': [-10.17, 123.58],
        'Kalimantan Barat': [0.0, 109.32],
        'Kalimantan Tengah': [-2.21, 113.92],
        'Kalimantan Selatan': [-3.31, 114.59],
        'Kalimantan Timur': [0.5, 117.15],
        'Sulawesi Tenggara': [-3.97, 122.59],
        'Gorontalo': [0.54, 123.06],
        'Maluku': [-3.24, 128.68]
      },
      transactionData: {
        2017: 1970,
        2018: 7550,
        2019: 37275,
        2020: 147587,
        2021: 232700,
        2022: 667236,
        2023: 1543923,
        2024: 2310118,
        2025: 3069342,
        2026: 94809
      },
      aktivitasData: {
        '2017-2018': 23,
        '2019-2020': 215,
        '2021-2022': 102,
        '2023-2024': 75
      },
      aktivasiDetail: [
        { year: '2024', value: 28 },
        { year: '2023', value: 47 },
        { year: '2022', value: 79 },
        { year: '2021', value: 23 },
        { year: '2020', value: 18 },
        { year: '2019', value: 215 },
        { year: '2018', value: 16 },
        { year: '2017', value: 7 }
      ],
      sektorUsahaDetail: [
        { label: 'Pertanian, Peternakan, Kehutanan & Perikanan', percentage: '52.1' },
        { label: 'Perdagangan, Hotel, dan Restoran', percentage: '43.2' },
        { label: 'Pertambangan dan Penggalian', percentage: '0.8' },
        { label: 'Industri Pengolahan', percentage: '1.2' },
        { label: 'Listrik, Gas dan Air Bersih', percentage: '0.3' },
        { label: 'Bangunan', percentage: '0.5' },
        { label: 'Pengangkutan dan Komunikasi', percentage: '0.4' },
        { label: 'Keuangan, Persewaan, dan Jasa Perusahaan', percentage: '0.9' },
        { label: 'Jasa - Jasa Swasta', percentage: '0.6' }
      ],
      bentukKoperasiDetail: [
        { label: 'Primer Kab atau Kota', percentage: '81.2' },
        { label: 'Sekunder Provinsi', percentage: '8.8' },
        { label: 'Sekunder Kab atau Kota', percentage: '7.9' },
        { label: 'Primer Nasional', percentage: '0.5' },
        { label: 'Primer Provinsi', percentage: '0.8' },
        { label: 'Sekunder Nasional', percentage: '0.8' }
      ],
      jenisKoperasiDetail: [
        { label: 'Konsumen', percentage: '34.4' },
        { label: 'Produsen', percentage: '31.3' },
        { label: 'Jasa', percentage: '29.4' },
        { label: 'Pemasaran', percentage: '2.5' },
        { label: 'Simpan Pinjam', percentage: '2.4' }
      ],
      kelompokKoperasiDetail: [
        { label: 'Koperasi Unit Desa', percentage: '41.8' },
        { label: 'Koperasi Pertanian', percentage: '23.0' },
        { label: 'Koperasi Perkebunan', percentage: '19.5' },
        { label: 'Koperasi Peternakan', percentage: '3.8' },
        { label: 'Koperasi Nelayan', percentage: '3.1' },
        { label: 'Koperasi Kehutanan', percentage: '2.1' },
        { label: 'Kopti', percentage: '1.5' },
        { label: 'Kopra', percentage: '1.2' },
        { label: 'Kopinkra', percentage: '0.9' },
        { label: 'Koppontren', percentage: '0.7' },
        { label: 'Kopkar', percentage: '0.6' },
        { label: 'Koperasi Angkatan Darat', percentage: '0.5' },
        { label: 'Koperasi Angkatan Laut', percentage: '0.4' },
        { label: 'Koperasi Angkatan Udara', percentage: '0.3' },
        { label: 'Koperasi Kepolisian', percentage: '0.2' },
        { label: 'Koperasi Serba Usaha', percentage: '0.2' },
        { label: 'Koperasi Pasar', percentage: '0.1' },
        { label: 'Koperasi Simpan Pinjam', percentage: '0.1' },
        { label: 'Koperasi Angkutan Darat', percentage: '0.1' },
        { label: 'Koperasi Angkutan Laut', percentage: '0.1' },
        { label: 'Koperasi Angkutan Udara', percentage: '0.1' },
        { label: 'Koperasi Angkutan Sungai', percentage: '0.1' },
        { label: 'Koperasi Angkutan Penyebrangan', percentage: '0.1' },
        { label: 'Koperasi Wisata', percentage: '0.1' },
        { label: 'Koperasi Telkom', percentage: '0.1' },
        { label: 'Koperasi Perumahan', percentage: '0.1' },
        { label: 'Koperasi BPR', percentage: '0.1' },
        { label: 'Koperasi Pegawai Negeri', percentage: '0.1' },
        { label: 'Koperasi Listrik Pedesaan', percentage: '0.1' },
        { label: 'Koperasi Asuransi Indonesia', percentage: '0.1' },
        { label: 'Koperasi Wanita', percentage: '0.1' },
        { label: 'Koperasi Profesi', percentage: '0.1' },
        { label: 'Koperasi Veteran', percentage: '0.1' },
        { label: 'Koperasi Wredatama', percentage: '0.1' },
        { label: 'Koperasi Pepabri', percentage: '0.1' },
        { label: 'Koperasi Mahasiswa', percentage: '0.1' },
        { label: 'Koperasi Pemuda', percentage: '0.1' },
        { label: 'Koperasi Pertambangan', percentage: '0.1' },
        { label: 'Koperasi Jamu Gendong', percentage: '0.1' },
        { label: 'KJKS/KBMT', percentage: '0.1' },
        { label: 'Koperasi Sekunder', percentage: '0.1' },
        { label: 'Koperasi PKL', percentage: '0.1' },
        { label: 'Koperasi Desa Merah Putih', percentage: '0.1' },
        { label: 'Koperasi Lainnya', percentage: '0.1' }
      ],
      transaksiDetail: [
        { label: 'Simpanan', value: '2.637', year: null },
        { label: 'Pembayaran Pinjaman', value: '187', year: null },
        { label: 'Penjualan Toko', value: '1.619', year: null },
        { label: 'PPOB', value: '847', year: null },
        { label: 'Lainnya', value: '1', year: null }
      ],
      transaksiDetailByYear: {},
      dataKoperasiDetail: {
        lastLogin: 82,
        jumlahAnggota: 74504,
        jumlahAsset: 39051553289843,
        saldoTabungan: 5348470433474,
        totalPinjaman: 36899584855941,
        shu: 0
      },
      dataDetail: [
        {
          year: '2025',
          total: '3.069.342',
          avgMonth: '255.778',
          avgWeek: '58.864',
          avgDay: '8.409'
        },
        {
          year: '2024',
          total: '2.310.118',
          avgMonth: '192.509',
          avgWeek: '44.303',
          avgDay: '6.329'
        },
        {
          year: '2023',
          total: '1.543.923',
          avgMonth: '128.660',
          avgWeek: '29.609',
          avgDay: '4.229'
        },
        {
          year: '2022',
          total: '667.236',
          avgMonth: '55.603',
          avgWeek: '12.796',
          avgDay: '1.828'
        },
        {
          year: '2021',
          total: '232.700',
          avgMonth: '19.391',
          avgWeek: '4.462',
          avgDay: '637'
        },
        {
          year: '2020',
          total: '147.587',
          avgMonth: '12.298',
          avgWeek: '2.830',
          avgDay: '404'
        },
        {
          year: '2019',
          total: '37.275',
          avgMonth: '3.106',
          avgWeek: '714',
          avgDay: '102'
        },
        {
          year: '2018',
          total: '7.550',
          avgMonth: '629',
          avgWeek: '144',
          avgDay: '20'
        },
        {
          year: '2017',
          total: '1.970',
          avgMonth: '164',
          avgWeek: '37',
          avgDay: '5'
        },
        {
          year: '(16 Januari) 2026',
          total: '94.809',
          avgMonth: '7.900',
          avgWeek: '1.818',
          avgDay: '259'
        }
      ]
    }
  },
  computed: {
    allWilayahOptions() {
      const options = []
      Object.keys(this.wilayahData).forEach(provinsi => {
        options.push(provinsi)
        Object.keys(this.wilayahData[provinsi].cities).forEach(city => {
          if (city !== provinsi) {
            options.push(`${city}, ${provinsi}`)
          }
        })
      })
      return options.sort()
    },
    filteredTransaksiDetail() {
      if (!this.selectedYearTransaksi) {
        return this.transaksiDetail
      }
      return this.transaksiDetailByYear[this.selectedYearTransaksi] || this.transaksiDetail
    },
    totalTransactions() {
      return Object.values(this.transactionData).reduce((sum, val) => sum + val, 0)
    },
    averagePerYear() {
      const years = Object.keys(this.transactionData).filter(y => y !== '2026')
      return Math.round(this.totalTransactions / years.length)
    },
    highestYear() {
      let maxYear = ''
      let maxValue = 0
      Object.keys(this.transactionData).forEach(year => {
        if (this.transactionData[year] > maxValue && year !== '2026') {
          maxValue = this.transactionData[year]
          maxYear = year
        }
      })
      return { year: maxYear, value: maxValue }
    },
    sortedDataDetail() {
      return [...this.dataDetail].sort((a, b) => {
        const yearA = parseInt(a.year.replace(/[^0-9]/g, '')) || 0
        const yearB = parseInt(b.year.replace(/[^0-9]/g, '')) || 0
        return yearB - yearA
      })
    }
  },
  mounted() {
    this.initChart()
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods: {
    initChart() {
      this.initAvailableYears()
      this.initTransaksiDetailByYear()
      this.$nextTick(() => {
        if (window.ApexCharts) {
          this.initBarChart()
          this.initAktivasiChart()
          // this.initDistribusiChart()
          this.initDataKoperasiChart()
          this.initDataTransaksiChart()
          this.initSektorUsahaChart()
          this.initBentukKoperasiChart()
          this.initJenisKoperasiChart()
          this.initKelompokKoperasiChart()
        }
      })
    },
    initBarChart() {
      const chartElement = document.querySelector('#transaksi-tahunan-chart')
      if (chartElement) {
        const self = this
        const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '(16 Januari) 2026']
        const values = years.map(year => {
          if (year === '(16 Januari) 2026') {
            return self.transactionData[2026]
          }
          return self.transactionData[parseInt(year)]
        })

        // Color mapping based on year pattern
        const colors = years.map((year, index) => {
          const yearNum = year === '(16 Januari) 2026' ? 2026 : parseInt(year)
          if ([2017, 2021, 2025].includes(yearNum)) return '#10b981' // Green
          if ([2018, 2022, 2024, 2026].includes(yearNum)) return '#3b82f6' // Blue
          if ([2019, 2023].includes(yearNum)) return '#FF720D' // Orange
          if ([2020].includes(yearNum)) return '#06b6d4' // Light Blue
          return '#6b7280'
        })

        const options = {
          series: [{
            name: 'Transaksi',
            data: values
          }],
          chart: {
            type: 'bar',
            height: 400,
            toolbar: { show: false }
          },
          colors: colors,
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
              borderRadius: 4,
              dataLabels: {
                position: 'top'
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => {
              return self.formatNumber(val) + ' (kali)'
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ['#1f2937']
            }
          },
          xaxis: {
            categories: years,
            labels: {
              style: {
                colors: '#6b7280',
                fontSize: '12px'
              },
              rotate: -45,
              rotateAlways: false
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#6b7280',
                fontSize: '12px'
              },
              formatter: (val) => {
                return self.formatNumber(val)
              }
            }
          },
          grid: {
            borderColor: '#e5e7eb',
            strokeDashArray: 4
          },
          tooltip: {
            y: {
              formatter: (val) => {
                return self.formatNumber(val) + ' (kali)'
              }
            }
          }
        }

        this.barChart = new window.ApexCharts(chartElement, options)
        this.barChart.render()
      }
    },
    formatNumber(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    initMap() {
      // Check if Leaflet is already loaded
      if (typeof window.L !== 'undefined') {
        this.renderMap()
        return
      }

      // Check if CSS is already loaded
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      // Check if script is already loaded
      if (!document.querySelector('script[src*="leaflet.js"]')) {
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.onload = () => {
          this.renderMap()
        }
        script.onerror = () => {
          console.error('Failed to load Leaflet library')
        }
        document.head.appendChild(script)
      } else {
        // Script already exists, wait a bit and try to render
        setTimeout(() => {
          if (typeof window.L !== 'undefined') {
            this.renderMap()
          }
        }, 100)
      }
    },
    renderMap() {
      const mapElement = document.getElementById('indonesia-map')
      if (!mapElement) {
        console.warn('Map element not found')
        return
      }

      if (typeof window.L === 'undefined') {
        console.warn('Leaflet library not loaded yet')
        setTimeout(() => this.renderMap(), 200)
        return
      }

      // Destroy existing map if any
      if (this.map) {
        this.map.remove()
        this.map = null
      }

      const isDark = document.body.classList.contains('dark-mode')
      
      // Initialize map centered on Indonesia
      this.map = window.L.map('indonesia-map', {
        center: [-2.5, 118],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true,
        minZoom: 4,
        maxBounds: [[-11, 95], [7, 141]] // Bounds untuk Indonesia
      })

      // Use OpenStreetMap tiles with dark mode support
      const tileUrl = isDark 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      
      const attribution = isDark
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

      window.L.tileLayer(tileUrl, {
        attribution: attribution,
        maxZoom: 19,
        subdomains: 'abc'
      }).addTo(this.map)

      // Add markers for each province
      Object.keys(this.wilayahData).forEach(provinsi => {
        const data = this.wilayahData[provinsi]
        const coords = this.provinsiCoordinates[provinsi]
        
        if (coords && data.count > 0) {
          // Create popup content
          let popupContent = `<div class="map-popup"><strong>${provinsi}</strong><br/>Total: ${data.count} Koperasi<br/><br/>`
          
          // Add city details
          const cityEntries = Object.entries(data.cities).filter(([city, count]) => city !== provinsi)
          if (cityEntries.length > 0) {
            popupContent += '<strong>Detail:</strong><br/>'
            cityEntries.forEach(([city, count]) => {
              popupContent += `${city}: ${count}<br/>`
            })
          }
          popupContent += '</div>'

          // Determine marker color based on count
          let markerColor = '#3388ff'
          if (data.count >= 30) markerColor = '#ef4444'
          else if (data.count >= 10) markerColor = '#f59e0b'
          else if (data.count >= 5) markerColor = '#10b981'

          // Create custom icon with better visibility
          const iconSize = data.count >= 30 ? 40 : data.count >= 10 ? 35 : 30
          const fontSize = data.count >= 30 ? 14 : data.count >= 10 ? 13 : 12
          const icon = window.L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${markerColor}; color: white; border-radius: 50%; width: ${iconSize}px; height: ${iconSize}px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: ${fontSize}px; border: 3px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.4); cursor: pointer;">${data.count}</div>`,
            iconSize: [iconSize, iconSize],
            iconAnchor: [iconSize / 2, iconSize / 2]
          })

          const marker = window.L.marker(coords, { icon: icon })
            .addTo(this.map)
            .bindPopup(popupContent)
          
          // Store marker with province name for search
          marker.provinsiName = provinsi
          this.mapMarkers.push(marker)
        }
      })
      
      // Initialize search suggestions
      this.mapSearchSuggestions = this.allWilayahOptions

      // Watch for dark mode changes
      if (this.mapObserver) {
        this.mapObserver.disconnect()
      }
      
      const observer = new MutationObserver(() => {
        if (this.map && typeof window.L !== 'undefined') {
          const isDarkNow = document.body.classList.contains('dark-mode')
          this.map.eachLayer((layer) => {
            if (layer instanceof window.L.TileLayer) {
              this.map.removeLayer(layer)
              const tileUrl = isDarkNow 
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              const attribution = isDarkNow
                ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              window.L.tileLayer(tileUrl, {
                attribution: attribution,
                maxZoom: 19,
                subdomains: 'abc'
              }).addTo(this.map)
            }
          })
        }
      })
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      })
      this.mapObserver = observer
    },
    onMapSearch() {
      if (!this.mapSearchQuery || this.mapSearchQuery.length < 2) {
        this.mapSearchSuggestions = []
        return
      }
      
      const query = this.mapSearchQuery.toLowerCase()
      this.mapSearchSuggestions = this.allWilayahOptions.filter(option => 
        option.toLowerCase().includes(query)
      ).slice(0, 10)
    },
    performMapSearch() {
      if (!this.mapSearchQuery || !this.map) return
      
      const query = this.mapSearchQuery.toLowerCase().trim()
      
      // Search in provinces
      let foundMarker = null
      let foundCoords = null
      let foundProvinsi = null
      
      // Check if it's a city search (format: "City, Province")
      if (query.includes(',')) {
        const parts = query.split(',').map(p => p.trim())
        const cityName = parts[0]
        const provinsiName = parts[1] || ''
        
        // Find province that contains this city
        Object.keys(this.wilayahData).forEach(provinsi => {
          if (provinsiName && provinsi.toLowerCase().includes(provinsiName.toLowerCase())) {
            if (this.wilayahData[provinsi].cities[cityName]) {
              foundProvinsi = provinsi
              foundCoords = this.provinsiCoordinates[provinsi]
            }
          } else {
            // Search in all provinces
            if (this.wilayahData[provinsi].cities[cityName]) {
              foundProvinsi = provinsi
              foundCoords = this.provinsiCoordinates[provinsi]
            }
          }
        })
      } else {
        // Direct province search
        Object.keys(this.wilayahData).forEach(provinsi => {
          if (provinsi.toLowerCase().includes(query)) {
            foundProvinsi = provinsi
            foundCoords = this.provinsiCoordinates[provinsi]
          }
        })
      }
      
      if (foundCoords && foundProvinsi) {
        // Find the marker
        foundMarker = this.mapMarkers.find(m => m.provinsiName === foundProvinsi)
        
        if (foundMarker) {
          // Remove previous highlight
          if (this.mapSearchHighlight) {
            this.map.removeLayer(this.mapSearchHighlight)
          }
          
          // Zoom to marker
          this.map.setView(foundCoords, 7, {
            animate: true,
            duration: 0.5
          })
          
          // Open popup
          foundMarker.openPopup()
          
          // Add highlight circle
          this.mapSearchHighlight = window.L.circle(foundCoords, {
            color: '#3b82f6',
            fillColor: '#3b82f6',
            fillOpacity: 0.2,
            radius: 50000
          }).addTo(this.map)
          
          // Remove highlight after 3 seconds
          setTimeout(() => {
            if (this.mapSearchHighlight) {
              this.map.removeLayer(this.mapSearchHighlight)
              this.mapSearchHighlight = null
            }
          }, 3000)
        }
      } else {
        // No results found
        if (window.toastr) {
          window.toastr.warning('Wilayah tidak ditemukan')
        }
      }
    },
    clearMapSearch() {
      this.mapSearchQuery = ''
      this.mapSearchSuggestions = []
      if (this.mapSearchHighlight && this.map) {
        this.map.removeLayer(this.mapSearchHighlight)
        this.mapSearchHighlight = null
      }
    },
    toggleDataDetail() {
      this.showDataDetail = !this.showDataDetail
    },
    toggleDataKoperasiDetail() {
      this.showDataKoperasiDetail = !this.showDataKoperasiDetail
    },
    toggleDataTransaksiDetail() {
      this.showDataTransaksiDetail = !this.showDataTransaksiDetail
      if (this.showDataTransaksiDetail) {
        this.$nextTick(() => {
          this.initSelect2()
        })
      }
    },
    toggleDataAktivasiDetail() {
      this.showDataAktivasiDetail = !this.showDataAktivasiDetail
    },
    toggleDataSektorDetail() {
      this.showDataSektorDetail = !this.showDataSektorDetail
    },
    toggleDataBentukDetail() {
      this.showDataBentukDetail = !this.showDataBentukDetail
    },
    toggleDataJenisDetail() {
      this.showDataJenisDetail = !this.showDataJenisDetail
    },
    toggleDataKelompokDetail() {
      this.showDataKelompokDetail = !this.showDataKelompokDetail
    },
    initAvailableYears() {
      // Generate years from 2015 to current year + 1
      const currentYear = new Date().getFullYear()
      this.availableYears = []
      for (let year = 2015; year <= currentYear + 1; year++) {
        this.availableYears.push(year)
      }
      this.availableYears.reverse() // Latest year first
    },
    initTransaksiDetailByYear() {
      // Initialize sample data for different years
      // In real app, this would come from API
      this.availableYears.forEach(year => {
        this.transaksiDetailByYear[year] = [
          { label: 'Simpanan', value: this.formatNumber(Math.floor(Math.random() * 5000) + 1000) },
          { label: 'Pembayaran Pinjaman', value: this.formatNumber(Math.floor(Math.random() * 500) + 100) },
          { label: 'Penjualan Toko', value: this.formatNumber(Math.floor(Math.random() * 3000) + 500) },
          { label: 'PPOB', value: this.formatNumber(Math.floor(Math.random() * 1500) + 200) },
          { label: 'Lainnya', value: this.formatNumber(Math.floor(Math.random() * 100) + 1) }
        ]
      })
    },
    initSelect2() {
      this.$nextTick(() => {
        if (window.$ && window.$.fn.select2) {
          const selectElement = window.$('#filter-tahun-transaksi')
          if (selectElement.length && !selectElement.hasClass('select2-hidden-accessible')) {
            selectElement.select2({
              theme: 'bootstrap-5',
              width: '100%',
              placeholder: 'Pilih Tahun',
              allowClear: true
            }).on('change', (e) => {
              this.selectedYearTransaksi = e.target.value
            })
          }
        }
      })
    },
    onYearChange() {
      // Handler for year change
      // Data will be filtered automatically by computed property
    },
    initDataKoperasiChart() {
      const chartElement = document.querySelector('#data-koperasi-chart')
      if (chartElement) {
        const self = this
        const options = {
          series: [7.1, 92.9],
          chart: {
            type: 'pie',
            height: 300
          },
          labels: ['Active', 'Inactive'],
          colors: ['#10b981', '#3b82f6'],
          dataLabels: {
            enabled: true,
            formatter: (val) => {
              return val.toFixed(1) + '%'
            }
          },
          legend: {
            position: 'bottom',
            fontSize: '12px'
          },
          tooltip: {
            y: {
              formatter: (val) => {
                return val.toFixed(1) + '%'
              }
            }
          }
        }

        this.dataKoperasiChart = new window.ApexCharts(chartElement, options)
        this.dataKoperasiChart.render()
      }
    },
    initDataTransaksiChart() {
      const chartElement = document.querySelector('#data-transaksi-chart')
      if (chartElement) {
        const self = this
        const categories = this.transaksiDetail.map(item => item.label)
        const values = this.transaksiDetail.map(item => parseInt(item.value.replace(/\./g, '')))
        const colors = ['#3b82f6', '#10b981', '#FF720D', '#06b6d4', '#ef4444']

        const options = {
          series: [{
            name: 'Transaksi',
            data: values
          }],
          chart: {
            type: 'bar',
            height: 300,
            toolbar: { show: false }
          },
          colors: colors,
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '60%',
              borderRadius: 4,
              dataLabels: {
                position: 'right'
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => {
              return self.formatNumber(val) + ' (kali)'
            },
            style: {
              fontSize: '12px',
              colors: ['#1f2937']
            }
          },
          xaxis: {
            categories: categories,
            labels: {
              style: {
                colors: '#6b7280',
                fontSize: '12px'
              },
              formatter: (val) => {
                return self.formatNumber(val)
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#6b7280',
                fontSize: '12px'
              }
            }
          },
          grid: {
            borderColor: '#e5e7eb',
            strokeDashArray: 4
          },
          tooltip: {
            y: {
              formatter: (val) => {
                return self.formatNumber(val) + ' (kali)'
              }
            }
          }
        }

        this.dataTransaksiChart = new window.ApexCharts(chartElement, options)
        this.dataTransaksiChart.render()
      }
    },
    initAktivasiChart() {
      const chartElement = document.querySelector('#aktivasi-chart')
      if (chartElement) {
        const self = this
        // Use aktivasiDetail data for chart
        const years = this.aktivasiDetail.map(item => item.year)
        const values = this.aktivasiDetail.map(item => item.value)
        const colors = ['#10b981', '#3b82f6', '#FF720D', '#06b6d4', '#10b981', '#3b82f6', '#FF720D', '#06b6d4']

        const options = {
          series: [{
            name: 'Aktivitas',
            data: values
          }],
          chart: {
            type: 'bar',
            height: 300,
            toolbar: { show: false }
          },
          colors: colors,
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
              borderRadius: 4,
              dataLabels: {
                position: 'top'
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => {
              return self.formatNumber(val) + ' (kali)'
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ['#1f2937']
            }
          },
          xaxis: {
            categories: years,
            labels: {
              style: {
                colors: '#6b7280',
                fontSize: '12px'
              },
              rotate: -45,
              rotateAlways: false
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#6b7280',
                fontSize: '12px'
              },
              formatter: (val) => {
                return self.formatNumber(val)
              }
            }
          },
          grid: {
            borderColor: '#e5e7eb',
            strokeDashArray: 4
          },
          tooltip: {
            y: {
              formatter: (val) => {
                return self.formatNumber(val) + ' (kali)'
              }
            }
          }
        }

        this.aktivasiChart = new window.ApexCharts(chartElement, options)
        this.aktivasiChart.render()
      }
    },
    initSektorUsahaChart() {
      const chartElement = document.querySelector('#koperasi-sektor-chart')
      if (chartElement) {
        const self = this
        const percentages = this.sektorUsahaDetail.map(item => parseFloat(item.percentage))
        const labels = this.sektorUsahaDetail.map(item => item.label)
        const colors = ['#10b981', '#06b6d4', '#3b82f6', '#FF720D', '#06b6d4', '#10b981', '#FF720D', '#06b6d4', '#10b981']

        const options = {
          series: percentages,
          chart: {
            type: 'donut',
            height: 350
          },
          labels: labels,
          colors: colors,
          plotOptions: {
            pie: {
              donut: {
                size: '70%',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: 'Total',
                    formatter: () => '100%'
                  }
                }
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => {
              return val.toFixed(1) + '%'
            }
          },
          legend: {
            position: 'bottom',
            fontSize: '12px',
            itemMargin: {
              horizontal: 5,
              vertical: 5
            }
          },
          tooltip: {
            y: {
              formatter: (val) => {
                return val.toFixed(1) + '%'
              }
            }
          }
        }

        this.sektorUsahaChart = new window.ApexCharts(chartElement, options)
        this.sektorUsahaChart.render()
      }
    },
    initBentukKoperasiChart() {
      const chartElement = document.querySelector('#koperasi-bentuk-chart')
      if (chartElement) {
        const self = this
        const percentages = this.bentukKoperasiDetail.map(item => parseFloat(item.percentage))
        const labels = this.bentukKoperasiDetail.map(item => item.label)
        const colors = ['#FF720D', '#10b981', '#3b82f6', '#10b981', '#3b82f6', '#06b6d4']

        const options = {
          series: percentages,
          chart: {
            type: 'donut',
            height: 350
          },
          labels: labels,
          colors: colors,
          plotOptions: {
            pie: {
              donut: {
                size: '70%',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: 'Total',
                    formatter: () => '100%'
                  }
                }
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => {
              return val.toFixed(1) + '%'
            }
          },
          legend: {
            position: 'bottom',
            fontSize: '12px',
            itemMargin: {
              horizontal: 5,
              vertical: 5
            }
          },
          tooltip: {
            y: {
              formatter: (val) => {
                return val.toFixed(1) + '%'
              }
            }
          }
        }

        this.bentukKoperasiChart = new window.ApexCharts(chartElement, options)
        this.bentukKoperasiChart.render()
      }
    },
    initJenisKoperasiChart() {
      const chartElement = document.querySelector('#koperasi-jenis-chart')
      if (chartElement) {
        const self = this
        const percentages = this.jenisKoperasiDetail.map(item => parseFloat(item.percentage))
        const labels = this.jenisKoperasiDetail.map(item => item.label)
        const colors = ['#FF720D', '#10b981', '#3b82f6', '#06b6d4', '#6366f1']

        const options = {
          series: percentages,
          chart: {
            type: 'donut',
            height: 350
          },
          labels: labels,
          colors: colors,
          plotOptions: {
            pie: {
              donut: {
                size: '70%',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: 'Total',
                    formatter: () => '100%'
                  }
                }
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => {
              return val.toFixed(1) + '%'
            }
          },
          legend: {
            position: 'bottom',
            fontSize: '12px',
            itemMargin: {
              horizontal: 5,
              vertical: 5
            }
          },
          tooltip: {
            y: {
              formatter: (val) => {
                return val.toFixed(1) + '%'
              }
            }
          }
        }

        this.jenisKoperasiChart = new window.ApexCharts(chartElement, options)
        this.jenisKoperasiChart.render()
      }
    },
    initKelompokKoperasiChart() {
      const chartElement = document.querySelector('#koperasi-kelompok-chart')
      if (chartElement) {
        const self = this
        const percentages = this.kelompokKoperasiDetail.map(item => parseFloat(item.percentage))
        const labels = this.kelompokKoperasiDetail.map(item => item.label)
        // Generate colors for many segments
        const colorPalette = ['#FF720D', '#10b981', '#3b82f6', '#06b6d4', '#6366f1', '#ef4444', '#f97316', '#84cc16', '#eab308', '#a855f7', '#ec4899', '#14b8a6', '#0ea5e9', '#8b5cf6', '#f59e0b', '#06b6d4', '#10b981', '#3b82f6', '#FF720D', '#6366f1', '#ef4444', '#f97316', '#84cc16', '#eab308', '#a855f7', '#ec4899', '#14b8a6', '#0ea5e9', '#8b5cf6', '#f59e0b', '#06b6d4', '#10b981', '#3b82f6', '#FF720D', '#6366f1', '#ef4444', '#f97316', '#84cc16', '#eab308', '#a855f7', '#ec4899', '#14b8a6', '#0ea5e9', '#8b5cf6', '#f59e0b']
        const colors = colorPalette.slice(0, labels.length)

        const options = {
          series: percentages,
          chart: {
            type: 'donut',
            height: 500
          },
          labels: labels,
          colors: colors,
          plotOptions: {
            pie: {
              donut: {
                size: '70%',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: 'Total',
                    formatter: () => '100%'
                  }
                }
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: (val) => {
              return val.toFixed(1) + '%'
            }
          },
          legend: {
            position: 'bottom',
            fontSize: '11px',
            itemMargin: {
              horizontal: 3,
              vertical: 3
            },
            height: 'auto',
            maxHeight: 200
          },
          tooltip: {
            y: {
              formatter: (val) => {
                return val.toFixed(1) + '%'
              }
            }
          }
        }

        this.kelompokKoperasiChart = new window.ApexCharts(chartElement, options)
        this.kelompokKoperasiChart.render()
      }
    },
    // initDistribusiChart() {
    //   const chartElement = document.querySelector('#distribusi-transaksi-chart')
    //   if (chartElement) {
    //     const self = this
    //     // Calculate distribution for last 3 years
    //     const recentYears = ['2023', '2024', '2025']
    //     const values = recentYears.map(year => this.transactionData[parseInt(year)])
    //     const total = values.reduce((sum, val) => sum + val, 0)
    //     const percentages = values.map(val => ((val / total) * 100).toFixed(1))

    //     const options = {
    //       series: values,
    //       chart: {
    //         type: 'donut',
    //         height: 280
    //       },
    //       labels: recentYears.map((year, idx) => `${year} (${percentages[idx]}%)`),
    //       colors: ['#FF720D', '#3b82f6', '#10b981'],
    //       plotOptions: {
    //         pie: {
    //           donut: {
    //             size: '70%',
    //             labels: {
    //               show: true,
    //               total: {
    //                 show: true,
    //                 label: 'Total',
    //                 formatter: () => {
    //                   return self.formatNumber(total)
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       },
    //       dataLabels: {
    //         enabled: false
    //       },
    //       legend: {
    //         position: 'bottom',
    //         fontSize: '12px'
    //       },
    //       tooltip: {
    //         y: {
    //           formatter: (val) => {
    //             return self.formatNumber(val) + ' (kali)'
    //           }
    //         }
    //       }
    //     }

    //     this.distribusiChart = new window.ApexCharts(chartElement, options)
    //     this.distribusiChart.render()
    //   }
    // },
    getTrend(index) {
      if (index === 0) return null
      const current = parseInt(this.sortedDataDetail[index].total.replace(/\./g, ''))
      const previous = parseInt(this.sortedDataDetail[index - 1].total.replace(/\./g, ''))
      if (previous === 0) return null
      return ((current - previous) / previous * 100).toFixed(1)
    },
    getTrendClass(index) {
      const trend = this.getTrend(index)
      if (!trend) return ''
      return parseFloat(trend) > 0 ? 'text-success' : 'text-danger'
    },
    getTrendIcon(index) {
      const trend = this.getTrend(index)
      if (!trend) return ''
      return parseFloat(trend) > 0 ? 'ri-arrow-up-line' : 'ri-arrow-down-line'
    },
    getTrendPercent(index) {
      return this.getTrend(index) || '0'
    }
  },
  beforeDestroy() {
    if (this.barChart) {
      this.barChart.destroy()
    }
    if (this.aktivitasChart) {
      this.aktivitasChart.destroy()
    }
    if (this.distribusiChart) {
      this.distribusiChart.destroy()
    }
    if (this.dataKoperasiChart) {
      this.dataKoperasiChart.destroy()
    }
    if (this.dataTransaksiChart) {
      this.dataTransaksiChart.destroy()
    }
    if (this.sektorUsahaChart) {
      this.sektorUsahaChart.destroy()
    }
    if (this.bentukKoperasiChart) {
      this.bentukKoperasiChart.destroy()
    }
    if (this.jenisKoperasiChart) {
      this.jenisKoperasiChart.destroy()
    }
    if (this.kelompokKoperasiChart) {
      this.kelompokKoperasiChart.destroy()
    }
    // Destroy map
    if (this.map) {
      this.map.remove()
      this.map = null
    }
    if (this.mapObserver) {
      this.mapObserver.disconnect()
    }
    // Destroy Select2
    if (window.$ && window.$.fn.select2) {
      const selectElement = window.$('#filter-tahun-transaksi')
      if (selectElement.length && selectElement.hasClass('select2-hidden-accessible')) {
        selectElement.select2('destroy')
      }
    }
  }
}
</script>

<style scoped>
/* Styles moved to custom.css */
</style>
