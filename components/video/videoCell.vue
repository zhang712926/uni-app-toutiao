<template>
	<view class="video-cell">
		<view class="item-detail">
			<view class="item-img-holder">
				<view class="video-mask">{{videoItem.title}}</view>
				<image class="large-image" :src="videoItem.large_image_url"></image>
				<view class="play-btn">
					<view class="icon iconfont">&#xe604;</view>
				</view>
			</view>
			<view class="item-info">
				<text class="src space">{{videoItem.source}}</text>
				<text class="cmt space">评论{{videoItem.comment_count}}</text>
				<text class="time">{{videoItem.datetime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			videoItem: {
				type: Object
			}
		}
	}
</script>

<style lang="scss">
	.video-cell {
		margin: 0px 30upx;
		border-bottom: 1px solid rgba(221, 221, 221, 0.6);

		// detail
		.item-detail {
			padding: 32upx 0px;
			box-sizing: border-box;

			// img-holder
			.item-img-holder {
				position: relative;
				width: 100%;
				height: 400upx;

				// mask
				.video-mask {
					position: absolute;
					margin: 10upx 20upx;
					z-index: 9;
					top: 0;
					color: #fff;
					font-size: 28upx;
					line-height: 42upx;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				// large image
				.large-image {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}

				// icon
				.play-btn {
					position: absolute;
					z-index: 10;
					top: 45%;
					left: 45%;
					display: flex;
					align-items: center;
					justify-content: center;

					.icon {
						color: #fff;
						font-size: 100upx;
					}
				}
			}

			// item info
			.item-info {
				margin-top: 12upx;
				color: #999;
				overflow: hidden;
				font-size: 22upx;

				.space {
					margin-right: 10upx;
				}
			}
		}
	}
</style>
