webpackJsonp([3],{"0Ev9":function(o,e,c){"use strict";var t=c("lyVb"),i=c("fkaQ"),n=c.n(i);e.a={name:"icons",components:{YocoPreview:t.a},data:function(){return{iconLigas:n.a.data,copySuccess:!1}}}},"1w/p":function(o,e,c){e=o.exports=c("FZ+f")(!1),e.push([o.i,".icon-container[data-v-6c517068]{float:left;text-align:center;padding:24px;-webkit-box-sizing:border-box;box-sizing:border-box}.icon-container[data-v-6c517068]:hover{background:#f8f8f8;cursor:pointer;-webkit-box-shadow:border-box;box-shadow:border-box;-webkit-box-shadow:0 2px 2px #ddd;box-shadow:0 2px 2px #ddd}.icon-liga[data-v-6c517068]{font-size:.875em;line-height:2em}.icon-container .yoco[data-v-6c517068]{font-size:32px!important}",""])},Jxcm:function(o,e,c){"use strict";e.a={name:"yoco-preview",props:{icon:String,copySuccess:!1},methods:{copyLiga:function(o){var e=this,c='<i class="yoco">'+o+"</i>";this.$copyText(c).then(function(o){console.log("success"),e.copySuccess=!0,setTimeout(function(){e.copySuccess=!1},2e3)},function(o){alert("failed")})}}}},Nzbo:function(o,e,c){"use strict";var t=function(){var o=this,e=o.$createElement,c=o._self._c||e;return c("div",{staticClass:"icon-container",on:{click:function(e){o.copyLiga(o.icon)}}},[c("div",[c("i",{ref:"liga",staticClass:"yoco"},[o._v(o._s(o.icon))])]),c("div",{staticClass:"icon-liga"},[o._v(o._s(o.icon))]),o.copySuccess?c("div",{staticClass:"success-message"},[o._v('Copied icon "'+o._s(o.icon)+'"')]):o._e()])},i=[],n={render:t,staticRenderFns:i};e.a=n},fkaQ:function(o,e){o.exports={data:["announce","3dbox","attachment","bell","calendar","card","charts","chevron_down","chevron_left","chevron_right","chevron_up","circle_attention","circle_check","circle_cross","circle_i","circle_load","circle_question","clock","close","cloud_download","cloud_upload","cloud","comment","copy","dashboard","dimension","dots_vertical","dots","download","upload","edit","exit_fullscreen","eye","file","filter","folder","fullscreen","global","heart","invoice","layer","list","minus","not_allow","permission","picture","plus","print","save","scale","search","setting","share","shop","start","support","tag","tech","trash","triangle_down","triangle_up","triangle_right","triangle_left","user","usergroup","view","zip"]}},hBdm:function(o,e,c){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=c("0Ev9"),i=c("x2m+"),n=c("K60R"),s=n(t.a,i.a,!1,null,null,null);e.default=s.exports},lEza:function(o,e,c){var t=c("1w/p");"string"==typeof t&&(t=[[o.i,t,""]]),t.locals&&(o.exports=t.locals);c("rjj0")("66e666e0",t,!0)},lyVb:function(o,e,c){"use strict";function t(o){c("lEza")}var i=c("Jxcm"),n=c("Nzbo"),s=c("K60R"),a=t,r=s(i.a,n.a,!1,a,"data-v-6c517068",null);e.a=r.exports},"x2m+":function(o,e,c){"use strict";var t=function(){var o=this,e=o.$createElement,c=o._self._c||e;return c("div",[c("h1",[o._v("Icons")]),c("h2",[o._v("Yoco")]),o._m(0),c("div",{staticClass:"columns"},o._l(o.iconLigas,function(e){return c("yoco-preview",{key:e,staticClass:"column col-2 col-md-6",attrs:{icon:e},on:{click:function(c){o.copyLiga(e)}}})})),c("h2",[o._v("Design")])])},i=[function(){var o=this,e=o.$createElement,c=o._self._c||e;return c("div",[c("p",[o._v("Youi uses designed icons -- "),c("a",{attrs:{href:"https://3yourmind.github.io/yoco"}},[o._v("Yoco")])])])}],n={render:t,staticRenderFns:i};e.a=n}});
//# sourceMappingURL=icons.804d4a9be5b94071baab.js.map