<template>
  <div>
    <Header msg="Edit Setting Hari" />

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

              <form class="form-horizontal" v-on:submit.prevent>
                <div class="card-body">
                  <div class="form-group row">
                    <label for="" class="col-md-4">Nama Hari</label>
                    <div class="col-md-8">
                      <select
                        v-model="hari.data.nama_hari"
                        class="custom-select"
                      >
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
                      <select
                        v-model="hari.data.id_wilayah"
                        class="custom-select"
                      >
                        <option disabled>-- Pilih Wilayah --</option>
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
                      <select
                        v-model="hari.data.id_shift"
                        class="custom-select"
                      >
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
                          v-model="hari.data.status_hari"
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
                          v-model="hari.data.status_hari"
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
                          v-model="hari.data.status"
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
                          v-model="hari.data.status"
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
  name: "edit_hari",
  components: {
    Header,
  },
  data() {
    return {
      kapasitas: 50,
      hari: {},
      wilayah: [],
      shift: [],
    };
  },
  methods: {
    simpanHari() {
      if (
        this.hari.data.nama_hari != null &&
        this.hari.data.id_wilayah != null &&
        this.hari.data.id_shift != null &&
        this.hari.data.status_hari != null &&
        this.hari.data.status != null
      ) {
        this.hari.kapasitas = this.kapasitas;
        axios
          .put("/hari/" + this.hari.data.id, this.hari.data)
          .then(
            $(function () {
              toastr.success("Data telah diperbarui");
            }),
            this.$router.push("/settingHari")
          )
          .catch((err) => console.log(err));
      } else {
        $(function () {
          toastr.error("Data ada yang kosong");
        });
      }
    },
  },
  mounted() {
    axios
      .get("/hari/" + this.$route.params.id)
      .then((response) => (this.hari = response.data))
      .catch(function (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.go();
        }
      });

    axios
      .get("/shift")
      .then((response) => (this.shift = response.data))
      .catch(function (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.go();
        }
      });

    axios
      .get("/wilayah")
      .then((response) => (this.wilayah = response.data))
      .catch(function (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.go();
        }
      });
  },
};
</script>