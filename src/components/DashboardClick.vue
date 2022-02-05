<template>
  <div id="clickright" v-bind:style="location">
    <router-link class="item" :to="/reservasi/ + reservasi.id">
      Detail</router-link
    >
    <div class="item">Edit</div>
    <div class="item">Delete</div>
  </div>
</template>

<script>
export default {
  name: "DashboardClick",
  props: {
    loc: Object,
    sambang: Object,
  },
  data() {
    return {
      location: {},
      reservasi: [],
    };
  },
  created() {
    this.location = this.loc;
    this.reservasi = this.sambang;
  },
};
</script>

<style scoped>
#clickright {
  animation: fade 200ms;
}
#clickright .item {
  display: block;
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 15px;
  color: rgb(189, 189, 189);
}

#clickright .item:hover {
  background-color: #555;
  /* background-color: rgb(61, 61, 61); */
  color: white;
}

@keyframes fade {
  0% {
    /* opacity: 0; */
    transform: scale(0);
    transform-origin: top left;
  }
  100% {
    /* opacity: 1; */
    transform: scale(1);
    transition: transform 200ms ease-in-out;
  }
}
</style>