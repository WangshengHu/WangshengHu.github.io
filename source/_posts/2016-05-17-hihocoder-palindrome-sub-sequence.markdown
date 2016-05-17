---
layout: post
title: "hihoCoder#1149 - 回文字符序列"
date: 2016-05-17 18:18:05 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定字符串，求它的回文子序列个数。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1149)。
<!--more-->
## 解题思路
本题与求最长回文子序列很类似，只要在算法上稍作修改即可。  
仍然采用动态规划的思想。在求f[i, j]时，注意到包含第i个字符且不包含第j个字符的回文子序列个数为f[i, j-1] - f[i+1, j-1]，包含第j个字符且不包含第i个字符的回文子序列个数为f[i+1, j] - f[i+1, j-1]，均不包含则是f[i+1, j-1]，均包含则是f[i+1, j-1] + 1。因此列出递推式：  
`f[i, j] = f[i, j-1] + f[i+1, j] - f[i+1, j-1]  如果str[i] != str[j]`  
`f[i, j] = f[i, j-1] + f[i+1, j] + 1  如果str[i] == str[j]`  
**注意，凡是涉及到动态规划的问题最好都要画出递推进行的矩阵，弄明白起始点和结束点，以及递推方向。**
## 时间复杂度
时间复杂度为N<sup>2</sup>，空间复杂度为N<sup>2</sup>，可进一步优化为2N。
## 代码
```c++
#include <iostream>
#include <string>
using namespace std;

int calSum(string str) {
	int N = str.size();
	int** S = new int*[N];
	for (int i = 0; i < N; i++) {
		S[i] = new int[N];
		for (int j = 0; j < N; j++)
			S[i][j] = 0;
		S[i][i] = 1;
	}
	for (int i = N - 2; i >= 0; i--) {
		for (int j = i + 1; j < N; j++) {
			S[i][j] = (S[i + 1][j] + S[i][j - 1] - S[i + 1][j - 1]);
			if (str[i] == str[j])
				S[i][j] += S[i + 1][j - 1] + 1;
			S[i][j] = (S[i][j] + 100007) % 100007;
		}
	}

	return S[0][N - 1];
}

int main() {
	int T = 0;
	cin >> T;
	for (int i = 1; i <= T; i++) {
		string str;
		cin >> str;

		cout << "Case #" << i << ": " << calSum(str) << endl;
	}

	return 0;
}
```