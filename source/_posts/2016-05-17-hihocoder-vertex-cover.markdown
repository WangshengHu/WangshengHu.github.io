---
layout: post
title: "hihoCoder#1127 - 二分图三·二分图最小点覆盖和最大独立集"
date: 2016-05-17 13:48:13 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
顶点覆盖是一些顶点（或边）的集合，使得图中的每一条边（每一个顶点）都至少接触集合中的一个顶点（边）。  
独立集是指图中两两互不相邻的顶点构成的集合。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1127)。
<!--more-->
## 解题思路
**König定理** 一个二分图中的最大匹配数等于这个图中的最小点覆盖数。  
一个图的最小点覆盖数 = V - 最大独立集  
**匈牙利算法** 求解二分图最大匹配问题。  
**核心思想** 从二分图中找出一条路径来，让路径的起点和终点都是还没有匹配过的点，并且路径经过的连线是一条没被匹配、一条已经匹配过，再下一条又没匹配这样交替地出现。找到这样的路径后，显然路径里没被匹配的连线比已经匹配了的连线多一条，于是修改匹配图，把路径里所有匹配过的连线去掉匹配关系，把没有匹配的连线变成匹配的，这样匹配数就比原来多1个。（摘自[二分图最大匹配问题匈牙利算法](http://www.matrix67.com/blog/archives/39)）
## 时间复杂度
最坏情况下，每次新增一个顶点时每条边都要检查一次，时间复杂度为MN。
## 代码
```c++
#include <iostream>
#include <vector>
#include <queue>
#include <bitset>
using namespace std;

struct Node {
	int color = -1;
	int to = 0;
	vector<int> neighbors;
};

bitset<1001> visited;

bool find(Node* graph, int node) {
	for (int i = 0; i < graph[node].neighbors.size(); i++) {
		if (!visited[graph[node].neighbors[i]]) {
			visited[graph[node].neighbors[i]] = 1;
			if (graph[graph[node].neighbors[i]].to == 0 || find(graph, graph[graph[node].neighbors[i]].to)) {
				graph[graph[node].neighbors[i]].to = node;
				return true;
			}
		}
	}

	return false;
}

void bigraph(Node* graph, int N) {
	int root = 1;
	do {
		graph[root].color = 0;
		queue<int> queue;
		queue.push(root);
		while (!queue.empty()) {
			int cur = queue.front();
			queue.pop();
			for (int i = 0; i < graph[cur].neighbors.size(); i++) {
				if (graph[graph[cur].neighbors[i]].color == -1) {
					graph[graph[cur].neighbors[i]].color = 1 - graph[cur].color;
					queue.push(graph[cur].neighbors[i]);
				}
			}
		}

		root = 0;
		for (int i = 1; i <= N; i++)
			if (graph[i].color == -1) {
				root = i;
				break;
			}
	} while (root > 1);
}

int hungarian(Node* graph, int N) {
	bigraph(graph, N);
	int minVertex = 0;
	for (int i = 1; i <= N; i++) {
		if (graph[i].color) {
			visited.reset();
			minVertex += find(graph, i);
		}
	}

	return minVertex;
}

int main() {
	int N = 0, M = 0;
	cin >> N >> M;
	Node* graph = new Node[N + 1];
	for (int i = 0; i < M; i++) {
		int a = 0, b = 0;
		cin >> a >> b;
		graph[a].neighbors.push_back(b);
		graph[b].neighbors.push_back(a);
	}

	int minV = hungarian(graph, N);
	cout << minV << endl << N - minV << endl;

	delete[] graph;

	return 0;
}
```