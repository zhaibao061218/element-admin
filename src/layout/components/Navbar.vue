<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <ul v-if="roles[0]!='admin'" class="shopStatusInfo hidden-xs-only">
      <li>套餐有效期至：2021/6/10 9:22:55</li>
      <li>套餐详请：总店铺数30 ，已使用25</li>
      <li>总产品数：无限制, 已使用32</li>
    </ul>
    

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <error-log class="errLog-container right-menu-item hover-effect" />
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index" v-if="roles[0]!='admin'" >
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>

          <el-dropdown-item  @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";
import ErrorLog from "@/components/ErrorLog";

export default {
  components: {
    Hamburger,
    Breadcrumb,
    ErrorLog,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device","roles"]),
  },
  mounted() {
    
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      window.location.href = "/"
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .shopStatusInfo {
    display: flex;
    flex: 1;
    list-style: none outside;
    justify-content: flex-end;
    li {
      position: relative;
      font-size: 14px;
      color: #666;
      margin-right: 15px;
      padding-right: 15px;
      &::after {
        position: absolute;
        content: "";
        width: 1px;
        height: 10px;
        background: #ccc;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    // float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
//only for mobile
@media only screen and (max-width: 767px) {
  .breadcrumb-container {
    flex: 1;
  }
  .avatar-container {
    margin-right: 5px !important;
  }
}
</style>
