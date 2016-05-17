---
layout: post
title: "hihoCoder#1105 - 题外话·堆"
date: 2016-05-17 12:27:54 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
在许多算法中需要支持下面两种运算的数据结构：插入元素和寻找最大值（最小值）元素。支持这两种运算的数据结构称为优先队列。优先队列的有效实现是采用一种称为堆的简单数据结构。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1105)。
<!--more-->
## 解题思路
经典数据结构堆的实现。为方便处理，存储元素的数组下标从1开始。
## 时间复杂度
插入、删除操作均为logN。
## 代码
```c++
#include <iostream>
#include <vector>
using namespace std;

class Heap {
private:
	vector<int> data;
	int N;

	void swap(int i, int j) {
		int tmp = data[i];
		data[i] = data[j];
		data[j] = tmp;
	} 

	void siftUp(int i) {
		while (i >> 1 > 0) {
			if (data[i >> 1] < data[i])
				swap(i >> 1, i);
			else
				break;
			i >>= 1;
		}
	}

	void siftDown(int i) {
		while (i << 1 <= N) {
			if ((i << 1) + 1 <= N && data[(i << 1) + 1] > data[i << 1])
				i = (i << 1) + 1;
			else
				i = i << 1;
			if (data[i] > data[i >> 1])
				swap(i, i >> 1);
			else
				break;
		}
	}

public:
	Heap() {
		data.push_back(0);
		N = 0;
	}

	void insert(int d) {
		N++;
		if (data.size() < N + 1)
			data.push_back(d);
		else
			data[N] = d;
		siftUp(N);
	}

	int deleteMax() {
		swap(1, N);
		int maxD = data[N];
		N--;
		siftDown(1);
		return maxD;
	}
};

int main() {
	int N = 0;
	cin >> N;
	Heap heap;
	for (int i = 0; i < N; i++) {
		char c;
		int d;
		cin >> c;
		if (c == 'A') {
			cin >> d;
			heap.insert(d);
		}
		else if (c == 'T')
			cout << heap.deleteMax() << endl;
	}

	return 0;
}
```