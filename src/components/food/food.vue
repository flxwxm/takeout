<template>
    <transition name="food">
    	<div class="food" v-show="isShowFood" ref="foodWrap">
            <div>
        	  <div class="imageHead">
                  <img :src="food.image">
                  <div class="back" @click="hideFood"><i class="icon-arrow_lift"></i></div>   
              </div>
              <div class="food-block info">
                  <h1>{{food.name}}</h1>
                  <div class="other">
                      <span class="sellCount">月销{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                      <span class="nowPrice">￥<span class="num">{{food.price}}</span></span><span  class="oldPrice" v-if="food.oldPrice">￥<span class="num">{{food.oldPrice}}</span></span>
                  </div>
                  <div class="cartControlWrap">
                      <cart-control :food="food"></cart-control>
                  </div>
                  <transition name="buyBtn">
                    <div class="buyBtn" v-show="!food.count||food.count===0" @click="addFirst($event)">加入购物车</div>
                  </transition>
                  
                </div>
                <split v-if="food.info"></split>
                <div class="food-block introduction" v-if="food.info">
                    <h2>商品介绍</h2>
                    <p class="detail">{{food.info}}</p>
                </div>
                <split></split>
                <div class="food-block rating">
                    <h2>商品评价</h2>
                    <div class="ratingSelect-wrap">
                        <rating-select :select-desc="selectDesc" :select-type="selectType" :only-content="onlyContent" :rating="food.ratings" @toggle-content="toogleContent" @select="select($event)"></rating-select>
                    </div>
                </div>
                <div class="rating-list">
                    <ul>
                        <li v-for="rating in food.ratings" class="border-1p" v-show="needShow(rating.text,rating.rateType)">
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            <div>
                                <i :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></i>
                                <span class="content">{{rating.text}}</span>
                            </div>
                            <div class="user">
                                <span class="account">{{rating.username}}</span>
                                <img class="avatar" :src="rating.avatar" width="12" height="12"/>
                            </div>
                        </li>
                    </ul>
                    <div class="noRating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
                </div>
            </div>
    	</div>
    </transition>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
import BScroll from 'better-scroll';
import CartControl from 'components/cartControl/cartControl';
import Split from 'components/split/split';
import RatingSelect from 'components/ratingSelect/ratingSelect';
import {formatDate} from 'src/common/js/date'

    const ALL=2;
    const POSITIVE=0;
    const NEGATIVE=1;       
    export default {
    	props:{
    		food:{
    			type:Object
    		}
    	},
        components:{
            CartControl,
            Split,
            RatingSelect
        },
    	data(){
    		return {
    			isShowFood:false,
                selectDesc:{
                    all:'全部',
                    positive:'推荐',
                    negative:'不推荐'
                },
                selectType:ALL,
                onlyContent:false
    		}
    	},
    	methods:{
    		showFood(){
    			this.isShowFood=true;
                this.$nextTick(()=>{
                    if(!this.scroll){
                        this.scroll=new BScroll(this.$refs.foodWrap,{
                            click:true
                        })
                    }else{
                        this.scroll.refresh();
                    }

                    
                })
    		},
            hideFood(){
                this.isShowFood=false;
            },
            addFirst(event){
                if(!event._constructed){
                    return;
                }
                this.$emit("on-getball",event.target)
                Vue.set(this.food,'count',1);
            },
            toogleContent(){
                this.onlyContent=!this.onlyContent;
            },
            select(which){
                this.selectType=which;
            },
            needShow(text,type){
                if(this.onlyContent&&!text){
                    return false;
                }
                if(this.selectType===ALL){
                    return true;
                }else{
                    return this.selectType===type;
                }
            }
    	},
        filters:{
            formatDate(time){
                let date=new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm');

            }
        }
    }
</script>
<style rel="stylesheet" scoped>
    .food{
    	position: fixed;
    	top:0;
    	bottom:48px;
    	left:0;
    	width:100%;
        background-color: #fff;
        overflow: hidden;
    }
    .food-enter,.food-leave-to{
        transform: translate3d(100%,0,0);
    }
    .food-enter-active,.food-leave-active{
        transition: all .4s;
    }
    .food .imageHead{
        position: relative;
        width:100%;
        text-align: center;
        /*padding-top:100%;*/
    }
    .food .imageHead img{
        /*position: absolute;
        top:0;
        left:0;*/
        max-width:100%;

    }
    .food .imageHead .back{
        position: absolute;
        left:0;
        top:0;
        padding:14px;
        color:#fff;
        font-size: 16px;
    }
    .food-block{
        padding:18px;
        background-color: #fff;
    }
    .food .info{
        position: relative;
    }
    .food .info h1{
        font-size: 14px;
        line-height: 14px;
        font-weight:700;
        color:rgb(7,17,27);
    }
    .food .info .other{
        padding:8px 0 18px;
        color:rgb(147,153,159);
        line-height: 10px;
        font-size: 10px;
    }
    .food .info .sellCount{
        margin-right: 12px;
    }
    .food .nowPrice{
        color:rgb(240,20,20);
        font-size: 10px;
    }
    .food .nowPrice .num{
        font-size: 14px;
        font-weight: 700;
    }
    .food .oldPrice{
        margin-left: 8px;
        font-size: 10px;
        color:rgb(147,153,159);
        text-decoration: line-through;
        vertical-align: middle;

    }
    .food .oldPrice .num{
        font-weight: 700;
    }
    .food .info .buyBtn{
        position: absolute;
        right:18px;
        bottom:18px;
        width:74px;
        height:24px;
        line-height: 24px;
        font-size: 10px;
        color:#fff;
        text-align: center;
        background-color: rgb(0,160,220);
        border-radius: 12px;
    }
    .buyBtn-leave,.buyBtn-enter-to{
        opacity: 1;
    }
    .buyBtn-leave-to,.buyBtn-enter{
        opacity: 0;
    }
    .buyBtn-leave-active{
        transition: all .4s;
    }
    .food .cartControlWrap{
        position: absolute;
        right:18px;
        bottom:18px;
    }
    .introduction h2,.rating h2{
        font-size: 14px;
        line-height: 14px;
    }
    .introduction .detail{
        padding:6px 0 0 8px;
        font-size: 12px;
        line-height: 24px;
        color:rgb(77,85,93);
    }
    .ratingSelect-wrap{
        margin-top:12px;
    }
    .rating-list{
        padding:0 18px 0;
        border-top:1px solid rgba(7,17,27,0.1);
    }
    .rating-list li{
        position: relative;
        padding:16px 0;
    }
    .rating-list .time,.rating-list .account{
        font-size: 10px;
        line-height: 12px;
        color:rgb(147,153,159);
    }
    .rating-list .time{
        margin-bottom: 6px;
    }
    .rating-list .icon-thumb_down,.rating-list .icon-thumb_up{
        font-size: 12px;
        line-height: 24px;
    }
    .rating-list .icon-thumb_down{
        color:rgb(147,153,159);
    }
    .rating-list .icon-thumb_up{
        color:rgb(0,160,220);
    }
    .rating-list .content{
        font-size: 12px;
        line-height: 16px;
        color:rgb(7,17,27);
    }
    .rating-list .user{
        position: absolute;
        right:0;
        top:16px;
    }
    .rating-list .avatar{
        margin-left: 6px;
        border-radius: 50%;
        vertical-align: middle;

    }
    .noRating{
        color:rgb(147,153,159);
        font-size: 12px;
        line-height: 48px;
        text-align: center;
    }
</style>