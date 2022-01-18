<template>
  <div>
    <Header msg="Tambah Shift" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title text-white">
                  <b>Tambah Shift</b>
                </h3>
              </div>

              <form action="" class="form-horizontal" v-on:submit.prevent>
                <div class="card-body">
                  <div class="form-group row">
                    <label for="" class="col-md-4">Nama Shift</label>
                    <div class="col-md-8">
                      <input
                        type="text"
                        name="nama_shift"
                        id="nama_shift"
                        v-model="shift.nama_shift"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Jam Awal</label>
                    <div class="col-md-8">
                      <input
                        type="time"
                        name="jam_awal"
                        id="jam_awal"
                        v-model="shift.jam_awal"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Jam Akhir</label>
                    <div class="col-md-8">
                      <input
                        type="time"
                        name="jam_akhir"
                        id="jam_akhir"
                        v-model="shift.jam_akhir"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Jumlah Santri</label>
                    <div class="col-md-8">
                      <input
                        type="text"
                        name="jml_santri"
                        id="jml_santri"
                        v-model="shift.jml_santri"
                        class="form-control"
                      />
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
                          v-model="shift.status"
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
                          v-model="shift.status"
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
                        @click="simpanShift"
                      >
                        Simpan
                      </button>
                      <router-link to="/shift" class="btn btn-danger"
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
  name: "tambah_shift",
  components: {
    Header,
  },
  data() {
    return {
      shift: {},
    };
  },
  methods: {
    simpanShift() {
      if (
        this.shift.nama_shift != null &&
        this.shift.jam_awal != null &&
        this.shift.jam_akhir != null &&
        this.shift.jml_santri != null &&
        this.shift.status != null
      ) {
        axios
          .post("http://localhost:3000/shift", this.shift)
          .then(this.$router.push({ path: "/shift" }))
          .catch((err) => console.log(err));
      } else {
        $(function () {
          toastr.error("Data ada yang kosong");
        });
      }
    },
  },
};
</script>