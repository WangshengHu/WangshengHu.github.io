---
layout: post
title: "hihoCoder#1223 - 不等式"
date: 2016-05-10 19:37:28 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定n个关于X的不等式，最多有多少个成立。不等式形如X < C，X <= C，X = C， X > C, X >= C。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1223)。
<!--more-->
## 解题思路
想像在一个数轴上从左到右扫描，对任意不等式X < C，在C左边时其成立，到C时其不成立；对X <= C， 过了C其不成立；对X = C，到C成立，过C不成立；对X > C，过了C成立；对X >= C，到C成立。因此对任意一个C，我们采用两个标记`intOp`和`decOp`，`intOp`表示扫描到C点的执行操作，`decOP`表示扫描过C点的执行操作。  
起始时我们统计所有<及<=关系，并将其设为初始可满足不等式数；然后按C的递增序遍历所有不等式，并分别就到达C点及走过C点执行相应操作，计算当前可满足不等式数；最后统计最大可满足数。
## 时间复杂度
由于遍历一遍所有不等式，时间复杂度为N。需要注意我们要对输入不等式进行排序，因此时间复杂度为NlogN（实际实现中采用了C++ STL的map，自动排序）。
## 代码
```c++
#include <iostream>
#include <map>
#include <string>
#include <algorithm>
using namespace std;

struct Number {
	int intOp = 0;
	int decOp = 0;

	Number(int eq, int ineq) {
		intOp = eq;
		decOp = ineq;
	}
};

int calMax(map<int, Number> numbers, int init) {
	int maxVal = init;
	int curVal = init;
	for (auto it = numbers.begin(); it != numbers.end(); it++) {
		curVal += it->second.intOp;
		maxVal = max(maxVal, curVal);
		curVal += it->second.decOp;
		maxVal = max(maxVal, curVal);
	}

	return maxVal;
}

bool process(string op, int c, map<int, Number> &numbers) {
	bool less = false;
	int intOp = 0, decOp = 0;
	if (op == "<") {
		intOp = -1;
		less = true;
	}
	else if (op == "<=") {
		decOp = -1; 
		less = true;
	}
	else if (op == "=") {
		intOp = 1;
		decOp = -1;
	}
	else if (op == ">=")
		intOp = 1;
	else if (op == ">")
		decOp = 1;

	if (numbers.find(c) != numbers.end()) {
		numbers.find(c)->second.intOp += intOp;
		numbers.find(c)->second.decOp += decOp;
	}
	else
		numbers.insert(make_pair(c, Number(intOp, decOp)));

	return less;
}

int main() {
	int N = 0;
	cin >> N;
	map<int, Number> numbers;
	int init = 0;
	for (int i = 0; i < N; i++) {
		char x;
		string op;
		int c;
		cin >> x >> op >> c;
		init += process(op, c, numbers)? 1 : 0;
	}

	cout << calMax(numbers, init) << endl;

	return 0;
}
```