<template>
  <div>
    <Header msg="History" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title mt-2 text-white">
                  <b>Tabel History Reservasi Sambang</b>
                </h3>
              </div>

              <div class="card-body">
                <table id="history" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Nomor Reservasi</th>
                      <th>Nama Santri</th>
                      <th>Wilayah</th>
                      <th>Tanggal Kunjungan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(sambang, no) in reservasi.data"
                      :key="sambang.id"
                    >
                      <td class="text-center">{{ ++no }}</td>
                      <td class="text-center">2110005050{{ sambang.id }}</td>
                      <td>{{ sambang.reservasi_santris[0].santri.nama }}</td>
                      <td>
                        {{
                          sambang.reservasi_santris[0].santri.wilayah
                            .nama_wilayah
                        }}
                      </td>
                      <td>{{ sambang.tgl_kunjungan }}</td>
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
  name: "History",
  components: {
    Header,
  },
  data() {
    return {
      no: 1,
      reservasi: [],
    };
  },
  methods: {
    setSettingSambang(data) {
      this.reservasi = data;
    },
  },
  mounted() {
    axios
      .get("/reservasi")
      .then((r) => {
        this.reservasi = r.data;
        $(function () {
          $("#history")
            .DataTable({
              responsive: true,
              autoWidth: false,
            })
            .buttons()
            .container()
            .appendTo("#history_wrapper .col-md-6:eq(0)");
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

<style>
</style>