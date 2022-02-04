<template>
  <div>
    <Header msg="Setting Hari" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title mt-2 text-white">
                  <b>Tabel Setting Hari</b>
                </h3>
              </div>

              <div class="card-body">
                <router-link
                  to="/tambah_hari"
                  class="btn btn-success mb-3 btn-block col-md-2 text-white"
                  >Tambah Setting Hari</router-link
                >
                <table
                  id="tabelHari"
                  class="table table-bordered table-responsive-md table-hover"
                >
                  <thead class="thead-dark">
                    <tr>
                      <th>No.</th>
                      <th>Nama Hari</th>
                      <th>Nama Wilayah</th>
                      <th>Shift</th>
                      <th>Kapasitas</th>
                      <th>Status</th>
                      <th class="text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(hari, no) in setHari.data" :key="hari.id">
                      <td class="text-center">{{ ++no }}</td>
                      <td>{{ hari.nama_hari }}</td>
                      <td>{{ hari.wilayah.nama_wilayah }}</td>
                      <td>{{ hari.shift.nama_shift }}</td>
                      <td>{{ hari.kapasitas }}</td>
                      <td>{{ hari.status }}</td>
                      <td class="text-center">
                        <router-link
                          :to="'/edit_hari/' + hari.id"
                          class="btn btn-sm mb-2 ml-2 btn-warning"
                          ><i class="fas fa-edit"></i
                        ></router-link>
                        <a
                          style="cursor: pointer"
                          v-if="hari.status == 'Nonaktif'"
                          @click="clickAktif(--no, hari.id)"
                          class="btn btn-sm btn-success mb-2 ml-2"
                        >
                          <i class="fas fa-power-off"></i>
                        </a>
                        <a
                          style="cursor: pointer"
                          v-else
                          class="btn btn-sm btn-danger mb-2 ml-2"
                          @click="clickNonaktif(--no, hari.id)"
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

export default {
  name: "SettingHari",
  components: {
    Header,
  },
  data() {
    return {
      no: 1,
      setHari: [],
    };
  },
  methods: {
    setSettingHari(data) {
      this.setHari = data;
    },
    clickAktif(no, id) {
      this.setHari.data[no].status = "Aktif";
      axios
        .patch("/hari/" + id, this.setHari.data[no])
        .then()
        .catch((error) => console.log(error));
    },
    clickNonaktif(no, id) {
      this.setHari.data[no].status = "Nonaktif";
      axios
        .patch("/hari/" + id, this.setHari.data[no])
        .then()
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
      .get("/hari")
      .then((r) => {
        this.setHari = r.data;
        $(function () {
          $("#tabelHari")
            .DataTable({
              responsive: false,
              autoWidth: false,
            })
            .buttons()
            .container()
            .appendTo("#tabelHari_wrapper .col-md-6:eq(0)");
        });
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
};
</script>