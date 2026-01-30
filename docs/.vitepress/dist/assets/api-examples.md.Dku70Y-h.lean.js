import{u as i,c as p,o as m,j as e,a as t,t as r,k as s}from"./chunks/framework.Bw-5EFTY.js";const d={class:"language-md vp-adaptive-theme"},u={class:"vp-code"},f={class:"language-md"},k=JSON.parse('{"title":"Runtime API Examples","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"api-examples.md","filePath":"api-examples.md"}'),h={name:"api-examples.md"},D=Object.assign(h,{setup(g){const{site:P,theme:n,page:l,frontmatter:o}=i();return(b,a)=>(m(),p("div",null,[a[2]||(a[2]=e("h1",{id:"runtime-api-examples",tabindex:"-1"},[t("Runtime API Examples "),e("a",{class:"header-anchor",href:"#runtime-api-examples","aria-label":'Permalink to "Runtime API Examples"'},"​")],-1)),a[3]||(a[3]=e("p",null,"This page demonstrates usage of some of the runtime APIs provided by VitePress.",-1)),a[4]||(a[4]=e("p",null,[t("The main "),e("code",null,"useData()"),t(" API can be used to access site, theme, and page data for the current page. It works in both "),e("code",null,".md"),t(" and "),e("code",null,".vue"),t(" files:")],-1)),e("div",d,[a[0]||(a[0]=e("button",{title:"Copy Code",class:"copy"},null,-1)),a[1]||(a[1]=e("span",{class:"lang"},"md",-1)),e("pre",u,[e("code",f,`<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
<\/script>

## Results

### Theme Data
<pre>`+r(s(n))+`</pre>

### Page Data
<pre>`+r(s(l))+`</pre>

### Page Frontmatter
<pre>`+r(s(o))+`</pre>
`,1)])]),a[5]||(a[5]=e("h2",{id:"results",tabindex:"-1"},[t("Results "),e("a",{class:"header-anchor",href:"#results","aria-label":'Permalink to "Results"'},"​")],-1)),a[6]||(a[6]=e("h3",{id:"theme-data",tabindex:"-1"},[t("Theme Data "),e("a",{class:"header-anchor",href:"#theme-data","aria-label":'Permalink to "Theme Data"'},"​")],-1)),e("pre",null,r(s(n)),1),a[7]||(a[7]=e("h3",{id:"page-data",tabindex:"-1"},[t("Page Data "),e("a",{class:"header-anchor",href:"#page-data","aria-label":'Permalink to "Page Data"'},"​")],-1)),e("pre",null,r(s(l)),1),a[8]||(a[8]=e("h3",{id:"page-frontmatter",tabindex:"-1"},[t("Page Frontmatter "),e("a",{class:"header-anchor",href:"#page-frontmatter","aria-label":'Permalink to "Page Frontmatter"'},"​")],-1)),e("pre",null,r(s(o)),1),a[9]||(a[9]=e("h2",{id:"more",tabindex:"-1"},[t("More "),e("a",{class:"header-anchor",href:"#more","aria-label":'Permalink to "More"'},"​")],-1)),a[10]||(a[10]=e("p",null,[t("Check out the documentation for the "),e("a",{href:"https://vitepress.dev/reference/runtime-api#usedata",target:"_blank",rel:"noreferrer"},"full list of runtime APIs"),t(".")],-1))]))}});export{k as __pageData,D as default};
