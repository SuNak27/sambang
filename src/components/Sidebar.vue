<template>
  <!-- Main Sidebar Container -->
  <aside
    class="main-sidebar main-sidebar-custom sidebar-dark-primary elevation-4"
  >
    <!-- Brand Logo -->
    <router-link to="/" class="brand-link">
      <img
        src="@/assets/img/logo.png"
        alt="Nurul Jadid"
        class="brand-image img-circle"
      />
      <span class="brand-text font-weight-light">Sambang Santri</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image my-auto">
          <!-- <img
            :src="require(`${foto}`)"
            class="img-circle mt-2 elevation-2"
            alt="User"
          /> -->
        </div>
        <div class="info">
          <span class="text-white">Selamat Datang,</span>
          <a href="" class="d-block"
            ><b>
              {{ username }}
            </b></a
          >
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-header">Silahkan Pilih Menu</li>
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>Beranda</p>
            </router-link>
          </li>
          <li class="nav-item" v-if="role == 'sysadmin'">
            <a href="" class="nav-link">
              <i class="nav-icon fas fa-sliders-h"></i>
              <p>
                Pengaturan
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/settingHari" class="nav-link">
                  <i class="fas fa-ellipsis-v nav-icon"></i>
                  <p>Setting Hari</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/shift" class="nav-link">
                  <i class="fas fa-ellipsis-v nav-icon"></i>
                  <p>Setting Shift</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/pertemuan" class="nav-link">
                  <i class="fas fa-ellipsis-v nav-icon"></i>
                  <p>Setting Pertemuan</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link">
              <i class="nav-icon fas fa-edit"></i>
              <p>
                Data Sambang Santri
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="./reservasi" class="nav-link">
                  <i class="fas fa-ellipsis-v nav-icon"></i>
                  <p>Reservasi Sambang</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/history" class="nav-link">
                  <i class="fas fa-ellipsis-v nav-icon"></i>
                  <p>Histori Sambang</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link to="/cetak" class="nav-link">
              <i class="nav-icon fas fa-print"></i>
              <p>Cetak Data Sambang</p>
            </router-link>
          </li>
          <li class="nav-item" v-if="role == 'sysadmin'">
            <router-link to="/informasi" class="nav-link">
              <i class="nav-icon fas fa-info-circle"></i>
              <p>Informasi</p>
            </router-link>
          </li>
          <li class="nav-item">
            <a
              style="cursor: pointer"
              class="nav-link"
              data-toggle="modal"
              data-target="#modal-default"
            >
              <i class="nav-icon fas fa-sign-out-alt"></i>
              <p>Logout</p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>

    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      username: sessionStorage.getItem("user"),
      // foto: localStorage.getItem("foto"),
      role: sessionStorage.getItem("role"),
    };
  },
};
</script>