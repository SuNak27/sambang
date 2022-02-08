<template>
  <div>
    <Header msg="Cetak Data Sambang" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title mt-2 text-white">
                  <b>Pilih Tanggal Kunjungan</b>
                </h3>
              </div>

              <div class="card-body">
                <div class="row justify-content-center">
                  <div class="col-md-6">
                    <label for="">Tanggal</label>
                    <input type="date" v-model="tanggal" class="form-control" />
                    <div class="row">
                      <div class="col-12 text-center">
                        <router-link
                          v-if="tanggal != ''"
                          :to="'/print/' + tanggal"
                          target="_blank"
                          class="btn btn-success mt-3"
                        >
                          <i class="fas fa-print"></i> Print
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Cetak",
  components: {
    Header,
  },
  data() {
    return {
      tanggal: "",
    };
  },
};
</script>