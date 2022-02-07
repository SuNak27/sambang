<template>
  <div>
    <Header msg="Tambah Reservasi" />

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title text-white">
                  <b>Tambah Reservasi</b>
                </h3>
              </div>

              <form action="" class="form-horizontal" v-on:submit.prevent>
                <div class="card-body">
                  <div class="form-group row">
                    <label for="" class="col-md-4">No Mahrom</label>
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
                        v-if="nik == '' || dataWali.no_mahrom != nik"
                        class="form-control"
                      />
                      <input
                        type="text"
                        name="nama"
                        id="nama"
                        readonly
                        class="form-control"
                        v-model="dataWali.nama_wali"
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
                            @change="filterHari"
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
                        v-model="reservasi.nama_hari"
                        class="custom-select"
                        v-if="reservasi.id_shift == null"
                      >
                        <option disabled selected value="">
                          -- Pilih Shift Terlebih Dahulu --
                        </option>
                      </select>
                      <select
                        @change="checkStatus"
                        v-model="reservasi.id_hari"
                        class="custom-select"
                        v-else
                      >
                        <option disabled selected value="">
                          -- Pilih Hari Yang Tersedia --
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
                        v-if="reservasi.id_hari && nik != ''"
                        v-model="reservasi.tgl_kunjungan"
                        :min="min"
                        reset-button
                        close-button
                        :date-disabled-fn="dateDisabled"
                        @input="moreSambang()"
                      ></b-form-datepicker>
                      <b-form-datepicker
                        v-else
                        reset-button
                        close-button
                        readonly
                      ></b-form-datepicker>
                      <div
                        v-if="
                          reservasi.tgl_kunjungan &&
                          nik != '' &&
                          mahrom.length != 0
                        "
                      >
                        <Info
                          :value="info()"
                          :data="this.mahrom"
                          :date="reservasi.tgl_kunjungan"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-md-4">Data Santri</label>
                    <div class="col-md-8">
                      <table class="table table-hover table-responsive-sm">
                        <thead class="thead-dark">
                          <th>No</th>
                          <th>No Mahrom</th>
                          <th>Nama Santri</th>
                          <th>Wilayah</th>
                          <th>Aksi</th>
                        </thead>
                        <tbody>
                          <tr v-if="nik == '' || mahromSantri != nik">
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
                                Hari {{ check.data.nama_hari }}
                                {{ check.data.shift.nama_shift }} Khusus
                                {{
                                  check.data.status_hari == "Santri"
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
                      <table class="table table-hover table-responsive-sm">
                        <thead class="thead-dark">
                          <th>No</th>
                          <th>No Mahrom</th>
                          <th>Nama Mahrom</th>
                          <th>Status Mahrom</th>
                          <th>Aksi</th>
                        </thead>
                        <tbody>
                          <tr v-if="nik == '' || dataWali.no_mahrom != nik">
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
                                Maksimal Hanya Boleh Memilih
                                {{ pertemuan.batas_tamu }} Wali Santri
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
import axios from "axios";
import moment from "moment";
import toastr from "admin-lte/plugins/toastr/toastr.min";

export default {
  name: "TambahReservasi",
  components: {
    Header,
    Info,
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);
    return {
      min: minDate,
      nik: "",
      dataWali: {},
      reservasi: {
        tgl_reservasi: moment().format("yyyy-MM-DD"),
      },
      reservasiId: {},
      reservasi_wali: {},
      reservasi_santri: {},
      shift: {
        data: [],
      },
      hari: {
        data: [],
      },
      checkShift: {},
      check: {},
      informasi: [],
      status: "",
      checkedSantri: [],
      status_santri: "",
      santri: [],
      mahromSantri: "",
      checkedWali: [],
      wali: [],
      liburSambang: false,
      pertemuan: {},
      mahrom: [],
      sambang: 0,
      groupedData: [],
      tgl_kunjungan: "",
    };
  },
  methods: {
    search() {
      axios
        .get("/wali/" + this.nik)
        .then((response) => {
          this.dataWali = response.data.data[0];
          this.wali = response.data;
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.dataWali = "";
          }
        });
      axios
        .get("/santri/" + this.nik)
        .then((response) => {
          this.mahromSantri = response.data.data[0].no_mahrom;
          this.santri = response.data;
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.santri = "";
          }
        });

      axios
        .get("/reservasi/mahrom/" + this.nik)
        .then((response) => (this.mahrom = response.data))
        .catch((error) => {
          if (error.response.status === 400) {
            this.mahrom = [];
          }
        });
    },
    filterHari(event) {
      axios
        .get("/hari/shift/" + event.target.value)
        .then((response) => {
          const data = [];
          for (let i = 0; i < response.data.data.length; i++) {
            const element = response.data.data[i];
            if (element.status == "Aktif") {
              data.push(element);
            }
          }
          this.hari.data = data;
        })
        .catch();
      axios
        .get("/shift/" + event.target.value)
        .then((response) => {
          this.checkShift = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkStatus(event) {
      axios
        .get("/hari/" + event.target.value)
        .then((response) => {
          this.check = response.data;
          this.status = response.data.data.status_hari;
          if (this.reservasi.tgl_kunjungan) {
            this.reservasi.tgl_kunjungan = "";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    info() {
      const date = moment(this.reservasi.tgl_kunjungan).format("yyyy-MM-DD");
      for (let i = 0; i < this.informasi.data.length; i++) {
        const element = this.informasi.data[i];
        const from = moment(element.tanggal_mulai).format("yyyy-MM-DD");
        const to = moment(element.tanggal_akhir).format("yyyy-MM-DD");

        if (date >= from && date <= to) {
          this.liburSambang = true;
          return element.id;
        } else {
          this.liburSambang = false;
        }
      }
      return this.reservasi.tgl_kunjungan;
    },
    pilihSantri() {
      if (this.checkedSantri.length >= 1) {
        this.status_santri = this.checkedSantri[0].status;
      } else {
        this.status_santri = "";
      }
    },
    dateDisabled(ymd, date) {
      const weekday = date.getDay();
      if (this.check != "") {
        if (this.check.data.nama_hari == "Minggu") {
          return weekday != 0;
        } else if (this.check.data.nama_hari == "Senin") {
          return weekday != 1;
        } else if (this.check.data.nama_hari == "Selasa") {
          return weekday != 2;
        } else if (this.check.data.nama_hari == "Rabu") {
          return weekday != 3;
        } else if (this.check.data.nama_hari == "Kamis") {
          return weekday != 4;
        } else if (this.check.data.nama_hari == "Sabtu") {
          return weekday != 6;
        } else if (this.check.data.nama_hari == "Jum'at") {
          return weekday != 5;
        }
      } else {
        return weekday;
      }
    },
    simpan() {
      this.reservasi.no_mahrom = this.nik;
      this.reservasi.jam_mula = "";
      this.reservasi.jam_final = "";
      this.reservasi.hadir = "";
      if (
        this.reservasi.id_hari != null &&
        this.reservasi.id_shift != null &&
        this.liburSambang == false &&
        this.sambang < this.pertemuan.batas_sambang &&
        this.reservasi.tgl_kunjungan != null
      ) {
        if (
          this.disabledSantri == "Sama" &&
          this.status_santri != "" &&
          this.moreWali != "Lebih" &&
          this.moreWali.length != 0
        ) {
          axios
            .post("/reservasi", this.reservasi)
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
              .post("/reservasi_wali", this.reservasi_wali)
              .then()
              .catch((err) => console.log("Gagal", err));
          }

          for (let index = 0; index < this.checkedSantri.length; index++) {
            var s = this.checkedSantri[index].id;
            this.reservasi_santri.id_santri = s;
            axios
              .post("/reservasi_santri", this.reservasi_santri)
              .then()
              .catch((err) => console.log("Gagal", err));
          }
          toastr.success("Data telah ditambah");
          this.$router.push({ path: "reservasi" });
        } else {
          toastr.error("Pastikan telah mengisi data yang sesuai");
        }
      } else {
        toastr.error(
          "Terdapat data yang salah/kosong. Silahkan periksa kembali"
        );
      }
    },
    moreSambang() {
      if (this.mahrom.length != 0) {
        this.groupedData = this.tgl(this.mahrom.data, "tgl_kunjungan");
        return this.sambang;
      } else {
        return this.sambang;
      }
    },
    tgl(arr, prop) {
      var grouped = {};
      for (var i = 0; i < arr.length; i++) {
        var p = arr[i][prop];
        if (!grouped[p]) {
          grouped[p] = [];
        }

        for (let j = 0; j < Object.keys(grouped).length; j++) {
          const element = Object.keys(grouped)[j];
          const getDate = moment(element).format("MM");
          const kunjungan = moment(this.reservasi.tgl_kunjungan).format("MM");
          if (getDate == kunjungan) {
            grouped[p].push(moment(element).format("MM"));
          }
        }
      }
      grouped[p].sort();

      var current = null;
      var cnt = 0;
      for (var o = 0; o < grouped[p].length; o++) {
        if (grouped[p][o] != current) {
          if (cnt > 0) {
            this.sambang = cnt;
            return grouped;
          }
          current = grouped[p][o];
          cnt = 1;
        } else {
          cnt++;
        }
      }
      if (cnt > 0) {
        this.sambang = cnt;
        return grouped;
      } else {
        this.sambang = 0;
      }
      return grouped;
    },
  },
  mounted() {
    axios
      .get("/shift")
      .then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          const element = response.data.data[i];
          if (element.status == "Aktif") {
            this.shift.data.push(element);
          }
        }
      })
      .catch();

    axios
      .get("/informasi")
      .then((response) => (this.informasi = response.data))
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          toastr.error("Login expired. refresh halaman");
          this.$router.push({ path: "/login" });
        }
      });

    axios
      .get("/reservasiId")
      .then((response) => (this.reservasiId = response.data))
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          this.$router.push({ path: "/login" });
        }
      });
    axios
      .get("/pertemuan")
      .then((response) => (this.pertemuan = response.data.data[0]))
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          this.$router.push({ path: "/login" });
        }
      });
  },
  computed: {
    disabledSantri() {
      if (this.status != this.status_santri && this.status_santri != "") {
        return "Tidak Sama";
      } else {
        return "Sama";
      }
    },
    moreWali() {
      let statusWali = this.checkedWali;
      const batas = this.pertemuan.batas_tamu;
      if (statusWali.length > batas) {
        statusWali = "Lebih";
        return statusWali;
      }
      return statusWali;
    },
  },
};
</script>