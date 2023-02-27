/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法(必传)
 * @param {Object} initParam 获取数据初始化参数(非必传，默认为{})
 * @param {Boolean} showPage 是否有分页(非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法(非必传)
 * */
export const useTable = ({
  api,
  initParam,
  showPage,
  dataCallBack,
  getByHand = false,
}) => {
  const state = reactive({
    loading: false,
    // 表格数据
    tableData: [],
    // 分页数据
    pagination: {
      // 当前页数
      current: 1,
      // 每页显示条数
      pageSize: 10,
      // 总条数
      total: 0,
      showPageSize: true,
    },
    // 查询参数(只包括查询)
    searchParam: {},
    // 初始化默认的查询参数
    searchInitParam: initParam || {},
    // 总参数(包含分页和查询参数)
    totalParam: {},
  });

  Object.assign(state.pagination, { pageSize: initParam.pageSize || 10 });

  /**
   * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
   * */
  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pagination.current,
        pageSize: state.pagination.pageSize,
      };
    },
    set: (newVal) => {
      console.log('我是分页更新之后的值', newVal);
    },
  });

  // 初始化的时候需要做的事情就是 设置表单查询默认值 && 获取表格数据(reset函数的作用刚好是这两个功能)
  onMounted(() => {
    if (getByHand) return;
    reset();
  });

  /**
   * @description 获取表格数据
   * @return void
   * */
  const getTableList = async () => {
    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(state.totalParam, showPage ? pageParam.value : {});
      state.loading = true;
      let res = await api(state.totalParam);

      let data = res.extraInfo || res.list;
      console.log(
        '%c [ data ]-72',
        'font-size:13px; background:pink; color:#bf2c9f;',
        data
      );

      dataCallBack && (data = await dataCallBack(data));
      state.tableData = showPage ? data.list || data : data;
      // 解构后台返回的分页数据 (如果有分页更新分页信息)
      const { total } = data;
      showPage && updatePageable({ total });
    } catch (error) {
      console.log(error);
    } finally {
      state.loading = false;
    }
  };

  /**
   * @description 更新查询参数
   * @return void
   * */
  const updatedTotalParam = () => {
    state.totalParam = {};
    // 处理查询参数，可以给查询参数加自定义前缀操作
    let nowSearchParam = {};
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
    for (let key in state.searchParam) {
      // * 某些情况下参数为 false/0 也应该携带参数
      if (
        state.searchParam[key] ||
        state.searchParam[key] === false ||
        state.searchParam[key] === 0
      ) {
        nowSearchParam[key] = state.searchParam[key];
      }
    }
    Object.assign(
      state.totalParam,
      nowSearchParam,
      showPage ? pageParam.value : {}
    );
  };

  /**
   * @description 更新分页信息
   * @param {Object} resPageable 后台返回的分页数据
   * @return void
   * */
  const updatePageable = (resPageable) => {
    Object.assign(state.pagination, resPageable);
  };

  /**
   * @description 表格数据查询
   * @return void
   * */
  const search = async () => {
    state.pagination.current = 1;
    updatedTotalParam();
    await getTableList();
  };

  /**
   * @description 表格数据重置
   * @return void
   * */
  const reset = () => {
    state.pagination.current = 1;
    state.searchParam = {};
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    Object.keys(state.searchInitParam).forEach((key) => {
      state.searchParam[key] = state.searchInitParam[key];
    });
    updatedTotalParam();
    getTableList();
  };

  /**
   * @description 每页条数改变
   * @param {Number} val 当前条数
   * @return void
   * */
  const handleSizeChange = (val) => {
    state.pagination.current = 1;
    state.pagination.pageSize = val;
    getTableList();
  };

  /**
   * @description 当前页改变
   * @param {Number} val 当前页
   * @return void
   * */
  const handleCurrentChange = (val) => {
    state.pagination.current = val;
    getTableList();
  };

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
  };
};
