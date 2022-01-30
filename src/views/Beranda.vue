<template>
  <div>
    <Header msg="Dashboard" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">Data Reservasi</h3>
              </div>

              <div class="card-body">
                <table
                  id="datareservasi"
                  class="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nomor Pengurus</th>
                      <th>Nama Wali</th>
                      <th>Tgl Kunjungan</th>
                      <th>Detail Santri</th>
                      <th>Kehadiran</th>
                      <th>Jam Mulai</th>
                      <th>Jam Akhir</th>
                      <th>Status Pertemuan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(sambang, no) in reservasi.data"
                      :key="sambang.id"
                    >
                      <td class="text-center">{{ ++no }}</td>
                      <td>Nomer Pengurus</td>
                      <td>{{ sambang.reservasi_walis[0].wali.nama_wali }}</td>
                      <td class="text-center">{{ sambang.tgl_kunjungan }}</td>
                      <td class="text-center">
                        <router-link :to="/reservasi/ + sambang.id"
                          >Detail</router-link
                        >
                      </td>
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
                      <td
                        class="text-center text-danger"
                        v-if="sambang.hadir && sambang.jam_final <= currentTime"
                      >
                        <i class="fas fa-times-circle"></i> Berakhir
                      </td>
                      <td
                        class="text-center text-success"
                        v-else-if="
                          sambang.hadir && sambang.jam_final >= currentTime
                        "
                      >
                        <i class="fas fa-check-circle"></i> Berlangsung
                      </td>
                      <td v-else></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">Chart</h3>
              </div>

              <div class="card-body">
                <Chart :value="reservasi.data" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Chart from "@/components/Chart.vue";
import axios from "axios";
import $ from "jquery";
import toastr from "admin-lte/plugins/toastr/toastr.min";
import moment from "moment";

export default {
  name: "Beranda",
  components: {
    Header,
    Chart,
  },
  data() {
    return {
      no: 1,
      reservasi: [],
      pertemuan: {},
      currentTime: null,
    };
  },
  methods: {
    hadir(no, id) {
      this.reservasi.data[no].hadir = true;
      this.reservasi.data[no].jam_mula = moment().format("X");
      this.reservasi.data[no].jam_final = moment()
        .add(this.pertemuan.data[0].waktu, "minutes")
        .format("X");
      axios
        .put("/reservasi/" + id, this.reservasi.data[no])
        .then(
          $(function () {
            toastr.success("Hadir");
          })
        )
        .catch((error) => console.log(error));
    },
    updateCurrentTime() {
      this.currentTime = moment().format("X");
    },
    formatTime(jam) {
      return moment.unix(jam).format("HH:mm");
    },
  },
  mounted() {
    axios
      .get("/reservasi")
      .then((r) => {
        this.reservasi = r.data;
        $(function () {
          $("#datareservasi")
            .DataTable({
              responsive: true,
              autoWidth: false,
            })
            .buttons()
            .container()
            .appendTo("#datareservasi_wrapper .col-md-6:eq(0)");
        });
      })
      .catch();

    axios
      .get("/pertemuan")
      .then((response) => {
        this.pertemuan = response.data;
      })
      .catch();
  },
  created() {
    this.currentTime = moment().format("X");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
};
</script>
