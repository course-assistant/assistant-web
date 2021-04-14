<template>
  <div>
    <ul id="accordion" class="accordion" >
      <li v-for="(t1,index) in week">
        <div :class="isShow[index]===1?'link_c':'link'" @click="liChange(index)">
          {{t1.week_name}}
          <span style="font-size: 12px;color: #8a8b99;margin-left: 10px">
            已完成
<!--            {{t1.week_f.ok_num}}/{{t1.week_f.total_num}}-->
          </span>
          <i class="fr" :class="isShow[index]===0?'el-icon-caret-right':'el-icon-caret-bottom'"></i>
          <el-tag
            class="fr"
            style="margin-right: 10px"
            size="mini"
            key="未开放"
            type=""
            effect="plain">
             已开放 1/2
          </el-tag>
        </div>

        <el-collapse-transition>
          <ul class="submenu" v-if="isShow[index]===1">
            <li v-for="mission in t1.missions">
              <a href="#" style="height: 30px;line-height: 30px;border-bottom:1px dashed #8a8b99">
                {{mission.week_mission_name}}

                <el-tag
                  class=""
                  style="margin-left: 10px"
                  size="small "
                  key="未开放"
                  type=""
                  effect="plain">
                  未开放
                </el-tag>

                <span class="cz1">
                  <el-button type="text">
                  删除
                  </el-button>
                </span>

                <span class="cz2">
                  <el-button type="text">
                  开放
                  </el-button>

                </span>




              </a>
              <week-mission-detail class="wmd" :week_mission="mission" />
            </li>
<!--            no-mission-->
            <div class="no-mission" v-show="t1.missions.length===0">
              <span>暂无任务</span>

              <span style="font-size: 14px;color: #409eff;cursor: pointer;padding-left: 40px;">添加</span>
            </div>

            <div class="no-mission" v-show="t1.missions.length!==0">
<!--              <span>点击添加</span>-->

              <span style="font-size: 14px;color: #409eff;cursor: pointer;">添加任务</span>
            </div>

          </ul>
        </el-collapse-transition>

      </li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'

  import WeekMissionDetail from "../views/Course/menu/WeekMissionDetail";

  export default {
    props: ['week'],
    data() {
      return {
        isShow: [],
        list:[1,2,3],
        mission:[]
      }
    },
    components: {
      WeekMissionDetail

    },
    created(){
      // this.refreshWeeks(i)

    },
    methods: {

      refreshWeeks(missionid) {
        this.loading = true;
        let [data, err] = this.$awaitWrap(this.$get('weekmission/selectbymissionid', {
          id: missionid
        }));
        if (err) {
          this.$message.warning(err);
          return;
        }
        this.mission.add(data.data)

        console.log(this.weeks);
        this.loading = false;
      },


      liChange(index){
        console.log('点击了' + index);

        if (this.isShow[index]===1){
          for (let i = 0; i <this.isShow.length ; i++) {
            Vue.set(this.isShow,i,0)
          }
        }else{
          for (let i = 0; i <this.isShow.length ; i++) {
            Vue.set(this.isShow,i,0)
          }
          Vue.set(this.isShow,index,1)
        }

      },
      toWeekMissionList(index) {
        this.$router.push({

          path: `/course/${this.$route.params.course_id}/week-mission/week-mission-list/${this.week[index].week_id}/week-mission-detail/1`
        });
      }
    }
  }
</script>
<style scoped>

  .accordion {
    width: 100%;
    /*max-width: 700px;*/
    margin: 30px auto 20px;
    background: #FFF;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .accordion .link {
    cursor: pointer;
    display: block;
    padding: 15px 15px 15px 42px;
    color: #4D4D4D;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid #CCC;
    position: relative;
  }


  .link_c{
    cursor: pointer;
    display: block;
    padding: 15px 15px 15px 42px;
    color: #b63b4d;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid #CCC;
    position: relative;
  }

  .no-mission{
    padding-top:  10px;
    padding-bottom: 10px;
    padding-left: 40px;
    /*text-align: center;*/
    position: relative;
    color: #8a8b99;
    font-size: 12px;
    min-width: 1000px;
    background: #fff;
    box-shadow: 1px 7px 5px -5px rgba(0, 0, 0, 0.3);
  }





  ul {
    list-style-type: none;
  }

  .submenu {
    display: block;
    background: #ffffff;
    font-size: 14px;
  }

  .submenu li {
    /*border-bottom: 1px dashed #4b4a5e ;*/
  }

  .submenu a {
    display: block;
    text-decoration: none;
    color: #5557b6;
    padding-top: 12px;
    margin-left:  42px;
    margin-right: 42px;
    font-weight: 700;

    -webkit-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
  }

  h1 {
    color: #FFF;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    margin-top: 80px;
  }



  h1 a {
    /*color: #c12c42;*/
    font-size: 16px;
  }

  /*a:hover {*/
  /*  !*background: #b63b4d;*!*/
  /*  color: #409eff;*/
  /*}*/

  .fade-enter-active, .fade-leave-active {
    transition: height 0.3s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    height: 0;

  }

  .wmd{
    /*margin-left: 42px;*/
  }


/*  图片*/

  .fr{
    float: right;
  }

  .cz1{

    /*line-height: 24px;*/

    float: right;

    /*padding-right: 20px;*/

  }

  .cz2{

    /*line-height: 24px;*/

    float: right;

    padding-right: 20px;

  }

</style>