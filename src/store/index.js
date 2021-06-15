import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import modules from "./modules";

Vue.use(Vuex);

// 持久化配置
// window.sessionStorage（单窗口缓存，如复制链接在新窗口打开，则新窗口不存在任何缓存）
// window.localStorage（本地缓存，即使复制链接在新窗口打开，也一样会读取缓存内容）
// 由于H5为单窗口形式，所以采用window.sessionStorage
const storageConfig = [ createPersistedState({ "storage": window.sessionStorage }) ];

// 生成store对象
const store = new Vuex.Store({
  // APP全局状态
  "state": {
    // 接口token
    "token": ""
  },
  "actions": {
    /**
     * 状态重置，清空所有缓存
     */
    storeReset({ commit }) {
      commit("STORE_RESET");
    }
  },
  // 修改全局状态方法
  "mutations": {
    set(state, payload) {
      state = Object.assign(state, payload);
    },
    /**
     * 重置store
     */
    "STORE_RESET": (state, moduleState) => {
      for (const moduleState in modules) {
        const mState = state[moduleState];

        if (mState.initState && typeof mState.initState === "function") {
          const initState = mState.initState();

          for (const key in initState) {
            mState[key] = initState[key];
          }
        }
      }
    }
  },
  // 模块状态集合
  "modules": modules,
  // 通过插件将数据以session方式持久化
  "plugins": storageConfig
});

export default store;
