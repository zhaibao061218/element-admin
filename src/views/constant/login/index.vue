<template>
<div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
        <div class="title-container">
            <h3 class="title" title="评价易商家后台管理系统">
                <svg-icon icon-class="user" />
            </h3>
            <p>评价易商家登入</p>
        </div>

        <el-form-item prop="username">
            <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1" autocomplete="off" />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="大写锁定已打开" placement="right" manual>
            <el-form-item prop="password">
                <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" name="password" tabindex="2" autocomplete="off" @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
            </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" class="m-t-20 m-b-20" style="width: 100%" @click.native.prevent="handleLogin">登入</el-button>

        <p class="forgetpwd">
            <el-link href="//www.pingjiae.com/user/RetrievePassword" target="_blank">忘记密码？</el-link>
        </p>
    </el-form>
</div>
</template>

<script>
import {
    validUsername
} from "@/utils/validate";

export default {
    name: "Login",
    components: {},
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error("请输入正确的用户名"));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error("密码不能少于6位"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                username: "",
                password: "123456",
            },
            loginRules: {
                username: [{
                    required: true,
                    trigger: "blur",
                    validator: validateUsername,
                }, ],
                password: [{
                    required: true,
                    trigger: "blur",
                    validator: validatePassword,
                }, ],
            },
            passwordType: "password",
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {},
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                const query = route.query;
                if (query) {
                    this.redirect = query.redirect;
                    this.otherQuery = this.getOtherQuery(query);
                }
            },
            immediate: true,
        },
    },
    created() {
        // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
        if (this.loginForm.username === "") {
            this.$refs.username.focus();
        } else if (this.loginForm.password === "") {
            this.$refs.password.focus();
        }
    },
    destroyed() {
        // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
        checkCapslock(e) {
            const {
                key
            } = e;
            this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
        },
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch("user/login", this.loginForm)
                        .then((res) => {
                            this.$router.push({
                                path: this.redirect || "/",
                                query: this.otherQuery,
                            });
                            this.loading = false;
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    return false;
                }
            });
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== "redirect") {
                    acc[cur] = query[cur];
                }
                return acc;
            }, {});
        },
    },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;

    .el-input {
        display: inline-block;
        height: 50px;
        width: 100%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #333;
            height: 50px;
            vertical-align: middle;

            &:-webkit-autofill {
                box-shadow: 0 0 0 1000px white inset !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid #ddd;
        // background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #333;
    }

    .forgetpwd {
        text-align: center;
        margin: 20px 0 40px;
        color: #555;
        font-size: 14px;

        a {
            color: #555;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #333;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 480px;
        max-width: 100%;
        padding: 55px 35px 0;
        margin: -5% auto 0;
        overflow: hidden;
        background: #fff;
        border-radius: 5px;

        button {
            font-size: 16px;
            height: 50px;
            border-radius: 5px;
        }
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;
        text-align: center;
        padding-bottom: 40px;

        .title {
            margin: 0;
            display: inline-block;
            width: 100px;
            height: 100px;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 50%;
            font-size: 50px;
            color: #999;
            text-align: center;
            font-weight: normal;
        }

        p {
            margin:20px 0 0;
            font-size: 16px;
            color: #555;
            font-weight: 700;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }
}
</style>
