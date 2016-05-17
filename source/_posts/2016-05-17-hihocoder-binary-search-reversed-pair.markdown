---
layout: post
title: "hihoCoder#1141 - 二分·归并排序之逆序对"
date: 2016-05-17 17:26:02 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个数组，求该数组中逆序对的个数。如果两个元素a，b满足a在b的前面，但a > b，则(a, b)是一个逆序对。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1141)。
<!--more-->
## 解题思路
采用Merge Sort的思想，考察在一次merge的过程中，可以直接将参与merge的两个数组之间的逆序对统计出来（即merge进行中每次插入左边数组的一个元素时，所有已插入的右边数组的元素都与其构成一个逆序对）。
## 时间复杂度
时间复杂度为NlogN。
## 代码
```c++
#include <iostream>
using namespace std;

long long merge(int* A, int start, int end, int mid) {
	long long pairs = 0;
	int* B = new int[end - start + 1];
	int i = start, j = mid + 1, k = 0;
	while (i <= mid && j <= end) {
		if (A[i] <= A[j]) {
			B[k++] = A[i++];
			pairs += j - mid - 1;
		}
		else
			B[k++] = A[j++];
	}

	while (i <= mid) {
		B[k++] = A[i++];
		pairs += end - mid;
	}
	while (j <= end)
		B[k++] = A[j++];

	for (i = start; i <= end; i++)
		A[i] = B[i - start];

	return pairs;
}

long long sort(int* A, int start, int end) {
	if (start == end)
		return 0;

	int mid = (end - start) / 2 + start;
	long long left = sort(A, start, mid);
	long long right = sort(A, mid + 1, end);
	long long pairs = merge(A, start, end, mid);
	return pairs + left + right;
}

int main() {
	int N = 0;
	cin >> N;
	int* A = new int[N];
	for (int i = 0; i < N; i++)
		cin >> A[i];

	cout << sort(A, 0, N - 1) << endl;

	delete[] A;

	return 0;
}
```