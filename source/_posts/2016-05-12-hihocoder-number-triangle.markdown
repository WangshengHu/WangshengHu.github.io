---
layout: post
title: "hihoCoder#1037 - 数字三角形"
date: 2016-05-12 17:32:59 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
一个三角形的n层迷宫，第i层有i个格子，每个格子里有一些礼品，第i层编号为j的格子可以通向第i+1层编号为j、j+1的格子。通道是单向的。求问从第1层第一个格子开始，一直走到迷宫最高层，最多能获得多少礼品。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1037)。
<!--more-->
## 解题思路
很简单的动态规划。递推式：  
`f[i+1, j] = max(f[i, j-1], f[i, j]) + V[i+1, j]`  
## 时间复杂度
时间复杂度为N<sup>2</sup>，空间复杂度为1（因为输入数据的矩阵维度与需要计算的一致）。
## 代码
```c++
#include <iostream>
#include <algorithm>
using namespace std;

int maxA(int** A, int n) {
	for (int i = 1; i < n; i++) {
		A[i][0] = A[i - 1][0] + A[i][0];
		for (int j = 1; j <= i; j++)
			A[i][j] = max(A[i - 1][j - 1], A[i - 1][j]) + A[i][j];
	}

	int maxV = 0;
	for (int i = 0; i < n; i++)
		maxV = max(maxV, A[n - 1][i]);

	return maxV;
}

int main() {
	int n = 0;
	cin >> n;
	int** A = new int*[n];
	for (int i = 0; i < n; i++)
		A[i] = new int[n];
	for (int i = 0; i < n; i++)
		for (int j = 0; j <= i; j++)
			cin >> A[i][j];

	cout << maxA(A, n) << endl;

	return 0;
}
```