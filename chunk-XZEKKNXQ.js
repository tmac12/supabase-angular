import{a as K}from"./chunk-PDBPVLJX.js";import{a as F}from"./chunk-NT56ZOJ3.js";import{a as ee,c as te,f as ne,n as ie}from"./chunk-Z3WL2G5Q.js";import"./chunk-MGRLAE7I.js";import{B as N,Ea as U,H as q,Ha as _,J as O,Ob as y,Pa as h,Pb as g,Qb as Z,T as C,Ua as S,Va as Y,Wa as G,X as E,Xa as L,Y as w,Ya as i,Za as n,_a as x,cb as Q,f as R,fb as I,gb as p,l as A,la as m,pa as W,pb as l,q as P,qa as $,qb as J,r as D,rb as T,sb as z,tb as H,ua as B,ub as X,wb as b,za as u}from"./chunk-BV5FZVRH.js";import"./chunk-JENGY3ED.js";import{d as V}from"./chunk-PYQTE2ZK.js";function se(e,t){if(e&1){let o=Q();i(0,"div",6)(1,"div",6)(2,"label",7),l(3," Email address "),n(),i(4,"div",8)(5,"input",9),X("ngModelChange",function(a){E(o);let f=p();return H(f.email,a)||(f.email=a),w(a)}),n()()(),i(6,"div")(7,"button",10),I("click",function(){E(o);let a=p();return w(a.addFriend())}),l(8," Add friend "),n(),i(9,"button",10),I("click",function(){E(o);let a=p();return w(a.signIn())}),l(10," Send magic link "),n()()()}if(e&2){let o=p();u(5),z("ngModel",o.email)}}function de(e,t){e&1&&(i(0,"div"),l(1,"Please check your emails!"),n())}var re=(()=>{let t=class t{constructor(){this.email=_(""),this.linkSuccess=_(!1),this.authService=m(K),this.friendService=m(F)}signIn(){return V(this,null,function*(){let r=yield this.authService.signInWithEmail(this.email());r.error?alert(r.error.message):this.linkSuccess.set(!0)})}addFriend(){return V(this,null,function*(){let r=yield this.friendService.addFriendByEmail(this.email());alert(r?"Friend added":"Friend not added")})}};t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=C({type:t,selectors:[["app-add-friend"]],standalone:!0,features:[b],decls:8,vars:1,consts:[[1,"min-h-full","flex","flex-col","justify-center","py-12","sm:px-6","lg:px-8"],[1,"sm:mx-auto","sm:w-full","sm:max-w-md"],[1,"mt-6","text-center","text-3xl","font-extrabold","text-gray-900"],[1,"mt-8","sm:mx-auto","sm:w-full","sm:max-w-md"],[1,"bg-white","py-8","px-4","shadow","sm:rounded-lg","sm:px-10"],["class","space-y-6"],[1,"space-y-6"],["for","email",1,"block","text-sm","font-medium","text-gray-700"],[1,"mt-1"],["type","email","autocomplete","email","placeholder","john@doe.com",1,"block","w-full","px-3","py-2","border","border-gray-300","rounded-md","shadow-sm","placeholder-gray-400","focus:outline-none","focus:ring-emerald-500","focus:border-emerald-500","sm:text-sm",3,"ngModel","ngModelChange"],[1,"w-full","flex","justify-center","py-2","px-4","border","border-transparent","rounded-md","shadow-sm","text-sm","font-medium","text-white","bg-emerald-600","hover:bg-emerald-700","focus:outline-none","focus:ring-2","focus:ring-offset-2","focus:ring-emerald-500",3,"click"]],template:function(a,f){a&1&&(i(0,"div",0)(1,"div",1)(2,"h2",2),l(3," Supabase Trello "),n()(),i(4,"div",3)(5,"div",4),h(6,se,11,1,"div",5)(7,de,2,0),n()()()),a&2&&(u(6),S(6,f.linkSuccess()?7:6))},dependencies:[ie,ee,te,ne]});let e=t;return e})();function oe(e,t,o){!t&&$(e);let r=t??m(B);return o?W(r,o):r}function k(e,t={}){return oe(k,t?.injector,()=>{let o=m(U),r=new R,f=ue(r,t?.behavior??"switch").subscribe({next:s=>c.set({kind:d.Value,value:s}),error:s=>c.set({kind:d.Error,error:s})});o.onDestroy(()=>f.unsubscribe());let c;if(t?.requireSync&&t?.initialValue===void 0){let s=e(void 0);if(ae(s))throw new Error(ce);c=_({kind:d.NoValue}),A(s)?r.next(s):c.set({kind:d.Value,value:s})}else c=_({kind:d.Value,value:t?.initialValue});if(t?.requireSync&&c().kind===d.NoValue)throw new Error(me);let M=t?.requireSync===!0;return Z(()=>{let s=g(()=>{let j=c();return j.kind===d.Value?j.value:void 0}),v=e(s);if(M){M=!1;return}A(v)||ae(v)?g(()=>r.next(v)):g(()=>c.set({kind:d.Value,value:v}))}),y(()=>{let s=c();switch(s.kind){case d.Value:return s.value;case d.Error:throw s.error;case d.NoValue:return;default:throw new Error("Unknown state")}},{equal:t?.equal})})}var ce="Promises cannot be used with requireSync. Pass an initialValue or set requireSync to false.",me="The observable passed to computedAsync() did not emit synchronously. Pass an initialValue or set requireSync to false.";function ue(e,t){let o={merge:P,concat:D,exhaust:N,switch:O};return e.pipe(o[t]())}function ae(e){return e&&typeof e.then=="function"}var d=function(e){return e[e.NoValue=0]="NoValue",e[e.Value=1]="Value",e[e.Error=2]="Error",e}(d||{});function pe(e,t){if(e&1&&(i(0,"span",9),l(1),n()),e&2){let o=p().$implicit;u(),T(" ",o.status," ")}}function fe(e,t){if(e&1&&l(0),e&2){let o=p().$implicit;T(" ",o.status," ")}}function xe(e,t){e&1&&(i(0,"div")(1,"button",10),l(2,"ACCEPT"),n(),i(3,"button",11),l(4,"DECLINE"),n()())}function _e(e,t){if(e&1&&(i(0,"tr")(1,"th")(2,"label"),x(3,"input",2),n()(),i(4,"td")(5,"div",3)(6,"div",4)(7,"div",5),x(8,"img",6),n()(),i(9,"div")(10,"div",7),l(11),n(),i(12,"div",8),l(13,"email"),n()()()(),i(14,"td"),h(15,pe,2,1)(16,fe,1,1),n(),i(17,"th"),h(18,xe,5,0),n()()),e&2){let o=t.$implicit,r;u(11),J(o.owner_id),u(4),S(15,(r=o.status)==="accepted"?15:16),u(3),S(18,(r=o.status)==="pending"?18:-1)}}function he(e,t){if(e&1&&G(0,_e,19,3,"tr",null,Y),e&2){let o=p();L(o.allFriendsData())}}var qe=(()=>{let t=class t{constructor(){this.friendService=m(F),this.friends=k(()=>this.friendService.getFriendPromise(),{initialValue:[]}),this.allFriends=k(()=>this.friendService.getAllFriends().pipe(q([])),{initialValue:[]}),this.allFriendsData=y(()=>{let r=this.allFriends();if(!r)return[];let a=r;return a.error?(console.error(a.error),[]):a.data})}};t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=C({type:t,selectors:[["app-friends"]],standalone:!0,features:[b],decls:27,vars:1,consts:[[1,"overflow-x-auto"],[1,"table"],["type","checkbox",1,"checkbox"],[1,"flex","items-center","gap-3"],[1,"avatar"],[1,"mask","mask-squircle","w-12","h-12"],["src","/tailwind-css-component-profile-2@56w.png","alt","Avatar Tailwind CSS Component"],[1,"font-bold"],[1,"text-sm","opacity-50"],[1,"text-green-500"],[1,"btn","btn-success","btn-xs"],[1,"btn","btn-error","btn-xs"]],template:function(a,f){a&1&&(i(0,"p"),l(1,"friends works!"),n(),x(2,"app-add-friend"),i(3,"h1"),l(4,"All Friends"),n(),i(5,"div",0)(6,"table",1)(7,"thead")(8,"tr")(9,"th")(10,"label"),x(11,"input",2),n()(),i(12,"th"),l(13,"owner_id"),n(),i(14,"th"),l(15,"status"),n(),x(16,"th"),n()(),i(17,"tbody"),h(18,he,2,0),n(),i(19,"tfoot")(20,"tr"),x(21,"th"),i(22,"th"),l(23,"owner_id"),n(),i(24,"th"),l(25,"status"),n(),x(26,"th"),n()()()()),a&2&&(u(18),S(18,f.allFriends()?18:-1))},dependencies:[re]});let e=t;return e})();export{qe as default};
