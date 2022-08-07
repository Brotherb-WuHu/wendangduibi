<template>
<view>
	<lsj-upload 
	    ref="lsjUpload"
	    childId="upload1"
	    :width="width"
	    :height="height"
	    :option="option"
	    :size="size"
	    :formats="formats"
	    :debug="debug"
	    :instantly="instantly"
	    @progress=""
	    @change="onChange"
		@uploadEnd="onuploadEnd">
	        <button class="btn" :style="{width: width,height: height}">
				<image src="../../static/upload.ico" class="btnImg"></image>
			</button> 
	</lsj-upload>
	
	<uni-popup ref="suspop" type="message">
		<uni-popup-message type="success" message="成功上传!" :duration="3000"></uni-popup-message>
	</uni-popup>
	<uni-popup ref="faipop" type="message">
		<uni-popup-message type="error" message="上传失败!!" :duration="3000"></uni-popup-message>
	</uni-popup>
	
	
	
	<view class="padding">
	    <view>已选择文件列表：</view>
	    <view v-for="(item,index) in wxFiles" :key="index">
	        <text>{{item.name}}</text>
			<text style="margin-left: 10rpx;">大小：{{item.size}}</text>
			<text style="margin-left: 10rpx;">进度：{{item.progress}}</text>
	    </view>
	</view>
</view>
</template>


<script>
	import {
				mapMutations,
				mapState
		} from 'vuex' 
	
	export default {
	    data() {
	        return {
	            // 上传接口参数
	            option: {
	                // 上传服务器地址，此地址需要替换为你的接口地址
	                url: 'https://www.falvzhushou.cn:8001/api/upload',
					// 上传附件的key
					name: 'file',
	                // 根据你接口需求自定义body参数
	                formData: {
	                    'file1':'FileName1',
	                }
	            },
	            // 选择文件后是否立即自动上传，true=选择后立即上传
	            instantly: true,
	            // 必传宽高且宽高应与slot宽高保持一致
	            width: '650rpx',
	            height: '10rem',
	            // 限制允许选择的格式，空串=不限制，默认为空
	            formats: 'docx,doc',
	            // 文件上传大小限制
	            size: 1,
	            // 文件回显列表
	            files: new Map(),
	            // 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
	            wxFiles: [],
	            // 是否打印日志
	            debug: false,
	        }
	    },
	    methods: {
			...mapMutations(['updateFileName']),
			
	        // 某文件上传结束回调(成功失败都回调)
	        onuploadEnd(item) {
	            console.log(`${item.name}已上传结束，上传状态=${item.type}`);
	
	            // 更新当前状态变化的文件
	            this.files.set(item.name,item);
	
	            // 演示上传完成后取服务端数据
	            if (item['responseText']) {
	                // console.log('演示服务器返回的字符串JSON转对象');
					let responseText = this.files.get(item.name).responseText;
	                responseText = JSON.parse(item.responseText);
					this.updateFileName(responseText.data)
					
	            }
	
	            // 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
	            // #ifdef MP-WEIXIN
	            this.wxFiles = [...this.files.values()];
	            // #endif
	
	            // 强制更新视图
	            this.$forceUpdate();
	
				// 弹窗
				 if(item.type == 'success'){
					 this.$refs.suspop.open('bottom')
				 } else if(item.type == 'fail'){
					 this.$refs.faipop.open('bottom')
				 }
	
	        },

	        // 文件选择回调
	        onChange(files) {
	            // 更新选择的文件
	            this.files = files;
	            // 强制更新视图
	            this.$forceUpdate();
	
	            // 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
	            // #ifdef MP-WEIXIN
	            this.wxFiles = [...this.files.values()];
	            // #endif
	        },
	    },
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.btn{
	margin: 1rem 2rem;
	background-color: #007AFF;
	border-radius: 10rpx;
	}
	
	.btnImg{
		margin: 1.5rem ;
		width: 150rpx;
		height: 5rem;
	}
</style>
