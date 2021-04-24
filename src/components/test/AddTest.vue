<template>


  <div class="container">



    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >


      <div class="nav" style="position: relative">




        <div style="margin-top: 20px;margin-left: 15px;">

          <el-page-header @back="goBack" content="添加随堂测试">
          </el-page-header>

          <div style="width: 620px;margin-top: 20px;">
            <span style="color: #999999;font-size: 14px;margin-right: 20px;">
              添加题目
            </span>

            <el-button type="primary" plain size="mini" round>选择</el-button>
            <el-button type="success" plain size="mini" round>判断</el-button>
            <el-button type="info" plain size="mini" round>填空</el-button>

            <span style="float:right;margin-right: 50px">从题库中选择</span>

            <div>

              <div style="margin-left: 10px;">

                <div class="head-op">
                  <span style="margin-right: 20px">1</span>
                  <el-select
                    style="width: 100px;"
                    size="mini"
                    v-model="value" placeholder="请选择">
                    <el-option

                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                  <span style="float: right;margin-right: 40px;">删除图标</span>

                </div>


                <div class="radio-op">
                  <el-input
                    style="width: 560px"
                    size="mini"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="textarea">
                  </el-input>
                </div>

                <el-radio-group v-model="radio3" size="small">
                  <div class="radio-op">
                    <el-radio-button class="radio-m" label="A"></el-radio-button>
                    <el-input
                      style="width: 500px"
                      size="mini"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="textarea1">
                    </el-input>
                  </div>
                  <div class="radio-op">
                    <el-radio-button class="radio-m" label="B" ></el-radio-button>
                    <el-input
                      style="width: 500px"
                      size="mini"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="textarea2">
                    </el-input>
                  </div>
                  <div class="radio-op">
                    <el-radio-button class="radio-m" label="C"></el-radio-button>
                    <el-input
                      style="width: 500px"
                      size="mini"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="textarea2">
                    </el-input>
                  </div>
                  <div class="radio-op">
                    <el-radio-button class="radio-m" label="D"></el-radio-button>
                    <el-input
                      style="width: 500px"
                      size="mini"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="textarea2">
                    </el-input>

                  </div>

                </el-radio-group>
              </div>


            </div>
            <div>

              <div style="margin-left: 10px;">

                <div class="head-op">
                  <span style="margin-right: 20px">2</span>
                  <el-select
                    style="width: 100px;"
                    size="mini"
                    v-model="value" placeholder="请选择">
                    <el-option

                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                  <span style="float: right;margin-right: 40px;">删除图标</span>

                </div>


                <div class="radio-op">
                  <el-input
                    style="width: 560px"
                    size="mini"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="textarea">
                  </el-input>
                </div>

                <el-radio-group v-model="radio3" size="small">
                  <div class="radio-op">
                    <el-radio-button class="radio-m" label="A"></el-radio-button>
                    <span>
                      <el-radio-button class="radio-m" label="B" ></el-radio-button>
                    </span>

                  </div>

                </el-radio-group>
              </div>


            </div>

            <div>

              <div style="margin-left: 10px;">

                <div class="head-op">
                  <span style="margin-right: 20px">3</span>
                  <el-select
                    style="width: 100px;"
                    size="mini"
                    v-model="value" placeholder="请选择">
                    <el-option

                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>

                  <span style="float: right;margin-right: 40px;">删除图标</span>

                </div>


                <div class="radio-op">
                  <el-input
                    style="width: 560px"
                    size="mini"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="textarea">
                  </el-input>
                </div>


                  <div class="radio-op">
                    <span style="margin-right: 10px">第1空</span>
                    <el-input
                      style="width: 500px"
                      size="mini"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="textarea1">
                    </el-input>
                  </div>

                  <div class="radio-op">
                    <span style="margin-right: 10px">第2空</span>
                    <el-input
                      style="width: 500px"
                      size="mini"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="textarea1">
                    </el-input>
                  </div>

              </div>


            </div>

          </div>

          <div style="height: 100px;width: 370px;float:right;position: absolute;top: 40px;right: 20px;">
              <div>
                设置
              </div>
              <div style="margin-top: 20px;">
                活动时长
              </div>
              <div>
                <el-time-picker
                  size="mini"
                  arrow-control
                  v-model="selectT"
                  :disabled-hours="disabledHours"
                  :disabled-minutes="disabledMinutes"
                  :disabled-seconds="disabledSeconds"
                  placeholder="任意时间点">
                </el-time-picker>
              </div>

              <div style="margin-top: 20px;">
                <el-button size="mini">
                  保存,但不发布
                </el-button>

                <el-button size="mini">
                  立即开始
                </el-button>
              </div>

          </div>


        </div>

      </div>
    </div>
  </div>
