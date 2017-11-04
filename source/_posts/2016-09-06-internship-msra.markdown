---
layout: post
title: "实习经历 - MSRA"
date: 2016-09-06 17:38:18 +0800
comments: true
categories: [实习经历, 项目]
---

## 时间
2015年6月 - 2016年3月
## 公司
北京微软亚洲研究院
<!--more-->
## 项目
[CodeHow](http://bda-codehow.cloudapp.net/)，一个自然语言查询的代码搜索引擎。
## 具体工作
CodeHow是一个用于自然语言查询的代码搜索工具。目前支持C#、C++、Java、JavaScript。同时它还可用于Api Example查询。  
前端采用MVC框架，负责接收用户输入并与后台搜索引擎交互。  
后台采用[Elasticsearch](https://www.elastic.co/products/elasticsearch)以及Sql Server。其中基于自然语言搜索的代码库使用elasticsearch，而Api Example部分的代码库使用sql server。  
代码库源代码收集：Nodejs脚本编写的github爬虫。  
代码库源代码AST分析：C#和VB采用[Roslyn](https://roslyn.codeplex.com/)以及[Nuget](https://www.nuget.org/)，Java采用jdk，C++采用Clang，JavaScript采用[esprima](http://esprima.org/demo/parse.html)。  
部分研究工作：通过NLP领域的词向量提取方法（如流行的word2vec）尝试提取软件工程领域的同义词，并应用到代码搜索上以提高搜索精度。
## 语言技术
语言：C#，Java，Javascript  
技术：MVC，AST分析，信息检索，自然语言处理
##开发及同步工具
开发：Visual Studio 2015/eclipse/sublime
同步：git
