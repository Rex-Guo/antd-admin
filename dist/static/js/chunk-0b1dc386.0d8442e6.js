(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0b1dc386"],{"260e":function(e,n,t){},"5cb1":function(e,n,t){"use strict";var a=t("260e");t.n(a).a},"7d3e":function(e,n,t){"use strict";t.r(n);var a=t("95e6"),i=t.n(a),r={mounted:function(){var e=this;this.$nextTick(function(){e.render()})},methods:{render:function(){var e=0,n=[];!function(t,a,i){for(var r=0;r<a;){var o=t,s=Math.floor(Math.random()*(i.max-i.min+1))+i.min;n.push({x:o,y:s}),e=t,t+=864e5,r++}}(new Date("11 Feb 2017 GMT").getTime(),10,{min:10,max:90});var t={chart:{height:350,type:"line",animations:{enabled:!0,easing:"linear",dynamicAnimation:{speed:2e3}},toolbar:{show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{curve:"smooth"},series:[{data:n}],title:{text:"Dynamic Updating Chart",align:"left"},markers:{size:0},xaxis:{type:"datetime",range:7776e5},yaxis:{max:100},legend:{show:!1}},a=new i.a(document.querySelector("#chart-line2"),t);a.render(),window.setInterval(function(){var t,i;t={min:10,max:90},e=i=e+864e5,n.push({x:i,y:Math.floor(Math.random()*(t.max-t.min+1))+t.min}),a.updateSeries([{data:n}])},2e3),window.setInterval(function(){n=n.slice(n.length-10,n.length),a.updateSeries([{data:n}],!1,!0)},6e4)}}},o=(t("5cb1"),t("2877")),s=Object(o.a)(r,function(){var e=this;return e.$createElement,e._self._c,e._m(0)},[function(){var e=this.$createElement,n=this._self._c||e;return n("div",[n("div",{attrs:{id:"chart-line2"}})])}],!1,null,"0dfd8a54",null);s.options.__file="line2.vue",n.default=s.exports}}]);