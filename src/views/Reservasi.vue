<template>
  <div>
    <Header msg="Reservasi" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title mt-2 text-white">
                  <b>Tabel Data Reservasi Sambang</b>
                </h3>
                <router-link
                  to="/tambah_reservasi"
                  class="btn btn-success float-right text-white"
                  >Tambah Reservasi Sambang</router-link
                >
              </div>

              <div class="card-body">
                <table
                  id="datareservasi"
                  class="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nomor Reservasi</th>
                      <th>Nama Wali</th>
                      <th>Tanggal Reservasi</th>
                      <th>Tanggal Kunjungan</th>
                      <th>Detail Santri</th>
                      <th>Status Kehadiran</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(sambang, no) in reservasi.data"
                      :key="sambang.id"
                    >
                      <td class="text-center">{{ ++no }}</td>
                      <td>211000000{{ sambang.id }}</td>
                      <td>{{ sambang.reservasi_walis[0].wali.nama_wali }}</td>
                      <td>{{ sambang.tgl_reservasi }}</td>
                      <td>{{ sambang.tgl_kunjungan }}</td>
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
                          @change="hadir(--no, sambang.id)"
                        />
                        <p v-else>
                          <i class="fas fa-check-circle text-success"></i>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
import axios from "axios";
import moment from "moment";
import $ from "jquery";
import toastr from "admin-lte/plugins/toastr/toastr.min";

export default {
  name: "Reservasi",
  components: {
    Header,
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
    setSettingSambang(data) {
      this.reservasi = data;
    },
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
      .catch(function (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.go();
        }
      });

    axios
      .get("/pertemuan")
      .then((response) => {
        this.pertemuan = response.data;
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.go();
        }
      });
  },
  created() {
    this.currentTime = moment().format("X");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
  computed: {
    tanggal_mulai() {
      var info = this.informasi;
      if (info != "") {
        const time = this.informasi.data[0].tanggal_mulai;
        return moment(time).format("X");
      } else {
        return this.currentTime;
      }
    },
    tanggal_akhir() {
      var info = this.informasi;
      if (info !== "") {
        const time = this.informasi.data[0].tanggal_akhir;
        return moment(time).format("X");
      } else {
        return this.currentTime;
      }
    },
  },
};
</script>