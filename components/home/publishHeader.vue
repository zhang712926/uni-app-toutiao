<template>
	<view>
		<view class="publish-header">
			<text @tap="$emit('handleCancel')">取消</text>
			<text @tap="$emit('handlePublish')">发布</text>
		</view>
		<view class="space"></view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.publish-header {
		height: 66upx;
		background: #d43d3d;
		padding: 10upx 50upx;
		box-sizing: border-box;
		position: fixed;
		width: 750upx;
		z-index: 99;
		display: flex;
		justify-content: space-between;
		color: #FFFFFF;
	}

	.space {
		height: 66upx;
	}
</style>
