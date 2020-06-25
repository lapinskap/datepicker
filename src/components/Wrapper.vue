<template>
<div>
    <div class="col-sm-12">
      <h3>Datepicker made with vue.js</h3>
      <Datepicker :disabledDates="disabledDates"></Datepicker>
      <div class="settings">
        <h5>Settings</h5>
        <div class="form-group">
          <label>Disabled to:</label>
          <Datepicker v-on:selected="disableTo"></Datepicker>
        </div>
        <div class="form-group">
          <label>Disabled from:</label>
          <Datepicker v-on:selected="disableFrom"></Datepicker>
        </div>
        <div class="form-group">
          <label>Disabled Days of Month:</label>
          <input type="text" value="" v-on:change="setDisabledDays">
        </div>
        <pre>disabledDates: {{ disabledDates }}</pre>

        <h5>Date picker + disabled dates using disabledDates</h5>
        <Datepicker :disabledDates="disabledDates"></Datepicker>
      </div>
    </div>

    <div class="example">
    <h5>Date picker + disabled dates using disabledFn</h5>
        <Datepicker :disabledDates="disabledFn"></Datepicker>
    </div>
</div>
</template>
<script>
import Datepicker from './Datepicker.vue'

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      format: "d MMMM yyyy",
      disabledDates: {},
      disabledFn: {
        customPredictor(date) {
          if (date.getDate() % 3 === 0) {
            return true;
          }
        }
      },
      highlightedFn: {
        customPredictor(date) {
          if (date.getDate() % 4 === 0) {
            return true;
          }
        }
      },
      highlighted: {},
      eventMsg: null,
      vModelExample: null,
      changedMonthLog: []
    };
  },
  methods: {
    disableTo(val) {
      if (typeof this.disabled.to === "undefined") {
        this.disabledDates = {
          to: null,
          daysOfMonth: this.disabledDates.daysOfMonth,
          from: this.disabled.from
        };
      }
      this.disabledDates.to = val;
    },
    disableFrom(val) {
      if (typeof this.disabledDates.from === "undefined") {
        this.disabled = {
          to: this.disabledDates.to,
          daysOfMonth: this.disabled.daysOfMonth,
          from: null
        };
      }
      this.disabledDates.from = val;
    },
    setDisabledDays(elem) {
      if (elem.target.value === "undefined") {
        return;
      }
      this.disabledDates = elem.target.value;
    },
    openPicker() {
      this.$refs.programaticOpen.showCalendar();
    },
    logChangedMonth(date) {
      this.changedMonthLog.push(date)
    }
  }
}
</script>
<style scoped>

</style>