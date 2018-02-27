<template>
  <header>
  	<div class="header-wrap">
	    <img :src="sellerData.avatar" width="64" height="64">
	    <div class="header-content">
	    	<div class="title-wrap">
	    		<span class="brand"></span>
	    		<span class="title">{{sellerData.name}}</span>
	    	</div>
	    	<div class="description">
	    		{{sellerData.description}}
	    	</div>
	    	<div class="supports-wrap" v-if="sellerData.supports">
	    		<span class="icon" :class="supports[0]"></span>
	    		<span class="txt">{{sellerData.supports[0].description}}</span>
	    	</div>
	    	<div class="supports-count" @click="doShowDetail">
	    		{{sellerData.supports.length}}个<span class="icon-keyboard_arrow_right"></span>
	    	</div>
	    </div>
    </div>
    <div class="bulletin-wrap" @click="doShowDetail">
    	<div class="bulletin">
	    	<span class="icon"></span>
	    	<span class="txt">{{sellerData.bulletin}}</span>
	    	<span class="icon-keyboard_arrow_right"></span>
    	</div>
    </div>
    <div class="header-bg">
	    <img :src="sellerData.avatar">
	</div>
	<transition name="detail">	
		<div v-show="isShowDetail" class="detail">
			<div class="detail-wrap clearfix">
				<div class="detail-main">
					<h2 >{{sellerData.name}}</h2>
					<div class="star-wrap">
						<v-star :size="48" :score="sellerData.score"></v-star>
					</div>
					<div class="col-title">
						<div class="line"></div>
						<div class="txt">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="supports-list">
						<li v-for="item in sellerData.supports">
							<span class="icon" :class="supports[item.type]"></span>
							<span class="txt">{{item.description}}</span>
						</li>
					</ul>
					<div class="col-title">
						<div class="line"></div>
						<div class="txt">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="detail-bulletin-wrap">
						<p class="detail-bulletin">
						{{sellerData.bulletin}}
						</p>
					</div>
				</div>
			</div>
			<div class="detail-close">
				<i class="icon-close" @click="doHideDetail"></i>
			</div>
		</div>
	</transition>
  </header>
</template>

<script>
import VStar from "../star/star.vue";
export default {
  props:{
  	sellerData:{
  		type:Object,
  		default () {
  			return{}
  		}
  	}
  },
  components:{
  	VStar
  },
  data () {
    return {
      supports:["decrease","discount","special","invoice","guarantee"],
      isShowDetail:false
    }
  },
  methods:{
  	doShowDetail () {
  		this.isShowDetail=true;
  	},
  	doHideDetail () {
  		this.isShowDetail=false;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	header{position:relative;font-size: 0;height:134px;background-color: rgba(7,17,27,0.5);overflow: hidden;}
	.header-wrap{padding-top:24px;padding-left: 24px;}
	.header-content{display: inline-block;font-size: 14px;margin-left: 16px;vertical-align: top;}
	.title-wrap .brand{display:inline-block;width:30px;height:18px;background:url(brand@2x.png) no-repeat 0 0/30px 18px;}
	.title-wrap .title{font-size: 16px;color:#fff;vertical-align:top;}
	.description{color:#fff;font-size: 12px;line-height: 24px;}
	.supports-wrap{color:#fff;font-size: 12px;}
	.supports-wrap .icon{display: inline-block;width:18px;height:18px;background-position: 0 0;background-size: 18px 18px;background-repeat: no-repeat;vertical-align:middle;}
	.supports-wrap .decrease{background-image: url(decrease_1@3x.png);}
	.header-bg{position: absolute;top:0;left:0;z-index:-1;width:100%;height:100%;}
	.header-bg img{width:100%;height:100%;filter:blur(10px);}
	.bulletin-wrap{position: absolute;bottom:0;left:0;width:100%;height:28px;line-height: 28px;background:rgba(7,17,27,0.2);color:#fff;font-size: 10px;}
	.bulletin{
		padding:0 20px 0 12px;
	}
	.bulletin .icon{width:22px;height:12px;background:url(bulletin@2x.png) no-repeat 0 0/22px 12px;position: absolute;bottom: 10px;}
	.bulletin .txt{display:block;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;padding-left: 24px;}
	.supports-count{position: absolute;bottom: 46px;right: 12px;height:24px;line-height: 24px;padding:0 4px 0 10px;border-radius:12px;background: rgba(0,0,0,0.2);color:#fff;font-size: 10px;}
	.supports-count .icon-keyboard_arrow_right{line-height: 24px;font-size: 12px;vertical-align: middle;}
	.bulletin-wrap .icon-keyboard_arrow_right{position: absolute;right:8px;bottom: 0px;line-height: 28px;font-size: 12px;}
	.detail{position: fixed;top:0;left:0;z-index:300;width:100%;height:100%;background:rgba(7,17,27,0.8);overflow: auto;}
	.detail-wrap{min-height: 100%;}
	.detail-main{padding-bottom: 64px;padding-top:64px;}
	.detail-close{width:32px;height:32px;margin:-64px auto 0;color:#fff;position: relative;clear:both;font-size: 32px;opacity: 0.5;}
	.detail-main h2{color:#fff;line-height: 16px;font-size: 16px;text-align: center;}
	.star-wrap{margin-top:16px;text-align: center;}
	.detail .col-title{display: flex;width:80%;margin:28px auto 24px auto;}
	.detail .col-title .line{flex:1;border-bottom: 1px solid rgba(255,255,255,0.2);position: relative;top:-8px;}
	.detail .col-title .txt{line-height: 14px;color:#fff;line-height: 14px;font-size:14px;padding:0 12px; font-weight: 700;}
	.detail .supports-list{width:80%;margin:0 auto;color:#fff;}
	.detail .supports-list .icon{display: inline-block;width:16px;height:16px;margin-right:6px;background-repeat: no-repeat;background-size: 16px 16px;}
	.detail .supports-list .txt{font-size:12px;vertical-align: top;line-height: 18px;}
	.detail .supports-list .decrease{background-image: url(decrease_2@2x.png)}
	.detail .supports-list .discount{background-image: url(discount_2@2x.png)}
	.detail .supports-list .special{background-image: url(special_2@2x.png)}
	.detail .supports-list .invoice{background-image: url(invoice_2@2x.png)}
	.detail .supports-list .guarantee{background-image: url(guarantee_2@2x.png)}
	.detail .supports-list li{margin-bottom: 12px;padding:0 12px;}
	.detail-bulletin-wrap{width:80%;margin:0 auto;line-height: 24px;font-size: 12px;color:#fff;}
	.detail-bulletin{padding:0 12px;}
	.detail-enter,.detail-leave-to{opacity: 0}
	.detail-enter-to,.detail-leave{opacity: 1}
	.detail-enter-active,.detail-leave-active{transition: all .5s;}
</style>
