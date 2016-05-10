---
layout: post
title: "hihoCoder#1138 - Islands Travel"
date: 2016-05-10 15:13:21 +0800
comments: true
categories: 算法
---

## 题目
给定N个节点，坐标分别为(X<sub>1</sub>, Y<sub>1</sub>),...(X<sub>N</sub>, Y<sub>N</sub>)，任意两点之间的距离定义为min{|X<sub>i</sub> - X<sub>j</sub>|, |Y<sub>i</sub>| - Y<sub>j</sub>}，求X<sub>1</sub>到X<sub>N</sub>的最短距离。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1138)。
<!--more-->
## 解题思路
本题如果采用暴力解法，直接计算出所有点对距离然后采用Dijkstra或者SPFA是不行的，因为这是一个完全图，光是计算所有点对间的距离时间复杂度就已经是N<sup>2</sup>了。因此需要优化Dijkstra算法的输入数据。采用数学知识进行分析，可以发现对任意一个点，我们只需要考虑x轴上一左一右离它最近的两个点，以及y轴上一上一下离它最近的两个点。这样一来边数就从N<sup>2</sup>减到了4N，采用堆实现的Dijkstra即可。
## 时间复杂度
堆实现的Dijkstra的时间复杂度为MlogN，其中M = 4N，所以时间复杂度为NlogN。
## 代码
```c++
#include <iostream>
#include <vector>
#include <queue>
#include <bitset>
#include <algorithm>
#include <cmath>
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
	bitset<100001> set;
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

struct Point {
	int id = 0;
	int x = 0;
	int y = 0;
	Point(int i, int xv, int yv) {
		id = i;
		x = xv;
		y = yv;
	}
};

bool xComp(const Point &a, const Point &b) {
	return a.x < b.x;
}

bool yComp(const Point &a, const Point &b) {
	return a.y < b.y;
}

int main() {
	int N = 0;
	cin >> N;
	vector<Point> coord;
	for (int i = 1; i < N + 1; i++) {
		int x = 0, y = 0;
		cin >> x >> y;
		coord.push_back(Point(i, x, y));
	}
	Node* graph = new Node[N + 1];
	for (int i = 0; i < N + 1; i++)
		graph[i].id = i;
	sort(coord.begin(), coord.end(), xComp);
	for (int i = 0; i < N - 1; i++) {
		int a = coord[i].id;
		int b = coord[i + 1].id;
		int edge = min(abs(coord[i].x - coord[i + 1].x), abs(coord[i].y - coord[i + 1].y));
		graph[a].neighbors.push_back(b);
		graph[a].edges.push_back(edge);
		graph[b].neighbors.push_back(a);
		graph[b].edges.push_back(edge);
	}
	sort(coord.begin(), coord.end(), yComp);
	for (int i = 0; i < N - 1; i++) {
		int a = coord[i].id;
		int b = coord[i + 1].id;
		int edge = min(abs(coord[i].x - coord[i + 1].x), abs(coord[i].y - coord[i + 1].y));
		graph[a].neighbors.push_back(b);
		graph[a].edges.push_back(edge);
		graph[b].neighbors.push_back(a);
		graph[b].edges.push_back(edge);
	}

	cout << dijkstra(graph, N, 1, N) << endl;

	return 0;
}
```
## 问题
1. 上述代码堆的实现直接使用了C++ STL里的`priority_queue`，它的数据类型不能是指针。
2. 每次`priority_queue`进队时都会调用`Node`结构体的复制构造器，在`Node`结构体复杂的时候很耗时，应尽量降低`Node`结构体的复杂度。