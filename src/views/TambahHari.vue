<template>
  <div>
    <Header msg="Tambah Setting Hari" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title text-white">
                  <b>Tambah Setting Hari</b>
                </h3>
              </div>

              <form action="" class="form-horizontal" v-on:submit.prevent>
                <div class="card-body">
                  <div class="form-group row">
                    <label for="" class="col-md-4">Nama Hari</label>
                    <div class="col-md-8">
                      <select v-model="hari.nama_hari" class="custom-select">
                        <option disabled>-- Pilih Hari --</option>
                        <option>Senin</option>
                        <option>Selasa</option>
                        <option>Rabu</option>
                        <option>Kamis</option>
                        <option>Jum'at</option>
                        <option>Sabtu</option>
                        <option>Minggu</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Nama Wilayah</label>
                    <div class="col-md-8">
                      <select v-model="hari.id_wilayah" class="custom-select">
                        <option disabled selected>-- Pilih Wilayah --</option>
                        <option
                          v-for="wil in wilayah.data"
                          :key="wil.id"
                          v-bind:value="wil.id"
                        >
                          {{ wil.nama_wilayah }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Shift</label>
                    <div class="col-md-8">
                      <select v-model="hari.id_shift" class="custom-select">
                        <option disabled>-- Pilih Shift --</option>
                        <option
                          v-for="shif in shift.data"
                          :key="shif.id"
                          :value="shif.id"
                        >
                          {{ shif.nama_shift }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Status Hari</label>
                    <div class="col-md-8">
                      <div
                        class="
                          custom-control custom-radio custom-control-inline
                        "
                      >
                        <input
                          type="radio"
                          id="santri"
                          name="status_hari"
                          value="Santri"
                          v-model="hari.status_hari"
                          class="custom-control-input"
                        />
                        <label class="custom-control-label" for="santri"
                          >Santri Putra</label
                        >
                      </div>
                      <div
                        class="
                          custom-control custom-radio custom-control-inline
                        "
                      >
                        <input
                          type="radio"
                          id="santriwati"
                          name="status_hari"
                          value="Santriwati"
                          v-model="hari.status_hari"
                          class="custom-control-input"
                        />
                        <label class="custom-control-label" for="santriwati"
                          >Santri Putri</label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Status</label>
                    <div class="col-md-8">
                      <div
                        class="
                          custom-control custom-radio custom-control-inline
                        "
                      >
                        <input
                          type="radio"
                          id="aktif"
                          name="status"
                          value="Aktif"
                          v-model="hari.status"
                          class="custom-control-input"
                        />
                        <label class="custom-control-label" for="aktif"
                          >Aktif</label
                        >
                      </div>
                      <div
                        class="
                          custom-control custom-radio custom-control-inline
                        "
                      >
                        <input
                          type="radio"
                          id="nonaktif"
                          name="status"
                          value="Nonaktif"
                          v-model="hari.status"
                          class="custom-control-input"
                        />
                        <label class="custom-control-label" for="nonaktif"
                          >Non Aktif</label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4"></label>
                    <div class="col-md-8">
                      <button
                        type="submit"
                        class="btn btn-success mr-2 toastrDefaultSuccess"
                        @click="simpanHari"
                      >
                        Simpan
                      </button>
                      <router-link to="/settingHari" class="btn btn-danger"
                        >Batal</router-link
                      >
                    </div>
                  </div>
                </div>
              </form>
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
  name: "TambahHari",
  components: {
    Header,
  },
  data() {
    return {
      kapasitas: 50,
      hari: {},
      shift: [],
      wilayah: [],
    };
  },
  methods: {
    simpanHari() {
      if (
        this.hari.nama_hari != null &&
        this.hari.id_wilayah != null &&
        this.hari.id_shift != null &&
        this.hari.status_hari != null &&
        this.hari.status != null
      ) {
        this.hari.kapasitas = this.kapasitas;
        axios
          .post("/hari", this.hari)
          .then(
            $(function () {
              toastr.success("Data telah ditambah");
            }),
            this.$router.push({ path: "settingHari" })
          )
          .catch((error) => console.log(error));
      } else {
        $(function () {
          toastr.error("Data ada yang kosong");
        });
      }
    },
  },
  mounted() {
    axios
      .get("/shift")
      .then((response) => (this.shift = response.data))
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          this.$router.push({ path: "/login" });
        }
      });

    axios
      .get("/wilayah")
      .then((response) => (this.wilayah = response.data))
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