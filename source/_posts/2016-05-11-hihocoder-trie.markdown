---
layout: post
title: "hihoCoder#1014 - Trie树"
date: 2016-05-11 18:05:08 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
Trie树就是字典树。对于一个给定的词典，任给一个字符串，输出词典中以该字符串为前缀的单词数目。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1014)。
<!--more-->
## 解题思路
在建立Trie树的同时我们就可以着手统计以某个字符串为前缀的节点个数，即每次添加一个新单词的时候，沿途更新所有经过的节点。
## 时间复杂度
单词查询用时26M（M：查询字符串的长度），单次插入用时26M。
## 代码
```c++
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Node {
	int L = 1;
	char ch = ' ';
	vector<Node*> successors;

	Node(char c) {
		ch = c;
	}
};

class Trie {
private:
	Node* root;

	void updatePrefix(Node* node, string word, int idx) {
		if (idx == word.size())
			return;

		bool find = false;
		for (int i = 0; i < node->successors.size(); i++) {
			if (node->successors[i]->ch == word[idx]) {
				find = true;
				node->successors[i]->L++;
				updatePrefix(node->successors[i], word, idx + 1);
				break;
			}
		}

		if (!find) {
			for (int i = idx; i < word.size(); i++) {
				node->successors.push_back(new Node(word[i]));
				node = node->successors.back();
			}
		}
	}

	int findPrefix(Node* node, string query, int idx) {
		for (int i = 0; i < node->successors.size(); i++) {
			if (node->successors[i]->ch == query[idx]) {
				if (idx == query.size() - 1)
					return node->successors[i]->L;

				return findPrefix(node->successors[i], query, idx + 1);
			}
		}

		return 0;
	}

	void deleteTrie(Node* node) {
		for (int i = 0; i < node->successors.size(); i++)
			deleteTrie(node->successors[i]);
		delete node;
	}
	
public:
	Trie() {
		root = new Node('$');
	}

	~Trie() {
		deleteTrie(root);
	}

	void insert(string word) {
		updatePrefix(root, word, 0);
	}

	int getStat(string query) {
		return findPrefix(root, query, 0);
	}
};

int main() {
	int n = 0;
	cin >> n;
	string* words = new string[n];
	for (int i = 0; i < n; i++)
		cin >> words[i];
	int m = 0;
	cin >> m;
	string* queries = new string[m];
	for (int i = 0; i < m; i++)
		cin >> queries[i];

	Trie trie;
	for (int i = 0; i < n; i++)
		trie.insert(words[i]);

	for (int i = 0; i < m; i++)
		cout << trie.getStat(queries[i]) << endl;

	delete[] words, queries;

	return 0;
}
```