<template>
  <div id="vmheader">
    <h1 v-model="getDate">{{ getDate }}新型冠状肺炎实时监测</h1>
    <ZpTime class="time"></ZpTime>
  </div>
</template>

<script>
import ZpTime from "./common/ZpTime.vue";
// import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "vmheader",
  data:{
      getDate:''
  },
  watch: {
    watchDate(val) {
      console.log(111, val);
      this.getDate = val;
      this.$forceUpdate;
      console.log(111, this.getDate);
      console.log(111, this.getDate);
    },
  },
  computed: {
    stamp() {
      return this.$store.getters.getChangedDate;
    },
    getDate: {
      get: function () {
        var stamp = this.stamp;
        var date = new Date(this.stamp);
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        return Y + M + D;
      },
      set: function (v) {
        return v;
      },
    },
    watchDate() {
      return this.stamp;
    },
  },
  components: {
    ZpTime,
  },
  // methods:{
  //   reload() {
  //           this.$forceUpdate()
  //       }
  // }
};
</script>
<style scoped>
#vmheader {
  height: 100px;
  position: relative;
  background: url(~assets/image/head_bg.png) no-repeat top center;
  background-size: 100% 100%; /* 制定背景图像大小 */
}

#vmheader h1 {
  color: white;
  font-size: 38px;
  line-height: 80px;
  text-align: center;
}

.time {
  position: absolute;
  top: 0;
  right: 30px;
}
</style>
