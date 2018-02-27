<template>
	<div class="star" :class="starType">
		<span v-for="item in starTypeClass" :class="item"></span>
	</div>
</template>
<script type="text/javascript">
	const MAX=5;
	const CLS_ON="on";
	const CLS_HALF="half";
	const CLS_OFF="off";

	export default {
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		data () {
			return {
				
			}
		},
		computed:{
			starType () { 
				return 'star-'+this.size
			},
			starTypeClass(){
				let arr=[];
				let isDecimal=this.score%1!==0;
				let integer=Math.floor(this.score);
				if(integer>0){
					for(let i=0;i<integer;i++){
						arr.push("on");
					}
				}
				if(isDecimal){
					arr.push("half");
				}
				while(arr.length<MAX){
					arr.push("off")
				}
				return arr;
			}
		}
	}
</script>
<style type="text/css" scoped>
	.star{}
	.star-48,.star-36,.star-24{font-size: 0;}
	.star-48 span{display: inline-block;width:24px;height:24px;background-size: 24px 24px;background-repeat: no-repeat;margin-right: 10px;}
	.star-48 span:last-child,.star-36 span:last-child,.star-24 span:last-child{margin-right: 0;}
	.star-36 span{display: inline-block;width:15px;height:15px;background-size: 15px 15px;background-repeat: no-repeat;margin-right: 6px;}
	.star-24 span{display: inline-block;width:10px;height:10px;background-size: 10px 10px;background-repeat: no-repeat;margin-right:4px;}
	.star-48 .on{background-image: url(star48_on@2x.png)}
	.star-48 .off{background-image: url(star48_off@2x.png)}
	.star-48 .half{background-image: url(star48_half@2x.png)}
	.star-36 .on{background-image: url(star36_on@2x.png)}
	.star-36 .off{background-image: url(star36_off@2x.png)}
	.star-36 .half{background-image: url(star36_half@2x.png)}
	.star-24 .on{background-image: url(star24_on@2x.png)}
	.star-24 .off{background-image: url(star24_off@2x.png)}
	.star-24 .half{background-image: url(star24_half@2x.png)}
</style>