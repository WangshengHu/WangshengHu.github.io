---
layout: post
title: "hihoCoder#1041 - 国庆出游"
date: 2016-05-12 20:18:50 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
n个节点构成一个树形网络（即n-1条边），从1号节点出发，经过每条边恰两次，给定其中m个节点的遍历顺序，问是否可能满足。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1041)。
<!--more-->
## 解题思路
仔细思考可以发现，一次遍历即是一次深度优先搜索的过程。对给定的m个节点的遍历顺序，我们可以先对这棵树进行预处理，在每个节点存储以该节点为根的子树所包含节点的集合。用一个队列保存m个节点的遍历顺序，在实际深搜的过程中，每次搜索到一个节点时我们都优先从其包含队首节点的子节点进行搜索。如果深搜结束后队列为空，则返回真；否则返回假。
## 时间复杂度
深度优先搜索的时间复杂度为N，对每个节点而言，其每个子节点都有可能会被重复检查（因为回溯的缘故），最坏情况是N<sup>2</sup>（树仅有两层，且每次队首节点都出现在最右侧）。
## 代码
```c++
#include <iostream>
#include <vector>
#include <queue>
#include <bitset>
using namespace std;

struct Node {
	int id = -1;
	bool visited = false;
	bool tagged = false;
	bitset<101> subtree;
	vector<Node*> successors;

	Node() {
		subtree.reset();
	}
};

class Tree {
private:
	Node* root;

	void collectSubtree(Node* node) {
		node->tagged = true;
		node->subtree[node->id] = 1;
		for (int i = 0; i < node->successors.size(); i++) {
			if (!node->successors[i]->tagged) {
				collectSubtree(node->successors[i]);
				node->subtree |= node->successors[i]->subtree;
			}
		}
	}

	void traverseTree(Node* node, queue<int>& seq) {
		node->visited = true;
		if (node->id == seq.front())
			seq.pop();

		int lastSize = seq.size();
		while (!seq.empty()) {
			for (int i = 0; i < node->successors.size(); i++)
				if (!node->successors[i]->visited && node->successors[i]->subtree[seq.front()]) {
					traverseTree(node->successors[i], seq);
					break;
				}
			if (lastSize == seq.size())
				break;
			lastSize = seq.size();
		}
	}

public:
	Tree(Node* node) {
		root = node;
	}
	
	bool traverse(queue<int> sequence) {
		queue<int> seq = sequence;
		collectSubtree(root);
		traverseTree(root, seq);
		return seq.empty();
	}
};

int main() {
	int T = 0;
	cin >> T;
	for (int i = 0; i < T; i++) {
		int n = 0, m = 0;
		cin >> n;
		Node* nodes = new Node[n + 1];
		for (int i = 1; i < n + 1; i++)
			nodes[i].id = i;
		for (int i = 0; i < n - 1; i++) {
			int a = 0, b = 0;
			cin >> a >> b;
			nodes[a].successors.push_back(nodes + b);
			nodes[b].successors.push_back(nodes + a);
		}
		cin >> m;
		queue<int> sequence;
		for (int i = 0; i < m; i++) {
			int a = 0;
			cin >> a;
			sequence.push(a);
		}
		Tree tree = Tree(nodes + 1);

		cout << (tree.traverse(sequence) ? "YES" : "NO") << endl;

		delete[] nodes;
	}

	return 0;
}
```