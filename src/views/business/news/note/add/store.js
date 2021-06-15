export default {
  "name": "businessNewsNoteAdd",
  "state": {

  },
  "mutations": {
    // demoSet，命名规范：文件夹名称 + Set，拷贝页面时注意修改此方法名称
    businessNewsNoteAddSet(state, payload) {
      state = Object.assign(state, payload);
    }
  }
};
