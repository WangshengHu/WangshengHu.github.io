---
layout: post
title: "hihoCoder#1133 - 二分·二分查找之k小数"
date: 2016-05-17 16:13:20 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个数组，求排好序的该数组中第k小的数。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1133)。
<!--more-->
## 解题思路
二分查找。采用类似快排里split的思想，每次计算数组第一个元素在排好序的该数组中的位置，并且判断该位置与k的大小关系，进行二分。
## 时间复杂度
类似快排，平均情况下时间复杂度为NlogN。最坏情况是N<sup>2</sup>。
## 代码
```c++
#include <iostream>
using namespace std;

int split(int* array, int start, int end) {
	int i = start;
	int x = array[start];
	for (int j = i + 1; j <= end; j++) {
		if (array[j] < x) {
			i++;
			int tmp = array[i];
			array[i] = array[j];
			array[j] = tmp;
		}
	}
	array[start] = array[i];
	array[i] = x;

	return i;
}

int search(int* array, int start, int end, int k) {
	int mid = split(array, start, end);
	if (k == mid)
		return array[mid];
	else if (k < mid)
		return search(array, start, mid - 1, k);
	else
		return search(array, mid + 1, end, k);
}

int find(int* array, int N, int k) {
	if (k > N)
		return -1;

	return search(array, 0, N - 1, k - 1);
}

int main() {
	int N = 0, k = 0;
	cin >> N >> k;
	int* array = new int[N];
	for (int i = 0; i < N; i++)
		cin >> array[i];

	cout << find(array, N, k) << endl;

	return 0;
}
```