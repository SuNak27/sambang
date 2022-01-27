<template>
  <div>
    <Header msg="Detail Reservasi" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title text-white">
                  <b>Tabel Detail Santri</b>
                </h3>
              </div>

              <div class="card-body">
                <table
                  id="detailSantri"
                  class="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>NIUP</th>
                      <th>Nama Santri</th>
                      <th>Wilayah</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(sambang, no) in reservasi.data.reservasi_santris"
                      :key="sambang.id"
                    >
                      <td class="text-center">{{ ++no }}</td>
                      <td>{{ sambang.santri.no_mahrom }}</td>
                      <td>{{ sambang.santri.nama }}</td>
                      <td>{{ sambang.santri.wilayah.nama_wilayah }}</td>
                      <td class="text-center">
                        <router-link :to="/konfirmasi/ + sambang.id_santri">
                          Konfirmasi
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title text-white">
                  <b>Tabel Detail wali Santri</b>
                </h3>
              </div>

              <div class="card-body">
                <table
                  id="detailWali"
                  class="table table-bordered table-striped"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>NIK</th>
                      <th>Nama Mahrom</th>
                      <th>Status Mahrom</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(sambang, no) in reservasi.data.reservasi_walis"
                      :key="sambang.id"
                    >
                      <td class="text-center">{{ ++no }}</td>
                      <td>{{ sambang.wali.nik }}</td>
                      <td>{{ sambang.wali.nama_wali }}</td>
                      <td>{{ sambang.wali.status }}</td>
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
  name: "DetailReservasi",
  components: {
    Header,
  },
  data() {
    return {
      no: 1,
      reservasi: {},
    };
  },
  methods: {
    setSettingSambang(data) {
      this.reservasi = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/reservasi/" + this.$route.params.id)
      .then((r) => {
        this.reservasi = r.data;
        $(function () {
          $("#detailSantri")
            .DataTable({
              responsive: true,
              autoWidth: false,
            })
            .buttons()
            .container()
            .appendTo("#detailSantri_wrapper .col-md-6:eq(0)");
          $("#detailWali")
            .DataTable({
              responsive: true,
              autoWidth: false,
            })
            .buttons()
            .container()
            .appendTo("#detailWali_wrapper .col-md-6:eq(0)");
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

<style></style>
