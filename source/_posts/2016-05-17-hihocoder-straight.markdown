---
layout: post
title: "hihoCoder#1177 - 顺子"
date: 2016-05-17 18:49:37 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
假设已经有4张牌，计算得到下一张牌后是顺子的概率是多少（不包含同花顺）。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1177)。
<!--more-->
## 解题思路
普通的分情况讨论。记得**仔细，仔细，再仔细**。
## 时间复杂度
时间复杂度为1。
## 代码
```c++
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

unordered_map<char, int> map;

int getNumber(string card, char& color) {
	color = card[card.size() - 1];
	int number = 0;
	if (card.size() == 3)
		number = 10;
	else
		number = map[card[0]];

	return number;
}

void probability(string* cards, int& up, int& down) {
	int numbers[4];
	bool sameColor = true;
	char color = ' ';
	for (int i = 0; i < 4; i++) {
		char colorTmp;
		numbers[i] = getNumber(cards[i], colorTmp);
		if (color != ' ' && colorTmp != color)
			sameColor = false;
		color = colorTmp;
	}

	for (int i = 0; i < 4; i++) {
		int minN = numbers[i];
		int minI = i;
		for (int j = i; j < 4; j++) {
			if (numbers[j] < minN) {
				minN = numbers[j];
				minI = j;
			}
		}
		numbers[minI] = numbers[i];
		numbers[i] = minN;
	}
	if (numbers[0] == 1 && (numbers[1] == 11 && numbers[2] == 12 && numbers[3] == 13) ||
		(numbers[1] == 2 && numbers[2] == 3 && numbers[3] == 4) || 
		(numbers[1] == 10 && numbers[2] == 11 && numbers[3] == 12) ||
		(numbers[1] == 10 && numbers[2] == 11 && numbers[3] == 13) ||
		(numbers[1] == 10 && numbers[2] == 12 && numbers[3] == 13)) {
		if (sameColor) {
			up = 1;
			down = 16;
		}
		else {
			up = 1;
			down = 12;
		}
		return;
	}

	bool straight = true;
	for (int i = 0; i < 3; i++)
		if (numbers[i + 1] - numbers[i] != 1) {
			straight = false;
			break;
		}

	if (straight) {
		if (sameColor) {
			up = 1;
			down = 8;
		}
		else {
			up = 1;
			down = 6;
		}
	}
	else {
		bool unStraight = false;
		for (int i = 0; i < 3; i++) {
			if (numbers[i + 1] - numbers[i] == 2) {
				if (!unStraight)
					unStraight = true;
				else {
					unStraight = false;
					break;
				}
			}
			else if (numbers[i + 1] - numbers[i] != 1) {
				unStraight = false;
				break;
			}
		}
		if (unStraight) {
			if (sameColor) {
				up = 1;
				down = 16;
			}
			else {
				up = 1;
				down = 12;
			}
		}
		else {
			up = 0;
			down = 1;
		}
	}
}

int main() {
	for (int i = 2; i < 10; i++)
		map.insert(make_pair((char) ('0' + i), i));
	map.insert(make_pair('A', 1));
	map.insert(make_pair('J', 11));
	map.insert(make_pair('Q', 12));
	map.insert(make_pair('K', 13));
	string cards[4];
	for (int i = 0; i < 4; i++)
		cin >> cards[i];

	int up = 0, down = 0;
	probability(cards, up, down);

	cout << up << "/" << down << endl;

	return 0;
}
```