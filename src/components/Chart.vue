<template>
  <div class="">
    <VChart
      :autoresize="true"
      class="chart"
      style="height: 400px"
      :option="option"
    />
  </div>
</template>

<script>
import VChart from "vue-echarts";

export default {
  name: "Chart",
  components: {
    VChart,
  },
  props: ["value"],
  data() {
    return {
      data: [],
      valueList: [],
      groupedData: [],
      option: {
        xAxis: {
          type: "category",
          data: [],
          boundaryGap: false,
          onZero: true,
        },
        title: [
          {
            left: "center",
            text: "Data kunjungan santri",
          },
        ],
        toolbox: {
          show: true,
          orient: "vertical",
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            saveAsImage: {},
          },
        },
        legend: {
          top: "7%",
        },
        tooltip: {
          trigger: "axis",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Santri Putra",
            data: [],
            type: "line",
            symbol: "none",
            areaStyle: {
              color: "blue",
            },
            emphasis: {
              focus: "series",
            },
            smooth: true,
          },
          {
            name: "Santri Putri",
            data: [],
            type: "line",
            symbol: "none",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            smooth: true,
          },
        ],
      },
    };
  },
  methods: {
    refreshChartView() {
      this.groupedData = this.date(this.data, "tgl_kunjungan");

      var jumlahsp = 0;
      var jumlahspu = 0;
      const value = Object.values(this.groupedData);
      for (let i = 0; i < value.length; i++) {
        const s = value[i];

        for (let j = 0; j < s.length; j++) {
          const santri = s[j];
          for (let k = 0; k < santri.length; k++) {
            const santries = santri[k];
            if (santries.santri.status == "Santri") {
              jumlahsp += 1;
            } else {
              jumlahspu += 1;
            }
          }
        }
        this.option.series[0].data.push(jumlahsp);
        this.option.series[1].data.push(jumlahspu);
        jumlahspu = 0;
        jumlahsp = 0;
      }

      this.option.xAxis.data = Object.keys(this.groupedData);
    },
    date(arr, prop) {
      var grouped = {};
      for (var i = 0; i < arr.length; i++) {
        var p = arr[i][prop];
        if (!grouped[p]) {
          grouped[p] = [];
        }
        grouped[p].push(arr[i].reservasi_santris);
      }
      return grouped;
    },
  },
  watch: {
    value: {
      handler: function (value) {
        this.data = value;
        this.refreshChartView();
      },
    },
  },
  created() {
    this.data = this.value;
  },
};
</script>