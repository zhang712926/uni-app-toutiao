const domain = "https://uniapp-toutiao.herokuapp.com/";
const interfaces = {
	// 获取首页tab
	getTabList: domain + "api/profiles/home_tab_list",
	// 获取首页新闻信息
	getNewsList: domain + 'api/profiles/home_news_list/',
	// upload 发布
	postUpload: domain + 'api/profiles/upload',
	// 获取视频新闻信息
	getVideoList: domain + 'api/profiles/video_list/',
	// 获取视频详情数据
	getVideoDetail: domain + 'api/profiles/video_detail',
}

module.exports = interfaces;
