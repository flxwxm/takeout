<template>
	<div>
		<div class="shopcart">
			<div class="content">
				<div class="content-left" @click="toggleShopList">
					<div class="icon">
						<i class="icon-shopping_cart" :class="{hightLight:totalCount>0}"></i>
						<span class="num" v-show="totalCount>0">{{totalCount}}</span>
					</div>
					<div class="price">￥{{totalPrice}}</div>
					<div class="desc">另需配送费￥{{sellerData.deliveryPrice}}元</div>
				</div>
				<div class="content-right" :class="{hightLight:totalPrice>=sellerData.minPrice}" @click="pay">{{payDesc}}</div>
			</div>
			<div class="balls-wrap">
				<template  v-for="ball in balls">
					<transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
						<div class="ball"  v-show="ball.show">
							<div class="inner"></div>
						</div>
					</transition>
				</template>
			</div>
		</div>
		<transition name="shopList">
				<div class="shopList" v-show="isShowShopList">
					<div class="header">
						<span class="title">购物车</span>
						<span class="clear" @click="empty">清空</span>
					</div>
					<div class="main" ref="shopList">
						<ul>
							<li v-for="item in selectFoods" class="border-1p">
								<span class="name">{{item.name}}</span>
								<span class="price"><span class="unit">￥</span><span class="num">{{item.price}}</span></span>
								<div class="control-wrap">
									<cart-control :food="item"></cart-control>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
			<transition name="shade">
				<div class="shade" v-show="isShowShopList" @click="hideList"></div>
			</transition>
	</div>
