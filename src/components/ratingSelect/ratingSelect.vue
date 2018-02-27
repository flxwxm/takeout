<template>
	<div class="ratingSelect">
	   <div class="btn-wrap border-1p">
            <span class="positive" :class="{active:selectType===2}" @click="select(2)">{{selectDesc.all}}<span class="num">{{rating.length}}</span></span>
            <span class="positive" :class="{active:selectType===0}" @click="select(0)">{{selectDesc.positive}}<span class="num">{{positive.length}}</span></span>
            <span class="negative" :class="{active:selectType===1}" @click="select(1)">{{selectDesc.negative}}<span class="num">{{negative.length}}</span></span>   
       </div>
       <div class="onlyContent" :class="{active:onlyContent}" @click="toggleContent">
           <i class="icon-check_circle" ></i>
           <span class="txt">只看有内容的评价</span>
       </div>
	</div>
</template>
<script type="text/ecmascript-6">
    const ALL=2;
    const POSITIVE=0;
    const NEGATIVE=1;
    export default {
        props:{
            rating:{
                type:Array,
                default(){
                    return [];
                }
            },
            selectDesc:{
                type:Object,
                default () {
                    return {
                        all:'全部',
                        positive:'满意',
                        negative:'不满意'
                    }
                }
            },
            selectType:{
                type:Number,
                default:ALL
            },
            onlyContent:{
                type:Boolean,
                default:false
            }
        },
        computed:{
            positive(){
                return this.rating.filter((item)=>{
                    return item.rateType===POSITIVE
                })
            },
            negative(){
                return this.rating.filter((item)=>{
                    return item.rateType===NEGATIVE
                })
            }
        },
        methods:{
            toggleContent(){
                this.$emit('toggle-content');
            },
            select(which){
                this.$emit('select',which);
            }
        }
    }
</script>
<style rel="stylesheet" scoped>
    .ratingSelect .btn-wrap{
        padding-bottom:18px;
        font-size: 0;
    }
    .ratingSelect .btn-wrap:after{
        background-color: rgba(7,17,27,0.1);
    }
    .ratingSelect .btn-wrap .num{
        font-size: 8px;
    }
    .ratingSelect .positive,.ratingSelect .negative{
        display: inline-block;
        padding:8px 12px;
        margin-right: 8px;
        font-size: 12px;
        line-height: 16px;
        border-radius: 2px;
    }
    .ratingSelect .all{
        color:#fff;
        background-color: rgb(0,160,220);
    }
    .ratingSelect .positive.active{
        color:#fff;
        background-color: rgb(0,160,220);
    }
    .ratingSelect .positive{
        color:rgb(77,85,93);
        background-color: rgba(0,160,220,0.2);
    }
    .ratingSelect .negative{
        color:rgb(77,85,93);
        background-color: rgba(77,85,93,0.2);
    }
    .ratingSelect .negative.active{
        color:#fff;
        background-color: #bbbec2;
    }
    .ratingSelect .onlyContent{
        padding:12px 0;
        line-height: 24px;
        color:rgb(147,153,159);
    }
    .ratingSelect .icon-check_circle{
        font-size: 24px;
        vertical-align: middle;
    }
    .ratingSelect .onlyContent.active{
        color:rgb(0,160,220);
    }
    .ratingSelect .onlyContent .txt{
        font-size: 12px;
    }
</style>