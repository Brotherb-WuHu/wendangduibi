# y-scroll-seamless

## 使用方法

```vue
			<y-scroll-seamless :options="{direction: 'up',step:1,hoverStop: true}">
				<view class="demo-y" v-for="item in 30">
					{{item}}
				</view>
			</y-scroll-seamless>
```
> 配置项options
>
> direction：滚动方向，支持up、down、left、right4个方向，默认为up
>
> step：滚动速度，默认1
>
> hoverStop：是否支持触摸停止滚动，开启则触摸停止滚动，松开继续滚动

---

>注意
>
>当使用水平方向滚动时，请把slot内容设置禁止换行显示