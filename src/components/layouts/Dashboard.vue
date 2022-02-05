<template>
  <div id="app">
    <div class="wrapper">
      <Navbar />
      <Sidebar />

      <div class="content-wrapper">
        <router-view></router-view>
      </div>

      <div class="modal fade" id="modal-default">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Konfirmasi Logout</h4>
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
              <p>Apakah anda yakin ingin Logout?</p>
            </div>
            <div class="modal-footer justify-content-between">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
              >
                Batal
              </button>
              <button
                type="submit"
                data-dismiss="modal"
                @click="logout"
                class="btn btn-danger"
              >
                Logout
              </button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
      </aside>
      <!-- /.control-sidebar -->
    </div>
  </div>
</template>
<script>
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";
// import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    Sidebar,
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      this.$router.push("/login");
    },
  },
};
</script>
