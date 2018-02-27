<template>
	<div class="goods">
		<div class="menu-wrap" ref="menuWrap">
			<ul class="menu-list">
				<li v-for="(item,index) in goodsData" class="menu-item" :class="{current:index===currentIndex}" @click="selectList(index,$event)">
                    <div class="border-1p">
    					<span class="txt">
    						<span class="icon" v-if="item.type>0" :class="supports[item.type]"></span>{{item.name}}
    					</span>
                    </div>
				</li>
			</ul>
		</div>
		<div class="food-wrap" ref="foodWrap">
			<ul>
				<li v-for="item in goodsData" class="j-food-item">
					<h1 class="title">{{item.name}}</h1>
					<ul class="foods-list">
						<li v-for="food in item.foods" @click="selectFood(food,$event)" class="item border-1p">
							<div class="item-inner">
								<div class="icon">
									<img :src="food.icon" width="57" height="57">
								</div>
								<div class="content">
									<h2 class="food-title">{{food.name}}</h2>
									<p v-if="food.description" class="description">{{food.description}}</p>
									<div class="info">
										<span class="count">月售{{food.sellCount}}份</span>
										<span>好评率{{food.rating}}%</span>
									</div>
									<div>
										<span class="nowPrice">￥<span class="num">{{food.price}}</span></span><span  class="oldPrice" v-if="food.oldPrice">￥<span class="num">{{food.oldPrice}}</span></span>
									</div>
								</div>
                                <div class="control-wrap">
                                    <cart-control :food="food" @on-getball="getBall($event)"></cart-control>
                                </div>
							</div>
						</li>
					</ul>
					
				</li>
			</ul>
		</div>
        <shopcart :seller-data="sellerData" :select-foods="selectFoods" ref="shopcart"></shopcart>
        <food :food="selectedFood" @on-getball="getBall($event)" ref="food"></food>
	</div>
</template>
<script>
import BScroll from 'better-scroll';
import Shopcart from 'components/shopcart/shopcart';
import CartControl from 'components/cartControl/cartControl';
import Food from 'components/food/food';

    export default {
        props:{
            sellerData:{
                type:Object
            }
        },
        components:{
            Shopcart,
            CartControl,
            Food
        },
    	data () {
    		return {
    			goodsData:[],
    			supports:["decrease","discount","special","invoice","guarantee"],
    			listHeight:[],
    			scrollY:0,
                selectedFood:{}
    		}
    	},
    	created(){
    		this.$http.get("/api/goods").then(res=>{
    			this.goodsData=res.body.data;
    			this.$nextTick(()=>{
    				this._initScroll();
                    this._calculateHeight();
    			})
    		})
    	},
    	computed:{
    		currentIndex(){
    			for(let i=0;i<this.listHeight.length;i++){
					let minHeight=this.listHeight[i];
					let maxHeight=this.listHeight[i+1];
					if(!maxHeight||(this.scrollY>=minHeight&&this.scrollY<maxHeight)){
						return i;
					}
				}
				return 0;
    		},
            selectFoods(){
                let selectFoods=[];
                this.goodsData.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if(food.count){
                            selectFoods.push(food);
                        }
                    })
                });
                return selectFoods;
            }
    	},
    	methods: {
    		_initScroll(){
    			this.menuScroll=new BScroll(this.$refs.menuWrap,{
                    click:true
                });
    			this.foodScroll=new BScroll(this.$refs.foodWrap,{
    				probeType:3,
                    click:true
    			});
    			this.foodScroll.on('scroll',(pos)=>{
    				this.scrollY=Math.abs(Math.round(pos.y));
    				
    			});
    		},
    		_calculateHeight(){
    			let height=0;
    			let list=this.$refs.foodWrap.getElementsByClassName('j-food-item');
    			this.listHeight.push(height);
    			for(let i=0;i<list.length;i++){
    				height+=list[i].clientHeight;
    				this.listHeight.push(height);
    			}
    		},
            selectList(index,event){
                if(!event._constructed){
                    return;
                }
                let foodList=this.$refs.foodWrap.getElementsByClassName('j-food-item');
                this.foodScroll.scrollToElement(foodList[index],300)
            },
            getBall(target){
                
                this.$nextTick(()=>{
                    this.$refs.shopcart.getBall(target);
                })    // this.addBtn=target;
                    
                
                
            },
            selectFood(obj,event){
                if(!event._constructed){
                    return;
                }
                this.selectedFood=obj;
                this.$refs.food.showFood();
            }
    	}
    }
