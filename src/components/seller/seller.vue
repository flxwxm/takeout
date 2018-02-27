<template>
	<div class="seller" ref="wrap">
		<div class="content">
			<div class="overview">
				<h1 class="title">{{sellerData.name}}</h1>
				<div class="star-wrap border-1p">
					<star :size="36" :score="sellerData.score"></star>
					<span class="text ratingCount">({{sellerData.ratingCount}})</span>
					<span class="text">月售{{sellerData.sellCount}}单</span>	
				</div>
				<div class="collect">
					<div class="icon-favorite"></div>
					<div class="text">已收藏</div>
				</div>
				<ul class="remark">
					<li>
						<div class="title">起送价</div>
						<div><span class="num">{{sellerData.minPrice}}</span><span class="unit">元</span></div>
					</li>
					<li>
						<div class="title">商家配送</div>
						<div><span class="num">{{sellerData.deliveryPrice}}</span><span class="unit">元</span></div>
					</li>
					<li>
						<div class="title">平均配送时间</div>
						<div><span class="num">{{sellerData.deliveryTime}}</span><span class="unit">分钟</span></div>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<p class="text border-1p">{{sellerData.bulletin}}</p>
				<ul class="supports">
					<li v-for="item in sellerData.supports" class="border-1p">
						<i class="icon" :class="supports[item.type]"></i><span class="desc">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pics-list" ref="picWrap">
					<ul ref="picList">
						<li v-for="item in sellerData.pics">
							<img :src="item" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="infos">
				<h1 class="title border-1p">商家信息</h1>
				<ul>
					<li v-for="item in sellerData.infos" class="border-1p">
						{{item}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Star from "components/star/star";
	import Split from 'components/split/split';
	import BScroll from 'better-scroll';
    export default {
    	props:{
    		sellerData:{
    			type:Object,
    			default(){
    				return {}
    			}
    		}
    	},
    	components:{
    		Star,
    		Split
    	},
    	data(){
    		return {
    			supports:["decrease","discount","special","invoice","guarantee"]
    		}
    	},
    	mounted(){
    		this.$nextTick(()=>{
    			this._initScroll();
    			this._initPics();
    		})
    		
    	},
    	watch:{
    		sellerData(){
    			this.$nextTick(()=>{
	    			this._initScroll();
	    			this._initPics();
	    		})
    		}
    	},
    	methods:{
    		_initScroll(){
    			if(!this.scroll){
    				this.scroll=new BScroll(this.$refs.wrap,{
    					click:true
    				})
    			}else{
    				this.scroll.refresh();
    			}
    		},
    		_initPics(){
    			if(this.sellerData.pics){
    				let picW=120;
    				let margin=6;
    				let picsW=(picW+margin)*this.sellerData.pics.length-margin;
    				this.$refs.picList.style.width=picsW+'px';
    				this.$nextTick(()=>{
    					if(!this.picScroll){
    						this.picScroll=new BScroll(this.$refs.picWrap,{
    							scrollX: true,
                				eventPassthrough: 'vertical'
    						})
    					}else{
    						this.picScroll.refresh();
    					}
    				})
    			}
    		}
    	}
    }
</script>
<style rel="stylesheet" scoped>
   .seller{
   	position: fixed;
	top:175px;
	bottom:0;
	left:0;
	width:100%;
    background-color: #fff;
    overflow: hidden;
   }
   .seller .overview{
   	position: relative;
   	padding:18px;
   }
   .seller .overview .collect{
   	position: absolute;
   	top:12px;
   	right:18px;
   	text-align: center;
   }
   .seller .overview .icon-favorite{
   	margin-bottom: 4px;
   	font-size: 24px;
   	line-height: 24px;
   	color:rgb(240,20,20);
   }
   .seller .overview .collect .text{
	font-size: 10px;
   	line-height: 10px;
   	color:rgb(77,85,93);
   }
   .seller h1.title{
   	font-size: 14px;
   	line-height: 14px;
   	color:rgb(7,17,27);
   }
   .seller .overview .star-wrap{
   	padding:8px 0 18px;
   }
   .seller .border-1p:after{
   	background-color: rgba(7,17,27,0.1);
   }
   .seller .overview .star{
   	display: inline-block;
   }
   .seller .star-wrap .ratingCount{
   	 margin:0 12px 0 8px;
   }
   .seller .star-wrap .text{
   	color:rgb(77,85,93);
   	font-size: 10px;
   	line-height: 18px;
   	vertical-align: top;
   }
   .seller .overview .remark{
   	display: flex;
   	padding-top:18px;
   	text-align: center;
   }
   .seller .remark li{
	flex:1;
	border-right: 1px solid rgba(7,17,27,0.1);
   }
   .seller .remark li:last-child{
   	border-right: none;
   }
   .seller .remark .title{
   	margin-bottom: 4px;
   	color:rgb(147,153,159);
   	font-size: 10px;
   	line-height: 10px;
   }
   .seller .remark .unit,.seller .remark .num{
   	color:rgb(7,17,27);
   	font-size: 10px;
   	line-height: 24px;
   }
   .seller .remark .num{
   	font-size: 24px;
   }
   .bulletin{
   	padding:18px 18px 0;
   }
   .bulletin .text{
   	padding:8px 12px 16px;
   	font-size: 12px;
   	line-height: 24px;
   	color:rgb(240,20,20);
   }
   .bulletin .supports li{
	padding:16px 12px;
	line-height: 16px;
	font-size: 0;
	color:rgb(7,17,27);
   }
   .bulletin .supports .icon{
	display: inline-block;
	width:16px;
	height:16px;
	margin-right: 6px;
	background-size: 16px 16px;
	background-repeat: no-repeat;
	vertical-align: top;
   }
   .bulletin .supports .icon.decrease{
   	background-image: url(decrease_3@2x.png);
   }
   .bulletin .supports .icon.discount{
   	background-image: url(discount_3@2x.png);
   }
   .bulletin .supports .icon.guarantee{
   	background-image: url(guarantee_3@2x.png);
   }
   .bulletin .supports .icon.invoice{
   	background-image: url(invoice_3@2x.png);
   }
   .bulletin .supports .icon.special{
   	background-image: url(special_3@2x.png);
   }
   .bulletin .supports .desc{
   	font-size: 12px;
   }
   .pics{
   	padding:18px 0 18px 18px;
	
   }
   .pics h1.title,.infos h1.title{
	padding-bottom: 12px;
   }
   .infos{
   	padding:18px 18px 0;
   }
   .infos li{
   	padding:16px 12px;
   	line-height: 16px;
   	font-size: 12px;
   	color: rgb(7,17,27);
   }
   .pics-list{
   	overflow: hidden;
	width:100%;
   }
   .pics-list ul{
   	white-space: nowrap;
   	font-size: 0;
   }
   .pics-list li{
   	display: inline-block;
   	margin-right: 6px;
   }
</style>