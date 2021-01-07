<template>
  <div style="display: inline-block; position: relative">
    <vue-datepicker-local v-model="time" style=""></vue-datepicker-local>
  </div>
</template>
 
<script>
import VueDatepickerLocal from "vue-datepicker-local";

export default {
  name: "ChooseTime2",

  components: {
    VueDatepickerLocal,
  },
  data() {
    return {
      time: new Date(),
    //   range: [new Date(), new Date()],
      emptyTime: "",
      emptyRange: [],
      local: {
        dow: 0, // Sunday is the first day of the week
        hourTip: "Select Hour", // tip of select hour
        minuteTip: "Select Minute", // tip of select minute
        secondTip: "Select Second", // tip of select second
        yearSuffix: "", // suffix of head year
        monthsHead: "January_February_March_April_May_June_July_August_September_October_November_December".split(
          "_"
        ), // months of head
        months: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), // months of panel
        weeks: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), // weeks,
        cancelTip: "cancel",
        submitTip: "confirm",
      },
    };
  },
  methods: {
    //disable the weekend
    disabledDate(time) {
      var day = time.getDay();
      return day === 0 || day === 6;
    },
  },
};
</script> 