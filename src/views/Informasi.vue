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
                <router-link
                  to="/tambahInformasi"
                  class="btn btn-success float-right text-white"
                  >Tambah Informasi</router-link
                >
              </div>

              <div class="card-body">
                <table
                  id="informasiTable"
                  class="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nama Informasi</th>
                      <th width="300px">Detail Informasi</th>
                      <th>Tanggal Mulai</th>
                      <th>Tanggal Akhir</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(info, no) in informasi.data" :key="info.id">
                      <td class="text-center">{{ ++no }}</td>
                      <td>{{ info.nama_informasi }}</td>
                      <td>{{ info.detail_informasi }}</td>
                      <td>{{ info.tanggal_mulai }}</td>
                      <td>{{ info.tanggal_akhir }}</td>
                      <td>
                        <router-link
                          :to="'/editInformasi/' + info.id"
                          class="badge badge-warning"
                          >Edit</router-link
                        >
                        |
                        <a
                          style="cursor: pointer"
                          v-if="info.status == 'Tutup'"
                          @click="clickBuka(--no, info.id)"
                          class="badge badge-success"
                        >
                          Buka
                        </a>
                        <a
                          style="cursor: pointer"
                          v-else
                          class="badge badge-danger"
                          @click="clickTutup(--no, info.id)"
                        >
                          Tutup
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
              responsive: true,
              autoWidth: false,
            })
            .buttons()
            .container()
            .appendTo("#informasiTable_wrapper .col-md-6:eq(0)");
        });
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.go();
        }
      });
  },
};
</script>