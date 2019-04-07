(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{39:function(e,t,a){e.exports=a(58)},58:function(e,t,a){"use strict";a.r(t);var n=a(6),r=a(0),l=a.n(r),s=a(34),c=a(7),o=a(8),i=a(22),u=(a(49),function(e){var t=e.children;return l.a.createElement("div",{className:"blankslate blankslate-clean-background"},t)}),d=function(){return l.a.createElement("main",{className:"App-main"},l.a.createElement("div",{className:"container-lg py-4"},l.a.createElement(u,null,l.a.createElement("h3",null,"Not found"),l.a.createElement("p",null,"The page you are looking for could not be found."))))},m=a(15),h=a(16),p=a(18),E=a(17),f=a(19),b=a(4),g=a(60),v=a(13),O=a.n(v),R=a(23),y=function(){var e=Object(R.a)(O.a.mark(function e(t,a){var n,r;return O.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.github.com/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a)},body:JSON.stringify({query:t})});case 2:if(!(n=e.sent).ok){e.next=11;break}return e.next=6,n.json();case 6:if(!(r=e.sent).errors){e.next=9;break}throw new Error(r.errors[0].message);case 9:if(!r.data){e.next=11;break}return e.abrupt("return",r.data);case 11:throw new Error("Error communicating with GitHub");case 12:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}(),w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=e?"after: ".concat(e):"";return"\n      query {\n        viewer {\n          watching(\n            first: 100\n            ".concat(t,"\n          ) {\n            edges {\n              cursor\n              node {\n                id\n                name\n                url\n                owner {\n                  login\n                  avatarUrl(size: 96)\n                }\n                createdAt\n              }\n            }\n            totalCount\n            pageInfo {\n              hasNextPage\n            }\n          }\n        }\n      }\n    ")},N=function(e){return"\n    query {\n      nodes (ids: ".concat(JSON.stringify(e),") {\n        id\n        ... on Repository {\n          pullRequests(\n            last: 50\n            states: [OPEN]\n          ) {\n            edges {\n              node {\n                id\n                number\n                title\n                url\n                createdAt\n                updatedAt\n                repository {\n                  nameWithOwner\n                  url\n                }\n                author {\n                  avatarUrl(size: 96)\n                  login\n                  url\n                }\n                assignees(last: 10) {\n                  edges {\n                    node {\n                      avatarUrl(size: 40)\n                      login\n                      url\n                    }\n                  }\n                }\n                reviewRequests(last: 50) {\n                  edges {\n                    node {\n                      requestedReviewer {\n                        ... on User {\n                          login\n                          avatarUrl(size: 96)\n                        }\n                        ... on Team {\n                          name\n                          avatarUrl(size: 96)\n                        }\n                      }\n                    }\n                  }\n                }\n                reviews(last: 50) {\n                  edges {\n                    node {\n                      createdAt\n                      state\n                      author {\n                        login\n                        avatarUrl(size: 96)\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ")},S=function(e,t){return{type:"REQUEST_PULL_REQUESTS_SUCCESS",newPrs:e,oldPrs:t}},x=function(e){return{type:"SET_FILTERS",filters:e}},k=function(e){var t=e.type,a=e.children;return l.a.createElement("div",{className:"flash flash-full".concat(t?"flash-".concat(t):null)},a)},j=a(29),T=a(1),_={repo:"",author:"",orderBy:"updatedAt",reviewState:"",searchQuery:""},C=Object(c.b)(function(e){return{filters:e.dashboard.filters}},function(e){return{setFilters:function(t){e(x(t))},dispatch:e}})(function(e){var t=function(t){e.setFilters(Object(T.a)({},e.filters,Object(j.a)({},t.target.name,t.target.value)))};return l.a.createElement(l.a.Fragment,null,l.a.createElement("span",{className:"text-gray mr-2"},"Show (",e.filteredCount,"):"),function(){var a=Object(n.chain)(e.pullRequests).map(function(e){return e.author}).uniqBy("login").value();return l.a.createElement("select",{className:"form-select select-sm mr-2",name:"author",value:e.filters.author,onChange:t,style:{width:"130px"}},l.a.createElement("option",{value:""},"all authors"),a.map(function(e){var t=e.login;return l.a.createElement("option",{key:t,value:t},t)}))}(),function(){var a=Object(n.chain)(e.pullRequests).map(function(e){return e.repoName}).uniqBy().value();return l.a.createElement("select",{className:"form-select select-sm mr-2",name:"repo",value:e.filters.repo,onChange:t,style:{width:"130px"}},l.a.createElement("option",{value:""},"all repositories"),a.map(function(e){return l.a.createElement("option",{key:e,value:e},e)}))}(),l.a.createElement("span",{className:"text-gray mr-2"},"Order by:"),l.a.createElement("select",{className:"form-select select-sm mr-2",name:"orderBy",value:e.filters.orderBy,onChange:t,style:{width:"130px"}},l.a.createElement("option",{value:"updatedAt"},"recently updated"),l.a.createElement("option",{value:"createdAt"},"newest")),l.a.createElement("button",{className:"btn btn-sm",onClick:function(){return e.setFilters(_)}},"Reset"))}),A=a(59),L=a(61),U={"review requested":"bg-blue text-white","changes requested":"Label--orange",approved:"bg-green text-white",commented:"Label--gray",pending:"Label--gray",dismissed:"bg-red text-white"},q=Object(c.b)(function(e){return{filters:e.dashboard.filters}})(function(e){var t=e.number,a=e.title,n=e.url,r=e.createdAt,s=e.updatedAt,c=e.author,o=e.assignees,i=e.repository,u=e.reviewState,d=e.isNew,m=e.filters,h=function(e){return Object(A.a)(Object(L.a)(e),new Date,{addSuffix:!0})},p="Box-row Box-row--hover-gray d-flex";return d&&(p+=" Box-row--unread"),l.a.createElement("div",{className:p},c.avatarUrl&&l.a.createElement("div",{className:"pr-3"},l.a.createElement("a",{href:c.url,className:"d-block tooltipped tooltipped-se","aria-label":"Opened by ".concat(c.login)},l.a.createElement("img",{className:"avatar rounded-1",src:c.avatarUrl,width:"48",height:"48",alt:""}))),l.a.createElement("div",{className:"flex-auto"},l.a.createElement("a",{href:i.url,className:"muted-link h4 pr-1"},i.nameWithOwner),l.a.createElement("a",{href:n,className:"link-gray-dark no-underline h4"},a),l.a.createElement("div",{className:"text-gray"},l.a.createElement("span",null,"#",t," "),m&&"updatedAt"===m.orderBy?l.a.createElement("span",null,"updated ",l.a.createElement("span",{title:s},h(s))):l.a.createElement("span",null,"opened ",l.a.createElement("span",{title:r},h(r))),l.a.createElement("span",null," by "),l.a.createElement("span",null,l.a.createElement("a",{href:c.url,className:"muted-link"},c.login)),u?l.a.createElement("span",{className:"Label ml-2 ".concat(U[u])},u):null)),o.length>0?l.a.createElement("div",{className:"pl-3"},o.map(function(e){return l.a.createElement("div",{className:"d-flex",key:e.login},l.a.createElement("a",{href:e.url,className:"pl-1 tooltipped tooltipped-sw","aria-label":"Assigned to ".concat(e.login)},l.a.createElement("img",{className:"avatar rounded-1",src:e.avatarUrl,width:"24",height:"24",alt:""})))})):null)}),I=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(p.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(r)))).handleReviewStateChange=function(e){e.preventDefault(),a.props.setFilters(Object(T.a)({},a.props.filters,{reviewState:e.target.dataset.reviewState}))},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props,t=e.filters,a=e.setFilters;return l.a.createElement("div",{className:"subnav d-flex"},l.a.createElement("nav",{className:"subnav-links flex-auto"},l.a.createElement("a",{href:"/","data-review-state":"",onClick:this.handleReviewStateChange,className:"subnav-item".concat(""===t.reviewState?" selected":"")},"All"),l.a.createElement("a",{href:"/","data-review-state":"review requested",onClick:this.handleReviewStateChange,className:"subnav-item".concat("review requested"===t.reviewState?" selected":"")},"Review requested"),l.a.createElement("a",{href:"/","data-review-state":"changes requested",onClick:this.handleReviewStateChange,className:"subnav-item".concat("changes requested"===t.reviewState?" selected":"")},"Changes requested"),l.a.createElement("a",{href:"/","data-review-state":"commented",onClick:this.handleReviewStateChange,className:"subnav-item".concat("commented"===t.reviewState?" selected":"")},"Commented"),l.a.createElement("a",{href:"/","data-review-state":"approved",onClick:this.handleReviewStateChange,className:"subnav-item".concat("approved"===t.reviewState?" selected":"")},"Approved")),l.a.createElement("div",{className:"subnav-search col-3"},l.a.createElement("input",{type:"search",name:"name",className:"form-control input-contrast",style:{width:"100%",paddingLeft:28},placeholder:"Search pull requests...",value:t.searchQuery,onChange:function(e){return a(Object(T.a)({},t,{searchQuery:e.target.value}))}}),l.a.createElement(b.i,{icon:b.f,className:"subnav-search-icon"})))}}]),t}(l.a.PureComponent),P=Object(c.b)(function(e){return{filters:e.dashboard.filters}},function(e){return{setFilters:function(t){e(x(t))},dispatch:e}})(I),D=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(p.a)(this,Object(E.a)(t).call(this,e))).updateInterval=null,a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.selectedRepos.length>0&&this.props.autoRefreshEnabled&&(this.updateInterval=setInterval(function(){e.props.requestPullRequests(e.props.selectedRepos,e.props.token)},60*this.props.autoRefreshInterval*1e3))}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.updateInterval)}},{key:"render",value:function(){var e=this.props,t=e.selectedRepos,a=e.pullRequests,n=e.filteredPullRequests,r=e.loading,s=e.githubError,c=e.requestPullRequests,i=e.token,d=e.autoRefreshEnabled;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"App-menu p-3 bg-gray-light border-bottom"},l.a.createElement("div",{className:"container-lg d-flex flex-items-center"},l.a.createElement("div",{className:"flex-auto"},l.a.createElement("h1",{className:"h3"},"Dashboard")),l.a.createElement("div",null,l.a.createElement(o.b,{to:"/settings",className:"btn mr-2"},l.a.createElement(b.i,{icon:b.g})," Settings")))),l.a.createElement("main",{className:"App-main"},l.a.createElement("div",{className:"container-lg py-4"},t.length?l.a.createElement(l.a.Fragment,null,l.a.createElement(P,null),l.a.createElement("div",{className:"Box"},l.a.createElement("div",{className:"Box-header d-flex flex-items-center"},l.a.createElement("div",{className:"flex-auto d-flex flex-items-center"},l.a.createElement(C,{pullRequests:a,filteredCount:n.length})),l.a.createElement("div",{className:"d-flex flex-items-center"},d&&l.a.createElement("span",{className:"text-gray mr-2 f6"},"Auto refresh"," ",l.a.createElement(o.b,{to:"/settings/dashboard"},"enabled"),"."),l.a.createElement("button",{className:"btn btn-sm btn-primary",onClick:function(){return c(t,i)},disabled:r},l.a.createElement(b.i,{icon:b.h})," ",r?"Loading...":"Refresh"))),s?l.a.createElement(u,null,l.a.createElement("p",null,"Error fetching data from GitHub. Ensure your"," ",l.a.createElement(o.b,{to:"/settings/account"},"token")," is set correctly and try again.")):null,r||s||n.length?null:l.a.createElement(u,null,l.a.createElement("p",null,"No pull requests were found.")),!s&&n.length>0?n.map(function(e){return l.a.createElement(q,Object.assign({key:e.id},e))}):null)):l.a.createElement(k,null,"You have not selected any"," ",l.a.createElement(o.b,{to:"/settings/repositories"},"repositories")," yet."))))}}]),t}(l.a.PureComponent);D.defaultProps={selectedRepos:[],token:null,pullRequests:[],loading:!1,githubError:null};var G=function(e,t){var a=e;return t.hideOldEnabled&&(a=Object(n.filter)(a,function(e){return Object(g.a)(new Date(e[t.orderBy]),new Date)>-t.hideOldThreshold})),t.repo&&(a=Object(n.filter)(a,function(e){return e.repoName===t.repo})),t.author&&(a=Object(n.filter)(a,function(e){return e.author.login===t.author})),t.reviewState&&(a=Object(n.filter)(a,function(e){return e.reviewState===t.reviewState})),t.searchQuery&&(a=Object(n.filter)(a,function(e){var a=t.searchQuery.toLowerCase(),n=e.repoName.toLowerCase(),r=e.title.toLowerCase(),l=e.author.login.toLowerCase();return n.indexOf(a)>-1||r.indexOf(a)>-1||l.indexOf(a)>-1})),a=Object(n.orderBy)(a,t.orderBy,"desc")},H=Object(c.b)(function(e){return{selectedRepos:e.settings.selectedRepos,token:e.settings.token,autoRefreshEnabled:e.settings.autoRefreshEnabled,autoRefreshInterval:e.settings.autoRefreshInterval,githubError:e.dashboard.githubError,loading:e.dashboard.loading,pullRequests:e.dashboard.pullRequests,filteredPullRequests:G(e.dashboard.pullRequests,Object(n.extend)({hideOldEnabled:e.settings.hideOldEnabled,hideOldThreshold:e.settings.hideOldThreshold},e.dashboard.filters))}},function(e){return{requestPullRequests:function(t,a){e(function(e,t){return function(){var a=Object(R.a)(O.a.mark(function a(n,r){var l,s,c;return O.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return l=r().dashboard.pullRequests,a.prev=1,n({type:"REQUEST_PULL_REQUESTS_LOADING"}),s=N(e),a.next=6,y(s,t);case 6:c=a.sent,n(S(c,l)),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(1),n({type:"REQUEST_PULL_REQUESTS_FAILURE",error:a.t0});case 13:case"end":return a.stop()}},a,null,[[1,10]])}));return function(e,t){return a.apply(this,arguments)}}()}(t,a))},dispatch:e}})(D),B=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(p.a)(this,Object(E.a)(t).call(this,e))).input=l.a.createRef(),a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.token,n=t.setToken;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"Subhead"},l.a.createElement("h2",{className:"Subhead-heading"},"Account")),l.a.createElement("p",null,"You need to add a Personal Access Token in order to access GitHub data."),l.a.createElement("ol",{className:"pl-3"},l.a.createElement("li",null,"Go to"," ",l.a.createElement("a",{href:"https://github.com/settings/tokens",target:"_blank",rel:"noopener noreferrer"},"Personal Access Tokens")," ","and click ",l.a.createElement("b",null,"Generate new token"),"."),l.a.createElement("li",null,"Enter a description, select the ",l.a.createElement("code",null,"repo")," scope, then click"," ",l.a.createElement("b",null,"Generate token"),"."),l.a.createElement("li",null,"Copy the given token and add it below.")),l.a.createElement("form",{className:"my-3"},l.a.createElement("input",{type:"text",className:"form-control",placeholder:"Token",ref:this.input,onChange:function(){return n(e.input.current.value)},value:a})))}}]),t}(r.Component);B.defaultProps={token:null};var Q=Object(c.b)(function(e){return{token:e.settings.token}},function(e){return{setToken:function(t){return e(function(e){return{type:"SET_TOKEN",value:e}}(t))},dispatch:e}})(B),F=Object(c.b)(function(e){return{autoRefreshEnabled:e.settings.autoRefreshEnabled,autoRefreshInterval:e.settings.autoRefreshInterval,hideOldEnabled:e.settings.hideOldEnabled,hideOldThreshold:e.settings.hideOldThreshold}},function(e){return{toggleAutoRefresh:function(){return e({type:"TOGGLE_AUTO_REFRESH"})},setAutoRefreshInterval:function(t){return e(function(e){return{type:"SET_AUTO_REFRESH_INTERVAL",interval:e}}(t))},toggleHideOld:function(){return e({type:"TOGGLE_HIDE_OLD"})},setHideOldThreshold:function(t){return e({type:"SET_HIDE_OLD_THRESHOLD",threshold:t})},dispatch:e}})(function(e){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"Subhead"},l.a.createElement("h2",{className:"Subhead-heading"},"Dashboard")),l.a.createElement("form",null,l.a.createElement("div",{className:"form-checkbox"},l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",checked:e.autoRefreshEnabled,onChange:e.toggleAutoRefresh})," ","Auto refresh dashboard every",l.a.createElement("select",{className:"form-select select-sm ml-1",value:e.autoRefreshInterval,onChange:function(t){return e.setAutoRefreshInterval(t.target.value)}},l.a.createElement("option",{value:"1"},"1 minute"),l.a.createElement("option",{value:"5"},"5 minutes"),l.a.createElement("option",{value:"10"},"10 minutes"),l.a.createElement("option",{value:"30"},"30 minutes")))),l.a.createElement("div",{className:"form-checkbox"},l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",checked:e.hideOldEnabled,onChange:e.toggleHideOld})," ","Hide pull requests older than",l.a.createElement("input",{type:"number",className:"form-control input-sm ml-1",style:{width:"40px "},value:e.hideOldThreshold,onChange:function(t){return e.setHideOldThreshold(t.target.value)}})," ","days"))))}),W=a(24),z=function(e){function t(){return Object(m.a)(this,t),Object(p.a)(this,Object(E.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props,t=e.token,a=e.loading,n=e.githubError,r=e.watchedRepos,s=e.selectedRepos,c=e.selectAllRepos,i=e.resetSelectedRepos,d=e.toggleRepoSelection,m=e.requestWatchedRepos;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"Subhead"},l.a.createElement("h2",{className:"Subhead-heading"},"Repositories")),l.a.createElement("p",{className:"mb-4"},"Select the repositories you wish to monitor on the dashboard."," ",l.a.createElement("strong",null,"Only repositories you are"," ",l.a.createElement("a",{href:"https://github.com/watching"},"watching")," are listed here.")),l.a.createElement("div",{className:"Box"},l.a.createElement("div",{className:"Box-header py-2 d-flex flex-items-center"},l.a.createElement("h3",{className:"Box-title"},"Selected repositories"," ",l.a.createElement("span",{className:"Counter Counter--gray-dark"},s.length)),l.a.createElement("div",{className:"flex-auto text-right"},l.a.createElement("div",{className:"BtnGroup"},l.a.createElement("button",{className:"BtnGroup-item btn btn-sm",onClick:function(){return c(r.map(function(e){return e.id}))}},"Select all"),l.a.createElement("button",{className:"BtnGroup-item btn btn-sm",onClick:function(){return i()}},"Reset")),l.a.createElement("button",{className:"btn btn-sm btn-primary",onClick:function(){return m(t)},disabled:a},l.a.createElement(b.i,{icon:b.h})," ",a?"Loading...":"Refresh"))),n?l.a.createElement(u,null,l.a.createElement("p",null,"Error fetching data from GitHub. Ensure your"," ",l.a.createElement(o.b,{to:"/settings/account"},"token")," is set correctly and try again.")):null,a||n||r.length?null:l.a.createElement(u,null,l.a.createElement("p",null,"You are not watching any repositories currently.")),!n&&r.length>0?r.map(function(e){var t=e.id,a=e.name,n=e.url,r="repo-".concat(t),c=s.includes(t);return l.a.createElement("div",{className:"Box-row Box-row--hover-gray d-flex flex-items-center py-2 px-3",key:t},l.a.createElement("div",{className:"form-checkbox flex-auto my-0"},l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",id:r,onChange:function(){return d(t)},checked:c})," ",a)),l.a.createElement("a",{className:"btn btn-sm btn-outline",href:n},l.a.createElement(b.i,{icon:b.c,size:14})," Open on GitHub"))}):null))}}]),t}(l.a.PureComponent);z.defaultProps={watchedRepos:[],loading:!1,githubError:null,selectedRepos:[],token:null};var J=Object(c.b)(function(e){return{watchedRepos:e.watchedRepos.repos,loading:e.watchedRepos.loading,githubError:e.watchedRepos.githubError,selectedRepos:e.settings.selectedRepos,token:e.settings.token}},function(e){return{requestWatchedRepos:function(t){return e(function(e){return function(){var t=Object(R.a)(O.a.mark(function t(a){var n,r,l,s,c;return O.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a({type:"REQUEST_WATCHED_REPOS_LOADING"}),n=w(),t.next=5,y(n,e);case 5:if(r=t.sent,l=r.viewer.watching.edges,!r.viewer.watching.pageInfo.hasNextPage){t.next=18;break}s=!0;case 9:if(!s){t.next=18;break}return n=w(l[l.length-1].cursor),t.next=13,y(n,e);case 13:c=t.sent,l=[].concat(Object(W.a)(l),Object(W.a)(c.viewer.watching.edges)),s=c.viewer.watching.pageInfo.hasNextPage,t.next=9;break;case 18:l=l.map(function(e){return{id:e.node.id,name:e.node.name,url:e.node.url,owner:e.node.owner,createdAt:e.node.createdAt}}),a({type:"REQUEST_WATCHED_REPOS_SUCCESS",data:l}),t.next=25;break;case 22:t.prev=22,t.t0=t.catch(0),a({type:"REQUEST_WATCHED_REPOS_FAILURE",error:t.t0});case 25:case"end":return t.stop()}},t,null,[[0,22]])}));return function(e){return t.apply(this,arguments)}}()}(t))},toggleRepoSelection:function(t){return e(function(e){return{type:"TOGGLE_REPO_SELECTION",id:e}}(t))},selectAllRepos:function(t){return e(function(e){return{type:"SELECT_ALL_REPOS",repoIds:e}}(t))},resetSelectedRepos:function(){return e({type:"RESET_SELECTED_REPOS"})},dispatch:e}})(z),V=function(e){var t=e.match;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"App-menu p-3 bg-gray-light border-bottom"},l.a.createElement("div",{className:"container-lg d-flex flex-items-center"},l.a.createElement("div",{className:"flex-auto"},l.a.createElement("h1",{className:"h3"},"Settings")),l.a.createElement("div",null,l.a.createElement(o.b,{to:"/",className:"btn btn-primary"},l.a.createElement(b.i,{icon:b.a})," Save")))),l.a.createElement("main",{className:"App-main"},l.a.createElement("div",{className:"container-lg py-4 d-flex"},l.a.createElement("div",{className:"col-3 pr-4"},l.a.createElement("nav",{className:"menu"},l.a.createElement(o.c,{to:"".concat(t.url,"/dashboard"),className:"menu-item",activeClassName:"selected"},l.a.createElement(b.i,{icon:b.b})," Dashboard"),l.a.createElement(o.c,{to:"".concat(t.url,"/account"),className:"menu-item",activeClassName:"selected"},l.a.createElement(b.i,{icon:b.d})," Account"),l.a.createElement(o.c,{to:"".concat(t.url,"/repositories"),className:"menu-item",activeClassName:"selected"},l.a.createElement(b.i,{icon:b.e})," Repositories"))),l.a.createElement("div",{className:"col-9"},l.a.createElement(i.d,null,l.a.createElement(i.b,{path:"".concat(t.url,"/dashboard"),component:F}),l.a.createElement(i.b,{path:"".concat(t.url,"/account"),component:Q}),l.a.createElement(i.b,{path:"".concat(t.url,"/repositories"),component:J}),l.a.createElement(i.b,{exact:!0,path:"".concat(t.url),render:function(){return l.a.createElement(i.a,{to:"".concat(t.url,"/dashboard")})}}))))))},Y=function(){return l.a.createElement("div",{className:"App"},l.a.createElement("header",{className:"App-header p-3 bg-gray-dark text-white"},l.a.createElement("div",{className:"container-lg d-flex flex-items-center"},l.a.createElement("h1",{className:"flex-auto h2"},l.a.createElement(o.b,{to:"/",className:"text-white"},"GitObserve")))),l.a.createElement(i.d,null,l.a.createElement(i.b,{exact:!0,path:"/",component:H}),l.a.createElement(i.b,{path:"/settings",component:V}),l.a.createElement(i.b,{component:d})))},K=function(e){var t=e.store;return l.a.createElement(c.a,{store:t},l.a.createElement(o.a,null,l.a.createElement(i.b,{path:"/",component:Y})))},M=a(21),X=(a(57),a(37)),Z={pullRequests:[],filters:{repo:"",author:"",reviewState:"",orderBy:"updatedAt",searchQuery:""},loading:!1,githubError:null},$=function(e){if("string"===typeof e)return e.replace(/_/g," ").toLowerCase()},ee=function(e,t){var a=null;return e.length?(a=e[e.length-1].state,$(a)):(t.length>0&&(a="REVIEW_REQUESTED"),$(a))},te=function(e,t){var a=Object(n.map)(t,"id");return Object(n.chain)(e.nodes).filter(function(e){return e}).map(function(e){return Object(n.map)(e.pullRequests.edges,"node")}).flatten().map(function(e){return Object(T.a)({},e,{repoName:e.repository.nameWithOwner,reviewState:ee(Object(n.map)(e.reviews.edges,"node"),Object(n.map)(e.reviewRequests.edges,"node")),assignees:Object(n.map)(e.assignees.edges,"node"),isNew:!a.includes(e.id)})}).orderBy("updatedAt").reverse().value()},ae={token:"",selectedRepos:[],autoRefreshEnabled:!1,autoRefreshInterval:"5",hideOldEnabled:!1,hideOldThreshold:30},ne={repos:[],loading:!1,githubError:null},re=Object(M.c)({dashboard:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REQUEST_PULL_REQUESTS_LOADING":return Object(T.a)({},e,{loading:!0,githubError:null});case"REQUEST_PULL_REQUESTS_SUCCESS":return Object(T.a)({},e,{pullRequests:te(t.newPrs,t.oldPrs),loading:!1,githubError:null});case"REQUEST_PULL_REQUESTS_FAILURE":return Object(T.a)({},e,{pullRequests:[],githubError:t.error,loading:!1});case"SET_FILTERS":return Object(T.a)({},e,{filters:t.filters});default:return e}},watchedRepos:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REQUEST_WATCHED_REPOS_LOADING":return Object(T.a)({},e,{loading:!0,githubError:null});case"REQUEST_WATCHED_REPOS_SUCCESS":return Object(T.a)({},e,{repos:t.data,githubError:null,loading:!1});case"REQUEST_WATCHED_REPOS_FAILURE":return Object(T.a)({},e,{repos:[],githubError:t.error,loading:!1});default:return e}},settings:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_TOKEN":return Object(T.a)({},e,{token:t.value});case"TOGGLE_REPO_SELECTION":return e.selectedRepos.includes(t.id)?Object(T.a)({},e,{selectedRepos:e.selectedRepos.filter(function(e){return e!==t.id})}):Object(T.a)({},e,{selectedRepos:[].concat(Object(W.a)(e.selectedRepos),[t.id])});case"SELECT_ALL_REPOS":return Object(T.a)({},e,{selectedRepos:Object(W.a)(t.repoIds)});case"RESET_SELECTED_REPOS":return Object(T.a)({},e,{selectedRepos:[]});case"TOGGLE_AUTO_REFRESH":return Object(T.a)({},e,{autoRefreshEnabled:!e.autoRefreshEnabled});case"SET_AUTO_REFRESH_INTERVAL":return Object(T.a)({},e,{autoRefreshInterval:t.interval});case"TOGGLE_HIDE_OLD":return Object(T.a)({},e,{hideOldEnabled:!e.hideOldEnabled});case"SET_HIDE_OLD_THRESHOLD":return Object(T.a)({},e,{hideOldThreshold:t.threshold});default:return e}}}),le=function(){var e=function(){try{var e=localStorage.getItem("go_state");if(null===e)return;return JSON.parse(e)}catch(t){return}}(),t=[X.a];return Object(M.d)(re,e,M.a.apply(void 0,t))}();le.subscribe(Object(n.throttle)(function(){!function(e){try{var t=JSON.stringify(e);localStorage.setItem("go_state",t)}catch(a){}}({settings:le.getState().settings,dashboard:le.getState().dashboard,watchedRepos:le.getState().watchedRepos})}),1e3),Object(s.render)(l.a.createElement(K,{store:le}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.2d308f76.chunk.js.map