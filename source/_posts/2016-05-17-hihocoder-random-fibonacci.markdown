---
layout: post
title: "hihoCoder#1164 - 随机斐波那契"
date: 2016-05-17 18:35:29 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
考虑如下生成的斐波那契数列:  
`a[0] = 1, a[i] = a[j] + a[k], i > 0, j, k从[0, i-1]的整数中随机选出（j和k独立）`  
现在给定n，要求求出E(a<sub>n</sub>)，即各种可能的a数列中a<sub>n</sub>的期望值。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1164)。
<!--more-->
## 解题思路
本题其实很简单。考虑期望的定义，可以得到递推式：  
`f[i] = 1/i * sum(f[0], f[1], ..., f[i-1] + 1/i * sum(f[0], f[1], ..., f[i-1]`
## 时间复杂度
时间复杂度为N，空间复杂度为1。
## 代码
```c++
#include <iostream>
using namespace std;

float randomFib(int n) {
	float sum = 1;
	float fib = 0;
	for (int i = 1; i <= n; i++) {
		fib = 2 * sum / i;
		sum += fib;
	}

	return fib;
}

int main() {
	int n = 0;
	cin >> n;

	cout << randomFib(n) << endl;

	return 0;
}
```