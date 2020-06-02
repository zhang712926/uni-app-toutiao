<template>
	<scroll-view class="video-detail" scroll-y>
		<!-- 头部 -->
		<view class="article-header" v-if="detailInfo">
			<view class="title">{{detailInfo.title}}</view>
			<view class="article-author">
				<view class="header-left" v-if="detailInfo.media_user">
					<image :src="detailInfo.media_user.avatar_url"></image>
					<text>{{detailInfo.media_user.screen_name}}</text>
				</view>
				<view class="header-right">
					<text v-if="detailInfo.publish_time">{{getTime(detailInfo.publish_time)}} </text>
					<text v-if="detailInfo.comment_count">{{detailInfo.comment_count}}评论</text>
				</view>
			</view>
		</view>
		<!-- video -->
		<view class="video-wrapper">
			<video :src="detailInfo.video_play_url" class="video" :poster="detailInfo.poster_url" controls objectFit="fill"
			 :autoplay="false"></video>
		</view>
		<!-- 相关推荐 -->
		<view class="content">
			<!-- 推荐 -->
			<view class="s-header"><text class="tit">相关推荐</text></view>
			<view class="rec-section" v-for="item in detailInfo.newsList" :key="item.id">
				<view class="rec-item">
					<view class="left">
						<text class="title">{{item.title}}</text>
						<view class="bot">
							<text class="author">{{item.author}}</text>
							<text class="time">{{item.time}}</text>
						</view>
					</view>
					<view class="right">
						<image class="img" :src="item.images[0]" mode="aspectFill"></image>
						<view class="video-tip">
							<view class="icon iconfont">&#xe604;</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部空间 -->
		<view :style="{height: footerbottom}"></view>
	</scroll-view>
</template>

<script>
	import interfaces from '../../../utils/interfaces.js';
	import {getUpdateTime} from '../../../utils/util.js'
	export default {
		data() {
			return {
				detailInfo: {},
				footerbottom: "0"
			}
		},
		onLoad() {
			this.getDetailData();
			// 兼容h5的导航条高度
			// #ifdef H5
			this.footerbottom = `${uni.upx2px(100)}px`;
			// #endif
		},
		methods: {
			getDetailData() {
				this.request({
					url: interfaces.getVideoDetail,
					success: (res => {
						this.detailInfo = res.data;
					})
				})
			},
			getTime(time){
				return getUpdateTime(time);
			}
		}
	}
</script>

<style lang="scss">
	.video-detail {
		height: 100vh;
		box-sizing: border-box;
		overflow: hidden;

		.article-header {
			padding: 32upx 30upx;

			.title {
				font-size: 48upx;
				line-height: 34upx;
				color: #222222;
			}

			.article-author {
				margin-top: 30upx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.header-left {
					display: flex;
					align-items: center;

					image {
						width: 46upx;
						height: 46upx;
						border-radius: 50%;
						display: inline-block;
					}

					text {
						margin-left: 10upx;
						display: flex;
						align-items: center;
						font-size: 26upx;
						font-weight: 500;
					}
				}

				.header-right {
					font-size: 26upx;
					color: #999;

				}
			}
		}

		.video-wrapper {
			margin-top: 40upx;
			width: 100%;
			padding: 0 30upx;
			box-sizing: border-box;
			height: 400upx;

			.video {
				width: 100%;
				height: 100%;
			}
		}

		.s-header {
			padding: 20upx 30upx;
			font-size: 30upx;
			color: #303133;
			background: #fff;
			margin-top: 26upx;

			&:before {
				content: '';
				width: 0;
				height: 40upx;
				margin-right: 24upx;
				border-left: 6upx solid #ec706b;
			}
		}

		/* 推荐列表 */
		.rec-section {
			background-color: #fff;

			.rec-item {
				display: flex;
				padding: 20upx 30upx;
				position: relative;

				&:after {
					content: '';
					position: absolute;
					left: 30upx;
					right: 0;
					bottom: 0;
					height: 0;
					border-bottom: 1px solid #eee;
					transform: scaleY(50%);
				}
			}

			.left {
				flex: 1;
				padding-right: 10upx;
				overflow: hidden;
				position: relative;

				.title {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					font-size: 32upx;
					color: #303133;
					line-height: 44upx;
				}

				.bot {
					position: absolute;
					left: 0;
					bottom: 4upx;
					font-size: 26upx;
					color: #909399;
				}

				.time {
					margin-left: 20upx;
				}
			}

			.right {
				width: 220upx;
				height: 140upx;
				flex-shrink: 0;
				position: relative;

				.img {
					width: 100%;
					height: 100%;
				}

				.video-tip {
					position: absolute;
					left: 0;
					top: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, .3);

					.icon {
						font-size: 50upx;
						color: #fff;
					}
				}
			}
		}
	}
</style>
