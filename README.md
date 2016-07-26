

new llalert({
	title: '消息通知',
	content: response.msg,
	button: {
		ok: {
			text: '确定',
			color: 'green',
			callback: function() {
				location.href = response.ext.url;
			}
		},
		no: {
			text: '取消',
			color: '#222222'
		}
	}
});
