<template>
  <div>
    <Header msg="Tambah Informasi" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title text-white">
                  <b>Tambah Informasi</b>
                </h3>
              </div>

              <form action="" class="form-horizontal" v-on:submit.prevent>
                <div class="card-body">
                  <div class="form-group row">
                    <label for="" class="col-md-4">Nama Informasi</label>
                    <div class="col-md-8">
                      <input
                        type="text"
                        v-model="informasi.data.nama_informasi"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Detail Informasi</label>
                    <div class="col-md-8">
                      <textarea
                        class="form-control"
                        v-model="informasi.data.detail_informasi"
                        cols="20"
                        rows="10"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Tanggal Mulai</label>
                    <div class="col-md-8">
                      <input
                        type="date"
                        class="form-control"
                        v-model="informasi.data.tanggal_mulai"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Tanggal Berakhir</label>
                    <div class="col-md-8">
                      <input
                        type="date"
                        class="form-control"
                        v-model="informasi.data.tanggal_akhir"
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
                          id="buka"
                          name="status"
                          value="Buka"
                          v-model="informasi.data.status"
                          class="custom-control-input"
                        />
                        <label class="custom-control-label" for="buka"
                          >Buka</label
                        >
                      </div>
                      <div
                        class="
                          custom-control custom-radio custom-control-inline
                        "
                      >
                        <input
                          type="radio"
                          id="tutup"
                          name="status"
                          value="Tutup"
                          v-model="informasi.data.status"
                          class="custom-control-input"
                        />
                        <label class="custom-control-label" for="tutup"
                          >Tutup</label
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
                        @click="simpan"
                      >
                        Simpan
                      </button>
                      <router-link to="/informasi" class="btn btn-danger"
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
  name: "EditInformasi",
  components: {
    Header,
  },
  data() {
    return {
      informasi: {},
    };
  },
  methods: {
    simpan() {
      if (
        this.informasi.data.nama_informasi != null &&
        this.informasi.data.detail_informasi != null &&
        this.informasi.data.tanggal_mulai != null &&
        this.informasi.data.tanggal_akhir != null &&
        this.informasi.data.status != null
      ) {
        axios
          .put("/informasi/" + this.informasi.data.id, this.informasi.data)
          .then(
            $(function () {
              toastr.success("Data telah diubah");
            }),
            this.$router.push({ path: "/informasi" })
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
      .get("/informasi/" + this.$route.params.id)
      .then((response) => (this.informasi = response.data))
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