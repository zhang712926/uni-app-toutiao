<template>
	<!-- 该部分为下拉容器 绑定容器的高度（页面内容高度 - 距离顶部距离），并绑定下拉的偏移量和回弹过渡时间
h5中 100vh会包含tabbar高度  因此需使用100%替换 -->

	<!-- #ifdef H5 -->
	<view class="refresh-content" 
	@touchstart="handleTouchstart"
	@touchmove="handleTouchmove"
	@touchend="handleTouchend"
	:style="{
		transform: 'translateY('+pageDeviation+'px)',
		transition: pageTransition + 's',
		height: 'calc(100% - ' + pageTop + 'px)',
		maxHeight: 'calc(100% - ' + pageTop + 'px)',
	}">
	<!-- #endif -->
	<!-- #ifndef H5 -->
	<view class="refresh-content" 
	@touchstart="handleTouchstart"
	@touchmove="handleTouchmove"
	@touchend="handleTouchend"
	:style="{
		transform: 'translateY('+pageDeviation+'px)',
		transition: pageTransition + 's',
		height: 'calc(100vh - ' + pageTop + 'px)',
		maxHeight: 'calc(100vh - ' + pageTop + 'px)',
	}">
	<!-- #endif -->
		<!-- 下拉刷新icon -->
		<view class="loading-wrapper">
			<view class="loading-icon iconfont">&#xe6fe;</view>
		</view>
		<!-- 插槽 -->
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			top: {
				// 距离顶部距离, 单位upx
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				pageDeviation: 0,
				pageTransition: 0,
				startY: 0,
				moveY: 0,
				touchend: false
			}
		},
		computed: {
			pageTop() {
				return uni.upx2px(this.top);
			}
		},
		methods:{
			handleTouchstart(e){
				
				this.touchend = false;
				this.pageTransition = 0;
				this.startY = e.touches[0].pageY;
			},
			handleTouchmove(e){
				
				if(this.touchend){
					return;
				}
				
				this.moveY = e.touches[0].pageY - this.startY;
				
				if(this.moveY >= 0){
					this.pageDeviation = this.moveY;
				}
			},
			handleTouchend(e){
				
				this.touchend = true;
				if(this.moveY == 0){
					return;
				}
				
				this.pageTransition = 0.3;
				
				if(this.moveY >= 50){
					// 加载数据
					this.startPulldownRefresh();
				}else {
					this.pageDeviation = 0;
				}
				
				this.startY = this.moveY = 0;
			},
			startPulldownRefresh(){
				// console.log("加载数据");
				this.pageDeviation = uni.upx2px(90);
				// 加载数据
				this.$emit('refresh');
			},
			endPulldownRefresh(){
				this.pageDeviation = uni.upx2px(0);
			}
		}
	}
</script>

<style lang="scss">
	.refresh-content {
		display: flex;
		flex-direction: column;
		position: relative;
		flex: 1;

		/* 下拉刷新部分 */
		.loading-wrapper {
			position: absolute;
			left: 0;
			top: 0;
			transform: translateY(-100%);
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;

			.loading-icon {
				width: 70upx;
				height: 70upx;
				transition: .3s;
			}

			.loading-icon.ready {
				transform: scaleX(1.3);
			}

			.loading-icon.active {
				animation: loading .5s ease-in infinite both alternate;
			}
		}

	}

	@keyframes loading {
		0% {
			transform: translateY(-20upx) scaleX(1);
		}

		100% {
			transform: translateY(4upx) scaleX(1.3);
		}
	}
</style>
