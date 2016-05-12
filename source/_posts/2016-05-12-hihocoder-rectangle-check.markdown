---
layout: post
title: "hihoCoder#1040 - 矩形判断"
date: 2016-05-12 20:03:25 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给出平面上4条线段，判断这4条线段是否恰好围成一个面积大于0的矩形。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1040)。
<!--more-->
## 解题思路
死条线段能够围成矩形的充要条件为：任意两条线段若相交必垂直，且相交次数恰好为4。
## 时间复杂度
时间复杂度为1。
## 代码
```c++
#include <iostream>
using namespace std;

bool intersect(int* line1, int* line2) {
	return ((line1[0] == line2[0] && line1[1] == line2[1]) ||
		(line1[0] == line2[2] && line1[1] == line2[3]) ||
		(line1[2] == line2[0] && line1[3] == line2[1]) ||
		(line1[2] == line2[2] && line1[3] == line2[3]));
}

bool isVertical(int* line1, int* line2) {
	int x1 = line1[2] - line1[0];
	int y1 = line1[3] - line1[1];
	int x2 = line2[2] - line2[0];
	int y2 = line2[3] - line2[1];

	return (x1 * x2 + y1 * y2) == 0;
}

bool isPoint(int* line) {
	return (line[0] == line[2] && line[1] == line[3]);
}

bool checkRec(int** coord) {
	for (int i = 0; i < 4; i++)
		if (isPoint(coord[i]))
			return false;

	int count = 0;
	for (int i = 0; i < 4; i++) {
		for (int j = i + 1; j < 4; j++) {
			if (intersect(coord[i], coord[j])) {
				if (isVertical(coord[i], coord[j]))
					count++;
				else
					return false;
			}
		}
	}
	if (count == 4)
		return true;

	return false;
}

int main() {
	int T = 0;
	cin >> T;
	for (int i = 0; i < T; i++) {
		int** coord = new int*[4];
		for (int i = 0; i < 4; i++)
			coord[i] = new int[4];
		for (int i = 0; i < 4; i++)
			for (int j = 0; j < 4; j++)
				cin >> coord[i][j];

		cout << (checkRec(coord) ? "YES" : "NO") << endl;

		for (int i = 0; i < 4; i++)
			delete[] coord[i];
		delete[] coord;
	}

	return 0;
}
```