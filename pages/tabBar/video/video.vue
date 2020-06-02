<template>
	<view class="container">
		<pulldownRefresh ref="pulldownRefresh" @refresh="initVideoData">
			<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadMoreData">
				<view @tap="handleVideoDetail(videoItem)" v-for="(videoItem,index) in videoList" :key="index">
					<videoCell :videoItem="videoItem"></videoCell>
				</view>
				<!-- 上拉加载 -->
				<loadMore :status="loadMoreStatus"></loadMore>
				<view :style="{height: footerbottom}"></view>
			</scroll-view>
		</pulldownRefresh>
	</view>
</template>

<script>
	import interfaces from '../../../utils/interfaces.js';
	import videoCell from '../../../components/video/videoCell.vue';
	import pulldownRefresh from '../../../components/pulldown/pulldown.vue';
	import loadMore from '../../../components/loadMore/loadMore.vue';
	export default {
		components: {
			videoCell,
			pulldownRefresh,
			loadMore
		},
		data() {
			return {
				videoList: [],
				page: 1,
				size: 10,
				loadMoreStatus: 0,
				footerbottom: 0
			}
		},
		onLoad() {
			this.initVideoData();
			// 兼容h5的底部菜单
			// #ifdef H5
			this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight + "px";
			// #endif
		},
		methods: {
			initVideoData() {
				this.page = 1;
				this.request({
					url: interfaces.getVideoList + `${this.page}/${this.size}`,
					success: (res => {
						this.videoList = res.data;
						this.loadMoreStatus = 0;
						this.$refs.pulldownRefresh && this.$refs.pulldownRefresh.endPulldownRefresh();
					})
				})
			},
			loadMoreData() {
				// 更改加载页数
				this.page++;
				this.loadMoreStatus = 1;
				// 数据请求
				this.request({
					url: interfaces.getVideoList + `${this.page}/${this.size}`,
					success: (res => {
						if (res.data.length > 0) {
							res.data.forEach(item => {
								this.videoList.push(item);
							})
							this.loadMoreStatus = 0;
						} else {
							// 返回数据为空 没有更多数据
							this.loadMoreStatus = 2;
							return false;
						}
					})
				})
			},
			handleVideoDetail(videoItem){
				uni.navigateTo({
					url:"./videoDetail"
				})
			}
		}
	}
</script>

<style lang="scss">
	.panel-scroll-box {
		height: 100%;
		// #ifdef H5
		height: calc(100% - 88upx);
		// #endif
	}
</style>
