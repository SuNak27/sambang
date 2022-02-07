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
              </div>

              <div class="card-body">
                <router-link
                  to="/tambah_reservasi"
                  class="btn btn-success mb-2 col-md-2 text-white"
                  >Tambah Reservasi</router-link
                >
                <table
                  id="datareservasi"
                  class="table table-bordered table-responsive-md table-hover"
                >
                  <thead class="thead-dark">
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
                        <button
                          class="btn btn-secondary btn-block"
                          data-toggle="modal"
                          :data-target="'#hadir_' + sambang.id"
                          v-if="sambang.hadir == false"
                        >
                          <i class="far fa-circle"></i>
                        </button>
                        <p v-else>
                          <i class="fas fa-check-circle text-success"></i>
                        </p>

                        <Modal :res="sambang" />
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
import Modal from "@/components/Modal.vue";
import axios from "axios";
import moment from "moment";
import $ from "jquery";
import toastr from "admin-lte/plugins/toastr/toastr.min";

export default {
  name: "Reservasi",
  components: {
    Header,
    Modal,
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
              autoWidth: true,
            })
            .buttons()
            .container()
            .appendTo("#datareservasi_wrapper .col-md-6:eq(0)");
        });
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          toastr.error("Login expired. refresh halaman");
          this.$router.push({ path: "/login" });
        }
      });

    axios
      .get("/pertemuan")
      .then((response) => {
        this.pertemuan = response.data;
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          this.$router.push({ path: "/login" });
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