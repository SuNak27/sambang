<template>
  <div>
    <Header msg="Konfirmasi" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title text-white">
                  <b>Konfirmasi</b>
                </h3>
              </div>

              <form action="" class="form-horizontal" v-on:submit.prevent>
                <div class="card-body">
                  <div class="form-group row">
                    <label for="" class="col-md-4">NIUP</label>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control"
                        name="no_mahrom"
                        id="no_mahrom"
                        v-model="konfirmasi.data.no_mahrom"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Nama</label>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control"
                        name="nama"
                        id="nama"
                        v-model="konfirmasi.data.nama"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Wilayah</label>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control"
                        name="wilayah"
                        id="wilayah"
                        v-model="konfirmasi.data.wilayah.nama_wilayah"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Lembaga</label>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control"
                        name="lembaga"
                        id="lembaga"
                        v-model="konfirmasi.data.lembaga.nama_lembaga"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Status Santri</label>
                    <div class="col-md-8">
                      <select
                        v-model="konfirmasi.data.status_santri"
                        class="custom-select"
                      >
                        <option disabled>-- Pilih Hari --</option>
                        <option>Ada</option>
                        <option>Ijin Pulang</option>
                        <option>Perjalanan</option>
                        <option>Kegiatan Pesantren</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Keterangan</label>
                    <div class="col-md-8">
                      <textarea
                        class="form-control"
                        id="keterangan"
                        name="keterangan"
                        v-model="konfirmasi.data.keterangan"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4"></label>
                    <div class="col-md-8">
                      <button
                        type="submit"
                        @click="simpan"
                        class="btn btn-success mr-2"
                      >
                        Simpan
                      </button>
                      <router-link to="/reservasi" class="btn btn-danger"
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
  name: "konfirmasi",
  components: {
    Header,
  },
  data() {
    return {
      konfirmasi: {},
    };
  },
  methods: {
    simpan() {
      if (
        this.konfirmasi.data.status_santri != null &&
        this.konfirmasi.data.keterangan != null
      ) {
        axios
          .put(
            "http://localhost:3000/santri/id/" + this.konfirmasi.data.id,
            this.konfirmasi.data
          )
          .then(this.$router.push({ path: "/reservasi" }))
          .catch((err) => console.log(err));
      } else {
        console.log("Data ada yang kosong");
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/santri/id/" + this.$route.params.id)
      .then((response) => (this.konfirmasi = response.data))
      .catch((error) => console.log(error));
  },
};
</script>
