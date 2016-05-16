---
layout: post
title: "hihoCoder#1067 - 最近公共祖先·二"
date: 2016-05-15 15:02:25 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定N对节点之间的继承关系（一个节点仅有一个父节点），并且所有这些节点有一个共同的根节点，给定任意两个节点，求它们的最近公共祖先节点。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1067)。
<!--more-->
## 解题思路
这次用到的算法称为离线算法（Tarjan算法），因为要求一次收集若干次询问统一处理。仔细思考，可以发现：  
对树进行深度优先搜索，并且对节点进行染色（进去时染灰色，离开时染黑色），当遍历到某个询问的节点时，查看另一个节点，若未染色，则继续；若是灰色，则结果就是该灰色节点；若是黑色，则结果就是该黑色节点向上的第一个灰色节点（黑色节点表示其子树已经全部访问完，灰色节点表示当前仍在其子树中）。  
接下来的问题是如何快速查找一个黑色节点向上的第一个灰色节点。仔细思考，发现当刚要离开一个节点时，其所有子树中的节点向上的第一个灰色节点即为其自身，那么当该节点染黑后，以该节点为根节点的子树中所有节点向上的第一个灰色节点就变成了该节点的父节点。这很类似于并查集。
## 时间复杂度
DFS的时间复杂度是N，共M次询问，其中并查集的合并及查找共2M + N次，时间复杂度为2N + 2M。
## 代码
```c++
#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
using namespace std;

struct Node {
	string name;
	vector<Node*> successors;
	int visited = 0;
	string ancestor;

	Node(string n) :name(n) {}
};

struct Query {
	string to;
	string ans;

	Query() :ans("") {}
};

unordered_map<string, Node*> tree;
Query* Q1;
Query* Q2;
unordered_map<string, vector<Query*>> queries;

string find(Node* node) {
	if (node->ancestor == node->name)
		return node->name;
	node->ancestor = find(tree[node->ancestor]);
	return node->ancestor;
}

void dfs(Node* root) {
	root->visited = 1;
	root->ancestor = root->name;
	if (queries.find(root->name) != queries.end()) {
		for (int i = 0; i < queries[root->name].size(); i++) {
			if (tree[queries[root->name][i]->to]->visited > 0)
				queries[root->name][i]->ans = find(tree[queries[root->name][i]->to]);
		}
	}
	for (int i = 0; i < root->successors.size(); i++) {
		dfs(root->successors[i]);
		root->successors[i]->ancestor = root->name;
	}
	root->visited = 2;
}

int main() {
	int N = 0, M = 0;
	cin >> N;
	string father, son;
	cin >> father >> son;
	tree[father] = new Node(father);
	Node* root = tree[father];
	tree[son] = new Node(son);
	tree[father]->successors.push_back(tree[son]);
	for (int i = 1; i < N; i++) {
		string father, son;
		cin >> father >> son;
		if (tree.find(father) == tree.end())
			tree[father] = new Node(father);
		tree[son] = new Node(son);
		tree[father]->successors.push_back(tree[son]);
	}
	cin >> M;
	Q1 = new Query[M];
	Q2 = new Query[M];
	for (int i = 0; i < M; i++) {
		string left, right;
		cin >> left >> right;
		Q1[i].to = right;
		Q2[i].to = left;
		queries[left].push_back(Q1 + i);
		queries[right].push_back(Q2 + i);
	}

	dfs(root);

	for (int i = 0; i < M; i++) {
		if (Q1[i].ans != "")
			cout << Q1[i].ans << endl;
		else
			cout << Q2[i].ans << endl;
	}

	for (auto it = tree.begin(); it != tree.end(); it++)
		delete it->second;
	delete[] Q1, Q2;

	return 0;
}
```