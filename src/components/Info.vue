<template>
  <div class="" v-if="info">
    <div class="card card-danger mt-3" v-if="informasi.data">
      <h5 class="card-header">Sambang Ditutup</h5>
      <div class="card-body">
        <h5 class="card-title">
          <strong>{{ informasi.data.nama_informasi }}</strong>
        </h5>
        <p class="card-text">
          {{ informasi.data.detail_informasi }}
        </p>
        <p>
          Tanggal Dimulai :
          <strong class="text-danger">{{ informasi.data.tanggal_mulai }}</strong
          ><br />
          Tanggal Berakhir :
          <strong class="text-danger">{{
            informasi.data.tanggal_akhir
          }}</strong>
        </p>
        <p></p>
      </div>
      <div class="card-footer">
        Dibuka pada tanggal
        <strong class="text-success">{{ buka() }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "info",
  props: {
    value: [],
    data: [],
  },
  data() {
    return {
      info: "",
      informasi: {},
      reservasiMahrom: {},
    };
  },
  methods: {
    buka() {
      return moment(this.informasi.data.tanggal_akhir)
        .add(1, "days")
        .format("yyyy-MM-DD");
    },
  },
  watch: {
    value: {
      handler: function (value) {
        this.info = value;
        axios
          .get("/informasi/" + this.info)
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
    this.info = this.data;
  },
  mounted() {
    axios
      .get("/informasi/" + this.info)
      .then((r) => {
        this.informasi = r.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>