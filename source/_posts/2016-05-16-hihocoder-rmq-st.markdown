---
layout: post
title: "hihoCoder#1068 - RMQ-ST算法"
date: 2016-05-16 15:21:26 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定N个数字，标号为从1到N，有Q次询问，每次求一个区间[L, R]里最小的数字。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1068)。
<!--more-->
## 解题思路
直接暴力搜索的话时间复杂度是NQ，对N和Q都很大的情况不适用。RMQ-ST算法的核心思想是对数据进行预处理，对每一个位置i，预先计算所有[i, 2<sup>j</sup>]（0<=j<=logN+1）的最小值，那么对任一个询问[L, R]，答案就是min([L, T], [R-T+1, T])（T为小于[L, R]区间长度的最大的2的整数次幂）。  
而对每一个位置i计算[i, 2<sup>j</sup>]的过程可以采用动态规划。递推式为：
`m[i, j] = min(m[i, j-1], m[i+2^(j-1), j-1])`
## 时间复杂度
每次询问用时1，预处理时，对每个位置都要进行计算，计算耗时logN，时间复杂度恰为NlogN。因此整体时间复杂度为NlogN + Q。
## 代码
```c++
#include <stdio.h>
#include <stdlib.h>
#include <algorithm>
using namespace std;

const int MAX_SIZE = 1000001;

int M[MAX_SIZE][32] = { {0} };
void rmqSt(int* W, int N) {
	int p = -1;
	int n = N;
	while (n > 0) {
		n >>= 1;
		p++;
	}
	for (int i = 1; i <= N; i++)
		M[i][0] = W[i];
	for (int i = 1; i <= p; i++)
		for (int j = 1; j <= N; j++) {
			if (j + (1 << i - 1) <= N)
				M[j][i] = min(M[j][i - 1], M[j + (1 << i - 1)][i - 1]);
			else
				M[j][i] = M[j][i - 1];
		}
}

int find(int L, int R) {
	int p = -1;
	int l = R - L + 1;
	while (l > 0) {
		l >>= 1;
		p++;
	}
	return min(M[L][p], M[R - (1 << p) + 1][p]);
}

int main() {
	int N = 0, Q = 0;
	scanf_s("%d", &N);
	int* W = new int[N + 1];
	for (int i = 1; i <= N; i++)
		scanf_s("%d", W + i);

	rmqSt(W, N);

	scanf_s("%d", &Q);
	for (int i = 1; i <= Q; i++) {
		int l = 0, r = 0;
		scanf_s("%d", &l);
		scanf_s("%d", &r);
		printf("%d\n", find(l, r));
	}

	return 0;
}
```