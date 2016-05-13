---
layout: post
title: "hihoCoder#1055 - 刷油漆"
date: 2016-05-13 16:49:39 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一颗树，其中每个节点都有一个价值V，现将其中包含1号节点的M个连通的节点选出来，问可能的最大价值总和。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1055)。
<!--more-->
## 解题思路
关键在于将问题转化为动态规划。在考虑以t节点为根，选取m个节点的情况时:  
`f[t, m] = max(f[c, m1], f[c+1, m2], ..., f[c+k-1, mk] + v[t]), 其中c, c+1, ..., c+k-1为t节点的子节点，且sum(m1, m2, ..., mk) = m-1`  
此时将c, c+1, ..., c+k-1考虑成排好序的k件物品，背包容量为m-1，那么这就类似于背包问题。用F[c, m]表示从前c个子树里选取了m个节点能取得的最大值，则有如下递推式：  
`F[c, m] = max(F[c-1, m-i] + f[c, i]) 其中0<=i<=m`  
且`f[t, m] = F[c+k-1, m-1] + V[t]`。注意该递推式可优化为：  
`f[t, m] = max(f[t, m-j-1] + f[c+i, j]) + V[t] 其中0<=i<k，0<j<=m-1`。  
这里用到了空间压缩的思想，注意迭代顺序。然后采用后序遍历，自底向上计算所有f[t, m]，最终结果就是f[1, M]的值。
## 时间复杂度
时间复杂度为M<sup>2</sup>N。空间复杂度为MN。
## 代码
```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Node {
	int id = -1;
	int score = 0;
	bool visited = false;
	vector<Node*> successors;
};

class Tree {
private:
	Node* root;
	int** F;
	int N, M;

	void traverseTree(Node* node) {
		node->visited = true;
		for (int i = 0; i < node->successors.size(); i++)
			if (!node->successors[i]->visited)
				traverseTree(node->successors[i]);

		F[node->id][1] = node->score;
		for (int i = 0; i < node->successors.size(); i++) {
			if (!node->successors[i]->visited) {
				for (int j = M; j >= 2; j--) {
					for (int k = 1; k < j; k++)
						F[node->id][j] = max(F[node->id][j], F[node->id][j - k] + F[node->successors[i]->id][k]);
				}
 			}
		}

		node->visited = false;
	}

public:
	Tree(Node* node, int n, int m) {
		N = n;
		M = m;
		root = node;
		F = new int*[N + 1];
		for (int i = 0; i < N + 1; i++) {
			F[i] = new int[M + 1];
			for (int j = 0; j < M + 1; j++)
				F[i][j] = 0;
		}
	}

	~Tree() {
		for (int i = 0; i < N; i++)
			delete[] F[i];
		delete[] F;
	}

	int maxScore() {
		traverseTree(root);
		return F[1][M];
	}
};

int main() {
	int N = 0, M = 0;
	cin >> N >> M;
	Node* nodes = new Node[N + 1];
	for (int i = 1; i < N + 1; i++) {
		int s = 0;
		cin >> s;
		nodes[i].id = i;
		nodes[i].score = s;
	}
	for (int i = 0; i < N - 1; i++) {
		int a = 0, b = 0;
		cin >> a >> b;
		nodes[a].successors.push_back(nodes + b);
		nodes[b].successors.push_back(nodes + a);
	}
	Tree tree = Tree(nodes + 1, N, M);

	cout << tree.maxScore() << endl;

	return 0;
}
```