---
layout: post
title: "实习经历 - 美购"
date: 2016-09-06 19:54:13 +0800
comments: true
categories: [实习经历, 项目]
---

## 时间
2016年7月 - 2016年8月
## 公司
上海淘玺电子商务有限公司（美购网）
<!--more-->
## 项目
一个小型nginx日志收集处理系统，用于收集美购网的用户行为日志。
## 具体工作
为公司的两台nginx日志服务器搭建的一个伪分布式的实时的小型日志收集处理系统，以方便今后的实时日志分析。  
架构设计采用flume->kafka->flume->hdfs->hive的形式。  
两台nginx日志服务器各配置一个flume agent，采用tail -F命令实时收集原始日志作为source，并sink到第三台机器的kafka中间件，然后再接一个flume agnet，将数据以分钟为单位sink到hdfs。然后采用map reduce程序对hdfs里的原始数据进行分析，提取键值对，并入库（hive）永久化存储。
## 语言技术
语言：Java  
技术：flume，kafka，hadoop，hive
## 开发及同步工具
开发：linux，vim
同步：git