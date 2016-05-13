---
layout: post
title: "hihoCoder#1050 - 树中的最长路"
date: 2016-05-13 16:01:46 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
求一棵树中距离最长的两个节点的距离。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1050)。
<!--more-->
## 解题思路
仔细思考可以发现，对任一条路径，都存在一个“转折点”，路径从这个点开始会向下弯折。对任一个这样的“转折点”，最长的路径就发生在两条路径不重合的离该节点最长的两个节点。考虑如下性质：对任一个节点作为“转折点”，其所有子节点中最长路长度加1即为该节点最长路，所有子节点中次长路长度加1即为该节点次长路。因此可以用后序遍历求解。
## 时间复杂度
时间复杂度为N。
## 代码
```c++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Node {
	int first = 0;
	int second = 0;
	bool visited = false;
	vector<Node*> successors;
};

class Tree {
private:
	Node* root;

	int traverse(Node* node, int& first) {
		node->visited = true;
		bool hasChild = false;
		int maxLen = 0, maxFir = 0, secFir = 0;
		for (int i = 0; i < node->successors.size(); i++) {
			if (node->successors[i]->visited == false) {
				hasChild = true;
				int fir = 0;
				maxLen = max(maxLen, traverse(node->successors[i], fir));
				if (maxFir <= fir) {
					secFir = maxFir;
					maxFir = fir;
				}
				else
					secFir = max(secFir, fir);
			}
		}
		if (hasChild) {
			first = maxFir + 1;
			maxLen = max(maxLen, maxFir + secFir + 2);
		}

		return maxLen;
	}

public:
	Tree(Node* node) {
		root = node;
	}

	int longestPath() {
		int first = 0;
		return traverse(root, first);
	}
};

int main() {
	int N = 0;
	cin >> N;
	Node* nodes = new Node[N];
	for (int i = 0; i < N - 1; i++) {
		int a = 0, b = 0;
		cin >> a >> b;
		nodes[a - 1].successors.push_back(nodes + b - 1);
		nodes[b - 1].successors.push_back(nodes + a - 1);
	}
	Tree tree = Tree(nodes);
	
	cout << tree.longestPath();

	delete[] nodes;

	return 0;
}
```