</template>
<script type="text/javascript">
import CartControl from 'components/cartControl/cartControl';
import BScroll from 'better-scroll';
	export default {
		components:{
			CartControl 
		},
		props:{
			sellerData:{
				type:Object
			},
			selectFoods:{
				type:Array,
				default(){
					return [
						{
							price:0,
							count:0
						}
					]
				}
			}


		},
		data () {
			return{
				balls:[
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
				],
				dropBalls:[],
				isShowShopList:false
			}
		},
		computed:{
			totalCount(){
				let totalCount=0;
				this.selectFoods.forEach(item=>{
					totalCount+=item.count;
				});
				return totalCount;
			},
			totalPrice(){
				let totalPrice=0;
				this.selectFoods.forEach(item=>{
					totalPrice+=(item.price*item.count);
				});
				return totalPrice;
			},
			payDesc(){
				if(this.totalPrice===0){
					return `￥${this.sellerData.minPrice}起送`;
				}else if(this.totalPrice<this.sellerData.minPrice){
					let diff=this.sellerData.minPrice-this.totalPrice;
					return `还差￥${diff}起送`;
				}else{
					return '去结算'
				}
			},
			isShowShade(){
				return this.isShowShopList;
			}
		
		},
		methods:{
			getBall(el){
				for(let i=0;i<this.balls.length;i++){
					let ball=this.balls[i];
					if(!ball.show){
						ball.show=true;
						ball.el=el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeDrop(el){
				let count=this.balls.length;
				while(count--){
					let ball=this.balls[count];
					if(ball.show){
						let elRect=ball.el.getBoundingClientRect();
						let y=-(window.innerHeight-elRect.top-22);
						let x=elRect.left-32;
						el.style.display="";
						el.style.transform=`translate3d(0,${y}px,0)`;
						el.style.webkitTransform=`translate3d(0,${y}px,0)`;
						let inner=el.getElementsByClassName("inner")[0];
						inner.style.transform=`translate3d(${x}px,0,0)`;
						inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
					}
				}
			},
			afterDrop(el){
				let ball=this.dropBalls.shift();
				if(ball){
					ball.show=false;
					el.style.display="none";
				}
			},
			dropping(el,done){
				let rf = el.offsetHeight;
				this.$nextTick(()=>{
					el.style.transform="translate3d(0,0,0)";
					el.style.WebkitTransform="translate3d(0,0,0)";
					let inner=el.getElementsByClassName("inner")[0];
					inner.style.transform="transate3d(0,0,0)";
					inner.style.WebkitTransform="translate3d(0,0,0)";
					el.addEventListener('transitionend', done);
				})
				
			},
			toggleShopList(){
				if(!this.totalCount){
					return;
				}
				this.isShowShopList=!this.isShowShopList;
				this.$nextTick(()=>{
					if(this.isShowShopList){
						if(!this.scroll){
							this.scroll=new BScroll(this.$refs.shopList,{
								click:true
							})
						}else{
							this.scroll.refresh();
						}
					}
				})

			},
			empty(){
				this.selectFoods.forEach((food)=>{
					if(food.count){
						food.count=0;
					}
				})
				this.isShowShopList=false;
			},
			hideList(){
				this.isShowShopList=false;
			},
			pay(){
				if(this.totalPrice<this.sellerData.minPrice){
					return;
				}
				let total=this.totalPrice+this.sellerData.deliveryPrice;
				window.alert(`请支付￥${total}元`)
			}

		}
		// created () {
		//     this.$http.get('/api/seller').then(res=>{
		//       res=res.body;
		//       this.sellerData=res.data;
		//     })
		// }
	}
</script>
<style type="text/css" scoped>
	.shade{
		position: fixed;
		z-index: 50;
		bottom:0;
		left:0;
		width:100%;
		height:100%;
		background-color: rgba(7,17,27,0.6);
	}
	.shade-enter-to,.shade-leave{
		opacity: 1;
	}
	.shade-enter,.shade-leave-to{
		opacity: 0;
	}
	.shade-enter-active,.shade-leave-active{
		transition: all .4s;
	}
	.shopcart{
		position: fixed;
		z-index: 200;
		bottom:0;
		left:0;
		width:100%;
		height:48px;
		background-color: #141d27;
	}
	.shopcart .content{
		display: flex;
	}
	.shopcart .content-left{
		flex: 1;
		font-size: 0;
	}
	.content-left .icon{
		display:inline-block;
		position: relative;
		top:-10px;
		left:12px;
		width:56px;
		height:56px;
		padding:6px;
		box-sizing: border-box;
		border-radius: 50%;
		background-color:#141d27; 
	}
	.content-left .icon .icon-shopping_cart{
		display:block;
		height:100%;
		font-size: 24px;
		line-height: 44px;
		color:rgba(255,255,255,0.4);
		border-radius: 50%;
		background-color: #2b343c;
		text-align: center;
	}
	.content-left .icon-shopping_cart.hightLight{
		background-color: #00a0dc;
		color:#fff;
	}
	.content-left .icon .num{
		position: absolute;
		top:0;
		right:0;
		width:24px;
		height:16px;
		font-size: 10px;
		color:#fff;
		border-radius: 8px;
		background-color: #f01414;
		text-align: center;
		line-height: 16px;
		box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
	}
	.content-left .price{
		display: inline-block;
		margin-left:18px;
		margin-top:12px;
		padding-right: 12px;
		font-size: 16px; 
		font-weight: 700;
		color:rgba(255,255,255,0.4);
		line-height: 24px;
		vertical-align: top;
		border-right:1px solid rgba(255,255,255,0.1);
	}
	.content-left .price.hightLight{
		color:#fff;
	}
	.content-left .desc{
		display: inline-block;
		height:48px;
		padding:0 12px;
		font-size: 10px;
		line-height: 48px;
		color:rgba(255,255,255,0.4);
		vertical-align: top;
	}
	.shopcart .content-right{
		flex: 0 0 105px;
		width:105px;
		padding:0 8px;
		color:rgba(255,255,255,0.4);
		font-weight: 700;
		font-size: 12px;
		text-align: center;
		line-height: 48px;
		background-color: #2b333b;
		box-sizing: border-box;
	}
	.shopcart .content-right.hightLight{
		background-color: #00b43c;
		color:#fff;
	}
	.balls-wrap .ball{
		position: fixed;
		bottom:22px;
		left: 32px;
		z-index: 200;
		transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
	}
	.balls-wrap .ball .inner{
		width:16px;
		height:16px;
		background: rgb(0, 160, 220);
		border-radius: 50%;
		transition: all .4s linear;
	}
	.shopList{
		position: fixed;
		bottom:48px;
		left:0;
		z-index:100;
		width:100%;
		background-color: #fff;
	}
	.shopList .header{
		display: flex;
		line-height: 40px;
		background-color: #f3f5f7;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.shopList .header .title{
		flex:1;
		padding-left: 18px;
		font-size: 14px;
		color:rgb(7,17,27);
	}
	.shopList .header .clear{
		flex:1;
		padding-right: 18px;
		font-size: 12px;
		color:rgb(0,160,220);
		text-align: right;
	}
	.shopList .main{
		padding:0 18px;
		max-height: 218px;
		overflow: hidden;
	}
	.shopList .main li{
		position: relative;
		padding:12px 0;
	}
	.shopList .main .border-1p:after{
		background:rgba(7,17,27,0.1);
	}
	.shopList .main li:last-child:after{
		display: none;
	}
	.shopList .main .title{
		font-size: 14px;
		color:rgb(7,17,27);
		line-height: 24px;
	}
	.shopList .main .control-wrap{
		position: absolute;
		right:0;
		bottom:6px;
	}
	.shopList .main .price{
		position: absolute;
		right:90px;
		bottom:4px;
		line-height: 24px;
		color:rgb(240,20,20);
	}
	.shopList .price .unit{
		font-size: 10px;
	}
	.shopList .price .num{
		font-size: 14px;
		font-weight: 700;
	}
	.shopList-enter,.shopList-leave-to{
		transform: translate3d(0,100%,0);
	}
	.shopList-enter-active,.shopList-leave-active{
		transition:all .4s;
	}
</style>