---
layout: post
title: "hihoCoder#1098 - Kruskal算法"
date: 2016-05-16 20:24:40 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个无向图，求最小生成树。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1098)。
<!--more-->
## 解题思路
经典的Kruskal算法。  
1. 对图中的边以非降序排列；  
2. 对排好序的每条边，如果加入最小生成树不会形成环（采用[Union-Find Set](/blog/2016/05/15/hihocoder-union-set/)实现），则加入最小生成树。
## 时间复杂度
时间复杂度为MlogM。
## 代码
```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge {
	int a = 0;
	int b = 0;
	int length = 0;
};

class FindUnionSet {
private:
	int N;
	int* nodes;

public:
	FindUnionSet(int N) {
		nodes = new int[N + 1];
		for (int i = 1; i <= N; i++)
			nodes[i] = i;
	}

	~FindUnionSet() {
		delete[] nodes;
	}

	int find(int node) {
		if (nodes[node] == node)
			return node;
		nodes[node] = find(nodes[node]);
		return nodes[node];
	}

	void unionset(int a, int b) {
		nodes[find(nodes[a])] = find(nodes[b]);
	}
};

bool edgesCmp(const Edge& a, const Edge& b) {
	return a.length < b.length;
}

int kruskal(vector<Edge> edges, int N, int M) {
	sort(edges.begin(), edges.end(), edgesCmp);
	FindUnionSet set = FindUnionSet(N);
	int minCost = 0;
	int i = 0;
	int k = 0;
	while (i < N - 1) {
		if (set.find(edges[k].a) != set.find(edges[k].b)) {
			set.unionset(edges[k].a, edges[k].b);
			minCost += edges[k].length;
			i++;
		}
		k++;
	}

	return minCost;
}

int main() {
	int N = 0, M = 0;
	cin >> N >> M;
	vector<Edge> edges = vector<Edge>(M);
	for (int i = 0; i < M; i++) {
		int a = 0, b = 0, edge = 0;
		cin >> a >> b >> edge;
		edges[i].a = a;
		edges[i].b = b;
		edges[i].length = edge;
	}

	cout << kruskal(edges, N, M) << endl;

	return 0;
}
```