---
layout: post
title: "hihoCoder#1097 - Prim算法"
date: 2016-05-16 19:46:33 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个无向图，求最小生成树。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1097)。
<!--more-->
## 解题思路
经典的Prim算法。  
1. 初始化集合X和Y，X = {1}, Y = V - {1}；  
2. 查找最短的一条边(x, y)，其中x属于X，y属于Y，并将其加入最小生成树。
## 时间复杂度
时间复杂度为N<sup>2</sup>。采用堆实现的话可以减小到MlogN。
## 代码
```c++
#include <iostream>
#include <algorithm>
#include <bitset>
using namespace std;

int prim(int** graph, int N) {
	bitset<1000> set;
	set.reset();
	int* d = new int[N];
	for (int i = 0; i < N; i++)
		d[i] = graph[0][i];
	set[0] = 1;
	int minCost = 0;
	for (int i = 1; i < N; i++) {
		int minNode = 0;
		int minEdge = -1;
		for (int j = 0; j < N; j++) {
			if (set[j])
				continue;
			if (minEdge == -1 || (d[j] !=-1 && minEdge > d[j])) {
				minEdge = d[j];
				minNode = j;
			}
		}
		minCost += minEdge;
		set[minNode] = 1;
		for (int j = 0; j < N; j++) {
			if (set[j])
				continue;
			if (d[j] == -1 || d[j] > graph[minNode][j]) {
				d[j] = graph[minNode][j];
			}
		}
	}

	return minCost;
}

int main() {
	int N = 0;
	cin >> N;
	int** graph = new int*[N];
	for (int i = 0; i < N; i++) {
		graph[i] = new int[N];
		for (int j = 0; j < N; j++) {
			int edge = 0;
			cin >> edge;
			graph[i][j] = edge;
		}
	}

	cout << prim(graph, N) << endl;

	return 0;
}
```