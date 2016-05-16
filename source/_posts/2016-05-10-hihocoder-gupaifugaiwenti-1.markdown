---
layout: post
title: "hihoCoder#1143 - 骨牌覆盖问题·一"
date: 2016-05-10 15:44:00 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
一个2\*N的棋盘，用1\*2的骨牌进行覆盖，一共有多少种不同的覆盖方法。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1143)。
<!--more-->
## 解题思路
动态规划，F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>。即斐波那契数列。
## 时间复杂度
时间复杂度为N（可以用快速幂算法缩减到logN），空间复杂度为1。
## 代码
```c++
#include <iostream>
using namespace std;

int fib(int N) {
	int f0 = 0, f1 = 1;
	for (int i = 0; i < N; i++) {
		int tmp = f1;
		f1 = (f0 + f1) % 19999997;
		f0 = tmp;
	}

	return f1;
}

int main() {
	int N = 0;
	cin >> N;

	cout << fib(N) << endl;

	return 0;
}
```