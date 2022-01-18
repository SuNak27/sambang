<template>
  <section class="print">
    <!-- title row -->
    <div class="row">
      <div class="col-12 mb-4">
        <h2 class="page-header text-center">Daftar Reservasi Harian</h2>
        <h2 class="page-header text-center">Pondok Pesantren</h2>
        <h2 class="page-header text-center">Nurul Jadid</h2>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <!-- Table row -->
    <div class="row">
      <div class="col-12 table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nomor Pengurus</th>
              <th>Nama Wali</th>
              <th>Tgl Kunjungan</th>
              <th>Kehadiran</th>
              <th>Jam Mulai</th>
              <th>Jam Akhir</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(sambang, no) in reservasi.data" :key="sambang.id">
              <td class="text-center">{{ ++no }}</td>
              <td>Nomer Pengurus</td>
              <td>{{ sambang.reservasi_walis[0].wali.nama_wali }}</td>
              <td class="text-center">{{ sambang.tgl_kunjungan }}</td>
              <td class="text-center">
                <input
                  v-if="sambang.hadir == false"
                  type="radio"
                  v-model="sambang.jam_mula"
                  class="toastrSuccess"
                  @change="hadir(--no, sambang.id)"
                />
                <p v-else>
                  <i class="fas fa-check-circle text-success"></i>
                </p>
              </td>
              <td class="text-center" v-if="sambang.jam_mula">
                {{ formatTime(sambang.jam_mula) }}
              </td>
              <td class="text-center" v-else></td>
              <td class="text-center" v-if="sambang.jam_mula">
                {{ formatTime(sambang.jam_final) }}
              </td>
              <td class="text-center" v-else></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";
import $ from "jquery";
import toastr from "admin-lte/plugins/toastr/toastr.min";

export default {
  data() {
    return {
      reservasi: [],
      currentTime: null,
    };
  },
  methods: {
    formatTime(jam) {
      return moment.unix(jam).format("HH:mm");
    },
  },
  mounted() {
    axios
      .get(
        "http://localhost:3000/reservasi/tanggal/" + this.$route.params.tanggal
      )
      .then((response) => {
        this.reservasi = response.data;
        $(function () {
          return window.addEventListener("load", window.print());
        });
      })
      .catch((err) => {
        this.$router.push("/cetak");
        toastr.error(err.response.data.message);
      });
  },
};
</script>

<style>
</style>