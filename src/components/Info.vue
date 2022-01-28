<template>
  <div class="" v-if="info">
    <div class="card card-danger mt-3">
      <h5 class="card-header">Sambang Ditutup</h5>
      <div class="card-body">
        <h5 class="card-title">
          <strong>{{ informasi.data.nama_informasi }}</strong>
        </h5>
        <p class="card-text">
          {{ informasi.data.detail_informasi }}
        </p>
      </div>
      <div class="card-footer">
        <strong class="text-danger">{{ informasi.data.tanggal_mulai }}</strong>
        s/d
        <strong class="text-danger">{{ informasi.data.tanggal_akhir }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "info",
  props: {
    value: [],
  },
  data() {
    return {
      info: "",
      informasi: {},
    };
  },
  watch: {
    value: {
      handler: function (value) {
        this.info = value;
        axios
          .get("http://localhost:3000/informasi/" + this.info)
          .then((r) => {
            this.informasi = r.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
  created() {
    this.info = this.value;
  },
  mounted() {
    axios
      .get("http://localhost:3000/informasi/" + this.info)
      .then((r) => {
        this.informasi = r.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>