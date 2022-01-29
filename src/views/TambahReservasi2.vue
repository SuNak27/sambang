<template>
  <div>
    <Header msg="Tambah Reservasi Sambang" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title text-white">
                  <b>Tambah Reservasi Sambang</b>
                </h3>
              </div>

              <form action="" class="form-horizontal" v-on:submit.prevent>
                <div class="card-body">
                  <div class="form-group row">
                    <label for="" class="col-md-4">NIK Mahrom</label>
                    <div class="col-md-8">
                      <input
                        v-model="nik"
                        name="search"
                        id="search"
                        type="text"
                        class="form-control"
                        @keyup="search"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Nama Mahrom</label>
                    <div class="col-md-8">
                      <input
                        disabled
                        type="text"
                        name=""
                        id=""
                        v-if="nik == '' || wali.data[0].no_mahrom != nik"
                        class="form-control"
                      />
                      <input
                        type="text"
                        name="nama"
                        id="nama"
                        readonly
                        class="form-control"
                        v-model="wali.data[0].nama_wali"
                        v-else
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Shift</label>
                    <div class="col-md-8">
                      <div class="row">
                        <div class="col-sm-4">
                          <select
                            @change="onChange"
                            v-model="reservasi.id_shift"
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
                        <div class="col-sm-4" v-if="checkShift.data == null">
                          <input
                            type="text"
                            readonly
                            placeholder="Jam Awal"
                            class="form-control"
                          />
                        </div>
                        <div class="col-sm-4" v-else>
                          <input
                            type="text"
                            readonly
                            class="form-control"
                            :value="checkShift.data.jam_awal"
                          />
                        </div>
                        <div class="col-sm-4" v-if="checkShift.data == null">
                          <input
                            type="text"
                            placeholder="Jam Akhir"
                            readonly
                            class="form-control"
                          />
                        </div>
                        <div v-else class="col-sm-4">
                          <input
                            type="text"
                            readonly
                            class="form-control"
                            :value="checkShift.data.jam_akhir"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Hari Kunjungan</label>
                    <div class="col-md-8">
                      <select
                        @change="statusSantri"
                        v-model="reservasi.nama_hari"
                        class="custom-select"
                        v-if="reservasi.id_shift == null"
                      >
                        <option disabled selected value="">
                          -- Pilih Hari --
                        </option>
                      </select>
                      <select
                        @change="statusSantri"
                        v-model="reservasi.id_hari"
                        class="custom-select"
                        v-else
                      >
                        <option disabled selected value="">
                          -- Pilih Hari --
                        </option>
                        <option
                          v-for="day in hari.data"
                          :key="day.id"
                          :value="day.id"
                        >
                          {{ day.nama_hari }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Tanggal Kunjungan</label>
                    <div class="col-md-8">
                      <b-form-datepicker
                        v-model="value"
                        today-button
                        reset-button
                        close-button
                      ></b-form-datepicker>

                      <div v-if="value">
                        <Info :value="info()" />
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Data Santri</label>
                    <div class="col-md-8">
                      <table class="table table-striped">
                        <thead>
                          <th>No</th>
                          <th>No Mahrom</th>
                          <th>Nama Santri</th>
                          <th>Wilayah</th>
                          <th>Aksi</th>
                        </thead>
                        <tbody>
                          <tr
                            v-if="nik == '' || santri.data[0].no_mahrom != nik"
                          >
                            <td colspan="5" class="text-center">
                              <div class="badge badge-danger">
                                Silahkan Masukkan NIK Mahrom
                              </div>
                            </td>
                          </tr>
                          <tr
                            v-for="(santriNj, no) in santri.data"
                            :key="santriNj.id"
                            v-else
                          >
                            <td>{{ ++no }}</td>
                            <td>{{ santriNj.no_mahrom }}</td>
                            <td>{{ santriNj.nama }}</td>
                            <td>{{ santriNj.wilayah.nama_wilayah }}</td>
                            <td>
                              <input
                                @change="pilihSantri"
                                type="checkbox"
                                :value="santriNj"
                                id="checkSantri"
                                v-model="checkedSantri"
                              />
                              <span
                                v-if="
                                  disabledSantri != '' &&
                                  disabledSantri != 'Sama'
                                "
                                ><i class="fas fa-times ml-1 text-danger"></i
                              ></span>
                            </td>
                          </tr>
                          <tr v-if="disabledSantri == 'Tidak Sama'">
                            <td colspan="5" class="text-center">
                              <div class="btn btn-danger btn-block">
                                Hari {{ check.data[0].nama_hari }}
                                {{ check.data[0].shift.nama_shift }} Khusus
                                {{
                                  check.data[0].status_hari == "Santri"
                                    ? "Santri Putra"
                                    : "Santri Putri"
                                }}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Data Mahrom / Tamu</label>
                    <div class="col-md-8">
                      <table class="table table-striped">
                        <thead>
                          <th>No</th>
                          <th>No Mahrom</th>
                          <th>Nama Mahrom</th>
                          <th>Status Mahrom</th>
                          <th>Aksi</th>
                        </thead>
                        <tbody>
                          <tr v-if="nik == '' || wali.data[0].no_mahrom != nik">
                            <td colspan="5" class="text-center">
                              <div class="badge badge-danger">
                                Silahkan Masukkan NIK Mahrom
                              </div>
                            </td>
                          </tr>
                          <tr
                            v-for="(waliSantri, no) in wali.data"
                            :key="waliSantri.id"
                            v-else
                          >
                            <td>{{ ++no }}</td>
                            <td>{{ waliSantri.no_mahrom }}</td>
                            <td>{{ waliSantri.nama_wali }}</td>
                            <td>{{ waliSantri.status }}</td>
                            <td>
                              <input
                                type="checkbox"
                                :value="waliSantri.id"
                                v-model="checkedWali"
                              />
                              <span v-if="moreWali != '' && moreWali == 'Lebih'"
                                ><i class="fas fa-times ml-1 text-danger"></i
                              ></span>
                            </td>
                          </tr>
                          <tr v-if="moreWali == 'Lebih'">
                            <td colspan="5" class="text-center">
                              <div class="btn btn-danger btn-block">
                                Maksimal Hanya Boleh Memilih 2 Wali Santri
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
import Info from "@/components/Info.vue";
import moment from "moment";
import axios from "axios";
import $ from "jquery";
import toastr from "admin-lte/plugins/toastr/toastr.min";

export default {
  name: "TambahReservasi",
  components: {
    Header,
    Info,
  },
  data() {
    return {
      santri: [],
      wali: [],
      shift: [],
      checkShift: {},
      hari: [],
      nik: "",
      reservasi: {},
      reservasi_wali: {},
      reservasi_santri: {},
      tgl_reservasi: moment().format("yyyy-MM-DD"),
      check: {},
      status: "",
      checkedSantri: [],
      checkedWali: [],
      reservasiId: {},
      value: "",
      informasi: [],
    };
  },
  methods: {
    setSantri(data) {
      this.santri = data;
    },
    search() {
      axios
        .get("http://localhost:3000/santri/" + this.nik)
        .then((response) => (this.santri = response.data))
        .catch((error) => console.log(error));
      axios
        .get("http://localhost:3000/wali/" + this.nik)
        .then((response) => (this.wali = response.data))
        .catch((error) => console.log(error));
    },
    simpan() {
      this.reservasi.no_mahrom = this.nik;
      this.reservasi.tgl_reservasi = this.tgl_reservasi;
      this.reservasi.jam_mula = "";
      this.reservasi.jam_final = "";
      this.reservasi.hadir = false;
      this.reservasi.tgl_kunjungan = this.value;
      if (this.reservasi.id_hari != null && this.reservasi.id_shift != null) {
        if (this.disabledSantri == "Sama" && this.moreWali != "Lebih") {
          axios
            .post("http://localhost:3000/reservasi", this.reservasi)
            .then()
            .catch((err) => console.log("Gagal", err));

          for (let index = 0; index < this.checkedWali.length; index++) {
            var element = this.checkedWali[index];
            this.reservasi_wali.id_wali = element;
            if (this.reservasiId.result == null) {
              this.reservasiId.result = { id: 0 };
              this.reservasi_wali.id_reservasi = this.reservasiId.result.id + 1;
              this.reservasi_santri.id_reservasi =
                this.reservasiId.result.id + 1;
            } else {
              this.reservasi_wali.id_reservasi = this.reservasiId.result.id + 1;
              this.reservasi_santri.id_reservasi =
                this.reservasiId.result.id + 1;
            }
            axios
              .post("http://localhost:3000/reservasi_wali", this.reservasi_wali)
              .then()
              .catch((err) => console.log("Gagal", err));
          }

          for (let index = 0; index < this.checkedSantri.length; index++) {
            var s = this.checkedSantri[index].id;
            this.reservasi_santri.id_santri = s;
            axios
              .post(
                "http://localhost:3000/reservasi_santri",
                this.reservasi_santri
              )
              .then(
                $(function () {
                  toastr.success("Data telah ditambah");
                }),
                this.$router.push({ path: "/reservasi" })
              )
              .catch((err) => console.log("Gagal", err));
          }
        }
      } else {
        $(function () {
          toastr.error("Tidak boleh ada data kosong!");
        });
      }
    },
    onChange(event) {
      axios
        .get("http://localhost:3000/hari/shift/" + event.target.value)
        .then((response) => (this.hari = response.data))
        .catch((this.hari = { data: "" }));

      axios
        .get("http://localhost:3000/shift/" + event.target.value)
        .then((response) => (this.checkShift = response.data))
        .catch((err) => console.log("Gagal", err));
    },
    statusSantri(event) {
      axios
        .get("http://localhost:3000/hari/shift/" + event.target.value)
        .then((response) => (this.check = response.data))
        .catch((err) => console.log("Gagal", err));
    },
    pilihSantri() {
      this.status = this.check.data[0].status_hari;
      if (this.status == this.checkedSantri[0].status) {
        (response) => (this.status = response.data);
      } else {
        (err) => console.log("Error : ", err);
        return false;
      }
    },
    info() {
      const date = moment(this.value).format("yyyy-MM-DD");
      for (let i = 0; i < this.informasi.data.length; i++) {
        const element = this.informasi.data[i];
        const from = moment(element.tanggal_mulai).format("yyyy-MM-DD");
        const to = moment(element.tanggal_akhir).format("yyyy-MM-DD");

        if (date >= from && date <= to) {
          return element.id;
        }
      }
    },
    mahrom(index) {
      return this.wali.data[index].no_mahrom;
    },
    waliR() {
      return this.wali.data[0].nama_wali;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/santri")
      .then((response) => (this.santri = response.data))
      .catch(function (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.go();
        }
      });
    axios
      .get("http://localhost:3000/shift")
      .then((response) => (this.shift = response.data))
      .catch(function (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.go();
        }
      });
    axios
      .get("http://localhost:3000/hari")
      .then((response) => (this.hari = response.data))
      .catch(function (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.go();
        }
      });
    axios
      .get("http://localhost:3000/reservasiId")
      .then((response) => (this.reservasiId = response.data))
      .catch(function (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.go();
        }
      });
    axios
      .get("http://localhost:3000/informasi")
      .then((response) => (this.informasi = response.data))
      .catch(function (error) {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.go();
        }
      });
  },
  computed: {
    disabledSantri() {
      let statusHari = this.status;
      if (statusHari != "") {
        let statusSantri = this.checkedSantri;
        let statusSantriKosong = [];
        if (statusSantri != statusSantriKosong) {
          if (statusSantri[0].status != statusHari) {
            statusSantri = "Tidak Sama";
            return statusSantri;
          } else {
            statusSantri = "Sama";
            return statusSantri;
          }
        }
      }
      return statusHari;
    },
    moreWali() {
      let statusWali = this.checkedWali;
      if (statusWali[2]) {
        statusWali = "Lebih";
        return statusWali;
      }
      return statusWali;
    },
  },
};
</script>