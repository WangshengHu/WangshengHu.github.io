---
layout: post
title: "hihoCoder#1268 - 九宫"
date: 2016-05-10 19:59:36 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个残缺的三阶幻方，判断是否只有一组可行解，如果只有一组可行解，打印之。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1268)。
<!--more-->
## 解题思路
对给定的残缺三阶幻方，首先可以通过行列斜之和为15尽可能进行补全；如果只有一种解，那一定可以填满9个数字，除了一种情况：“十字架”形。对“十字架”刑，实际上也只可能有一种解，可以根据已填数字推算出整个幻方。
## 时间复杂度
为常数。
## 代码
```c++
#include <iostream>
#include <vector>
using namespace std;

bool check(int *square) {
	int filled = 0;
	for (int i = 0; i < 9; i++)
		filled += (square[i] != 0);
	int lastFilled = 0;
	do {
		lastFilled = filled;
		if (square[4] == 0) {
			square[4] = 5;
			filled++;
		}
		int state = (square[0] != 0) + (square[8] != 0);
		if (state == 1) {
			square[square[0] != 0 ? 8 : 0] = 10 - square[0] - square[8];
			filled++;
		}
		state = (square[1] != 0) + (square[7] != 0);
		if (state == 1) {
			square[square[1] != 0 ? 7 : 1] = 10 - square[1] - square[7];
			filled++;
		}
		state = (square[2] != 0) + (square[6] != 0);
		if (state == 1) {
			square[square[2] != 0 ? 6 : 2] = 10 - square[2] - square[6];
			filled++;
		}
		state = (square[3] != 0) + (square[5] != 0);
		if (state == 1) {
			square[square[3] != 0 ? 5 : 3] = 10 - square[3] - square[5];
			filled++;
		}

		state = (square[0] != 0) + (square[1] != 0) + (square[2] != 0);
		if (state == 2) {
			square[(square[1] == 0) + (square[2] == 0) * 2] = 15 - square[0] - square[1] - square[2];
			filled++;
		}
		state = (square[2] != 0) + (square[5] != 0) + (square[8] != 0);
		if (state == 2) {
			square[(square[2] == 0) * 2 + (square[5] == 0) * 5 + (square[8] == 0) * 8] = 15 - square[2] - square[5] - square[8];
			filled++;
		}
		state = (square[8] != 0) + (square[7] != 0) + (square[6] != 0);
		if (state == 2) {
			square[(square[8] == 0) * 8 + (square[7] == 0) * 7 + (square[6] == 0) * 6] = 15 - square[8] - square[7] - square[6];
			filled++;
		}
		state = (square[6] != 0) + (square[3] != 0) + (square[0] != 0);
		if (state == 2) {
			square[(square[6] == 0) * 6 + (square[3] == 0) * 3] = 15 - square[6] - square[3] - square[0];
			filled++;
		}

		state = (square[1] != 0) + (square[7] != 0) + (square[3] != 0) + (square[5] != 0) + (square[4] != 0);
		int state1 = (square[0] == 0) + (square[2] == 0) + (square[6] == 0) + (square[8] == 0);
		if (state == 5 && state1 == 4) {
			if ((square[1] == 9 && square[3] == 3) || (square[1] == 3 && square[3] == 9)) {
				square[0] = 4;
				filled++;
			}
			else if ((square[1] == 9 && square[3] == 7) || (square[1] == 7 && square[3] == 9)) {
				square[0] = 2;
				filled++;
			}
			else if ((square[1] == 1 && square[3] == 3) || (square[1] == 3 && square[3] == 1)) {
				square[0] = 8;
				filled++;
			}
			else if ((square[1] == 1 && square[3] == 7) || (square[1] == 7 && square[3] == 1)) {
				square[0] = 6;
				filled++;
			}
		}
	} while (lastFilled != filled);

	return (filled == 9);
}

int main() {
	int *square = new int[9];
	for (int i = 0; i < 9; i++)
		cin >> square[i];

	if (check(square))
		cout << square[0] << " " << square[1] << " " << square[2] << endl << square[3] << " "
		<< square[4] << " " << square[5] << endl << square[6] << " " << square[7] << " "
		<< square[8] << endl;
	else
		cout << "Too Many" << endl;

	delete[] square;

	return 0;
}
```