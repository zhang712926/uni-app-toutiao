<template>
	<view class="article">
		<web-view :src="article_url"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				article_url: ''
			}
		},
		onLoad(option){
			// console.log(option);
			this.article_url = option.url;
		}
	}
</script>

<style lang="scss">
	.article{
		width: 100%;
		height: 100vh;
	}
</style>
