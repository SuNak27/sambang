import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/layouts/Login.vue";
import Dashboard from "../components/layouts/Dashboard.vue";
import Print from "../components/layouts/Print.vue";
import Beranda from "../views/Beranda.vue";
import SettingHari from "../views/SettingHari.vue";
import TambahHari from "../views/TambahHari.vue";
import EditHari from "../views/EditHari.vue";
import Shift from "../views/Shift.vue";
import TambahShift from "../views/TambahShift.vue";
import EditShift from "../views/EditShift.vue";
import Pertemuan from "../views/Pertemuan.vue";
import Reservasi from "../views/Reservasi.vue";
import TambahReservasi from "../views/TambahReservasi.vue";
import DetailReservasi from "../views/DetailReservasi.vue";
import Konfirmasi from "../views/Konfirmasi.vue";
import History from "../views/History.vue";
import Cetak from "../views/Cetak.vue";
import Informasi from "../views/Informasi.vue";
import TambahInformasi from "../views/TambahInformasi.vue";
import EditInformasi from "../views/EditInformasi.vue";
import axios from "axios";

axios.defaults.headers.common["X-Sambang-Token"] = JSON.parse(
  localStorage.getItem("token")
);

Vue.use(VueRouter);
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/print/:tanggal",
    name: "Print",
    component: Print,
  },
  {
    path: "/",
    component: Dashboard,
    beforeEnter: (to, form, next) => {
      axios
        .get("http://localhost:3000/user")
        .then(() => {
          next();
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem("token");
            next({ name: "Login" });
          }
        });
    },
    children: [
      {
        path: "",
        name: "Beranda",
        component: Beranda,
      },
      {
        path: "settingHari",
        name: "SettingHari",
        component: SettingHari,
      },
      {
        path: "tambah_hari",
        name: "TambahHari",
        component: TambahHari,
      },
      {
        path: "edit_hari/:id",
        name: "EditHari",
        component: EditHari,
      },
      {
        path: "shift",
        name: "Shift",
        component: Shift,
      },
      {
        path: "tambah_shift",
        name: "TambahShift",
        component: TambahShift,
      },
      {
        path: "edit_shift/:id",
        name: "EditShift",
        component: EditShift,
      },
      {
        path: "pertemuan",
        name: "Pertemuan",
        component: Pertemuan,
      },
      {
        path: "reservasi",
        name: "Reservasi",
        component: Reservasi,
      },
      {
        path: "tambah_reservasi",
        name: "TambahReservasi",
        component: TambahReservasi,
      },
      {
        path: "reservasi/:id",
        name: "DetailReservasi",
        component: DetailReservasi,
      },
      {
        path: "konfirmasi/:id",
        name: "Konfirmasi",
        component: Konfirmasi,
      },
      {
        path: "history",
        name: "History",
        component: History,
      },
      {
        path: "cetak",
        name: "Cetak",
        component: Cetak,
      },
      {
        path: "informasi",
        name: "Informasi",
        component: Informasi,
      },
      {
        path: "tambahInformasi",
        name: "TambahInformasi",
        component: TambahInformasi,
      },
      {
        path: "editInformasi/:id",
        name: "EditInformasi",
        component: EditInformasi,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const status = JSON.parse(localStorage.getItem("token"));
  if (to.name !== "Login" && status == null) next({ name: "Login" });
  if (to.name === "Login" && status) next({ path: "/" });
  else next();
});

export default router;
