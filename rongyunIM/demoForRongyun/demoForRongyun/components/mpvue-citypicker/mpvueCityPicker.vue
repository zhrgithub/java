<template>
  <div class="mpvue-picker">
    <div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
    <div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
<!--     <div class="mpvue-picker__hd" catchtouchmove="true">
        <div class="mpvue-picker__action" @click="pickerCancel">取消</div>
        <div class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</div>
      </div> -->
	  <view class="uni-padding-wrap">
	      <view class="uni-title">省</view>
	  	<view class="uni-title">市</view>
	  	<view class="uni-title">区</view>
	  </view>
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange">
        <block>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in provinceDataList" :key="index">{{item.label}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in cityDataList" :key="index">{{item.label}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in areaDataList" :key="index">{{item.label}}</div>
          </picker-view-column>
        </block>
      </picker-view>
	  <div class="mpvue-picker__hd" catchtouchmove="true">
		<div class="mpvue-picker__action" style="color:#FFFFFF;" @click="pickerConfirm">确定</div>
	    <div class="mpvue-picker__action" @click="pickerCancel">取消</div>
	   </div>
    </div>
  </div>
</template>

<script>
import provinceData from './city-data/province.js';
import cityData from './city-data/city.js';
import areaData from './city-data/area.js';
export default {
  data() {
    return {
      pickerValue: [0, 0, 0],
      provinceDataList: [],
      cityDataList: [],
      areaDataList: [],
			/* 是否显示控件 */
		showPicker: false,
    };
  },
  created() {
    this.init()
  },
  props: {
    /* 默认值 */
    pickerValueDefault: {
      type: Array,
      default(){
				return [0, 0, 0]
			}
    },
    /* 主题色 */
    themeColor: String
  },
	watch:{
		pickerValueDefault(){
			this.init();
		}
	},
  methods: {
		init() {
			this.handPickValueDefault(); // 对 pickerValueDefault 做兼容处理
			this.provinceDataList = provinceData;
			this.cityDataList = cityData[this.pickerValueDefault[0]];
			this.areaDataList = areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]];
			this.pickerValue = this.pickerValueDefault;
		},
    show() {
      setTimeout(() => {
        this.showPicker = true;
      }, 0);
    },
    maskClick() {
      this.pickerCancel();
    },
    pickerCancel() {
      this.showPicker = false;
      this._$emit('onCancel');
    },
    pickerConfirm(e) {
      this.showPicker = false;
      this._$emit('onConfirm');
    },
    showPickerView() {
      this.showPicker = true;
    },
    handPickValueDefault() {
      if (this.pickerValueDefault !== [0, 0, 0]) {
        if (this.pickerValueDefault[0] > provinceData.length - 1) {
          this.pickerValueDefault[0] = provinceData.length - 1;
        }
        if (this.pickerValueDefault[1] > cityData[this.pickerValueDefault[0]].length - 1) {
          this.pickerValueDefault[1] = cityData[this.pickerValueDefault[0]].length - 1;
        }
        if (this.pickerValueDefault[2] > areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1) {
          this.pickerValueDefault[2] = areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1;
        }
      }
    },
    pickerChange(e) {
      let changePickerValue = e.mp.detail.value;
      if (this.pickerValue[0] !== changePickerValue[0]) {
        // 第一级发生滚动
        this.cityDataList = cityData[changePickerValue[0]];
        this.areaDataList = areaData[changePickerValue[0]][0];
        changePickerValue[1] = 0;
        changePickerValue[2] = 0;
      } else if (this.pickerValue[1] !== changePickerValue[1]) {
        // 第二级滚动
        this.areaDataList =
          areaData[changePickerValue[0]][changePickerValue[1]];
        changePickerValue[2] = 0;
      }
      this.pickerValue = changePickerValue;
      this._$emit('onChange');
    },
    _$emit(emitName) {
      let pickObj = {
        label: this._getLabel(),
        value: this.pickerValue,
        cityCode: this._getCityCode()
      };
      this.$emit(emitName, pickObj);
    },
    _getLabel() {
      let pcikerLabel =[this.provinceDataList[this.pickerValue[0]].label,this.cityDataList[this.pickerValue[1]].label,this.areaDataList[this.pickerValue[2]].label]
        // this.provinceDataList[this.pickerValue[0]].label +
        // '-' +
        // this.cityDataList[this.pickerValue[1]].label +
        // '-' +
        // this.areaDataList[this.pickerValue[2]].label;
		
      return pcikerLabel;
    },
    _getCityCode() {
      return this.areaDataList[this.pickerValue[2]].value;
    }
  }
};
</script>

<style>
	.uni-padding-wrap{
		width: 550rpx;
		margin: 0 0 0 100rpx;
		display: flex;
		justify-content: space-between;
	}
	.uni-title{
		margin-top: 45rpx;
		font-size: 45rpx;
	}
/* 	.mpvue-picker{
		height: 300rpx;
		width: 750rpx;
		background-color: #FFFFFF;
	} */
.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.mpvue-picker-content {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #FFFFFF;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}
.mpvue-picker-view-show {
  transform: translateY(0);
}
.mpvue-picker__hd {
	height: 80rpx;
  display: flex;
  padding: 18rpx 30rpx;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 34rpx;
}
.mpvue-picker__hd:after {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 2rpx;
  border-bottom: 2rpx solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.mpvue-picker__action {
	height: 62rpx;
	width: 174rpx;
	background-color: #43A8FF;
	color: #FFFFFF;
	text-align: center;
	line-height: 62rpx;
	border-radius: 10rpx;
	position: absolute;
	bottom: 36rpx;
}
.mpvue-picker__action:first-child {
  left: 104rpx;
}
.mpvue-picker__action:last-child {
	right: 104rpx;
	background-color: #CDCDCD;
	color: #000000;
}
.picker-item {
  text-align: center;
  line-height: 80rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 32rpx;
}
.mpvue-picker-view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300rpx;
  background-color: rgba(255, 255, 255, 1);
}
</style>
