---
layout: post
title: "hihoCoder#1128 - 二分·二分查找"
date: 2016-05-17 16:01:15 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个数组，求一个数字K在排好序的该数组中哪个位置。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1128)。
<!--more-->
## 解题思路
二分查找。采用类似快排里split的思想，将K插入数组最后一个位置并运行一遍split函数找到K在排好序的该数组中的位置，然后只要检查在K右侧的数字里是否有等于K的数即可。
## 时间复杂度
split函数用时N，检查一遍用时N，整体时间复杂度为2N。
## 代码
```c++
#include <iostream>
using namespace std;

int split(int* array, int start, int end) {
	int i = end;
	int x = array[end];
	for (int j = i - 1; j >= start; j--) {
		if (array[j] >= x) {
			i--;
			int tmp = array[j];
			array[j] = array[i];
			array[i] = tmp;
		}
	}
	array[end] = array[i];
	array[i] = x;

	return i;
}

int find(int* array, int N) {
	int mid = split(array, 0, N);
	for (int i = mid + 1; i <= N; i++)
		if (array[i] == array[mid])
			return mid + 1;

	return -1;
}

int main() {
	int N = 0, K = 0;
	cin >> N >> K;
	int* array = new int[N + 1];
	for (int i = 0; i < N; i++)
		cin >> array[i];
	array[N] = K;

	cout << find(array, N) << endl;

	return 0;
}
```