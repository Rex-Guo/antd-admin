<template>
  <a-layout-content :style="fixedMenuStyle">
    <a-tabs
      v-if="navTabs.length>0 && isTabMode"
      class="header-tabs"
      :activeKey="activeTab"
      defaultActiveKey="1"
      tabPosition="top"
      :tabBarGutter="4"
      :animated="false"
      :tabBarStyle="{'background':'#f0f2f5','margin':'0'}"
    >
      <a-tab-pane :key="item.path" v-for="item in navTabs">
        <span slot="tab" class="header-tab">
          <span class="tap-area-tb" @click="change(item.path)">{{item.meta.title}}</span>
          <a-icon
            type="close"
            v-if="navTabs.length!==1"
            style="position:relative;margin-right:-10px;margin-left:6px;width:14px;height:14px;display:inline-block;color:rgba(0,0,0,.45)"
            @click="removeTab(item)"
          />
        </span>
      </a-tab-pane>
      <div
        style="height:44px;width:44px;text-align:center;background:#ddd"
        slot="tabBarExtraContent"
      >
        <a-dropdown>
          <a class="ant-dropdown-link tap-area" href="#">
            <a-icon type="down"/>
          </a>
          <a-menu slot="overlay" class="my-tabs-drapdowm">
            <a-menu-item :disabled="navTabs.length==1">
              <span @click.stop="closeCurrTag">
                <a-icon type="close-square-o"/>关闭当前标签页
              </span>
            </a-menu-item>
            <a-menu-item :disabled="navTabs.length==1">
              <span @click.stop="closeOtherTag">
                <a-icon type="close-circle-o"/>关闭其他标签页
              </span>
            </a-menu-item>
            <a-menu-item>
              <span @click.stop="refreshCurrTag">
                <a-icon type="reload"/>刷新当前标签页
              </span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-tabs>
    <div v-if="!activeTabObj.type" :style="fixedStyle">
      <a-breadcrumb style="padding:10px;" v-if="breadcrumbMode">
        <a-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          <span v-if="item.name=='Home'">
            <a-icon type="home"/>首页
          </span>
          <a-icon :type="item.meta.icon" v-else/>
          <span>{{item.meta.title}}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <!-- 内容 -->
      <transition name="show" appear mode="out-in">
        <router-view/>
      </transition>
      <a-layout-footer style="text-align: center;">Ant Design Pro Vue ©2016 Created by Artiely</a-layout-footer>
    </div>
  </a-layout-content>
</template>

<script>
import { mapState } from 'vuex'
const NAV_TABS_HEIGHT = 45
export default {
  name: 'v-content',
  computed: {
    fixedStyle() {
      if (this.$store.state.sys.layoutFixed) {
        let tabsHeight = this.$store.state.sys.isTabMode ? 0 : NAV_TABS_HEIGHT
        return {
          height: this.documentBodyClientHeight + tabsHeight + 'px',
          'overflow-y': 'scroll',
        }
      } else {
        return { height: 'auto' }
      }
    },
    fixedMenuStyle() {
      if (this.$store.state.sys.fixedMenu) {
        return {
          height: this.documentBodyClientHeight + 'px',
          padding: 0,
        }
      } else {
        return {
          padding: 0,
          'min-height': this.documentBodyClientHeight + NAV_TABS_HEIGHT + 'px',
        }
      }
    },
    ...mapState('sys', {
      navTabs: state => state.navTabs,
      layoutFixed: state => state.layoutFixed,
      breadcrumbMode: state => state.breadcrumbMode,
      activeTab: state => state.activeTab,
      isTabMode: state => state.isTabMode,
    }),
    documentBodyClientHeight: {
      get() {
        if (this.$store.state.sys.navTabs) {
          return this.$store.state.sys.documentBodyClientHeight
        }
        return this.$store.state.sys.documentBodyClientHeight + NAV_TABS_HEIGHT
      },
      set() {},
    },
    activeTabObj() {
      return this.$store.getters['sys/activeTabObj']
    },
  },
  watch: {
    activeTab: {
      handler(val) {
        this.$router.push(val)
      },
    },
  },
  methods: {
    change(val) {
      this.$store.commit('sys/setActiveTab', val)
    },
    removeTab(val) {
      this.$store.commit('sys/removeTag', val)
    },
    closeCurrTag() {
      this.$store.commit('sys/closeCurrTag', this.activeTab)
    },
    closeOtherTag() {
      this.$store.commit('sys/closeOtherTags')
    },
    refreshCurrTag() {
      // 创建临时变量保存当前的activeTag 然后删除当前 再添加临时变量
      this.$store.commit('sys/setCurrTag')
      this.$nextTick(() => {
        this.$store.commit('sys/refreshCurrTag')
      })
    },
  },
  created() {
    this.$store.dispatch('sys/getMenuNav')
    this.$store.dispatch('sys/getMenuList')
  },
}
</script>

<style lang="less">
.show-enter-active {
  transition: all 0.3s ease-in-out;
}
.show-enter {
  transform: translateY(30px);
  opacity: 0;
}
.show-leave-to {
  opacity: 0;
}
.my-tabs-drapdowm {
  &.ant-dropdown-menu {
    border-radius: 2px !important;
  }
}
.header-tabs {
  background: #f0f2f5;
  box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);
  z-index: 90;
  .ant-tabs-nav .ant-tabs-tab-active {
    background: #fff !important;
    color: #1890ff !important;
  }
  .ant-dropdown-link {
    line-height: 46px;
  }
  .ant-dropdown-link .anticon-down {
    font-size: 16px !important;
  }
  > .ant-tabs-bar {
    border: none;
  }
  > .ant-tabs-bar .ant-tabs-tab {
    margin-right: 4px !important;
    background: #fafafa;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    color: #666;
    font-size: 14px;
    font-weight: 500;
  }
  .ant-tabs-ink-bar {
    background: transparent;
  }
}
.header-tab {
  position: relative;
  .anticon {
    &:hover {
      background: #ddd !important;
    }
  }
}
</style>
