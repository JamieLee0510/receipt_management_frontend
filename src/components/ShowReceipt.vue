<template>
  <div>
    <div @click="showModal">{{ item.store }}</div>
    <a-modal v-model="visible" :title="item.store" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          Return
        </a-button>
        <!-- <a-button @click="testing">
          testing
        </a-button> -->
      </template>
      <p>Receipt ID:{{ item.receipt_id }}</p>
      <hr />
      <a-row v-for="data in item.purchase_item" :key="data.id">
        <a-col :span="24">{{ data.item }} </a-col>
        <a-col :span="15">{{ data.cost }} * {{ data.count }} </a-col>
        <a-col :span="7">${{ (data.cost * data.count).toFixed(2) }} </a-col>
      </a-row>
      <hr />
      <p>total : {{ item.totalcost.toFixed(2) }}</p>
      <br />
      <p>tag : {{ item.tag }}</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: ["item"],
  name: "ShowReceipt",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    //testing
    testing() {
      console.log(this.item.purchase_item);
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
  },
};
</script>

<style></style>
