<script>
	// var isShow
	export default {
		data() {
			return {}
		},
		created: function() {
			this.createWatch();
			const token = uni.getStorageSync('IMToken');
			if(token!=""&&token!=null){
				this.connect(token)
			}else{
				this.getMeId();
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			getMeId(){
				
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
					datas = res[1].data.data.user;
					console.log(datas);
					var meInfo = {
						id:datas.senderId,
						username:datas.senderName,
						avatar:datas.senderAvatar
					};
					this.createConnect(datas.token);
					uni.setStorageSync('meInfo', meInfo);
			});
		},
			createConnect(ry_token){
						uni.setStorageSync('IMToken', ry_token);
						this.connect(ry_token)
						uni.hideLoading()
			},
			connect(imtoken){  // 建立 IM 连接
				this.$im.connect({ token: imtoken }).then(user => {
				  console.log('链接成功, 链接用户 id 为: ', user.id);
				  this.userListFn();
				}).catch(error => {
				  console.log('链接失败: ', error.code, error.msg);
				});
			},
			userListFn(){
				console.log("app.vue")
				var that = this
				
				this.$im.Conversation.getList().then(conversationList => {
				  console.log('获取会话列表成功', conversationList);
				  var meId = uni.getStorageSync("meInfo").id
				  conversationList = conversationList.filter(item=>(item.latestMessage.content.content.msg.sideinfo.uid==meId || item.latestMessage.content.content.msg.userinfo.uid==meId))
				  console.log("过滤与自己无关的消息",conversationList)
				  that.$store.commit('updateUserList',{arr:conversationList,isUpdateMessageNum:false})
				  
				}).catch(error => {
				  console.log('获取会话列表失败: ', error.code, error.msg);
				  
				});
			},
			createWatch(){// 添加事件监听
				const that = this
				console.log("添加事件监听")
				// 获取会话列表
				
				this.$im.watch({
					
				  // 监听会话列表变更事件
				  conversation (event) {
					console.log("会话表变更",event.updatedConversationList)
					that.$store.commit('updateUserList',{arr:event.updatedConversationList,isUpdateMessageNum:'newMsg'})
					that.$nextTick(() => {
						
						console.log("重新获取会话列表_防止只有一个")
					    that.userListFn()
					});
				  },
				  // 监听消息通知
				  message (event) {
					console.log("新消息")
					that.$store.commit('addIMMsg',event.message)
					// 新接收到的消息内容
					const message = event.message;
				  },
				  // 监听 IM 连接状态变化
				  status (event) {
					console.log('connection status:', event.status);
				  },
				  // 监听聊天室 KV 数据变更
				  chatroom (event) {
					/**
					 * 聊天室 KV 存储数据更新
					 * @example
					 * [
					 *  {
					 *    "key": "name",
					 *    "value": "我是小融融",
					 *    "timestamp": 1597591258338, 
					 *    "chatroomId": "z002", 
					 *    "type": 1 // 1: 更新（ 含:修改和新增 ）、2: 删除
					 *  },
					 * ]
					 */
					const updatedEntries = event.updatedEntries
				  },
				  expansion (event) {
					/**
					 * 更新的消息拓展数据
					 * @example {
					 *    expansion: { key: 'value' },      // 设置或更新的扩展值
					 *    messageUId: 'URIT-URIT-ODMF-DURR' // 设置或更新扩展的消息 uid
					 * }
					 */
					const updatedExpansion = event.updatedExpansion;
					/**
					 * 删除的消息拓展数据
					 * @example {
					 *    deletedKeys: ['key1', 'key2'],    // 设置或更新的扩展值
					 *    messageUId: 'URIT-URIT-ODMF-DURR' // 设置或更新扩展的消息 uid
					 * }
					 */
					const deletedExpansion = event.deletedExpansion;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	// @import "uview-ui/index.scss";
	@import "./static/css/iconfont.css";
	@import "./static/css/animation.css";
</style>
