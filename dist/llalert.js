


function llalert(options) {

	this.options = $.extend(true, {
		title: '',
		content: '',

		button: {
			ok: {
				text: '确定',
				color: 'green' // red: ff5959, green: 20ce5a
			},
			no: {
				text: '取消',
				color: '#222222'
			}
		},
		callback: {
			ok: null,
			no: null
		}
	}, options);

	this.initDom();

	this.init();
}

$.extend(llalert.prototype, {
	initDom: function() {
		if (document.querySelector('#llalert-style')) {
			return;
		}
		var style = document.createElement('style');
		style.id = 'llalert-style';
		style.innerHTML = [
			'.mod-llalert-bg { display: -webkit-box; -webkit-box-pack: center; -webkit-box-align: center; padding: 0 15px; background-color: rgba(0, 0, 0, 0.4); position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 10000; box-sizing: border-box; -webkit-transition: opacity 0.2s ease-out;}',
			'.mod-llalert { width: 100%; max-width: 320px; background-color: white; font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; border-radius: 5px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); opacity: 0; -webkit-transition: opacity 0.2s ease-out, -webkit-transform 0.3s ease-out; -webkit-transform: translate(0, -5px)}',
			'.mod-llalert .mod-llalert-head { padding: 20px 20px 0; font-size: 16px; text-align: center; box-sizing: border-box;}',
			'.mod-llalert .mod-llalert-body { display: -webkit-box; -webkit-box-pack: center; -webkit-box-align: center; min-height: 100px; line-height: 22px; font-size: 16px; color: #222222; padding: 20px; box-sizing: border-box; word-break: break-all; word-wrap: word-break;}',
			'.mod-llalert .mod-llalert-body small { font-size: 12px; color: #a3a3a3;}',
			'.mod-llalert .mod-llalert-body .color-green { color: #20ce5a;}',
			'.mod-llalert .mod-llalert-body .color-red { color: #ff5959;}',
			'.mod-llalert .mod-llalert-foot:before { content: \'\'; display: block; width: 100%; height: 1px; background: #dbdbdb; position: absolute; top: 0; right: 0; left: 0;}',
			'.mod-llalert .mod-llalert-foot { display: -webkit-box; height: 44px; position: relative;}',
			'.mod-llalert .mod-llalert-button { display: -webkit-box; max-width: 100%; -webkit-box-pack: center; -webkit-box-align: center; min-width: 50%; height: 44px; box-sizing: border-box; -webkit-box-flex: 1; position: relative;}',
			'.mod-llalert .mod-llalert-button:after { content: \'\'; display: block; width: 1px; height: 100%; background: #dbdbdb; position: absolute; top: 0; right: 0; bottom: 0;}',
			'.mod-llalert .mod-llalert-button:last-child:after { display: none;}',
			'@media screen and (-webkit-min-device-pixel-ratio: 1.5) {',
			'	.mod-llalert .mod-llalert-foot:before { -webkit-transform: scaleY(0.5);}',
			'	.mod-llalert .mod-llalert-button:after { -webkit-transform: scaleX(0.5);}',
			'}',
			'',
			'',
			'',
			'',
			''
			].join('');


		document.querySelector('head').appendChild(style);
	},

	init: function() {
		this.$wrap = $('<div class="mod-llalert-bg"><div class="mod-llalert"><div class="mod-llalert-head"></div><div class="mod-llalert-body"></div><div class="mod-llalert-foot"><div class="mod-llalert-button mod-llalert-no"></div><div class="mod-llalert-button mod-llalert-ok"></div></div></div></div>');
		this.$alert = this.$wrap.find('.mod-llalert');
		this.$title = this.$wrap.find('.mod-llalert-head');
		this.$content = this.$wrap.find('.mod-llalert-body');
		this.$no = this.$wrap.find('.mod-llalert-no');
		this.$ok = this.$wrap.find('.mod-llalert-ok');

		this.setTitle(this.options.title);
		this.setContent(this.options.content);

		this.setButton();

		this.$wrap.on('touchmove', function() {
			return false;
		});

		$('body').append(this.$wrap);

		this.show();
	},
	setTitle: function(title) {
		if (title) {
			this.$title.html(title);
		}
		else {
			this.$title.hide();
		}
		return this;
	},
	setContent: function(content) {
		if (content) {
			this.$content.html(content);
		}
		return this;
	},
	setButton: function() {
		var self = this, options = this.options, button = options.button;
		if (!button.ok.text) {
			this.$ok.hide();
		}
		if (!button.no.text) {
			this.$no.hide();
		}

		this.$ok.html(button.ok.text);
		this.$no.html(button.no.text);

		switch (button.ok.color) {
			case 'red':
				this.$ok.css('color', '#ff5959');
				break;

			case 'green':
				this.$ok.css('color', '#20ce5a');
				break;

			default:
				this.$ok.css('color', options.button.ok.color);
		}
		

		this.$no.css('color', options.button.no.color);

		this.$no.on('click.cancel', function() {
			if (button.no.callback) {
				var re = button.no.callback.call(self);
				if (re !== false) {
					self.remove();
				}
			}
			else {
				self.remove();
			}

		});

		this.$ok.on('click.confirm', function() {
			if (button.ok.callback) {
				var re = button.ok.callback.call(self);
				if (re !== false) {
					self.remove();
				}
			}
			else {
				self.remove();
			}
		});
	},
	show: function() {
		// this.$wrap.show();
		var self = this;
		window.setTimeout(function() {
			self.$alert.css('opacity', 1);
			self.$alert.css('-webkit-transform', 'translate(0, 0)');
		}, 0);
		
	},
	// hide: function() {
	// 	this.$wrap.hide();
	// },
	remove: function() {
		var self = this;
		this.$wrap.css('opacity', 0);
		window.setTimeout(function() {
			self.$wrap.remove();
		}, 200);
	}
});

