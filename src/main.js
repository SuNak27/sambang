import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "vuex";

import "admin-lte/plugins/fontawesome-free/css/all.min.css";
import "admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "admin-lte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css";
import "admin-lte/plugins/datatables-buttons/css/buttons.bootstrap4.min.css";
import "admin-lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css";
import "admin-lte/plugins/toastr/toastr.css";
import "admin-lte/dist/css/adminlte.min.css";

import "admin-lte/plugins/jquery/jquery.min";
import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.min";
import "admin-lte/plugins/datatables/jquery.dataTables.min";
import "admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min";
import "admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min";
import "admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min";
import "admin-lte/plugins/datatables-buttons/js/dataTables.buttons.min";
import "admin-lte/plugins/datatables-buttons/js/buttons.bootstrap4.min";
import "admin-lte/plugins/jszip/jszip.min";
import "admin-lte/plugins/pdfmake/pdfmake.min";
import "admin-lte/plugins/pdfmake/vfs_fonts";
import "admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min";
import "admin-lte/plugins/datatables-buttons/js/buttons.html5.min";
import "admin-lte/plugins/datatables-buttons/js/buttons.print.min";
import "admin-lte/plugins/datatables-buttons/js/buttons.colVis.min";
import "admin-lte/dist/js/adminlte";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
