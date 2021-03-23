<template>
  <div>
    <a @click="showModal">edit</a>
    <!-- :confirm-loading="confirmLoading" -->
    <a-modal v-model="visible" title="Edit previous receipt" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          Return
        </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
        >
          Update
        </a-button>
        <!-- <a-button @click="testing">testing</a-button> -->
      </template>

      <a-form-model
        :model="newReceipt"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        ::rules="rules"
      >
        <a-form-model-item label="Receipt ID" prop="newReceiptID">
          <a-input v-model="newReceipt.id" />
        </a-form-model-item>
        <a-form-model-item label="Store of consume" prop="store">
          <a-input v-model="newReceipt.store" />
        </a-form-model-item>
        <a-form-model-item label="Add tag for this receipt">
          <a-input v-model="newReceipt.tag" :placeholder="item.tag" />
        </a-form-model-item>

        <a-form-model-item label="Select Date and time" prop="date">
          <!-- :show-time="{ defaultValue: originalTime }" -->
          <a-date-picker
            style="width: 100%；"
            @change="dateChange"
            :showTime="true"
            :placeholder="item.datetime"
          />
        </a-form-model-item>

        <!-- 測試動態新增選項 -->
        <!-- 在 a-form-model-item的標籤中先刪掉      :prop="'domains.' + index + '.value'" -->
        <a-form-model-item
          v-for="(purchase_item, index) in newReceipt.purchase_items"
          :key="purchase_item.index"
          v-bind="index === 0 ? formItemLayout : formItemLayout"
          :label="index === 0 ? 'Items' : 'Items'"
          :prop="'purchase_items.' + index"
          :rules="{
            required: true,
            message: 'Purchase items can not be null',
            trigger: 'blur',
          }"
        >
          <a-input
            v-model="purchase_item.item"
            placeholder="product name"
            style="width: 30%; margin-right: 8px"
          />
          <a-input
            v-model="purchase_item.cost"
            placeholder="single cost"
            style="width: 30%; margin-right: 8px"
          />
          <a-select
            style="width: 20%"
            placeholder="count"
            v-model="purchase_item.count"
          >
            <a-select-option v-for="i in 25" :key="i">
              {{ i }}
            </a-select-option>
          </a-select>
          <a-icon
            v-if="newReceipt.purchase_items.length > 1"
            class="dynamic-delete-button"
            type="minus-circle-o"
            :disabled="newReceipt.purchase_items.length === 1"
            @click="removeItem(purchase_item)"
          />
        </a-form-model-item>
        <a-form-model-item v-bind="formItemLayoutWithOutLabel">
          <a-button type="dashed" style="width: 60%" @click="addItem">
            <a-icon type="plus" /> Add purchase item
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <div style="text-align:right">
        <h3>Total Cost: {{ totalCost.toFixed(2) }}</h3>
      </div>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { updateReceipt_api } from "../api/api";
export default {
  props: ["item"],
  name: "EditReceipt",
  data() {
    return {
      loading: false,
      visible: false,

      //form data rules, but not work now
      rules: {
        newReceiptID: [
          {
            required: true,
            message: "Please input receipt id",
            trigger: "blur",
          },
        ],
        store: [
          {
            required: true,
            message: "Please input the store",
            trigger: "blur",
          },
        ],
        date: [
          {
            required: true,
            message: "Please select the date",
            trigger: "change",
          },
        ],
        time: [
          {
            required: true,
            message: "Please select the time",
            trigger: "change",
          },
        ],
      },
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },

      newReceipt: {
        id: this.item.receipt_id,
        store: this.item.store,
        tag: this.item.tag,
        datetime: "",

        //dynamic form iten
        purchase_items: this.item.purchase_item,
      },
      //dynamic form iten
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
    };
  },
  methods: {
    //testing
    testing() {
      const testing = this.checkDateTime();
      console.log(testing);
    },
    //dynamic form iten
    removeItem(item) {
      let index = this.newReceipt.purchase_items.indexOf(item);
      if (index !== -1) {
        this.newReceipt.purchase_items.splice(index, 1);
      }
    },
    addItem() {
      this.newReceipt.purchase_items.push({
        item: "",
        cost: "",
        count: "",
      });
    },

    //form test area
    onSubmit() {
      console.log("submit!", this.form);
    },
    //other
    moment,
    showModal() {
      this.visible = true;
    },

    //determine the time if modify or not, return the time string
    checkDateTime() {
      if (!this.newReceipt.datetime) {
        return this.item.datetime;
      } else {
        return this.newReceipt.datetime;
      }
    },

    //submit and update the receipt data
    async handleOk() {
      this.loading = true;

      //因為目前datepicker的default沒有處理好，所以另外用checkDateTime()來判別是否有更動
      const item_timestamp = this.checkDateTime();

      const data = {
        id: this.item.id,
        receipt_id: this.newReceipt.id,
        store: this.newReceipt.store,
        datetime: item_timestamp,
        tag: this.newReceipt.tag,
        //discount 目前沒有處理
        discount: 0,
        purchase_item: this.newReceipt.purchase_items,
        totalcost: this.totalCost,
      };
      await axios
        .post(updateReceipt_api, data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then(() => {
          setTimeout(() => {
            this.visible = false;
            this.loading = false;
          }, 1000);
          this.$router.go(this.$router.currentRoute);
        });
    },
    handleCancel() {
      setTimeout(() => {
        //init the this.data
        this.newReceipt = {
          id: "",
          store: "",
          tag: "",
          datetime: "",
          purchase_items: [],
        };
      }, 0);
      this.visible = false;
    },

    //watch the date/time picker value
    dateChange(date) {
      this.newReceipt.datetime = moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
  },

  computed: {
    totalCost: function() {
      if (this.newReceipt.purchase_items.length > 0) {
        let total = 0;
        this.newReceipt.purchase_items.forEach((item) => {
          total += item.cost * item.count;
        });
        return total;
      } else {
        return 0;
      }
    },
    //init the value of date picker
    // originalTime: function() {
    //   return moment(this.item.datetime);
    // },
  },
};
</script>

<style></style>