</script>
<style scoped>
    .goods{
    	position: absolute;
    	top:174px;
    	bottom:48px;
    	display: flex;
    	overflow: hidden;
    }
    .menu-wrap{
    	flex:0 0 80px;
    	width:80px;
    	background-color: #f3f5f7;
    }
    .food-wrap{
    	flex:1;
    }
    .menu-list{
    	/*;*/
    }
    .menu-item{
    	/*width:56px;*/
        padding:0 12px;
    	line-height: 14px;
    }
    .menu-item.current{
    	position: relative;
        margin-top:-1px;
        font-weight: 700;
    	background-color: #fff;
    }
    .menu-item.current .border-1p:after{
        display: none;
    }
    .menu-item .icon{
    	display: inline-block;
    	width:12px;
    	height:12px;
    	background-repeat: no-repeat;
    	background-size: 12px 12px;
    	vertical-align: middle;
    }
    .menu-item .icon.decrease{
    	background-image: url(decrease_3@2x.png)
    }
    .menu-item .icon.discount{
    	background-image: url(discount_3@2x.png)
    }
    .menu-item .icon.special{
    	background-image: url(special_3@2x.png)
    }
    .menu-item .icon.invoice{
    	background-image: url(invoice_3@2x.png)
    }
    .menu-item .icon.guarantee{
    	background-image: url(guarantee_3@2x.png)
    }
    .menu-item .txt{
    	display: table-cell;
    	width:56px;
    	height:54px;
    	vertical-align: middle;
    	font-size: 12px;
    }
    .menu-item .border-1p:after{
        background: rgba(7,17,27,0.1);
    }
    .food-wrap .title{
    	padding-left:14px;
    	font-size:12px;
    	line-height: 26px;
    	color:rgb(147,153,159);
    	border-left:1px solid #d9dde1;
    	background-color: #f3f5f7;
    }
    .foods-list .item{
        position: relative;
		padding:0 18px;
    }
    .foods-list .item-inner{
    	padding:18px 0;
    	display: flex;
    }
    .foods-list .item:after{
    	background:rgba(7,17,27,0.1); 
    }
    .foods-list .item:last-child:after{
    	display: none;
    }
    .foods-list .icon{
    	flex:0 0 57px;
    }
    .foods-list .content{
    	flex:1;
    	padding-left: 10px;
    }
    .foods-list .food-title{
    	margin-top:2px;
    	font-size: 14px;
    	line-height: 14px;
    	color:rgb(7,17,27);
    }
    .foods-list .description,.foods-list .info{
    	font-size: 10px;
    	line-height: 10px;
    	color:rgb(147,153,159);
    }
    .foods-list .description{
    	padding-top:8px;
    }
    .foods-list .info{
    	padding:8px 0;
    }
    .foods-list .count{
    	margin-right: 12px;
    }
    .foods-list .nowPrice{
    	color:rgb(240,20,20);
    	font-size: 10px;
    }
    .foods-list .nowPrice .num{
    	font-size: 14px;
    	font-weight: 700;
    }
    .foods-list .oldPrice{
    	margin-left: 8px;
    	font-size: 10px;
    	color:rgb(147,153,159);
    	text-decoration: line-through;
    	vertical-align: middle;

    }
    .foods-list .oldPrice .num{
    	font-weight: 700;
    }
    .foods-list .control-wrap{
        position: absolute;
        bottom:14px;
        right:18px;
    }
</style>