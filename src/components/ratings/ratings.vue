<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-inner">
			<div class="overView">
				<div class="overView-left">
					<div class="score">{{sellerData.score}}</div>
					<div class="title">综合评分</div>
					<div class="desc">高于周边商家{{sellerData.rankRate}}%</div>
				</div>
				<div class="overView-right">
					<div class="line-wrap"><span class="title">服务态度</span><div class="star-wrap"><star :size="36" :score="sellerData.serviceScore"></star></div><span class="num">{{sellerData.serviceScore}}</span></div>
					<div class="line-wrap foodLine"><span class="title foodTitle">菜品质量</span><div class="star-wrap"><star :size="36" :score="sellerData.foodScore" class="star"></star></div><span class="num">{{sellerData.foodScore}}</span></div>
					<div class="line-wrap"><span class="title">送达时间</span><span class="time">{{sellerData.deliveryTime}}分钟</span></div>
				</div>
			</div>
			<split></split>
			<div class="ratingSelect-wrap">
				<rating-select :select-desc="selectDesc" :rating="ratings" :selectType="selectType" :onlyContent="onlyContent" @toggle-content="toogleContent" @select="select($event)"></rating-select>
			</div>
			<ul class="ratings-list">
				<li class="item border-1p" v-for="rating in ratings" v-show="needShow(rating.text,rating.rateType)">
					<img :src="rating.avatar" class="avatar" width="28" height="28">
					<div class="content">
						<div class="username">{{rating.username}}</div>
						<div class="score-wrap"><star :size="24" :score="rating.score" class="star"></star><span class="deliveryTime">{{rating.deliveryTime}}分钟送达</span></div>
						<div class="text">{{rating.text}}</div>
						<div>
							<i :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></i>
							<span class="recommend" v-for="(food,index) in rating.recommend" v-show="index<3">{{food}}</span>
						</div>
						<div class="time">{{rating.rateTime | formatDate}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import Star from 'components/star/star';
import RatingSelect from 'components/ratingSelect/ratingSelect';
import Split from 'components/split/split';
import {formatDate} from 'src/common/js/date';
import BScroll from 'better-scroll';

    const ALL=2;
    const POSITIVE=0;
	const NEGATIVE=1;

    export default {
    	props:{
    		sellerData:{
    			type:Object,
    			default(){
    				return {

    				}
    			}
    		}
    	},
    	components:{
    		Star,
    		RatingSelect,
    		Split
    	},
    	data(){
    		return{
    			selectDesc:{
    				all:'全部',
                    positive:'满意',
                    negative:'不满意'
    			},
    			ratings:[],
    			selectType:ALL,
    			onlyContent:false
    		}
    	},
    	created(){
    		this.$http.get('/api/ratings').then((res)=>{
    			this.ratings=res.body.data;
    			this.$nextTick(()=>{
    				if(!this.scroll){
    					this.scroll=new BScroll(this.$refs.ratings,{
    						click:true
    					})
    				}
    			})
    		})
    	},

    	filters:{
    		formatDate(date){
    			let time=new Date(date);
    			return formatDate(time,'yyyy-MM-dd hh:mm');
    		}
    	},
        methods:{
            needShow(text,type){
                if(!text&&this.onlyContent===true){
                    return false;
                }
                if(this.selectType===ALL){
                    return true;
                }else{
                    return this.selectType===type;
                }

            },
            toogleContent(){
                this.onlyContent=!this.onlyContent;
            },
            select(which){
                this.selectType=which;
            }
        }
    }
</script>
<style rel="stylesheet" scoped>
    .ratings{
    	position: absolute;
    	top:175px;
    	bottom:0;
    	left:0;
    	width:100%;
    	background-color: #fff;
    	overflow: hidden;
    }
    .overView{
    	display: flex;
    	padding:18px 0;
    }
    .overView-left{
    	flex:0,0,137px;
    	width:137px;
    	text-align: center;
    	border-right: 1px solid rgba(7,17,27,0.1);
    }
    .overView-left .score{
    	font-size: 24px;
    	line-height: 28px;
    	color:rgb(255,153,0);
    }
    .overView-left .title{
    	padding:6px 0 8px;
    	font-size: 12px;
    	line-height: 12px;
    	color:rgb(7,17,27);
    }
    .overView-left .desc{
    	padding-bottom: 6px;
    	font-size: 10px;
    	line-height: 10px;
    	color:rgb(127,153,159);
    }
    .overView-right{
    	flex: 1;
    	padding:0 24px;
    }
    .overView-right .title{
    	margin-right: 12px;
    	font-size: 12px;
    	line-height: 18px;
    	color:rgb(7,17,27);
    }
    .overView-right .foodLine{
    	padding:8px 0;
    }
    
    .overView-right .star-wrap{
    	display: inline-block;
    	margin-right: 12px;
    	vertical-align: middle;
    }
    .overView-right .num{
    	font-size: 12px;
    	line-height: 18px;
    	color:rgb(255,153,0);
    }
    .overView-right .time{
    	font-size: 12px;
    	line-height: 18px;
    	color:rgb(127,153,159);
    }
    .ratingSelect-wrap{
    	padding:18px 18px 0;
    	border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .ratings-list{
    	padding:0 18px;
    }
    .ratings-list .item{
		position: relative;
		padding:18px 0;
    }
    .ratings-list .border-1p:after{
    	background-color:rgba(7,17,27,0.1); 
    }
    .ratings-list .avatar{
    	float:left;
		border-radius: 50%;
    }
    .ratings-list .content{
    	padding-left: 40px;
    }
    .ratings-list .username{
    	font-size: 10px;
    	line-height: 12px;
    	color:rgb(7,17,27);
    }
    .ratings-list .star{
    	display: inline-block;
    	margin-right: 6px;
    }
    .ratings-list .deliveryTime{
    	font-size: 10px;
    	line-height: 12px;
    	color:rgb(147,153,159);
    }
    .ratings-list .score-wrap{
    	padding-top:4px;
    	font-size: 0;
    }
    .ratings-list .text{
    	padding:6px 0 8px;
    	font-size: 12px;
    	line-height: 18px;
    	color:rgb(7,17,27);
    }

    .ratings-list .icon-thumb_down{
    	color:rgb(183,187,191);
    }
    .ratings-list .icon-thumb_up{
		color:rgb(0,160,220);
    }
    .ratings-list .recommend{
    	display: inline-block;
    	box-sizing: border-box;
    	max-width:64px;
    	margin-left: 8px;
    	padding:0 6px;
    	color:rgb(147,153,159);
    	line-height: 16px;
    	font-size: 9px;
    	text-align: center;
    	border:1px solid rgba(7,17,27,0.1);
    	border-radius: 1px;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	overflow: hidden;
    	vertical-align: top;
    }
    .ratings-list .time{
    	position: absolute;
    	top:18px;
    	right:0;
    	color:rgb(147,153,159);
    	font-size: 10px;
    	line-height: 12px;
    }
</style>