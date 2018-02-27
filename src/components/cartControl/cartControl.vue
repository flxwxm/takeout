<template>
	<div class="cartControl">
		<transition name="decrease">
			<span class="decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decrease"></span>
		</transition>
		<transition name="count">
		  <span class="count" v-show="food.count">{{food.count}}</span>
		</transition>
		<span class="add icon-add_circle" @click.stop.prevent="add($event)"></span>
	</div>
</template>

<script type="text/javascript">
	import Vue from "vue";
	export default {
		props:{
			food:{
				type:Object,
			}
		},
		methods:{
			add(event){
				if(!this.food.count){
					Vue.set(this.food,'count',1)
				}else{
					this.food.count+=1;
				}
				this.$emit("on-getball",event.target)
			},
			decrease(){
				this.food.count-=1;
			}
		}
	}
</script>

<style type="text/css" scoped>
    .cartControl{
    	font-size: 0;
    }
	.cartControl .decrease,.cartControl .count,.cartControl .add{
		display: inline-block;
		width:24px;
		line-height: 24px;
	}
	.cartControl .decrease,.cartControl .add{
		border-radius: 50%;
		font-size: 24px;
		color:rgb(0,160,220);
	}
	.cartControl .count{
		text-align: center;
		font-size: 10px;
		vertical-align: top;
		color:rgb(147,153,159);
	}
	.decrease-enter,.decrease-leave-to{
		transform: translateX(24px) rotate(0);
		opacity: 0;
	}
	.decrease-enter-to,.decrease-leave{
		transform: translateX(0) rotate(-180deg);
		opacity: 1;
	}
	.decrease-enter-active,.decrease-leave-active{
		transition: all .5s;
	}
</style>