</template>

<script>
  const makeRange = (start, end) => {
    const result = []
    for (let i = start; i <= end; i++) {
      result.push(i)
    }
    return result
  }
  export default {
    name: "AddTest",
    data() {
      return {
        loading: false,
        dialogVisible: false,
        dialogVisible1: false,
        input: '',
        textarea:'',
        textarea1:'',
        textarea2:'',
        textarea3:'',
        textarea4:'',
        expends: [],
        tableData: [{
          date: '2021-04-17',
          name: '1',
          address: '人声',
          type: '选择',
          edit: '操作',
          problem: {
            type: 1,
            title: '人声的主要作用有(  )',
            a: 'A. 这是A的选项',
            b: 'B. 这是B的选项',
            c: 'C. 这是C的选项',
            d: 'D. 这是D的选项',
            res: 'A'
          }
        },
          {
            date: '2021-04-17',
            name: '2',
            address: '人声',
            type: '判断',
            edit: '操作',
            problem: {
              type: 2,
              title: '人声的主要作用有(  )',
              a: 'A',
              b: 'B',
              res: 'A'
            }
          },
          {
            date: '2021-04-17',
            name: '3',
            address: '人声',
            type: '填空',
            edit: '操作',
            problem: {
              type: 3,
              title: '人声的有___的作用',
              res: '刻画人物形象'
            }
          },
          {
            date: '2021-04-17',
            name: '4',
            address: '人声',
            type: '选择',
            edit: '操作',
            problem: {
              type: 1,
              title: '人声的主要作用有(  )',
              a: 'A. 这是A的选项',
              b: 'B. 这是B的选项',
              c: 'C. 这是C的选项',
              d: 'D. 这是D的选项',
              res: 'A'
            }
          },
          {
            date: '2021-04-17',
            name: '5',
            address: '人声',
            type: '选择',
            edit: '操作',
            problem: {
              type: 1,
              title: '人声的主要作用有(  )',
              a: 'A. 这是A的选项',
              b: 'B. 这是B的选项',
              c: 'C. 这是C的选项',
              d: 'D. 这是D的选项',
              res: 'A'
            }
          },
          {
            date: '2021-04-17',
            name: '6',
            address: '人声',
            type: '选择',
            edit: '操作',
            problem: {
              type: 1,
              title: '人声的主要作用有(  )',
              a: 'A. 这是A的选项',
              b: 'B. 这是B的选项',
              c: 'C. 这是C的选项',
              d: 'D. 这是D的选项',
              res: 'A'
            }
          }

        ],
        options: [{
          value: '选项1',
          label: '选择'
        }, {
          value: '选项2',
          label: '判断'
        }, {
          value: '选项3',
          label: '填空'
        }],
        value: '',
        radio3:'A',
        multipleSelection: [],
        selectT: new Date(2016, 9, 10, 0, 10,0)
    }
    },
// 加载数据
    created() {
      this.getExpends();
    },

    beforeMount() {
      this.course_id = this.$route.params.course_id;
    },
    methods: {

      //关闭之后
      handleClose() {
        console.log('关闭了')
      },
      showAddOption() {
        this.dialogVisible = true;
        console.log('点击了')
      },

      toAddOption(){
        this.dialogVisible1 = true;

      },
      // 如允许 17:30:00 - 18:30:00
      disabledHours() {
        return makeRange(0, 16).concat(makeRange(19, 23))
      },
      disabledMinutes (hour) {
        if (hour === 17) {
          return makeRange(0, 29)
        }
        if (hour === 18) {
          return makeRange(31, 59)
        }
      },
      disabledSeconds(hour, minute) {
        if (hour === 18 && minute === 30) {
          return makeRange(1, 59)
        }
      },





      goBack() {
        this.$router.go(-1);//返回上一层
        console.log('go back');
      },
      getExpends() {
        var Id = this.tableData.map(item => item.name)
        console.log(Id);
        this.expends = Id
      },
      getRowKeys(row) {
        return row.name
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;

      }
    }

  }
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    background: #f2f4f7;
    display: flex;
    justify-content: center;
    align-items: center;

    .round-div {
      width: 100%;
      min-width: 1000px;
      height: calc(100% - 30px);
      margin-left: 20px;
      margin-right: 20px;
      /*margin-top: 20px;*/
      border-radius: 16px;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      overflow: auto;
    }

    .radio-m{
      margin-right: 20px;

    }

    .radio-op{
      height: 40px;
      line-height: 30px;
      margin-bottom: 10px;

    }

    .head-op{
      margin-top: 10px;
      margin-bottom: 15px;

    }

  }
</style>