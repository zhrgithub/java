<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<view class="loading" v-show="ishis">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.msg.id">
					<!-- 系统消息 -->
					<block v-if="row.type=='system'" >
						<view class="system">
							<!-- 文字消息 -->
							<view v-if="row.msg.type=='text'" class="text">
								{{row.msg.content.text}}
							</view>
							
						</view>
					</block>
					<!-- 用户消息 -->
					<block v-if="row.type=='user'">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.msg.messageDirection==1">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='RC:TxtMsg'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 语言消息 -->
								<view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="length">{{row.msg.content.length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.url" :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image>
								</view>
								
								
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="row.msg.userinfo.face"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.msg.messageDirection==2">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="row.msg.sideinfo.face"></image>
							</view>
							<!-- 左侧-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{row.msg.sideinfo.username}}</view> <!-- <view class="time">{{row.msg.time}}</view> -->
								</view>
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='RC:TxtMsg'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 语音消息 -->
								<!-- <view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="icon other-voice"></view>
									<view class="length">{{row.msg.content.length}}</view>
								</view> -->
								<!-- 图片消息 -->
								<!-- <view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.url" :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image>
								</view> -->
								
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 --> 
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/img/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage"><view class="icon tupian2"></view></view>
					<view class="box" @tap="camera"><view class="icon paizhao"></view></view>
					
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box uni-input"  :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<!-- <view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view> -->
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode"  :class="isVoice?'hidden':''">
					<view class="box">
						<textarea :adjust-position="false" auto-height="true" v-model="textMsg" @focus="textareaFocus"/>
					</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @touchend.prevent="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
		
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
		
	</view>
</template>
<script>
	const RongIMLib = require('@rongcloud/imlib-v4')
	var that;

	export default {
		data() {
			return {
				user:null,
				meInfo:null,
				ishis:null,
				newimhisList:[],
				//文字消息
				textMsg:'',
				//消息列表
				isHistoryLoading:false,
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],
				msgImgList:[],
				myuid:0,
				
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER:uni.getRecorderManager(),
				// #endif
				isVoice:false,
				voiceTis:'按住 说话',
				recordTis:"手指上滑 取消发送",
				recording:false,
				willStop:false,
				initPoint:{identifier:0,Y:0},
				recordTimer:null,
				recordLength:0,
				
				//播放语音相关参数
				AUDIO:uni.createInnerAudioContext(),
				playMsgid:null,
				VoiceTimer:null,
				// 抽屉参数
				popupLayerClass:'',
				// more参数
				hideMore:true,
				//表情定义
				hideEmoji:true,
				emojiList:[
					[{"url":"100.gif",alt:"[微笑]"},{"url":"101.gif",alt:"[伤心]"},{"url":"102.gif",alt:"[美女]"},{"url":"103.gif",alt:"[发呆]"},{"url":"104.gif",alt:"[墨镜]"},{"url":"105.gif",alt:"[哭]"},{"url":"106.gif",alt:"[羞]"},{"url":"107.gif",alt:"[哑]"},{"url":"108.gif",alt:"[睡]"},{"url":"109.gif",alt:"[哭]"},{"url":"110.gif",alt:"[囧]"},{"url":"111.gif",alt:"[怒]"},{"url":"112.gif",alt:"[调皮]"},{"url":"113.gif",alt:"[笑]"},{"url":"114.gif",alt:"[惊讶]"},{"url":"115.gif",alt:"[难过]"},{"url":"116.gif",alt:"[酷]"},{"url":"117.gif",alt:"[汗]"},{"url":"118.gif",alt:"[抓狂]"},{"url":"119.gif",alt:"[吐]"},{"url":"120.gif",alt:"[笑]"},{"url":"121.gif",alt:"[快乐]"},{"url":"122.gif",alt:"[奇]"},{"url":"123.gif",alt:"[傲]"}],
					[{"url":"124.gif",alt:"[饿]"},{"url":"125.gif",alt:"[累]"},{"url":"126.gif",alt:"[吓]"},{"url":"127.gif",alt:"[汗]"},{"url":"128.gif",alt:"[高兴]"},{"url":"129.gif",alt:"[闲]"},{"url":"130.gif",alt:"[努力]"},{"url":"131.gif",alt:"[骂]"},{"url":"132.gif",alt:"[疑问]"},{"url":"133.gif",alt:"[秘密]"},{"url":"134.gif",alt:"[乱]"},{"url":"135.gif",alt:"[疯]"},{"url":"136.gif",alt:"[哀]"},{"url":"137.gif",alt:"[鬼]"},{"url":"138.gif",alt:"[打击]"},{"url":"139.gif",alt:"[bye]"},{"url":"140.gif",alt:"[汗]"},{"url":"141.gif",alt:"[抠]"},{"url":"142.gif",alt:"[鼓掌]"},{"url":"143.gif",alt:"[糟糕]"},{"url":"144.gif",alt:"[恶搞]"},{"url":"145.gif",alt:"[什么]"},{"url":"146.gif",alt:"[什么]"},{"url":"147.gif",alt:"[累]"}],
					[{"url":"148.gif",alt:"[看]"},{"url":"149.gif",alt:"[难过]"},{"url":"150.gif",alt:"[难过]"},{"url":"151.gif",alt:"[坏]"},{"url":"152.gif",alt:"[亲]"},{"url":"153.gif",alt:"[吓]"},{"url":"154.gif",alt:"[可怜]"},{"url":"155.gif",alt:"[刀]"},{"url":"156.gif",alt:"[水果]"},{"url":"157.gif",alt:"[酒]"},{"url":"158.gif",alt:"[篮球]"},{"url":"159.gif",alt:"[乒乓]"},{"url":"160.gif",alt:"[咖啡]"},{"url":"161.gif",alt:"[美食]"},{"url":"162.gif",alt:"[动物]"},{"url":"163.gif",alt:"[鲜花]"},{"url":"164.gif",alt:"[枯]"},{"url":"165.gif",alt:"[唇]"},{"url":"166.gif",alt:"[爱]"},{"url":"167.gif",alt:"[分手]"},{"url":"168.gif",alt:"[生日]"},{"url":"169.gif",alt:"[电]"},{"url":"170.gif",alt:"[炸弹]"},{"url":"171.gif",alt:"[刀子]"}],
					[{"url":"172.gif",alt:"[足球]"},{"url":"173.gif",alt:"[瓢虫]"},{"url":"174.gif",alt:"[翔]"},{"url":"175.gif",alt:"[月亮]"},{"url":"176.gif",alt:"[太阳]"},{"url":"177.gif",alt:"[礼物]"},{"url":"178.gif",alt:"[抱抱]"},{"url":"179.gif",alt:"[拇指]"},{"url":"180.gif",alt:"[贬低]"},{"url":"181.gif",alt:"[握手]"},{"url":"182.gif",alt:"[剪刀手]"},{"url":"183.gif",alt:"[抱拳]"},{"url":"184.gif",alt:"[勾引]"},{"url":"185.gif",alt:"[拳头]"},{"url":"186.gif",alt:"[小拇指]"},{"url":"187.gif",alt:"[拇指八]"},{"url":"188.gif",alt:"[食指]"},{"url":"189.gif",alt:"[ok]"},{"url":"190.gif",alt:"[情侣]"},{"url":"191.gif",alt:"[爱心]"},{"url":"192.gif",alt:"[蹦哒]"},{"url":"193.gif",alt:"[颤抖]"},{"url":"194.gif",alt:"[怄气]"},{"url":"195.gif",alt:"[跳舞]"}],
					[{"url":"196.gif",alt:"[发呆]"},{"url":"197.gif",alt:"[背着]"},{"url":"198.gif",alt:"[伸手]"},{"url":"199.gif",alt:"[耍帅]"},{"url":"200.png",alt:"[微笑]"},{"url":"201.png",alt:"[生病]"},{"url":"202.png",alt:"[哭泣]"},{"url":"203.png",alt:"[吐舌]"},{"url":"204.png",alt:"[迷糊]"},{"url":"205.png",alt:"[瞪眼]"},{"url":"206.png",alt:"[恐怖]"},{"url":"207.png",alt:"[忧愁]"},{"url":"208.png",alt:"[眨眉]"},{"url":"209.png",alt:"[闭眼]"},{"url":"210.png",alt:"[鄙视]"},{"url":"211.png",alt:"[阴暗]"},{"url":"212.png",alt:"[小鬼]"},{"url":"213.png",alt:"[礼物]"},{"url":"214.png",alt:"[拜佛]"},{"url":"215.png",alt:"[力量]"},{"url":"216.png",alt:"[金钱]"},{"url":"217.png",alt:"[蛋糕]"},{"url":"218.png",alt:"[彩带]"},{"url":"219.png",alt:"[礼物]"},]				
				],
				//表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
				onlineEmoji:{"100.gif":"AbNQgA.gif","101.gif":"AbN3ut.gif","102.gif":"AbNM3d.gif","103.gif":"AbN8DP.gif","104.gif":"AbNljI.gif","105.gif":"AbNtUS.gif","106.gif":"AbNGHf.gif","107.gif":"AbNYE8.gif","108.gif":"AbNaCQ.gif","109.gif":"AbNN4g.gif","110.gif":"AbN0vn.gif","111.gif":"AbNd3j.gif","112.gif":"AbNsbV.gif","113.gif":"AbNwgs.gif","114.gif":"AbNrD0.gif","115.gif":"AbNDuq.gif","116.gif":"AbNg5F.gif","117.gif":"AbN6ET.gif","118.gif":"AbNcUU.gif","119.gif":"AbNRC4.gif","120.gif":"AbNhvR.gif","121.gif":"AbNf29.gif","122.gif":"AbNW8J.gif","123.gif":"AbNob6.gif","124.gif":"AbN5K1.gif","125.gif":"AbNHUO.gif","126.gif":"AbNIDx.gif","127.gif":"AbN7VK.gif","128.gif":"AbNb5D.gif","129.gif":"AbNX2d.gif","130.gif":"AbNLPe.gif","131.gif":"AbNjxA.gif","132.gif":"AbNO8H.gif","133.gif":"AbNxKI.gif","134.gif":"AbNzrt.gif","135.gif":"AbU9Vf.gif","136.gif":"AbUSqP.gif","137.gif":"AbUCa8.gif","138.gif":"AbUkGQ.gif","139.gif":"AbUFPg.gif","140.gif":"AbUPIS.gif","141.gif":"AbUZMn.gif","142.gif":"AbUExs.gif","143.gif":"AbUA2j.gif","144.gif":"AbUMIU.gif","145.gif":"AbUerq.gif","146.gif":"AbUKaT.gif","147.gif":"AbUmq0.gif","148.gif":"AbUuZV.gif","149.gif":"AbUliF.gif","150.gif":"AbU1G4.gif","151.gif":"AbU8z9.gif","152.gif":"AbU3RJ.gif","153.gif":"AbUYs1.gif","154.gif":"AbUJMR.gif","155.gif":"AbUadK.gif","156.gif":"AbUtqx.gif","157.gif":"AbUUZ6.gif","158.gif":"AbUBJe.gif","159.gif":"AbUdIO.gif","160.gif":"AbU0iD.gif","161.gif":"AbUrzd.gif","162.gif":"AbUDRH.gif","163.gif":"AbUyQA.gif","164.gif":"AbUWo8.gif","165.gif":"AbU6sI.gif","166.gif":"AbU2eP.gif","167.gif":"AbUcLt.gif","168.gif":"AbU4Jg.gif","169.gif":"AbURdf.gif","170.gif":"AbUhFS.gif","171.gif":"AbU5WQ.gif","172.gif":"AbULwV.gif","173.gif":"AbUIzj.gif","174.gif":"AbUTQs.gif","175.gif":"AbU7yn.gif","176.gif":"AbUqe0.gif","177.gif":"AbUHLq.gif","178.gif":"AbUOoT.gif","179.gif":"AbUvYF.gif","180.gif":"AbUjFU.gif","181.gif":"AbaSSJ.gif","182.gif":"AbUxW4.gif","183.gif":"AbaCO1.gif","184.gif":"Abapl9.gif","185.gif":"Aba9yR.gif","186.gif":"AbaFw6.gif","187.gif":"Abaiex.gif","188.gif":"AbakTK.gif","189.gif":"AbaZfe.png","190.gif":"AbaEFO.gif","191.gif":"AbaVYD.gif","192.gif":"AbamSH.gif","193.gif":"AbaKOI.gif","194.gif":"Abanld.gif","195.gif":"Abau6A.gif","196.gif":"AbaQmt.gif","197.gif":"Abal0P.gif","198.gif":"AbatpQ.gif","199.gif":"Aba1Tf.gif","200.png":"Aba8k8.png","201.png":"AbaGtS.png","202.png":"AbaJfg.png","203.png":"AbaNlj.png","204.png":"Abawmq.png","205.png":"AbaU6s.png","206.png":"AbaaXn.png","207.png":"Aba000.png","208.png":"AbarkT.png","209.png":"AbastU.png","210.png":"AbaB7V.png","211.png":"Abafn1.png","212.png":"Abacp4.png","213.png":"AbayhF.png","214.png":"Abag1J.png","215.png":"Aba2c9.png","216.png":"AbaRXR.png","217.png":"Aba476.png","218.png":"Abah0x.png","219.png":"Abdg58.png"},
				
				token:null,
			};
		},
		created() {
			that = this;
		},
		// option：當前用戶信息
		onLoad() {
			console.log("==================== start");
			var datas = null;
			uni.request({
				url: "http://localhost:9090/rongYunServer/rongyun/find", //仅为示例，并非真实接口地址。
				data: {
					id:"user002"
				},
				method: "POST",
				header: {
					'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
				}
			}).then((res) => {
				console.log("我的数据：")
				datas = res[1].data.data.user;
				console.log(datas);
				var meInfo = {
					id:datas.senderId,
					username:datas.senderName,
					avatar:datas.senderAvatar
				};
				console.log(meInfo);
				that.meInfo = meInfo;
				that.myuid = datas.senderId;
				

				var user = {
					user_id:datas.receiverId,
					user_name:datas.receiverName,
					senderUserId:datas.senderId,
					avatar:datas.receiverAvatar
				}

				that.user = user;
				that.token = datas.token;
			
			
			
			this.createIMId(this.user.user_id ? this.user.user_id : this.user.senderUserId)
			this.myuid = this.meInfo.id;
			that.getImMsgList();
			uni.setNavigationBarTitle({
			    title: this.user.user_name
			});
			//语音自然播放结束
			this.AUDIO.onEnded((res)=>{
				this.playMsgid=null;
			});
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e)=>{
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e)=>{
				this.recordEnd(e);
			})
			// #endif
			
			console.log("对方信息",this.user)
			console.log("自己信息",this.meInfo)
			
			})
		},
		onShow(){
			this.scrollTop = 9999999;
			
		},
		watch:{
			imList(newV,oldV){
				console.log("HM-Chat监控到消息变化",newV)
				
				var nowDate = new Date();
				var lastid = this.msgList.length ? this.msgList[this.msgList.length-1].msg.id : 0;
					lastid++;
				var msg
				if(newV[newV.length-1].messageDirection==2){
					msg = {
						type:newV[newV.length-1].type,
						msg:{
							id:lastid,
							time:newV[newV.length-1].receivedTime,
							type:newV[newV.length-1].type,
							// userinfo:{
							// 	uid:newV[newV.length-1].content.content.msg.userinfo.uid,
							// 	username:newV[newV.length-1].content.content.msg.userinfo.username,
							// 	face:newV[newV.length-1].content.content.msg.userinfo.face,
							// },
							sideinfo:{
								uid:newV[newV.length-1].senderUserId,
								username:"客服",
								face:"https://img2.baidu.com/it/u=3643648615,1379429149&fm=26&fmt=auto",
							},
							content:{
								text:newV[newV.length-1].content.content
							},
						},
					}
				}else if(newV[newV.length-1].messageDirection==1){
					console.log("普通用户新增消息")
				} else if(newV[newV.length-1].content.content.msg.type=="img"){
					msg = {
						type:newV[newV.length-1].content.content.type,
						msg:{
							id:lastid,
							time:nowDate.getHours()+":"+nowDate.getMinutes(),
							type:newV[newV.length-1].content.content.msg.type,
							userinfo:{
								uid:newV[newV.length-1].content.content.msg.userinfo.uid,
								username:newV[newV.length-1].content.content.msg.userinfo.username,
								face:newV[newV.length-1].content.content.msg.userinfo.face,
							},
							sideinfo:{
								uid:newV[newV.length-1].content.content.msg.sideinfo.uid,
								username:newV[newV.length-1].content.content.msg.sideinfo.username,
								face:newV[newV.length-1].content.content.msg.sideinfo.face,
							},
							content:{
								w:newV[newV.length-1].content.content.msg.content.w,
								h:newV[newV.length-1].content.content.msg.content.h,
								url:newV[newV.length-1].content.content.msg.content.url,
							},
						},
					}
				}
				
				
				console.log("真实渲染的MSG",msg);
				this.screenMsg(msg);
				// console.log("更新后的msgImgList：",that.msgList)
				// that.$set(that.msgList,that.msgList.length,msg);
				// console.log(that.msgList)
			}
		},
		
		computed:{
			imList(){
				return this.$store.state.imList
			}
		},
		
		methods:{
			
			createIMId(id){
				// this.$axios.get("/api/my/getUserRyToken", {u_id:id}).then(res => {
				// 	if (res.data.code == 1) {
				// 		console.log("给对方创建IM账号",id)
				// 		uni.hideLoading()
				// 	} else {
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: res.data.msg
				// 		})
				// 	}
				// });
			},
			
			// 接受消息(筛选处理)
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
				if(msg.type=='system'){
					// 系统消息
					switch (msg.msg.type){
						case 'text':
							this.addSystemTextMsg(msg);
							break;
						
					}
				}else if(msg.type=='user'){
					// 用户消息
					switch (msg.msg.type){
						case 'text':
							this.addTextMsg(msg);
							break;
						case 'voice':
							this.addVoiceMsg(msg);
							break;
						case 'img':
							this.addImgMsg(msg);
							break;
						case 'redEnvelope':
							this.addRedEnvelopeMsg(msg);
							break;
					}
					console.log('用户消息');
					//非自己的消息震动
					// if(msg.msg.userinfo.uid!=this.myuid){
					// 	console.log('振动');
					// 	uni.vibrateLong();
					// }
				}
				this.$nextTick(function() {
					// 滚动到底
					this.scrollToView = 'msg'+msg.id
				});
			},
			
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e){
				if (this.ishis == false){
					uni.showToast({
						icon: 'none',
						title: "没有更多消息了"
					})
					this.isHistoryLoading = false;
					
					return
				}
				if(this.isHistoryLoading){
					return ;
				}
				
				this.getImMsgList(this.newimhisList[0]);
				this.isHistoryLoading = true;//参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false;//关闭滑动动画
				let Viewid = this.msgList[0].msg.id;//记住第一个信息ID
				//本地模拟请求历史记录效果
				setTimeout(()=>{
					console.log("1111")
					// 消息列表
					let list = [
					// 	{type:"user",msg:{id:1,type:"text",time:"12:56",userinfo:{uid:0,username:"大黑哥",face:"/static/img/face_8.jpg"},content:{text:"为什么温度会相差那么大？"}}},
					// 	{type:"user",msg:{id:2,type:"text",time:"12:57",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:{text:"这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。"}}},
					// 	{type:"user",msg:{id:3,type:"voice",time:"12:59",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:{url:"/static/voice/1.mp3",length:"00:06"}}},
					// 	{type:"user",msg:{id:4,type:"voice",time:"13:05",userinfo:{uid:0,username:"大黑哥",face:"/static/img/face_8.jpg"},content:{url:"/static/voice/2.mp3",length:"00:06"}}},
					]
					
					list = [...this.handlerList(this.newimhisList)]
					
					// 获取消息中的图片,并处理显示尺寸
					for(let i=0;i<list.length;i++){
						if(list[i].type=='user'&&list[i].msg.type=="img"){
							list[i].msg.content = this.setPicSize(list[i].msg.content);
							this.msgImgList.unshift(list[i].msg.content.url);
						}
						list[i].msg.id = Math.floor(Math.random()*1000+1);
						this.msgList.unshift(list[i]);
					}
					
					//这段代码很重要，不然每次加载历史数据都会跳到顶部
					this.$nextTick(function() {
						this.scrollToView = 'msg'+Viewid;//跳转上次的第一行信息位置
						this.$nextTick(function() {
							this.scrollAnimation = true;//恢复滚动动画
						});
						
					});
					this.isHistoryLoading = false;
					
				},1000)
			},
			formatDate(date) {
			  var date = new Date(date);
			  var YY = date.getFullYear() + '-';
			  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
			  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
			  return YY + MM + DD +" "+hh + mm + ss;
			},
			getImMsgList(obj){
				var that = this
				var conversation = this.$im.Conversation.get({
				  targetId: (this.user.user_id ? this.user.user_id : this.user.senderUserId).toString(),
				  type: RongIMLib.CONVERSATION_TYPE.PRIVATE
				});
				var option = {
				  timestamp: obj?obj.sentTime:(+new Date()),
				  count: 20
				};
				console.log("optioninfos:")
				console.log(option);
				conversation.getMessages(option).then(function(result){
				  var imlist = result.list; // 历史消息列表
				  var hasMore = result.hasMore; // 是否还有历史消息可以获取
				  console.log('获取历史消息成功', imlist, hasMore);
				  that.newimhisList = [...imlist]
				  that.ishis = hasMore
				  if(!obj){
					  that.getMsgList(imlist)
				  }
				  
				});
			},
			// 加载初始页面消息
			getMsgList(imlist){
				// 消息列表
				
				let list = [
					// {type:"system",msg:{id:0,type:"text",content:{text:"欢迎进入HM-chat聊天室"}}},
					// {type:"user",msg:{id:3,type:"voice",time:"12:59",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:{url:"/static/voice/1.mp3",length:"00:06"}}},
					// {type:"user",msg:{id:4,type:"voice",time:"13:05",userinfo:{uid:0,username:"大黑哥",face:"/static/img/face_8.jpg"},content:{url:"/static/voice/2.mp3",length:"00:06"}}},
					// {type:"user",msg:{id:5,type:"img",time:"13:05",userinfo:{uid:0,username:"大黑哥",face:"/static/img/face_8.jpg"},content:{url:"/static/img/p10.jpg",w:200,h:200}}},
					// {type:"user",msg:{id:6,type:"img",time:"12:59",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face_2.jpg"},content:{url:"/static/img/q.jpg",w:1920,h:1080}}},
					// {type:"system",msg:{id:7,type:"text",content:{text:"欢迎进入HM-chat聊天室"}}},
				]
				
				list = [...this.handlerList(imlist)]
				
				console.log("处理完成的历史消息",list)
				// 获取消息中的图片,并处理显示尺寸
				for(let i=0;i<list.length;i++){
					if(list[i].type=='user'&&list[i].msg.type=="img"){
						list[i].msg.content = this.setPicSize(list[i].msg.content);
						this.msgImgList.push(list[i].msg.content.url);
					}
				}
				this.msgList = list;
				// 滚动到底部
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 9999;
					this.$nextTick(function() {
						this.scrollAnimation = true;
					});
					
				});
			},
			handlerList(imlist){
				
				console.log("需要处理的历史消息数据",imlist)
				return imlist.map((item,index)=>{
					console.log("type:",item.content.content)
					if(item.messageDirection==1){
						return{
							type:"user",
							msg:{
								id:index,
								type:item.messageType,
								time:item.sentTime,
								messageDirection:item.messageDirection,
								userinfo:{
									uid:item.content.content.msg.userinfo.uid,
									username:item.content.content.msg.userinfo.username,
									face:item.content.content.msg.userinfo.face,
								},
								sideinfo:{
									uid:item.content.content.msg.sideinfo.uid,
									username:item.content.content.msg.sideinfo.username,
									face:item.content.content.msg.sideinfo.face,
								},
								content:{
									text:item.content.content.msg.content.text,
								}
							}
						}
					}else if(item.messageDirection==2){
						return{
							type:"user",
							msg:{
								id:index,
								type:item.messageType,
								time:item.sentTime,
								messageDirection:item.messageDirection,
								sideinfo:{
									uid:item.senderUserId,
									username:"客服",
									face:"https://img2.baidu.com/it/u=3643648615,1379429149&fm=26&fmt=auto",
								},
								content:{
									text:item.content.content,
								}
							}
						}
					}else if(item.content.content.msg.type=="img"){
						return{
							type:"user",
							msg:{
								id:index,
								type:item.content.content.msg.type,
								time:item.content.content.msg.time,
								userinfo:{
									uid:item.content.content.msg.userinfo.uid,
									username:item.content.content.msg.userinfo.username,
									face:item.content.content.msg.userinfo.face,
								},
								sideinfo:{
									uid:item.content.content.msg.sideinfo.uid,
									username:item.content.content.msg.sideinfo.username,
									face:item.content.content.msg.sideinfo.face,
								},
								content:{
									w:item.content.content.msg.content.w,
									h:item.content.content.msg.content.h,
									url:item.content.content.msg.content.url,
								}
							}
						}
					}
				})
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = content.w/content.h;
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}
				return content;
			},
			
			//更多功能(点击+弹出) 
			showMore(){
				this.isVoice = false;
				this.hideEmoji = true;
				if(this.hideMore){
					this.hideMore = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer(){
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer(){
				this.popupLayerClass = '';
				setTimeout(()=>{
					this.hideMore = true;
					this.hideEmoji = true;
				},150);
			},
			// 选择图片发送
			chooseImage(){
				this.getImage('album');
			},
			//拍照发送
			camera(){
				this.getImage('camera');
			},
			
			
			//选照片 or 拍照
			getImage(type){
				this.hideDrawer();
				uni.chooseImage({
					sourceType:[type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res)=>{
						for(let i=0;i<res.tempFilePaths.length;i++){
							uni.getImageInfo({
								src: res.tempFilePaths[i],
								success: (image)=>{
									uni.uploadFile({
									    url: 'http://fa.yhczfw.com/api/plugs.extend/upload?is_water=0', //仅为示例，非真实的接口地址
									    filePath: res.tempFilePaths[i],
										header: {
											'Authorization': uni.getStorageSync(that.token),
										},
									    name: 'file',
									    formData: {},
									    success: (uploadFileRes) => {
									        console.log("看下图片上传成功没",JSON.parse(uploadFileRes.data));
											if(JSON.parse(uploadFileRes.data).code==1){
												console.log(image.width);
												console.log(image.height);
												// let msg = {url:res.tempFilePaths[i],w:image.width,h:image.height};
												let msg = {url:JSON.parse(uploadFileRes.data).data.url,w:image.width,h:image.height};
												
												this.sendMsg(msg,'img');
											}
									    }
									});
									
								}
							});
							
						}
					}
				});
			},
			// 选择表情
			chooseEmoji(){
				this.hideMore = true;
				if(this.hideEmoji){
					this.hideEmoji = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em){
				this.textMsg+=em.alt;
			},
			
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(){
				if(this.popupLayerClass=='showLayer' && this.hideMore == false){
					this.hideDrawer();
				}
			},
			// 发送文字消息
			sendText(){
				this.hideDrawer();//隐藏抽屉
				if(!this.textMsg){
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {text:content}
				
				this.sendMsg(msg,'text');
				this.textMsg = '';//清空输入框
				
				
			},
			//替换表情符号为图片
			replaceEmoji(str){
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
					console.log("item: " + item);
					for(let i=0;i<this.emojiList.length;i++){
						let row = this.emojiList[i];
						for(let j=0;j<row.length;j++){
							let EM = row[j];
							if(EM.alt==item){
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								let onlinePath = 'http://fa.yhczfw.com/static/emoji/'
								// let imgstr = '<img src="'+onlinePath+this.onlineEmoji[EM.url]+'">';
								let imgstr = '<img src="'+onlinePath+EM.url+'">';
								console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				return '<div style="display: flex;align-items: center;word-wrap:break-word;">'+replacedStr+'</div>';
			},
			
			sendIM(targetId,sendData,type=RongIMLib.CONVERSATION_TYPE.PRIVATE){/**发送文字消息 */
				
				let that=this
				// 获取指定会话的抽象实例，对于会话的操作基于此实例完成
				const conversation = this.$im.Conversation.get({
					// targetId
					targetId:targetId.toString(),
					// 会话类型：RongIMLib.CONVERSATION_TYPE.PRIVATE | RongIMLib.CONVERSATION_TYPE.GROUP
					type:type
				});
				  // 向会话内发消息
				  conversation.send({
					// 消息类型，其中 RongIMLib.MESSAGE_TYPE 为 IMLib 内部的内置消息类型常量定义
					messageType: RongIMLib.MESSAGE_TYPE.TEXT, // 'RC:TxtMsg'
					// 消息内容
					content: {
					  content:sendData // 文本内容
					}
				  }).then(function(message){
					console.log('发送文字消息成功', message);
					// var msg = {
					// 	 msg:{
					// 		content:{
					// 			text:message.content.content.msg.content.text
					// 		},
					// 		id:message.content.content.msg.id,
					// 		messageDirection:1,
					// 		sideinfo:{
					// 			face:message.content.content.msg.sideinfo.face,
					// 			uid:message.content.content.msg.sideinfo.uid,
					// 			username:message.content.content.msg.sideinfo.username
					// 		},
					// 		time:message.content.content.msg.time,
					// 		type:message.content.content.msg.type,
					// 		userinfo:{
					// 			face:message.content.content.msg.userinfo.face,
					// 			uid:message.content.content.msg.userinfo.uid,
					// 			username:message.content.content.msg.userinfo.username
					// 		},
					// 		type:"user"
					// 	}
					// }
					// that.msgList.push(msg);
					console.log("新发一条数据",that.msgList)
				  }).catch(error => {
					console.log('发送文字消息失败', error.code, error.msg);
				  });
			},
			// 发送消息
			sendMsg(content,type){
				console.log("发送的消息content",content)
				
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var nowDate = new Date();
				var lastid = this.msgList.length ? this.msgList[this.msgList.length-1].msg.id : 0;
				lastid++;
				
				let msg = {
					type:'user',
					msg:{
						id:lastid,
						time:nowDate.getHours()+":"+nowDate.getMinutes(),
						type:type,
						userinfo:{
							uid:this.meInfo.id,
							username:this.meInfo.username,
							face:this.meInfo.avatar
						},
						sideinfo:{
							username:this.user.user_name,
							uid:this.user.user_id ? this.user.user_id : this.user.senderUserId,
							face:this.user.avatar
						},
						content:content
					}
				}
				console.log("sendmsg",msg)
				// 发送消息
				this.screenMsg(msg);
				
				this.sendIM(this.user.user_id ? this.user.user_id : this.user.senderUserId,msg)
				
				// 定时器模拟对方回复,三秒
				// setTimeout(()=>{
				// 	var lastid = this.msgList.length ? this.msgList[this.msgList.length-1].msg.id : 0;
				// 	lastid++;
				// 	msg = {
				// 		type:'user',
				// 		msg:{
				// 			id:lastid,
				// 			time:nowDate.getHours()+":"+nowDate.getMinutes(),
				// 			type:type,
				// 			userinfo:{
				// 				uid:1,
				// 				username:"售后客服008",
				// 				face:"/static/img/im/face/face_2.jpg",
				// 			},
				// 			content:content,
				// 		},
				// 	}
				// 	// 本地模拟发送消息
				// 	console.log("模拟回复MSG",msg)
				// 	this.screenMsg(msg);
				// },3000)
			},
			
			// 添加文字消息到列表
			addTextMsg(msg){
				
				this.msgList.push(msg);
				// console.log("消息列表",this.msgList)
			},
			// 添加语音消息到列表
			addVoiceMsg(msg){
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg){
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
			},
			addRedEnvelopeMsg(msg){
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg){
				this.msgList.push(msg);
			},
			
			sendSystemMsg(content,type){
				var lastid = this.msgList.length ? this.msgList[this.msgList.length-1].msg.id : 0;
				lastid++;
				let row = {type:"system",msg:{id:lastid,type:type,content:content}};
				this.screenMsg(row)
			},
			
			// 预览图片
			showPic(msg){
				uni.previewImage({
					indicator:"none",
					current:msg.content.url,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(msg){
				this.playMsgid=msg.id;
				this.AUDIO.src = msg.content.url;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e){
				if(e.touches.length>1){
					return ;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({format:"mp3"});//录音开始,
			},
			//录音开始UI效果
			recordBegin(e){
				this.recording = true;
				this.voiceTis='松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(()=>{
					this.recordLength++;
				},1000)
			},
			// 录音被打断
			voiceCancel(){
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true;//不发送录音
				this.RECORDER.stop();//录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e){
				if(!this.recording){
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if(this.initPoint.Y - touche.clientY>=uni.upx2px(100)){
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				}else{
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e){
				if(!this.recording){
					return;
				}
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop();//录音结束
			},
			//录音结束(回调文件)
			recordEnd(e){
				clearInterval(this.recordTimer);
				if(!this.willStop){
					console.log("e: " + JSON.stringify(e));
					let msg = {
						length:0,
						url:e.tempFilePath
					}
					let min = parseInt(this.recordLength/60);
					let sec = this.recordLength%60;
					min = min<10?'0'+min:min;
					sec = sec<10?'0'+sec:sec;
					msg.length = min+':'+sec;
					this.sendMsg(msg,'voice');
				}else{
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice(){
				this.hideDrawer();
				this.isVoice = this.isVoice?false:true;
			},
			discard(){
				return;
			}
		}
	}
</script>
<style lang="scss">
	@import "@/static/HM-chat/css/style.scss"; 
</style>