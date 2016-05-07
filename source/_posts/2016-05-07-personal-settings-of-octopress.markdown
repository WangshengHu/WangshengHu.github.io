---
layout: post
title: "Octopress的个性化设置"
date: 2016-05-07 13:30:22 +0800
comments: true
categories: 笔记
---

## 写在前面
本文主要记录一些关于octopress的个性化配置方法。
<!--more-->
## 个性化配置
### 1. 增加Categories列表
首先在`plugins`目录下添加`category_list_tag.rb`文件，代码如下：
```ruby
module Jekyll 
  class CategoryListTag < Liquid::Tag 
    def render(context) 
      html = "" 
      categories = context.registers[:site].categories.keys 
      categories.sort.each do |category| 
        posts_in_category = context.registers[:site].categories[category].size 
        category_dir = context.registers[:site].config['category_dir'] 
        category_url = File.join(category_dir, category.gsub(/_|\P{Word}/, '-').gsub(/-{2,}/, '-').downcase) 
        html << "<li class='category'><a href='/#{category_url}/'>#{category} (#{posts_in_category})</a></li>\n" 
      end 
      html 
    end 
  end 
end

Liquid::Template.register_tag('category_list', Jekyll::CategoryListTag)
```
然后在`\source\_includes\asides`目录（或`\source\_includes\custom\asides`目录）下添加`category_list.html`文件，代码如下：
```html
<section>
  <h1>Categories</h1>
  <ul id="categories">
  	{% raw %}{% category_list %}{% endraw %}
  </ul>
</section>
```
最后在`_config.yml`中`default_asides:`一栏添加`asides/category_list.html`（或`custom\asides\category_list.html`）即可。  
**注意：上述步骤有一个问题，那就是如果category包含中文的话生成的侧边栏链接会是404页面（因为链接中不能包含中文），需要将`category_url`改成`category.to_url.downcase`，将中文转换成拼音。**  
**另外，上面代码中`{% raw %}{% category_list %}{% endraw %}`必须采用`{% raw %}{% RAW %}{% endraw %}`your_content`{% raw %}{% ENDRAW %}{% endraw %}`才能正常显示。**
### 2. 首页文章缺省显示
只需要在每篇你写的markdown格式的博文中在你想要在首页显示的文字后面加上`<!--more-->`即可。
### 3. 设置链接默认在新窗口打开
在`\source\_includes\custom\head.html`文件中添加如下代码：
```html
<script>
    function addBlankTargetForLinks () {
      $('a[href^="http"]').each(function(){
          $(this).attr('target', '_blank');
      });
    }

    $(document).bind('DOMNodeInserted', function(event) {
      addBlankTargetForLinks();
    });
</script>
```
### 4. 在首页添加选项卡
首先运行`rake new_page['about']`，在`source`目录下会新生成一个`about`目录，里面包含一个`index.markdown`文件。编辑该文件，然后运行`rake generate`将会在`public`目录下生成一个对应的`index.html`文件。然后编辑`\source\_includes\custom\navigation.html`文件，即可将生成的about页面链接添加到首页选项卡。
### 5. 添加disqus评论功能
只需要编辑`_config.yml`中相应部分即可。具体操作为在`_config.yml`文件中对应位置填写自己的账号。
### 6. 添加访客计数功能
我采用了Flag Counter，直接去[官网](http://www.flagcounter.com/)生成html代码，然后拷贝到`source\_includes\asides\flag_counter.html`文件（需新建），最后在`_config.yml`中`default_asides:`一栏添加`asides/flag_counter.html`即可。
### 7. 优化加载速度
由于国内墙的原因，请求墙外网站资源的速度极慢，因此需要删除某些用到国外网站资源的功能。具体如下：  
1. 将`\source\_includes\head.html`文件中的google的jquery脚本地址改成[百度](http://developer.baidu.com/wiki/index.php?title=docs/cplat/libs)的。  
2. 将`\source\_includes\custom\head.html`文件中的google font请求注释掉。  
3. 将`_config.yml`文件中的twitter内容注释掉。
## 参考文献
[Octopress博客的个性化配置](http://tianweili.github.io/blog/2015/01/11/setup-octopress-blog/)  
[Octopress 精益修改 (5)](https://shengmingzhiqing.com/blog/octopress-lean-modification-5.html/)