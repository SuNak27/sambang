<template>
  <div>
    <Header msg="Setting Pertemuan" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title text-white">
                  <b>Setting Pertemuan</b>
                </h3>
              </div>

              <form class="form-horizontal" v-on:submit.prevent>
                <div class="card-body">
                  <div class="form-group row">
                    <label for="" class="col-md-4">Batas Sambang</label>
                    <div class="col-md-8 input-group">
                      <input
                        type="number"
                        v-model="pertemuan.batas_sambang"
                        class="form-control"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text">Sambang / Bulan</span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Batas Tamu</label>
                    <div class="col-md-8 input-group">
                      <input
                        type="number"
                        v-model="pertemuan.batas_tamu"
                        class="form-control"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text">Tamu / Sambang</span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Alokasi Waktu</label>
                    <div class="col-md-8 input-group">
                      <input
                        type="number"
                        v-model="pertemuan.waktu"
                        class="form-control"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text">Menit</span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4"></label>
                    <div class="col-md-8">
                      <button @click="simpan" class="btn btn-success mr-2">
                        Simpan
                      </button>
                      <router-link to="/" class="btn btn-danger"
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

export default {
  name: "Pertemuan",
  components: {
    Header,
  },
  data() {
    return {
      pertemuan: {},
    };
  },
  methods: {
    simpan() {
      if (
        this.pertemuan.batas_sambang != null &&
        this.pertemuan.batas_tamu != null &&
        this.pertemuan.waktu != null
      ) {
        axios
          .put("/pertemuan/1", this.pertemuan)
          .then(this.$router.push({ path: "/" }))
          .catch((err) => console.log(err));
      } else {
        console.log("Data ada yang kosong");
      }
    },
  },
  mounted() {
    axios
      .get("/pertemuan/1")
      .then((r) => {
        this.pertemuan = r.data.data;
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