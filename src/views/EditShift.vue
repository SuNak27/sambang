<template>
  <div>
    <Header msg="Edit Shift" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title text-white">
                  <b>Edit Shift</b>
                </h3>
              </div>

              <form action="" class="form-horizontal">
                <div class="card-body">
                  <div class="form-group row">
                    <label for="" class="col-md-4">Nama Shift</label>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control"
                        name="nama_shift"
                        id="nama_shift"
                        v-model="shift.data.nama_shift"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Jam Awal</label>
                    <div class="col-md-8">
                      <input
                        type="time"
                        class="form-control"
                        name="jam_awal"
                        id="jam_awal"
                        v-model="shift.data.jam_awal"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Jam Akhir</label>
                    <div class="col-md-8">
                      <input
                        type="time"
                        class="form-control"
                        name="jam_akhir"
                        id="jam_akhir"
                        v-model="shift.data.jam_akhir"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Jumlah Santri</label>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control"
                        name="jml_santri"
                        id="jml_santri"
                        v-model="shift.data.jml_santri"
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
                          v-model="shift.data.status"
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
                          v-model="shift.data.status"
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
                        @click="simpanShift"
                        class="btn btn-success mr-2"
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
  name: "EditShift",
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
        this.shift.data.nama_shift != null &&
        this.shift.data.jam_awal != null &&
        this.shift.data.jam_akhir != null &&
        this.shift.data.jml_santri != null &&
        this.shift.data.status != null
      ) {
        axios
          .put("/shift/" + this.shift.data.id, this.shift.data)
          .then(
            $(function () {
              toastr.success("Data telah diperbarui");
            }),
            this.$router.push("/shift")
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
      .get("/shift/" + this.$route.params.id)
      .then((response) => (this.shift = response.data))
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