<template>
  <div>
    <Header msg="Pusat Informasi" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title mt-2 text-white">
                  <b>Tabel Informasi</b>
                </h3>
              </div>

              <div class="card-body">
                <router-link
                  to="/tambahInformasi"
                  class="btn btn-success mb-2 col-md-2 text-white"
                  >Tambah Informasi</router-link
                >
                <table
                  id="informasiTable"
                  class="table table-bordered table-hover table-responsive-md"
                >
                  <thead class="thead-dark">
                    <tr>
                      <th>No.</th>
                      <th>Nama Informasi</th>
                      <th width="300px">Detail Informasi</th>
                      <th>Tanggal Mulai</th>
                      <th>Tanggal Akhir</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(info, no) in informasi.data" :key="info.id">
                      <td class="text-center">{{ ++no }}</td>
                      <td>{{ info.nama_informasi }}</td>
                      <td>{{ info.detail_informasi }}</td>
                      <td>{{ info.tanggal_mulai }}</td>
                      <td>{{ info.tanggal_akhir }}</td>
                      <td>{{ info.status }}</td>
                      <td>
                        <router-link
                          :to="'/editInformasi/' + info.id"
                          class="btn btn-warning btn-sm ml-2 mb-2"
                          ><i class="fas fa-edit"></i
                        ></router-link>
                        <a
                          style="cursor: pointer"
                          v-if="info.status == 'Tutup'"
                          @click="clickBuka(--no, info.id)"
                          class="btn btn-success btn-sm ml-2 mb-2"
                        >
                          <i class="fas fa-power-off"></i>
                        </a>
                        <a
                          style="cursor: pointer"
                          v-else
                          class="btn btn-danger btn-sm ml-2 mb-2"
                          @click="clickTutup(--no, info.id)"
                        >
                          <i class="fas fa-power-off"></i>
                        </a>
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
import $ from "jquery";
import toastr from "admin-lte/plugins/toastr/toastr.min";

export default {
  name: "SettingHari",
  components: {
    Header,
  },
  data() {
    return {
      no: 1,
      informasi: [],
    };
  },
  methods: {
    clickBuka(no, id) {
      this.informasi.data[no].status = "Buka";
      axios
        .put("/informasi/" + id, this.informasi.data[no])
        .then()
        .catch((error) => console.log(error));
    },
    clickTutup(no, id) {
      this.informasi.data[no].status = "Tutup";
      axios
        .put("/informasi/" + id, this.informasi.data[no])
        .then()
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
      .get("/informasi")
      .then((r) => {
        this.informasi = r.data;
        $(function () {
          $("#informasiTable")
            .DataTable({
              responsive: false,
              autoWidth: false,
            })
            .buttons()
            .container()
            .appendTo("#informasiTable_wrapper .col-md-6:eq(0)");
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
  },
};
</script>