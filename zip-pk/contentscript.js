/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
 /*
 * 已经实现了最最基本的功能。
 * TODO:
 * 优先事项:
 *	1、实现自动更新？这个似乎不用操心了
 *  2、加入GOOLGE分析的代码,这个要优先做
 *	3、加入数据漫游功能？这个可以暂缓...
 *	
 * 功能性的：
 *	1、加一个游览器按钮，显示是否在工作，也方便用户卸载
 *	2、
 *
 * 
 */
(function(){
	//如果是在黑名单管理界面
	if(location.href=="http://www.douban.com/contacts/blacklist"){
		console.log("我正在黑名单设置页面");
		//定位到黑名单设置界面的第三个“我的收件箱”元素
		var doumail=$("a[href='/doumail/']");
		//加入我们自己的功能性按钮
		doumail.after("<p class='pl2 mb20'>&gt;&nbsp;<a id='import-blacklist' href=''>将黑名单导入插件</a></p>");
		//建立好功能连接的缓存
		var import_blacklist_btn=$("#import-blacklist");

		//读入所有的黑名单ID
		import_blacklist_btn.click(function(event){
				var lists=$("dl.obu dd a");
			//http://ww w   .  d  o  u  b  a  n  .  c  o  m  /  p  e  o 
			//123456789 10  11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
			// p  l  e  /   Mstmol/
			//26  27 28 29  30
			var banlist=new Array();
				lists.each(function(){
					var o=$(this);
					var name=o.attr("href").toString().slice(29,-1);					
					console.log(name);
					banlist.push(name);
				});
			localStorage.setItem('douban_banlist', JSON.stringify(banlist));
		});//End of 读入所有黑名单并保存到LocalStorage
		
	}
//===============================================================================
	//如果是在广播界面
	if(location.href=="http://www.douban.com/update/"){
		//console.log("我正在处理广播页面");
		//取出保存在游览器内的名单
		var retrievedObject = localStorage.getItem('douban_banlist');
		var banlist=JSON.parse(retrievedObject);
		//console.log('retrievedObject: ', banlist);

		jQuery.each(banlist,function(index, name){
			//console.log('banstats-name: ', name);
			var people=$("div.status-item a[href*='http://www.douban.com/people/"+name+"/']");
			people.parent().parent().parent().hide();
		});
		
	}
 
} )();
