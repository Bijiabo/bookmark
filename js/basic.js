var tree=new Object();
var testCan=can.Construct.extend({},{});
var treePath=new can.Map({newPath:new can.Map({path:''}),oldPath:''});
treePath.attr('newPath').bind('change',function(event, attr, how, newVal, oldVal){
	treePath.attr('oldPath',oldVal);
	if(treePath.attr('newPath').attr('path')===undefined){
		$('#up').hide();
		$('#getTree').text('刷新');
	}else if(treePath.attr('newPath').attr('path').length===0){
		$('#up').hide();
		$('#getTree').text('刷新');
	}else{
		$('#up').show();
		$('#getTree').text('根目录');
	}
});
var basic=({
	info:{
		author:'boooo',
		mail:'hu@cafa.me'
	},
	db:openDatabase('bookmark','1.0','myBookMark Database',5*1024*1024),
	clean:function(index){
    	if(index===0){
    		$('#bookmarklist').html('');
    	}
    },
    loading:function(){
    	$('#bookmarklist').html('loading...');
    },
	showTree:function(path){//path is an array()
		this.loading();
		treePath.attr('newPath').attr('path',path);
		if(!path || path===''){
			$.each(tree,function (index,item) {
				basic.clean(index);
				$('#bookmarklist').html($('#bookmarklist').html()+'<li><a href="#" class="bookmarklist-item" data-index="['+item.index+']" data-path="['+item.index+']">'+item.title+'</a></li>');
			});
		}else if(can.isArray(path)){
			console.log(path);
			var tree_part=tree;
			var tree_part_type='dir';
			$.each(path,function (index,item){
				if(tree_part[item].children!=undefined){
					tree_part=tree_part[item].children;
				}else {
					tree_part=tree_part[item];
					tree_part_type='link';
				}
			});
			if(tree_part_type==='dir'){
				// console.log(path);
				$.each(tree_part,function (index,item){
					basic.clean(index);
					dataPathString=path.join(',');
					if(dataPathString!=''){dataPathString=dataPathString+','+item.index;}else{dataPathString=item.index;}
					$('#bookmarklist').html($('#bookmarklist').html()+'<li><a href="#" class="bookmarklist-item" data-index="'+index+'" data-path="['+dataPathString+']">'+item.title+'</a></li>')
				});
			}else{
				basic.clean(0);
				var time=new Date(tree_part.dateAdded);
				time=time.toLocaleString();
				$('#bookmarklist').html($('#bookmarklist').html()+'<li><a href="#" class="bookmarklist-item pure-button pure-button-primary color-white" data-index="" data-path="['+path.join(',')+']">'+tree_part.title+'</a></li>')
				$('#bookmarklist').html($('#bookmarklist').html()+'<li><a>MarkIn: '+time+'</a></li>')
				$('#bookmarklist').html($('#bookmarklist').html()+'<li><a>PageUrl: '+tree_part.url+'</a></li>')
			}
		}
	},
	creatWebSQL:function(){
	    basic.db.transaction(function(i){
	        i.executeSql('CREATE TABLE IF NOT EXISTS bookmark (id unique,	childrenCount,	dateAdded,	dateGroupModified,	indexNumber,	parentId,	title,	url,	type)',[],function(){
	        	basic.CountWebSQL_Bookmark(function(count){
	        		console.log('count:'+count);
	        		if(count===0){
	        			basic.Each_Tree(tree);
	        		}
	        	});
	        });
	        i.executeSql('CREATE TABLE IF NOT EXISTS cache (key unique,data,time)');
		});
		// basic.createBookmarkFolder();
	},
	cleanWebSQL:function(){
	    basic.db.transaction(function(i){
	        i.executeSql('DELETE FROM bookmark',[],function(){
	        	console.log('TABLE bookmark was cleaned.');
	        });
		});
	},
	cleanWebSQL_Test:function(){
	    basic.db.transaction(function(i){
	        i.executeSql('DELETE FROM test',[],function(){
	        	console.log('TABLE test was cleaned.');
	        });
		});
	},
	InsertWebSQL_Test:function(){
	    basic.db.transaction(function(i){
	        i.executeSql('INSERT INTO test (test,mail) VALUES (?,?)',['biu~!','hu@cafa.me']);
		});
	},
	DropWebSQL_Test:function(){
	    basic.db.transaction(function(i){
	        i.executeSql('DROP TABLE test');
		});
	},
	InsertWebSQL_Tree:function(data,type){//put the tree into WebSQL bookmark.bookmark
		// console.log(data);
		if(type==='link'){
			var insertFieldCache='dateAdded,id,indexNumber,parentId,title,url,type';
			var insertArrayCache=new Array(data.dateAdded,data.id,data.index,data.parentId,data.title,data.url,type);
		}else{
			var insertFieldCache='childrenCount,dateAdded,dateGroupModified,id,indexNumber,parentId,title,type';
			var insertArrayCache=new Array(data.children.length,data.dateAdded,data.dateGroupModified,data.id,data.index,data.parentId,data.title,type);
		}
		// console.log(insertFieldCache);
		// console.log(insertArrayCache);
		// console.log('INSERT INTO bookmark ('+insertFieldCache+') VALUES (\''+insertArrayCache.join("','")+'\')');
		basic.db.transaction(function(i){
	        i.executeSql('INSERT INTO bookmark ('+insertFieldCache+') VALUES (\''+insertArrayCache.join("','")+'\')');
	        console.log('writing'+data.dateAdded);
		});
	},
	Each_Tree:function(data){//$.each For Tree All
		if(data===tree){basic.cleanWebSQL();}
		if(data.length){
			$.each(data,function (index,item){
				debug=item;
				// console.log(item);
				if(typeof item === 'object'){
					if(item.url!=undefined){
						basic.InsertWebSQL_Tree(item,'link');
					}else{
						basic.InsertWebSQL_Tree(item,'dir');
						basic.Each_Tree(item);
					}
				}else{
					// console.log(item);
				}
			});
		}else if(data.children.length!==0){
			basic.Each_Tree(data.children);
		}else{
			basic.InsertWebSQL_Tree(data,'dir');
		}
	},
	Search_Keywords:function(key){
		basic.db.transaction(function(i){
			console.log("SELECT * FROM bookmark WHERE title LIKE '%"+key+"%'");
			i.executeSql(
				"SELECT * FROM bookmark WHERE title LIKE '%"+key+"%'",
				[],
				function (i,results){
					var results_len=results.rows.length;
					var resultsCache;
					basic.clean(0);
					for (var i = 0; i < results_len; i++) {
						resultsCache=results.rows.item(i);
						console.log(resultsCache);
						$('#bookmarklist').html($('#bookmarklist').html()+'<li><a href="'+resultsCache.url+'" target="_blank" class="bookmarklist-search-result-item" data-index="'+i+'">'+resultsCache.title+'</a></li>')
					};
				}	
			);
		});
	},
	CountWebSQL_Bookmark:function (callback){
		basic.db.transaction(function(i){
			i.executeSql("SELECT count(id) count FROM bookmark",[],function(i,results){
				callback(results.rows.item(0).count);
			});
		});
	},
	createBookmarkFolder:function (){//folder name:bookmarks
		var idCache;
		for (var i = 0; i<tree.length; i++) {
			if(tree[i].title==='bookmarks'){
				idCache=tree[i].id;
				break;
			}
		};
		if(idCache===undefined){
			chrome.bookmarks.create(
				{
					'parentId': "1",
					'title': 'bookmarks'
				},
				function(newFolder) {
					console.log(newFolder);
				}
			);
		}
	}
});
var Bookmark=can.Construct.extend({}, {
    init: function(version){  
    	this.version=version;
    	this.getTree();
    },
    loadJquery:function(){
		if(typeof jQuery==="undefined"){
			var loadjquery=document.createElement("script");
			loadjquery.setAttribute("type","text/javascript");
			loadjquery.setAttribute("src", "http://cdn.bootcss.com/jquery/2.0.3/jquery.js");
			document.getElementsByTagName("head")[0].appendChild(loadjquery);
		}
	},
	getTree:function () {
		chrome.bookmarks.getTree(
			function(bookmarkTreeNodes) {
				tree=bookmarkTreeNodes[0].children;
				basic.showTree();
			}
		);
	},
	getTreeWithPath:function(path){
		$('#bookmarklist').html('');//empty bookmarklist
		console.log(path);
		$.each(tree[path].children,function (index,item) {
			$('#bookmarklist').html($('#bookmarklist').html()+'<li><a href="#" class="bookmarklist-item" data-index="'+item.index+'" data-path="/'+path+'">'+item.title+'</a></li>')
		})
	}
}); 
var bookmark=new Bookmark('1.0');