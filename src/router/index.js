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
    meta: {
      requiresAuth: true,
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
        meta: {
          is_admin: true,
        },
      },
      {
        path: "tambah_hari",
        name: "TambahHari",
        component: TambahHari,
        meta: {
          is_admin: true,
        },
      },
      {
        path: "edit_hari/:id",
        name: "EditHari",
        component: EditHari,
        meta: {
          is_admin: true,
        },
      },
      {
        path: "shift",
        name: "Shift",
        component: Shift,
        meta: {
          is_admin: true,
        },
      },
      {
        path: "tambah_shift",
        name: "TambahShift",
        component: TambahShift,
        meta: {
          is_admin: true,
        },
      },
      {
        path: "edit_shift/:id",
        name: "EditShift",
        component: EditShift,
        meta: {
          is_admin: true,
        },
      },
      {
        path: "pertemuan",
        name: "Pertemuan",
        component: Pertemuan,
        meta: {
          is_admin: true,
        },
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
        meta: {
          is_admin: true,
        },
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
        meta: {
          is_admin: true,
        },
      },
      {
        path: "tambahInformasi",
        name: "TambahInformasi",
        component: TambahInformasi,
        meta: {
          is_admin: true,
        },
      },
      {
        path: "editInformasi/:id",
        name: "EditInformasi",
        component: EditInformasi,
        meta: {
          is_admin: true,
        },
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
  const user = JSON.parse(localStorage.getItem("user"));
  if (to.name !== "Login" && status == null) {
    next({ name: "Login" });
  } else if (to.name === "Login" && status) {
    next({ path: "/" });
  } else {
    if (to.matched.some((record) => record.meta.is_admin)) {
      if (user == "sysadmin") {
        next();
      } else {
        next({ path: "/" });
      }
    }
    next();
  }
});

export default router;
