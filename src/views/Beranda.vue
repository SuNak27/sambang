<template>
  <div>
    <DashboardClick v-if="rightClick" :sambang="sbg" :loc="style" />
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
                  class="table table-bordered table-hover"
                >
                  <thead class="thead-light">
                    <tr>
                      <th>No.</th>
                      <th>Nomor Pengurus</th>
                      <th>Nama Wali</th>
                      <th>Tgl Kunjungan</th>
                      <!-- <th>Kehadiran</th>
                      <th>Jam Mulai</th>
                      <th>Jam Akhir</th>
                      <th>Status Pertemuan</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(sambang, no) in reservasi.data"
                      :key="sambang.id"
                      v-on:click.right="rightC(--no)"
                      @click="leftC"
                    >
                      <td class="text-center">{{ ++no }}</td>
                      <td>Nomer Pengurus</td>
                      <td>{{ sambang.reservasi_walis[0].wali.nama_wali }}</td>
                      <td class="text-center">{{ sambang.tgl_kunjungan }}</td>
                      <!-- <td class="text-center">
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
                      <td v-else></td> -->
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
import DashboardClick from "@/components/DashboardClick.vue";
import axios from "axios";
import $ from "jquery";
import toastr from "admin-lte/plugins/toastr/toastr.min";
import moment from "moment";

export default {
  name: "Beranda",
  components: {
    Header,
    Chart,
    DashboardClick,
  },
  data() {
    return {
      no: 1,
      reservasi: [],
      pertemuan: {},
      currentTime: null,
      rightClick: false,
      sbg: {},
      style: {
        top: "0px",
        left: "0px",
        position: "fixed",
        zIndex: 99999999,
        width: "150px",
        backgroundColor: "rgb(61, 61, 61)",
        borderRadius: "10px",
      },
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
    rightC(no) {
      event.preventDefault();
      this.sbg = this.reservasi.data[no];
      this.rightClick = true;
      this.style.top = event.y + "px";
      this.style.left = event.x + "px";
      // this.style.transform = "scale(0)";
      // this.style.transition = "transform 200ms ease-in-out";
    },
    leftC(event) {
      event.preventDefault();
      this.rightClick = false;
      // this.style.transform = "scale(0)";
      // this.style.transition = "";
    },
    itemmenu(no) {
      console.log(this.reservasi.data[no]);
    },
    goto(no) {
      console.log(no);
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

<style scoped>
/* #clickright {
  position: fixed;
  z-index: 99999999;
  width: 150px;
  background-color: #1b1a1a;
  transform: scale(0);
  transform-origin: top left;
  border-radius: 10px;
} */

/* #clickright .item {
  display: block;
  padding: 8px 10px;
  font-size: 15px;
  color: #eee;
}

#clickright .item:hover {
  background-color: #555;
} */
</style>
