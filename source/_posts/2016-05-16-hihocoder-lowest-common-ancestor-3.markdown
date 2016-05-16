---
layout: post
title: "hihoCoder#1069 - 最近公共祖先·三"
date: 2016-05-16 15:40:40 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定N对节点之间的继承关系（一个节点仅有一个父节点），给定任意两个节点，求它们的最近公共祖先节点。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1069)。
<!--more-->
## 解题思路
这次用到的算法称为在线算法，与[离线算法](/blog/2016/05/15/hihocoder-lowest-common-ancestor-2/)相对应。关键在于将树转换为数组进行求解。  
对树进行深度优先搜索，每次经过一个点时（无论是从父节点进来还是从子节点回来）都按顺序记录下来（**实际上只需要记录每一次从子节点回来即可**），得到的数组中，任意两个节点的最近公共祖先就是这两个节点在数组中的位置所包含起来的那一段区间中深度最小的那个点。这样就成功将问题转换成了[RMQ-ST问题](/blog/2016/05/16/hihocoder-rmq-st/)。
## 时间复杂度
DFS的时间复杂度是N，RMQ-ST算法时间复杂度是NlogN，共M次询问，则整体时间复杂度为NlogN + M + N。
## 代码
```c++
#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

const int MAX_SIZE = 100000;

struct Node {
	string name;
	int level = 0;
	vector<Node*> children;

	Node(string n): name(n) {}
};

void dfs(Node* root, vector<Node*>& vec) {
	for (int i = 0; i < root->children.size(); i++) {
		root->children[i]->level = root->level + 1;
		dfs(root->children[i], vec);
		vec.push_back(root);
	}
	if (root->children.size() == 0)
		vec.push_back(root);
}

unordered_map<string, int> names;
Node* M[MAX_SIZE][32];
void rmqSt(Node* root) {
	vector<Node*> vec;
	dfs(root, vec);

	int N = vec.size();
	for (int i = 0; i < N; i++)
		names[vec[i]->name] = i;

	int p = -1;
	int n = N;
	while (n > 0) {
		n >>= 1;
		p++;
	}
	for (int i = 0; i < N; i++)
		M[i][0] = vec[i];
	for (int i = 1; i <= p; i++) {
		for (int j = 0; j < N; j++) {
			if (j + (1 << i - 1) < N)
				M[j][i] = M[j][i - 1]->level < M[j + (1 << i - 1)][i - 1]->level ? M[j][i - 1] : M[j + (1 << i - 1)][i - 1];
			else
				M[j][i] = M[j][i - 1];
		}
	}
}

string find(string a, string b) {
	int l = names[a], r = names[b];
	if (l > r) {
		int tmp = l;
		l = r;
		r = tmp;
	}
	int p = -1;
	int n = r - l + 1;
	while (n > 0) {
		n >>= 1;
		p++;
	}
	Node* ancestor = M[l][p]->level < M[r - (1 << p) + 1][p]->level ? M[l][p] : M[r - (1 << p) + 1][p];
	return ancestor->name;
}

int main() {
	int N = 0, M = 0;
	cin >> N;
	unordered_map<string, Node*> family;
	string father, son;
	cin >> father >> son;
	Node* root = new Node(father);
	root->level = 0;
	family[son] = new Node(son);
	root->children.push_back(family[son]);
	family[father] = root;
	for (int i = 1; i < N; i++) {
		cin >> father >> son;
		if (family.find(father) == family.end())
			family[father] = new Node(father);
		family[son] = new Node(son);
		family[father]->children.push_back(family[son]);
	}

	rmqSt(root);

	cin >> M;
	for (int i = 0; i < M; i++) {
		string a, b;
		cin >> a >> b;
		cout << find(a, b) << endl;
	}

	for (auto it = family.begin(); it != family.end(); it++)
		delete it->second;

	return 0;
}
```