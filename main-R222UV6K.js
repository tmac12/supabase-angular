import"./chunk-QS7MSTVV.js";import"./chunk-J6OH443T.js";import{i as b,j as A,k as x,n as T}from"./chunk-47TZIXEG.js";import{a as _}from"./chunk-JSIY2ZNN.js";import{Gb as i,Oa as g,P as h,Ta as p,X as C,Xa as c,Ya as m,Za as l,fa as n,lb as d,sb as S,ta as s,ya as v}from"./chunk-SEPSBFDG.js";import"./chunk-JENGY3ED.js";import"./chunk-PYQTE2ZK.js";var a=(()=>{let t=class t{constructor(){this.supabase=n(i),this.isAuthenticated=v(()=>this.supabase.sessionSignal()!=null)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var u=(e,t)=>{let F=n(i),r=n(a);return F.getUser().then(o=>!!o.data.user)};var y=[{path:"home",loadComponent:()=>import("./chunk-KYPBNZTT.js"),canActivate:[u]},{path:"addShift",loadComponent:()=>import("./chunk-PHDIG5NB.js"),canActivate:[u]},{path:"login",loadComponent:()=>import("./chunk-77RF45KC.js")},{path:"",redirectTo:"home",pathMatch:"full"}];var k={providers:[T(y),b()]};function H(e,t){e&1&&(c(0,"div"),d(1,"AUTH"),m())}function R(e,t){e&1&&(c(0,"div"),d(1,"NOT AUTH"),m())}function w(e,t){}function E(e,t){e&1&&l(0,"app-login-form")}var j=(()=>{let t=class t{constructor(){this.title="supabase-angular",this.supabase=n(i),this.authService=n(a),this.session=this.supabase.session,this.isAuthenticated=this.authService.isAuthenticated}ngOnInit(){this.supabase.authChanges((r,o)=>{this.session=o,this.supabase.sessionSignal.set(o)})}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=h({type:t,selectors:[["app-root"]],standalone:!0,features:[S],decls:5,vars:2,template:function(o,f){o&1&&(l(0,"router-outlet"),g(1,H,2,0,"div")(2,R,2,0)(3,w,0,0)(4,E,1,0)),o&2&&(s(),p(1,f.isAuthenticated()?1:2),s(2),p(3,f.session?3:4))},dependencies:[x,_]});let e=t;return e})();A(j,k).catch(e=>console.error(e));