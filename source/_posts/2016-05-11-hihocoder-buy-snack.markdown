---
layout: post
title: "hihoCoder#1272 - 买零食"
date: 2016-05-11 12:23:11 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
小卖部中有许多种零食，每种零食都有渴望度，且价格小数部分仅可能为0.5或0。一次只能买三包以内的零食，且价格必须是5的整数倍，求能买到的最大渴望度。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1272)。
<!--more-->
## 解题思路
动态规划。递推式：S[i,j,k] = max(S[i-1,j-1,k-m] + s[i], S[i-1,j,k])，其中i代表零食编号，j代表购买数量，k代表总价格乘2模10。m代表s[i]\*2 mod 10。
## 时间复杂度
时间复杂度为4\*10\*N，空间复杂度为4\*10\*N，空间复杂度可优化成4\*10\*2，更进一步可优化成4\*10\*1（考虑到递推关系中每次变化仅相差1）。
## 代码
```c++
#include <iostream>
#include <algorithm>
using namespace std;

int mod(float p) {
	return (int) (p * 2) % 10;
}

int maxSat(float *A, int *B, int N) {
	int ***S = new int**[N];
	for (int i = 0; i < N; i++) {
		S[i] = new int*[4];
		for (int j = 0; j < 4; j++) {
			S[i][j] = new int[10];
			for (int k = 0; k < 10; k++)
				S[i][j][k] = -1;
			S[i][0][0] = 0;
		}
	}

	S[0][1][mod(A[0])] = B[0];
	for (int i = 1; i < N; i++) {
		for (int j = 1; j < 4; j++) {
			for (int k = 0; k < 10; k++) {
				int m = (k - mod(A[i]) + 10) % 10;
				if (S[i - 1][j - 1][m] != -1)
					S[i][j][k] = S[i - 1][j - 1][m] + B[i];
				if (S[i - 1][j][k] != -1)
					S[i][j][k] = max(S[i][j][k], S[i - 1][j][k]);
			}
		}
	}

	int maxS = 0;
	for (int i = 0; i < 4; i++)
		maxS = max(maxS, S[N - 1][i][0]);

	for (int i = 1; i < N; i++) {
		for (int j = 1; j < 4; j++)
			delete[] S[i][j];
		delete[] S[i];
	}
	delete[] S;

	return maxS;
}

int main() {
	int Q = 0;
	cin >> Q;
	for (int i = 0; i < Q; i++) {
		int N = 0;
		cin >> N;
		float *A = new float[N];
		int *B = new int[N];
		for (int j = 0; j < N; j++)
			cin >> A[j] >> B[j];

		cout << maxSat(A, B, N) << endl;

		delete[] A, B;
	}

	return 0;
}
```