<template>
  <div class="modal fade" :id="'hadir_' + reservasi.id">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Konfirmasi Kehadiran</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Apakah anda yakin?</p>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" data-dismiss="modal" class="btn btn-danger">
            Batal
          </button>
          <button
            type="submit"
            data-dismiss="modal"
            @click="simpan"
            class="btn btn-success"
          >
            Konfirmasi
          </button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import toastr from "admin-lte/plugins/toastr/toastr.min";
import moment from "moment";
export default {
  name: "Modal",
  props: {
    res: Object,
  },
  data() {
    return {
      reservasi: {},
      pertemuan: {},
    };
  },
  methods: {
    simpan() {
      this.reservasi.hadir = true;
      this.reservasi.jam_mula = moment().format("X");
      this.reservasi.jam_final = moment()
        .add(this.pertemuan.data[0].waktu, "minutes")
        .format("X");

      axios
        .put("/reservasi/" + this.reservasi.id, this.reservasi)
        .then(
          $(function () {
            toastr.success("Hadir");
          })
        )
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
      .get("/pertemuan")
      .then((response) => {
        this.pertemuan = response.data;
      })
      .catch();
  },
  created() {
    this.reservasi = this.res;
  },
};
</script>

<style>
</style>