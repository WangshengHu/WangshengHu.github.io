---
layout: post
title: "hihoCoder#1044 - 状态压缩"
date: 2016-05-13 10:40:45 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
有连续的N个位置，编号为1...N，第i个位置有W<sub>i</sub>件物品。从某些位置收集物品，而连续的M个位置中不能有超过Q个位置的物品被收集。问最多能收集到的物品数量。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1044)。
<!--more-->
## 解题思路
动态规划。首先考虑如何列状态转移方程。  
首先计算第i个位置时需要考虑前M-1个位置是否已经取满Q个，来决定是否可以取第i个。如果单纯记录前M-1个位置里已取位置数，由于从i到i+1这个前M-1个位置也向前推进了1，我们无法决定第i+1个是否可取，递推式将无法向前推进。因此必须记录下前M-1个位置的状态。递推式为：  
`f[i, 0, p[1], p[2], ..., p[M-2]] = f[i-1, p[1], p[2], ..., p[M-1]] sum(p[j]) >= Q`  
`f[i, 1, p[1], p[2], ..., p[M-2]] = f[i-1, p[1], p[2], ..., p[M-1]] sum(p[j]) < Q`  
但是这样用来存储状态的数组维度太高，考虑用二进制数表示不同状态，则递推式改进为：  
`f[i, s/2] = f[i-1, s] sum(s在二进制下的各位数字) >= Q`  
`f[i, s/2 + 2<sup>M-2</sup>] = f[i-1, s] + W[i] sum(s在二进制下的各位数字) < Q`  
## 时间复杂度
时间复杂度为2<sup>M</sup>N。
## 代码
```c++
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

int calMax(int *W, int N, int M, int Q) {
	int states = 1 << (M - 1);
	vector<vector<int>> sum(N, vector<int>(states, -1));
	sum[0][0] = 0;
	sum[0][1 << (M - 2)] = W[0];

	for (int i = 1; i < N; i++) {
		for (int j = 0; j < states; j++) {
			if (sum[i - 1][j] != -1) {
				int s = 0;
				int t = j;
				for (int k = 0; k < M - 1; k++) {
					s += t & 1;
					t >>= 1;
				}
				if (s < Q)
					sum[i][(j >> 1) + (1 << (M - 2))] = max(sum[i - 1][j] + W[i], sum[i][(j >> 1) + (1 << (M - 2))]);
				sum[i][j >> 1] = max(sum[i - 1][j], sum[i][j >> 1]);
			}
		}
	}

	int maxSum = 0;
	for (int i = 0; i < states; i++)
		if (sum[N - 1][i] > maxSum)
			maxSum = sum[N - 1][i];

	return maxSum;
}

int main() {
	int N = 0, M = 0, Q = 0;
	cin >> N >> M >> Q;
	int *W = new int[N];
	for (int i = 0; i < N; i++)
		cin >> W[i];

	cout << calMax(W, N, M, Q);
	
	delete[] W;

	return 0;
}
```