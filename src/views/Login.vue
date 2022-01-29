<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="">
          <img src="@/assets/img/logo.png" class="mb-2" width="100px" alt="" />
          <h2><b>Login Administrator</b></h2>
          <p class="it">&copy; IT Center Pondok Pesantren Nurul Jadid</p>
        </a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Login Admin</p>

          <form action="" v-on:submit.prevent>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                v-model="username"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-at"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                :type="type"
                class="form-control"
                placeholder="Password"
                v-model="password"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span
                    :class="icon"
                    style="cursor: pointer"
                    @click="show"
                  ></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <!-- <div class="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label for="remember" class="ml-2">Remember Me </label>
                </div> -->
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button
                  type="submit"
                  class="btn btn-primary btn-block"
                  @click="simpan()"
                >
                  Simpan
                </button>
              </div>
              <!-- /.col -->
            </div>
          </form>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
    <!-- /.login-box -->
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import toastr from "admin-lte/plugins/toastr/toastr.min";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      type: "password",
      icon: "fas fa-eye",
    };
  },
  methods: {
    simpan() {
      if (this.username != "" && this.password != "") {
        axios
          .post("/login", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem(
                "token",
                JSON.stringify(response.data.token)
              );
              localStorage.setItem("user", JSON.stringify(response.data.role));
              sessionStorage.setItem("role", response.data.role);
              sessionStorage.setItem("user", response.data.nama);

              this.$router.go();
              // this.$router.push({ name: "Beranda" });
              toastr.success("Berhasil");
            }
          })
          .catch((err) => {
            toastr.error(err.response.data.message);
          });
      } else {
        $(function () {
          toastr.error(
            "Login gagal, Pastikan telah mengisi username dan password!"
          );
        });
      }
    },
    show() {
      if (this.type === "password") {
        this.type = "text";
        this.icon = "fas fa-eye-slash";
      } else {
        this.type = "password";
        this.icon = "fas fa-eye";
      }
    },
  },
};
</script>

<style scoped>
.it {
  font-size: 15px;
}
</style>
