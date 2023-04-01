<template>
 <view class="video-background-style">
	 
	 <cover-view style="width: 33.33%;margin-top: -160rpx;height: 80rpx;
	 position: fixed;z-index: 999;display: flex;background-color: #FFFFFF;">
		 {{nameList[0].name}}
		 </cover-view> 
     
	 <cover-view style="width: 33.33%;margin-left: 33.33%;margin-top: -160rpx;height: 80rpx;
	 position: fixed;z-index: 999;display: flex;background-color: #FFFFFF;">
	 		 {{nameList[1].name}}
	 		 </cover-view> 
     <cover-view style="width: 33.33%;margin-left: 66.66%;margin-top: -160rpx;height: 80rpx;
     position: fixed;z-index: 999;display: flex;background-color: #FFFFFF;">
     		 {{nameList[2].name}}
     		 </cover-view> 
     <view class="video-background-modal" v-for="(dataList,ids) in dataList" :key="ids">
     	<video :src="dataList" @timeupdate='timeupdate' show-fullscreen-btn="false"   controls>
			<!-- <cover-view class="text-title-style">{{dataList.video.subject}}</cover-view>
			<cover-view class="text-title-times">{{dataList.video.playTimes}}次播放</cover-view> -->
		</video>
     </view>
 
     <view class="lines"></view>  
 </view>
</template>
 
<script>
    import app from '@/App.vue'
	import api from '@/api/request.js'
	var that; 
 export default{
		 data(){
			 return{
				 nameList:[{name:"张三"},{name:"李四"},{name:"王五"}],
			    dataList:["https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",
				"https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",
				"https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",
				"https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",
				"https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",
				"https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",
				"https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",
				"https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",
				"https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",
				"https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",
				"https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",
				"https://snyt-1302011643.cos.ap-guangzhou.myqcloud.com/video/20211202222801-3da41b82-97db-4520-9de6-4e7162944750",],
				video_directory:'',//视频保存路径的前缀
				stopVideo:true,//停止播放视频
				//currentTime: '', //记录当前时间
				isHasTime: 5 ,//默认允许播放时长
				fileId:null,//视频id
			 }
		 },
		 created(){
		 	that = this; 
			plus.navigator.setStatusBarBackground('#6495ED');
						plus.navigator.setStatusBarStyle('light');
						// #ifdef APP-PLUS
						this.view = new plus.nativeObj.View(
							'bottom-btn',
							{
								top: '0px',
								// paddingTop:'23px',
								'padding-right': '200px',
								left: '0px',
								height: '68px',
								width: '100%',
								backgroundColor: '#ffffff'
							}); 
							this.show();
							// #endif
			// that.onLoadVideoData();
		 },
		 onShow(){
			 
			 //console.log(that.dataList)
			 
			 // that.onLoadVideoData();
			  
		 },  
		 methods:{
			 onLoadVideoData(){
				 //uni.showLoading()
					api.post(api.find_video_list,{
						
					}).then(res=>{
						console.log("返回find_video_list数据：",res)
						that.dataList = res.data.video_infos
						that.video_directory = res.data.video_directory
						that.stopVideo=true
						//uni.hideLoading() 
					})
			 },
			 timeupdate(e) {
				 
					   var currentTime = Number(e.detail.currentTime.toFixed(2))
					   var videoId = e.currentTarget.id;
					   var fileId = that.fileId;
					   
					   if(app.globalData.userInfo.loginStatus==0){
						   uni.createVideoContext(fileId).pause();
					   	uni.reLaunch({
					   		url:'/pages/login/login'
					   	})
					   }
			           if(currentTime>that.isHasTime){
						   that.stopVideo=false
						   uni.createVideoContext(fileId).pause();
						  app.globalData.imageInfoObj = {
						  	buyType:1,
						  	id:that.fileId
						  }
						   uni.navigateTo({
						   	   url:'/pages/payImageVideoMember/payImageVideoMember'
						   })
						   return
					   }
			   },
			   getVideoId(id){
				  // console.log("id:",id)
				   that.fileId = id
			   },
			   
		 }
 }
</script>
 
<style>
    .video-background-style{
		width: 95%;
		margin-left: 2.5%;
		height: auto;
	}
	.video-background-modal{
		position: relative;
		width: 100%;
		height: 200px;
		margin-top: 10px;
	}
	.video-background-modal video{
		width: 100%;
		height: 100%;
		z-index: 0;
		position: relative;
	}
	.video-background-modal .text-title-style{
		color: white;
		width: 100%;
		z-index: 11;
		position: absolute;
		top:20upx;
		margin-left: 5px;
	}
	.video-background-modal .text-title-times{
		color: white;
		width: 100%;
		z-index: 11;
		position: absolute; 
		margin-left: 5px;
		font-size: 10px;
		bottom: 20upx;
	}
	.lines{
		width: 100%;
		height: 25px;
	}
</style>