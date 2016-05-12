---
layout: post
title: "hihoCoder#1175 - 拓扑排序·二"
date: 2016-05-10 17:45:11 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个有向无环图，在任意个节点上投放“病毒”，“病毒”会沿着有向边传播。计算最终该图中总共有多少“病毒”。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1175)。
<!--more-->
## 解题思路
因为是有向无环图，可以找到一个“起始点”，该点入度为0。从该点出发进行广度优先搜索，该点处理完后可以直接从图中移除。依次重复此操作。
## 时间复杂度
每个节点入队一次，每条边遍历依次，时间复杂度为N + M。
## 代码
```c++
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Vertex {
	int sum = 0;
	int degree = 0;
	vector<int> neighbors;
};

int calSum(vector<Vertex> A) {
	queue<int> queue;

	for (int i = 0; i < A.size(); i++)
		if (A[i].degree == 0)
			queue.push(i);

	int sum = 0;
	do {
		int root = queue.front();
		queue.pop();
		int curSum = A[root].sum;
		sum += curSum % 142857;
		sum %= 142857;
		vector<int> &neighbors = A[root].neighbors;
		for (int i = 0; i < neighbors.size(); i++) {
			A[neighbors[i]].sum += curSum;
			A[neighbors[i]].sum %= 142857;
			A[neighbors[i]].degree--;
			if (A[neighbors[i]].degree == 0)
				queue.push(neighbors[i]);
		}
	} while (!queue.empty());

	return sum;
}

int main() {
	int N = 0, M = 0, K = 0;
	cin >> N >> M >> K;
	vector<Vertex> A = vector<Vertex>(N);
	for (int i = 0; i < K; i++) {
		int a = 0;
		cin >> a;
		A[a - 1].sum++;
	}
	for (int i = 0; i < M; i++) {
		int a = 0, b = 0;
		cin >> a >> b;
		A[a - 1].neighbors.push_back(b - 1);
		A[b - 1].degree++;
	}

	cout << calSum(A);

	return 0;
}
```