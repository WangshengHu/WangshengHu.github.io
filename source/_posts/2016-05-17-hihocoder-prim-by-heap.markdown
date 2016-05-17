---
layout: post
title: "hihoCoder#1109 - 最小生成树三·堆优化的Prim算法"
date: 2016-05-17 12:41:05 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个无向图，求最小生成树。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1109)。
<!--more-->
## 解题思路
这是采用堆实现的Prim算法（与[Dijkstra算法](/blog/2016/05/16/hihocoder-dijkstra/)十分相似）。[这里](/blog/2016/05/16/hihocoder-prim/)是Prim算法朴素的实现。
## 时间复杂度
时间复杂度为MlogN。
## 代码
```c++
#include <iostream>
#include <vector>
#include <queue>
#include <bitset>
using namespace std;

struct HeapNode {
	int id = -1;
	int d = -1;
	HeapNode(int i, int di) {
		id = i;
		d = di;
	}
};

struct Node {
	int id = -1;
	int d = -1;
	vector<int> neighbors;
	vector<int> edges;
};

struct NodeCmp {
	bool operator()(const HeapNode& a, const HeapNode& b) const {
		return a.d > b.d;
	}
};

int prim(Node* graph, int N) {
	bitset<100001> set;
	set.reset();
	priority_queue<HeapNode, vector<HeapNode>, NodeCmp> heap;
	graph[1].d = 0;
	set[1] = 1;
	for (int i = 0; i < graph[1].neighbors.size(); i++) {
		graph[graph[1].neighbors[i]].d = graph[1].edges[i];
		heap.push(HeapNode(graph[1].neighbors[i], graph[graph[1].neighbors[i]].d));
	}

	int minCost = 0;
	int i = 0;
	while (i < N - 1) {
		HeapNode shortestNode = heap.top();
		heap.pop();
		if (set[shortestNode.id])
			continue;
		i++;
		set[shortestNode.id] = 1;
		minCost += shortestNode.d;
		for (int j = 0; j < graph[shortestNode.id].neighbors.size(); j++) {
			if (set[graph[shortestNode.id].neighbors[j]])
				continue;
			if (graph[graph[shortestNode.id].neighbors[j]].d == -1 || graph[shortestNode.id].edges[j] < graph[graph[shortestNode.id].neighbors[j]].d)
				graph[graph[shortestNode.id].neighbors[j]].d = graph[shortestNode.id].edges[j];
			heap.push(HeapNode(graph[graph[shortestNode.id].neighbors[j]].id, graph[graph[shortestNode.id].neighbors[j]].d));
		}
	}

	return minCost;
}

int main() {
	int N = 0, M = 0;
	cin >> N >> M;
	Node* graph = new Node[N + 1];
	for (int i = 1; i < N + 1; i++)
		graph[i].id = i;
	for (int i = 1; i < M + 1; i++) {
		int a = 0, b = 0, edge = 0;
		cin >> a >> b >> edge;
		graph[a].neighbors.push_back(b);
		graph[a].edges.push_back(edge);
		graph[b].neighbors.push_back(a);
		graph[b].edges.push_back(edge);
	}

	cout << prim(graph, N) << endl;

	delete[] graph;

	return 0;
}
```