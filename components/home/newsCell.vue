<template>
	<view class="news-label-cell" @tap="$emit('cellTap',newsItem.article_url)">
		<!-- 详情信息 -->
		<view class="label-cell-detail">
			<!-- title -->
			<view class="cell-title">
				{{newsItem.title}}
			</view>
			<!-- 多张图片 -->
			<view class="list-img" v-if="newsItem.image_list && newsItem.image_list.length > 0">
				<view class="list-img-wrap" v-for="(img,index) in newsItem.image_list" :key="index">
					<image :src="img.url"></image>
				</view>
			</view>
			<!-- 基本信息 -->
			<view class="cell-info">
				<!-- 置顶 -->
				<text v-if="newsItem.label" class="stick-label space">{{newsItem.label}}</text>
				<!-- 数据源 -->
				<text v-if="newsItem.source" class="src space">{{newsItem.source}}</text>
				<!-- 评论 -->
				<text v-if="newsItem.comment_count" class="comment space">{{newsItem.comment_count}}</text>
				<!-- 时间 -->
				<text v-if="newsItem.datetime" class="time">{{newsItem.datetime}}</text>
			</view>
		</view>
		<!-- 单张图片 -->
		<view class="img-holder" v-if="newsItem.image_url">
			<image :src="newsItem.image_url"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			newsItem: Object
		}
	}
</script>

<style lang="scss">
	// 容器
	.news-label-cell {
		display: flex;
		flex-direction: row;
		margin: 0 30upx;
		padding: 32upx 0;
		align-items: center;
		border-bottom: 1upx solid rgba(221, 221, 221, 0.6);

		// 详细信息
		.label-cell-detail {
			flex: 1;

			// title
			.cell-title {
				color: #222;
				line-height: 42upx;
				font-size: 34upx;
				-webkit-line-clamp: 3;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				display: flex;
				-webkit-box-orient: vertical;
			}

			// 多张图片
			.list-img {
				margin-top: 12upx;
				display: flex;

				.list-img-wrap {
					display: inline-block;
					width: 230upx;
					overflow: hidden;
					height: 170upx;
					padding-right: 4upx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			// 基本信息
			.cell-info {
				margin-top: 12upx;
				color: #999;
				overflow: hidden;
				font-size: 22upx;

				.space {
					margin-right: 10upx;
				}

				.stick-label {
					border-radius: 4upx;
					color: #f85959;
					display: inline-block;
					text-align: center;
					border: 1upx solid rgba(248, 89, 89, 0.5);
					padding: 2upx;
					height: 28upx;
				}
			}
		}

		// 单张图片
		.img-holder {
			width: 230upx;
			display: inline-block;
			vertical-align: middle;
			height: 170upx;
			margin-left: 24upx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
