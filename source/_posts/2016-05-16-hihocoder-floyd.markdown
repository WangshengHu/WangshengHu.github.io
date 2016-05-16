---
layout: post
title: "hihoCoder#1089 - Floyd算法"
date: 2016-05-16 18:55:10 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个无向图，两个顶点之间可能有多条边，求任意两个顶点之间的最短路径。    
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1089)。
<!--more-->
## 解题思路
经典的Floyd算法。采用动态规划的思想，假设d[i, j]是从i到j的距离，且路径允许经过的节点数慢慢增加。写成递推式就是  
`d[i, j] = min(d[i, j], d[i, k] + d[k, j])`
## 时间复杂度
时间复杂度为N<sup>3</sup>，空间复杂度为N<sup>2</sup>。
## 代码
```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void floyd(int** graph, int N) {
	for (int k = 1; k <= N; k++) {
		for (int i = 1; i <= N; i++)
			for (int j = 1; j <= N; j++) {
				if (graph[i][k] != -1 && graph[k][j] != -1) {
					if (graph[i][j] == -1)
						graph[i][j] = graph[i][k] + graph[k][j];
					else
						graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j]);
				}
			}
	}
}

int main() {
	int N = 0, M = 0;
	cin >> N >> M;
	int** graph = new int*[N + 1];
	for (int i = 1; i < N + 1; i++) {
		graph[i] = new int[N + 1];
		for (int j = 1; j < N + 1; j++)
			graph[i][j] = -1;
		graph[i][i] = 0;
	}
	for (int i = 0; i < M; i++) {
		int a = 0, b = 0, edge = 0;
		cin >> a >> b >> edge;
		if (graph[a][b] == -1) {
			graph[a][b] = edge;
			graph[b][a] = edge;
		}
		else if (graph[a][b] > edge) {
			graph[a][b] = edge;
			graph[b][a] = edge;
		}
	}

	floyd(graph, N);
	for (int i = 1; i <= N; i++) {
		for (int j = 1; j <= N; j++)
			cout << graph[i][j] << " ";
		cout << endl;
	}

	for (int i = 1; i < N + 1; i++)
		delete[] graph[i];
	delete[] graph;

	return 0;
}
```