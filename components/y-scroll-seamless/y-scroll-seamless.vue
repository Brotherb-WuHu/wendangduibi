<template>
	<view ref="scrollSeamless" class="scroll-seamless">
		<view ref="scrollPanel" @touchstart="stopScroll" @touchend="startScroll" class="scroll-seamless-panel"
			:style="{marginTop: marginTop+'px',marginLeft: marginLeft+'px',whiteSpace: needNowrap ? 'nowrap' : ''}">
			<view ref="realRect" :style="{display: needNowrap ? 'inline-block' : 'block'}">
				<slot></slot>
			</view>
			<view v-if="needSlot" :style="{display: needNowrap ? 'inline-block' : 'block'}">
				<slot></slot>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			options: {
				type: Object,
				default: function() {
					return {
						// up,down,left,right
						direction: 'up',
						// 滚动速度
						step: 1,
						// 触摸停止滚动
						hoverStop: true
					}
				}
			}

		},
		data() {
			return {
				// 外层容器
				seamLessRect: {},
				// 滚动面板
				scrollPanelRect: {},
				// 数据源高度
				realRect: {},
				// 滚动上边距
				marginTop: 0,
				// 滚动左边距
				marginLeft: 0,
				// 滚动定时器
				timer: null,
				// 是否追加滚动所需内容
				needSlot: true,
				// 是否需要不换行显示
				needNowrap: false
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.seamLessRect = this.$refs['scrollSeamless'].$el.getBoundingClientRect();
				this.scrollPanelRect = this.$refs['scrollPanel'].$el.getBoundingClientRect();
				this.realRect = this.$refs['realRect'].$el.getBoundingClientRect();
				switch (this.options.direction) {
					case 'up':
						if (this.seamLessRect.height > this.realRect.height) {
							this.needSlot = false;
							return
						};
						this.scrollUp();
						break;
					case 'down':
						if (this.seamLessRect.height > this.realRect.height) {
							this.needSlot = false;
							return
						};
						this.marginTop = this.seamLessRect.height - this.scrollPanelRect.height;
						this.scrolldown();
						break;
					case 'left':
						this.needNowrap = true;
						setTimeout(() => {
							this.seamLessRect = this.$refs['scrollSeamless'].$el.getBoundingClientRect();
							this.scrollPanelRect = this.$refs['scrollPanel'].$el.getBoundingClientRect();
							this.realRect = this.$refs['realRect'].$el.getBoundingClientRect();
							if (this.seamLessRect.width > this.realRect.width) {
								this.needSlot = false;
								return
							};
							this.scrollLeft();
						}, 0)


						break;
					case 'right':
						this.needNowrap = true;
						setTimeout(() => {
							this.seamLessRect = this.$refs['scrollSeamless'].$el.getBoundingClientRect();
							this.scrollPanelRect = this.$refs['scrollPanel'].$el.getBoundingClientRect();
							this.realRect = this.$refs['realRect'].$el.getBoundingClientRect();
							if (this.seamLessRect.width > this.realRect.width) {
								this.needSlot = false;
								return
							};
							this.marginLeft = this.seamLessRect.width - this.realRect.width * 2;
							this.scrollRight();
						}, 0)
						break;
					default:
						if (this.seamLessRect.height > this.realRect.height) {
							this.needSlot = false;
							return
						};
						this.scrollUp();
				}
			},
			// 向上滚动
			scrollUp() {
				this.timer = setInterval(() => {
					this.marginTop = this.marginTop - this.options.step;
					if (Math.abs(this.marginTop) >= this.realRect.height) {
						this.marginTop = 0;
					}
				}, 50)
			},
			// 向下滚动
			scrolldown() {
				this.timer = setInterval(() => {
					this.marginTop = this.marginTop + this.options.step;
					if (Math.abs(this.marginTop) <= (this.realRect.height - this.seamLessRect.height)) {
						this.marginTop = this.seamLessRect.height - this.scrollPanelRect.height;
					}
				}, 50)
			},
			// 向左滚动
			scrollLeft() {
				this.timer = setInterval(() => {
					this.marginLeft = this.marginLeft - this.options.step;
					if (Math.abs(this.marginLeft) >= this.realRect.width) {
						this.marginLeft = 0;
					}
				}, 50)
			},
			// 向右滚动
			scrollRight() {
				this.timer = setInterval(() => {
					this.marginLeft = this.marginLeft + this.options.step;
					if (Math.abs(this.marginLeft) <= this.realRect.width - this.seamLessRect.width) {
						this.marginLeft = this.seamLessRect.width - this.realRect.width * 2;
					}
				}, 50)
			},
			// 停止滚动
			stopScroll() {
				if (this.options.hoverStop && this.timer != null) {
					clearInterval(this.timer);
				}
			},
			// 继续滚动
			startScroll() {
				switch (this.options.direction) {
					case 'up':
						if (this.seamLessRect.height > this.realRect.height) return;
						this.scrollUp();
						break;
					case 'down':
						if (this.seamLessRect.height > this.realRect.height) return;
						this.scrolldown();
						break;
					case 'left':
						if (this.seamLessRect.width > this.realRect.width) return;
						this.scrollLeft();
						break;
					case 'right':
						if (this.seamLessRect.width > this.realRect.width) return;
						this.scrollRight();
						break;
					default:
						if (this.seamLessRect.height > this.realRect.height) return;
						this.scrollUp();
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.scroll-seamless {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.scroll-seamless-panel {}
	}
</style>
