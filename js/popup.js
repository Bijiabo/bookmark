$(function(){
	$(document).on('click','#getTree',function(){
		basic.showTree();
		bookmark.getTree();
	});
	$(document).on('click','#load_jquery',function(){
		chrome.tabs.executeScript(null,
	      {
	      	code:"$('body').html($('body').html()+'<script src=\"http://cdn.bootcss.com/jquery/2.0.3/jquery.min.js\"></script>')"
	      });
		window.close();
	});
	$(document).on('click','.bookmarklist-item',function(){
		basic.showTree(eval($(this).data('path')));
	});
	$(document).on('click','#up',function(){
		var pathCache=treePath.attr('newPath').attr('path');
		pathCache.pop();
		basic.showTree(can.makeArray(pathCache));
	});
	$('#search').bind('change',function(){
		basic.Search_Keywords($(this).val());
	});
});