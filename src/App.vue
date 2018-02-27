<template>
  <div id="app">
    <v-header :seller-data="sellerData"/>
    <div class="tab">
      <router-link :to="{path:'/goods'}" active-class="active">商品</router-link>
      <router-link :to="{path:'/ratings'}" active-class="active">评论</router-link>
      <router-link :to="{path:'/seller'}" active-class="active">商家</router-link>
    </div>
    <div class="border-1px tab-border"></div>
    <router-view :seller-data="sellerData"></router-view>
  </div>
</template>

<script>

import VHeader from 'components/header/header.vue';

export default {
  name: 'App',
  data () {
    return {
      sellerData:{}
    }
  },
  components: {
    VHeader
  },
  created () {
    this.$http.get('/api/seller').then(res=>{
      res=res.body;
      this.sellerData=res.data;
    })
  }
}
</script>

<style>
@import "./common/styles/reset.css";
@import "./common/styles/style.css";


.tab{display: flex;line-height: 40px;}
.tab-border{background-color:rgba(7,17,27,0.1); }
.tab a{flex:1;text-align: center;}
.tab .active{color:rgb(240,20,20);}
</style>
