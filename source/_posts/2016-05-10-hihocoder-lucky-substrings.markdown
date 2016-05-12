---
layout: post
title: "hihoCoder#1152 - Lucky Substrings"
date: 2016-05-10 17:37:44 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
如果一个字符串的所有不同字符数量是一个斐波那契数，那它就是一个Lucky String。给定一个仅包含小写字母的字符串，按字典序输出其所有非空的Lucky Subtring。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1152)。
<!--more-->
## 解题思路
暴力搜索。
## 时间复杂度
遍历一遍字符串，对每个字符又要进行一次遍历，时间复杂度为N<sup>2</sup>。
## 代码
```c++
#include <iostream>
#include <string>
#include <set>
#include <map>
#include <vector>
using namespace std;

set<string> luckySubstr(string str) {
	set<string> substrs;
	int fib[] = { 1, 2, 3, 5, 8, 13, 21 };
	for (int i = 0; i < str.size(); i++) {
		set<char> chars;
		string curstr = "";
		for (int j = i; j < str.size(); j++) {
			curstr += str[j];
			if (chars.find(str[j]) == chars.end())
				chars.insert(str[j]);
			
			for (int k = 0; k < 7; k++)
				if (fib[k] == chars.size())
					substrs.insert(curstr);
		}
	}

	return substrs;
}

int main() {
	string str;
	cin >> str;

	set<string> substrs = luckySubstr(str);
	for (auto it = substrs.begin(); it != substrs.end(); it++)
		cout << it->data() << endl;

	return 0;
}
```