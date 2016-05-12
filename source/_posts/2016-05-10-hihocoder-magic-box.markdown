---
layout: post
title: "HihoCoder#1135 - Magic Box"
date: 2016-05-10 12:03:52 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
一个Magic Box，不断往里放三种颜色的球（红色R，黄色Y，蓝色B），一旦这三种球数目之差为x，y，z（无序），则所有球消失。给定一个放球的序列，求盒子中球最多时刻球的数目。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1135)。
<!--more-->
## 解题思路
直接暴力解。
## 时间复杂度
给定序列循环一遍，时间复杂度为N。
## 代码
```c++
#include <iostream>
#include <string>
#include <cmath>
using namespace std;

int maxLen(string seq, int x, int y, int z) {
	int max = 0;
	int len = 0;
	int r = 0, g = 0, b = 0;
	for (int i = 0; i < seq.size(); i++) {
		if (seq[i] == 'R')
			r++;
		else if (seq[i] == 'B')
			g++;
		else if (seq[i] == 'Y')
			b++;
		len++;
		if ((abs(r - g) == x && abs(g - b) == y && abs(b - r) == z) ||
			(abs(r - g) == x && abs(b - r) == y && abs(g - b) == z) ||
			(abs(g - b) == x && abs(r - g) == y && abs(b - r) == z) ||
			(abs(g - b) == x && abs(b - r) == y && abs(r - g) == z) ||
			(abs(b - r) == x && abs(g - b) == y && abs(r - g) == z) ||
			(abs(b - r) == x && abs(r - g) == y && abs(g - b) == z)) {
			r = 0;
			g = 0;
			b = 0;
			if (max < len)
				max = len;
			len = 0;
		}
	}

	if (max < len)
		max = len;

	return max;
}

int main() {
	int x = 0, y = 0, z = 0;
	string charSeq;
	cin >> x >> y >> z;
	cin >> charSeq;
	cout << maxLen(charSeq, x, y, z);
}
```
