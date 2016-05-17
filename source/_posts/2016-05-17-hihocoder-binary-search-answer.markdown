---
layout: post
title: "hihoCoder#1139 - 二分·二分答案"
date: 2016-05-17 16:19:44 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
在游戏《艦これ》中，海域是N个战略点(编号1..N)组成，如下图所示  
{% img /images/hihocoder-binary-search-answer-1.png %}  
其中红色的点表示有敌人驻扎，猫头像的的点表示该地图敌军主力舰队(boss)的驻扎点，虚线表示各个战略点之间的航线(无向边)。
在游戏中要从一个战略点到相邻战略点需要满足一定的条件，即需要舰队的索敌值大于等于这两点之间航线的索敌值需求。
由于提高索敌值需要将攻击机、轰炸机换成侦察机，舰队索敌值越高，也就意味着舰队的战力越低。
另外在每一个战略点会发生一次战斗，需要消耗1/K的燃料和子弹。必须在燃料和子弹未用完的情况下进入boss点才能与boss进行战斗，所以舰队最多只能走过K条航路。
现在Nettle想要以最高的战力来进攻boss点，所以他希望能够找出一条从起始点(编号为1的点)到boss点的航路，使得舰队需要达到的索敌值最低，并且有剩余的燃料和子弹。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1139)。
<!--more-->
## 解题思路
本题的关键在于解的大小范围是可预知的，即所有边中最小的索敌值与最大的索敌值这个区间。因此可以采用二分求解，枚举一个解，并检查是否是可行解，再二分区间缩小范围。
## 时间复杂度
检查采用的是BFS，时间复杂度为N，因此整体时间复杂度为Nlog(R - L)（L、R分别为最短边长及最大边长）。
## 代码
```c++
#include <iostream>
#include <vector>
#include <bitset>
#include <queue>
#include <algorithm>
using namespace std;

struct Node {
	vector<int> neighbors;
	vector<int> edges;
};

bitset<10001> set;

bool bfs(Node* graph, int s, int t, int k, int w) {
	queue<int> visited;
	queue<int> level;
	visited.push(s);
	level.push(0);
	while (!visited.empty()) {
		int root = visited.front();
		visited.pop();
		int l = level.front();
		level.pop();
		if (l > k)
			return false;
		if (root == t)
			return true;

		for (int i = 0; i < graph[root].neighbors.size(); i++) {
			if (!set[graph[root].neighbors[i]]) {
				if (graph[root].edges[i] <= w) {
					set[graph[root].neighbors[i]] = 1;
					visited.push(graph[root].neighbors[i]);
					level.push(l + 1);
				}
			}
		}
	}

	return false;
}

bool sat(Node* graph, int t, int k, int w) {
	set.reset();
	return bfs(graph, 1, t, k, w);
}

int calMin(Node* graph, int t, int k, int left, int right) {
	if (left + 1 == right)
		return right;

	int mid = (right - left) / 2 + left;
	if (sat(graph, t, k, mid))
		return calMin(graph, t, k, left, mid);
	else
		return calMin(graph, t, k, mid, right);
}

int main() {
	int N = 0, M = 0, K = 0, T = 0;
	cin >> N >> M >> K >> T;
	Node* graph = new Node[N + 1];
	int minW = 1000001;
	int maxW = 0;
	for (int i = 0; i < M; i++) {
		int a = 0, b = 0, w = 0;
		cin >> a >> b >> w;
		graph[a].neighbors.push_back(b);
		graph[a].edges.push_back(w);
		graph[b].neighbors.push_back(a);
		graph[b].edges.push_back(w);
		maxW = max(maxW, w);
		minW = min(minW, w);
	}

	cout << calMin(graph, T, K, minW, maxW) << endl;

	return 0;
}
```