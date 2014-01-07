// console.log('Mr.Background is running basic.creatWebSQL()...');
basic.creatWebSQL();
// console.log('Mr.Background is running basic.creatWebSQL()...done');
chrome.contextMenus.create(//create menu
	{
		type:'normal',
		title:'bookmark',
		onclick:function(info,tab)
				{
					// spy.send();
					chrome.tabs.executeScript(null,
						{code:
							"spy.send();"//contextMenus send something to background
						});
				}
	},
	function(){
		console.log('contentMenus created!');
	});
chrome.extension.onRequest.addListener(//background requert to contextMenus event
	function(request, sender, sendResponse)
	{
		console.log(request);
		// console.log(sender);
		// console.log(sendResponse);
		// sendResponse({test: "do response"});
		sendResponse(tree[0].children);
	}
);
can.route.bind('change',function(event, attr, how, newVal, oldVa){
	if(can.sRoute.setType==='hashchange'){
		console.log(event);
		console.log(attr);
		console.log(how);
		console.log(newVal);
		console.log(oldVa);
	}
});