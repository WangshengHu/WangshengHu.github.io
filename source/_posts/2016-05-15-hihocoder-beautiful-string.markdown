---
layout: post
title: "hihoCoder#1061 - Beautiful String"
date: 2016-05-15 14:16:20 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
如果一个字符串包含数量相等的连续的3个或更多字符（递增序），则其是一个beautiful string（如aabbcc）。给定一个字符串，判断是否包含一个beautiful string。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1061)。
<!--more-->
## 解题思路
简单的搜索即可。
## 时间复杂度
最坏情况下是N<sup>2</sup>。
## 代码
```c++
#include <iostream>
#include <string>
using namespace std;

bool check(string str, int n) {
	for (int i = 0; i < n; i++) {
		char cache[3] = { str[i], ' ', ' ' };
		int len[3] = { 1, 0, 0 };
		int k = 0;
		for (int j = i + 1; j < n; j++) {
			if (cache[k] == str[j])
				len[k]++;
			else if (cache[k] + 1 == str[j]) {
				if (k == 2)
					break;
				k++;
				cache[k] = str[j];
				len[k]++;
			}
			else
				break;
			if (len[0] < len[1] || len[1] < len[2])
				break;
			if (k == 2 && len[0] > len[1])
				break;
			if (k == 2 && len[1] == len[2])
				return true;
		}
	}

	return false;
}

int main() {
	int t = 0;
	cin >> t;
	for (int i = 0; i < t; i++) {
		int n = 0;
		string str;
		cin >> n >> str;

		cout << (check(str, n) ? "YES" : "NO") << endl;
	}

	return 0;
}
```