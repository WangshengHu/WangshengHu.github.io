---
layout: post
title: "hihoCoder#1066 - 无间道之并查集"
date: 2016-05-15 14:42:06 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个n个不同元素的集合，这些元素被分成不相交集合，且最开始每个元素自成一个集合。现在考虑两种运算：find(x)和union(x, y)，find(x)返回包含x的集合名字，union(x, y)则将包含x和y的两个集合合并。设计一种数据结构满足高效率的上述两种运算。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1066)。
<!--more-->
## 解题思路
经典的Union-Find Set问题。首先很容易想到树形结构，每个集合对应一棵树，所有集合就是一片森林。find操作就是查找根节点，union操作就是合并两棵树。关键在于路径压缩，即每次执行find和union操作时我们应尽可能使树的高度降低，这样下次执行find和union操作时查找根节点的时间就大大减少了。
## 时间复杂度
时间复杂度为Mlog<sup>*</sup>N。在实际应用中由于log<sup>*</sup>N <= 5，时间复杂度即M。
## 代码
```c++
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

unordered_map<string, string> unionFindSet;

string find(string n) {
	if (unionFindSet[n] == n)
		return n;
	unionFindSet[n] = find(unionFindSet[n]);
	return unionFindSet[n];
}

void unionset(string a, string b) {
	if (unionFindSet.find(a) == unionFindSet.end())
		unionFindSet[a] = a;
	if (unionFindSet.find(b) == unionFindSet.end())
		unionFindSet[b] = b;
	unionFindSet[find(unionFindSet[a])] = find(unionFindSet[b]);
}

bool company(string a, string b) {
	if (unionFindSet.find(a) == unionFindSet.end() || unionFindSet.find(b) == unionFindSet.end())
		return false;
	return find(unionFindSet[a]) == find(unionFindSet[b]);
}

int main() {
	int N = 0;
	cin >> N;
	for (int i = 0; i < N; i++) {
		int op = 0;
		string a, b;
		cin >> op >> a >> b;
		if (op)
			cout << (company(a, b) ? "yes" : "no") << endl;
		else
			unionset(a, b);
	}

	return 0;
}
```