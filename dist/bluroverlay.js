(function ($) {
	'use strict';
	
	var _defaultOptions = {
		contentWrapperClass: "content-wrapper",
		blur: 10,
		opacity: 0.4,
		background: "#fff",
		height: "60px"
	};
	
	var Bluroverlay = function (ele, options) {
		this.ele			= ele;
		this.$ele			= $(ele);
		this.options	= {};
		
		this.options.contentWrapperClass	= options.contentWrapperClass || _defaultOptions.contentWrapperClass;
		this.options.blur	= options.blur || _defaultOptions.blur;
		this.options.opacity	= options.opacity || _defaultOptions.opacity;
		this.options.background	= options.background || _defaultOptions.background;
		this.options.height	= options.height || this.$ele.height() || _defaultOptions.height;
		
		console.log(this.options);
		
		this._init();
	};
	
	Bluroverlay.prototype = {
		_init: function(){
			var self	= this;
			
			// add blur svg to body
			$("body").append('<svg id="svg-image-blur" style="position:absolute;top:0;height:0;">'+
				'<filter id="blur-effect"><feGaussianBlur stdDeviation="'+this.options.blur+'" /></filter></svg>');
			// add style to ele
			this.$ele.css({
				"overflow": "hidden",
				"z-index": 9999,
				"background": this.options.background,
				"height": this.options.height
			});
			// add content blurred to ele
			this.$ele.append('<div class="content-blurred '+this.options.contentWrapperClass+'">' 
				+ $("."+this.options.contentWrapperClass).html().replace(/\id="/g, "id=\"_").replace(/\id='/g, "id='_")
				+ '</div>');
			// apply styles to content blurred
			$(".content-blurred").css({
				"filter": "url(#blur-effect)",
				"-webkit-filter": "blur("+this.options.blur+"px)",
				"position": "absolute",
				"overflow": "visible",
				"top": 0,
				"left": 0,
				"opacity": this.options.opacity,
				"z-index": 1,
				"width": "100%",
				"height": this.$ele.height()
			});
			// add style to page content
			$("."+this.options.contentWrapperClass).css({ "padding-top":this.options.height });
			// listen to page scroll
			$(document).on("scroll", this._onscroll);
			this._onscroll();
		},
		_onscroll: function(){
			var translation = 'translate3d(0,' + (-$(document).scrollTop() + 'px') + ',0)';
			$(".content-blurred").css({
				"-webkit-transform": translation,
				"-moz-transform": translation,
				"transform": translation
			}); 
		},
		showBlurmask: function(){
			var $animation_ele = [this.$ele, $($("."+this.options.contentWrapperClass).get(1))];
			$({blurRadius: 0}).animate({blurRadius: this.options.blur}, {
				duration: 400,
				easing: 'swing',
				step: function() {
					$animation_ele[0].css({
						"-webkit-filter": "blur("+this.blurRadius+"px)",
						"filter": "blur("+this.blurRadius+"px)"
					});
					$animation_ele[1].css({
						"-webkit-filter": "blur("+this.blurRadius+"px)",
						"filter": "blur("+this.blurRadius+"px)"
					});
				}
			});
		},
		hideBlurmask: function(){
			var $animation_ele = [this.$ele, $($("."+this.options.contentWrapperClass).get(1))];
			$({blurRadius: this.options.blur}).animate({blurRadius: "0px"}, {
				duration: 300,
				easing: 'swing',
				step: function() {
					$animation_ele[0].css({
						"-webkit-filter": "blur("+this.blurRadius+"px)",
						"filter": "blur("+this.blurRadius+"px)"
					});
					$animation_ele[1].css({
						"-webkit-filter": "blur("+this.blurRadius+"px)",
						"filter": "blur("+this.blurRadius+"px)"
					});
				},
				complete: function(){
					$animation_ele[0].css({
						"-webkit-filter": "none",
						"filter": "none"
					});
					$animation_ele[1].css({
						"-webkit-filter": "none",
						"filter": "none"
					});
				}
			});
		}
	};
	
	$.fn.bluroverlay = function(options) {
		if (!this._bluroverlay) {
			this._bluroverlay = new Bluroverlay(this.get(0), options);
			return this._bluroverlay;
		}
	};
	
	$.bluroverlay = {};
	
})(window.jQuery);
