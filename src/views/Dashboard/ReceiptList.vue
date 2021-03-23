<template>
  <div style="margin-top:20px">
    <a-row>
      <a-col :span="12">
        <NewReceiptButton />
      </a-col>
      <a-col :span="10">
        <a-month-picker
          placeholder="Select month filter"
          @change="monthFilter"
        />
        <a-button style="margin-left:5px" @click="cancelFilter"
          >cancel filter</a-button
        >
      </a-col>

      <!-- list area start-->
      <a-col :span="14">
        <a-list
          class="loadmore-list"
          :loading="list_loading"
          item-layout="horizontal"
          :data-source="displayReceipts"
        >
          <div
            v-if="showLoadingMore"
            slot="loadMore"
            :style="{
              textAlign: 'center',
              marginTop: '12px',
              height: '32px',
              lineHeight: '32px',
            }"
          >
            <a-spin v-if="loadingMore" />
            <a-button v-else @click="onLoadMore">
              loading more
            </a-button>
          </div>

          <a-list-item slot="renderItem" slot-scope="item, index">
            <!-- edit receipt -->
            <a slot="actions"><EditReceipt :item="item"/></a>

            <!-- delete receipt -->
            <a slot="actions">
              <!-- drop @cancel="cancelDelete" -->
              <a-popconfirm
                title="Are you sure delete this receipt record?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="deleteReceipt(index)"
                >delete
              </a-popconfirm></a
            >

            <!-- show receipt -->
            <a-list-item-meta
              :description="`consume date time: ` + item.datetime"
            >
              <a slot="title"> <ShowReceipt :item="item"/></a>
            </a-list-item-meta>

            <div>
              Total Cost:
              {{ item.totalcost.toFixed(2) }}
            </div>
          </a-list-item>
        </a-list>
      </a-col>

      <!-- list area end-->
    </a-row>
  </div>
</template>

<script>
import axios from "axios";
import { getAllReceipt_api, deleteReceipt_api } from "../../api/api";
import NewReceiptButton from "../../components/NewReceipt";
import EditReceipt from "../../components/EditReceipt";
import ShowReceipt from "../../components/ShowReceipt";
import moment from "moment";

export default {
  data() {
    return {
      //loading more list controller
      list_loading: true,
      loadingMore: false,
      //change the "showLoadingMore" into Computed -->receipts.length<10
      // showLoadingMore: true,

      //the receipts for displaying and controlling
      allReceipts: [],
      displayReceipts: [],

      //init display item
      displayDetail: {},
      showDisplayDetail: false,
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
  },
  methods: {
    onLoadMore() {
      this.loadingMore = true;
      this.getData((res) => {
        this.data = this.data.concat(res.results);
        this.loadingMore = false;
        this.$nextTick(() => {
          window.dispatchEvent(new Event("resize"));
        });
      });
    },
    // showReceipt(index) {
    //   this.displayDetail = this.receipts[index];
    //   this.showDisplayDetail = true;
    // },
    handleShowDisplayDetail() {
      this.showDisplayDetail = false;
      this.displayDetail = {};
    },
    async deleteReceipt(index) {
      const deleteItemID = this.displayReceipts[index].id;
      console.log(deleteItemID);
      await axios
        .post(
          deleteReceipt_api,
          { data_id: deleteItemID },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        )
        .then(() => {
          this.$router.go(this.$router.currentRoute);
        });
    },

    //for filter by month picker
    monthFilter(date) {
      const startOfMonth = moment(date)
        .clone()
        .startOf("month")
        .format("YYYY-MM-DD");
      const endOfMonth = moment(date)
        .clone()
        .endOf("month")
        .format("YYYY-MM-DD");

      this.displayReceipts = this.getDates(
        startOfMonth,
        endOfMonth,
        this.allReceipts
      );
    },
    getDates(startDate, stopDate, arr) {
      var dateArray = new Array();
      var currentDate = startDate;
      for (let i = 0; i < arr.length; i++) {
        currentDate = arr[i].datetime;
        while (currentDate <= stopDate) {
          if (currentDate < startDate) {
            break;
          } else {
            dateArray.push(arr[i]);
            break;
          }
        }
      }
      return dateArray;
    },
    //cancel the filter
    cancelFilter() {
      this.displayReceipts = this.allReceipts;
    },
  },
  computed: {
    showLoadingMore: function() {
      if (this.displayReceipts.length < 10) {
        return false;
      } else {
        return true;
      }
    },
  },
  components: {
    NewReceiptButton,
    EditReceipt,
    ShowReceipt,
  },
};
</script>

<style>
.loadmore-list {
  min-height: 350px;
}
</style>
