---
layout: post
title: "hihoCoder#1093 - SPFA算法"
date: 2016-05-16 19:12:45 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个无向图，两个顶点之间可能有多条边，求顶点1到顶点N的最短路径。给定的图中边的数量较少。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1093)。
<!--more-->
## 解题思路
SPFA算法，即Shortest Path Faster Algorithm。对图进行广度优先搜索，并且在搜索的过程中实时更新所有顶点到顶点1的最短距离。具体来说，是在一个顶点出队时查看它的所有邻接顶点，并更新它们的最短距离，如果它们不在队列中则入队。
## 时间复杂度
时间复杂度为O(kE)，k是个比较小的系数（并且在绝大多数的图中，k<=2，然而在一些精心构造的图中可能会上升到很高）（摘自[维基百科](https://zh.wikipedia.org/wiki/%E8%B4%9D%E5%B0%94%E6%9B%BC-%E7%A6%8F%E7%89%B9%E7%AE%97%E6%B3%95)）。
## 代码
```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Node {
	int d = -1;
	bool inQueue = false;
	vector<Node*> neighbors;
	vector<int> edges;
};

int spfa(Node* graph, int s, int t) {
	Node* S = graph + s;
	S->d = 0;
	queue<Node*> queue;
	queue.push(S);
	while (!queue.empty()) {
		Node* cur = queue.front();
		cur->inQueue = false;
		queue.pop();
		for (int i = 0; i < cur->neighbors.size(); i++) {
			if (cur->neighbors[i]->d == -1 || cur->neighbors[i]->d > cur->d + cur->edges[i]) {
				cur->neighbors[i]->d = cur->d + cur->edges[i];
				if (!cur->neighbors[i]->inQueue) {
					cur->neighbors[i]->inQueue = true;
					queue.push(cur->neighbors[i]);
				}
			}
		}
	}

	return graph[t].d;
}

int main() {
	int N = 0, M = 0, S = 0, T = 0;
	cin >> N >> M >> S >> T;
	Node* graph = new Node[N + 1];
	for (int i = 0; i < M; i++) {
		int a = 0, b = 0, edge = 0;
		cin >> a >> b >> edge;
		graph[a].neighbors.push_back(graph + b);
		graph[a].edges.push_back(edge);
		graph[b].neighbors.push_back(graph + a);
		graph[b].edges.push_back(edge);
	}

	cout << spfa(graph, S, T) << endl;

	return 0;
}
```