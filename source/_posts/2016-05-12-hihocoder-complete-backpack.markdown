---
layout: post
title: "hihoCoder#1043 - 完全背包"
date: 2016-05-12 21:09:55 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
经典完全背包问题。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1043)。
<!--more-->
## 解题思路
动态规划。递推式为：  
`f[i, j] = max(f[i-1, j-C[i]*k] + V[i]*k)，其中0 <= k <= j/V[i]`  
注意到`f[i, j-V[i]] = max(f[i-1, j-C[i]*k] + V[i]*(k-1))，其中1 <= k <= j/V[i]`，该递推式可进一步简化：  
`f[i, j] = max(f[i, j-V[i]] + V[i], f[i-1, j])`
## 时间复杂度
时间复杂度为MN，空间复杂度为2M，可进一步优化到M。
## 代码
```c++
#include <iostream>
#include <algorithm>
using namespace std;

int maxValue(int* needs, int* values, int N, int M) {
	int** V = new int*[2];
	for (int i = 0; i < 2; i++)
		V[i] = new int[M + 1];

	for (int i = 0; i < M + 1; i++)
		V[0][i] = 0;
	int curLine = 1;
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M + 1; j++) {
			if (needs[i] <= j)
				V[curLine][j] = max(V[curLine][j - needs[i]] + values[i], V[1 - curLine][j]);
			else
				V[curLine][j] = V[1 - curLine][j];
		}
		curLine = 1 - curLine;
	}

	int maxV = V[1 - curLine][M];

	for (int i = 0; i < 2; i++)
		delete[] V[i];
	delete[] V;

	return maxV;
}

int main() {
	int N = 0, M = 0;
	cin >> N >> M;
	int *needs = new int[N], *values = new int[N];
	for (int i = 0; i < N; i++)
		cin >> needs[i] >> values[i];

	cout << maxValue(needs, values, N, M) << endl;

	delete[] needs, values;

	return 0;
}
```
