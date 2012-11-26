/*
 * To: article
 * Time:2012-08-22
 * authro :情封
* */

~(function(win){
	var APP = win.APP || {};
	APP = {
		init : function(articleData){
			var  that = this;
			that.renderArticle(articleData);
			that.doArticle(articleData);
		},
		tpl : function(obj){
			var _ocontent = obj["content"];
			var _sideDiv = document.createElement('li');
				_sideDiv.setAttribute("data-id",obj.id);
			var _src = (_ocontent.avatar.indexOf('http') ==-1 ?"../":"")+_ocontent.avatar;
			var _html = '<div class="info"><img src="'+_src+'"/> <address>'+_ocontent.author+'</address> <time>'+_ocontent.time+'</time></div>';
			_html+='<h2>'+_ocontent.title+'</h2>';
			_sideDiv.innerHTML = _html;
			return _sideDiv;
		},
		renderArticle : function(data){
			var that = this;
			var _docFlagment = document.createDocumentFragment();
			for(var ai = 0;ai<data.length;ai++){
				_docFlagment.appendChild(that.tpl( data[ai] ));
			}
			document.getElementById('js-blist').appendChild(_docFlagment);
		},
		getParent : function(element){
			var _parent=element.parentNode;
			return _parent && _parent.nodeType!=11 ? _parent : null;
		},
		index : function(num,data){
			for(var ai = data.length-1;ai>=0;ai--){
				var _id = data[ai].id;
				if( _id == num ){
					return ai;
				}	
			}
		},
		doArticle : function(data){
			var that = this;
			document.getElementById('js-blist').addEventListener('click',function(e){
				e.stopPropagation();
				var _target = e.target,_element = null;
				if(_target.tagName.toLowerCase() == "li"){
					_element = _target;
				}else{
					var _parent = that.getParent(_target);
					if(_parent.tagName.toLowerCase() == "li"){
						_element = _parent;
					}
					if(_parent.tagName.toLowerCase() !="li"){
						_element = that.getParent(_parent);
					}
				}
				var idPro = _element.getAttribute('data-id');
				var index = that.index(idPro,data);
				if( index == undefined){
					return;
				}
				var _url = data[index]['content']['ajaxcontent']['ajaxSource'];
				//var _url = 'http://my.4399.com/douwa/article/201208/804.html';
				var _tagName = document.getElementById('js-blist').querySelectorAll('li');
				for(var ci = data.length-1;ci>=0;ci--){
					_tagName[ci].className = (ci==index) ? "current" : "";
				}
				if(data[index]['content']['ajaxcontent']['ajaxFlag']){
					//that.createLoading();
					document.getElementById('js-article').className = 'm_article key_show';
					Ajax.doAjax("GET",_url,true,function(txt){
						//document.getElementById('js-content').removeChild(document.getElementById('js-loading'));
						document.getElementById('js-article-content').innerHTML = txt;
					});
					document.getElementById('js-close').style.display = 'block';
				}
			},false);
			that.doClose();
		},
		doClose : function(){
			var that = this;
			document.getElementById('js-close').addEventListener('click',function(){
				document.getElementById('js-article').className = 'm_article key_hidden';
				this.style.display = "none";
			},false);
		}
	};
	win.APP = APP;
})(window);




