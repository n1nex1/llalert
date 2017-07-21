# 调用方式


```
new llalert({
	title: '标题',   // 缺省则不显示标题栏
	content: '内容文字',
	button: {
		ok: {
			text: '确定',   // 如传空字符串，则不现实此按钮
			color: 'green',   // 文字色值
			callback: function() {
				return false;   // 默认会关闭弹窗，可用 return false;阻止关闭
			}
		},
		no: {
			text: '取消',   // 如传空字符串，则不现实此按钮
			color: '#222222',   // 文字色值
			callback: function() {
			}
		}
	}
});
```