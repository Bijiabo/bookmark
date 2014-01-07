var spy={
	send:function (){
		chrome.extension.sendRequest(
			{
				title:document.title,
				url:window.location.href
			},
			function (response){
				//set comtextMenus modal template
				var modalTemplate=[
									'<style type="text/css">\
										.bookmark-input{font-size: 13px;width:100%;height:30px;padding:5px 8px;font-size:13px;line-height:1.4;background-color:#fff;border:1px solid #d9d9d9;border-top-color:#c0c0c0;border-radius:1px;-webkit-box-shadow:none;box-shadow:none;-webkit-transition:none;transition:none;-webkit-appearance:none;}\
										.bookmark-input:focus{font-size: 13px;border-color:#4d90fe;outline:0;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,0.3);box-shadow:inset 0 1px 2px rgba(0,0,0,0.3);}\
										.bookmark-form-group{margin-bottom:15px}\
										.bookmark-label{font-size: 13px;display:inline-block;margin-bottom:5px;font-weight:bold}\
										.bookmark-buttonbox{width:100%;text-align:right;}\
										.bookmark-btn{padding:5px 12px;font-size:13px;font-weight:bold;line-height:18px;cursor:pointer;border-radius:2px;-webkit-box-shadow:none;box-shadow:none;background-clip:border-box}.bookmark-btn-primary{color:#fff;text-shadow:0 1px rgba(0,0,0,0.1);background-image:-webkit-linear-gradient(top,#4d90fe 0,#4787ed 100%);background-image:linear-gradient(to bottom,#4d90fe 0,#4787ed 100%);background-repeat:repeat-x;border:1px solid #3079ed;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff4d90fe",endColorstr="#ff4787ed",GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}.bookmark-btn-default{color:#333;text-shadow:0 1px rgba(0,0,0,0.1);text-shadow:0 1px 0 #fff;background-color:#f3f3f3;background-image:-webkit-linear-gradient(top,#f5f5f5 0,#f1f1f1 100%);background-image:linear-gradient(to bottom,#f5f5f5 0,#f1f1f1 100%);background-repeat:repeat-x;border:1px solid #dcdcdc;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#fff5f5f5",endColorstr="#fff1f1f1",GradientType=0);filter:progid:DXImageTransform.Microsoft.gradient(enabled=false)}\
									</style>\
									<div id="bookmark-box">\
									<div style="\
												margin:0;\
												padding:0;\
												position:fixed;\
												z-index:999;\
												top:50%;\
												left:50%;\
												width:500px;\
												height:236px;\
												margin-top:-118px;\
												margin-left:-250px;\
												background-color:white;\
												box-shadow: 0 1px 5px #666;\
												">',
									'	<div style="\
												margin:0;\
												padding:0;\
												width:100%;\
												height:30px;\
												border-bottom:1px solid #eee;\
												">\
											<p style="margin:10px;">Add bookmark<span style="float: right;font-size: 26px;color: #ccc;position: relative;top: -10px;cursor: pointer;" class="bookmark-close">&times;</span></p>\
										</div>',
									'	<div style="margin:10px;">\
											<div class="bookmark-form-group"><label class="bookmark-label" for="bookmark-title">Title</label><input type="text" class="bookmark-input" style="box-sizing:border-box;-webkit-box-sizing:border-box;" name="bookmark-title" value="',
									document.title,
									'		">\
										</div>\
										<div class="bookmark-form-group"><label class="bookmark-label" for="bookmark-select">Class</label>\
											<select name="bookmark-select" class="bookmark-input"><option value="Apple">Apple</option><option value="Banana">Banana</option></select>\
										</div><div class="bookmark-buttonbox">\
											<button type="button" class="bookmark-btn bookmark-btn-default bookmark-cancel">cancel</button>\
											<button type="button" class="bookmark-btn bookmark-btn-primary bookmark-save">save</button>\
										</div>\
										</div>',
									'</div><div style="position:fixed;z-index:998;background-color:white;opacity:0.5;width:100%;height:100%;top:0;left:0;"></div></div>'
								].join('\n');
				$('body').append(modalTemplate);
				$(document).on('click','.bookmark-close,.bookmark-cancel',function(){$('#bookmark-box').remove();});
				$(document).on('click','.bookmark-save',function(){

				});
				console.log('response:');
				console.log(response);
		})
	}
}