<template>
  <a-row>
    <a-col :span="12"
      ><h1>Total Cost of {{ yearString }} : {{ totalCostOfYear }}</h1></a-col
    >
    <a-col :span="12">
      <a-dropdown>
        <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
          Filter by Year <a-icon type="down" />
        </a>
        <a-menu slot="overlay" @click="selectYearFilter">
          <a-menu-item key="2021">
            2021
          </a-menu-item>
          <a-menu-item key="2020">
            2020
          </a-menu-item>
          <a-menu-item key="2019">
            2019
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-col>
    <a-col :span="24">
      <Chart :option="option" style="height:400px" />
    </a-col>
  </a-row>
</template>

<script>
import Chart from "../../components/Chart";
import { getAllReceipt_api } from "../../api/api";
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      option: {
        title: {
          text: "Cost by month",
          textStyle: {
            fontWeight: "bold",
          },
        },
        tooltip: {},
        xAxis: {
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yAxis: [
          {
            type: "value",
            show: true,
            axisLabel: {
              fontSize: 14,
              color: "#333",
            },
            splitLine: {
              show: false, //是否顯示分隔線。
            },
          },
        ],
        series: [
          {
            name: "monthly cost",
            type: "bar",
            barWidth: "30%",
            data: [],
          },
        ],
      },
      //the receipts for displaying and controlling
      allReceipts: [],
      displayReceipts: [],

      //year
      yearString: "",
    };
  },

  async created() {
    //load all receipt of the user
    const all_receipt = await axios
      .get(getAllReceipt_api, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        return res.data.result;
      });

    this.displayReceipts = all_receipt.reverse();
    this.allReceipts = all_receipt.reverse();
    this.list_loading = false;
    setTimeout(() => {
      this.monthFilter("2020");
      this.yearString = "2020";
    }, 0);
  },
  methods: {
    getMonthTotal(startDate, stopDate, arr) {
      var total = 0;
      var currentDate = startDate;
      for (let i = 0; i < arr.length; i++) {
        currentDate = arr[i].datetime;
        while (currentDate <= stopDate) {
          if (currentDate < startDate) {
            break;
          } else {
            total += arr[i].totalcost;
            break;
          }
        }
      }
      return total;
    },
    monthFilter(yearStr) {
      for (let i = 1; i < 13; i++) {
        if (i < 10) {
          i = "0" + String(i);
        }
        let dateStr = yearStr + "-" + i;
        const startOfMonth = moment(dateStr)
          .clone()
          .startOf("month")
          .format("YYYY-MM-DD");
        const endOfMonth = moment(dateStr)
          .clone()
          .endOf("month")
          .format("YYYY-MM-DD");
        const costInMonth = this.getMonthTotal(
          startOfMonth,
          endOfMonth,
          this.allReceipts
        );
        console.log(costInMonth);
        this.option.series[0].data.push(costInMonth.toFixed(2));
      }
    },
    selectYearFilter(key) {
      const monthStr = String(key.key);
      this.yearString = monthStr;
      this.option.series[0].data = [];
      this.monthFilter(monthStr);
    },
  },
  computed: {
    totalCostOfYear: function() {
      return this.option.series[0].data.reduce((a, b) => Number(a) + Number(b));
    },
  },
  components: {
    Chart,
  },
};
</script>

<style></style>
