<template>
  <div>
    <Header msg="Shift" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title mt-2 text-white">
                  <b>Tabel Shift</b>
                </h3>
              </div>

              <div class="card-body">
                <router-link
                  to="/tambah_shift"
                  class="btn btn-success mb-3 col-md-2 text-white"
                  >Tambah Shift</router-link
                >
                <table
                  id="tabelShift"
                  class="table table-bordered table-responsive-md table-hover"
                >
                  <thead class="thead-dark">
                    <tr>
                      <th>No.</th>
                      <th>Nama Shift</th>
                      <th>Jam Awal</th>
                      <th>Jam Akhir</th>
                      <th>Jumlah Santri</th>
                      <th>Status</th>
                      <th class="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(shift, no) in setShift.data" :key="shift.id">
                      <td class="text-center">{{ ++no }}</td>
                      <td>{{ shift.nama_shift }}</td>
                      <td>{{ shift.jam_awal }}</td>
                      <td>{{ shift.jam_akhir }}</td>
                      <td>{{ shift.jml_santri }}</td>
                      <td>{{ shift.status }}</td>
                      <td class="text-center">
                        <router-link
                          :to="'/edit_shift/' + shift.id"
                          class="btn btn-warning btn-sm mb-2 ml-2"
                        >
                          <i class="fas fa-edit"></i
                        ></router-link>
                        <a
                          style="cursor: pointer"
                          v-if="shift.status == 'Nonaktif'"
                          @click="clickAktif(--no, shift.id)"
                          class="btn btn-success btn-sm mb-2 ml-2"
                        >
                          <i class="fas fa-power-off"></i>
                        </a>
                        <a
                          style="cursor: pointer"
                          v-else
                          class="btn btn-danger btn-sm mb-2 ml-2"
                          @click="clickNonaktif(--no, shift.id)"
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
  name: "Shift",
  components: {
    Header,
  },
  data() {
    return {
      no: 1,
      setShift: [],
    };
  },
  methods: {
    setSettingShift(data) {
      this.setShift = data;
    },
    clickAktif(no, id) {
      this.setShift.data[no].status = "Aktif";
      axios
        .patch("/shift/" + id, this.setShift.data[no])
        .then()
        .catch((error) => console.log(error));
    },
    clickNonaktif(no, id) {
      this.setShift.data[no].status = "Nonaktif";
      axios
        .patch("/shift/" + id, this.setShift.data[no])
        .then()
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
      .get("/shift")
      .then((r) => {
        this.setShift = r.data;
        $(function () {
          $("#tabelShift")
            .DataTable({
              responsive: false,
              autoWidth: false,
            })
            .buttons()
            .container()
            .appendTo("#tabelShift_wrapper .col-md-6:eq(0)");
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