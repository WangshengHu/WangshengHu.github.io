---
layout: post
title: "hihoCoder#1121 - 二分图一·二分图判定"
date: 2016-05-08 14:30:14 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
判定是否存在一个合理的染色方案，使得我们所建立的无向图满足每一条边两端的顶点颜色都不相同。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1121)。
<!--more-->
## 解题思路
广度优先搜素（采用栈实现），首先任选一个未染色节点进行染色，并将其所有邻居节点染不同色，然后对每个邻居节点重复此操作。如果发现某一时刻一个节点与其邻居节点同色，则返回假；否则遍历完所有节点，返回真。
##时间复杂度
由于每个节点入栈一次，每条边检查两次，时间复杂度为N + M。
## 代码
```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Vertex {
	int color = -1;
	vector<int> neighbors;
};

bool check(Vertex *graph, int N) {
	int root = 1;
	do {
		queue<int> visited;
		visited.push(root);
		graph[root].color = 0;
		while (!visited.empty()) {
			int root = visited.front();
			visited.pop();
			vector<int> neighbors = graph[root].neighbors;
			for (int i = 0; i < neighbors.size(); i++) {
				if (graph[neighbors[i]].color == -1) {
					graph[neighbors[i]].color = 1 - graph[root].color;
					visited.push(neighbors[i]);
				}
				else if (graph[neighbors[i]].color == graph[root].color)
					return false;
			}
		}

		root = 0;
		for (int i = 1; i < N + 1; i++)
			if (graph[i].color == -1) {
				root = i;
				break;
			}
	} while (root != 0);

	return true;
}

int main() {
	int T = 0;
	cin >> T;
	for (int i = 0; i < T; i++) {
		int N = 0, M = 0;
		cin >> N >> M;
		Vertex *graph = new Vertex[N + 1];
		for (int j = 0; j < M; j++) {
			int a = 0, b = 0;
			cin >> a >> b;
			graph[a].neighbors.push_back(b);
			graph[b].neighbors.push_back(a);
		}

		cout << (check(graph, N) ? "Correct" : "Wrong") << endl;

		delete[] graph;
	}
	return 0;
}
```