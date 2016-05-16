---
layout: post
title: "hihocCoder#1062 - 最近公共祖先·一"
date: 2016-05-15 14:24:56 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定N对节点之间的继承关系（一个节点仅有一个父节点），给定任意两个节点，求它们的最近公共祖先节点。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1062)。
<!--more-->
## 解题思路
采用链表存储节点信息，由于存储的是子节点->父节点的关系，因此可以先遍历其中一个节点的所有祖先节点并标记，再遍历另一个节点的所有祖先节点，当遍历到一个已被标记的祖先节点时，该节点即所求结果。也可以将两个节点遍历到根节点的路径反转然后进行比较，找到开始分叉的那个节点即所求结果。
## 时间复杂度
时间复杂度为T（T为树的高度），最坏情况是N。
## 代码
```c++
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

struct Node {
	string name;
	bool visited = false;
	Node* ancestor = NULL;

	Node(string n) {
		name = n;
	}
};

string lowestComAnc(unordered_map<string, Node*> nodes, string a, string b) {
	if (a == b)
		return a;
	if (nodes.find(a) == nodes.end() || nodes.find(b) == nodes.end())
		return "-1";

	for (auto it = nodes.begin(); it != nodes.end(); it++)
		it->second->visited = false;

	Node *A = nodes[a], *B = nodes[b];
	while (A) {
		A->visited = true;
		A = A->ancestor;
	}

	while (B) {
		if (B->visited)
			return B->name;
		B = B->ancestor;
	}

	return "-1";
}

int main() {
	int N = 0, M = 0;
	cin >> N;
	unordered_map<string, Node*> nodes;
	for (int i = 0; i < N; i++) {
		string father, son;
		cin >> father >> son;
		Node* node = new Node(son);
		if (nodes.find(father) == nodes.end())
			nodes.insert(make_pair(father, new Node(father)));
		node->ancestor = nodes[father];
		nodes.insert(make_pair(son, node));
	}
	cin >> M;
	for (int i = 0; i < M; i++) {
		string a, b;
		cin >> a >> b;
		cout << lowestComAnc(nodes, a, b) << endl;
	}

	return 0;
}
```