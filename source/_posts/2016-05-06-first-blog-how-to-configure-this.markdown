---
layout: post
title: "第一篇博客 - 如何配置octopress+github博客"
date: 2016-05-06 20:45:26 +0800
comments: true
categories: 笔记
---

## 写在前面
很久以前就想配置属于自己的博客了，可是一直光说不做，前不久系统升了win10，顺便就想把这个事情也给做了。在配置过程中遇到诸多问题，记录下来方便以后查阅。
## 搭建环境
我的操作系统是windows10 64bit企业版。
## 配置流程
### 1. 安装Git for Windows
直接去[git官网](https://git-scm.com/)下载安装即可。
### 2. 安装Ruby
去[RubyInstaller](http://rubyinstaller.org/downloads/)下载Ruby。注意安装时勾选添加到系统环境变量，或者稍后自己手动设置。**注意：我在配置时用最新版本Ruby2.3.0到最后一步bundle install时总是失败，无奈改成Ruby2.2.4就成功了。**
### 3. 安装Python2.7
去[Python官网](https://www.python.org/downloads/)下载安装。注意安装时勾选添加到系统环境变量，或者稍后自己手动设置。  
安装后运行`easy_install pygments`安装代码高亮脚本。
### 4. 安装octopress
```bash
cd <wherever_you_want_to_save_your_blog>
git clone git://github.com/imathis/octopress.git <your_dir>

gem install bundle
bundle install

rake install
rake preview
```
之后在浏览器输入localhost:4000就可以查看了。
### 5. 部署到Github
在Github上新建一个Repository，命名为`username.github.io`。然后在cmd中进行部署。
```bash
cd <wherever_your_octopress_is>
rake setup_github_pages
https://github.com/your_username/your_username.github.io

rake deploy

rake new_post['title of post']
rake new_site['name of site']

rake generate

rake deploy
```
访问username.github.io即可查看，可能会有延迟，一般不超过1分钟。
### 6. 源码维护
在上一步中运行`rake deploy`后会将生成的静态html页面push到Github，但源码还是在本地。为方便维护，我们可以将源码也push到Github。
```bash
git add .
git commit -m 'source code'
git push origin source
```
## 参考文献
[Octopress博客(1)-在windows 10上使用octopress搭建个人博客](http://silentming.net/blog/2015/11/13/build-blog-on-github-with-octopress/)  
[Markdown 编辑器语法指南](https://segmentfault.com/markdown)