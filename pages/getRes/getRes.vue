<template>
	<view>
	<view class="title">文本A</view>


	<view class="fileView">
		<rich-text :nodes="modified1"></rich-text>
	</view>


	<view class="title">文本B</view>

	<view class="fileView">
		
			<rich-text :nodes="modified2" use-anchor="ture"></rich-text>
		
	</view>
	</view>
</template>

<script>
	import {
				mapMutations,
				mapState
		} from 'vuex' 
	
	
	export default {
		computed:{
			...mapState({
				modified1:state => state.modifiedList[0],
				modified2:state => state.modifiedList[1],
			})
		},
		onLoad() {
			this.updateState(),
			this.Showloading()
		},
		methods:{
			...mapMutations(['updateState']),
			
			Showloading(){
				uni.showLoading({
					title: '加载中'
				});
				
				setTimeout(function () {
					uni.hideLoading();
				}, 4000);
			},
		}
	}
</script>

<style>
	.title{
		text-align: center;
		font-size: 30rpx
		
	}
.fileView{
	overflow-x: hidden; 
	overflow-y: scroll; 
	margin: 1rem auto;
	padding: 0 1rem;
	width: 675rpx;
	height: 14rem;
	background-color: aliceblue;
}
</style>
