---
layout: post
title: "hihoCoder#1015 - KMP算法"
date: 2016-05-11 19:27:36 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
经典的模式字符串匹配问题。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1015)。
<!--more-->
## 解题思路
KMP算法主要利用了在一次匹配失败后收集信息，选取下一个起始点进行重新匹配，省去了大量冗余比较。  
首先，考察下述例子：  
`原串：  bababa`  
`模式串：bababb`  
我们给出两个标记，j是原串上当前遍历到的位置，i是模式串上当前遍历到的位置，那么可以发现一个性质：假设当前在模式串的i+1位置发生了不匹配，而且满足模式串[1, t]与[i-t+1, i]相等的最大的t为k，那么只有将模式串至少前进i-1-k才可能发生匹配，且只需要从原串上当前位置j，以及模式串上位置k+1继续比较。这个模式字符串的不同位置对应的k被称为next数组。  
暴力求解next数组将会是M<sup>2</sup>的时间复杂度，仔细思考可以发现求解next数组本身也可以利用上述想法。假设当前已经求出next[i]，我们可以考虑原串[1, i+1]与模式串[1, i]的匹配过程，可以发现最后求得的模式串匹配点即是next[i+1]。因此可以用递归的形式求解next数组。
## 时间复杂度
首先考虑每次i++的情况，进行一次比较，共n次；其次考虑i不变的情况，j=next[j]，模式串是永远往右移动的，最多n次。因此时间复杂度为N，加上计算next数组，时间复杂度为N + M。
## 代码
```c++
#include <iostream>
#include <string>
using namespace std;

void calNext(string str, int idx, int* next) {
	if (idx > str.size())
		return;

	int q = next[idx - 1];
	while (q != -1) {
		if (str[q] == str[idx - 1]) {
			next[idx] = q + 1;
			break;
		}
		q = next[q];
	}
	if (q == -1)
		next[idx] = 0;
	calNext(str, idx + 1, next);
}

int kmp(string str, string pattern) {
	// resolve the NEXT array
	int* next = new int[pattern.size() + 1];
	next[0] = -1;
	calNext(pattern, 1, next);

	// pattern match
	int m = 0;
	int i = 0, j = 0;
	for (; i < str.size();) {
		if (j == -1) {
			i++;
			j = 0;
			continue;
		}
		int k = j;
		for (; k < pattern.size(); k++)
			if (str[i + k - j] != pattern[k])
				break;
		if (k == pattern.size())
			m++;
		i += k - j;
		j = next[k];
	}

	return m;
}

int main() {
	int N = 0;
	cin >> N;
	for (int i = 0; i < N; i++) {
		string pattern, str;
		cin >> pattern >> str;

		cout << kmp(str, pattern) << endl;
	}

	return 0;
}
```