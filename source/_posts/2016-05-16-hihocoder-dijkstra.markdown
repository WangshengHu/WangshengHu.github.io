---
layout: post
title: "hihoCoder#1081 - 最短路径·一"
date: 2016-05-16 17:21:52 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个无向图，两个顶点之间可能有多条边，求顶点1到顶点N的最短路径。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1081)。
<!--more-->
## 解题思路
经典Dijkstra算法。  
1. 初始化集合X和Y，X = {1}, Y = V - {1}；  
2. 对顶点1的所有相邻顶点，更新d[i] = 边长；否则d[i] = 无穷大；  
3. 从Y中选取一个d最小的顶点v，将v从Y中删除并加入X，更新所有与v相邻顶点的d。  
注意我在实现时采用了C++ STL的priority_queue结构。由于priority_queue不提供随机访问的功能（即获取其中一个元素的具体位置）这样会导致第3步中每次更新时都要进行一次入队操作。
## 时间复杂度
朴素的实现是N<sup>2</sup>，如果采用堆实现的话可以减小到MlogN。
## 代码
```c++
#include <iostream>
#include <vector>
#include <queue>
#include <bitset>
using namespace std;

struct Node {
	int id = -1;
	int d = -1;
	vector<int> neighbors;
	vector<int> edges;
};

struct NodeCmp {
	bool operator()(const Node &a, const Node &b) const {
		return b.d < a.d;
	}
};

int dijkstra(Node* graph, int N, int s, int t) {
	bitset<1001> set;
	set.reset();
	priority_queue<Node, vector<Node>, NodeCmp> heap;
	graph[s].d = 0;
	set[s] = 1;
	for (int i = 0; i < graph[s].neighbors.size(); i++) {
		graph[graph[s].neighbors[i]].d = graph[s].edges[i];
		heap.push(graph[graph[s].neighbors[i]]);
	}

	int i = 0;
	while (i < N - 1) {
		Node nearestNode = heap.top();
		heap.pop();
		if (set[nearestNode.id])
			continue;
		i++;
		set[nearestNode.id] = 1;
		for (int j = 0; j < nearestNode.neighbors.size(); j++) {
			if (graph[nearestNode.neighbors[j]].d == -1 || nearestNode.edges[j] + nearestNode.d < graph[nearestNode.neighbors[j]].d)
				graph[nearestNode.neighbors[j]].d = nearestNode.edges[j] + nearestNode.d;
			heap.push(graph[nearestNode.neighbors[j]]);
		}
	}

	return graph[t].d;
}

int main() {
	int N = 0, M = 0, S = 0, T = 0;
	cin >> N >> M >> S >> T;
	Node* graph = new Node[N + 1];
	for (int i = 0; i < N + 1; i++)
		graph[i].id = i;
	for (int i = 0; i < M; i++) {
		int a = 0, b = 0, edge = 0;
		cin >> a >> b >> edge;
		graph[a].neighbors.push_back(b);
		graph[a].edges.push_back(edge);
		graph[b].neighbors.push_back(a);
		graph[b].edges.push_back(edge);
	}

	cout << dijkstra(graph, N, S, T) << endl;

	return 0;
}
```