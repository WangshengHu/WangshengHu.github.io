---
layout: post
title: "hihoCoder#1115 - 诺兹多姆"
date: 2016-05-17 12:52:46 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
相关链接：[炉石传说官网](http://hs.blizzard.cn/landing)  
某局游戏中，对面上了个诺兹多姆并上了嘲讽和圣盾。诺兹多姆是一个有8点攻击力和8点生命值的随从，这意味着他能够承受总量小于8点的伤害而不死亡，且对于任何攻击他的单位造成8点伤害。嘲讽意味着当诺兹多姆死亡之前你不能攻击对方玩家。圣盾意味着诺兹多姆受到的第一次伤害为0，然后诺兹多姆失去圣盾。    
你的场上有一些随从，每个随从有其攻击力和生命值，含义同上。同时一些随从也具有圣盾。一些随从还具有风怒，使得他若在第一次攻击后存活，则还能够攻击一次。  
计算出这回合你能带给对方玩家多少伤害。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1115)。
<!--more-->
## 解题思路
实际上还是采用穷搜的思路，只是具体实现有些小技巧。采用递归实现的代码比较简单清晰。
## 时间复杂度
最坏情况下，每一个随从都具有风怒和圣盾（或生命值大于8），那么每次都需要3次递归，这样整体时间复杂度大约是3<sup>7</sup>，是一个常数。
## 代码
```c++
#include <iostream>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

const int MIN_VALUE = -999;

struct Minion {
	int att = 0;
	int hp = 0;
	bool D = false;
	bool W = false;
};

int maxHarm(Minion* minions, int n, int i, int res, bool first) {
	if (i == n) {
		if (res >= 8)
			return 0;
		else
			return MIN_VALUE;
	}

	int maxH = 0;
	if (first) {
		if (minions[i].W && minions[i].D || minions[i].hp > 8)
			maxH = max(maxHarm(minions, n, i + 1, res, false) + minions[i].att,
				maxHarm(minions, n, i + 1, res + minions[i].att, false));
		else
			maxH = maxHarm(minions, n, i + 1, res, false);
	}
	else {
		if (minions[i].W) {
			maxH = maxHarm(minions, n, i + 1, res, false) + minions[i].att * 2;
			if (minions[i].D || minions[i].hp > 8) {
				maxH = max(maxH, maxHarm(minions, n, i + 1, res + minions[i].att, false) + minions[i].att);
				maxH = max(maxH, maxHarm(minions, n, i + 1, res + minions[i].att * 2, false));
			}
			else
				maxH = max(maxH, maxHarm(minions, n, i + 1, res + minions[i].att, false));
		}
		else {
			maxH = max(maxHarm(minions, n, i + 1, res, false) + minions[i].att,
				maxHarm(minions, n, i + 1, res + minions[i].att, false));
		}
	}

	return maxH;
}

int main() {
	int n = 0;
	while (cin >> n) {
		Minion* minions = new Minion[n];
		string line;
		getline(cin, line);
		for (int i = 0; i < n; i++) {
			getline(cin, line);
			istringstream sin(line);
			int att = 0, hp = 0, d = 0, w = 0;
			sin >> att >> hp;
			minions[i].att = att;
			minions[i].hp = hp;
			char c;
			while (sin >> c) {
				if (c == 'D')
					minions[i].D = true;
				if (c == 'W')
					minions[i].W = true;
			}
		}

		int maxH = 0;
		for (int i = 0; i < n; i++) {
			swap(minions[0], minions[i]);
			maxH = max(maxH, maxHarm(minions, n, 0, 0, true));
		}
		cout << maxH << endl;

		delete[] minions;
	}

	return 0;
}
```