<template>
	<view>
	<view class="fileView">
		<template v-for="(item,index) in mixModifiedSplit" :key="index">
				<rich-text :nodes="item" use-anchor="ture"></rich-text>
					<view v-if="index%2 != 0">{{"———————————————————"}}</view>
		</template>
		
	</view>
	

	</view>
</template>

<script>

	import {
				mapMutations,
				mapState,
		} from 'vuex' 
	
	
	export default {

		computed:{
			...mapState({
				modifiedSplit:state=>state.modifiedSplit,
				mixModifiedSplit:state =>state.mixModifiedSplit
			}),
		},
		onload(){
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
	margin: 1rem auto;
	padding: 0 1rem;
	width: 675rpx;

	background-color: aliceblue;
}
</style>
