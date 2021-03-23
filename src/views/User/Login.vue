<template>
  <a-row class="login_area">
    <a-col class="alert_area">
      <a-alert
        v-if="login_err"
        banner:true
        message="Error"
        description="This is an error message about copywriting."
        type="error"
        closable
        :after-close="handleClose"
      />
    </a-col>
    <a-col class="input_area">
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="email">
          <a-input
            v-decorator="[
              'user_email',
              {
                rules: [
                  { required: true, message: 'Please input your email!' },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="password">
          <a-input-password
            v-decorator="[
              'uesr_password',
              {
                rules: [
                  { required: true, message: 'Please input your password!' },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <!-- <a-form-item :wrapper-col="{ span: 12, offset: 5 }"> -->
          <a-button type="primary" html-type="submit"> Login </a-button>|
          <router-link tag="a" to="/user/register"
            >Not have any account</router-link
          >
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import axios from "axios";
import { login_api } from "../../api/api";
export default {
  data() {
    return {
      formLayout: "horizontal",
      login_err: false,
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          axios.post(login_api, values).then((res) => {
            if (res.data.message === "此帳號尚未註冊") {
              this.login_err = true;
            } else {
              console.log(res.data);
              localStorage.setItem("access_token", res.data.accessToken);
              this.$router.push("/");
            }
          });
          //   console.log("Received values of form: ", values);
        }
      });
    },
    handleClose() {
      this.login_err = false;
    },
  },
};
</script>

<style>
.login_area {
  background-color: aliceblue;
  border-radius: 15px;
  height: 400px;
}
.input_area {
  margin-top: 50px;
}
.alert_area {
  margin-top: 5px;
  height: 50px;
}
</style>
