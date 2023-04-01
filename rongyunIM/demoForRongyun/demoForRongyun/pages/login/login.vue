<template>
	<view>
		<button @click="torongyun()" style="background-color: #1AAD19;border-radius: 5px;box-shadow:0px 1px 2px 1px;color:#FFFFFF;">转到融云</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			torongyun(){
				uni.navigateTo({
					url:'../index/index'
				})
			}
		},
		created() {
			this.torongyun()
		}
	}
</script>

<style>

</style>
